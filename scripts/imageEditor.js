let editorSelectedFile = null;
let editorModerationLevel = 'high';

function loadEditorPresets() {
    const presetsContainer = document.getElementById('presets-container');
    if (!presetsContainer) return;

    const t = translations[currentLang] || translations['en'];
    presetsContainer.innerHTML = `<div class="loading-presets" id="txt-editor-loading-presets">${t.editorLoadingPresets}</div>`;

    fetch('https://create.thena.workers.dev/presets')
        .then(response => response.json())
        .then(data => {
            presetsContainer.innerHTML = '';
            if (data && data.length > 0) {
                data.forEach(preset => {
                    const card = document.createElement('div');
                    card.className = 'preset-card';
                    
                    preset.name = currentLang == 'tr' ? preset.name.tr : preset.name.en;
                    const img = document.createElement('img');
                    img.src = preset.img;
                    img.alt = preset.name;
                    
                    const name = document.createElement('div');
                    name.className = 'preset-name';
                    name.innerText = preset.name;
                    
                    card.appendChild(img);
                    card.appendChild(name);
                    
                    card.addEventListener('click', () => {
                        const promptInput = document.getElementById('editor-prompt');
                        if (promptInput) {
                            if (typeof playSuccessSound === 'function') playSuccessSound();
                            if (typeof typeWriterEffect2 === 'function') {
                                typeWriterEffect2(preset.prompt, promptInput);
                            } else {
                                promptInput.value = preset.prompt;
                                const charCount = document.getElementById('editor-char-count');
                                if(charCount) charCount.innerText = `${preset.prompt.length} / 5000`;
                                promptInput.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                            checkEditorFormReady();
                        }
                    });
                    
                    presetsContainer.appendChild(card);
                });
            } else {
                 presetsContainer.innerHTML = `<div class="loading-presets">${t.editorNoPresets}</div>`;
            }
        })
        .catch(err => {
            console.error('Error fetching presets:', err);
             presetsContainer.innerHTML = `
                <div class="loading-presets" style="display:flex; flex-direction:row; align-items:center; justify-content:center; gap:10px;">
                    <span>${t.editorFailedPresets}</span>
                    <button class="tiny-action-btn" id="btn-refresh-presets" title="Retry" style="padding:6px; min-width:auto; height:auto; display:flex; align-items:center; justify-content:center; background: #222; border: 1px solid #333; border-radius: 6px; cursor: pointer; color: #fff;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M23 4v6h-6"></path>
                            <path d="M1 20v-6h6"></path>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                        </svg>
                    </button>
                </div>`;
                
             const refreshBtn = document.getElementById('btn-refresh-presets');
             if (refreshBtn) {
                 refreshBtn.addEventListener('click', (e) => {
                     e.stopPropagation();
                     loadEditorPresets();
                 });
             }
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('editor-upload-area');
    const fileInput = document.getElementById('editor-file-input');
    const previewImg = document.getElementById('editor-preview-img');
    const clearBtn = document.getElementById('editor-clear-btn');
    const placeholder = document.getElementById('editor-upload-placeholder');
    
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', (e) => {
             if (e.target.closest('#editor-clear-btn') || e.target.closest('#editor-moderation-btn')) return;
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleEditorFile(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                handleEditorFile(e.target.files[0]);
            }
        });

        document.addEventListener('paste', (e) => {
            const editorView = document.getElementById('view-image-editor');
            if (!editorView || !editorView.classList.contains('active-view')) return;

            if (e.clipboardData && e.clipboardData.items) {
                const items = e.clipboardData.items;
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf('image') !== -1) {
                        const file = items[i].getAsFile();
                        handleEditorFile(file);
                        e.preventDefault();
                        break;
                    }
                }
            }
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', (e) => {
             e.stopPropagation();
            editorSelectedFile = null;
            previewImg.src = '';
            previewImg.classList.add('hidden');
            clearBtn.classList.add('hidden');
            placeholder.style.display = 'flex';
            fileInput.value = '';
        });
    }

    function handleEditorFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            editorSelectedFile = e.target.result;
            previewImg.src = editorSelectedFile;
            previewImg.classList.remove('hidden');
            clearBtn.classList.remove('hidden');
            placeholder.style.display = 'none';
            
            if (typeof playSuccessSound === 'function') playSuccessSound();
            showNotification(typeof currentLang !== 'undefined' && currentLang === 'tr' ? 'Resim başarıyla yüklendi!' : 'Image uploaded successfully!', 'success');
            
            if (typeof checkEditorFormReady === 'function') checkEditorFormReady();
        };
        reader.readAsDataURL(file);
    }

    const modBtn = document.getElementById('editor-moderation-btn');
    if (modBtn) {
        modBtn.onclick = (e) => {
             e.stopPropagation();
            if (typeof playFeatureToggleSound === 'function') playFeatureToggleSound(true);
            
            const levels = ['high', 'medium', 'low'];
            let currentIdx = levels.indexOf(editorModerationLevel);
            let nextIdx = (currentIdx + 1) % levels.length;
            editorModerationLevel = levels[nextIdx];
            
            modBtn.dataset.level = editorModerationLevel;

            if (editorModerationLevel === 'high') {
                showNotification(currentLang == "tr" ? "Moderasyon düzeyi normal olarak ayarlandı." : 'Moderation set to medium.', 'info');
            } else if (editorModerationLevel === 'medium') {
                showNotification(currentLang == "tr" ? "Moderasyon düzeyi düşük olarak ayarlandı." : 'Moderation set to low.', 'info');
            } else {
                showNotification(currentLang == "tr" ? "Moderasyon düzeyi yüksek olarak ayarlandı." : 'Moderation set to high.', 'info');
            }

            modBtn.title = `Moderation: ${editorModerationLevel.charAt(0).toUpperCase() + editorModerationLevel.slice(1)}`;
        };
    }

    const promptInput = document.getElementById('editor-prompt');
    const charCount = document.getElementById('editor-char-count');
    
    if(promptInput && charCount) {
        promptInput.addEventListener('input', () => {
             charCount.innerText = `${promptInput.value.length} / 5000`;
             autoResize(promptInput);
        });
    }
    
    const generateBtn = document.getElementById('editor-generate-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateVariation);
    }
    const editorApiKeyInput = document.getElementById('api-key');
    const editorPromptInput = document.getElementById('editor-prompt');

    if (editorApiKeyInput) editorApiKeyInput.addEventListener('input', checkEditorFormReady);
    if (editorPromptInput) editorPromptInput.addEventListener('input', checkEditorFormReady);
});

