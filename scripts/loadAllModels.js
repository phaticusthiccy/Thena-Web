const btnShowAllModels = document.getElementById('btn-show-all-models');
const btnSortModels = document.getElementById('btn-sort-models');
let currentSortMode = 'default';
const sortModes = ['default', 'intel', 'qual', 'speed'];
let currentFetchedModels = [];
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
    },
    "524ks ffs6g8 091h8h 660a5 1dn55 1000": {
        usedTechniques: ["General", "NSFW"]
    },
    "176ks dd131 81927 a1165 p00183 6000": {
        usedTechniques: ["NSFW", "Photorealism"]
    },
    "3fb0b43e-ef78-44cf-82da-c3e0d6e0a5a7": {
        usedTechniques: ["Anime", "Movie"]
    },
    "7367ab 279dbf 417a8 51fe3 5050": {
        usedTechniques: ["NSFW", "Photorealism"]
    },
    "81ggz 7j661 66281 yy161 1f4f4 21143": {
        usedTechniques: ["General"]
    }
};


function sortModels(modelsToSort, criteria) {
    if (criteria === 'default') {
        return modelsToSort;
    }
    return [...modelsToSort].sort((a, b) => {
        const statsA = MODEL_STATS[a.id] || MODEL_STATS["default"];
        const statsB = MODEL_STATS[b.id] || MODEL_STATS["default"];
        return (statsB[criteria] || 0) - (statsA[criteria] || 0);
    });
}

function renderModels(modelsToRender) {
    const modelSelector = document.getElementById('model-selector');
    modelSelector.innerHTML = '';
    
    if (typeof models !== 'undefined') {
        models = modelsToRender; 
    }

    const newHtml = modelsToRender.map((model, index) => {
        let previewImage = model.examples?.portraits?.[0] || '';
        const delay = index * 50;
        const isHot = typeof HOT_MODELS !== 'undefined' && HOT_MODELS.includes(model.id);
        
        return `
            <div class="model-card animate-in ${isHot ? 'hot-model' : ''}" 
                 data-model-id="${model.id}" 
                 data-preview="${previewImage}"
                 style="animation-delay: ${delay}ms; --bg-image: url('${previewImage}')">
                 ${isHot ? WHIMSICAL_FLAME_SVG : ''}
                <div class="model-info-icon-wrapper" title="Model Details">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                </div>
                ${isHot ? `<div class="flag-item bg-exclusive"><svg class="flag-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 8c-.83 0-1.5-.67-1.5-1.5S4.67 5 5.5 5 7 5.67 7 6.5 6.33 8 5.5 8z"/></svg><span class="flag-text line-one">${translations[currentLang].exclusiveLabel}</span></div>` : ''}
                <div class="model-name">${model.model}</div>
            </div>
        `;
    }).join('');
    
    modelSelector.innerHTML = newHtml;

    document.querySelectorAll('.model-card').forEach(card => {
        const modelId = card.dataset.modelId;
        if (typeof selectedModel !== 'undefined' && selectedModel === modelId) {
            card.classList.remove('animate-in', 'animate-filter-in');
            card.classList.add('active');
            if (typeof createConfetti === 'function') createConfetti(card);
        }
        const previewImage = card.dataset.preview;
        if (previewImage) card.style.filter = 'saturate(0.3)';
    });
}

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

window.updateModelSortLanguage = function() {
    const btnText = btnSortModels?.querySelector('span');
    if (btnText && btnSortModels) {
        if (translations[currentLang]) {
            const t = translations[currentLang];
            const labels = {
                'default': t.sortDefault,
                'intel': t.sortIntel,
                'qual': t.sortQual,
                'speed': t.sortSpeed
            };
            btnText.innerText = labels[currentSortMode];
        }
    }
};

