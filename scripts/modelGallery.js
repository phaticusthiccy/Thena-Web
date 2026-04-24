(function () {
    'use strict';

    const btnOpen           = document.getElementById('btn-open-model-gallery');
    const galleryModal      = document.getElementById('model-gallery-modal');
    const closeBtnGallery   = document.getElementById('close-model-gallery');
    const searchInput       = document.getElementById('mg-search-input');
    const sortSelect        = document.getElementById('mg-sort-select');
    const catSelect         = document.getElementById('mg-cat-select');
    const grid              = document.getElementById('mg-grid');

    const detailPanel       = document.getElementById('model-detail-panel');
    const closeBtnDetail    = document.getElementById('close-model-detail');
    const detailImg         = document.getElementById('mg-detail-img');
    const prevBtn           = document.getElementById('mg-detail-prev');
    const nextBtn           = document.getElementById('mg-detail-next');
    const detailBadge       = document.getElementById('mg-detail-badge');
    const detailName        = document.getElementById('mg-detail-name');
    const detailDesc        = document.getElementById('mg-detail-description');
    const detailCategory    = document.getElementById('mg-detail-category');
    const detailProvider    = document.getElementById('mg-detail-provider');
    const detailCost        = document.getElementById('mg-detail-cost');
    const detailType        = document.getElementById('mg-detail-type');
    const showMoreStatsBtn  = document.getElementById('mg-show-more-stats');
    const selectModelBtn    = document.getElementById('mg-detail-select-btn');

    const requestModelBtn   = document.getElementById('btn-request-new-model');
    const requestModal      = document.getElementById('request-model-modal');
    const closeBtnRequest   = document.getElementById('close-request-model');
    const requestForm       = document.getElementById('request-model-form');
    const reqName           = document.getElementById('req-name');
    const reqMail           = document.getElementById('req-mail');
    const reqTelegram       = document.getElementById('req-telegram');
    const reqText           = document.getElementById('req-text');
    const submitBtn         = document.getElementById('btn-submit-request');
    const cancelBtn         = document.getElementById('btn-cancel-request');

    let allModels   = [];
    let currentModel = null;
    let currentImgIdx = 0;
    let showcaseImgs = [];
    let galleryModelPrices = {};
    let galleryModelUsages = {};
    let cachedModelETAs = null;

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const modelKeyMapping = {
        "Thena Ultra": "thenaUltra",
        "Thena Pro": "thenaPro",
        "Thena Movie": "thenaMovie",
        "Thena V7": "thenaV7",
        "Thena V6": "thenaV6",
        "Thena Max": "thenaMax",
        "Thena Anime Core": "thenaAnimeCore",
        "Thena Anime Fast": "thenaAnimeFast",
        "Thena Photoreal": "thenaPhotoreal",
        "Thena MiniWa": "thenaMiniWa",
        "Thena Radiant": "thenaRadiant",
        "Thena Bloomlight": "thenaBloomlight",
        "Thena Portraits": "thenaPortraits",
        "Thena Florence": "thenaFlorence",
        "Thena Alchemy": "thenaAlchemy",
        "Thena Nyx": "thenaNyx",
        "Thena Photoreal V2": "thenaPhotorealV2",
        "Thena Rewave": "thenaRewave",
        "Thena Pastel": "thenaPastel",
        "Thena Noir": "thenaNoir",
        "Thena Pixel": "thenaPixel",
        "Image Editor": "imageEditor",
        "Thena Toonish": "thenaToonish"
    };

    async function fetchModels() {
        if (allModels.length > 0) return;
        
        if (Object.keys(galleryModelPrices).length === 0) {
            await fetch('https://create.thena.workers.dev/modelPrices')
                .then(r => r.json())
                .then(data => galleryModelPrices = data)
                .catch(e => console.error('Error fetching prices', e));
        }
        grid.innerHTML = '<div class="mg-loading-spinner"><div class="spinner"></div></div>';
        try {
            const res = await fetch('https://create.thena.workers.dev/models?type=all');
            if (!res.ok) throw new Error('Network error');
            allModels = await res.json();
            
            if (Object.keys(galleryModelUsages).length === 0) {
                allModels.forEach(m => {
                    fetch('https://create.thena.workers.dev/modelUsage?id=' + encodeURIComponent(m.id))
                        .then(r => r.text())
                        .then(txt => { galleryModelUsages[m.id] = parseInt(txt) || 0; })
                        .catch(() => { galleryModelUsages[m.id] = 0; });
                });
            }
            
            populateCategoryFilter();
            renderModels();
        } catch (err) {
            grid.innerHTML = `
                <div class="mg-no-results" style="color:#ff6666; display:flex; flex-direction:column; align-items:center; gap:14px;">
                    <span>${getLang('mgLoadFailed', 'Failed to load models. Please try again.')}</span>
                    <button id="mg-retry-btn" style="
                        background: linear-gradient(135deg, #ff6666 0%, #cc3333 100%);
                        color: #fff;
                        border: none;
                        border-radius: 10px;
                        padding: 10px 28px;
                        font-size: 14px;
                        font-weight: 600;
                        cursor: pointer;
                        letter-spacing: 0.3px;
                        transition: opacity 0.2s, transform 0.15s;
                    "
                    onmouseover="this.style.opacity='0.85';this.style.transform='scale(1.04)'"
                    onmouseout="this.style.opacity='1';this.style.transform='scale(1)'"
                    >${getLang('mgRetry', 'Try Again')}</button>
                </div>`;
            document.getElementById('mg-retry-btn')?.addEventListener('click', () => {
                allModels = [];
                fetchModels();
            });
        }
    }

    function populateCategoryFilter() {
        catSelect.innerHTML = `<option value="all" id="mg-opt-all-cats">${getLang('mgCatAll', 'All')}</option>`;
        
        let catsSet = new Set();
        allModels.forEach(m => {
            if (typeof modelSpecs !== 'undefined' && modelSpecs[m.id] && modelSpecs[m.id].usedTechniques) {
                modelSpecs[m.id].usedTechniques.forEach(t => catsSet.add(t));
            } else if (m.category) {
                catsSet.add(m.category);
            }
        });
        
        const cats = [...catsSet];
        cats.sort().forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            catSelect.appendChild(opt);
        });
    }

    function getFilteredModels() {
        const q = searchInput.value.trim().toLowerCase();
        const cat = catSelect.value;
        let list = allModels.filter(m => {
            const matchQ = !q || (m.model || '').toLowerCase().includes(q) ||
                           (m.description || '').toLowerCase().includes(q) ||
                           (m.provider || '').toLowerCase().includes(q);
                           
            let itemCats = [];
            if (typeof modelSpecs !== 'undefined' && modelSpecs[m.id] && modelSpecs[m.id].usedTechniques) {
                itemCats = modelSpecs[m.id].usedTechniques;
            } else if (m.category) {
                itemCats = [m.category];
            }
            
            const matchCat = cat === 'all' || itemCats.includes(cat);
            return matchQ && matchCat;
        });

        function getPriceForModel(m) {
            const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
            const propKey = modelKeyMapping[m.model || ''];
            if (propKey && galleryModelPrices[propKey]) return galleryModelPrices[propKey][lang] || 0;
            if (galleryModelPrices[m.model]) return galleryModelPrices[m.model][lang] || 0;
            return 0;
        }

        const sort = sortSelect.value;
        if (sort === 'name-asc')  list = list.sort((a,b) => (a.model||'').localeCompare(b.model||''));
        if (sort === 'name-desc') list = list.sort((a,b) => (b.model||'').localeCompare(a.model||''));
        if (sort === 'price-asc') list = list.sort((a,b) => getPriceForModel(a) - getPriceForModel(b));
        if (sort === 'price-desc') list = list.sort((a,b) => getPriceForModel(b) - getPriceForModel(a));
        if (sort === 'usage-asc') list = list.sort((a,b) => (galleryModelUsages[a.id] || 0) - (galleryModelUsages[b.id] || 0));
        if (sort === 'usage-desc') list = list.sort((a,b) => (galleryModelUsages[b.id] || 0) - (galleryModelUsages[a.id] || 0));
        return list;
    }

    function renderModels() {
        const list = getFilteredModels();
        if (!list.length) {
            grid.innerHTML = `<div class="mg-no-results">${getLang('mgNoResults', 'No models found.')}</div>`;
            return;
        }
        grid.innerHTML = list.map((m, i) => {
            let thumb = m.examples?.portraits?.[0] || '';
            let desc = m.description || '';
            const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
            if (lang === 'tr' && typeof modelTranslationsTR !== 'undefined' && modelTranslationsTR[m.id]) {
                desc = modelTranslationsTR[m.id];
            }

            return `
            <div class="mg-card" data-index="${i}" data-id="${m.id}" style="animation-delay:${Math.min(i * 30, 600)}ms" role="button" tabindex="0" aria-label="${m.model}">
                ${thumb ? `<img class="mg-card-thumb" src="${thumb}" alt="${m.model}" loading="lazy">` : `<div class="mg-card-thumb" style="height:175px;display:flex;align-items:center;justify-content:center;color:#333;font-size:28px;">🖼</div>`}
                <div class="mg-card-body">
                    <div class="mg-card-name">${m.model || 'Unknown'}</div>
                    <div class="mg-card-desc">${desc}</div>
                    <div class="mg-card-provider">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        ${m.provider || 'Thena'}
                    </div>
                </div>
            </div>`;
        }).join('');

        if (!grid.dataset.listenerAttached) {
            grid.addEventListener('click', e => {
                const card = e.target.closest('.mg-card');
                if (card) {
                    const id = card.dataset.id;
                    const model = allModels.find(m => m.id === id);
                    if (model) openDetail(model);
                }
            });
            grid.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const card = e.target.closest('.mg-card');
                    if (card) {
                        const id = card.dataset.id;
                        const model = allModels.find(m => m.id === id);
                        if (model) openDetail(model);
                    }
                }
            });
            grid.dataset.listenerAttached = 'true';
        }
    }

    function openDetail(model) {
        currentModel = model;
        showcaseImgs = model.examples?.showcase || [];
        if (showcaseImgs.length === 0) {
            const defaultImg = model.examples?.portraits?.[0] || '';
            if (defaultImg) showcaseImgs = [defaultImg];
        }
        currentImgIdx = 0;
        
        detailImg.src = showcaseImgs[0] || '';
        detailImg.alt = model.model || 'Model Image';
        detailImg.style.display = showcaseImgs.length > 0 ? 'block' : 'none';
        
        updateNavBtns();
        
        detailBadge.textContent = getLang('mgModels', 'Model Gallery');
        detailName.textContent = model.model || '';
        const modelIdSpan = document.getElementById('mg-detail-model-id');
        if (modelIdSpan) modelIdSpan.textContent = model.id || '';
        let desc = model.description || '';
        let lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
        if (lang === 'tr' && typeof modelTranslationsTR !== 'undefined' && modelTranslationsTR[model.id]) {
            desc = modelTranslationsTR[model.id];
        }
        detailDesc.textContent = desc;

        let catText = model.category || '—';
        if (typeof modelSpecs !== 'undefined' && modelSpecs[model.id] && modelSpecs[model.id].usedTechniques) {
            catText = modelSpecs[model.id].usedTechniques.join(', ');
        }
        detailCategory.textContent = catText;
        detailProvider.textContent = model.provider || 'Thena';
        
        let costDisplay = '—';
        let imgsPerUnit = '—';
        let costVal = 0;
        if (Object.keys(galleryModelPrices).length > 0) {
            const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
            const mName = model.model || '';
            const propKey = modelKeyMapping[mName];
            
            if (propKey && galleryModelPrices[propKey]) {
                costVal = galleryModelPrices[propKey][lang] || 0;
            } else if (galleryModelPrices[mName]) {
                costVal = galleryModelPrices[mName][lang] || 0;
            }
            if (costVal > 0) {
                costDisplay = costVal.toFixed(3) + (lang === 'tr' ? ' ₺' : ' $');
                imgsPerUnit = Math.floor(1 / costVal);
            }
        }
        detailCost.textContent = costDisplay;
        
        detailType.textContent = model.type == "base" ? getLang('mgTypeBase', 'Base Model') : getLang('mgBadge', 'Finetuned Model') || '—';

        document.getElementById('mg-lbl-description').textContent = getLang('mgLblDescription', 'Description');
        document.getElementById('mg-lbl-category').textContent    = getLang('mgLblCategory', 'Category');
        document.getElementById('mg-lbl-provider').textContent    = getLang('mgLblProvider', 'Provider');
        document.getElementById('mg-lbl-cost').textContent        = getLang('mgLblCost', 'Cost / Image');
        document.getElementById('mg-lbl-type').textContent        = getLang('mgLblType', 'Type');
        document.getElementById('mg-select-btn-text').textContent = getLang('mgSelectBtn', 'Generate with this Model');

        const makeDots = (val) => {
            let html = '';
            for(let i=1; i<=5; i++) {
                 html += `<svg class="rating-icon ${i <= val ? 'filled' : ''}" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`;
            }
            return html;
        };
        
        const statsCard = document.getElementById('mg-detail-stats-card');
        if (statsCard) {
            statsCard.innerHTML = `<div class="mg-loading-spinner" style="padding: 10px;"><div class="spinner"></div></div>`;
            
            async function renderStatsCard() {
                let usages = '—';
                try {
                    const uRes = await fetch('https://create.thena.workers.dev/modelUsage?id=' + encodeURIComponent(model.id));
                    if (uRes.ok) usages = await uRes.text();
                } catch (e) {}
                
                const statsObj = (typeof MODEL_STATS !== 'undefined' && MODEL_STATS[model.id]) ? MODEL_STATS[model.id] : {intel:3, qual:3, speed:3};
                
                const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
                const lblIntel = getLang('lblIntel', 'Intelligence');
                const lblQual = getLang('lblQual', 'Quality');
                const lblSpeed = getLang('lblSpeed', 'Speed');
                const lblUsage = getLang('mgLblTotalUsage', lang === 'tr' ? 'Toplam Üretim' : 'Total Generated');
                const lblPerUnit = getLang('mgLblPerUnit', lang === 'tr' ? '1 ₺ ile Üretim' : 'Images per $1');
                
                statsCard.innerHTML = `
                    <div class="metric-row"><span>${lblIntel}</span><div class="metric-dots">${makeDots(statsObj.intel||3)}</div></div>
                    <div class="metric-row"><span>${lblQual}</span><div class="metric-dots">${makeDots(statsObj.qual||3)}</div></div>
                    <div class="metric-row"><span>${lblSpeed}</span><div class="metric-dots">${makeDots(statsObj.speed||3)}</div></div>
                    <div class="metric-row" style="margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 14px;">
                        <span>${lblUsage}</span><span style="color:#fff; font-weight:600;">${usages}</span>
                    </div>
                    <div class="metric-row" style="margin-bottom: 0;">
                        <span>${lblPerUnit}</span><span style="color:#fff; font-weight:600;">${imgsPerUnit}</span>
                    </div>
                `;
            }
            renderStatsCard();
        }

        if (showMoreStatsBtn) {
            showMoreStatsBtn.style.display = 'block';
            showMoreStatsBtn.textContent = getLang('mgShowMoreStats', 'Show more');
        }

        try {
            const url = new URL(window.location);
            url.searchParams.set('model', model.id);
            window.history.replaceState({}, '', url);
        } catch(e) {}

        detailPanel.classList.add('active');
    }

    function closeDetail() {
        detailPanel.classList.remove('active');
        try {
            const url = new URL(window.location);
            url.searchParams.delete('model');
            url.searchParams.set('gallery', 'true');
            window.history.replaceState({}, '', url);
        } catch(e) {}
    }

    function updateNavBtns() {
        if (showcaseImgs.length > 1) {
            prevBtn.classList.add('visible');
            nextBtn.classList.add('visible');
            prevBtn.title = getLang('mgPrevImg', 'Previous Image');
            nextBtn.title = getLang('mgNextImg', 'Next Image');
            prevBtn.setAttribute('aria-label', prevBtn.title);
            nextBtn.setAttribute('aria-label', nextBtn.title);
        } else {
            prevBtn.classList.remove('visible');
            nextBtn.classList.remove('visible');
        }
    }

    function navigateImg(dir) {
        if (showcaseImgs.length <= 1) return;

        const loader = document.getElementById('mg-img-loader');

        detailImg.style.opacity = '0';
        if (loader) loader.classList.add('visible');

        setTimeout(() => {
            currentImgIdx = (currentImgIdx + dir + showcaseImgs.length) % showcaseImgs.length;

            const onLoaded = () => {
                detailImg.style.opacity = '1';
                if (loader) loader.classList.remove('visible');
                detailImg.removeEventListener('load',  onLoaded);
                detailImg.removeEventListener('error', onError);
            };
            const onError = () => {
                detailImg.style.opacity = '1';
                if (loader) loader.classList.remove('visible');
                detailImg.removeEventListener('load',  onLoaded);
                detailImg.removeEventListener('error', onError);
            };

            detailImg.addEventListener('load',  onLoaded);
            detailImg.addEventListener('error', onError);
            detailImg.src = showcaseImgs[currentImgIdx];
        }, 150);
    }

    prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); navigateImg(-1); });
    nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); navigateImg(1); });

    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    const imgCol = document.querySelector('.mg-detail-image-col');
    imgCol?.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    imgCol?.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) < swipeThreshold) return;
        
        if (diff > 0) navigateImg(-1);
        else navigateImg(1);         
    }

    closeBtnDetail?.addEventListener('click', closeDetail);
    detailPanel?.addEventListener('click', (e) => { if (e.target === detailPanel) closeDetail(); });

    const fullscreenBtn = document.getElementById('mg-fullscreen-btn');
    const lightbox = document.getElementById('mg-lightbox');
    const lightboxImg = document.getElementById('mg-lightbox-img');
    const lightboxClose = document.getElementById('mg-lightbox-close');

    function openLightbox() {
        if (!showcaseImgs || showcaseImgs.length === 0) return;
        lightboxImg.src = showcaseImgs[currentImgIdx];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.add('closing');
        setTimeout(() => {
            lightbox.classList.remove('active');
            lightbox.classList.remove('closing');
            document.body.style.overflow = '';
        }, 210);
    }

    fullscreenBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox();
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', (e) => {
        if (e.target.classList.contains('mg-lightbox-backdrop') || e.target === lightbox) {
            closeLightbox();
        }
    });

    function syncLightbox() {
        if (lightbox?.classList.contains('active')) {
            lightboxImg.src = showcaseImgs[currentImgIdx];
        }
    }
    const originalNavigateImg = navigateImg;
    navigateImg = function(dir) {
        originalNavigateImg(dir);
        setTimeout(syncLightbox, 150);
    };

    selectModelBtn?.addEventListener('click', async () => {
        if (!currentModel) return;
        
        if (typeof window.ensureAllModelsVisible === 'function') {
            await window.ensureAllModelsVisible();
        } else {
            if (!document.getElementById("btn-show-all-models").classList.contains('active')) {
                document.getElementById("btn-show-all-models").click()
            } else {
                document.querySelector("#txt-filter-chip-all").click()
            }
        }
        const cards = document.querySelectorAll('#model-selector .model-card');
        let found = false;
        cards.forEach(card => {
            card.classList.remove('active');
            if (card.dataset.modelId === currentModel.id) {
                card.classList.remove('animate-in', 'animate-filter-in');
                card.classList.add('active');
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                found = true;
                if (typeof selectedModel !== 'undefined') selectedModel = currentModel.id;
                if (typeof localStorage !== 'undefined') localStorage.setItem('selectedModel', currentModel.id);
                if (typeof createConfetti === 'function') createConfetti(card);
            }
        });
        if (!found && typeof selectedModel !== 'undefined') {
            selectedModel = currentModel.id;
            if (typeof localStorage !== 'undefined') localStorage.setItem('selectedModel', currentModel.id);
        }

        if (typeof playSuccessSound === 'function') playSuccessSound();
        if (typeof showNotification === 'function') {
            showNotification(
                (getLang('mgModelSelected', 'Model selected') + ': ' + currentModel.model),
                'success'
            );
        }
        try {
            const url = new URL(window.location);
            url.searchParams.delete('model');
            url.searchParams.delete('gallery');
            window.history.replaceState({}, '', url);
        } catch(e) {}
        detailPanel.classList.remove('active');
        galleryModal.classList.remove('active');
    });

    showMoreStatsBtn?.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (showMoreStatsBtn.textContent === getLang('mgShowMoreLoading', 'Loading...')) return;
        
        showMoreStatsBtn.textContent = getLang('mgShowMoreLoading', 'Loading...');

        try {
            if (!cachedModelETAs) {
                const res = await fetch('https://create.thena.workers.dev/modelETAs');
                if (res.ok) cachedModelETAs = await res.json();
                else cachedModelETAs = {};
            }
        } catch (err) {
            cachedModelETAs = {};
        }
        
        let loadTime = '-';
        let genTime = '-';

        if (currentModel && currentModel.model) {
            const mData = cachedModelETAs[currentModel.model];
            if (mData) {
                if (mData.modelLoadingTime !== undefined) loadTime = mData.modelLoadingTime + 's';
                if (mData.imageGenerationTime !== undefined) genTime = mData.imageGenerationTime + 's';
            }
        }

        const statsCard = document.getElementById('mg-detail-stats-card');
        if (statsCard) {
            const lblLoad = getLang('mgModelLoadTime', 'Model Loading Time');
            const lblGen = getLang('mgGenTime', 'Avg. Generation Time');

            const div = document.createElement('div');
            div.innerHTML = `
                <div class="metric-row" style="margin-top: 10px; border-top: 1px dashed rgba(255,255,255,0.06); padding-top: 14px; margin-bottom: 0;">
                    <span>${lblLoad}</span><span style="color:#fff; font-weight:600;">${loadTime}</span>
                </div>
                <div class="metric-row" style="margin-bottom: 0;">
                    <span>${lblGen}</span><span style="color:#fff; font-weight:600;">${genTime}</span>
                </div>
            `;
            statsCard.appendChild(div);
        }

        showMoreStatsBtn.style.display = 'none';
        showMoreStatsBtn.textContent = getLang('mgShowMoreStats', 'Show more');
    });

    const copyIdBtn = document.getElementById('btn-copy-model-id');
    copyIdBtn?.addEventListener('click', () => {
        const idSpan = document.getElementById('mg-detail-model-id');
        if (!idSpan || !idSpan.textContent) return;
        navigator.clipboard.writeText(idSpan.textContent).then(() => {
            const originalHTML = copyIdBtn.innerHTML;
            copyIdBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => { copyIdBtn.innerHTML = originalHTML; }, 1500);
        });
    });

    function openGallery() {
        try {
            const url = new URL(window.location);
            if (!url.searchParams.has('model') && !url.searchParams.has('m')) {
                url.searchParams.set('gallery', 'true');
                window.history.replaceState({}, '', url);
            }
        } catch(e) {}
        updateGalleryLanguage();
        galleryModal.classList.add('active');
        fetchModels();
        if (typeof playFeatureToggleSound === 'function') playFeatureToggleSound(true);
    }
    function closeGallery() {
        galleryModal.classList.remove('active');
        try {
            const url = new URL(window.location);
            url.searchParams.delete('gallery');
            window.history.replaceState({}, '', url);
        } catch(e) {}
    }

    btnOpen?.addEventListener('click', (e) => { e.preventDefault(); openGallery(); });
    closeBtnGallery?.addEventListener('click', closeGallery);
    galleryModal?.addEventListener('click', (e) => { if (e.target === galleryModal) closeGallery(); });

    const debouncedRender = debounce(renderModels, 250);
    searchInput?.addEventListener('input', debouncedRender);
    sortSelect?.addEventListener('change', renderModels);
    catSelect?.addEventListener('change', renderModels);

    function openRequestModal() {
        requestForm?.reset();
        clearInvalid();
        updateRequestLanguage();
        requestModal.classList.add('active');
    }
    function closeRequestModal() {
        requestModal.classList.remove('active');
    }

    requestModelBtn?.addEventListener('click', openRequestModal);
    closeBtnRequest?.addEventListener('click', closeRequestModal);
    cancelBtn?.addEventListener('click', closeRequestModal);
    requestModal?.addEventListener('click', (e) => { if (e.target === requestModal) closeRequestModal(); });

    function clearInvalid() {
        [reqName, reqMail, reqTelegram, reqText].forEach(el => el?.classList.remove('invalid'));
    }

    requestForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearInvalid();

        let valid = true;
        if (!reqName.value.trim()) { reqName.classList.add('invalid'); valid = false; }
        if (!reqMail.value.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(reqMail.value.trim())) {
            reqMail.classList.add('invalid'); valid = false;
        }
        if (!reqText.value.trim()) { reqText.classList.add('invalid'); valid = false; }
        if (!valid) return;

        submitBtn.disabled = true;
        const originalText = document.getElementById('mg-submit-text').textContent;
        document.getElementById('mg-submit-text').textContent = getLang('mgSending', 'Sending...');

        try {
            const body = {
                name: reqName.value.trim(),
                mail: reqMail.value.trim(),
                telegram: reqTelegram?.value.trim() || '',
                requestText: reqText.value.trim()
            };
            const res = await fetch('https://create.thena.workers.dev/sendModelRequest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (!res.ok) {
                if (typeof showNotification === 'function') showNotification(getLang('mgRequestFail', 'Failed to send request. Please try again.'), 'error');
                if (typeof playErrorSound === 'function') playErrorSound();
            } else {
                if (typeof showNotification === 'function')
                    showNotification(getLang('mgRequestSent', 'Request sent successfully!'), 'success');
                if (typeof playSuccessSound === 'function') playSuccessSound();
                closeRequestModal();
            }
        } catch (err) {
            if (typeof showNotification === 'function')
                showNotification(getLang('mgRequestFail', 'Failed to send request. Please try again.'), 'error');
            if (typeof playErrorSound === 'function') playErrorSound();
        } finally {
            submitBtn.disabled = false;
            document.getElementById('mg-submit-text').textContent = originalText;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (requestModal?.classList.contains('active'))    { closeRequestModal(); return; }
        if (detailPanel?.classList.contains('active'))     { closeDetail(); return; }
        if (galleryModal?.classList.contains('active'))    { closeGallery(); return; }
    });

    function getLang(key, fallback) {
        try {
            const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
            return (translations[lang] && translations[lang][key]) ? translations[lang][key] : fallback;
        } catch { return fallback; }
    }

    function updateGalleryLanguage() {
        const title = document.getElementById('mg-title');
        if (title) title.textContent = getLang('mgTitle', 'Select Finetuned Model');
        const reqBtnTxt = document.getElementById('mg-request-btn-text');
        if (reqBtnTxt) reqBtnTxt.textContent = getLang('mgRequestNewModel', 'Request New Model');
        if (searchInput) searchInput.placeholder = getLang('mgSearchPlaceholder', 'Search models...');
        const sortLbl = document.getElementById('mg-sort-label');
        if (sortLbl) sortLbl.textContent = getLang('mgSortLabel', 'Sort:');
        const catLbl = document.getElementById('mg-cat-label');
        if (catLbl) catLbl.textContent = getLang('mgCatLabel', 'Category:');
        const opts = {
            'mg-opt-default':   getLang('mgOptDefault', 'Default'),
            'mg-opt-name-asc':  getLang('mgOptNameAsc', 'Name (A-Z)'),
            'mg-opt-name-desc': getLang('mgOptNameDesc', 'Name (Z-A)'),
            'mg-opt-price-asc': getLang('mgOptPriceAsc', 'Price (Low to High)'),
            'mg-opt-price-desc': getLang('mgOptPriceDesc', 'Price (High to Low)'),
            'mg-opt-usage-desc': getLang('mgOptUsageDesc', 'Most Used'),
            'mg-opt-usage-asc': getLang('mgOptUsageAsc', 'Least Used')
        };
        Object.entries(opts).forEach(([id, txt]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = txt;
        });
        const allCatsOpt = document.getElementById('mg-opt-all-cats');
        if (allCatsOpt) allCatsOpt.textContent = getLang('mgCatAll', 'All');

        const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';

        document.querySelectorAll('.mg-card').forEach(card => {
            const id = card.getAttribute('data-id');
            const descEl = card.querySelector('.mg-card-desc');
            if (id && descEl && allModels) {
                const m = allModels.find(x => x.id === id);
                if (m) {
                    let text = m.description || '';
                    if (lang === 'tr' && typeof modelTranslationsTR !== 'undefined' && modelTranslationsTR[id]) {
                        text = modelTranslationsTR[id];
                    }
                    descEl.textContent = text;
                }
            }
        });

        if (currentModel) {
            let descText = currentModel.description || '—';
            if (lang === 'tr' && typeof modelTranslationsTR !== 'undefined' && modelTranslationsTR[currentModel.id]) {
                descText = modelTranslationsTR[currentModel.id];
            }
            if (detailDesc) detailDesc.textContent = descText;
            
            if (detailBadge) detailBadge.textContent = getLang('mgModels', 'Model Gallery');
            if (detailType) detailType.textContent = currentModel.type == "base" ? getLang('mgTypeBase', 'Base Model') : (getLang('mgBadge', 'Finetuned Model') || '—');
            
            const statsCard = document.getElementById('mg-detail-stats-card');
            if (statsCard && statsCard.querySelector('.metric-row')) {
                const rows = statsCard.querySelectorAll('.metric-row');
                if (rows.length >= 5) {
                    rows[0].querySelector('span').textContent = getLang('lblIntel', 'Intelligence');
                    rows[1].querySelector('span').textContent = getLang('lblQual', 'Quality');
                    rows[2].querySelector('span').textContent = getLang('lblSpeed', 'Speed');
                    
                    const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
                    rows[3].querySelector('span').textContent = getLang('mgLblTotalUsage', lang === 'tr' ? 'Toplam Üretim' : 'Total Generated');
                    rows[4].querySelector('span').textContent = getLang('mgLblPerUnit', lang === 'tr' ? '1 ₺ ile Üretim' : 'Images per $1');
                }
            }
            
            const lblDesc = document.getElementById('mg-lbl-description');
            if (lblDesc) lblDesc.textContent = getLang('mgLblDescription', 'Description');
            
            const lblCat = document.getElementById('mg-lbl-category');
            if (lblCat) lblCat.textContent = getLang('mgLblCategory', 'Category');
            
            const lblProv = document.getElementById('mg-lbl-provider');
            if (lblProv) lblProv.textContent = getLang('mgLblProvider', 'Provider');
            
            const lblCost = document.getElementById('mg-lbl-cost');
            if (lblCost) lblCost.textContent = getLang('mgLblCost', 'Cost / Image');
            
            const lblType = document.getElementById('mg-lbl-type');
            if (lblType) lblType.textContent = getLang('mgLblType', 'Type');
            
            const lblModelId = document.getElementById('lbl-model-id');
            if (lblModelId) lblModelId.textContent = getLang('mgLblModelId', lang === 'tr' ? 'Model Kimliği:' : 'Model ID:');
            
            const selBtnText = document.getElementById('mg-select-btn-text');
            if (selBtnText) selBtnText.textContent = getLang('mgSelectBtn', 'Generate with this Model');
            
            const btnShowMoreInfo = document.getElementById('mg-show-more-stats');
            if (btnShowMoreInfo && btnShowMoreInfo.style.display !== 'none') {
                btnShowMoreInfo.textContent = getLang('mgShowMoreStats', 'Show more');
            }
        }
    }

    function updateRequestLanguage() {
        const heading = document.getElementById('mg-request-title');
        if (heading) heading.textContent = getLang('mgRequestTitle', 'Request New Model');
        const lbName = document.getElementById('mg-lbl-req-name');
        if (lbName) lbName.childNodes[0].textContent = getLang('mgReqName', 'Name');
        const lbMail = document.getElementById('mg-lbl-req-mail');
        if (lbMail) lbMail.textContent = getLang('mgReqMail', 'Email');
        const lbTelegram = document.getElementById('mg-lbl-req-telegram');
        if (lbTelegram) {
            lbTelegram.childNodes[0].textContent = getLang('mgReqTelegram', 'Telegram') + ' ';
        }
        const optLabel = document.getElementById('mg-optional-label');
        if (optLabel) optLabel.textContent = getLang('mgOptional', '(optional)');
        const lbText = document.getElementById('mg-lbl-req-text');
        if (lbText) lbText.textContent = getLang('mgReqText', 'Model Request');
        if (reqName) reqName.placeholder = getLang('mgReqNamePlaceholder', 'Your name');
        if (reqMail) reqMail.placeholder = getLang('mgReqMailPlaceholder', 'your@email.com');
        if (reqTelegram) reqTelegram.placeholder = getLang('mgReqTelegramPlaceholder', '@username');
        if (reqText) reqText.placeholder = getLang('mgReqTextPlaceholder', 'Describe the model you want...');
        const cancelTxt = document.getElementById('mg-cancel-text');
        if (cancelTxt) cancelTxt.textContent = getLang('mgCancelText', 'Cancel');
        const submitTxt = document.getElementById('mg-submit-text');
        if (submitTxt) submitTxt.textContent = getLang('mgSubmitText', 'Send');
    }

    window.updateModelGalleryLanguage = function () {
        updateGalleryLanguage();
        updateRequestLanguage();
    };

    window.openModelInGallery = async function(modelId) {
        updateGalleryLanguage();
        galleryModal.classList.add('active');
        if (typeof playFeatureToggleSound === 'function') playFeatureToggleSound(true);
        await fetchModels();
        const model = allModels.find(m => m.id === modelId);
        if (model) {
            openDetail(model);
        }
    };

    const initModelFromURL = () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const m = urlParams.get('model') || urlParams.get('m');
            const showGal = urlParams.has('gallery') || urlParams.has('models');
            if (m && typeof window.openModelInGallery === 'function') {
                window.openModelInGallery(m);
            } else if (showGal) {
                openGallery();
            }
        } catch (e) {}
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModelFromURL);
    } else {
        initModelFromURL();
    }

})();
