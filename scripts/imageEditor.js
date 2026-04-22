let editorSelectedFile = null;
let editorModerationLevel = 'high';
let editorSelectedModel = 'v1';
let editorCurrentMode = 'edit';


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
                    
                    card.dataset.prompt = preset.prompt;
                    card.dataset.nsfw = preset.nsfw === true ? 'true' : 'false';
                    
                    presetsContainer.appendChild(card);
                });
                
                const presetSearchInput = document.getElementById('editor-preset-search');
                if (presetSearchInput && presetSearchInput.value.trim() !== '') {
                    presetSearchInput.dispatchEvent(new Event('input'));
                }
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
    
    let editorCropper = null;
    const cropModal = document.getElementById('crop-modal');
    const cropImageTarget = document.getElementById('crop-image-target');
    const btnCropCancel = document.getElementById('btn-crop-cancel');
    const btnCropApply = document.getElementById('btn-crop-apply');
    
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
            if (typeof updateOutpaintPreview === 'function') updateOutpaintPreview();
            if (typeof updateOutpaintPresets === 'function') updateOutpaintPresets();
            if (typeof checkOutpaintFormReady === 'function') checkOutpaintFormReady();
        });
    }

    function handleEditorFile(file) {
        if (!file.type.startsWith('image/')) {
            alert(typeof currentLang !== 'undefined' && currentLang === 'tr' ? 'Lütfen bir resim dosyası yükleyin.' : 'Please upload an image file.');
            return;
        }

        if (!cropImageTarget || !cropModal) {
            console.error('Crop modal elements not found in DOM.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            if (editorCropper) {
                editorCropper.destroy();
                editorCropper = null;
            }
            
            cropImageTarget.onload = () => {
                cropModal.classList.add('active');
                const body = cropModal.querySelector('.crop-modal-body');
                const bodyH = body ? body.clientHeight : window.innerHeight * 0.6;
                const bodyW = body ? body.clientWidth : window.innerWidth * 0.9;
                editorCropper = new Cropper(cropImageTarget, {
                    viewMode: 1,
                    autoCropArea: 1,
                    background: false,
                    responsive: true,
                    restore: false,
                    minContainerWidth: bodyW,
                    minContainerHeight: bodyH
                });
                cropImageTarget.onload = null;
            };
            cropImageTarget.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    if (btnCropCancel) {
        btnCropCancel.addEventListener('click', () => {
            if (editorCropper) {
                editorCropper.destroy();
                editorCropper = null;
            }
            cropImageTarget.src = '';
            cropModal.classList.remove('active');
            fileInput.value = '';
        });
    }

    const btnCropClose = document.getElementById('btn-crop-close');
    if (btnCropClose) {
        btnCropClose.addEventListener('click', () => {
            if (editorCropper) {
                editorCropper.destroy();
                editorCropper = null;
            }
            cropImageTarget.src = '';
            cropModal.classList.remove('active');
            fileInput.value = '';
        });
    }

    if (btnCropApply) {
        btnCropApply.addEventListener('click', () => {
            if (!editorCropper) return;
            
            const canvas = editorCropper.getCroppedCanvas();
            if (canvas) {
                editorSelectedFile = canvas.toDataURL('image/jpeg', 0.9);
                
                previewImg.onload = () => {
                    if (typeof checkEditorFormReady === 'function') checkEditorFormReady();
                    if (typeof checkOutpaintFormReady === 'function') checkOutpaintFormReady();
                    if (typeof updateOutpaintPreview === 'function') updateOutpaintPreview();
                    if (typeof updateOutpaintPresets === 'function') updateOutpaintPresets();
                };
                
                previewImg.src = editorSelectedFile;
                previewImg.classList.remove('hidden');
                clearBtn.classList.remove('hidden');
                placeholder.style.display = 'none';
                
                if (typeof playSuccessSound === 'function') playSuccessSound();
                showNotification(typeof currentLang !== 'undefined' && currentLang === 'tr' ? translations.tr.msgImgUploadSuccess : translations.en.msgImgUploadSuccess, 'success');
            }
            
            if (editorCropper) {
                editorCropper.destroy();
                editorCropper = null;
            }
            cropImageTarget.src = '';
            cropModal.classList.remove('active');
            fileInput.value = '';
        });
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
                showNotification(currentLang == "tr" ? translations.tr.msgModHighSet : translations.en.msgModHighSet, 'info');
            } else if (editorModerationLevel === 'medium') {
                showNotification(currentLang == "tr" ? translations.tr.msgModMediumSet : translations.en.msgModMediumSet, 'info');
            } else {
                showNotification(currentLang == "tr" ? translations.tr.msgModLowSet : translations.en.msgModLowSet, 'info');
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

    const presetsContainer = document.getElementById('presets-container');
    if (presetsContainer) {
        presetsContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.preset-card');
            if (!card || !card.dataset.prompt) return;
            
            const promptInput = document.getElementById('editor-prompt');
            if (promptInput) {
                if (typeof playSuccessSound === 'function') playSuccessSound();
                if (typeof typeWriterEffect2 === 'function') {
                    typeWriterEffect2(card.dataset.prompt, promptInput);
                } else {
                    promptInput.value = card.dataset.prompt;
                    const charCount = document.getElementById('editor-char-count');
                    if(charCount) charCount.innerText = `${card.dataset.prompt.length} / 5000`;
                    promptInput.dispatchEvent(new Event('input', { bubbles: true }));
                }

                if (card.dataset.nsfw === 'true' && editorModerationLevel !== 'low') {
                    editorModerationLevel = 'low';
                    const modBtn = document.getElementById('editor-moderation-btn');
                    if (modBtn) {
                        modBtn.dataset.level = 'low';
                        modBtn.title = 'Moderation: Low';
                    }
                    showNotification(currentLang == "tr" ? translations.tr.msgModLowSet : translations.en.msgModLowSet, 'info');
                }

                checkEditorFormReady();
            }
        });
    }

    const scrollLeftBtn = document.getElementById('preset-scroll-left');
    const scrollRightBtn = document.getElementById('preset-scroll-right');

    if (scrollLeftBtn && scrollRightBtn && presetsContainer) {
        scrollLeftBtn.addEventListener('click', () => {
            presetsContainer.scrollBy({ left: -200, behavior: 'smooth' });
        });

        scrollRightBtn.addEventListener('click', () => {
            presetsContainer.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }

    const presetSearchInput = document.getElementById('editor-preset-search');
    const noResultsBox = document.getElementById('editor-search-no-results');
    const filterBtn = document.getElementById('btn-preset-filter');
    const filterMenu = document.getElementById('menu-preset-filter');
    const dropdownWrapper = document.getElementById('dropdown-preset-filter');
    let currentPresetFilter = 'all';

    if (filterBtn && filterMenu && dropdownWrapper) {
        filterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (filterMenu.style.display === 'block') {
                filterMenu.style.display = 'none';
            } else {
                document.querySelectorAll('.custom-dropdown-menu').forEach(menu => {
                     menu.style.display = 'none';
                });
                filterMenu.style.display = 'block';
            }
        });

        document.addEventListener('click', (e) => {
            if (!dropdownWrapper.contains(e.target) && filterMenu.style.display === 'block') {
                filterMenu.style.display = 'none';
            }
        });

        const filterOptions = filterMenu.querySelectorAll('.custom-dropdown-option');
        filterOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                if (typeof playInformationSound === 'function') playInformationSound();
                filterOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                currentPresetFilter = option.dataset.value;
                filterMenu.style.display = 'none';

                if (presetSearchInput) {
                    presetSearchInput.dispatchEvent(new Event('input'));
                }
            });
        });
    }

    if (presetSearchInput) {
        presetSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.preset-card');
            let visibleCount = 0;
            
            cards.forEach(card => {
                const name = card.querySelector('.preset-name').textContent.toLowerCase();
                const isNsfw = card.dataset.nsfw === 'true';
                
                let filterMatch = true;
                if (currentPresetFilter === 'safe' && isNsfw) filterMatch = false;
                if (currentPresetFilter === '18plus' && !isNsfw) filterMatch = false;

                if (name.includes(searchTerm) && filterMatch) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (noResultsBox) {
                const shouldShow = visibleCount === 0 && searchTerm !== '';
                const currentlyVisible = noResultsBox.style.display !== 'none' && !noResultsBox.classList.contains('exiting');

                if (shouldShow && !currentlyVisible) {
                    noResultsBox.classList.remove('exiting');
                    noResultsBox.style.display = 'flex';
                } else if (!shouldShow && currentlyVisible) {
                    noResultsBox.classList.add('exiting');
                    const onEnd = () => {
                        noResultsBox.style.display = 'none';
                        noResultsBox.classList.remove('exiting');
                        noResultsBox.removeEventListener('animationend', onEnd);
                    };
                    noResultsBox.addEventListener('animationend', onEnd);
                }
            }
        });
    }

    const toggleViewBtn = document.getElementById('btn-toggle-preset-view');
    if (toggleViewBtn && presetsContainer) {
        const viewModes = ['default', 'grid', 'large', 'list'];
        let currentMode = localStorage.getItem('editorViewMode');
        if (!viewModes.includes(currentMode)) {
            currentMode = 'default';
            if (localStorage.getItem('editorViewMode') === 'list') {
               currentMode = 'default';
            }
        }

        const updateView = (mode) => {
            presetsContainer.classList.remove('grid-view', 'large-view', 'list-view');
            toggleViewBtn.classList.remove('active');
            
            if (scrollLeftBtn) scrollLeftBtn.style.display = mode === 'default' ? 'flex' : 'none';
            if (scrollRightBtn) scrollRightBtn.style.display = mode === 'default' ? 'flex' : 'none';

            let nextMode;
            if (mode === 'default') {
                nextMode = 'grid';
                toggleViewBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                </svg>`;
                toggleViewBtn.title = (typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Izgara Görünümü' : 'Grid View';
            } else if (mode === 'grid') {
                presetsContainer.classList.add('grid-view');
                toggleViewBtn.classList.add('active');
                nextMode = 'large';
                toggleViewBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="8" rx="2"></rect>
                    <rect x="3" y="13" width="18" height="8" rx="2"></rect>
                </svg>`;
                toggleViewBtn.title = (typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Büyük Görünüm' : 'Large View';
            } else if (mode === 'large') {
                presetsContainer.classList.add('large-view');
                toggleViewBtn.classList.add('active');
                nextMode = 'list';
                toggleViewBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>`;
                toggleViewBtn.title = (typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Liste Görünümü' : 'List View';
            } else if (mode === 'list') {
                presetsContainer.classList.add('list-view');
                toggleViewBtn.classList.add('active');
                nextMode = 'default';
                toggleViewBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                    <path d="M22 6v12"></path>
                </svg>`;
                toggleViewBtn.title = (typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Yatay Görünüm' : 'Horizontal View';
            }
            
            localStorage.setItem('editorViewMode', mode);
            return nextMode;
        };

        let nextView = updateView(currentMode);

        toggleViewBtn.addEventListener('click', () => {
            if (typeof playInformationSound === 'function') playInformationSound();
            currentMode = nextView;
            nextView = updateView(currentMode);
        });
    }

    const editorModelBtns = document.querySelectorAll('.editor-model-btn');
    editorModelBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            if (e.target.closest('.editor-model-info-btn')) return;
            const targetModel = btn.dataset.model || 'v1';

            if (targetModel === 'v3') {
                btn.classList.add('editor-model-btn-checking');
                const loader = document.createElement('div');
                loader.className = 'editor-model-btn-loader';
                loader.innerHTML = `<span class="eml-spinner"></span>`;
                btn.appendChild(loader);
                requestAnimationFrame(() => requestAnimationFrame(() => {
                    loader.classList.add('visible');
                }));

                const allowed = await checkVariationRateLimit();

                loader.classList.remove('visible');
                await new Promise(r => setTimeout(r, 220));
                loader.remove();
                btn.classList.remove('editor-model-btn-checking');

                if (!allowed) return;
            }

            editorModelBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            editorSelectedModel = targetModel;
            if (typeof playInformationSound === 'function') playInformationSound();
        });
    });

    const btnV1Info = document.getElementById('btn-editor-model-v1-info');
    const modalV1 = document.getElementById('editor-model-v1-info-modal');
    const closeV1 = document.getElementById('close-editor-model-v1-info-modal');
    if (btnV1Info && modalV1) {
        btnV1Info.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof playInformationSound === 'function') playInformationSound();
            modalV1.classList.add('active');
        });
    }
    if (closeV1 && modalV1) {
        closeV1.addEventListener('click', () => modalV1.classList.remove('active'));
        modalV1.addEventListener('click', (e) => { if (e.target === modalV1) modalV1.classList.remove('active'); });
    }

    const btnV2Info = document.getElementById('btn-editor-model-v2-info');
    const modalV2 = document.getElementById('editor-model-v2-info-modal');
    const closeV2 = document.getElementById('close-editor-model-v2-info-modal');
    if (btnV2Info && modalV2) {
        btnV2Info.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof playInformationSound === 'function') playInformationSound();
            modalV2.classList.add('active');
        });
    }
    if (closeV2 && modalV2) {
        closeV2.addEventListener('click', () => modalV2.classList.remove('active'));
        modalV2.addEventListener('click', (e) => { if (e.target === modalV2) modalV2.classList.remove('active'); });
    }

    const btnV3Info = document.getElementById('btn-editor-model-v3-info');
    const modalV3 = document.getElementById('editor-model-v3-info-modal');
    const closeV3 = document.getElementById('close-editor-model-v3-info-modal');
    if (btnV3Info && modalV3) {
        btnV3Info.addEventListener('click', (e) => {
            e.stopPropagation();
            if (typeof playInformationSound === 'function') playInformationSound();
            modalV3.classList.add('active');
        });
    }
    if (closeV3 && modalV3) {
        closeV3.addEventListener('click', () => modalV3.classList.remove('active'));
        modalV3.addEventListener('click', (e) => { if (e.target === modalV3) modalV3.classList.remove('active'); });
    }
});