function checkEditorFormReady() {
    const apiKeyInput = document.getElementById('api-key');
    const promptInput = document.getElementById('editor-prompt');
    const generateBtn = document.getElementById('editor-generate-btn');

    const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
    const prompt = promptInput ? promptInput.value.trim() : '';
    const hasFile = !!editorSelectedFile;

    if (generateBtn) {
        if (apiKey && prompt && hasFile) {
            generateBtn.classList.add('ready');
        } else {
            generateBtn.classList.remove('ready');
        }
    }
}

async function generateVariation() {
    const apiKeyInput = document.getElementById('api-key');
    const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
    const prompt = document.getElementById('editor-prompt').value.trim();
    const generateBtn = document.getElementById('editor-generate-btn');

    if (!apiKey) {
        if(typeof playErrorSound === 'function') playErrorSound();
        showNotification(currentLang == "tr" ? "Lütfen API Anahtarınızı girin." : 'Please enter your API Key.', 'error');
        return;
    }

    if (!editorSelectedFile) {
        if(typeof playErrorSound === 'function') playErrorSound();
        showNotification(currentLang == "tr" ? "Lütfen bir resim yükleyin." : 'Please upload an image.', 'error');
        return;
    }

    if (!prompt) {
        if(typeof playErrorSound === 'function') playErrorSound();
        showNotification(currentLang == "tr" ? "Lütfen bir prompt girin." : 'Please enter a prompt.', 'error');
        return;
    }

    if(generateBtn) {
        generateBtn.disabled = true;
        generateBtn.innerText = currentLang == "tr" ? 'Model Yükleniyor...' : 'Model Loading...';
    }

    const promptInput = document.getElementById('editor-prompt');
    const fileInput = document.getElementById('editor-file-input');
    const clearBtn = document.getElementById('editor-clear-btn');
    const uploadArea = document.getElementById('editor-upload-area');

    if (promptInput) promptInput.disabled = true;
    if (fileInput) fileInput.disabled = true;
    if (clearBtn) {
        clearBtn.style.pointerEvents = 'none';
        clearBtn.style.opacity = '0.5';
    }
    if (uploadArea) {
        uploadArea.style.pointerEvents = 'none';
        uploadArea.style.opacity = '0.7';
    }

    const presetCards = document.querySelectorAll('.preset-card');
    presetCards.forEach(card => {
        card.style.pointerEvents = 'none';
        card.style.opacity = '0.5';
    });
    
    if (typeof playStartSound === 'function') playStartSound();

    let genNotif = showNotification((currentLang === 'tr') ? 'Oluşturuluyor... Sıraya alındı.' : 'Generating... Queued.', 'info', null, 120000, 0);

    try {
        const payload = {
            img: editorSelectedFile,
            moderation: editorModerationLevel,
            prompt: prompt
        };

        const response = await fetch('https://create.thena.workers.dev/variationApp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        
        if (response.ok && data.status === 200 && data.image) {
            await pollEditorGeneration(data.image, apiKey, prompt, genNotif, editorSelectedFile, editorModerationLevel);
        } else {
             if (genNotif) genNotif();
             console.error('Generation Error:', error);
             if(typeof playErrorSound === 'function') playErrorSound();
             showNotification(currentLang == "tr" ? "Hata: " + error.message : "Error: " + error.message, 'error');
             if(generateBtn) {
                 generateBtn.disabled = false;
                 generateBtn.innerText = currentLang == "tr" ? 'Varyasyon Oluştur' : 'Generate Variation';
             }
            const promptInput = document.getElementById('editor-prompt');
            const fileInput = document.getElementById('editor-file-input');
            const clearBtn = document.getElementById('editor-clear-btn');
            const uploadArea = document.getElementById('editor-upload-area');

            if (promptInput) promptInput.disabled = false;
            if (fileInput) fileInput.disabled = false;
            if (clearBtn) {
                clearBtn.style.pointerEvents = '';
                clearBtn.style.opacity = '';
            }
            if (uploadArea) {
                uploadArea.style.pointerEvents = '';
                uploadArea.style.opacity = '';
            }
            const presetCards = document.querySelectorAll('.preset-card');
            presetCards.forEach(card => {
                card.style.pointerEvents = '';
                card.style.opacity = '';
            });
        }
    } catch (error) {
        if (genNotif) genNotif();
        console.error('Generation Error:', error);
        if(typeof playErrorSound === 'function') playErrorSound();
        showNotification(currentLang == "tr" ? "Hata: " + error.message : "Error: " + error.message, 'error');

        if(generateBtn) {
            generateBtn.disabled = false;
            generateBtn.innerText = currentLang == "tr" ? 'Varyasyon Oluştur' : 'Generate Variation';
        }

        const promptInput = document.getElementById('editor-prompt');
        const fileInput = document.getElementById('editor-file-input');
        const clearBtn = document.getElementById('editor-clear-btn');
        const uploadArea = document.getElementById('editor-upload-area');

        if (promptInput) promptInput.disabled = false;
        if (fileInput) fileInput.disabled = false;
        if (clearBtn) {
            clearBtn.style.pointerEvents = '';
            clearBtn.style.opacity = '';
        }
        if (uploadArea) {
            uploadArea.style.pointerEvents = '';
            uploadArea.style.opacity = '';
        }

        const presetCards = document.querySelectorAll('.preset-card');
        presetCards.forEach(card => {
            card.style.pointerEvents = '';
            card.style.opacity = '';
        });
    }
}

function resizeBase64Image(base64, scale = 0.2) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = Math.floor(img.width * scale);
            canvas.height = Math.floor(img.height * scale);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL());
        };
        img.onerror = reject;
        img.src = base64;
    });
}