if (btnSortModels) {
    btnSortModels.addEventListener('click', (e) => {
        e.preventDefault();
        
        const currentIndex = sortModes.indexOf(currentSortMode);
        const nextIndex = (currentIndex + 1) % sortModes.length;
        currentSortMode = sortModes[nextIndex];
        
        window.updateModelSortLanguage();
        
        if (currentFetchedModels.length > 0) {
            const sorted = sortModels(currentFetchedModels, currentSortMode);
            renderModels(sorted);
            if(typeof playFeatureToggleSound === "function") playFeatureToggleSound(true);
        }
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
            currentFetchedModels = fetchedModels;
            renderModels(fetchedModels);
            
            if (btnSortModels) btnSortModels.style.display = isActive ? 'none' : 'flex';
            
            const btnSpan = btnShowAllModels.querySelector('span');
            if (isActive) {
                btnShowAllModels.classList.remove('active');
                if(btnSpan) btnSpan.innerText = currentLang == "tr" ? "Tüm Modelleri Göster" : "Show All Models";
                if(typeof playSuccessSound === "function") playSuccessSound();
                if(typeof showNotification === "function") showNotification(currentLang == "tr" ? translations.tr.msgBaseModelsLoaded : translations.en.msgBaseModelsLoaded, "info");
                if (btnSortModels) btnSortModels.style.display = 'none';
                currentSortMode = 'default';
                const sortBtnText = btnSortModels?.querySelector('span');
                if(sortBtnText) sortBtnText.innerText = currentLang == 'tr' ? 'Varsayılan' : 'Default';
            } else {
                btnShowAllModels.classList.add('active');
                if(btnSpan) btnSpan.innerText = currentLang == "tr" ? "Sadece Temel Modeller" : "Base Models Only";
                if(typeof playSuccessSound === "function") playSuccessSound();
                if(typeof showNotification === "function") showNotification(currentLang == "tr" ? translations.tr.msgAllModelsLoaded : translations.en.msgAllModelsLoaded, "success");
                
                if (modelFilterContainer) {
                    modelFilterContainer.classList.add('visible');
                    modelFilterContainer.style.contentVisibility = 'visible !important';
                }
            }



        } catch (error) {
            console.error(error);
            if(typeof playErrorSound === "function") playErrorSound();
            if(typeof showNotification === "function") showNotification(currentLang == "tr" ? translations.tr.msgModelUpdateErr : translations.en.msgModelUpdateErr, "error");
        } finally {
            btnShowAllModels.classList.remove('loading');
        }
    });
}

const btnToggleModelLayout = document.getElementById('btn-toggle-model-layout');
const layoutModes = ['grid', 'compact', 'list'];
let modelLayoutMode = localStorage.getItem('modelLayoutMode') || 'grid';

function applyModelLayout(mode) {
    const modelSelector = document.getElementById('model-selector');
    if (!modelSelector) return;
    
    const gridIcon = btnToggleModelLayout?.querySelector('.layout-icon-grid');
    const compactIcon = btnToggleModelLayout?.querySelector('.layout-icon-compact');
    const listIcon = btnToggleModelLayout?.querySelector('.layout-icon-list');
    
    modelSelector.classList.remove('list-view', 'compact-view');
    
    if (gridIcon) gridIcon.style.display = 'none';
    if (compactIcon) compactIcon.style.display = 'none';
    if (listIcon) listIcon.style.display = 'none';
    
    if (mode === 'compact') {
        modelSelector.classList.add('compact-view');
        if (compactIcon) compactIcon.style.display = 'block';
    } else if (mode === 'list') {
        modelSelector.classList.add('list-view');
        if (listIcon) listIcon.style.display = 'block';
    } else {
        if (gridIcon) gridIcon.style.display = 'block';
    }
    
    localStorage.setItem('modelLayoutMode', mode);
    modelLayoutMode = mode;
}

applyModelLayout(modelLayoutMode);

if (btnToggleModelLayout) {
    btnToggleModelLayout.addEventListener('click', (e) => {
        e.preventDefault();
        const currentIndex = layoutModes.indexOf(modelLayoutMode);
        const nextIndex = (currentIndex + 1) % layoutModes.length;
        applyModelLayout(layoutModes[nextIndex]);
        if (typeof playFeatureToggleSound === "function") playFeatureToggleSound(true);
    });
}

const btnToggleChatLayout = document.getElementById('btn-toggle-chat-layout');
const chatLayoutModes = ['grid', 'compact', 'list'];
let chatLayoutMode = localStorage.getItem('chatLayoutMode') || 'grid';

function applyChatLayout(mode) {
    const charGrid = document.getElementById('characters-grid');
    if (!charGrid) return;
    
    const gridIcon = btnToggleChatLayout?.querySelector('.chat-layout-icon-grid');
    const compactIcon = btnToggleChatLayout?.querySelector('.chat-layout-icon-compact');
    const listIcon = btnToggleChatLayout?.querySelector('.chat-layout-icon-list');
    
    charGrid.classList.remove('list-view', 'compact-view');
    
    if (gridIcon) gridIcon.style.display = 'none';
    if (compactIcon) compactIcon.style.display = 'none';
    if (listIcon) listIcon.style.display = 'none';
    
    if (mode === 'compact') {
        charGrid.classList.add('compact-view');
        if (compactIcon) compactIcon.style.display = 'block';
    } else if (mode === 'list') {
        charGrid.classList.add('list-view');
        if (listIcon) listIcon.style.display = 'block';
    } else {
        if (gridIcon) gridIcon.style.display = 'block';
    }
    
    localStorage.setItem('chatLayoutMode', mode);
    chatLayoutMode = mode;
}

applyChatLayout(chatLayoutMode);

if (btnToggleChatLayout) {
    btnToggleChatLayout.addEventListener('click', (e) => {
        e.preventDefault();
        const currentIndex = chatLayoutModes.indexOf(chatLayoutMode);
        const nextIndex = (currentIndex + 1) % chatLayoutModes.length;
        applyChatLayout(chatLayoutModes[nextIndex]);
        if (typeof playFeatureToggleSound === "function") playFeatureToggleSound(true);
    });
}