async function checkVariationRateLimit() {
    const apiKeyInput = document.getElementById('api-key');
    const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
    if (!apiKey) {
        if (typeof showNotification === 'function') {
            const msg = typeof currentLang !== 'undefined' && currentLang === 'tr'
                ? (translations?.tr?.msgEnterApiKey || 'API anahtarı gerekli.')
                : (translations?.en?.msgEnterApiKey || 'API key required.');
            showNotification(msg, 'error');
        }
        return false;
    }

    try {
        const response = await fetch('https://create.thena.workers.dev/checkVariationRateLimit', {
            method: 'GET',
            headers: { 'apikey': apiKey }
        });
        const data = await response.json();

        if (data.remainingMinutes && data.remainingMinutes !== 0) {
            const minutes = data.remainingMinutes;
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            let timeStr = '';
            const isT = typeof currentLang !== 'undefined' && currentLang === 'tr';
            if (isT) {
                if (hours > 0) timeStr += `${hours} saat `;
                if (mins > 0) timeStr += `${mins} dakika`;
                showNotification((translations?.tr?.msgModelUnavailableWait || 'Lütfen bekleyin: ') + timeStr.trim() + '.', 'error');
            } else {
                if (hours > 0) timeStr += `${hours} hour${hours > 1 ? 's' : ''} `;
                if (mins > 0) timeStr += `${mins} minute${mins > 1 ? 's' : ''}`;
                showNotification((translations?.en?.msgModelUnavailableWait || 'Please wait: ') + timeStr.trim() + '.', 'error');
            }
            if (typeof playErrorSound === 'function') playErrorSound();
            return false;
        }
        return true;
    } catch (err) {
        console.error('Variation rate limit check failed:', err);
        if (typeof showNotification === 'function') {
            const msg = typeof currentLang !== 'undefined' && currentLang === 'tr'
                ? (translations?.tr?.msgRateLimitFail || 'Rate limit kontrolü başarısız.')
                : (translations?.en?.msgRateLimitFail || 'Rate limit check failed.');
            showNotification(msg, 'error');
        }
        return false;
    }
}

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
        showNotification(currentLang == "tr" ? translations.tr.msgApiKeyRequired : translations.en.msgApiKeyRequired, 'error');
        return;
    }

    if (!editorSelectedFile) {
        if(typeof playErrorSound === 'function') playErrorSound();
        showNotification(currentLang == "tr" ? translations.tr.msgImgRequired : translations.en.msgImgRequired, 'error');
        return;
    }

    if (!prompt) {
        if(typeof playErrorSound === 'function') playErrorSound();
        showNotification(currentLang == "tr" ? translations.tr.msgPromptRequired : translations.en.msgPromptRequired, 'error');
        return;
    }

    setEditorLoadingState(true);
    
    if (typeof playStartSound === 'function') playStartSound();
    let pleaseWaitMsg = typeof translations !== 'undefined' ? (currentLang === 'tr' ? translations.tr.msgPleaseWait : translations.en.msgPleaseWait) : (currentLang === 'tr' ? 'Lütfen sayfayı kapatmayınız.' : 'Please do not close the page.');
    let genNotif = showNotification((currentLang === 'tr') ? translations.tr.msgGeneratingQueued + " - " + pleaseWaitMsg : translations.en.msgGeneratingQueued + " - " + pleaseWaitMsg, 'info', null, 120000, 0);

    try {
        const payload = {
            img: editorSelectedFile,
            moderation: editorModerationLevel,
            prompt: prompt,
            model: editorSelectedModel
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
            setEditorLoadingState(false);
            playErrorSound();
            if (data.status == 429) {
                showNotification(currentLang == "tr" ? translations.tr.msgLimitWait.replace('{0}', data.remainingSeconds) : translations.en.msgLimitWait.replace('{0}', data.remainingSeconds), 'error');
                return;
            }
            if ((data.status == 401 && data.content.includes('not allowed')) || (data.status == 204)) {
                if (editorModerationLevel === 'low') {
                    showNotification(currentLang == "tr" ? translations.tr.msgNotAllowedLow : translations.en.msgNotAllowedLow, 'error');
                } else {
                    showNotification(currentLang == "tr" ? translations.tr.msgModMediumLowReq : translations.en.msgModMediumLowReq, 'error');
                }
                return;
            }
            if (data.status == 401) {
                showNotification(currentLang == "tr" ? translations.tr.invalidApiKey : translations.en.invalidApiKey, "error");
                return;
            }
            if (data.status == 423) {
                showNotification(currentLang == "tr" ? translations.tr.msgThenaOverloaded : translations.en.msgThenaOverloaded, 'error');
                return;
            }
            showNotification(`Error: ${data.content || 'Unknown Error'}`, 'error');
            return;
        }
    } catch (error) {
        if (genNotif) genNotif();
        console.error('Generation Error:', error);
        if(typeof playErrorSound === 'function') playErrorSound();
        showNotification((currentLang == "tr" ? translations.tr.msgErrorPrefix : translations.en.msgErrorPrefix) + error.message, 'error');

        setEditorLoadingState(false);
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
                    const pleaseWaitMsg = typeof translations !== 'undefined' ? (currentLang === 'tr' ? translations.tr.msgPleaseWait : translations.en.msgPleaseWait) : (currentLang === 'tr' ? 'Lütfen sayfayı kapatmayınız.' : 'Please do not close the page.');
                    genNotif.update(
                        (currentLang === 'tr') ? `Oluşturuluyor... %${data.progress} - ${pleaseWaitMsg}` : `Generating... ${data.progress}% - ${pleaseWaitMsg}`,
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
                
                showNotification(currentLang === 'tr' ? translations.tr.msgVariationSuccess : translations.en.msgVariationSuccess, 'success', finalUrl);
                
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
                        model: `Image Editor (${editorSelectedModel === 'v2' ? 'NeuralFlow' : editorSelectedModel === 'v3' ? 'Synapse' : 'PixelFusion'})`,
                        size: 'Auto',
                        timestamp: new Date().toISOString(),
                        moderation: moderationLevel || 'high',
                        features: { type: 'editor_variation' },
                        originalImage: originalResized
                    });
                }
                
                setEditorLoadingState(false);
            } else {
                if (genNotif) genNotif();
                if(typeof playErrorSound === 'function') playErrorSound();
                showNotification((currentLang == "tr" ? translations.tr.msgErrorPrefix : translations.en.msgErrorPrefix) + data.content, 'error');
                setEditorLoadingState(false);
                return;
            }
        } catch (error) {
            if (genNotif) genNotif();
            console.error('Polling Error:', error);
            if(typeof playErrorSound === 'function') playErrorSound();
            showNotification((currentLang == "tr" ? translations.tr.msgErrorPrefix : translations.en.msgErrorPrefix) + error.message, 'error');
            setEditorLoadingState(false);
        }
    };
    checkStatus();
}