async function pollEditorGeneration(id, apiKey, prompt, genNotif, originalImage, moderationLevel) {
    const generateBtn = document.getElementById('editor-generate-btn');
    
    await new Promise(r => setTimeout(r, 2000));

    const enableInputs = () => {
        if(generateBtn) {
            generateBtn.disabled = false;
            generateBtn.innerText = currentLang == "tr" ? 'Varyasyon Oluştur' : 'Generate Variation';
        }
        const promptInput = document.getElementById('editor-prompt');
        const fileInput = document.getElementById('editor-file-input');
        const clearBtn = document.getElementById('editor-clear-btn');
        const uploadArea = document.getElementById('editor-upload-area');

        if (promptInput) promptInput.disabled = false;
        if (fileInput) fileInput.disabled = false;
        if (clearBtn) {
            clearBtn.style.pointerEvents = '';
            clearBtn.style.opacity = '';
        }
        if (uploadArea) {
            uploadArea.style.pointerEvents = '';
            uploadArea.style.opacity = '';
        }
        
        const presetCards = document.querySelectorAll('.preset-card');
        presetCards.forEach(card => {
            card.style.pointerEvents = '';
            card.style.opacity = '';
        });
    };

    const checkStatus = async () => {
        try {
            const response = await fetch(`https://create.thena.workers.dev/status?id=${id}`, {
                headers: { 'apikey': apiKey }
            });
            const data = await response.json();

            if (data.status === 202) {
                if (data.progress && generateBtn) {
                     generateBtn.innerText = currentLang == "tr" ? `İşleniyor... ${data.progress}%` : `Generating... ${data.progress}%`;
                }
                if (genNotif && typeof genNotif.update === 'function') {
                    genNotif.update(
                        (currentLang === 'tr') ? `Oluşturuluyor... %${data.progress}` : `Generating... ${data.progress}%`,
                        'info',
                        data.progress
                    );
                }
                setTimeout(checkStatus, 5000);
                
            } else if (data.status === 200) {
                if (genNotif) genNotif();
                if(typeof playSuccessSound === 'function') playSuccessSound();
                 
                let finalUrl = data.image;
                if (!finalUrl.startsWith('data:image') && !finalUrl.startsWith('http')) {
                    finalUrl = `data:image/png;base64,${finalUrl}`;
                }
                
                showNotification(currentLang === 'tr' ? 'Varyasyon başarıyla oluşturuldu!' : 'Variation generated successfully!', 'success', finalUrl);
                
                if(typeof dbHelper !== 'undefined') {
                    let originalResized = null;
                    if(originalImage && originalImage.startsWith('data:image')) {
                        try {
                            originalResized = await resizeBase64Image(originalImage, 0.5);
                        } catch(e) { console.error('Error resizing original image:', e); }
                    }

                    await dbHelper.add({
                        url: finalUrl,
                        prompt: prompt,
                        model: 'Image Editor',
                        size: 'Auto',
                        timestamp: new Date().toISOString(),
                        moderation: moderationLevel || 'high',
                        features: { type: 'editor_variation' },
                        originalImage: originalResized
                    });
                }
                
                enableInputs();
            } else {
                if (genNotif) genNotif();
                if(typeof playErrorSound === 'function') playErrorSound();
                showNotification(currentLang == "tr" ? "Hata: " + data.content : "Error: " + data.content, 'error');
                enableInputs();
                return;
            }
        } catch (error) {
            if (genNotif) genNotif();
            console.error('Polling Error:', error);
            if(typeof playErrorSound === 'function') playErrorSound();
            showNotification(currentLang == "tr" ? "Hata: " + error.message : "Error: " + error.message, 'error');
            enableInputs();
        }
    };
    checkStatus();
}