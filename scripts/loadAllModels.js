const btnShowAllModels = document.getElementById('btn-show-all-models');
const modelFilterContainer = document.getElementById('model-filters');
const filterChips = document.querySelectorAll('.filter-chip');
const modelSpecs = {
    "8gg12 61812 6628 19729 6b4a5 5060": {
        usedTechniques: ["Photorealism", "General", "Movie"],
    },
    "551ks 8g6g8 16gga 1h8h8 6b4a5 5060": {
        usedTechniques: ["General", "Movie"]
    },
    "77h621 yy5271 gga166 hhau22 882hha 1a 3090": {
        usedTechniques: ["General"]
    },
    "754019 b5df2e e606f1 a7600b 96b0c8 94": {
        usedTechniques: ["Photorealism"]
    },
    "5g72h1 y661hp k771ns 33bb21 77bagl 6b 3090": {
        usedTechniques: ["Anime"]
    },
    "6781x 66189 00m162 16g61 00y71 6000": {
        usedTechniques: ["Anime"]
    },
    "4c3e77 uy8g8 16gga 54h8h 999a5 5060": {
        usedTechniques: ["Anime"]
    },
    "771ks 71g6g8 hlh8h8 6b4a5 77b4a5 5060": {
        usedTechniques: ["Anime", "Movie"]
    },
    "911ks fdg6g8 66h8h8 900a5 zxb4a5 9000": {
        usedTechniques: ["NSFW"]
    }
};

function filterModelsByTag(tag) {
    const cards = document.querySelectorAll('.model-card');
    const isPerfMode = document.body.classList.contains('performance-mode');
    
    let visibleIndex = 0;

    cards.forEach(card => {
        const id = card.dataset.modelId;
        let isVisible = false;

        if (tag === 'all') {
            isVisible = true;
        } else {
            const specs = modelSpecs[id];
            if (specs && specs.usedTechniques && specs.usedTechniques.includes(tag)) {
                isVisible = true;
            }
        }
        card.classList.remove('animate-filter-in');
        card.style.animationDelay = '0s';
        if (isVisible) {
            card.style.display = 'flex';

            if (isPerfMode) {
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.style.animation = 'none';
            } else {
                card.style.opacity = '0'; 
                void card.offsetWidth;
                
                const delay = visibleIndex * 50; 
                card.style.animationDelay = `${delay}ms`;
                card.classList.add('animate-filter-in');
            }
            visibleIndex++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0'; 
        }
    });
}

if (filterChips) {
    filterChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            filterChips.forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            
            const filterTag = e.target.dataset.filter;
            filterModelsByTag(filterTag);
            
            if(typeof playFeatureToggleSound === "function") playFeatureToggleSound(true);
        });
    });
}