function setEditorLoadingState(isLoading) {
    const generateBtn = document.getElementById('editor-generate-btn');
    const promptInput = document.getElementById('editor-prompt');
    const fileInput = document.getElementById('editor-file-input');
    const clearBtn = document.getElementById('editor-clear-btn');
    const uploadArea = document.getElementById('editor-upload-area');
    const presetCards = document.querySelectorAll('.preset-card');
    const modelArea = document.getElementById('editor-model-selector');

    const disabledState = !!isLoading;

    if (generateBtn) {
        generateBtn.disabled = disabledState;
        if (disabledState) {
             generateBtn.innerText = (typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Model Yükleniyor...' : 'Model Loading...';
        } else {
             generateBtn.innerText = (typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Varyasyon Oluştur' : 'Generate Variation';
        }
    }

    if (promptInput) promptInput.disabled = disabledState;
    if (fileInput) fileInput.disabled = disabledState;
    
    const pointerEvents = disabledState ? 'none' : '';
    const opacity = disabledState ? '0.5' : '';

    if (clearBtn) {
        clearBtn.style.pointerEvents = pointerEvents;
        clearBtn.style.opacity = opacity;
    }
    
    if (modelArea) {
        modelArea.style.pointerEvents = pointerEvents;
        modelArea.style.opacity = opacity;
    }

    if (uploadArea) {
        uploadArea.style.pointerEvents = pointerEvents;
        uploadArea.style.opacity = disabledState ? '0.7' : '';
    }

    for(let i = 0; i < presetCards.length; i++) {
        presetCards[i].style.pointerEvents = pointerEvents;
        presetCards[i].style.opacity = opacity;
    }
}

function initEditorAppSelector() {
    const selectorBtn = document.getElementById('editor-app-selector-btn');
    const popup = document.getElementById('editor-app-popup');
    const cards = document.querySelectorAll('.editor-app-card');

    if (!selectorBtn || !popup) return;

    selectorBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = popup.style.display !== 'none';
        if (isOpen) {
            popup.style.display = 'none';
            selectorBtn.classList.remove('open');
            selectorBtn.setAttribute('aria-expanded', 'false');
        } else {
            popup.style.display = 'block';
            selectorBtn.classList.add('open');
            selectorBtn.setAttribute('aria-expanded', 'true');
            if (typeof playInformationSound === 'function') playInformationSound();
        }
    });

    document.addEventListener('click', (e) => {
        if (popup.style.display !== 'none' &&
            !popup.contains(e.target) &&
            !selectorBtn.contains(e.target)) {
            popup.style.display = 'none';
            selectorBtn.classList.remove('open');
            selectorBtn.setAttribute('aria-expanded', 'false');
        }
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const app = card.dataset.app;
            if (app === editorCurrentMode) {
                popup.style.display = 'none';
                selectorBtn.classList.remove('open');
                selectorBtn.setAttribute('aria-expanded', 'false');
                return;
            }
            cards.forEach(c => {
                c.classList.remove('active');
                const check = c.querySelector('.editor-app-card-check');
                if (check) check.style.opacity = '0';
            });
            card.classList.add('active');
            const check = card.querySelector('.editor-app-card-check');
            if (check) check.style.opacity = '1';

            switchEditorMode(app);
            if (typeof playInformationSound === 'function') playInformationSound();

            popup.style.display = 'none';
            selectorBtn.classList.remove('open');
            selectorBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

function switchEditorMode(mode) {
    editorCurrentMode = mode;
    const editControls = document.getElementById('editor-edit-mode-controls');
    const outpaintControls = document.getElementById('editor-outpaint-mode-controls');
    const selectorLabel = document.getElementById('editor-app-selector-label');
    const selectorIcon = document.querySelector('.editor-app-selector-icon svg');
    const uploadArea = document.getElementById('editor-upload-area');
    const moderationBtn = document.getElementById('editor-moderation-btn');

    if (mode === 'outpaint') {
        if (editControls) editControls.style.display = 'none';
        if (outpaintControls) outpaintControls.style.display = 'block';
        if (selectorLabel) selectorLabel.textContent = 'Outpaint';
        if (uploadArea) uploadArea.classList.add('outpaint-mode');
        if (moderationBtn) moderationBtn.style.display = 'none';
        if (selectorIcon) {
            selectorIcon.innerHTML = `<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><line x1="3" y1="12" x2="21" y2="12"/>`;
        }
        if (typeof updateOutpaintPreview === 'function') updateOutpaintPreview();
        if (typeof updateOutpaintPresets === 'function') updateOutpaintPresets();
    } else {
        if (editControls) editControls.style.display = 'block';
        if (outpaintControls) outpaintControls.style.display = 'none';
        if (selectorLabel) selectorLabel.textContent = currentLang === 'tr' ? 'Resim Düzenleme' : 'Image Editing';
        if (uploadArea) uploadArea.classList.remove('outpaint-mode');
        if (moderationBtn) moderationBtn.style.display = 'flex';
        if (selectorIcon) {
            selectorIcon.innerHTML = `<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>`;
        }
    }
}



function updateOutpaintPreview() {
    const svg = document.getElementById('outpaint-preview-svg');
    if (!svg) return;

    if (!editorSelectedFile) {
        svg.innerHTML = `<rect x="24" y="24" width="32" height="32" rx="4" fill="rgba(168,85,247,0.15)" stroke="#a855f7" stroke-width="2"/>`;
        return;
    }

    let natW = 1, natH = 1;
    const img = document.getElementById('editor-preview-img');
    if (editorSelectedFile && img) {
        if (img.naturalWidth === 0) {
            setTimeout(updateOutpaintPreview, 10);
            return;
        }
        natW = img.naturalWidth;
        natH = img.naturalHeight;
    }

    const t = parseInt(document.getElementById('outpaint-top')?.value) || 0;
    const b = parseInt(document.getElementById('outpaint-bottom')?.value) || 0;
    const l = parseInt(document.getElementById('outpaint-left')?.value) || 0;
    const r = parseInt(document.getElementById('outpaint-right')?.value) || 0;

    const totalW = natW + l + r;
    const totalH = natH + t + b;

    const maxDim = 64;
    const scale = Math.min(maxDim / totalW, maxDim / totalH);

    const drawW = natW * scale;
    const drawH = natH * scale;
    const drawT = t * scale;
    const drawB = b * scale;
    const drawL = l * scale;
    const drawR = r * scale;

    const totalDrawW = totalW * scale;
    const totalDrawH = totalH * scale;

    const offsetX = (80 - totalDrawW) / 2;
    const offsetY = (80 - totalDrawH) / 2;

    const imgX = offsetX + drawL;
    const imgY = offsetY + drawT;

    let svgHtml = '';

    if (t > 0) {
        svgHtml += `<rect x="${imgX}" y="${offsetY}" width="${drawW}" height="${drawT}" fill="rgba(236,72,153,0.2)" stroke="#ec4899" stroke-width="1" stroke-dasharray="2 2" rx="2" />`;
    }
    if (b > 0) {
        svgHtml += `<rect x="${imgX}" y="${imgY + drawH}" width="${drawW}" height="${drawB}" fill="rgba(236,72,153,0.2)" stroke="#ec4899" stroke-width="1" stroke-dasharray="2 2" rx="2" />`;
    }
    if (l > 0) {
        svgHtml += `<rect x="${offsetX}" y="${imgY}" width="${drawL}" height="${drawH}" fill="rgba(236,72,153,0.2)" stroke="#ec4899" stroke-width="1" stroke-dasharray="2 2" rx="2" />`;
    }
    if (r > 0) {
        svgHtml += `<rect x="${imgX + drawW}" y="${imgY}" width="${drawR}" height="${drawH}" fill="rgba(236,72,153,0.2)" stroke="#ec4899" stroke-width="1" stroke-dasharray="2 2" rx="2" />`;
    }

    svgHtml += `<rect x="${imgX}" y="${imgY}" width="${drawW}" height="${drawH}" rx="4" fill="rgba(168,85,247,0.15)" stroke="#a855f7" stroke-width="2"/>`;

    if (t > 0) {
        svgHtml += `<path d="M${imgX + drawW/2 - 3} ${imgY - 4} L${imgX + drawW/2} ${imgY - 8} L${imgX + drawW/2 + 3} ${imgY - 4}" fill="none" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round"/>`;
    }
    if (b > 0) {
        svgHtml += `<path d="M${imgX + drawW/2 - 3} ${imgY + drawH + 4} L${imgX + drawW/2} ${imgY + drawH + 8} L${imgX + drawW/2 + 3} ${imgY + drawH + 4}" fill="none" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round"/>`;
    }
    if (l > 0) {
        svgHtml += `<path d="M${imgX - 4} ${imgY + drawH/2 - 3} L${imgX - 8} ${imgY + drawH/2} L${imgX - 4} ${imgY + drawH/2 + 3}" fill="none" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round"/>`;
    }
    if (r > 0) {
        svgHtml += `<path d="M${imgX + drawW + 4} ${imgY + drawH/2 - 3} L${imgX + drawW + 8} ${imgY + drawH/2} L${imgX + drawW + 4} ${imgY + drawH/2 + 3}" fill="none" stroke="#ec4899" stroke-width="1.5" stroke-linecap="round"/>`;
    }

    svg.innerHTML = svgHtml;
}

function updateOutpaintPresets() {
    const presetsContainer = document.getElementById('outpaint-presets');
    const buttonsContainer = document.getElementById('outpaint-preset-buttons');
    if (!presetsContainer || !buttonsContainer) return;

    if (!editorSelectedFile) {
        presetsContainer.style.display = 'none';
        return;
    }

    const img = document.getElementById('editor-preview-img');
    if (!img || img.naturalWidth === 0) {
        setTimeout(updateOutpaintPresets, 10);
        return;
    }

    const natW = img.naturalWidth;
    const natH = img.naturalHeight;

    const targets = [
        { name: "1:1", ratio: 1/1 },
        { name: "16:9", ratio: 16/9 },
        { name: "9:16", ratio: 9/16 },
        { name: "4:3", ratio: 4/3 },
        { name: "3:4", ratio: 3/4 }
    ];

    let buttonsHtml = '';

    targets.forEach(t => {
        const currentRatio = natW / natH;
        if (Math.abs(currentRatio - t.ratio) < 0.05) return;

        let addW = 0;
        let addH = 0;

        if (t.ratio > currentRatio) {
            const targetW = Math.round(natH * t.ratio);
            addW = targetW - natW;
        } else {
            const targetH = Math.round(natW / t.ratio);
            addH = targetH - natH;
        }

        addW = Math.ceil(addW / 64) * 64;
        addH = Math.ceil(addH / 64) * 64;

        if (addW > 0 || addH > 0) {
            let l = Math.floor(addW / 2 / 64) * 64;
            let r = addW - l;
            let top = Math.floor(addH / 2 / 64) * 64;
            let bot = addH - top;

            l = Math.min(l, 1024);
            r = Math.min(r, 1024);
            top = Math.min(top, 1024);
            bot = Math.min(bot, 1024);

            buttonsHtml += `<button class="outpaint-preset-btn" data-t="${top}" data-b="${bot}" data-l="${l}" data-r="${r}">➔ ${t.name}</button>`;
        }
    });

    if (buttonsHtml) {
        buttonsContainer.innerHTML = buttonsHtml;
        presetsContainer.style.display = 'flex';
        
        buttonsContainer.querySelectorAll('.outpaint-preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tInput = document.getElementById('outpaint-top');
                const bInput = document.getElementById('outpaint-bottom');
                const lInput = document.getElementById('outpaint-left');
                const rInput = document.getElementById('outpaint-right');
                
                if(tInput) tInput.value = btn.dataset.t;
                if(bInput) bInput.value = btn.dataset.b;
                if(lInput) lInput.value = btn.dataset.l;
                if(rInput) rInput.value = btn.dataset.r;
                
                if (typeof updateOutpaintPreview === 'function') updateOutpaintPreview();
                if (typeof checkOutpaintFormReady === 'function') checkOutpaintFormReady();
            });
        });
    } else {
        presetsContainer.style.display = 'none';
    }
}

