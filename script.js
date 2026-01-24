
            function base64ToBlob(base64, mimeType) {
                const byteCharacters = atob(base64.split(',')[1]);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                return new Blob([byteArray], { type: mimeType });
            }

            const audioCtx = new(window.AudioContext || window.webkitAudioContext)();
            let isMuted = localStorage.getItem('thena-mute-mode') === 'true';

            function playTone(type, freqStart, freqEnd, duration, delay = 0, volume = 0.1) {
                if (isMuted) return;
                if (audioCtx.state === 'suspended') audioCtx.resume();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freqStart, audioCtx.currentTime + delay);
                if (freqEnd) {
                    osc.frequency.exponentialRampToValueAtTime(freqEnd, audioCtx.currentTime + delay + duration);
                }
                gain.gain.setValueAtTime(volume, audioCtx.currentTime + delay);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + delay + duration);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(audioCtx.currentTime + delay);
                osc.stop(audioCtx.currentTime + delay + duration);
            }

            function playStartSound() {
                playTone('sine', 300, 600, 0.4, 0, 0.7);
            }

            function playErrorSound() {
                playTone('sawtooth', 220, 150, 0.2, 0, 0.4);
                playTone('sawtooth', 140, 100, 0.3, 0.15, 0.4);
            }
            function playModelSelectSound(isActive) {
                if (isActive) {
                    playTone('sine', 300, 600, 0.15, 0, 0.3);
                    playTone('triangle', 150, 300, 0.15, 0, 0.1);
                } else {
                    playTone('sine', 500, 200, 0.15, 0, 0.2);
                }
            }

            function playRatioSelectSound(isActive) {
                if (isActive) {
                    playTone('square', 800, 1200, 0.06, 0, 0.08);
                } else {
                    playTone('triangle', 600, 300, 0.1, 0, 0.1);
                }
            }

            function playFeatureToggleSound(isActive) {
                if (isActive) {
                    playTone('sine', 800, 1200, 0.1, 0, 0.15);
                } else {
                    playTone('sine', 1000, 600, 0.1, 0, 0.15);
                }
            }

            function playSuccessSound() {
                playTone('sine', 523.25, null, 0.3, 0);
                playTone('sine', 659.25, null, 0.4, 0.4);
                playTone('sine', 783.99, null, 0.6, 0.5);
            }

            function playInformationSound() {
                playTone('sine', 550, null, 0.1, 0, 0.6);
                playTone('sine', 880, null, 0.3, 0.1, 0.6);
            }

            function playGalleryUpdatedSound() {
                playTone('sine', 400, 600, 0.1, 0, 0.6);
                playTone('sine', 600, 1200, 0.15, 0.05, 0.55);
            }

            function playDeleteAllWarningSound() {
                playTone('sawtooth', 300, 100, 0.4, 0, 0.2);
                playTone('square', 150, 50, 0.4, 0.05, 0.15);
            }

            function playBusySound() {
                playTone('triangle', 440, 400, 0.1, 0, 0.4);
                playTone('triangle', 440, 400, 0.1, 0.15, 0.4);
            }
            let selectedModel = null;
            let selectedAspectRatio = null;
            let btnFast, btnCreative, btnDense, btnMovie, btnHighRes, btnEnhance;
            let allExtraBtns = [];
            let selectedSize = null;
	        let isGalleryLoading = false;
            let models = [];
            let lastRenderId = 0;
            let apiKeyVisible = false;
            let lastEnhancedPrompt = "";
            let isPromptEnhancedByWand = false;
            const viewShareBtn = document.getElementById('btn-share-view');
            const viewShareWrapper = document.getElementById('share-view-wrapper');
            let currentPage = 1;
            const itemsPerPage = 24;
            let currentFilteredItems = []; 
            const DB_NAME = 'ThenaGalleryDB';
            const DB_VERSION = 1;
            const STORE_NAME = 'images';
            let isGeneratingImage = false;
            let currentGenParams = null;
            let pendingEnhancedPrompt = "";

            function createDots(count, type) {
                const icons = {
                    intelligence: {
                        viewBox: "0 0 64 64",
                        content: `
                        <g transform="translate(0,64) scale(0.1,-0.1)">
                            <path d="M310 570 c0 -22 5 -40 10 -40 6 0 10 18 10 40 0 22 -4 40 -10 40 -5 0 -10 -18 -10 -40z"/>
                            <path d="M97 543 c-8 -12 60 -79 70 -69 4 3 -9 23 -29 42 -19 20 -38 32 -41 27z"/>
                            <path d="M500 515 c-19 -19 -30 -38 -26 -42 3 -4 23 9 42 29 20 19 32 38 27 41 -6 4 -25 -9 -43 -28z"/>
                            <path d="M278 500 c-75 -23 -127 -102 -115 -175 8 -48 86 -165 110 -165 16 0 18 5 13 33 -3 17 -8 51 -12 75 -4 26 -12 42 -20 42 -8 0 -14 5 -14 10 0 6 33 10 80 10 47 0 80 -4 80 -10 0 -5 -6 -10 -14 -10 -8 0 -16 -16 -20 -42 -4 -24 -9 -58 -12 -76 -5 -27 -3 -32 13 -32 30 0 105 122 110 179 9 104 -100 192 -199 161z"/>
                            <path d="M50 320 c0 -5 18 -10 40 -10 22 0 40 5 40 10 0 6 -18 10 -40 10 -22 0 -40 -4 -40 -10z"/>
                            <path d="M510 320 c0 -5 18 -10 40 -10 22 0 40 5 40 10 0 6 -18 10 -40 10 -22 0 -40 -4 -40 -10z"/>
                            <path d="M304 248 c11 -95 20 -95 31 0 7 60 6 62 -15 62 -22 0 -22 -2 -16 -62z"/>
                            <path d="M250 120 c0 -6 30 -10 70 -10 40 0 70 4 70 10 0 6 -30 10 -70 10 -40 0 -70 -4 -70 -10z"/>
                            <path d="M262 68 c7 -21 55 -33 85 -22 52 18 39 34 -27 34 -45 0 -61 -3 -58 -12z"/>
                        </g>`
                    },
                    
                    quality: {
                        viewBox: "0 0 64 64",
                        content: `
                        <g transform="translate(0,64) scale(0.1,-0.1)">
                            <path d="M120 585 c0 -3 14 -28 31 -56 l32 -51 53 53 c30 29 54 55 54 56 0 2 -38 3 -85 3 -47 0 -85 -2 -85 -5z"/>
                            <path d="M400 535 c30 -30 55 -55 56 -55 4 0 64 100 64 105 0 3 -39 5 -87 5 l-87 0 54 -55z"/>
                            <path d="M51 532 c-22 -27 -41 -53 -41 -56 0 -3 32 -6 70 -6 39 0 70 3 70 8 0 4 -13 29 -29 55 l-28 48 -42 -49z"/>
                            <path d="M260 525 l-54 -55 114 0 114 0 -54 55 c-30 30 -57 55 -60 55 -3 0 -30 -25 -60 -55z"/>
                            <path d="M518 532 c-16 -28 -28 -53 -28 -56 0 -3 32 -6 70 -6 39 0 70 3 70 8 0 4 -19 29 -43 55 l-42 48 -27 -49z"/>
                            <path d="M136 270 c76 -99 139 -179 141 -177 3 3 -28 105 -93 310 l-16 47 -84 0 -85 0 137 -180z"/>
                            <path d="M200 438 c1 -25 117 -380 123 -372 8 14 117 361 117 373 0 7 -38 11 -120 11 -89 0 -120 -3 -120 -12z"/>
                            <path d="M456 403 c-65 -205 -96 -307 -93 -310 2 -2 65 78 141 177 l137 180 -85 0 -84 0 -16 -47z"/>
                        </g>`
                    },
                    
                    speed: {
                        viewBox: "0 0 64 64",
                        content: '<g transform="translate(0,64) scale(0.1,-0.1)"><path d="M258 454 c-93 -91 -168 -169 -168 -172 1 -21 22 -32 79 -41 35 -6 65 -12 67 -14 2 -1 -21 -42 -52 -89 -55 -87 -61 -118 -23 -118 21 0 378 275 386 297 10 26 -18 41 -87 48 -39 4 -70 8 -70 10 0 1 20 50 45 109 24 58 42 113 39 121 -15 38 -52 12 -216 -151z"/></g>'
                    },
                    
                    default: {
                        viewBox: "0 0 24 24",
                        content: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>'
                    }
                };

                const iconData = icons[type] || icons.default;

                let html = '';
                for (let i = 0; i < 5; i++) {
                    const isFilled = i < count ? 'filled' : '';
                    html += `
                        <svg class="rating-icon ${isFilled}" viewBox="${iconData.viewBox}">
                            ${iconData.content}
                        </svg>`;
                }
                return html;
            }

            function getPlaceholderHTML(width, height) {
                let spanClass = '';
                const ratio = width / height;
                if (ratio >= 1.7) spanClass = 'wide';
                else if (ratio <= 0.6) spanClass = 'tall';

                return `
                    <div class="gallery-item ${spanClass} placeholder show" id="active-generation-placeholder">
                        <div class="placeholder-loader"></div>
                        <div class="placeholder-text">Generating Image...</div>
                        
                        <svg class="magic-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg class="magic-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg class="magic-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg class="magic-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg class="magic-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                `;
            }
            const dbHelper = {
                open: () => {
                    return new Promise((resolve, reject) => {
                        const request = indexedDB.open(DB_NAME, DB_VERSION);
                        request.onupgradeneeded = (event) => {
                            const db = event.target.result;
                            if (!db.objectStoreNames.contains(STORE_NAME)) {
                                db.createObjectStore(STORE_NAME, {
                                    keyPath: 'timestamp'
                                });
                            }
                        };
                        request.onsuccess = (event) => resolve(event.target.result);
                        request.onerror = (event) => reject('Database error: ' + event.target.errorCode);
                    });
                },
                add: async (data) => {
                    const db = await dbHelper.open();
                    return new Promise((resolve, reject) => {
                        const transaction = db.transaction([STORE_NAME], 'readwrite');
                        const store = transaction.objectStore(STORE_NAME);
                        const request = store.add(data);
                        request.onsuccess = () => resolve(request.result);
                        request.onerror = () => reject(request.error);
                    });
                },
                getAll: async () => {
                    const db = await dbHelper.open();
                    return new Promise((resolve, reject) => {
                        const transaction = db.transaction([STORE_NAME], 'readonly');
                        const store = transaction.objectStore(STORE_NAME);
                        const request = store.getAll();
                        request.onsuccess = () => {
                            resolve(request.result);
                        };
                        request.onerror = () => reject(request.error);
                    });
                },
                delete: async (timestamp) => {
                    const db = await dbHelper.open();
                    return new Promise((resolve, reject) => {
                        const transaction = db.transaction([STORE_NAME], 'readwrite');
                        const store = transaction.objectStore(STORE_NAME);
                        const request = store.delete(timestamp);
                        request.onsuccess = () => resolve(request.result);
                        request.onerror = () => reject(request.error);
                    });
                },
                clear: async () => {
                    const db = await dbHelper.open();
                    return new Promise((resolve, reject) => {
                        const transaction = db.transaction([STORE_NAME], 'readwrite');
                        const store = transaction.objectStore(STORE_NAME);
                        const request = store.clear();
                        request.onsuccess = () => resolve(request.result);
                        request.onerror = () => reject(request.error);
                    });
                }
            };
            const LS_KEYS = {
                API_KEY: 'thena-api-key',
                PROMPT: 'thena-last-prompt',
                MODEL: 'thena-last-model',
                RATIO: 'thena-last-ratio',
                SIZE: 'thena-last-size'
            };
            const apiKeyInput = document.getElementById('api-key');
            const promptInput = document.getElementById('prompt');
            const generateBtn = document.getElementById('generate-btn');
            const magicWandBtn = document.getElementById('magic-wand-btn');

            function autoResize(element) {
                element.style.height = 'auto';
                element.style.height = element.scrollHeight + 'px';
            }
            const savedApiKey = localStorage.getItem(LS_KEYS.API_KEY);
            if (savedApiKey) apiKeyInput.value = savedApiKey;
            const savedPrompt = localStorage.getItem(LS_KEYS.PROMPT);
            if (savedPrompt) promptInput.value = savedPrompt;
            apiKeyInput.addEventListener('input', () => {
                const apiKey = apiKeyInput.value.trim();
                if (apiKey) localStorage.setItem(LS_KEYS.API_KEY, apiKey);
                else localStorage.removeItem(LS_KEYS.API_KEY);
                checkFormReady();
            });
            promptInput.addEventListener('input', () => {
                autoResize(promptInput);
                localStorage.setItem(LS_KEYS.PROMPT, promptInput.value);
                if (magicWandBtn.classList.contains('disabled')) {
                    const currentVal = promptInput.value.trim();
                    if (currentVal !== lastEnhancedPrompt) {
                        magicWandBtn.classList.remove('disabled');
                    }
                }
                checkFormReady();
            });

            ['click', 'focus'].forEach(evt => {
                promptInput.addEventListener(evt, () => {
                    autoResize(promptInput);
                });
            });

            function typeWriterEffect(text, element) {
                let i = 0;
                element.value = "";
                element.style.height = 'auto';
                const interval = setInterval(() => {
                    if (i < text.length) {
                        element.value += text.charAt(i);
                        autoResize(element);
                        
                        const charCountEl = document.getElementById('char-count');
                        if(charCountEl) charCountEl.textContent = `${element.value.length} / ${element.maxLength}`;
                        
                        i++;
                    } else {
                        clearInterval(interval);
                        localStorage.setItem(LS_KEYS.PROMPT, element.value);
                        checkFormReady();
                    }
                }, 7);
            }
            magicWandBtn.addEventListener('click', async () => {
                const currentPrompt = promptInput.value.trim();
                const apiKey = apiKeyInput.value.trim();
                
                if (!currentPrompt) {
                    if(typeof playErrorSound === "function") playErrorSound();
                    showNotification(currentLang == "tr" ? "Prompt alanı boş! Lütfen bir şey yazın." : "The prompt field is empty! Please type something.", "error");
                    return;
                }
                if (!apiKey) {
                    if(typeof playErrorSound === "function") playErrorSound();
                    showNotification(currentLang == "tr" ? "Lütfen API anahtarı girin." : "Please enter the API key first.", "error");
                    return;
                }
                
                if(typeof playInformationSound === "function") playInformationSound();
                
                const removeLoading = showNotification(currentLang == "tr" ? "Prompt analiz ediliyor ve iyileştiriliyor..." : "Prompt is being analyzed and enhanced...", "loading");
                
                magicWandBtn.classList.add('loading');
                generateBtn.disabled = true;
                generateBtn.classList.remove('ready');
                
                try {
                    const response = await fetch(`https://create.thena.workers.dev/promptGen?prompt=${encodeURIComponent(currentPrompt)}`, {
                        method: 'GET',
                        headers: {
                            "apikey": apiKey
                        }
                    });
                    const data = await response.json();
                    
                    if (removeLoading) removeLoading(); 

                    if (data.status === 200) {
                        pendingEnhancedPrompt = data.content;
                        openWandModal(currentPrompt, data.content);
                        
                        if(typeof playSuccessSound === "function") playSuccessSound();
                    } else {
                        if(typeof playErrorSound === "function") playErrorSound();
                        showNotification(currentLang == "tr" ? "Prompt oluşturulamadı. Bir hata oluştu." : "The prompt could not be created. An error occurred.", "error");
                        checkFormReady();
                    }
                } catch (error) {
                    if (removeLoading) removeLoading();
                    
                    if(typeof playErrorSound === "function") playErrorSound();
                    showNotification(currentLang == "tr" ? "Bir hata oluştu: " + error.message : "An error occurred:" + error.message, "error");
                    checkFormReady();
                } finally {
                    magicWandBtn.classList.remove('loading');
                }
            });


            const wandModal = document.getElementById('wand-modal');
            const wandOrigText = document.getElementById('wand-orig-text');
            const wandNewText = document.getElementById('wand-new-text');
            const btnWandCancel = document.getElementById('btn-wand-cancel');
            const btnWandConfirm = document.getElementById('btn-wand-confirm');


            function openWandModal(original, enhanced) {
                wandOrigText.textContent = original;
                wandNewText.textContent = enhanced;
                wandModal.classList.add('active');
            }

            btnWandCancel.addEventListener('click', () => {
                wandModal.classList.remove('active');
                pendingEnhancedPrompt = "";
                checkFormReady();
            });

            btnWandConfirm.addEventListener('click', () => {
                wandModal.classList.remove('active');
                
                if (pendingEnhancedPrompt) {
                    lastEnhancedPrompt = pendingEnhancedPrompt;
                    isPromptEnhancedByWand = true;
                    magicWandBtn.classList.add('disabled');
                    
                    typeWriterEffect(pendingEnhancedPrompt, promptInput);
                    
                    showNotification(currentLang == "tr" ? "Prompt başarıyla güncellendi!" : "Prompt updated successfully!", "success");
                }
            });

            wandModal.addEventListener('click', (e) => {
                if (e.target === wandModal) {
                    wandModal.classList.remove('active');
                    checkFormReady();
                }
            });

            const toggleApiKeyBtn = document.getElementById('toggle-api-key');
            const eyeSlash = document.getElementById('eye-slash');
            const eyePath = document.getElementById('eye-path');
            const eyeCircle = document.getElementById('eye-circle');
            var firsload = true

            const moderationBtn = document.getElementById('moderation-btn');
            let moderationLevel = 'high';

            if (moderationBtn) {
                moderationBtn.addEventListener('click', () => {
                    if (moderationLevel === 'high') {
                        moderationLevel = 'medium';
                        showNotification(currentLang == "tr" ? "Moderasyon düzeyi normal olarak ayarlandı." : 'Moderation set to medium.', 'info');
                    } else if (moderationLevel === 'medium') {
                        moderationLevel = 'low';
                        showNotification(currentLang == "tr" ? "Moderasyon düzeyi düşük olarak ayarlandı." : 'Moderation set to low.', 'info');
                    } else {
                        moderationLevel = 'high';
                        showNotification(currentLang == "tr" ? "Moderasyon düzeyi yüksek olarak ayarlandı." : 'Moderation set to high.', 'info');
                    }

                    moderationBtn.setAttribute('data-level', moderationLevel);
                    
                    const titles = {
                        high: currentLang == "tr" ? "Moderasyon: Yüksek" : "Moderation: High (Strict)",
                        medium: currentLang == "tr" ? "Moderasyon: Ortalama" : "Moderation: Medium (Balanced)",
                        low: currentLang == "tr" ? "Moderasyon: Düşük" : "Moderation: Low (Permissive)"
                    };
                    moderationBtn.title = titles[moderationLevel];

                    playInformationSound();
                    
                    moderationBtn.style.transform = 'scale(0.9)';
                    setTimeout(() => moderationBtn.style.transform = '', 150);
                });
            }

            
            toggleApiKeyBtn.addEventListener('click', () => {
                const currentType = apiKeyInput.type;
                const originalValue = apiKeyInput.value;
                
                if (!originalValue) {
                    playInformationSound();
                    showNotification(currentLang == "tr" ? "API Anahtarını giriniz" : "Enter an API Key first", "info");
                    return;
                }
                if(typeof playFeatureToggleSound === "function") playFeatureToggleSound(true);
                apiKeyInput.classList.add('text-hidden');
                setTimeout(() => {
                    if (currentType === 'password') {
                        apiKeyInput.type = 'text';
                        
                        eyeSlash.style.opacity = '1';
                        eyePath.style.opacity = '0.3';
                        eyeCircle.style.opacity = '0.3';
                        
                        apiKeyVisible = true;
                    } else {
                        apiKeyInput.type = 'password';
                        
                        eyeSlash.style.opacity = '0';
                        eyePath.style.opacity = '1';
                        eyeCircle.style.opacity = '1';
                        
                        apiKeyVisible = false;
                    }
                    requestAnimationFrame(() => {
                        apiKeyInput.classList.remove('text-hidden');
                    });

                }, 200);
            });
            const MOVIE_FILTER_SUPPORTED_MODELS = ["8gg12 61812 6628 19729 6b4a5 5060", "551ks 8g6g8 16gga 1h8h8 6b4a5 5060"];
            function checkMovieFilterAvailability(modelId) {
                if (!btnMovie) return;
                const isSupported = MOVIE_FILTER_SUPPORTED_MODELS.includes(modelId);
                if (isSupported) {
                    btnMovie.disabled = false;
                } else {
                    btnMovie.disabled = true;
                    btnMovie.classList.remove('active');
                }
            }
            function checkFastModeAvailability(modelId) {
                if (!btnFast) return;
                const THENA_MAX_ID = "551ks 8g6g8 16gga 1h8h8 6b4a5 5060";
                if (modelId === THENA_MAX_ID) {
                    btnFast.disabled = true;
                    btnFast.classList.remove('active');
                } else {
                    btnFast.disabled = false;
                }
            }

            function updateAdvancedSettingsConstraints(modelId) {
                const advCfg = document.getElementById('adv-cfg');
                const advSteps = document.getElementById('adv-steps');
                
                const labelCfg = document.getElementById('label-cfg-text');
                const labelSteps = document.getElementById('label-steps-text');

                const ANIME_FAST_ID = "6781x 66189 00m162 16g61 00y71 6000";

                if (!advCfg || !advSteps) return;

                if (modelId === ANIME_FAST_ID) {
                    
                    advCfg.max = 4;
                    advSteps.min = 2;
                    advSteps.max = 12;

                    if (labelCfg) labelCfg.textContent = "CFG Scale (1-4)";
                    if (labelSteps) labelSteps.textContent = "Steps (2-12)";

                    if (parseFloat(advCfg.value) > 4) advCfg.value = 1.5;
                    if (parseFloat(advCfg.value) < 1) advCfg.value = 1.5;
                    if (parseInt(advSteps.value) > 12) advSteps.value = 8;
                    if (parseInt(advSteps.value) < 2) advSteps.value = 8;

                    if (localStorage.getItem('thena-advanced-mode') === 'true') {
                        showNotification(currentLang == "tr" ? "Anime Fast modeli için limitler güncelledi." : "Limits updated for Anime Fast model.", "info");
                    }

                } else {
                    advCfg.max = 20;
                    advSteps.min = 10;
                    advSteps.max = 30;
                    if (labelCfg) labelCfg.textContent = "CFG Scale (1-20)";
                    if (labelSteps) labelSteps.textContent = "Steps (10-30)";
                }
            }

            document.addEventListener('DOMContentLoaded', () => {
                const infoCfgBtn = document.getElementById('info-cfg');
                const infoStepsBtn = document.getElementById('info-steps');

                function openAdvInfoModal(title, desc, intel, qual, speed) {
                    const featModal = document.getElementById('feature-info-modal');
                    const featModalTitle = document.getElementById('feat-modal-title');
                    const featModalDesc = document.getElementById('feat-modal-desc');
                    const metricIntel = document.getElementById('metric-intelligence');
                    const metricQual = document.getElementById('metric-quality');
                    const metricSpeed = document.getElementById('metric-speed');

                    featModalTitle.innerHTML = title;
                    featModalDesc.innerHTML = desc; 

                    metricIntel.innerHTML = createDots(intel, 'intelligence');
                    metricQual.innerHTML = createDots(qual, 'quality');
                    metricSpeed.innerHTML = createDots(speed, 'speed');

                    featModal.classList.add('active');
                }

                if (infoCfgBtn) {
                    infoCfgBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const t = translations[currentLang];
                        
                        openAdvInfoModal(
                            t.cfgTitle, 
                            t.cfgDesc,  
                            2, 
                            4, 
                            5
                        );
                    });
                }

                if (infoStepsBtn) {
                    infoStepsBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        const t = translations[currentLang];

                        openAdvInfoModal(
                            t.stepsTitle, 
                            t.stepsDesc,
                            4, 
                            5, 
                            2
                        );
                    });
                }

                btnFast = document.getElementById('feat-fast');
                btnCreative = document.getElementById('feat-creative');
                btnDense = document.getElementById('feat-dense');
                btnMovie = document.getElementById('feat-movie');
                btnHighRes = document.getElementById('feat-highres');
                btnEnhance = document.getElementById('feat-enhance');
                
                if (!btnFast || !btnCreative || !btnDense || !btnMovie || !btnHighRes || !btnEnhance) {
                    return;
                }
                allExtraBtns = [btnFast, btnCreative, btnDense, btnMovie, btnHighRes, btnEnhance];
                const featureData = {
                    'feat-fast': {
                        title: 'Fast Mode',
                        icon: '⚡',
                        desc: 'Optimize generation speed. Reduces generation time significantly but may slightly reduce detail accuracy.',
                        intelligence: 2,
                        quality: 3,
                        speed: 5
                    },
                    'feat-creative': {
                        title: 'Creative Mode',
                        icon: '🎨',
                        desc: 'Increases AI imagination. Results will be more artistic and varied, adhering less strictly to prompt constraints.',
                        intelligence: 4,
                        quality: 4,
                        speed: 2
                    },
                    'feat-dense': {
                        title: 'Dense Mode',
                        icon: '💠',
                        desc: 'Creative Mode on steroids. Unleashes maximum AI imagination (2x Creative), resulting in highly complex, hyper-detailed, and artistic masterpieces.',
                        intelligence: 5, 
                        quality: 2, 
                        speed: 2 
                    },
                    'feat-movie': {
                        title: 'Movie Filter',
                        icon: '🎬',
                        desc: 'Applies cinematic color grading and lighting effects suitable for movie-like shots. Available only on specific models.',
                        intelligence: 3,
                        quality: 5,
                        speed: 3
                    },
                    'feat-highres': {
                        title: 'HighRes',
                        icon: '💎',
                        desc: 'Upscales and refines the output for maximum clarity. Best for large format prints or wallpapers.',
                        intelligence: 3,
                        quality: 5,
                        speed: 1
                    },
                    'feat-enhance': {
                        title: 'Prompt Magic',
                        icon: '✨',
                        desc: 'Automatically enhances your prompt with more details and stylistic improvements before generation. It causes a significant delay in long prompts.',
                        intelligence: 5,
                        quality: 4,
                        speed: 2
                    }
                };
                const featModal = document.getElementById('feature-info-modal');
                const featModalTitle = document.getElementById('feat-modal-title');
                const featModalDesc = document.getElementById('feat-modal-desc');
                const metricIntel = document.getElementById('metric-intelligence');
                const metricQual = document.getElementById('metric-quality');
                const metricSpeed = document.getElementById('metric-speed');
                const closeFeatModal = document.getElementById('close-feat-modal');
                
                allExtraBtns.forEach(btn => {
                    const infoIcon = btn.querySelector('.info-icon-wrapper');
                    if (infoIcon) {
                        infoIcon.addEventListener('click', (e) => {
                            e.stopPropagation();
                            
                            const data = featureData[btn.id];
                            if (!data) return;
                            
                            const t = translations[currentLang];
                            
                            let titleText = "";
                            let descText = "";

                            if(btn.id === 'feat-fast') { titleText = t.featFast; descText = t.featDescFast; }
                            else if(btn.id === 'feat-creative') { titleText = t.featCreative; descText = t.featDescCreative; }
                            else if(btn.id === 'feat-dense') { titleText = t.featDense; descText = t.featDescDense; }
                            else if(btn.id === 'feat-movie') { titleText = t.featMovie; descText = t.featDescMovie; }
                            else if(btn.id === 'feat-highres') { titleText = t.featHighRes; descText = t.featDescHighRes; }
                            else if(btn.id === 'feat-enhance') { titleText = t.featEnhance; descText = t.featDescEnhance; }
                            
                            featModalTitle.innerHTML = `${data.icon} ${titleText}`;
                            featModalDesc.textContent = descText;

                            metricIntel.innerHTML = createDots(data.intelligence, 'intelligence');
                            metricQual.innerHTML = createDots(data.quality, 'quality');
                            metricSpeed.innerHTML = createDots(data.speed, 'speed');
                            
                            featModal.classList.add('active');
                        });
                    }
                    btn.addEventListener('click', (e) => {
                        if (btn.disabled) return;
                        const isActive = btn.classList.toggle('active');
                        playFeatureToggleSound(isActive)
                        if (isActive) createConfetti(btn);
                        
                        if (btn === btnCreative && btn.classList.contains('active')) {
                            btnDense.classList.remove('active');
                        }
                        if (btn === btnDense && btn.classList.contains('active')) {
                            btnCreative.classList.remove('active');
                        }

                        if (btn === btnEnhance) {
                            const promptInput = document.getElementById('prompt');
                            if (isActive) {
                                promptInput.maxLength = 1150;
                                promptInput.placeholder = "Describe your image... (Min 10 chars, Max 1150 chars)";
                                showNotification(currentLang == "tr" ? "Prompt uzunluğu Prompt Magic sınırına uygun hale getirildi (1150 karakter)." : "Prompt length reduced to fit Prompt Magic limit (1150 chars).", "info");
                                if (promptInput.value.length > 1150) {
                                    promptInput.value = promptInput.value.substring(0, 1150);
                                    autoResize(promptInput);
                                }
                            } else {
                                showNotification(currentLang == "tr" ? "Prompt uzunluğu 5000 karaktere geri döndü." : "Prompt length restored to 5000 chars.", "info");
                                promptInput.maxLength = 5000;
                                promptInput.placeholder = "Describe your image... (Min 10 chars, Max 5000 chars)";
                            }
                            checkFormReady();
                        }
                    });
                });
                const aspectRatioData = {
                    '1:1': {
                        title: 'Square (1:1)',
                        desc: 'Perfect for social media posts, avatars, and profile pictures. Balanced composition. Slowest.',
                        intelligence: 5,
                        quality: 5,
                        speed: 2
                    },
                    '3:4': {
                        title: 'Portrait (3:4)',
                        desc: 'Classic portrait ratio. Ideal for character designs, mobile wallpapers, and poster art.',
                        intelligence: 4,
                        quality: 4,
                        speed: 3
                    },
                    '4:3': {
                        title: 'Landscape (4:3)',
                        desc: 'Traditional photography format. Great for classic compositions, painting styles, and detailed scenes.',
                        intelligence: 3,
                        quality: 3,
                        speed: 4
                    },
                    '9:16': {
                        title: 'Mobile Vertical (9:16)',
                        desc: 'Full-screen vertical format. Best for TikTok, Reels, Stories, and mobile-first content.',
                        intelligence: 4,
                        quality: 3,
                        speed: 5
                    },
                    '16:9': {
                        title: 'Cinematic (16:9)',
                        desc: 'Widescreen format. The standard for movies, YouTube videos, and desktop wallpapers.',
                        intelligence: 4,
                        quality: 4,
                        speed: 5
                    }
                };
                const aspectBtns = document.querySelectorAll('.aspect-btn');
                aspectBtns.forEach(btn => {
                    const infoIcon = btn.querySelector('.info-icon-wrapper');
                    const ratio = btn.dataset.ratio;
                    
                    if (infoIcon && aspectRatioData[ratio]) {
                        infoIcon.addEventListener('click', (e) => {
                            e.stopPropagation(); 
                            const data = aspectRatioData[ratio];
                            const t = translations[currentLang];
                            let descText = "";
                            switch(ratio) {
                                case '1:1': descText = t.ratioDescSquare; break;
                                case '3:4': descText = t.ratioDescPortrait; break;
                                case '4:3': descText = t.ratioDescLandscape; break;
                                case '9:16': descText = t.ratioDescMobile; break;
                                case '16:9': descText = t.ratioDescCinematic; break;
                                default: descText = data.desc;
                            }
                            featModalTitle.innerHTML = `📐 ${data.title}`;
                            featModalDesc.textContent = descText;
                            metricIntel.innerHTML = createDots(data.intelligence, 'intelligence');
                            metricQual.innerHTML = createDots(data.quality, 'quality');
                            metricSpeed.innerHTML = createDots(data.speed, 'speed');
                            featModal.classList.add('active');
                        });
                    }
                });
                if (closeFeatModal) {
                    closeFeatModal.addEventListener('click', () => featModal.classList.remove('active'));
                }
                if (featModal) {
                    featModal.addEventListener('click', (e) => {
                        if (e.target === featModal) featModal.classList.remove('active');
                    });
                }
            });
            window.addEventListener('load', () => {
                const progressBar = document.getElementById('progress-bar');
                const loadingScreen = document.getElementById('loading-screen');
                const app = document.getElementById('app');
                let progress = 0;
                let modelsLoaded = false;
                setTimeout(() => {
                    autoResize(promptInput);
                }, 100);
                async function fetchModelsWithRetry() {
                    let attempt = 0;
                    while (true) {
                        attempt++;
                        const controller = new AbortController();
                        let timeoutId = null;

                        if (attempt <= 3) {
                            timeoutId = setTimeout(() => controller.abort(), 1000);
                        } else if (attempt <= 8) {
                            if (firsload === true) {
                                showNotification(currentLang == "tr" ? "İnternet bağlantınız stabil değil. Lütfen biraz bekleyiniz." : "Your internet connection is unstable. Please wait a moment.", "warning");
                                firsload = false;
                            }
                            timeoutId = setTimeout(() => controller.abort(), 2000);
                        } 

                        try {
                            const response = await fetch('https://create.thena.workers.dev/models', {
                                mode: 'cors',
                                signal: controller.signal
                            });
                            
                            if (timeoutId) clearTimeout(timeoutId);

                            if (!response.ok) {
                                continue;
                            }
                            
                            return await response.json();
                        } catch (error) {
                            continue;
                        }
                    }
                }

                fetchModelsWithRetry().then(data => {
                    models = data;
                    const imagePromises = models.map(model => {
                        var imgUrl = model.examples?.portraits?.[0];
                        
                        if (model.id == "754019 b5df2e e606f1 a7600b 96b0c8 94") imgUrl = "https://api.apidog.com/api/v1/projects/743905/resources/369883/image-preview"
                        if (model.id == "8gg12 61812 6628 19729 6b4a5 5060") imgUrl = "https://api.apidog.com/api/v1/projects/743905/resources/369760/image-preview"
                        if (model.id == "77h621 yy5271 gga166 hhau22 882hha 1a 3090") imgUrl = "https://api.apidog.com/api/v1/projects/743905/resources/369761/image-preview"
                        if (model.id == "5g72h1 y661hp k771ns 33bb21 77bagl 6b 3090") imgUrl = "https://api.apidog.com/api/v1/projects/743905/resources/369762/image-preview"
                        if (model.id == "551ks 8g6g8 16gga 1h8h8 6b4a5 5060") imgUrl = "https://api.apidog.com/api/v1/projects/743905/resources/369763/image-preview"
                        if (model.id == "6781x 66189 00m162 16g61 00y71 6000") imgUrl = "https://api.apidog.com/api/v1/projects/743905/resources/370236/image-preview"
                        
                        if (!imgUrl) return Promise.resolve();
                        return new Promise((resolve) => {
                            const img = new Image();
                            img.onload = resolve;
                            img.onerror = resolve;
                            img.src = imgUrl;
                        });
                    });
                    return Promise.all(imagePromises);
                }).finally(() => {
                    modelsLoaded = true;
                });
                const interval = setInterval(() => {
                    progress += Math.random() * 15;
                    if (!modelsLoaded && progress > 90) progress = 90;
                    if (progress > 100) progress = 100;
                    progressBar.style.width = progress + '%';
                    if (progress === 100 && modelsLoaded) {
                        clearInterval(interval);
                        setTimeout(() => {
                            loadingScreen.classList.add('fade-out');
                            app.classList.add('visible');
                            loadModels();
                            restoreAspectRatio();
                        }, 500);
                    }
                }, 200);
            });
            async function loadModels() {
                if (!models || models.length === 0) {
                    try {
                        const r = await fetch('https://create.thena.workers.dev/models');
                        models = await r.json();
                    } catch (e) {}
                }

                const modelTranslationsTR = {
                    "8gg12 61812 6628 19729 6b4a5 5060": "Yüksek çözünürlüklü görüntüler üretebilen kapsamlı işlem sonrası teknolojisine sahip ilk modeldir. Gürültü giderme işleminden sonra gerçek LUT filtreleri ekleyerek inanılmaz görseller yaratabiliyor.",
                    "551ks 8g6g8 16gga 1h8h8 6b4a5 5060": "Flux2 kaynak verileri kullanılarak Thena V6 temel modeliyle ince ayar yapılmış, damıtılmış bir model. Güçlü, hızlı, çok yönlü.",
                    "77h621 yy5271 gga166 hhau22 882hha 1a 3090": "Yüksek çözünürlüklü görüntüler, illüstrasyonlar ve genel kullanım için özel olarak tasarlanmış güçlü bir model.",
                    "754019 b5df2e e606f1 a7600b 96b0c8 94": "Thena Photoreal, son derece gerçekçi görüntüler üretmek için özel olarak tasarlanmış bir modeldir. Profesyonelce hazırlanmış komut dosyalarıyla harika sonuçlar verir.",
                    "5g72h1 y661hp k771ns 33bb21 77bagl 6b 3090": "Thena'nın anime görselleri oluşturmak için titizlikle eğitilmiş temel modeli. Son derece stilize, güçlü ve tutarlı.",
                    "6781x 66189 00m162 16g61 00y71 6000": "Thena, anime görsellerini hızlı ve düşük maliyetle oluşturmak için özel olarak eğitilmiş temel bir aydınlatma modelidir."
                };

                const MODEL_STATS = {
                    // Thena Movie
                    "8gg12 61812 6628 19729 6b4a5 5060": { intel: 5, qual: 5, speed: 3 },
                    // Thena Max
                    "551ks 8g6g8 16gga 1h8h8 6b4a5 5060": { intel: 4, qual: 5, speed: 2 },
                    // Thena V6
                    "77h621 yy5271 gga166 hhau22 882hha 1a 3090": { intel: 4, qual: 4, speed: 3 },
                    // Thena Photoreal
                    "754019 b5df2e e606f1 a7600b 96b0c8 94": { intel: 2, qual: 2, speed: 1 },
                    // Thena Anime Core
                    "5g72h1 y661hp k771ns 33bb21 77bagl 6b 3090": { intel: 4, qual: 4, speed: 2 },
                    // Thena Anime Fast
                    "6781x 66189 00m162 16g61 00y71 6000": { intel: 2, qual: 3, speed: 5 },
                    // Default 
                    "default": { intel: 3, qual: 3, speed: 3 }
                };

                const modelSelector = document.getElementById('model-selector');
                modelSelector.innerHTML = models.map(model => {
                    var previewImage = model.examples?.portraits?.[0] || '';
                    if (model.id == "754019 b5df2e e606f1 a7600b 96b0c8 94") previewImage = "https://api.apidog.com/api/v1/projects/743905/resources/369883/image-preview"
                    if (model.id == "8gg12 61812 6628 19729 6b4a5 5060") previewImage = "https://api.apidog.com/api/v1/projects/743905/resources/369760/image-preview"
                    if (model.id == "77h621 yy5271 gga166 hhau22 882hha 1a 3090") previewImage = "https://api.apidog.com/api/v1/projects/743905/resources/369761/image-preview"
                    if (model.id == "5g72h1 y661hp k771ns 33bb21 77bagl 6b 3090") previewImage = "https://api.apidog.com/api/v1/projects/743905/resources/369762/image-preview"
                    if (model.id == "551ks 8g6g8 16gga 1h8h8 6b4a5 5060") previewImage = "https://api.apidog.com/api/v1/projects/743905/resources/369763/image-preview"
                    if (model.id == "6781x 66189 00m162 16g61 00y71 6000") previewImage = "https://api.apidog.com/api/v1/projects/743905/resources/370236/image-preview"

                    return `
                        <div class="model-card" data-model-id="${model.id}" data-preview="${previewImage}">
                            <div class="model-info-icon-wrapper" title="Model Details">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                            </div>
                            <div class="model-name">${model.model}</div>
                        </div>
                    `;
                }).join('');

                document.querySelectorAll('.model-card').forEach(card => {
                    const previewImage = card.dataset.preview;
                    const modelId = card.dataset.modelId;
                    const modelName = card.querySelector('.model-name').innerText;
                    
                    if (previewImage) {
                        card.style.setProperty('--bg-image', `url(${previewImage})`);
                        card.style.filter = 'saturate(0.3)';
                    }

                    const infoBtn = card.querySelector('.model-info-icon-wrapper');
                    infoBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        
                        const featModal = document.getElementById('feature-info-modal');
                        const featModalTitle = document.getElementById('feat-modal-title');
                        const featModalDesc = document.getElementById('feat-modal-desc');
                        
                        const metricIntel = document.getElementById('metric-intelligence');
                        const metricQual = document.getElementById('metric-quality');
                        const metricSpeed = document.getElementById('metric-speed');
                        
                        const lblIntel = document.getElementById('lbl-intel');
                        const lblQual = document.getElementById('lbl-qual');
                        const lblSpeed = document.getElementById('lbl-speed');

                        const currentModelData = models.find(m => m.id === modelId);
                        
                        let descriptionToShow = currentModelData ? currentModelData.description : "No description available.";

                        if (typeof currentLang !== 'undefined' && currentLang === 'tr') {
                            if (modelTranslationsTR[modelId]) {
                                descriptionToShow = modelTranslationsTR[modelId];
                            }
                            if(lblIntel) lblIntel.textContent = "Yapay Zeka";
                            if(lblQual) lblQual.textContent = "Kalite";
                            if(lblSpeed) lblSpeed.textContent = "Hız";
                        } else {
                            if(lblIntel) lblIntel.textContent = "Intelligence";
                            if(lblQual) lblQual.textContent = "Quality";
                            if(lblSpeed) lblSpeed.textContent = "Speed";
                        }

                        featModalTitle.innerHTML = `🔮 ${modelName}`;
                        featModalDesc.textContent = descriptionToShow;
                        
                        const cleanId = modelId.replace(/\s/g, '');
                        let stats = MODEL_STATS[modelId] || MODEL_STATS[cleanId] || MODEL_STATS["default"];
                        
                        metricIntel.innerHTML = createDots(stats.intel, 'intelligence');
                        metricQual.innerHTML = createDots(stats.qual, 'quality');
                        metricSpeed.innerHTML = createDots(stats.speed, 'speed');
                        
                        featModal.classList.add('active');
                    });

                    card.addEventListener('click', () => {
                        if (selectedModel === modelId) {
                            playModelSelectSound(false);
                            selectedModel = null;
                            localStorage.removeItem(LS_KEYS.MODEL);
                            card.classList.remove('active');
                            checkMovieFilterAvailability(null);
                            checkFastModeAvailability(null);
                            updateAdvancedSettingsConstraints(null);
                        } else {
                            playModelSelectSound(true);
                            localStorage.setItem(LS_KEYS.MODEL, modelId);
                            document.querySelectorAll('.model-card').forEach(c => c.classList.remove('active'));
                            card.classList.add('active');
                            selectedModel = modelId;
                            createConfetti(card);
                            checkMovieFilterAvailability(modelId);
                            checkFastModeAvailability(modelId);
                            updateAdvancedSettingsConstraints(modelId);
                        }
                        checkFormReady();
                    });
                });

                const lastModelId = localStorage.getItem(LS_KEYS.MODEL);
                if (lastModelId) {
                    const targetCard = document.querySelector(`.model-card[data-model-id="${lastModelId}"]`);
                    if (targetCard) {
                        targetCard.classList.add('active');
                        selectedModel = lastModelId;
                        checkMovieFilterAvailability(lastModelId);
                        checkFastModeAvailability(lastModelId);
                        updateAdvancedSettingsConstraints(lastModelId);
                        checkFormReady();
                    }
                } else {
                    checkMovieFilterAvailability(null);
                    checkFastModeAvailability(null);
                }
            }

            function restoreAspectRatio() {
                const lastRatio = localStorage.getItem(LS_KEYS.RATIO);
                if (lastRatio) {
                    const targetBtn = document.querySelector(`.aspect-btn[data-ratio="${lastRatio}"]`);
                    if (targetBtn) targetBtn.click();
                }
            }

            function createConfetti(element) {
                if (document.body.classList.contains('performance-mode')) return;
                const rect = element.getBoundingClientRect();
                
                const style = getComputedStyle(document.documentElement);
                const colors = [
                    style.getPropertyValue('--primary').trim(),
                    style.getPropertyValue('--dot-filled-2').trim(),
                    style.getPropertyValue('--dot-filled-3').trim(),
                    style.getPropertyValue('--dot-filled-5').trim(),
                    '#ffffff'
                ];

                const particleCount = 20;
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'confetti';
                    
                    const side = Math.floor(Math.random() * 4); 
                    let startX, startY;

                    switch(side) {
                        case 0: 
                            startX = rect.left + Math.random() * rect.width;
                            startY = rect.top;
                            break;
                        case 1: 
                            startX = rect.right;
                            startY = rect.top + Math.random() * rect.height;
                            break;
                        case 2: 
                            startX = rect.left + Math.random() * rect.width;
                            startY = rect.bottom;
                            break;
                        case 3: 
                            startX = rect.left;
                            startY = rect.top + Math.random() * rect.height;
                            break;
                    }

                    particle.style.left = startX + 'px';
                    particle.style.top = startY + 'px';
                    
                    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                    
                    const angle = Math.atan2(startY - centerY, startX - centerX);
                    
                    const velocity = 60 + Math.random() * 50; 
                    
                    const tx = Math.cos(angle) * velocity;
                    const ty = Math.sin(angle) * velocity;
                    
                    particle.style.setProperty('--tx', tx + 'px');
                    particle.style.setProperty('--ty', ty + 'px');
                    
                    document.body.appendChild(particle);
                    
                    particle.style.animation = `confetti-burst ${0.6 + Math.random() * 0.4}s ease-out forwards`;
                    
                    setTimeout(() => particle.remove(), 1000);
                }
            }
            document.querySelectorAll('.aspect-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const ratio = btn.dataset.ratio;
                    if (selectedAspectRatio === ratio) {
                        playRatioSelectSound(false);
                        selectedAspectRatio = null;
                        selectedSize = null;
                        localStorage.removeItem(LS_KEYS.RATIO);
                        localStorage.removeItem(LS_KEYS.SIZE);
                        btn.classList.remove('active');
                    } else {
                        playRatioSelectSound(true);
                        document.querySelectorAll('.aspect-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        selectedAspectRatio = ratio;
                        selectedSize = btn.dataset.size;
                        localStorage.setItem(LS_KEYS.RATIO, selectedAspectRatio);
                        localStorage.setItem(LS_KEYS.SIZE, selectedSize);
                        createConfetti(btn);
                    }
                    checkFormReady();
                });
            });

            var uploadHeaders = {
                "origin2": "https://create.thena.workers.dev"
            };

            function checkFormReady() {
                const charCountEl = document.getElementById('char-count');
                if (charCountEl && promptInput) {
                    const currentLength = promptInput.value.length;
                    const currentMax = promptInput.maxLength;
                    
                    charCountEl.textContent = `${currentLength} / ${currentMax}`;
                    
                    charCountEl.classList.remove('limit-near', 'limit-reached');
                    if (currentLength >= currentMax) {
                        charCountEl.classList.add('limit-reached');
                    } else if (currentLength > currentMax * 0.7) {
                        charCountEl.classList.add('limit-near');
                    }
                }
                const promptLength = promptInput.value.trim().length;
                const currentMax = btnEnhance && btnEnhance.classList.contains('active') ? 1150 : 5000;

                if (promptLength >= 10 && promptLength <= currentMax && apiKeyInput.value.trim() && selectedModel && selectedAspectRatio) {
                    generateBtn.classList.add('ready');
                    document.querySelector(".generate-btn").style.cursor = "pointer";
                    generateBtn.disabled = false;
                } else {
                    generateBtn.classList.remove('ready');
                    document.querySelector(".generate-btn").style.cursor = "not-allowed";
                    generateBtn.disabled = true;
                }
            }
            if (savedApiKey) checkFormReady();
            generateBtn.addEventListener('click', async () => {
                if (!generateBtn.classList.contains('ready')) return;
                const currentLength = promptInput.value.trim().length;
                if (currentLength < 10) {
                    playErrorSound();
                    showNotification(currentLang == "tr" ? "Prompt çok kısa! En az 10 karakter girmelisin." : "Prompt is too short! Please enter at least 10 characters.", "error");
                    return;
                }
                const maxAllowed = btnEnhance.classList.contains('active') ? 1150 : 5000;

                if (currentLength > maxAllowed) {
                    playErrorSound();
                    showNotification(currentLang == "tr" ? "Prompt çok uzun! Maksimum " + maxAllowed + " karakter girebilirsin." : `Prompt is too long! Max ${maxAllowed} characters allowed.`, "error");
                    return;
                }
                playStartSound();
                const prompt = promptInput.value.trim();
                const apiKey = apiKeyInput.value.trim();
                const [width, height] = selectedSize.split('x').map(Number);
                let generationSuccess = false;
                isGeneratingImage = true;
                currentGenParams = {
                    width,
                    height,
                    prompt
                };
                if (galleryModal.classList.contains('active')) {
                    if (galleryGrid.querySelector('.empty-gallery')) galleryGrid.innerHTML = '';
                    galleryGrid.insertAdjacentHTML('afterbegin', getPlaceholderHTML(width, height));
                }
                const removeLoading = showNotification(currentLang == "tr" ? "Görüntü oluşturuluyor..." : 'Image is being processed...', 'loading');
                generateBtn.disabled = true;
                generateBtn.innerHTML = 'Processing<span class="loading-spinner"></span>';
                generateBtn.classList.add('generating');
                let busyNotification = null;
                const BUSY_THRESHOLD = 25000;
                const busyTimer = setTimeout(() => {
                    playBusySound();
                    
                    const container = document.getElementById('notification-container');
                    
                    if (!container || container.children.length === 0) return;

                    const activeLoader = container.lastElementChild;

                    if (activeLoader && !activeLoader.classList.contains('notification-exit')) {
                        
                        activeLoader.classList.add('busy-state');

                        activeLoader.innerHTML = `
                            <div class="notification-spinner"></div>
                            <div style="display:flex; flex-direction:column; gap:2px;">
                                <span style="font-weight:700; color:#ffaa00; font-size:13px; letter-spacing:0.5px;">Server Busy</span>
                                <span style="font-size:12px; opacity:0.9;">Thena is very busy right now. Image generation may take a while.</span>
                            </div>
                        `;
                    }
                }, BUSY_THRESHOLD);
                const isFast = btnFast.classList.contains('active');
                const isCreative = btnCreative.classList.contains('active');
                const isDense = btnDense.classList.contains('active');
                const isMovie = btnMovie.classList.contains('active') && !btnMovie.disabled;
                const isHighRes = btnHighRes.classList.contains('active');
                const isEnhance = btnEnhance.classList.contains('active');

                let apiBody = {
                    prompt,
                    model: selectedModel,
                    width,
                    height,
                    moderation: moderationLevel
                };
                if (isAdvancedMode) {
                    const seedVal = parseInt(document.getElementById('adv-seed').value) || -1;
                    const cfgVal = parseFloat(document.getElementById('adv-cfg').value) || 7;
                    let stepsVal = parseInt(document.getElementById('adv-steps').value) || 20;

                    if (stepsVal < 10) {
                        stepsVal = 10;
                        document.getElementById('adv-steps').value = 10; 
                        showNotification(currentLang == "tr" ? "Minimum adım sayısı 10. Değer güncellendi." : "Minimum steps is 10. Value updated.", "info");
                    } 
                    else if (stepsVal > 30) {
                        stepsVal = 30;
                        document.getElementById('adv-steps').value = 30;
                        showNotification(currentLang == "tr" ? "Maximum adım sayısı 30. Değer güncellendi." : "Maximum steps is 30. Value updated.", "info");
                    }

                    if (cfgVal < 1) {
                        cfgVal = 1;
                        document.getElementById('adv-cfg').value = 1; 
                        showNotification(currentLang == "tr" ? "Minimum CFG Scale 1. Değer güncellendi." : "Minimum CFG Scale is 1. Value updated.", "info");
                    } 
                    else if (cfgVal > 20) {
                        cfgVal = 20;
                        document.getElementById('adv-cfg').value = 20;
                        showNotification(currentLang == "tr" ? "Maximum CFG Scale 20. Değer güncellendi." : "Maximum CFG Scale is 20. Value updated.", "info");
                    }

                    if (seedVal < -1) {
                        seedVal = -1;
                        document.getElementById('adv-seed').value = -1; 
                        showNotification(currentLang == "tr" ? "Minimum Seed -1. Değer güncellendi." : "Minimum Seed is -1. Value updated.", "info");
                    } 
                    else if (seedVal > 900000000) {
                        seedVal = 900000000;
                        document.getElementById('adv-seed').value = 900000000;
                        showNotification(currentLang == "tr" ? "Maximum Seed 900000000. Değer güncellendi." : "Maximum Seed is 900000000. Value updated.", "info");
                    }

                    apiBody.advanced = {
                        seed: seedVal,
                        cfg_scale: cfgVal,
                        steps: stepsVal
                    };
                    
                    apiBody.fastMode = false;
                    apiBody.creative = false;
                    apiBody.denseMode = false;
                    apiBody.movieFilter = false;
                    apiBody.highRes = false;
                    apiBody.enhance = false;

                } else {
                    apiBody.fastMode = isFast;
                    apiBody.creative = isCreative;
                    apiBody.denseMode = isDense;
                    apiBody.movieFilter = isMovie;
                    apiBody.highRes = isHighRes;
                    apiBody.enhance = isEnhance;
                }

                try {
                    const response = await fetch('https://create.thena.workers.dev/createSync', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "apikey": apiKey
                        },
                        body: JSON.stringify(apiBody)
                    });
                    const data = await response.json();

                    if (removeLoading) removeLoading();

                    if (response.ok && data.image && data.status === 200) {
                        generationSuccess = true;
                        playSuccessSound();
                        const modelData = models.find(m => m.id === selectedModel);
                        let finalImageUrl = data.image;
                        if (!finalImageUrl.startsWith('data:image') && !finalImageUrl.startsWith('http')) {
                            finalImageUrl = `data:image/png;base64,${data.image}`;
                        }
                        await dbHelper.add({
                            url: finalImageUrl,
                            prompt: prompt,
                            model: modelData ? modelData.model : 'Unknown',
                            size: selectedSize,
                            timestamp: new Date().toISOString(),
                            moderation: moderationLevel,
                            features: {
                                fast: isFast,
                                creative: isCreative,
                                dense: isDense,
                                movie: isMovie,
                                highRes: isHighRes,
                                enhance: isEnhance
                            }
                        });
                        isGeneratingImage = false; 
                        if (galleryModal.classList.contains('active')) {
                            const placeholder = document.getElementById('active-generation-placeholder');
                            if(placeholder) placeholder.remove();
                    
                            await loadGallery();
                            await applyFilters();
                        }
                        showNotification(currentLang == "tr" ? "Resim galeriye kaydedildi." : 'The image has been saved to the gallery.', 'success', finalImageUrl);
                    } else {
                        playErrorSound();


                        if (data.status == 429) {
                            showNotification(currentLang == "tr" ? "Limit tükendi! Lütfen biraz bekleyin ve tekrar deneyin." : 'Limit Exceeded! Please wait a few seconds and try again.', 'error');
                            isGeneratingImage = false;
                            const placeholder = document.getElementById('active-generation-placeholder');
                            if (placeholder) {
                                placeholder.style.opacity = '0';
                                setTimeout(() => placeholder.remove(), 300);
                            }
                            return;
                        }
                        if (data.status == 401 && data.content.includes('not allowed')) {
                            showNotification(currentLang == "tr" ? "Lütfen moderation seviyesini medium veya low olarak ayarlayın." : 'Please set moderation level to medium or low.', 'error');
                            isGeneratingImage = false;
                            const placeholder = document.getElementById('active-generation-placeholder');
                            if (placeholder) {
                                placeholder.style.opacity = '0';
                                setTimeout(() => placeholder.remove(), 300);
                            }
                            return;
                        }
                        if (data.status == 423) {
                            showNotification(currentLang == "tr" ? "Thena şuanda çok yoğun. Lütfen daha sonra tekrar deneyin." : 'Thena is currently overloaded. Please try again later.', 'error');
                            isGeneratingImage = false;
                            const placeholder = document.getElementById('active-generation-placeholder');
                            if (placeholder) {
                                placeholder.style.opacity = '0';
                                setTimeout(() => placeholder.remove(), 300);
                            }
                            return;
                        }

                        showNotification(`Error: ${data.content || 'Unknown Error'}`, 'error');
                    }
                } catch (error) {
                    if (removeLoading) removeLoading();
                    playErrorSound();
                    showNotification(currentLang == "tr" ? "Resim oluşturulamadı! Lütfen tekrar deneyin." : "There was an error generating the image. Please try again.", 'error');
                    isGeneratingImage = false;
                    const placeholder = document.getElementById('active-generation-placeholder');
                    if (placeholder) {
                        placeholder.style.opacity = '0';
                        setTimeout(() => placeholder.remove(), 300);
                    }
                } finally {
                    isGeneratingImage = false;
                    clearTimeout(busyTimer);
                    
                    if (generationSuccess) {
                        await loadGallery();
                    } else {
                        const placeholder = document.getElementById('active-generation-placeholder');
                        if (placeholder) {
                            placeholder.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                            
                            requestAnimationFrame(() => {
                                placeholder.style.opacity = '0';
                                placeholder.style.transform = 'scale(0.95)';
                            });

                            setTimeout(() => {
                                if (placeholder && placeholder.parentNode) {
                                    placeholder.remove();
                                }
                            }, 500);
                        }
                    }

                    if (busyNotification && busyNotification.parentNode) {
                        busyNotification.remove();
                    }
                    generateBtn.disabled = false;
                    generateBtn.textContent = 'Generate Image';
                    generateBtn.classList.remove('generating');
                    checkFormReady();
                }
            });
            const galleryBtn = document.getElementById('gallery-btn');
            const galleryModal = document.getElementById('gallery-modal');
            const closeGalleryBtn = document.getElementById('close-gallery');
            const galleryGrid = document.getElementById('gallery-grid');
            let allGalleryImages = [];
            let sortNewestFirst = true;
            const searchInput = document.getElementById('search-input');
            const toggleFilterBtn = document.getElementById('toggle-filter-btn');
            const filterPanel = document.getElementById('filter-panel');
            const toggleSortBtn = document.getElementById('toggle-sort-btn');
            const sortText = document.getElementById('sort-text');
            const sortIcon = document.getElementById('sort-icon');
            const filterModel = document.getElementById('filter-model');
            const filterRatio = document.getElementById('filter-ratio');
            const filterDateStart = document.getElementById('filter-date-start');
            const filterDateEnd = document.getElementById('filter-date-end');
            const resetFiltersBtn = document.getElementById('reset-filters');
            galleryBtn.addEventListener('click', async () => {
                galleryModal.classList.add('active');
                document.body.classList.add('no-scroll');
                await loadGallery();
            });
            closeGalleryBtn.addEventListener('click', () => {
                galleryModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
            galleryModal.addEventListener('click', (e) => {
                if (e.target === galleryModal) {
                    galleryModal.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
            function populateModelFilter() {
                filterModel.innerHTML = '<option value="">All Models</option>';

                if (models && models.length > 0) {
                    models.forEach(m => {
                        const opt = document.createElement('option');
                        opt.value = m.model;
                        opt.textContent = m.model;
                        filterModel.appendChild(opt);
                    });
                }
            }

            const galleryLoader = document.getElementById('gallery-loader');
            const galleryProgressBar = document.getElementById('gallery-progress-bar');
            const loaderStatus = document.getElementById('loader-status');
            async function loadGallery() {
                galleryGrid.classList.remove('visible'); 
                galleryLoader.classList.remove('hidden'); 
                galleryProgressBar.style.width = '0%';
                loaderStatus.innerText = 'Reading the database...';

                galleryGrid.innerHTML = '';
                populateModelFilter();
                try {
                    allGalleryImages = await dbHelper.getAll();
                    applyFilters(true);
                } catch (e) {
                    galleryGrid.innerHTML = '<div class="empty-gallery">An error occurred while loading the gallery.</div>';
                    galleryLoader.classList.add('hidden');
                    galleryGrid.classList.add('visible');
                }
            }
            galleryGrid.addEventListener('scroll', () => {
                if (isGalleryLoading) return; 

                if (galleryGrid.scrollTop + galleryGrid.clientHeight >= galleryGrid.scrollHeight - 100) {
                    currentPage++;
                    loadMoreItems();
                }
            });

            function applyFilters(withAnimation = false) {
                lastRenderId++;
                const currentRenderId = lastRenderId;
                let filtered = [...allGalleryImages];

                const uniqueMap = new Map();
                filtered.forEach(item => {
                    if(!uniqueMap.has(item.timestamp)){
                        uniqueMap.set(item.timestamp, item);
                    }
                });
                filtered = Array.from(uniqueMap.values());

                const searchText = searchInput.value.toLowerCase().trim();
                if (searchText) {
                    filtered = filtered.filter(item => item.prompt.toLowerCase().includes(searchText));
                }
                const modelVal = filterModel.value;
                if (modelVal) filtered = filtered.filter(item => item.model === modelVal);
                const ratioVal = filterRatio.value;
                if (ratioVal) filtered = filtered.filter(item => item.size === ratioVal);
                const startDateStr = filterDateStart.value;
                const endDateStr = filterDateEnd.value;
                if (startDateStr) {
                    const start = new Date(startDateStr).setHours(0, 0, 0, 0);
                    filtered = filtered.filter(item => new Date(item.timestamp).setHours(0, 0, 0, 0) >= start);
                }
                if (endDateStr) {
                    const end = new Date(endDateStr).setHours(23, 59, 59, 999);
                    filtered = filtered.filter(item => new Date(item.timestamp).setHours(0, 0, 0, 0) <= end);
                }
                filtered.sort((a, b) => {
                    const dateA = new Date(a.timestamp);
                    const dateB = new Date(b.timestamp);
                    return sortNewestFirst ? dateB - dateA : dateA - dateB;
                });
                currentFilteredItems = filtered;
                currentPage = 1;
                galleryGrid.innerHTML = '';
                isGalleryLoading = true;

                if (isGeneratingImage && currentGenParams && sortNewestFirst) {
                    galleryGrid.insertAdjacentHTML('beforeend', getPlaceholderHTML(currentGenParams.width, currentGenParams.height));
                }


                if (currentFilteredItems.length === 0 && !isGeneratingImage) {
                    galleryGrid.innerHTML = '<div class="empty-gallery">No images matching the filters were found.</div>';
                    hideLoaderAndShowGrid();
                    isGalleryLoading = false;
                    return;
                }
                if (withAnimation) {
                    preloadImagesAndRender(currentRenderId);
                } else {
                    loadMoreItems();
                    hideLoaderAndShowGrid();
                }
            }

            function preloadImagesAndRender(renderId) {
                const initialBatchCount = 12;
                const itemsToPreload = currentFilteredItems.slice(0, initialBatchCount);
                let loadedCount = 0;
                const batchSize = itemsToPreload.length;
                const totalGalleryCount = currentFilteredItems.length;
                
                if (batchSize === 0) {
                    hideLoaderAndShowGrid();
                    isGalleryLoading = false;
                    return;
                }
                
                if (renderId !== lastRenderId) return;

                loaderStatus.innerText = `Images are being processed (${totalGalleryCount} images)...`;
                itemsToPreload.forEach((item) => {
                    const img = new Image();
                    const updateProgress = () => {
                        if (renderId !== lastRenderId) return;

                        loadedCount++;
                        const percentage = Math.round((loadedCount / batchSize) * 100);
                        galleryProgressBar.style.width = percentage + '%';
                        loaderStatus.innerText = `Images are being processed (${totalGalleryCount} images)... %${percentage}`;
                        if (loadedCount === batchSize) {
                            setTimeout(() => {
                                if (renderId !== lastRenderId) return;

                                loadMoreItems();
                                hideLoaderAndShowGrid();
                                setTimeout(() => {
                                    if (renderId !== lastRenderId) return;

                                    if (galleryGrid.scrollHeight <= galleryGrid.clientHeight + 100) {
                                        currentPage++;
                                        loadMoreItems();
                                    }
                                }, 500);
                            }, 300);
                        }
                    };
                    img.onload = updateProgress;
                    img.onerror = updateProgress;
                    img.src = item.url;
                });
            }

            function hideLoaderAndShowGrid() {
                galleryLoader.classList.add('hidden');
                playGalleryUpdatedSound();
                setTimeout(() => {
                    galleryGrid.classList.add('visible');
                }, 100);
            }

            function loadMoreItems() {
                isGalleryLoading = true;
                const start = (currentPage - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const batch = currentFilteredItems.slice(start, end);
                if (batch.length === 0) {
                    isGalleryLoading = false;
                    return;
                }

                const html = batch.map((item) => {
                    let spanClass = '';
                    if (item.size) {
                        const [width, height] = item.size.split('x').map(Number);
                        const ratio = width / height;
                        if (ratio >= 1.7) spanClass = 'wide';
                        else if (ratio <= 0.6) spanClass = 'tall';
                    }

                    if (item.moderation === 'medium') {
                        spanClass += ' sensitive-medium';
                    } else if (item.moderation && item.moderation !== 'high') {
                        spanClass += ' sensitive';
                    }

                    const itemData = encodeURIComponent(JSON.stringify(item));

                    return `
                        <div class="gallery-item ${spanClass}" data-item="${itemData}">
                            <img src="${item.url}" loading="lazy" alt="${item.prompt}">
                            
                            <button class="gallery-copy-btn" title="Use This Style" onclick="useImageSettings(event, this)">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="12" y1="18" x2="12" y2="12"></line>
                                    <line x1="9" y1="15" x2="15" y2="15"></line>
                                </svg>
                            </button>
                            <div class="gallery-item-info">
                                <div class="info-prompt">${item.prompt}</div>
                                <div class="info-meta">${item.model.toUpperCase()} • ${item.size || 'Auto'}</div>
                            </div>
                        </div>`;
                }).join('');

                galleryGrid.insertAdjacentHTML('beforeend', html);
                const newItems = galleryGrid.querySelectorAll('.gallery-item:not(.show)');
                newItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('show');
                    }, index * 50);
                });
		        isGalleryLoading = false;
                if (galleryGrid.scrollHeight <= galleryGrid.clientHeight + 200 && end < currentFilteredItems.length) {
                    setTimeout(() => {
                        if (!isGalleryLoading) {
                            currentPage++;
                            loadMoreItems();
                        }
                    }, batch.length * 50); 
                }
            }
            let searchTimeout;
            searchInput.addEventListener('input', () => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    applyFilters(false);
                }, 300);
            });
            filterModel.addEventListener('change', applyFilters);
            filterRatio.addEventListener('change', applyFilters);
            filterDateStart.addEventListener('change', applyFilters);
            filterDateEnd.addEventListener('change', applyFilters);
            toggleFilterBtn.addEventListener('click', () => {
                filterPanel.classList.toggle('active');
                toggleFilterBtn.classList.toggle('active');
            });
            toggleSortBtn.addEventListener('click', () => {
                sortNewestFirst = !sortNewestFirst;
                sortText.textContent = sortNewestFirst ? currentLang == "tr" ? "En Yeni" : "Newest" : currentLang == "tr" ? "En Eski" : "Oldest";
                sortIcon.style.transform = sortNewestFirst ? "rotate(0deg)" : "rotate(180deg)";
                sortIcon.style.transition = "transform 0.3s ease";
                applyFilters();
            });
            resetFiltersBtn.addEventListener('click', () => {
                searchInput.value = '';
                filterModel.value = '';
                filterRatio.value = '';
                filterDateStart.value = '';
                filterDateEnd.value = '';
                applyFilters();
            });
            function getFileSize(dataUrl) {
                if (!dataUrl.startsWith('data:')) return '';
                const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
                const padding = (dataUrl.charAt(dataUrl.length - 1) === '=') ? (dataUrl.charAt(dataUrl.length - 2) === '=' ? 2 : 1) : 0;
                const fileSizeInBytes = (base64Length * 0.75) - padding;
                if (fileSizeInBytes > 1024 * 1024) {
                    return (fileSizeInBytes / (1024 * 1024)).toFixed(1) + 'MB';
                } else {
                    return (fileSizeInBytes / 1024).toFixed(0) + 'KB';
                }
            }
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxPrompt = document.getElementById('lightbox-prompt');
            const lightboxMeta = document.getElementById('lightbox-meta');
            const lightboxDownload = document.getElementById('lightbox-download');
            galleryGrid.addEventListener('click', (e) => {
                const item = e.target.closest('.gallery-item');
                if (item) {
                    try {
                        const data = JSON.parse(decodeURIComponent(item.dataset.item));
                        openLightbox(data);
                    } catch {}
                }
            });
            let currentImageTimestamp = null;

            function openLightbox(data) {
                currentImageTimestamp = data.timestamp;
                lightboxImg.src = data.url; 
                
                lightboxPrompt.textContent = data.prompt;
                
                const dateObj = new Date(data.timestamp);
                const dateFormatted = dateObj.toLocaleDateString(undefined);
                const timeFormatted = dateObj.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

                let featuresHtml = '';
                
                if (data.features) {
                    featuresHtml = '<div class="features-container">';
                    
                    const icons = {
                        high: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
                        medium: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
                        low: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3.3-1.1.8-2.2 1.5-3.1v-.1z"></path></svg>`
                    };

                    const modLevel = data.moderation || 'high'; 
                    const modTitle = modLevel.charAt(0).toUpperCase() + modLevel.slice(1);
        
                    featuresHtml += `<span class="feat-badge mod-${modLevel}" title="Moderation: ${modTitle}">
                                        ${icons[modLevel] || icons['high']} ${modTitle}
                                    </span>`;

                    if (data.features.fast)     featuresHtml += `<span class="feat-badge" title="Fast Mode">⚡ Fast</span>`;
                    if (data.features.creative) featuresHtml += `<span class="feat-badge" title="Creative Mode">🎨 Creative</span>`;
                    if (data.features.dense)    featuresHtml += `<span class="feat-badge" title="Dense Mode">💠 Dense</span>`;
                    if (data.features.movie)    featuresHtml += `<span class="feat-badge" title="Movie Filter">🎬 Movie</span>`;
                    if (data.features.highRes)  featuresHtml += `<span class="feat-badge" title="High Resolution">💎 HighRes</span>`;
                    if (data.features.enhance)  featuresHtml += `<span class="feat-badge" title="Enhance">✨ Enhanced</span>`;
                    
                    featuresHtml += '</div>';
                }

                lightboxMeta.innerHTML = `
                    <div style="margin-bottom:5px;">${data.model.toUpperCase()} • ${data.size || 'Auto'}</div>
                    <span class="meta-date">${dateFormatted} • ${timeFormatted}</span>
                    ${featuresHtml}
                `;

                const sizeStr = getFileSize(data.url);
                lightboxDownload.removeAttribute('href'); 
                lightboxDownload.style.cursor = "pointer";
                const t = translations[currentLang];
                lightboxDownload.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    ${t.btnDownload} ${sizeStr ? `(${sizeStr})` : ''}
                `;
                
                lightboxDownload.onclick = async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const originalText = lightboxDownload.innerHTML;
                    const isTelegram = /Telegram/i.test(navigator.userAgent) || window.TelegramWebviewProxy;
                    lightboxDownload.innerHTML = `<span class="loading-spinner" style="border-top-color:#fff; margin:0;"></span> ${isTelegram ? t.msgPreparingLink : t.msgProcessing}`;
                    lightboxDownload.style.pointerEvents = "none";

                    try {
                        let blob;
                        const img = document.getElementById('lightbox-img');
                        let base64Data = img.src;

                        if (isTelegram) {
                            if (base64Data.startsWith('data:image')) {
                                const rawBase64 = base64Data.split(',')[1];

                                var infometa = document.querySelector(".lightbox-meta").textContent;
                                infometa = infometa.replace(/\n/g, ' ').trim().toLocaleLowerCase();
                                
                                let infoModel = infometa.split("•")[0].trim();
                                let infoRatio = infometa.split("•")[1].trim().split(" ")[0];
                                let infoModeration = infometa.split("•")[2].trim().includes("high") ? "high" : (infometa.split("•")[2].trim().includes("medium") ? "medium" : "low");

                                let infoModel2 = infoModel.split(" ");
                                for (let i = 0; i < infoModel2.length; i++) {
                                    if(infoModel2[i]) infoModel2[i] = infoModel2[i][0].toUpperCase() + infoModel2[i].substr(1);
                                }
                                infoModel2 = infoModel2.join(" ");

                                const featuresList = [
                                    btnFast && btnFast.classList.contains('active') ? "fast" : "",
                                    btnCreative && btnCreative.classList.contains('active') ? "creative" : "",
                                    btnDense && btnDense.classList.contains('active') ? "dense" : "",
                                    btnMovie && btnMovie.classList.contains('active') ? "movie" : "",
                                    btnHighRes && btnHighRes.classList.contains('active') ? "highRes" : "",
                                    btnEnhance && btnEnhance.classList.contains('active') ? "enhance" : ""
                                ].filter(f => f !== "");

                                const response = await fetch('https://create.thena.workers.dev/temproryUpload', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        ...uploadHeaders
                                    },
                                    body: JSON.stringify({
                                        image: rawBase64,
                                        apikey: apiKeyInput ? apiKeyInput.value.trim() : "",
                                        prompt: document.querySelector(".lightbox-prompt").textContent,
                                        model: infoModel2 ? infoModel2 : "",
                                        ratio: infoRatio ? infoRatio : "",
                                        moderation: infoModeration ? infoModeration : "high",
                                        features: featuresList,
                                        info: window.Telegram?.WebApp?.initDataUnsafe || {}
                                    })
                                });

                                const data = await response.json();

                                if (data.status === 200 && data.image) {
                                    if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Resim Telegram'a gönderildi." : "Image has been sent to Telegram.", "success");
                                    if(typeof playSuccessSound === "function") playSuccessSound();
                                } else {
                                    if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Resim Telegram'a gönderilemedi. Lütfen yeniden deneyin." : "Download failed. Please try again.", "error");
                                    if(typeof playErrorSound === "function") playErrorSound();
                                }

                            } else {
                                window.location.href = base64Data;
                            }
                            
                        } else {
                            if (base64Data.startsWith('data:')) {
                                blob = base64ToBlob(base64Data, 'image/png');
                            } else {
                                const response = await fetch(base64Data);
                                blob = await response.blob();
                            }

                            const fileName = `thena-image-${Date.now()}.png`;
                            forceDownload(blob, fileName);
                            if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Resim indirildi." : "Download completed.", "success");
                            if(typeof playSuccessSound === "function") playSuccessSound();
                        }

                    } catch (error) {
                        console.error("Download action failed:", error);
                        if(typeof playErrorSound === "function") playErrorSound();
                        if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Resim indirilemedi. Lütfen yeniden deneyin." : "Download failed. Please try again.", "error");
                    } finally {
                        lightboxDownload.innerHTML = originalText;
                        lightboxDownload.style.pointerEvents = "auto";
                    }
                };

                function forceDownload(blob, filename) {
                    const blobUrl = URL.createObjectURL(blob);
                    const tempLink = document.createElement('a');
                    tempLink.href = blobUrl;
                    tempLink.download = filename;
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
                }
    
                const copyBtn = document.getElementById('lightbox-copy-btn');
                if (copyBtn) {
                    const newCopyBtn = copyBtn.cloneNode(true);
                    copyBtn.parentNode.replaceChild(newCopyBtn, copyBtn);
                    
                    newCopyBtn.onclick = function() {
                        const promptInput = document.getElementById('prompt');
                        promptInput.value = data.prompt || "";
                        localStorage.setItem(LS_KEYS.PROMPT, data.prompt);
                        promptInput.style.height = 'auto';
                        promptInput.style.height = promptInput.scrollHeight + 'px';

                        if (models && models.length > 0 && data.model) {
                            const targetModelObj = models.find(m => 
                                m.model.trim().toLowerCase() === data.model.trim().toLowerCase()
                            );
                            
                            if (targetModelObj) {
                                if (selectedModel !== targetModelObj.id) {
                                    const modelCard = document.querySelector(`.model-card[data-model-id="${targetModelObj.id}"]`);
                                    if (modelCard) modelCard.click();
                                }
                            }
                        }

                        if (data.size) {
                            if (selectedSize !== data.size) {
                                const sizeBtn = document.querySelector(`.aspect-btn[data-size="${data.size}"]`);
                                if (sizeBtn) sizeBtn.click();
                            }
                        }

                        const modBtn = document.getElementById('moderation-btn');
                        const targetMod = data.moderation || 'high'; 
                        if (modBtn) {
                            modBtn.setAttribute('data-level', targetMod);
                            moderationLevel = targetMod;
                            const titles = {
                                high: "Moderation: High (Strict)",
                                medium: "Moderation: Medium (Balanced)",
                                low: "Moderation: Low (Permissive)"
                            };
                            modBtn.title = titles[targetMod];
                        }

                        allExtraBtns.forEach(b => b.classList.remove('active'));

                        if (data.features) {
                            if (data.features.fast && btnFast && !btnFast.disabled) btnFast.classList.add('active');
                            if (data.features.creative && btnCreative) btnCreative.classList.add('active');
                            
                            if (data.features.dense && btnDense) {
                                btnDense.classList.add('active');
                                if(btnCreative) btnCreative.classList.remove('active');
                            }
                            
                            if (data.features.movie && btnMovie && !btnMovie.disabled) btnMovie.classList.add('active');
                            if (data.features.highRes && btnHighRes) btnHighRes.classList.add('active');
                            if (data.features.enhance && btnEnhance) btnEnhance.classList.add('active');
                        }

                        checkFormReady();

                        const lightbox = document.getElementById('lightbox');
                        const galleryModal = document.getElementById('gallery-modal');
                        
                        lightbox.classList.remove('active');
                        
                        setTimeout(() => {
                            if(galleryModal) galleryModal.classList.remove('active');
                            document.body.classList.remove('no-scroll');
                        }, 100);

                        playSuccessSound();
                        showNotification(currentLang == "tr" ? "Ayarlar başarıyla uygulandı!" : "Settings applied successfully!", "success", data.url);
                        
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    };
                }

                lightbox.classList.add('active');

                if (data.isShowcase) {
                    document.querySelector(".lightbox-delete-btn").style.display = "none"
                    document.querySelector(".lightbox-share-btn").style.display = "none"
                    document.querySelector(".lightbox-copy-btn").style.display = "none"
                    const infoMeta = document.querySelector('.lightbox-meta');
                    if (infoMeta) infoMeta.textContent = data.model.replace(/i/gi, 'I')
                    infoMeta.style.marginBottom = "8px"
                } 
                else {
                    document.querySelector(".lightbox-delete-btn").style.display = "flex"
                    document.querySelector(".lightbox-share-btn").style.display = "flex"
                    document.querySelector(".lightbox-copy-btn").style.display = "flex"
                }
            }

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                    setTimeout(() => lightboxImg.src = '', 300);
                }
            });

            const deleteBtn = document.getElementById('lightbox-delete');
            const confirmModal = document.getElementById('confirm-modal');
            const btnCancel = document.getElementById('btn-cancel');
            const btnConfirm = document.getElementById('btn-confirm');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                confirmModal.classList.add('active');
            });
            btnCancel.addEventListener('click', () => {
                confirmModal.classList.remove('active');
            });
            confirmModal.addEventListener('click', (e) => {
                if (e.target === confirmModal) {
                    confirmModal.classList.remove('active');
                }
            });
            btnConfirm.addEventListener('click', async () => {
                try {
                    if (currentImageTimestamp) {
                        await dbHelper.delete(currentImageTimestamp);
                        confirmModal.classList.remove('active');
                        lightbox.classList.remove('active');
                        await loadGallery(); 
                        playSuccessSound()
                        showNotification(currentLang == "tr" ? "Resim başarıyla silindi." : "The image has been successfully deleted.");
                    }
                } catch (error) {
                    confirmModal.classList.remove('active');
                    playErrorSound()
                    showNotification(currentLang == "tr" ? "Silme işleminde bir hata olustu." : "An error occurred during the deletion process.");
                }
            });
            let activeNotification = null;

            function injectNotificationStyles() {
                if (!document.getElementById('notification-dynamic-styles')) {
                    const style = document.createElement('style');
                    style.id = 'notification-dynamic-styles';
                    style.innerHTML = `
                        @keyframes slideOutRight {
                            0% { transform: translateX(0); opacity: 1; }
                            100% { transform: translateX(120%); opacity: 0; }
                        }
                        .notification-exit {
                            animation: slideOutRight 0.5s cubic-bezier(0.2, 1, 0.3, 1) forwards;
                            transition: max-height 0.5s ease, margin-bottom 0.5s ease, padding 0.5s ease, opacity 0.5s ease;
                            overflow: hidden;
                        }
                    `;
                    document.head.appendChild(style);
                }
            }

            if (typeof injectNotificationStyles === 'function') injectNotificationStyles();

            function showNotification(message, type = 'info', imageUrl = null, duration = 4000) {
                let container = document.getElementById('notification-container');
                if (!container) {
                    container = document.createElement('div');
                    container.id = 'notification-container';
                    container.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        z-index: 50000;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        pointer-events: none;
                        max-width: 350px;
                        width: 100%;
                        transition: all 0.3s ease;
                    `;
                    document.body.appendChild(container);
                }

                const isPerfMode = document.body.classList.contains('performance-mode');

                const notification = document.createElement('div');
                notification.className = 'notification';

                notification.style.position = 'relative';
                notification.style.pointerEvents = 'auto';
                notification.style.margin = '0';
                notification.style.width = '100%';
                notification.style.maxHeight = '150px'; 

                if (isPerfMode) {
                    notification.style.opacity = '1';
                    notification.style.transform = 'none';
                    notification.style.animation = 'none';
                } else {
                    notification.style.opacity = '0';
                    notification.style.animation = 'slideIn 0.4s cubic-bezier(0.2, 1, 0.3, 1) forwards';
                }

                let contentHtml = '';
                if (type === 'loading') {
                    contentHtml = `
                        <div class="notification-spinner"></div>
                        <span>${message}</span>`;
                } else if (type === 'success' && imageUrl) {
                    contentHtml = `
                        <img src="${imageUrl}" class="notification-thumb" alt="Preview">
                        <div style="display:flex; flex-direction:column;">
                            <span style="font-weight:600; color:#00ff88;">Success!</span>
                            <span style="font-size:12px; opacity:0.8;">${message}</span>
                            <span style="font-size:10px; color:#888; margin-top:2px;">Click here for the gallery ↗</span>
                        </div>`;
                    notification.classList.add('clickable');
                    
                    notification.onclick = async (e) => {
                        if (notification.classList.contains('notification-exit')) return;
                        const galleryModal = document.getElementById('gallery-modal');
                        if (galleryModal) {
                            galleryModal.classList.add('active');
                            document.body.classList.add('no-scroll');
                            if (typeof loadGallery === 'function') await loadGallery();
                        }
                        removeNotification(notification);
                    };
                } else {
                    contentHtml = `<span>${message}</span>`;
                }

                if (type === 'success') {
                    notification.style.borderColor = '#00ff88';
                    notification.style.backgroundColor = 'rgba(0, 255, 136, 0.1)';
                } else if (type === 'error') {
                    notification.style.borderColor = '#ff4444';
                    notification.style.backgroundColor = 'rgba(255, 68, 68, 0.1)';
                } else if (type === 'info') {
                    notification.style.borderColor = '#4488ff';
                    notification.style.backgroundColor = 'rgba(68, 136, 255, 0.1)';
                }

                if (message === "Moderation set to medium.") {
                    notification.style.borderColor = '#ffaa00';
                    notification.style.backgroundColor = 'rgba(255, 170, 0, 0.1)';
                } else if (message === "Moderation set to low.") {
                    notification.style.borderColor = '#ff55ff';
                    notification.style.backgroundColor = 'rgba(255, 85, 255, 0.1)';
                } else if (message === "Moderation set to high.") {
                    notification.style.borderColor = '#00aaff';
                    notification.style.backgroundColor = 'rgba(0, 170, 255, 0.1)';
                } else if (message === "The image has been successfully deleted.") {
                    notification.style.borderColor = '#ff4444';
                    notification.style.backgroundColor = 'rgba(255, 68, 68, 0.1)';
                }
                
                notification.innerHTML = contentHtml;
                container.appendChild(notification);

                const removeNotification = (targetNote) => {
                    if (targetNote.classList.contains('notification-exit')) return;

                    if (document.body.classList.contains('performance-mode')) {
                        if (targetNote.parentNode) targetNote.remove();
                        if (container.children.length === 0) container.remove();
                        return;
                    }

                    targetNote.style.maxHeight = targetNote.scrollHeight + 'px';
                    void targetNote.offsetWidth;
                    targetNote.classList.add('notification-exit');

                    targetNote.style.maxHeight = '0';
                    targetNote.style.marginBottom = '0';
                    targetNote.style.paddingTop = '0';
                    targetNote.style.paddingBottom = '0';
                    targetNote.style.opacity = '0';
                    targetNote.style.borderWidth = '0';
                    targetNote.style.marginTop = '0';

                    setTimeout(() => {
                        if (targetNote.parentNode) targetNote.remove();
                        if (container.children.length === 0) container.remove();
                    }, 500);
                };

                if (type !== 'loading') {
                    setTimeout(() => {
                        removeNotification(notification);
                    }, duration);
                }
                
                return () => removeNotification(notification);
            }
            const redirectModal = document.getElementById('redirect-modal');
            const redirectTitle = document.getElementById('redirect-title');
            const redirectDesc = document.getElementById('redirect-desc');
            const btnRedirectConfirm = document.getElementById('btn-redirect-confirm');
            const btnRedirectCancel = document.getElementById('btn-redirect-cancel');
            let targetUrl = "";

            function openRedirectModal(type) {
                const t = translations[currentLang]; 
                if (type === 'bot') {
                    targetUrl = "https://t.me/ThenaAIBot";
                    redirectTitle.textContent = t.redirectBotTitle;
                    redirectDesc.textContent = t.redirectBotDesc;
                } else if (type === 'owner') {
                    targetUrl = "https://t.me/phaticusthiccy";
                    redirectTitle.textContent = t.redirectOwnerTitle;
                    redirectDesc.textContent = t.redirectOwnerDesc;
                } 
                else if (type === 'donate') {
                    targetUrl = "https://thenaai.carrd.co/";
                    redirectTitle.textContent = t.redirectDonateTitle;
                    redirectDesc.textContent = t.redirectDonateDesc;
                }
                btnRedirectConfirm.textContent = t.btnGo;
                btnRedirectCancel.textContent = t.btnCancel;
                redirectModal.classList.add('active');
            }
            document.getElementById('btn-open-bot').addEventListener('click', () => openRedirectModal('bot'));
            document.getElementById('btn-open-owner').addEventListener('click', () => openRedirectModal('owner'));
            document.getElementById('btn-donate').addEventListener('click', () => openRedirectModal('donate'));
            btnRedirectCancel.addEventListener('click', () => {
                redirectModal.classList.remove('active');
            });
            btnRedirectConfirm.addEventListener('click', () => {
                window.open(targetUrl, '_blank');
                redirectModal.classList.remove('active');
            });
            redirectModal.addEventListener('click', (e) => {
                if (e.target === redirectModal) redirectModal.classList.remove('active');
            });
            
            const deleteAllBtn = document.getElementById('delete-all-btn');
            const deleteAllModal = document.getElementById('delete-all-modal');
            const btnCancelAll = document.getElementById('btn-cancel-all');
            const btnConfirmAll = document.getElementById('btn-confirm-all');


            if (deleteAllBtn) {
                deleteAllBtn.addEventListener('click', () => {
                    if (!allGalleryImages || allGalleryImages.length === 0) {
                        playInformationSound();
                        showNotification(currentLang == "tr" ? "Galeri halihazırda boş." : "The gallery is already empty.", "info");
                        return;
                    }
                    playDeleteAllWarningSound();
                    deleteAllModal.classList.add('active');
                });
            }
            if (btnCancelAll) {
                btnCancelAll.addEventListener('click', () => {
                    deleteAllModal.classList.remove('active');
                });
            }
            if (deleteAllModal) {
                deleteAllModal.addEventListener('click', (e) => {
                    if (e.target === deleteAllModal) deleteAllModal.classList.remove('active');
                });
            }
            if (btnConfirmAll) {
                btnConfirmAll.addEventListener('click', async () => {
                    try {
                        await dbHelper.clear();
                        allGalleryImages = []; 
                        galleryGrid.innerHTML = '<div class="empty-gallery">No images yet. Start generating!</div>';
                        deleteAllModal.classList.remove('active');
                        playSuccessSound()
                        showNotification(currentLang == "tr" ? "Tüm galeri temizlendi." : "The entire gallery has been successfully cleaned.", "success");
                    } catch (error) {
                        console.error("Error deleting all images:", error);
                        playErrorSound()
                        showNotification(currentLang == "tr" ? "Galeri temizlenirken bir hata oluştu." : "An error occurred during the deletion process.", "error");
                        deleteAllModal.classList.remove('active');
                    }
                });
            }


            const lightboxCloseBtn = document.getElementById('lightbox-close');

            if (lightboxCloseBtn) {
                lightboxCloseBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    const lightbox = document.getElementById('lightbox');
                    const lightboxImg = document.getElementById('lightbox-img');
                    
                    if (lightbox) lightbox.classList.remove('active');
                    
                    setTimeout(() => {
                        if (lightboxImg) lightboxImg.src = '';
                    }, 300);
                });
            }

            function useImageSettings(event, btnElement) {
                event.stopPropagation(); 
                
                const parentItem = btnElement.closest('.gallery-item');
                if (!parentItem) return;
                
                let data;
                try {
                    data = JSON.parse(decodeURIComponent(parentItem.dataset.item));
                } catch (e) {
                    return;
                }

                const promptInput = document.getElementById('prompt');
                promptInput.value = data.prompt;
                localStorage.setItem(LS_KEYS.PROMPT, data.prompt);
                promptInput.style.height = 'auto'; 
                promptInput.style.height = promptInput.scrollHeight + 'px';

                if (models && models.length > 0) {
                    const targetModelObj = models.find(m => m.model === data.model);
                    if (targetModelObj) {
                        const modelCard = document.querySelector(`.model-card[data-model-id="${targetModelObj.id}"]`);
                        if (modelCard) modelCard.click();
                    }
                }

                if (data.size) {
                    const sizeBtn = document.querySelector(`.aspect-btn[data-size="${data.size}"]`);
                    if (sizeBtn) sizeBtn.click();
                }

                const modBtn = document.getElementById('moderation-btn');
                if (modBtn && data.moderation) {
                    modBtn.setAttribute('data-level', data.moderation);
                    moderationLevel = data.moderation;
                }

                allExtraBtns.forEach(b => b.classList.remove('active'));
                if (data.features) {
                    if (data.features.fast && btnFast) btnFast.classList.add('active');
                    if (data.features.creative && btnCreative) btnCreative.classList.add('active');
                    if (data.features.dense && btnDense) btnDense.classList.add('active');
                    if (data.features.movie && btnMovie && !btnMovie.disabled) btnMovie.classList.add('active');
                    if (data.features.highRes && btnHighRes) btnHighRes.classList.add('active');
                }

                const galleryModal = document.getElementById('gallery-modal');
                galleryModal.classList.remove('active');
                document.body.classList.remove('no-scroll');

                checkFormReady();

                playSuccessSound();
                showNotification(
                    currentLang == "tr" ? "Ayarlar bu resimden yüklendi!" : "Settings loaded from this image!", 
                    "success", 
                    data.url
                );
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }



        const shareBtn = document.getElementById('lightbox-share-btn');
        const shareModal = document.getElementById('share-modal');
        const closeShareBtn = document.getElementById('btn-share-close');
        const copyShareLinkBtn = document.getElementById('btn-share-copy');
        const shareUrlDisplay = document.getElementById('share-url-display');

        if (shareBtn) {
            shareBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                
                const t = translations[currentLang]; 

                shareModal.classList.add('active');
                if(viewShareWrapper) viewShareWrapper.classList.remove('open');
                if(viewShareBtn) viewShareBtn.classList.remove('visible');
                
                shareUrlDisplay.value = t.msgUploading; 
                copyShareLinkBtn.textContent = t.btnShareWait;
                
                copyShareLinkBtn.disabled = true;
                copyShareLinkBtn.style.background = "#222";
                copyShareLinkBtn.style.cursor = "not-allowed";

                shareModal.classList.add('active');
                if(viewShareWrapper) viewShareWrapper.classList.remove('open');
                if(viewShareBtn) viewShareBtn.classList.remove('visible');
                shareUrlDisplay.value = "Uploading to server...";
                copyShareLinkBtn.textContent = "Wait...";
                copyShareLinkBtn.disabled = true;
                copyShareLinkBtn.style.background = "#222";
                copyShareLinkBtn.style.cursor = "not-allowed";

                try {
                    const img = document.getElementById('lightbox-img');
                    let base64Data = img.src;
                    
                    if (base64Data.startsWith('data:image')) {
                        const rawBase64 = base64Data.split(',')[1];

                        var infometa = document.querySelector(".lightbox-meta").textContent
                        infometa = infometa.replace(/\n/g, ' ').trim().toLocaleLowerCase()
                        let infoModel = infometa.split("•")[0].trim();
                        let infoRatio = infometa.split("•")[1].trim().split(" ")[0];
                        let infoModeration = infometa.split("•")[2].trim().includes("high") ? "high" : (infometa.split("•")[2].trim().includes("medium") ? "medium" : "low");

                        let infoModel2 = infoModel.split(" ");

                        for (let i = 0; i < infoModel2.length; i++) {
                            infoModel2[i] = infoModel2[i][0].toUpperCase() + infoModel2[i].substr(1);
                        }

                        infoModel2 = infoModel2.join(" ");

                        const response = await fetch('https://create.thena.workers.dev/showcaseUpload', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                ...uploadHeaders
                            },
                            body: JSON.stringify({
                                image: rawBase64,
                                apikey: apiKeyInput ? apiKeyInput.value.trim() : "",
                                prompt: document.querySelector(".lightbox-prompt").textContent,
                                model: infoModel2 ? infoModel2 : "",
                                ratio: infoRatio ? infoRatio : "",
                                moderation: infoModeration ? infoModeration : "high",
                                features: [
                                    btnFast.classList.contains('active') ? "fast" : "",
                                    btnCreative.classList.contains('active') ? "creative" : "",
                                    btnDense.classList.contains('active') ? "dense" : "",
                                    btnMovie.classList.contains('active') ? "movie" : "",
                                    btnHighRes.classList.contains('active') ? "highRes" : "",
                                    btnEnhance.classList.contains('active') ? "enhance" : ""
                                ]
                            })
                        });

                        const data = await response.json();

                        if (data.status === 200 && data.image) {
                            const urlObj = new URL(data.image);
                            const imageId = urlObj.searchParams.get("id");

                            const myShowcaseUrl = `https://create.thena.workers.dev/publicShowcase?id=${imageId}`;

                            shareUrlDisplay.value = myShowcaseUrl;
                            copyShareLinkBtn.textContent = "Copy Link";
                            copyShareLinkBtn.textContent = t.btnShareCopy;
                        
                            copyShareLinkBtn.disabled = false;
                            copyShareLinkBtn.style.cursor = "pointer";
                            
                            if (viewShareBtn && viewShareWrapper) {
                                viewShareBtn.href = myShowcaseUrl;
                                viewShareWrapper.classList.add('open');
                                setTimeout(() => {
                                    viewShareBtn.classList.add('visible');
                                }, 100);
                            }

                            if(typeof playSuccessSound === "function") {
                                playSuccessSound();
                                showNotification(currentLang == "tr" ? "Resim yüklendi!" : "Image uploaded successfully!", "success", base64Data);
                            }

                        } else {
                            console.error("Upload failed:", data);
                            shareUrlDisplay.value = t.msgUploadFail;
                            copyShareLinkBtn.textContent = t.btnShareError;
                            if(typeof playErrorSound === "function") playErrorSound();

                            if (data.status == 401) {
                                showNotification(currentLang == "tr" ? "API anahtarınız geçerli değil." : "Invalid API Key provided.", "error");
                            } else if (data.status == 429) {
                                showNotification(currentLang == "tr" ? "Limit aşıldı. Günlük 10 yükleme yapabilirsiniz." : "Upload limit exceeded. Max 10 uploads per day.", "error");
                            } else if (data.status == 502) {
                                showNotification(currentLang == "tr" ? "Sunucu hatası. Lütfen daha sonra tekrar deneyiniz." : "Server error. Please try again later.", "error");
                            }
                        }
                    } else {
                        shareUrlDisplay.value = "Error: Image source is not base64.";
                        shareUrlDisplay.value = t.msgUploadFail;
                        copyShareLinkBtn.textContent = t.btnShareError;
                        showNotification("Image source is not base64.", "error");
                    }

                } catch (error) {
                    console.error("Upload error:", error);
                    shareUrlDisplay.value = currentLang == "tr" ? "Yükleme hatası. Lütfen daha sonra tekrar deneyiniz." : "Upload failed. Please try again.";
                    copyShareLinkBtn.textContent = "Error";
                    if(typeof playErrorSound === "function") playErrorSound();
                    showNotification(currentLang == "tr" ? "Resim yükleme hatası." : "Image upload failed.", "error");
                }
            });
        }

        if (closeShareBtn) {
            closeShareBtn.addEventListener('click', () => {
                shareModal.classList.remove('active');
            });
        }

        if (shareModal) {
            shareModal.addEventListener('click', (e) => {
                if (e.target === shareModal) {
                    shareModal.classList.remove('active');
                }
            });
        }

        if (copyShareLinkBtn) {
            copyShareLinkBtn.addEventListener('click', () => {
                if (copyShareLinkBtn.disabled) return;
                
                const t = translations[currentLang];

                const urlToCopy = shareUrlDisplay.value;
                navigator.clipboard.writeText(urlToCopy).then(() => {
                    
                    copyShareLinkBtn.textContent = t.btnShareCopied;
                    
                    copyShareLinkBtn.style.background = "rgb(var(--primary-rgb))";
                    copyShareLinkBtn.style.color = "#000";
                    
                    setTimeout(() => {
                        copyShareLinkBtn.textContent = t.btnShareCopy;
                        
                        copyShareLinkBtn.style.background = "#222";
                        copyShareLinkBtn.style.color = "#fff";
                    }, 2000);
                });
            });
        }

        const settingsBtn = document.getElementById('btn-open-settings');
        const settingsModal = document.getElementById('settings-modal');
        const closeSettingsBtn = document.getElementById('btn-close-settings');
        const themeBtns = document.querySelectorAll('.theme-btn');
        const btnHardReset = document.getElementById('btn-hard-reset');
        const root = document.documentElement;

        settingsBtn.addEventListener('click', () => settingsModal.classList.add('active'));
        closeSettingsBtn.addEventListener('click', () => settingsModal.classList.remove('active'));
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) settingsModal.classList.remove('active');
        });


        const perfToggle = document.getElementById('perf-mode-toggle');
        function togglePerformanceMode(enable) {
            if (enable) {
                document.body.classList.add('performance-mode');
                if(perfToggle) perfToggle.checked = true;
                localStorage.setItem('thena-perf-mode', 'true');
            } else {
                document.body.classList.remove('performance-mode');
                if(perfToggle) perfToggle.checked = false;
                localStorage.setItem('thena-perf-mode', 'false');
            }
        }
        if (perfToggle) {
            perfToggle.addEventListener('change', (e) => {
                const isChecked = e.target.checked;
                togglePerformanceMode(isChecked);
                if(typeof playInformationSound === "function") playInformationSound();
                const msg = isChecked ? currentLang == "tr" ? "Performans Modü Aktif Edildi" : "Performance Mode Enabled" : currentLang == "tr" ? "Performans Modü Deaktif Edildi" : "Performance Mode Disabled";
                if(typeof showNotification === "function") showNotification(msg, "info");
            });
        }
        const savedPerfMode = localStorage.getItem('thena-perf-mode');
        if (savedPerfMode === 'true') {
            togglePerformanceMode(true);
        }


        const muteToggle = document.getElementById('mute-mode-toggle');
        if (muteToggle) {
            muteToggle.checked = isMuted;

            muteToggle.addEventListener('change', (e) => {
                isMuted = e.target.checked;
                localStorage.setItem('thena-mute-mode', isMuted);
                
                if(typeof showNotification === "function") {
                    showNotification(isMuted ? currentLang == "tr" ? "Sessiz Mod Aktif Edildi" : "Silent Mode Enabled" : currentLang == "tr" ? "Sessiz Mod Deaktif Edildi" : "Silent Mode Disabled", "info");
                }
                
                if (!isMuted && typeof playInformationSound === "function") {
                    playInformationSound();
                }
            });
        }

        const advToggle = document.getElementById('advanced-mode-toggle');
        const advPanel = document.getElementById('advanced-panel');
        const extrasSelector = document.querySelector('.extras-selector');
        let isAdvancedMode = localStorage.getItem('thena-advanced-mode') === 'true';

        function toggleAdvancedMode(enable) {
            isAdvancedMode = enable;
            localStorage.setItem('thena-advanced-mode', enable);
            
            if (advToggle) advToggle.checked = enable;

            if (enable) {
                if(advPanel) advPanel.classList.remove('hidden');
                
                if(extrasSelector) {
                    extrasSelector.classList.add('disabled-area');
                    document.querySelectorAll('.extra-btn.active').forEach(btn => btn.classList.remove('active'));
                }
            } else {
                if(advPanel) advPanel.classList.add('hidden');
                if(extrasSelector) extrasSelector.classList.remove('disabled-area');
            }
        }

        if (advToggle) {
            advToggle.checked = isAdvancedMode; 
            toggleAdvancedMode(isAdvancedMode);

            advToggle.addEventListener('change', (e) => {
                toggleAdvancedMode(e.target.checked);
                if(typeof playInformationSound === "function") playInformationSound();
                const msg = e.target.checked ? currentLang == "tr" ? "Gelişmiş Mod Aktif Edildi" : "Advanced Mode Enabled" : currentLang == "tr" ? "Gelişmiş Mod Deaktif Edildi" : "Advanced Mode Disabled";
                if(typeof showNotification === "function") showNotification(msg, "info");
            });
        }

        function setTheme(color, rgb, gradient = null, notify = true) { 
            root.style.setProperty('--primary', color);
            root.style.setProperty('--primary-rgb', rgb);
            
            const themeBg = gradient ? gradient : color;
            root.style.setProperty('--theme-bg', themeBg);
            
            if (color == "#00ff88") {
                // green theme
                root.style.setProperty('--dot-filled-1', '#e6fff2');
                root.style.setProperty('--dot-filled-2', '#99ffcc'); 
                root.style.setProperty('--dot-filled-3', '#4dffaa'); 
                root.style.setProperty('--dot-filled-4', '#00ff88'); 
                root.style.setProperty('--dot-filled-5', '#00b35f');
                root.style.setProperty('--placeholderPulse-0-border', '#00ff881a');
                root.style.setProperty('--placeholderPulse-0-box-shadow', '#00ff880d');
                root.style.setProperty('--placeholderPulse-50-border', '#00ff8899');
                root.style.setProperty('--placeholderPulse-50-box-shadow', '#00ff8833');
                root.style.setProperty('--placeholderPulse-100-border', '#00ff881a');
                root.style.setProperty('--placeholderPulse-100-box-shadow', '#00ff880d');
                root.style.setProperty('--pulse0', '#00ff8856');
                root.style.setProperty('--pulse50', '#00ff8888');
                root.style.setProperty('--pulse100', '#00ff8833');
            } else if (color == "#00ccff") {
                // blue theme
                root.style.setProperty('--dot-filled-1', '#e0e0e0');
                root.style.setProperty('--dot-filled-2', '#a2d2ff');
                root.style.setProperty('--dot-filled-3', '#60a5fa');
                root.style.setProperty('--dot-filled-4', '#3b82f6');
                root.style.setProperty('--dot-filled-5', '#1d4ed8');
                root.style.setProperty('--placeholderPulse-0-border', '#00ccff1a');
                root.style.setProperty('--placeholderPulse-0-box-shadow', '#00ccff0d');
                root.style.setProperty('--placeholderPulse-50-border', '#00ccff99');
                root.style.setProperty('--placeholderPulse-50-box-shadow', '#00ccff33');
                root.style.setProperty('--placeholderPulse-100-border', '#00ccff1a');
                root.style.setProperty('--placeholderPulse-100-box-shadow', '#00ccff0d');
                root.style.setProperty('--pulse0', '#00ccff56');
                root.style.setProperty('--pulse50', '#00ccff88');
                root.style.setProperty('--pulse100', '#00ccff33');
            } else if (color == "#ff0088") {
                // pink/magenta theme
                root.style.setProperty('--dot-filled-1', '#ffe0f0'); 
                root.style.setProperty('--dot-filled-2', '#ff99cc'); 
                root.style.setProperty('--dot-filled-3', '#ff4da6'); 
                root.style.setProperty('--dot-filled-4', '#ff0088');
                root.style.setProperty('--dot-filled-5', '#cc006d'); 
                root.style.setProperty('--placeholderPulse-0-border', '#ff00881a');      
                root.style.setProperty('--placeholderPulse-0-box-shadow', '#ff00880d'); 
                root.style.setProperty('--placeholderPulse-50-border', '#ff008899');     
                root.style.setProperty('--placeholderPulse-50-box-shadow', '#ff008833'); 
                root.style.setProperty('--placeholderPulse-100-border', '#ff00881a');   
                root.style.setProperty('--placeholderPulse-100-box-shadow', '#ff00880d');
                root.style.setProperty('--pulse0', '#ff008856');
                root.style.setProperty('--pulse50', '#ff008888');
                root.style.setProperty('--pulse100', '#ff008833');
            } else if (color == "#ffaa00") {
                // orange/amber theme
                root.style.setProperty('--dot-filled-1', '#fff5e6');
                root.style.setProperty('--dot-filled-2', '#ffddb3'); 
                root.style.setProperty('--dot-filled-3', '#ffc466'); 
                root.style.setProperty('--dot-filled-4', '#ffaa00'); 
                root.style.setProperty('--dot-filled-5', '#cc8800');
                root.style.setProperty('--placeholderPulse-0-border', '#ffaa001a');      
                root.style.setProperty('--placeholderPulse-0-box-shadow', '#ffaa000d');  
                root.style.setProperty('--placeholderPulse-50-border', '#ffaa0099');     
                root.style.setProperty('--placeholderPulse-50-box-shadow', '#ffaa0033');
                root.style.setProperty('--placeholderPulse-100-border', '#ffaa001a');   
                root.style.setProperty('--placeholderPulse-100-box-shadow', '#ffaa000d');
                root.style.setProperty('--pulse0', '#ffaa0056');
                root.style.setProperty('--pulse50', '#ffaa0088');
                root.style.setProperty('--pulse100', '#ffaa0033');
            } else if (color == "#bd00ff") {
                // purple/violet theme
                root.style.setProperty('--dot-filled-1', '#f6e0ff'); 
                root.style.setProperty('--dot-filled-2', '#e299ff'); 
                root.style.setProperty('--dot-filled-3', '#d04dff'); 
                root.style.setProperty('--dot-filled-4', '#bd00ff'); 
                root.style.setProperty('--dot-filled-5', '#8a00ba');
                root.style.setProperty('--placeholderPulse-0-border', '#bd00ff1a');      
                root.style.setProperty('--placeholderPulse-0-box-shadow', '#bd00ff0d');  
                root.style.setProperty('--placeholderPulse-50-border', '#bd00ff99');    
                root.style.setProperty('--placeholderPulse-50-box-shadow', '#bd00ff33');
                root.style.setProperty('--placeholderPulse-100-border', '#bd00ff1a');   
                root.style.setProperty('--placeholderPulse-100-box-shadow', '#bd00ff0d');
                root.style.setProperty('--pulse0', '#bd00ff56');
                root.style.setProperty('--pulse50', '#bd00ff88');
                root.style.setProperty('--pulse100', '#bd00ff33');
            } else {
                // default blue theme
                root.style.setProperty('--dot-filled-1', '#e0e0e0');
                root.style.setProperty('--dot-filled-2', '#a2d2ff');
                root.style.setProperty('--dot-filled-3', '#60a5fa');
                root.style.setProperty('--dot-filled-4', '#3b82f6');
                root.style.setProperty('--dot-filled-5', '#1d4ed8');
                root.style.setProperty('--placeholderPulse-0-border', '#00ccff1a');
                root.style.setProperty('--placeholderPulse-0-box-shadow', '#00ccff0d');
                root.style.setProperty('--placeholderPulse-50-border', '#00ccff99');
                root.style.setProperty('--placeholderPulse-50-box-shadow', '#00ccff33');
                root.style.setProperty('--placeholderPulse-100-border', '#00ccff1a');
                root.style.setProperty('--placeholderPulse-100-box-shadow', '#00ccff0d');
                root.style.setProperty('--pulse0', '#00ccff56');
                root.style.setProperty('--pulse50', '#00ccff88');
                root.style.setProperty('--pulse100', '#00ccff33');
            }

            const logoText = document.querySelector('.glitch-text');
            if (logoText) {
                if (gradient) {
                    logoText.classList.add('gradient-active');
                } else {
                    logoText.classList.remove('gradient-active');
                }
            }

            themeBtns.forEach(btn => {
                const btnGradient = btn.dataset.gradient || null;
                const btnColor = btn.dataset.color;
                
                if(gradient && btnGradient === gradient) {
                    btn.classList.add('active');
                    btn.style.borderColor = '#fff';
                } else if (!gradient && !btnGradient && btnColor === color) {
                    btn.classList.add('active');
                    btn.style.borderColor = '#fff';
                } else {
                    btn.classList.remove('active');
                    btn.style.borderColor = 'transparent';
                }
            });

            localStorage.setItem('thena-theme-color', color);
            localStorage.setItem('thena-theme-rgb', rgb);
            if (gradient) {
                localStorage.setItem('thena-theme-gradient', gradient);
            } else {
                localStorage.removeItem('thena-theme-gradient');
            }
            
            if (notify) {
                if(typeof playSuccessSound === "function") playModelSelectSound(true);
                showNotification(currentLang == "tr" ? "Tema güncellendi" : "Theme updated successfully!", "info");
            }
        }

        themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.dataset.color;
                const rgb = btn.dataset.rgb;
                const gradient = btn.dataset.gradient || null;
                setTheme(color, rgb, gradient);
            });
        });

        const savedColor = localStorage.getItem('thena-theme-color');
        const savedRgb = localStorage.getItem('thena-theme-rgb');
        const savedGradient = localStorage.getItem('thena-theme-gradient');

        if (savedColor && savedRgb) {
            setTheme(savedColor, savedRgb, savedGradient, false);
        } else {
            setTheme('#00ccff', '0, 204, 255', null, false);
        }
        const hardResetModal = document.getElementById('hard-reset-modal');
        const btnCancelReset = document.getElementById('btn-cancel-reset');
        const btnConfirmReset = document.getElementById('btn-confirm-reset');

        btnHardReset.addEventListener('click', () => {
            if (typeof playDeleteAllWarningSound === "function") playDeleteAllWarningSound();
            
            hardResetModal.classList.add('active');
        });

        if (btnCancelReset) {
            btnCancelReset.addEventListener('click', () => {
                hardResetModal.classList.remove('active');
            });
        }

        if (hardResetModal) {
            hardResetModal.addEventListener('click', (e) => {
                if (e.target === hardResetModal) hardResetModal.classList.remove('active');
            });
        }

        if (btnConfirmReset) {
            btnConfirmReset.addEventListener('click', async () => {
                const originalText = btnConfirmReset.innerText;
                btnConfirmReset.innerText = "Resetting...";
                btnConfirmReset.disabled = true;

                try {
                    await dbHelper.clear();
                    localStorage.clear();
                    hardResetModal.classList.remove('active');
                    settingsModal.classList.remove('active');

                    if (typeof playSuccessSound === "function") playSuccessSound();
                    
                    showNotification(currentLang == "tr" ? "Uygulama başarıyla sıfırlandı. Sayfa yenileniyor..." : "Application successfully reset. Page reloading...", "success");

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);

                } catch (e) {
                    
                    if (typeof playErrorSound === "function") playErrorSound();
                    showNotification(currentLang == "tr" ? "Reset hatası: " + e.message : "Error occurred during reset: " + e.message, "error");
                    
                    btnConfirmReset.innerText = originalText;
                    btnConfirmReset.disabled = false;
                    hardResetModal.classList.remove('active');
                }
            });
        }


        const btnShowcase = document.getElementById('btn-showcase');
        const showcaseModal = document.getElementById('showcase-modal');
        const closeShowcaseBtn = document.getElementById('close-showcase');
        const showcaseGrid = document.getElementById('showcase-grid');
        const showcaseLoader = document.getElementById('showcase-loader');
        const showcaseSearch = document.getElementById('showcase-search');
        const showcaseFilterModel = document.getElementById('showcase-filter-model');
        const showcaseRefresh = document.getElementById('showcase-refresh');

        let showcaseData = [];
        let isShowcaseLoaded = false;

        if (btnShowcase) {
            btnShowcase.addEventListener('click', () => {
                showcaseModal.classList.add('active');
                document.body.classList.add('no-scroll');
                fetchShowcaseImages(); 
            });
        }

        if (closeShowcaseBtn) {
            closeShowcaseBtn.addEventListener('click', () => {
                showcaseModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }

        if (showcaseModal) {
            showcaseModal.addEventListener('click', (e) => {
                if (e.target === showcaseModal) {
                    showcaseModal.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        }

        if (showcaseRefresh) {
            showcaseRefresh.addEventListener('click', () => {
                fetchShowcaseImages();
            });
        }

        let currentShowcasePage = 1;
        const itemsPerShowcasePage = 8; 
        let currentActiveShowcaseList = []; 
        let isShowcaseRendering = false;

        async function fetchShowcaseImages() {
            showcaseGrid.innerHTML = '';
            showcaseLoader.classList.remove('hidden');
            
            try {
                const response = await fetch('https://create.thena.workers.dev/showcaseImages');
                if (!response.ok) {
                    playErrorSound();
                    showNotification(currentLang == "tr" ? "Showcase resmi alınamadı. Lütfen daha sonra tekrar deneyin." : "Failed to fetch showcase images. Please try again later.", "error");
                    return [];
                }
                
                const data = await response.json();
                
                showcaseData = data.map(item => {
                    const featuresObj = {};
                    if (Array.isArray(item.extra_features)) {
                        item.extra_features.forEach(f => {
                            if (f === 'fastMode') featuresObj.fast = true;
                            else if (f === 'denseMode') featuresObj.dense = true;
                            else featuresObj[f] = true;
                        });
                    }

                    return {
                        url: item.image,
                        prompt: item.prompt,
                        model: item.model,
                        size: item.ratio, 
                        timestamp: new Date().toISOString(),
                        moderation: item.moderation_level || 'high',
                        features: featuresObj
                    };
                });

                showcaseData.reverse();
                isShowcaseLoaded = true;
                populateShowcaseModelFilter();
                currentActiveShowcaseList = showcaseData;
                currentShowcasePage = 1;
                showcaseGrid.innerHTML = ''; 
                renderShowcaseBatch();
            } catch (error) {
                console.error('Showcase fetch error:', error);
                showcaseGrid.innerHTML = '<div class="empty-gallery">Failed to load showcase images. <br> Please try again later.</div>';
                if(typeof playErrorSound === "function") playErrorSound();
            } finally {
                showcaseLoader.classList.add('hidden');
            }
        }

        function populateShowcaseModelFilter() {
            const uniqueModels = [...new Set(showcaseData.map(item => item.model))];
            showcaseFilterModel.innerHTML = '<option value="">All Models</option>';
            uniqueModels.forEach(model => {
                const opt = document.createElement('option');
                opt.value = model;
                opt.textContent = model.replace(/ı/g, 'i');
                showcaseFilterModel.appendChild(opt);
            });
        }

        function renderShowcaseBatch() {
            if (isShowcaseRendering) return;
            isShowcaseRendering = true;

            const start = (currentShowcasePage - 1) * itemsPerShowcasePage;
            const end = start + itemsPerShowcasePage;
            
            const batch = currentActiveShowcaseList.slice(start, end);

            if (batch.length === 0) {
                if (currentShowcasePage === 1) {
                    showcaseGrid.innerHTML = '<div class="empty-gallery">No images found matching criteria.</div>';
                }
                isShowcaseRendering = false;
                return;
            }

            const html = batch.map((item, index) => {
                let spanClass = '';
                
                if (item.size) {
                    const [width, height] = item.size.split('x').map(Number);
                    if (width && height) {
                        const ratio = width / height;
                        if (ratio >= 1.7) spanClass = 'wide';
                        else if (ratio <= 0.6) spanClass = 'tall';
                    }
                }

                if (item.moderation !== 'high') {
                    spanClass += ' sensitive-medium';
                }

                const itemData = encodeURIComponent(JSON.stringify(item));

                return `
                <div class="gallery-item ${spanClass}" style="animation-delay: ${index * 50}ms" data-item="${itemData}">
                    <img src="${item.url}" loading="lazy" alt="Showcase Image">
                    
                    <div class="gallery-item-info" style="justify-content: center;">
                        <div class="info-meta" style="font-size: 0.9rem; font-weight: 500;">${item.model.replace(/i/g, 'I')}</div>
                    </div>
                </div>`;
            }).join('');

            showcaseGrid.insertAdjacentHTML('beforeend', html);
            
            requestAnimationFrame(() => {
                const newItems = showcaseGrid.querySelectorAll('.gallery-item:not(.show)');
                newItems.forEach(item => item.classList.add('show'));
            });

            currentShowcasePage++;
            isShowcaseRendering = false;
        }

        function applyShowcaseFilters() {
            const search = showcaseSearch.value.toLowerCase();
            const model = showcaseFilterModel.value;

            const filtered = showcaseData.filter(item => {
                const matchesSearch = item.prompt.toLowerCase().includes(search);
                const matchesModel = model === '' || item.model === model;
                return matchesSearch && matchesModel;
            });

            currentActiveShowcaseList = filtered; 
            currentShowcasePage = 1; 
            showcaseGrid.innerHTML = ''; 
            
            renderShowcaseBatch();
        }

        if (showcaseSearch) {
            showcaseSearch.addEventListener('input', () => {
                applyShowcaseFilters();
            });
        }

        if (showcaseFilterModel) {
            showcaseFilterModel.addEventListener('change', () => {
                applyShowcaseFilters();
            });
        }

        if (showcaseGrid) {
            showcaseGrid.addEventListener('scroll', () => {
                if (showcaseGrid.scrollTop + showcaseGrid.clientHeight >= showcaseGrid.scrollHeight - 300) {
                    if ((currentShowcasePage - 1) * itemsPerShowcasePage < currentActiveShowcaseList.length) {
                        renderShowcaseBatch();
                    }
                }
            });

            showcaseGrid.addEventListener('click', (e) => {
                const item = e.target.closest('.gallery-item');
                if (item && !e.target.closest('.gallery-copy-btn')) {
                    try {
                        const data = JSON.parse(decodeURIComponent(item.dataset.item));
                        data.isShowcase = true; 
                        if(typeof openLightbox === "function") openLightbox(data);
                    } catch (err) {
                        console.error("Error parsing item data", err);
                    }
                }
            });
        }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const featModal = document.getElementById('feature-info-modal');
                    if (featModal && featModal.classList.contains('active')) {
                        featModal.classList.remove('active');
                    }


                    const lightbox = document.getElementById('lightbox');
                    const lightboxImg = document.getElementById('lightbox-img');
                    if (lightbox && lightbox.classList.contains('active')) {
                        lightbox.classList.remove('active');
                        setTimeout(() => {
                            if (lightboxImg) lightboxImg.src = '';
                        }, 300);
                    }

                    const galleryModal = document.getElementById('gallery-modal');
                    if (galleryModal && galleryModal.classList.contains('active')) {
                        galleryModal.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }

                    const openOwner = document.getElementById('redirect-modal');
                    if (openOwner && openOwner.classList.contains('active')) {
                        openOwner.classList.remove('active');
                    }


                    const settingsModal = document.getElementById('settings-modal');
                    if (settingsModal && settingsModal.classList.contains('active')) {
                        settingsModal.classList.remove('active');
                    }

                    const showcaseModal = document.getElementById('showcase-modal');
                    if (showcaseModal && showcaseModal.classList.contains('active')) {
                        showcaseModal.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }

                    const shareModal = document.getElementById('share-modal');
                    if (shareModal && shareModal.classList.contains('active')) {
                        shareModal.classList.remove('active');
                    }
                }
            });



            const img2PromptBtn = document.getElementById('img2prompt-btn');
            const img2PromptModal = document.getElementById('img2prompt-modal');
            const btnImg2PromptCancel = document.getElementById('btn-img2prompt-cancel');
            const btnImg2PromptGenerate = document.getElementById('btn-img2prompt-generate');
            const uploadArea = document.getElementById('img-upload-area');
            const fileInput = document.getElementById('img-file-input');
            const previewImg = document.getElementById('preview-img');
            const uploadPlaceholder = document.getElementById('upload-placeholder');
            const clearImgBtn = document.getElementById('clear-img-btn');

            let currentBase64Image = null;

            img2PromptBtn.addEventListener('click', () => {
                img2PromptModal.classList.add('active');
                if(typeof playInformationSound === "function") playInformationSound();
            });

            btnImg2PromptCancel.addEventListener('click', () => {
                if (btnImg2PromptGenerate.classList.contains('loading')) return; 
                closeImg2PromptModal();
            });

            img2PromptModal.addEventListener('click', (e) => {
                if (btnImg2PromptGenerate.classList.contains('loading')) return;
                if (e.target === img2PromptModal) closeImg2PromptModal();
            });

            function closeImg2PromptModal() {
                img2PromptModal.classList.remove('active');
                clearImageSelection();
            }

            uploadArea.addEventListener('click', (e) => {
                if(e.target !== clearImgBtn) {
                    fileInput.click();
                }
            });

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                handleImageFile(file);
            });

            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                const file = e.dataTransfer.files[0];
                handleImageFile(file);
            });

            document.addEventListener('paste', (e) => {
                if (!img2PromptModal.classList.contains('active')) return;
                
                const items = (e.clipboardData || e.originalEvent.clipboardData).items;
                for (let index in items) {
                    const item = items[index];
                    if (item.kind === 'file' && item.type.startsWith('image/')) {
                        const blob = item.getAsFile();
                        handleImageFile(blob);
                        break;
                    }
                }
            });

            clearImgBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                clearImageSelection();
            });

            function clearImageSelection() {
                currentBase64Image = null;
                previewImg.src = '';
                previewImg.classList.add('hidden');
                clearImgBtn.classList.add('hidden');
                uploadPlaceholder.classList.remove('hidden');
                fileInput.value = '';
                btnImg2PromptGenerate.disabled = true;
            }

            function handleImageFile(file) {
                if (!file || !file.type.startsWith('image/')) {
                    if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Lütfen geçerli bir resim dosyası seçin." : "Please select a valid image file.", "error");
                    return;
                }

                if (file.size > 5 * 1024 * 1024) {
                    if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Resim dosyası 5MB'dan fazla olamaz." : "Image is too large (Max 5MB).", "error");
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    const base64 = e.target.result;
                    currentBase64Image = base64;
                    
                    previewImg.src = base64;
                    previewImg.classList.remove('hidden');
                    clearImgBtn.classList.remove('hidden');
                    uploadPlaceholder.classList.add('hidden');
                    btnImg2PromptGenerate.disabled = false;
                    
                    if(typeof playSuccessSound === "function") playModelSelectSound(true);
                };
                reader.readAsDataURL(file);
            }

            btnImg2PromptGenerate.addEventListener('click', async () => {
                const apiKey = document.getElementById('api-key').value.trim();
                
                if (!apiKey) {
                    if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Lütfen API Anahtarını girin." : "Please enter your API Key first.", "error");
                    if(typeof playErrorSound === "function") playErrorSound();
                    return;
                }

                if (!currentBase64Image) return;
                const t = translations[currentLang] || translations['en'];
                const originalBtnContent = btnImg2PromptGenerate.innerHTML;

                btnImg2PromptGenerate.innerHTML = `<span>${t.lblAnalyzing}</span><svg class="sparkle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>`;
                var clipnotif = showNotification(currentLang === 'tr' ? "Görselden prompt oluşturuluyor. Bu işlem biraz sürebilir..." : "Generating prompt from image. This may take a moment...", "loading");
                playInformationSound();
                btnImg2PromptGenerate.classList.add('loading');
                btnImg2PromptGenerate.disabled = true;

                btnImg2PromptCancel.disabled = true;
                btnImg2PromptCancel.style.opacity = "0.5";
                btnImg2PromptCancel.style.cursor = "not-allowed";

                try {                    
                    const img = new Image();
                    img.src = currentBase64Image;
                    await new Promise(resolve => img.onload = resolve);
                    const scaleFactor = 0.6; 
                    const newWidth = Math.floor(img.width * scaleFactor);
                    const newHeight = Math.floor(img.height * scaleFactor);

                    const canvas = document.createElement('canvas');
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    const ctx = canvas.getContext('2d');
                    
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);

                    const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
                    
                    const rawBase64 = resizedDataUrl.split(',')[1];
                    

                    const response = await fetch('https://create.thena.workers.dev/clipPrior', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            apikey: apiKey,
                            image: rawBase64
                        })
                    });

                    const data = await response.json();
                    if (clipnotif) clipnotif();
                    
                    if (data.status === 200 && data.content) {
                        if(typeof playSuccessSound === "function") playSuccessSound();
                        closeImg2PromptModal();
                        
                        const incomingPrompt = data.content.prompt || ""; 
                        const promptInput = document.getElementById('prompt');
                        if (typeof typeWriterEffect === "function") {
                            typeWriterEffect(incomingPrompt, promptInput);
                        } else {
                            promptInput.value = incomingPrompt;
                            if(typeof autoResize === "function") autoResize(promptInput);
                        }
                        
                        if (data.content.model) {
                            const targetModelName = data.content.model.trim();
                            const modelCards = document.querySelectorAll('.model-card');
                            
                            modelCards.forEach(card => {
                                const nameEl = card.querySelector('.model-name');
                                if (nameEl && nameEl.innerText.trim().toLowerCase() === targetModelName.toLowerCase()) {
                                    if (!card.classList.contains('active')) {
                                        card.click();
                                        if(typeof showNotification === "function") {
                                            setTimeout(() => {
                                                showNotification(currentLang == "tr" ? "Model güncellendi: " + targetModelName : `Model switched to: ${targetModelName}`, "info");
                                            }, 800); 
                                        }
                                    }
                                }
                            });
                        }

                        if (data.content.aspect_ratio) {
                            const targetRatio = data.content.aspect_ratio.trim();
                            const ratioBtn = document.querySelector(`.aspect-btn[data-ratio="${targetRatio}"]`);
                            if (ratioBtn) {
                                if (!ratioBtn.classList.contains('active')) {
                                    ratioBtn.click();
                                }
                            }
                        }

                        allExtraBtns.forEach(b => b.classList.remove('active'));

                        if (Array.isArray(data.content.extra_features)) {
                            const features = data.content.extra_features;
                            
                            if (features.includes('fast') && btnFast && !btnFast.disabled) btnFast.classList.add('active');
                            if (features.includes('creative') && btnCreative) btnCreative.classList.add('active');
                            
                            if (features.includes('dense') && btnDense) {
                                btnDense.classList.add('active');
                                if(btnCreative) btnCreative.classList.remove('active');
                            }
                            if (features.includes('movie') && btnMovie && !btnMovie.disabled) btnMovie.classList.add('active');
                            if (features.includes('highRes') && btnHighRes) btnHighRes.classList.add('active');
                        }
                        
                        checkFormReady();
                        if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Prompt ve ayarlar başarıyla uygulandı!" : "Prompt and settings applied successfully!", "success");

                    } else {
                        showNotification(currentLang == "tr" ? "Prompt oluşturulamadı. Lütfen farklı bir resimle tekrar deneyin." : "Failed to generate prompt. Please try different image.", "error");
                        if(typeof playErrorSound === "function") playErrorSound();
                    }

                } catch (error) {
                    console.error(error);
                    if(typeof playErrorSound === "function") playErrorSound();
                    showNotification(currentLang == "tr" ? "Prompt oluşturulamadı. Lütfen farklı bir resimle tekrar deneyin." : "Failed to generate prompt. Please try different image.", "error");
                } finally {
                    btnImg2PromptGenerate.innerHTML = originalBtnContent;
                    btnImg2PromptGenerate.classList.remove('loading');
                    btnImg2PromptGenerate.disabled = false;
                    btnImg2PromptCancel.disabled = false;
                    btnImg2PromptCancel.style.opacity = "";
                    btnImg2PromptCancel.style.cursor = "";
                }
            });


            const promptHistoryBtn = document.getElementById('prompt-history-btn');
            const promptHistoryDropdown = document.getElementById('prompt-history-dropdown');
            const historyListContainer = document.getElementById('history-list-container');
            const clearHistoryBtn = document.getElementById('clear-history-btn');
            const HISTORY_KEY = 'thena-prompt-history-list';

            function getPromptHistory() {
                try {
                    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
                } catch {
                    return [];
                }
            }

            function savePromptToHistory(promptText) {
                if (!promptText || promptText.length < 5) return;
                let history = getPromptHistory();
                history = history.filter(p => p !== promptText);
                history.unshift(promptText);
                if (history.length > 30) history = history.slice(0, 30);
                localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
                renderPromptHistory();
            }

            function renderPromptHistory() {
                playInformationSound();
                const history = getPromptHistory();
                
                if (history.length === 0) {
                    historyListContainer.innerHTML = '<div style="padding:15px; text-align:center; color:#444; font-size:12px;">No history yet. Generate images to build history.</div>';
                    return;
                }

                historyListContainer.innerHTML = '';
                
                history.forEach(text => {
                    const item = document.createElement('div');
                    item.className = 'history-item';
                    
                    const safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
                    
                    item.innerHTML = `
                        <div class="history-text" title="${safeText}">${safeText}</div>
                        <div class="history-actions">
                            <button class="history-action-btn copy-hist-btn" title="Copy">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                        </div>
                    `;
                    
                    item.querySelector('.history-text').addEventListener('click', () => {
                        const promptInput = document.getElementById('prompt');
                        promptInput.value = text;
                        localStorage.setItem('thena-last-prompt', text); 
                        
                        if(typeof autoResize === 'function') autoResize(promptInput);
                        if(typeof checkFormReady === 'function') checkFormReady();
                        
                        promptHistoryDropdown.classList.remove('open');
                        promptHistoryBtn.classList.remove('active');
                    });

                    item.querySelector('.copy-hist-btn').addEventListener('click', (e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(text).then(() => {
                            if(typeof showNotification === 'function') showNotification(currentLang == "tr" ? "Prompt kopyalandı!" : "Prompt copied to clipboard!", "success");
                        });
                    });

                    historyListContainer.appendChild(item);
                });
            }

            promptHistoryBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                renderPromptHistory();
                promptHistoryDropdown.classList.toggle('open');
                promptHistoryBtn.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (!promptHistoryDropdown.contains(e.target) && e.target !== promptHistoryBtn && !promptHistoryBtn.contains(e.target)) {
                    promptHistoryDropdown.classList.remove('open');
                    promptHistoryBtn.classList.remove('active');
                }
            });

            const historyClearModal = document.getElementById('history-clear-modal');
            const btnHistoryCancel = document.getElementById('btn-history-cancel');
            const btnHistoryConfirm = document.getElementById('btn-history-confirm');

            clearHistoryBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if(typeof playDeleteAllWarningSound === "function") playDeleteAllWarningSound();
                
                historyClearModal.classList.add('active');
                
                promptHistoryDropdown.classList.remove('open');
                promptHistoryBtn.classList.remove('active');
            });

            btnHistoryCancel.addEventListener('click', () => {
                historyClearModal.classList.remove('active');
            });

            btnHistoryConfirm.addEventListener('click', () => {
                localStorage.removeItem(HISTORY_KEY); 
                renderPromptHistory();
                
                historyClearModal.classList.remove('active'); 

                if(typeof playSuccessSound === "function") playSuccessSound();
                if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Prompt geçmişi temizlendi." : "Prompt history cleared successfully.", "success");
            });

            historyClearModal.addEventListener('click', (e) => {
                if (e.target === historyClearModal) {
                    historyClearModal.classList.remove('active');
                }
            });

            const genBtnRef = document.getElementById('generate-btn');
            if(genBtnRef) {
                genBtnRef.addEventListener('click', () => {
                    const pText = document.getElementById('prompt').value.trim();
                    savePromptToHistory(pText);
                });
            }

            document.querySelectorAll('textarea, .search-input, #api-key').forEach(element => {
                ['click', 'focus'].forEach(evtType => {
                    element.addEventListener(evtType, (e) => {
                        e.stopPropagation(); 
                    });
                });
            });