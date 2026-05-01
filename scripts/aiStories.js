(function () {
    'use strict';

    const API_URL    = 'https://create.thena.workers.dev/thenaToons';
    const EP_API_URL = 'https://create.thena.workers.dev/toon?id=';
    const READER_API_URL = 'https://create.thena.workers.dev/getToon?id=';

    let allStories      = [];
    let activeCategory  = 'all';
    let hasLoaded       = false;
    let isInitCalled    = false;
    let currentStory    = null;
    let currentStoryEps = [];
    let currentSeason   = 1;
    let currentReaderEpIndex = -1;
    const EPS_PER_SEASON = 6;

    const $  = (id) => document.getElementById(id);
    const el = (tag, cls) => { const e = document.createElement(tag); if (cls) e.className = cls; return e; };
    function getLang() {
        return (typeof currentLang !== 'undefined' ? currentLang : document.documentElement.lang) || 'en';
    }

    function t(key) {
        const lang = getLang();
        if (typeof translations !== 'undefined' && translations[lang] && translations[lang][key]) return translations[lang][key];
        if (typeof translations !== 'undefined' && translations['en'] && translations['en'][key])   return translations['en'][key];
        return key;
    }

    function resolveText(val) {
        if (!val) return '';
        if (typeof val === 'object') {
            const lang = getLang();
            return val[lang] || val['en'] || val['tr'] || '';
        }
        return String(val);
    }

    function formatViews(n) {
        const num = parseInt(n, 10);
        if (isNaN(num)) return n;
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        if (num >= 1_000)     return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
        return num.toLocaleString();
    }

    function formatDate(ts) {
        if (!ts) return '';
        const d = new Date(Number(ts) * 1000);
        return d.toLocaleDateString(getLang() === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    function buildCard(story) {
        const card = el('div', 'toon-card');
        card.dataset.id = story.id;

        const categories = Array.isArray(story.category) ? story.category : [story.category];
        const firstCat   = categories[0] || '';
        const desc       = resolveText(story.desc);
        const name       = resolveText(story.name);

        const statusText = story.isEnded ? (getLang() === 'tr' ? 'Final' : 'Completed') : (getLang() === 'tr' ? 'Devam Ediyor' : 'Ongoing');
        const statusClass = story.isEnded ? 'toon-status-ended' : 'toon-status-ongoing';

        card.innerHTML = `
            <div class="toon-card-thumb">
                <div class="toon-card-status-badge ${statusClass}">${statusText}</div>
                <img src="${story.image}" alt="${name}" loading="lazy" draggable="false">
                <div class="toon-card-overlay"></div>
            </div>
            <div class="toon-card-info">
                <span class="toon-card-cat">${firstCat}</span>
                <h3 class="toon-card-name">${name}</h3>
                ${desc ? `<p class="toon-card-desc">${desc}</p>` : ''}
                <div class="toon-card-meta">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span>${formatViews(story.views)}</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => openDetail(story));
        return card;
    }

    function renderStories(stories) {
        const grid  = $('toon-grid');
        const count = $('toon-story-count');
        if (!grid) return;

        grid.innerHTML = '';

        const filtered = activeCategory === 'all'
            ? stories
            : stories.filter(s => {
                const cats = Array.isArray(s.category) ? s.category : [s.category];
                return cats.some(c => c.toLowerCase() === activeCategory.toLowerCase());
            });

        if (count) {
            count.textContent = filtered.length > 0
                ? t('toonStoryCount').replace('{0}', filtered.length)
                : '';
        }

        if (filtered.length === 0) {
            const empty = el('div', 'toon-empty');
            empty.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 15h8M9 9h.01M15 9h.01"/></svg><p>${t('toonEmptyCategory')}</p>`;
            grid.appendChild(empty);
            return;
        }

        const frag = document.createDocumentFragment();
        filtered.forEach((story, i) => {
            const card = buildCard(story);
            card.style.animationDelay = `${i * 40}ms`;
            card.classList.add('toon-card--enter');
            frag.appendChild(card);
        });
        grid.appendChild(frag);
    }

    const VISIBLE_CAT_LIMIT = 5;
    let filterExpanded = false;

    function buildCategoryFilters(stories) {
        const bar = $('toon-filter-bar');
        if (!bar) return;

        const allBtn = $('toon-cat-all');
        bar.innerHTML = '';
        if (allBtn) {
            allBtn.classList.toggle('active', activeCategory === 'all');
            bar.appendChild(allBtn);
        }

        const allCats = new Set();
        stories.forEach(s => {
            const cats = Array.isArray(s.category) ? s.category : [s.category];
            cats.forEach(c => { if (c) allCats.add(c); });
        });

        const catArr     = Array.from(allCats);
        const needsToggle = catArr.length > VISIBLE_CAT_LIMIT;

        catArr.forEach((cat, idx) => {
            const btn = el('button', 'toon-filter-btn');
            btn.dataset.cat = cat;
            btn.textContent = cat;
            if (needsToggle && idx >= VISIBLE_CAT_LIMIT) {
                btn.classList.add('toon-filter-extra');
                if (!filterExpanded) btn.style.display = 'none';
            }
            btn.addEventListener('click', () => setCategory(cat, btn));
            bar.appendChild(btn);
        });

        if (needsToggle) {
            const moreBtn = el('button', 'toon-filter-more');
            moreBtn.id = 'toon-filter-more-btn';
            moreBtn.textContent = filterExpanded
                ? (getLang() === 'tr' ? 'Daha Az' : 'Show Less')
                : (getLang() === 'tr' ? 'Daha Fazla' : 'View More');
            moreBtn.setAttribute('data-count', catArr.length - VISIBLE_CAT_LIMIT);
            moreBtn.addEventListener('click', toggleFilterExpand);
            bar.appendChild(moreBtn);
        }
    }

    function toggleFilterExpand() {
        filterExpanded = !filterExpanded;
        document.querySelectorAll('.toon-filter-extra').forEach(b => {
            b.style.display = filterExpanded ? '' : 'none';
        });
        const moreBtn = $('toon-filter-more-btn');
        if (moreBtn) {
            moreBtn.textContent = filterExpanded
                ? (getLang() === 'tr' ? 'Daha Az' : 'Show Less')
                : (getLang() === 'tr' ? 'Daha Fazla' : 'View More');
            moreBtn.classList.toggle('toon-filter-more--open', filterExpanded);
        }
    }

    function setCategory(cat, btn) {
        activeCategory = cat;
        document.querySelectorAll('.toon-filter-btn').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');
        else { const all = $('toon-cat-all'); if (all) all.classList.add('active'); }
        renderStories(allStories);
    }

    function showError(msg) {
        const grid   = $('toon-grid');
        const err    = $('toon-error');
        const errMsg = $('toon-error-msg');
        if (grid)   grid.style.display = 'none';
        if (err)    err.style.display  = 'flex';
        if (errMsg) errMsg.textContent = msg || t('toonErrorMsg');
    }

    async function fetchStories() {
        const grid = $('toon-grid');
        const err  = $('toon-error');

        if (grid) {
            grid.style.display = '';
            grid.innerHTML = Array(6).fill('<div class="toon-card-skeleton"></div>').join('');
        }
        if (err) err.style.display = 'none';

        try {
            const res  = await fetch(API_URL);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();

            allStories = Array.isArray(data) ? data : [data];
            buildCategoryFilters(allStories);
            renderStories(allStories);
            hasLoaded = true;
        } catch (e) {
            console.error('[Thena Toons] Fetch error:', e);
            showError(t('toonErrorMsg'));
        }
    }

    function showBrowse() {
        const detail  = $('toon-detail');
        const browse  = $('toon-filter-bar');
        const section = document.querySelector('.toon-section');
        if (detail)  { detail.style.display = 'none'; detail.classList.remove('toon-detail--in'); }
        if (browse)  browse.style.display = '';
        if (section) section.style.display = '';
        closeAuthorPopup();
        currentStory = null;
    }

    function showDetailPane() {
        const detail  = $('toon-detail');
        const browse  = $('toon-filter-bar');
        const section = document.querySelector('.toon-section');
        if (browse)  browse.style.display = 'none';
        if (section) section.style.display = 'none';
        if (detail)  {
            detail.style.display = '';
            requestAnimationFrame(() => detail.classList.add('toon-detail--in'));
        }
    }

    function closeAuthorPopup() {
        const popup = $('toon-author-popup');
        if (!popup) return;
        popup.classList.remove('toon-popup--in');
        setTimeout(() => { popup.style.display = 'none'; }, 200);
    }

    function toggleAuthorPopup() {
        const popup = $('toon-author-popup');
        if (!popup) return;
        const isOpen = popup.classList.contains('toon-popup--in');
        if (isOpen) {
            closeAuthorPopup();
        } else {
            popup.style.display = '';
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    popup.classList.add('toon-popup--in');
                });
            });
        }
    }

    function buildEpisodeNumber(num) {
        const wrap = el('div', 'toon-ep-num-wrap');
        const rings = [0, 1, 2].map(i => `
            <div class="toon-ep-ring toon-ep-ring--${i}"></div>
        `).join('');
        wrap.innerHTML = `
            ${rings}
            <div class="toon-ep-num-orb">
                <span class="toon-ep-num-text">${num}</span>
            </div>
        `;
        return wrap;
    }

    function buildEpisodeRow(ep) {
        const row = el('div', 'toon-episode-row');
        row.dataset.episodeId = ep.episodeID;
        row.dataset.episodeNum = ep.episode;
        row.dataset.timestamp = ep.publish_date;

        const numWrap = buildEpisodeNumber(ep.episode);
        const info = el('div', 'toon-episode-info');
        const lang = getLang();
        const epNameObj = ep.episodeName || {};
        const epTitle = epNameObj[lang] || (lang === 'tr' ? `Bölüm ${ep.episode}` : `Episode ${ep.episode}`);

        info.innerHTML = `
            <span class="toon-episode-title">${epTitle}</span>
            <span class="toon-episode-date">${formatDate(ep.publish_date)}</span>
        `;

        const arrow = el('div', 'toon-episode-arrow');
        arrow.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

        row.appendChild(numWrap);
        row.appendChild(info);
        row.appendChild(arrow);
        
        row.style.cursor = 'pointer';
        row.addEventListener('click', () => openReader(ep.episodeID));
        
        return row;
    }

    function populateDetail(story) {
        const hero = $('toon-detail-hero');
        if (hero && story.detail_bg) {
            hero.style.backgroundImage = `url('${story.detail_bg}')`;
        }

        const catsEl = $('toon-detail-cats');
        if (catsEl) {
            const cats = Array.isArray(story.category) ? story.category : [story.category];
            let catsHtml = cats.map(c => `<span class="toon-detail-cat-badge">${c}</span>`).join('');
            
            const statusText = story.isEnded ? (getLang() === 'tr' ? 'Final' : 'Completed') : (getLang() === 'tr' ? 'Devam Ediyor' : 'Ongoing');
            const statusClass = story.isEnded ? 'toon-status-ended' : 'toon-status-ongoing';
            catsHtml += `<span class="toon-detail-cat-badge toon-detail-status-badge ${statusClass}">${statusText}</span>`;
            
            catsEl.innerHTML = catsHtml;
        }

        const titleEl = $('toon-detail-title');
        const descEl  = $('toon-detail-desc');
        if (titleEl) titleEl.textContent = resolveText(story.name) || '';
        if (descEl)  descEl.textContent  = resolveText(story.desc);

        const author     = story.author || {};
        const authorName = typeof author === 'string' ? author : (author.name || '');
        const authorDesc = story.author_desc || '';
        const authorLink = story.author_link || '';
        const authorAvatar = story.author_avatar || '';

        const avatarImg     = $('toon-detail-avatar-img');
        const avatarInitial = $('toon-detail-avatar-initial');
        if (avatarImg && avatarInitial) {
            if (authorAvatar) {
                avatarImg.src = authorAvatar;
                avatarImg.alt = authorName;
                avatarImg.style.display = '';
                avatarInitial.style.display = 'none';
            } else {
                avatarImg.style.display = 'none';
                avatarInitial.style.display = '';
                avatarInitial.textContent = authorName ? authorName[0].toUpperCase() : '?';
            }
        }

        const nameEl = $('toon-detail-author-name');
        if (nameEl) nameEl.textContent = authorName;

        const popupName = $('toon-author-popup-name');
        const popupDesc = $('toon-author-popup-desc');
        const popupLink = $('toon-author-popup-link');
        const writtenBy = $('toon-author-written-by');
        const infoBtn   = $('toon-detail-info-btn');

        const popupAvatarImg     = $('toon-author-popup-avatar-img');
        const popupAvatarInitial = $('toon-author-popup-avatar-initial');
        if (popupAvatarImg && popupAvatarInitial) {
            if (authorAvatar) {
                popupAvatarImg.src = authorAvatar;
                popupAvatarImg.alt = authorName;
                popupAvatarImg.style.display = '';
                popupAvatarInitial.style.display = 'none';
            } else {
                popupAvatarImg.style.display = 'none';
                popupAvatarInitial.style.display = '';
                popupAvatarInitial.textContent = authorName ? authorName[0].toUpperCase() : '?';
            }
        }

        if (popupName) popupName.textContent = authorName;
        if (writtenBy) writtenBy.textContent = getLang() === 'tr' ? 'Yazan' : 'Written by';
        if (popupDesc) popupDesc.textContent = authorDesc;

        if (popupLink) {
            if (authorLink) {
                popupLink.href = authorLink;
                popupLink.style.display = '';
                popupLink.innerHTML = buildSocialIcon(authorLink);
            } else {
                popupLink.style.display = 'none';
            }
        }

        if (infoBtn) {
            infoBtn.style.display = (authorDesc || authorLink) ? '' : 'none';
        }
        const labelEl = $('toon-detail-author-label');
        if (labelEl) labelEl.textContent = getLang() === 'tr' ? 'Yazar / Senarist' : 'Author / Writer';

        const viewsCount = $('toon-detail-views-count');
        if (viewsCount) viewsCount.textContent = formatViews(story.views);

        const epLabel = $('toon-detail-ep-label');
        if (epLabel) epLabel.textContent = getLang() === 'tr' ? 'Bölümler' : 'Episodes';
    }
    function buildSocialIcon(url) {
        if (!url) return '';
        const isTelegram  = url.includes('t.me');
        const isInstagram = url.includes('instagram.com');

        if (isTelegram) {
            return `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="6" fill="#229ED9"/>
                <path d="M5 12.2L17.5 7l-2.2 10.5-3.7-3-1.8 1.7.4-4 5.1-4.8-6.3 3.9L5 12.2z" fill="#fff"/>
            </svg>`;
        } else if (isInstagram) {
            return `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="ig-grad" cx="30%" cy="107%" r="120%">
                        <stop offset="0%"  stop-color="#fdf497"/>
                        <stop offset="5%"  stop-color="#fdf497"/>
                        <stop offset="45%" stop-color="#fd5949"/>
                        <stop offset="60%" stop-color="#d6249f"/>
                        <stop offset="90%" stop-color="#285AEB"/>
                    </radialGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#ig-grad)"/>
                <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="#fff" stroke-width="1.6"/>
                <circle cx="12" cy="12" r="4.5" fill="none" stroke="#fff" stroke-width="1.8"/>
                <circle cx="17.2" cy="6.8" r="1.2" fill="#fff"/>
            </svg>`;
        } else {
            return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="6" fill="#1e1e1e"/>
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="#aaa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="#aaa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
        }
    }

    async function fetchEpisodes(storyId) {
        const list    = $('toon-episodes-list');
        const epErr   = $('toon-detail-ep-error');
        const epCount = $('toon-detail-ep-count');

        if (list) {
            list.innerHTML = Array(3).fill('<div class="toon-ep-skeleton"></div>').join('');
        }
        if (epErr) epErr.style.display = 'none';

        try {
            const res  = await fetch(`${EP_API_URL}${storyId}`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const eps  = Array.isArray(data) ? data : [data];

            eps.sort((a, b) => (a.episode || 0) - (b.episode || 0));
            currentStoryEps = eps;
            currentSeason = 1;

            if (epCount) {
                epCount.textContent = getLang() === 'tr'
                    ? `${eps.length} Bölüm`
                    : `${eps.length} Episodes`;
            }

            setupSeasonSelect();
            renderEpisodesList();

        } catch (e) {
            console.error('[Thena Toons] Episode fetch error:', e);
            if (list)  list.innerHTML = '';
            if (epErr) {
                epErr.style.display = '';
                const msg = $('toon-detail-ep-error-msg');
                if (msg) msg.textContent = getLang() === 'tr' ? 'Bölümler yüklenemedi.' : 'Failed to load episodes.';
            }
        }
    }

    function setupSeasonSelect() {
        const wrapper = $('toon-season-dropdown-wrapper');
        const trigger = $('toon-season-trigger');
        const optionsContainer = $('toon-season-options');

        if (!wrapper || !trigger || !optionsContainer) return;
        
        const totalSeasons = Math.ceil(currentStoryEps.length / EPS_PER_SEASON);
        if (totalSeasons <= 1) {
            wrapper.style.display = 'none';
            return;
        }

        wrapper.style.display = '';
        optionsContainer.innerHTML = '';
        const lang = getLang();
        
        for (let i = 1; i <= totalSeasons; i++) {
            const opt = el('div', 'toon-season-option');
            opt.dataset.value = i;
            if (i === currentSeason) opt.classList.add('active');
            opt.textContent = lang === 'tr' ? `Sezon ${i}` : `Season ${i}`;
            
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                currentSeason = i;
                
                const currentTextEl = $('toon-season-trigger-text');
                if (currentTextEl) currentTextEl.textContent = opt.textContent;
                
                wrapper.classList.remove('is-open');
                
                Array.from(optionsContainer.children).forEach(child => child.classList.remove('active'));
                opt.classList.add('active');
                
                renderEpisodesList();
            });
            
            optionsContainer.appendChild(opt);
        }
        
        const newTrigger = trigger.cloneNode(true);
        trigger.parentNode.replaceChild(newTrigger, trigger);
        
        const newTriggerText = $('toon-season-trigger-text');
        if (newTriggerText) {
            newTriggerText.textContent = lang === 'tr' ? `Sezon ${currentSeason}` : `Season ${currentSeason}`;
        }
        
        newTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            wrapper.classList.toggle('is-open');
        });
        
        if (!wrapper.dataset.hasDocListener) {
            document.addEventListener('click', (e) => {
                if (wrapper.classList.contains('is-open') && !wrapper.contains(e.target)) {
                    wrapper.classList.remove('is-open');
                }
            });
            wrapper.dataset.hasDocListener = 'true';
        }
    }

    function renderEpisodesList() {
        const list = $('toon-episodes-list');
        if (!list) return;
        
        list.innerHTML = '';
        const startIdx = (currentSeason - 1) * EPS_PER_SEASON;
        const endIdx = startIdx + EPS_PER_SEASON;
        const seasonEps = currentStoryEps.slice(startIdx, endIdx);

        seasonEps.forEach((ep, i) => {
            const row = buildEpisodeRow(ep);
            row.style.animationDelay = `${i * 50}ms`;
            row.classList.add('toon-ep-row--enter');
            list.appendChild(row);
        });
    }

    function openDetail(story) {
        currentStory = story;
        closeAuthorPopup();
        const list = $('toon-episodes-list');
        if (list) list.innerHTML = '';
        const epErr = $('toon-detail-ep-error');
        if (epErr) epErr.style.display = 'none';

        populateDetail(story);
        showDetailPane();

        const detail = $('toon-detail');
        if (detail) detail.scrollTop = 0;

        fetchEpisodes(story.id);
    }

    function initDetailEvents() {
        const backBtn  = $('toon-detail-back');
        const infoBtn  = $('toon-detail-info-btn');
        const closeBtn = $('toon-author-popup-close');
        const backdrop = $('toon-author-popup-backdrop');

        if (backBtn)  backBtn.addEventListener('click', showBrowse);

        if (infoBtn) {
            infoBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleAuthorPopup();
            });
        }

        if (closeBtn) closeBtn.addEventListener('click', closeAuthorPopup);
        if (backdrop)  backdrop.addEventListener('click', closeAuthorPopup);
    }

    function updateLang(lang) {
        if (hasLoaded && allStories.length > 0) renderStories(allStories);

        const moreBtn = $('toon-filter-more-btn');
        if (moreBtn) {
            moreBtn.textContent = filterExpanded
                ? (lang === 'tr' ? 'Daha Az' : 'Show Less')
                : (lang === 'tr' ? 'Daha Fazla' : 'View More');
        }

        const err = $('toon-error');
        if (err && err.style.display !== 'none') {
            const errMsg = $('toon-error-msg');
            if (errMsg) errMsg.textContent = t('toonErrorMsg');
        }

        if (currentStory) {
            populateDetail(currentStory);

            const epRows = document.querySelectorAll('.toon-episode-row');
            epRows.forEach(row => {
                const epNum = row.dataset.episodeNum;
                const ts = row.dataset.timestamp;
                const titleEl = row.querySelector('.toon-episode-title');
                const dateEl = row.querySelector('.toon-episode-date');
                
                if (titleEl && epNum) {
                    titleEl.textContent = (lang === 'tr' ? 'Bölüm' : 'Episode') + ' ' + epNum;
                }
                if (dateEl && ts) {
                    dateEl.textContent = formatDate(ts);
                }
            });

            const seasonWrapper = $('toon-season-dropdown-wrapper');
            const seasonOptions = $('toon-season-options');
            const triggerText = $('toon-season-trigger-text');
            
            if (seasonWrapper && seasonOptions && seasonWrapper.style.display !== 'none') {
                Array.from(seasonOptions.children).forEach((opt) => {
                    const sIdx = opt.dataset.value;
                    opt.textContent = lang === 'tr' ? `Sezon ${sIdx}` : `Season ${sIdx}`;
                    if (parseInt(sIdx, 10) === currentSeason && triggerText) {
                        triggerText.textContent = opt.textContent;
                    }
                });
            }

            const epCount = $('toon-detail-ep-count');
            if (epCount && epRows.length > 0) {
                epCount.textContent = lang === 'tr'
                    ? `${epRows.length} Bölüm`
                    : `${epRows.length} Episodes`;
            }
        }
    }

    async function openReader(episodeId) {
        const index = currentStoryEps.findIndex(e => e.episodeID === episodeId);
        if (index === -1) return;
        
        currentReaderEpIndex = index;
        const ep = currentStoryEps[index];
        const lang = getLang();
        
        const reader = $('toon-reader');
        if (!reader) return;
        
        reader.style.display = '';
        document.documentElement.classList.add('reader-mode-active');
        $('toon-reader-title').textContent = (lang === 'tr' ? 'Bölüm ' : 'Episode ') + ep.episode;
        
        const imgContainer = $('toon-reader-images');
        imgContainer.innerHTML = '';
        
        $('toon-reader-end-message').style.display = 'none';
        $('toon-reader-loading').style.display = '';
        
        const readerContent = $('toon-reader-content');
        if (readerContent) readerContent.scrollTop = 0;
        
        try {
            const res = await fetch(READER_API_URL + ep.episodeID);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            
            $('toon-reader-loading').style.display = 'none';
            if (data && (data.en || data.tr)) {
                let imgArray = data[lang];
                if (!imgArray || imgArray.length === 0) {
                    imgArray = (data.en && data.en.length > 0) ? data.en : data.tr;
                }
                
                if (imgArray && Array.isArray(imgArray)) {
                    imgArray.forEach(imgUrl => {
                        const img = el('img');
                        img.src = imgUrl;
                        img.loading = 'lazy';
                        imgContainer.appendChild(img);
                    });
                    
                    const isSeasonEnd = (ep.episode % EPS_PER_SEASON === 0) || (index === currentStoryEps.length - 1);
                    $('toon-reader-end-text').textContent = isSeasonEnd ? t('toonReaderSeasonEnded') : t('toonReaderEpEnded');
                    $('toon-reader-end-message').style.display = '';
                }
            } else if (data && Array.isArray(data)) {
                data.forEach(imgUrl => {
                    const img = el('img');
                    img.src = imgUrl;
                    img.loading = 'lazy';
                    imgContainer.appendChild(img);
                });
                
                const isSeasonEnd = (ep.episode % EPS_PER_SEASON === 0) || (index === currentStoryEps.length - 1);
                $('toon-reader-end-text').textContent = isSeasonEnd ? t('toonReaderSeasonEnded') : t('toonReaderEpEnded');
                $('toon-reader-end-message').style.display = '';
            }
        } catch (error) {
            console.error('Error fetching reader images:', error);
            $('toon-reader-loading').style.display = 'none';
            playInformationSound()
            if (typeof showNotification === 'function') showNotification(t('toonErrorMsg'), 'error');
        }
    }

    function setupReaderEvents() {
        const backBtn = $('toon-reader-back-btn');
        const prevBtn = $('toon-reader-prev-btn');
        const nextBtn = $('toon-reader-next-btn');
        
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                $('toon-reader').style.display = 'none';
                $('toon-reader-images').innerHTML = '';
                document.documentElement.classList.remove('reader-mode-active');
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentReaderEpIndex <= 0) {
                    playInformationSound()
                    if (typeof showNotification === 'function') showNotification(t('toonReaderFirstEp'), 'info');
                    return;
                }
                const prevEp = currentStoryEps[currentReaderEpIndex - 1];
                openReader(prevEp.episodeID);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (currentReaderEpIndex >= currentStoryEps.length - 1) {
                    playInformationSound()
                    if (typeof showNotification === 'function') showNotification(t('toonReaderSeasonEnd'), 'info');
                    return;
                }
                
                const currentEpData = currentStoryEps[currentReaderEpIndex];
                if (currentEpData.episode % EPS_PER_SEASON === 0) {
                    playInformationSound()
                    if (typeof showNotification === 'function') showNotification(t('toonReaderSeasonEnd'), 'info');
                    return;
                }
                
                const nextEp = currentStoryEps[currentReaderEpIndex + 1];
                openReader(nextEp.episodeID);
            });
        }
    }
    function init() {
        if (isInitCalled) return;
        isInitCalled = true;

        const allBtn   = $('toon-cat-all');
        if (allBtn) allBtn.addEventListener('click', () => setCategory('all', allBtn));

        const retryBtn = $('toon-retry-btn');
        if (retryBtn) retryBtn.addEventListener('click', fetchStories);

        initDetailEvents();
        setupReaderEvents();
        fetchStories();
    }

    window.aiStoriesInit       = init;
    window.aiStoriesUpdateLang = updateLang;

    document.addEventListener('DOMContentLoaded', () => {
        const view = $('view-ai-stories');
        if (view && view.style.display !== 'none') init();
    });

})();