function checkOutpaintFormReady() {
    const btn = document.getElementById('outpaint-generate-btn');
    const apiKey = document.getElementById('api-key')?.value?.trim();
    const hasFile = !!editorSelectedFile;
    const top = parseInt(document.getElementById('outpaint-top')?.value) || 0;
    const bottom = parseInt(document.getElementById('outpaint-bottom')?.value) || 0;
    const left = parseInt(document.getElementById('outpaint-left')?.value) || 0;
    const right = parseInt(document.getElementById('outpaint-right')?.value) || 0;
    const hasValues = top > 0 || bottom > 0 || left > 0 || right > 0;

    if (btn) {
        if (apiKey && hasFile && hasValues) {
            btn.classList.add('ready');
            btn.disabled = false;
        } else {
            btn.classList.remove('ready');
        }
    }
}

async function generateOutpaint() {
    const apiKey = document.getElementById('api-key')?.value?.trim();
    const btn = document.getElementById('outpaint-generate-btn');

    if (!apiKey) {
        if (typeof playErrorSound === 'function') playErrorSound();
        showNotification(currentLang === 'tr' ? translations.tr.msgApiKeyRequired : translations.en.msgApiKeyRequired, 'error');
        return;
    }
    if (!editorSelectedFile) {
        if (typeof playErrorSound === 'function') playErrorSound();
        showNotification(currentLang === 'tr' ? translations.tr.msgImgRequired : translations.en.msgImgRequired, 'error');
        return;
    }

    const top = parseInt(document.getElementById('outpaint-top')?.value) || 0;
    const bottom = parseInt(document.getElementById('outpaint-bottom')?.value) || 0;
    const left = parseInt(document.getElementById('outpaint-left')?.value) || 0;
    const right = parseInt(document.getElementById('outpaint-right')?.value) || 0;

    if (top === 0 && bottom === 0 && left === 0 && right === 0) {
        if (typeof playErrorSound === 'function') playErrorSound();
        showNotification(currentLang === 'tr' ? 'Lütfen en az bir yön için piksel değeri girin.' : 'Please enter at least one direction pixel value.', 'error');
        return;
    }

    setOutpaintLoadingState(true);

    if (typeof playStartSound === 'function') playStartSound();
    const pleaseWait = currentLang === 'tr' ? translations.tr.msgPleaseWait : translations.en.msgPleaseWait;
    let genNotif = showNotification(
        (currentLang === 'tr' ? 'Outpaint işlemi başlatıldı. Sıraya alındı. ' : 'Outpaint queued. ') + pleaseWait,
        'info', null, 120000, 0
    );

    try {
        const payload = {
            image: editorSelectedFile,
            top: top == 0 ? 1 : top,
            left: left == 0 ? 1 : left,
            bottom: bottom == 0 ? 1 : bottom,
            right: right == 0 ? 1 : right
        };

        const response = await fetch('https://create.thena.workers.dev/outpaintApp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.status === 200 && data.image) {
            await pollOutpaintGeneration(data.image, apiKey, genNotif, editorSelectedFile, { top, left, bottom, right });
        } else {
            if (genNotif) genNotif();
            if (typeof playErrorSound === 'function') playErrorSound();
            setOutpaintLoadingState(false);
            if (data.status === 429) {
                showNotification(currentLang === 'tr' ? translations.tr.msgLimitWait.replace('{0}', data.remainingSeconds) : translations.en.msgLimitWait.replace('{0}', data.remainingSeconds), 'error');
            } else if (data.status === 401) {
                showNotification(currentLang === 'tr' ? translations.tr.invalidApiKey : translations.en.invalidApiKey, 'error');
            } else if (data.status === 423) {
                showNotification(currentLang === 'tr' ? translations.tr.msgThenaOverloaded : translations.en.msgThenaOverloaded, 'error');
            } else {
                showNotification(`Error: ${data.content || 'Unknown Error'}`, 'error');
            }
        }
    } catch (error) {
        if (genNotif) genNotif();
        if (typeof playErrorSound === 'function') playErrorSound();
        showNotification((currentLang === 'tr' ? translations.tr.msgErrorPrefix : translations.en.msgErrorPrefix) + error.message, 'error');
        setOutpaintLoadingState(false);
    }
}