if (btnShowAllModels) {
    btnShowAllModels.addEventListener('click', async (e) => {
        e.preventDefault();
        const isActive = btnShowAllModels.classList.contains('active');
        btnShowAllModels.classList.add('loading');
        
        if (isActive) {
            if (modelFilterContainer) {
                modelFilterContainer.classList.remove('visible');
                filterChips.forEach(c => c.classList.remove('active'));
                const allBtn = document.querySelector('.filter-chip[data-filter="all"]');
                if(allBtn) allBtn.classList.add('active');
                modelFilterContainer.style.contentVisibility = 'hidden !important';
            }
        } 
        
        const targetUrl = isActive 
            ? 'https://create.thena.workers.dev/models?type=base' 
            : 'https://create.thena.workers.dev/models?type=all';

        const modelSelector = document.getElementById('model-selector');
        
        try {
            const response = await fetch(targetUrl);
            if (!response.ok) throw new Error('Network response was not ok');
            
            const fetchedModels = await response.json();
            
            modelSelector.innerHTML = '';
            
            if (typeof models !== 'undefined') {
                models = fetchedModels; 
            }
            const newHtml = fetchedModels.map((model, index) => {
                let previewImage = model.examples?.portraits?.[0] || '';
                if (model.id == "754019 b5df2e e606f1 a7600b 96b0c8 94") previewImage = "https://api.apidog.com/api/v1/projects/743905/resources/369883/image-preview";
                if (model.id == "8gg12 61812 6628 19729 6b4a5 5060") previewImage = "https://api.apidog.com/api/v1/projects/743905/resources/369760/image-preview";
                if (model.id == "77h621 yy5271 gga166 hhau22 882hha 1a 3090") previewImage = "https://api.apidog.com/api/v1/projects/743905/resources/369761/image-preview";
                if (model.id == "5g72h1 y661hp k771ns 33bb21 77bagl 6b 3090") previewImage = "https://api.apidog.com/api/v1/projects/743905/resources/369762/image-preview";
                if (model.id == "551ks 8g6g8 16gga 1h8h8 6b4a5 5060") previewImage = "https://api.apidog.com/api/v1/projects/743905/resources/369763/image-preview";
                if (model.id == "6781x 66189 00m162 16g61 00y71 6000") previewImage = "https://api.apidog.com/api/v1/projects/743905/resources/370236/image-preview";

                const delay = index * 50;
                
                return `
                    <div class="model-card animate-in" 
                         data-model-id="${model.id}" 
                         data-preview="${previewImage}"
                         style="animation-delay: ${delay}ms; --bg-image: url('${previewImage}')">
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
            
            modelSelector.innerHTML = newHtml;
            const btnSpan = btnShowAllModels.querySelector('span');
            if (isActive) {
                btnShowAllModels.classList.remove('active');
                if(btnSpan) btnSpan.innerText = currentLang == "tr" ? "Tümü" : "All";
                if(typeof playSuccessSound === "function") playSuccessSound();
                if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Varsayılan modellere dönüldü." : "Reverted to base models.", "info");
            } else {
                btnShowAllModels.classList.add('active');
                if(btnSpan) btnSpan.innerText = currentLang == "tr" ? "Normal" : "Base";
                if(typeof playSuccessSound === "function") playSuccessSound();
                if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Tüm modeller yüklendi!" : "All models loaded!", "success");
                
                if (modelFilterContainer) {
                    modelFilterContainer.classList.add('visible');
                    modelFilterContainer.style.contentVisibility = 'visible !important';
                }
            }

            document.querySelectorAll('.model-card').forEach(card => {
                const previewImage = card.dataset.preview;
                if (previewImage) card.style.filter = 'saturate(0.3)';
                const infoBtn = card.querySelector('.model-info-icon-wrapper');
                infoBtn.addEventListener('click', (ev) => {
                    ev.stopPropagation();
                    const featModal = document.getElementById('feature-info-modal');
                    const featModalTitle = document.getElementById('feat-modal-title');
                    const featModalDesc = document.getElementById('feat-modal-desc');
                    const metricIntel = document.getElementById('metric-intelligence');
                    const metricQual = document.getElementById('metric-quality');
                    const metricSpeed = document.getElementById('metric-speed');
                    
                    const modelId = card.dataset.modelId;
                    const modelName = card.querySelector('.model-name').innerText;
                    
                    const currentModelData = fetchedModels.find(m => m.id === modelId);
                    
                    let desc = currentModelData ? currentModelData.description : "No description.";
                    
                    if (typeof currentLang !== 'undefined' && currentLang === 'tr') {
                        if (typeof modelTranslationsTR !== 'undefined' && modelTranslationsTR[modelId]) {
                            desc = modelTranslationsTR[modelId];
                        } else if (desc === "No description." || !desc) {
                            desc = "Açıklama bulunamadı.";
                        }
                    }

                    featModalTitle.innerHTML = `🔮 ${modelName}`;
                    featModalDesc.textContent = desc;
                    
                    let stats = MODEL_STATS[modelId] || MODEL_STATS[cleanId] || MODEL_STATS["default"];
                        
                    metricIntel.innerHTML = createDots(stats.intel, 'intelligence');
                    metricQual.innerHTML = createDots(stats.qual, 'quality');
                    metricSpeed.innerHTML = createDots(stats.speed, 'speed');
                    
                    featModal.classList.add('active');
                });
                var modelId = card.dataset.modelId;
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

        } catch (error) {
            console.error(error);
            if(typeof playErrorSound === "function") playErrorSound();
            if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Modeller güncellenemedi." : "Failed to update models.", "error");
        } finally {
            btnShowAllModels.classList.remove('loading');
        }
    });
}