(function () {
    'use strict';

    function t(key, fallback) {
        if (typeof translations !== 'undefined' && typeof currentLang !== 'undefined') {
            return (translations[currentLang] && translations[currentLang][key]) || fallback;
        }
        return fallback;
    }

    function notify(msg, type) {
        if (typeof showNotification === 'function') showNotification(msg, type);
    }

    let allElements       = [];
    let filteredElements  = [];
    let selectedElements  = [];
    let nsfwEnabled       = false;
    let currentDetailEl   = null;
    let lastLoadedModelId = null;

    const addBtn       = document.getElementById('element-add-btn');
    const container    = document.getElementById('elements-selected-container');
    const modalOverlay = document.getElementById('elements-modal-overlay');
    const closeModalBtn= document.getElementById('elements-modal-close');
    const searchInput  = document.getElementById('elements-search-input');
    const nsfwBtn      = document.getElementById('elements-nsfw-btn');
    const grid         = document.getElementById('elements-grid');
    const loadingEl    = document.getElementById('elements-loading');
    const emptyEl      = document.getElementById('elements-empty');

    const detailOverlay   = document.getElementById('element-detail-overlay');
    const detailClose     = document.getElementById('element-detail-close');
    const detailThumb     = document.getElementById('element-detail-thumb');
    const detailNsfwBadge = document.getElementById('element-detail-nsfw-badge');
    const detailName      = document.getElementById('element-detail-name');
    const detailDesc      = document.getElementById('element-detail-desc');
    const detailLoraId    = document.getElementById('element-detail-lora-id');
    const useBtn          = document.getElementById('element-use-btn');
    const useBtnText      = document.createElement('span');

    useBtn.innerHTML = '';
    const useBtnSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    useBtnSvg.setAttribute('width', '16'); useBtnSvg.setAttribute('height', '16');
    useBtnSvg.setAttribute('viewBox', '0 0 24 24'); useBtnSvg.setAttribute('fill', 'none');
    useBtnSvg.setAttribute('stroke', 'currentColor'); useBtnSvg.setAttribute('stroke-width', '2');
    useBtnSvg.setAttribute('stroke-linecap', 'round'); useBtnSvg.setAttribute('stroke-linejoin', 'round');
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', '20 6 9 17 4 12');
    useBtnSvg.appendChild(polyline);
    useBtnText.textContent = t('elementsUseBtn', 'Elementi Kullan');
    useBtn.appendChild(useBtnSvg);
    useBtn.appendChild(useBtnText);

    function openModal() {
        if (typeof selectedModel === 'undefined' || !selectedModel) {
            if (typeof playErrorSound !== 'undefined') playErrorSound();
            notify(t('elementsNoModel', 'Lütfen önce bir model seçin.'), 'error');
            return;
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (selectedModel !== lastLoadedModelId) {
            resetData();
            fetchElements();
        } else if (allElements.length === 0) {
            fetchElements();
        } else {
            applyFilters();
        }
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openDetail(el) {
        currentDetailEl = el;
        detailThumb.src = el.thumb || '';
        detailName.textContent = el.name;
        detailDesc.textContent = (typeof el.desc === 'object' && el.desc !== null)
            ? (currentLang === 'tr' ? el.desc.tr : el.desc.en) || ''
            : (el.desc || '');
        detailLoraId.textContent = el.loraID || '-';
        detailNsfwBadge.style.display = el.isNSFW ? 'flex' : 'none';

        const isSelected = selectedElements.some(s => s.loraID === el.loraID);
        const isFull     = selectedElements.length >= 2 && !isSelected;

        useBtnText.textContent = isSelected
            ? t('elementsUseBtnSelected', '✓ Seçildi')
            : t('elementsUseBtn', 'Elementi Kullan');
        useBtn.disabled = isFull && !isSelected;
        useBtn.classList.toggle('selected', isSelected);

        detailOverlay.classList.add('active');
    }

    function closeDetail() {
        detailOverlay.classList.remove('active');
        currentDetailEl = null;
    }

    async function fetchElements() {
        resetData();
        setLoading(true);

        try {
            const res = await fetch('https://create.thena.workers.dev/elements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ model: selectedModel })
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            allElements = Array.isArray(data) ? data : [];
            lastLoadedModelId = selectedModel;
        } catch (err) {
            console.error('[Elements] Fetch error:', err);
            allElements = [];
            notify(t('elementsLoadFailed', 'Elementler yüklenemedi.'), 'error');
        } finally {
            setLoading(false);
            applyFilters();
        }
    }

    function resetData() {
        allElements = [];
        filteredElements = [];
        grid.innerHTML = '';
        emptyEl.style.display = 'none';
    }

    function setLoading(show) {
        loadingEl.style.display = show ? 'flex' : 'none';
        grid.style.display      = show ? 'none' : 'grid';
    }

    function applyFilters() {
        const q = searchInput.value.trim().toLowerCase();
        filteredElements = allElements.filter(el => {
            if (el.isNSFW && !nsfwEnabled) return false;
            const descStr = typeof el.desc === 'object' && el.desc !== null
                ? (el.desc[currentLang] || el.desc.en || el.desc.tr || '')
                : (el.desc || '');
            if (q && !el.name.toLowerCase().includes(q) && !descStr.toLowerCase().includes(q)) return false;
            return true;
        });
        renderGrid();
    }

    function renderGrid() {
        grid.innerHTML = '';

        if (filteredElements.length === 0) {
            emptyEl.style.display = 'flex';
            return;
        }
        emptyEl.style.display = 'none';

        filteredElements.forEach((el, idx) => {
            const isSelected = selectedElements.some(s => s.loraID === el.loraID);
            const isFull     = selectedElements.length >= 2 && !isSelected;
            const desc = typeof el.desc === 'object' && el.desc !== null
                ? (currentLang === 'tr' ? el.desc.tr : el.desc.en) || ''
                : (el.desc || '');
            const card = document.createElement('div');
            card.className = 'element-grid-card'
                + (isSelected ? ' selected' : '')
                + (isFull ? ' dimmed' : '');
            card.dataset.loraId = el.loraID;
            card.style.animationDelay = `${idx * 35}ms`;

            card.innerHTML = `
                <div class="element-grid-thumb-wrapper">
                    <img class="element-grid-thumb" src="${escHtml(el.thumb || '')}" alt="${escHtml(el.name)}" loading="lazy">
                    ${el.isNSFW ? '<span class="element-grid-nsfw-tag">+18</span>' : ''}
                    ${isSelected ? `<div class="element-grid-selected-overlay">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>` : ''}
                    ${!isFull || isSelected ? `<button class="element-quick-add-btn${isSelected ? ' selected' : ''}" title="${isSelected ? 'Kaldır' : 'Hızlı Ekle'}" data-lora-id="${escHtml(el.loraID)}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            ${isSelected
                                ? '<polyline points="20 6 9 17 4 12"></polyline>'
                                : '<line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>'
                            }
                        </svg>
                    </button>` : ''}
                </div>
                <div class="element-grid-info">
                    <span class="element-grid-name">${escHtml(el.name)}</span>
                    <em class="element-grid-desc">${escHtml(desc)}</em>
                </div>
            `;

            const quickBtn = card.querySelector('.element-quick-add-btn');
            if (quickBtn) {
                quickBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const alreadySel = selectedElements.some(s => s.loraID === el.loraID);
                    if (alreadySel) {
                        if (typeof playTone === 'function') {
                            playTone('sine', 500, 300, 0.12, 0, 0.18);
                        }
                        deselectElement(el.loraID);
                    } else {
                        if (typeof playTone === 'function') {
                            playTone('sine', 400, 700, 0.1, 0, 0.2);
                            playTone('triangle', 700, 1000, 0.12, 0.08, 0.15);
                        }
                        selectElement(el);
                    }
                });
            }

            card.addEventListener('click', () => {
                if (card.classList.contains('dimmed')) {
                    if (typeof playErrorSound === 'function') playErrorSound();
                    card.classList.remove('element-shake');
                    void card.offsetWidth;
                    card.classList.add('element-shake');
                    card.addEventListener('animationend', () => card.classList.remove('element-shake'), { once: true });
                    return;
                }
                openDetail(el);
            });
            grid.appendChild(card);
        });
    }

    function escHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function selectElement(el) {
        if (selectedElements.some(s => s.loraID === el.loraID)) return;
        if (selectedElements.length >= 2) {
            notify(t('elementsMaxReached', 'En fazla 2 element seçebilirsiniz.'), 'info');
            return;
        }
        selectedElements.push(el);
        renderSelectedContainer();
        renderGrid();

        if (currentDetailEl && currentDetailEl.loraID === el.loraID) {
            useBtnText.textContent = t('elementsUseBtnSelected', '✓ Seçildi');
            useBtn.classList.add('selected');
            useBtn.disabled = false;
        }
    }

    function deselectElement(loraID) {
        selectedElements = selectedElements.filter(s => s.loraID !== loraID);
        renderSelectedContainer();
        renderGrid();

        if (currentDetailEl && currentDetailEl.loraID === loraID) {
            useBtnText.textContent = t('elementsUseBtn', 'Elementi Kullan');
            useBtn.classList.remove('selected');
            useBtn.disabled = false;
        }
    }

    function renderSelectedContainer() {
        container.querySelectorAll('.element-selected-chip').forEach(c => c.remove());

        selectedElements.forEach(el => {
            const chip = document.createElement('div');
            chip.className = 'element-selected-chip';
            chip.dataset.loraId = el.loraID;
            chip.innerHTML = `
                <div class="element-chip-thumb-wrapper">
                    <img class="element-chip-thumb" src="${escHtml(el.thumb || '')}" alt="${escHtml(el.name)}">
                </div>
                <span class="element-chip-name">${escHtml(el.name)}</span>
                <button class="element-chip-remove" title="Elementi Kaldır" data-lora-id="${escHtml(el.loraID)}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `;

            chip.querySelector('.element-chip-remove').addEventListener('click', e => {
                e.stopPropagation();
                deselectElement(el.loraID);
            });

            container.appendChild(chip);
        });
    }

    document.addEventListener('modelchange', () => {
        selectedElements = [];
        renderSelectedContainer();
        lastLoadedModelId = null;
    });

    window.getSelectedElements       = () => selectedElements.map(e => e.loraID);
    window.getSelectedElementObjects = () => selectedElements.slice();

    window._restoreElements = async function (savedList) {
        if (!savedList || savedList.length === 0) {
            selectedElements = [];
            renderSelectedContainer();
            return;
        }

        const modelId = typeof selectedModel !== 'undefined' ? selectedModel : null;

        if (allElements.length === 0 || lastLoadedModelId !== modelId) {
            try {
                const res = await fetch('https://create.thena.workers.dev/elements', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ model: modelId })
                });
                if (res.ok) {
                    const data = await res.json();
                    allElements = Array.isArray(data) ? data : [];
                    lastLoadedModelId = modelId;
                }
            } catch (err) {
                console.warn('[Elements] Restore fetch failed:', err);
            }
        }

        selectedElements = savedList.map(saved =>
            allElements.find(e => e.loraID === saved.loraID)
            || { loraID: saved.loraID, name: saved.name, thumb: '' }
        ).slice(0, 2);

        renderSelectedContainer();
    };

    addBtn.addEventListener('click', openModal);

    closeModalBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', e => {
        if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (detailOverlay.classList.contains('active')) closeDetail();
            else if (modalOverlay.classList.contains('active')) closeModal();
        }
    });

    searchInput.addEventListener('input', () => applyFilters());

    nsfwBtn.addEventListener('click', () => {
        nsfwEnabled = !nsfwEnabled;
        nsfwBtn.classList.toggle('active', nsfwEnabled);
        if (typeof playFeatureToggleSound === 'function') playFeatureToggleSound(nsfwEnabled);
        applyFilters();
    });

    detailClose.addEventListener('click', closeDetail);

    detailOverlay.addEventListener('click', e => {
        if (e.target === detailOverlay) closeDetail();
    });

    useBtn.addEventListener('click', () => {
        if (!currentDetailEl) return;
        const alreadySelected = selectedElements.some(s => s.loraID === currentDetailEl.loraID);
        if (alreadySelected) {
            if (typeof playTone === 'function') {
                playTone('sine', 500, 300, 0.12, 0, 0.18);
            }
            deselectElement(currentDetailEl.loraID);
            closeDetail();
        } else {
            if (typeof playTone === 'function') {
                playTone('sine', 400, 700, 0.1, 0, 0.2);
                playTone('triangle', 700, 1000, 0.12, 0.08, 0.15);
            }
            selectElement(currentDetailEl);
            if (selectedElements.some(s => s.loraID === currentDetailEl.loraID)) {
                closeDetail();
                closeModal();
            }
        }
    });

})();