async function pollOutpaintGeneration(id, apiKey, genNotif, originalImage, dims) {
    const btn = document.getElementById('outpaint-generate-btn');

    await new Promise(r => setTimeout(r, 2000));

    const checkStatus = async () => {
        try {
            const response = await fetch(`https://create.thena.workers.dev/status?id=${id}`, {
                headers: { 'apikey': apiKey }
            });
            const data = await response.json();

            if (data.status === 202) {
                if (data.progress && btn) {
                    const span = btn.querySelector('#txt-outpaint-btn');
                    if (span) span.textContent = currentLang === 'tr' ? `Oluşturuluyor... ${data.progress}%` : `Generating... ${data.progress}%`;
                }
                if (genNotif && typeof genNotif.update === 'function') {
                    const pleaseWait = currentLang === 'tr' ? translations.tr.msgPleaseWait : translations.en.msgPleaseWait;
                    genNotif.update(
                        (currentLang === 'tr') ? `Outpaint... %${data.progress} - ${pleaseWait}` : `Outpaint... ${data.progress}% - ${pleaseWait}`,
                        'info',
                        data.progress
                    );
                }
                setTimeout(checkStatus, 5000);

            } else if (data.status === 200) {
                if (genNotif) genNotif();
                if (typeof playSuccessSound === 'function') playSuccessSound();

                let finalUrl = data.image;
                if (!finalUrl.startsWith('data:image') && !finalUrl.startsWith('http')) {
                    finalUrl = `data:image/png;base64,${finalUrl}`;
                }

                showNotification(
                    currentLang === 'tr' ? 'Outpaint başarıyla tamamlandı!' : 'Outpaint completed successfully!',
                    'success', finalUrl
                );

                if (typeof dbHelper !== 'undefined') {
                    let originalResized = null;
                    if (originalImage && originalImage.startsWith('data:image')) {
                        try { originalResized = await resizeBase64Image(originalImage, 0.5); } catch(e) {}
                    }
                    await dbHelper.add({
                        url: finalUrl,
                        prompt: '',
                        model: 'Outpaint',
                        size: 'Auto',
                        timestamp: new Date().toISOString(),
                        moderation: "high",
                        features: {},
                        originalImage: originalResized
                    });
                }

                setOutpaintLoadingState(false);
            } else {
                if (genNotif) genNotif();
                if (typeof playErrorSound === 'function') playErrorSound();
                showNotification((currentLang === 'tr' ? translations.tr.msgErrorPrefix : translations.en.msgErrorPrefix) + data.content, 'error');
                setOutpaintLoadingState(false);
            }
        } catch (error) {
            if (genNotif) genNotif();
            if (typeof playErrorSound === 'function') playErrorSound();
            showNotification((currentLang === 'tr' ? translations.tr.msgErrorPrefix : translations.en.msgErrorPrefix) + error.message, 'error');
            setOutpaintLoadingState(false);
        }
    };
    checkStatus();
}

function setOutpaintLoadingState(isLoading) {
    const btn = document.getElementById('outpaint-generate-btn');
    const span = btn ? btn.querySelector('#txt-outpaint-btn') : null;
    const fileInput = document.getElementById('editor-file-input');
    const uploadArea = document.getElementById('editor-upload-area');

    let overlay = document.getElementById('outpaint-global-loading-overlay');
    if (isLoading) {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'outpaint-global-loading-overlay';
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            overlay.style.zIndex = '49999';
            overlay.style.pointerEvents = 'all';
            document.body.appendChild(overlay);
        }
        overlay.style.display = 'block';
    } else {
        if (overlay) overlay.style.display = 'none';
    }

    if (btn) btn.disabled = !!isLoading;
    if (span) {
        span.textContent = isLoading
            ? (currentLang === 'tr' ? 'Oluşturuluyor...' : 'Generating...')
            : (currentLang === 'tr' ? 'Outpaint Yap' : 'Run Outpaint');
    }
    if (fileInput) fileInput.disabled = !!isLoading;
    if (uploadArea) {
        uploadArea.style.pointerEvents = isLoading ? 'none' : '';
        uploadArea.style.opacity = isLoading ? '0.7' : '';
    }
    if (!isLoading) checkOutpaintFormReady();
}

document.addEventListener('DOMContentLoaded', () => {
    initEditorAppSelector();

    ['outpaint-top', 'outpaint-bottom', 'outpaint-left', 'outpaint-right'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', () => {
                if (typeof updateOutpaintPreview === 'function') updateOutpaintPreview();
                checkOutpaintFormReady();
            });
            el.addEventListener('wheel', (e) => {
                if (document.activeElement === el) {
                    e.preventDefault();
                    let val = parseInt(el.value) || 0;
                    const step = parseInt(el.step) || 64;
                    const max = parseInt(el.max) || 1024;
                    const min = parseInt(el.min) || 0;
                    
                    if (e.deltaY < 0) val += step;
                    else val -= step;
                    
                    if (val > max) val = max;
                    if (val < min) val = min;
                    
                    el.value = val;
                    if (typeof updateOutpaintPreview === 'function') updateOutpaintPreview();
                    checkOutpaintFormReady();
                }
            }, { passive: false });
        }
    });

    const resetBtn = document.getElementById('outpaint-reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            ['outpaint-top', 'outpaint-bottom', 'outpaint-left', 'outpaint-right'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = 0;
            });
            if (typeof updateOutpaintPreview === 'function') updateOutpaintPreview();
            checkOutpaintFormReady();
        });
    }

    const outpaintBtn = document.getElementById('outpaint-generate-btn');
    if (outpaintBtn) {
        outpaintBtn.addEventListener('click', generateOutpaint);
    }

    const apiKeyInput = document.getElementById('api-key');
    if (apiKeyInput) {
        apiKeyInput.addEventListener('input', checkOutpaintFormReady);
    }
});
