async function fetchUpdates() {
    try {
        if (window.location.protocol === 'file:') {
            updatesData = window.thenaUpdates || [];
        } else {
            const response = await fetch('updates.json');
            if (response.ok) {
                updatesData = await response.json();
            } else {
                console.warn(`Failed to fetch updates.json: ${response.status}. Falling back to preloaded data.`);
                updatesData = window.thenaUpdates || [];
            }
        }
    } catch (error) {
        console.warn('Error loading updates via fetch, using preloaded fallback:', error);
        updatesData = window.thenaUpdates || [];
    }

    if (updatesData.length > 0) {
        renderUpdatesSidebar();
        renderUpdateDetails(0);
        
        checkNewUpdates();
    }
}

function checkNewUpdates() {
    if (updatesData.length === 0) return;
    
    const tutorialSeen = localStorage.getItem('tutorialSeen') === 'true';
    if (!tutorialSeen) {
        return;
    }
    
    const latestUpdate = updatesData[0];
    const lastSeenVersion = localStorage.getItem('lastSeenUpdateVersion');
    
    if (lastSeenVersion !== latestUpdate.id) {
        const badge = document.getElementById('updates-badge');
        if (badge) badge.style.display = 'block';
        
        showUpdatesToast(latestUpdate);
    }
}

function playCoolSciFiAlert() {
    const isMuted = localStorage.getItem('thena-mute-mode') === 'true' || localStorage.getItem('thena-silent-mode') === 'true';
    if (isMuted) return;
    
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContextClass();
        if (ctx.state === 'suspended') ctx.resume();
        
        const duration = 0.8;
        
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(400, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.15);
        osc1.frequency.exponentialRampToValueAtTime(1300, ctx.currentTime + 0.4);
        
        gain1.gain.setValueAtTime(0.12, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(200, ctx.currentTime);
        osc2.frequency.linearRampToValueAtTime(450, ctx.currentTime + 0.35);
        
        gain2.gain.setValueAtTime(0.1, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);
        
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        
        const osc3 = ctx.createOscillator();
        const gain3 = ctx.createGain();
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(550, ctx.currentTime + 0.12);
        osc3.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.12 + 0.28);
        
        gain3.gain.setValueAtTime(0.08, ctx.currentTime + 0.12);
        gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12 + 0.45);
        
        osc3.connect(gain3);
        gain3.connect(ctx.destination);
        
        osc1.start(ctx.currentTime);
        osc1.stop(ctx.currentTime + duration);
        
        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + 0.65);
        
        osc3.start(ctx.currentTime + 0.12);
        osc3.stop(ctx.currentTime + 0.12 + 0.45);
    } catch (e) {
        console.warn("Failed to play updates sound:", e);
    }
}

function showUpdatesToast(update) {
    const toast = document.getElementById('updates-notification-toast');
    if (!toast) return;
    
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
    const toastTitle = document.getElementById('lbl-update-toast-title');
    const toastDesc = document.getElementById('lbl-update-toast-desc');
    
    if (toastTitle) {
        toastTitle.textContent = lang === 'tr' ? 'Yeni Güncelleme Yayınlandı!' : 'New Update Available!';
    }
    
    if (toastDesc) {
        const titleText = update.title[lang] || update.title['en'] || update.id;
        toastDesc.innerHTML = `<span class="toast-version-badge">${update.id}</span> <span class="toast-version-title">${titleText}</span>`;
    }
    
    playCoolSciFiAlert();
    
    toast.classList.add('active');
}

function markLatestUpdateAsRead() {
    if (updatesData.length === 0) return;
    const latestUpdate = updatesData[0];
    localStorage.setItem('lastSeenUpdateVersion', latestUpdate.id);
    
    const badge = document.getElementById('updates-badge');
    if (badge) badge.style.display = 'none';
}

function renderUpdatesSidebar() {
    const sidebarList = document.getElementById('updates-list');
    if (!sidebarList) return;
    
    sidebarList.innerHTML = '';
    
    updatesData.forEach((update, index) => {
        const item = document.createElement('div');
        item.className = `update-sidebar-item ${index === activeUpdateIndex ? 'active' : ''}`;
        
        const version = document.createElement('span');
        version.className = 'update-item-version';
        version.textContent = update.id;
        
        const date = document.createElement('span');
        date.className = 'update-item-date';
        date.textContent = update.date;
        
        item.appendChild(version);
        item.appendChild(date);
        
        item.addEventListener('click', () => {
            const activeItems = sidebarList.querySelectorAll('.update-sidebar-item');
            activeItems.forEach(el => el.classList.remove('active'));
            
            item.classList.add('active');
            
            renderUpdateDetails(index);
        });
        
        sidebarList.appendChild(item);
    });
}

function renderUpdateDetails(index) {
    const container = document.getElementById('updates-detail-container');
    if (!container || updatesData.length === 0) return;
    
    activeUpdateIndex = index;
    const update = updatesData[index];
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
    
    const titleText = update.title[lang] || update.title['en'] || '';
    const subtitleText = update.subtitle[lang] || update.subtitle['en'] || '';
    const categoryText = update.category[lang] || update.category['en'] || '';
    
    let sectionsHtml = '';
    if (update.sections && update.sections.length > 0) {
        update.sections.forEach(section => {
            const secTitle = section.title[lang] || section.title['en'] || '';
            const secIntro = section.intro[lang] || section.intro['en'] || '';
            
            let groupsHtml = '';
            if (section.groups && section.groups.length > 0) {
                section.groups.forEach(group => {
                    const groupName = group.name[lang] || group.name['en'] || '';
                    
                    let itemsHtml = '';
                    if (group.items && group.items.length > 0) {
                        group.items.forEach(item => {
                            const bulletText = item[lang] || item['en'] || '';
                            itemsHtml += `<li class="patch-bullet">${bulletText}</li>`;
                        });
                    }
                    
                    groupsHtml += `
                        <div class="patch-group">
                            <div class="patch-group-name">${groupName}</div>
                            <ul class="patch-bullets">
                                ${itemsHtml}
                            </ul>
                        </div>
                    `;
                });
            }
            
            sectionsHtml += `
                <div class="patch-section">
                    <h2 class="patch-section-title">${secTitle}</h2>
                    ${secIntro ? `<p class="patch-section-intro">${secIntro}</p>` : ''}
                    ${groupsHtml}
                </div>
            `;
        });
    }
    
    container.innerHTML = `
        <!-- Cyber Banner Container -->
        <div class="patch-banner-container">
            <img src="${update.bannerImage}" class="patch-banner-img" alt="${titleText}" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80'">
            <div class="patch-banner-overlay"></div>
            <!-- Brackets HUD Frame -->
            <div class="patch-hud-frame">
                <div class="patch-hud-frame-tr"></div>
                <div class="patch-hud-frame-bl"></div>
            </div>
            <!-- Floating cyber Version badge -->
            <div class="patch-banner-version-badge">${update.id}</div>
        </div>
        
        <!-- Header Info -->
        <div class="patch-info-container">
            <h1 class="patch-title">${titleText}</h1>
            <p class="patch-subtitle">${subtitleText}</p>
            <div class="patch-meta">
                <span class="patch-category">${categoryText}</span>
                <span class="patch-meta-divider">|</span>
                <span class="patch-meta-author">${update.author}</span>
                <span class="patch-meta-divider">|</span>
                <span class="patch-meta-date">${update.date}</span>
            </div>
            <div class="patch-info-divider"></div>
        </div>
        
        <!-- Body Content -->
        <div class="patch-body-container">
            ${sectionsHtml}
        </div>
    `;
}

window.updateUpdatesLanguage = function(lang) {
    if (updatesData.length === 0) return;
    renderUpdateDetails(activeUpdateIndex);
    renderUpdatesSidebar();
    const toast = document.getElementById('updates-notification-toast');
    if (toast && toast.classList.contains('active')) {
        const latestUpdate = updatesData[0];
        showUpdatesToast(latestUpdate);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const btnUpdates = document.getElementById('btn-updates');
    const modalUpdates = document.getElementById('updates-modal');
    const btnCloseUpdates = document.getElementById('btn-updates-close');
    
    const toast = document.getElementById('updates-notification-toast');
    const btnToastRead = document.getElementById('btn-update-toast-read');
    const btnToastClose = document.getElementById('btn-update-toast-close');
    fetchUpdates();
    
    if (btnUpdates && modalUpdates) {
        btnUpdates.addEventListener('click', () => {
            modalUpdates.classList.add('active');
            document.body.classList.add('no-scroll');
            markLatestUpdateAsRead();
            renderUpdatesSidebar();
            renderUpdateDetails(0);
        });
    }
    
    if (btnCloseUpdates && modalUpdates) {
        btnCloseUpdates.addEventListener('click', () => {
            modalUpdates.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        modalUpdates.addEventListener('click', (e) => {
            if (e.target === modalUpdates) {
                modalUpdates.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
    
    if (btnToastRead && toast && modalUpdates) {
        btnToastRead.addEventListener('click', () => {
            toast.classList.remove('active');
            modalUpdates.classList.add('active');
            document.body.classList.add('no-scroll');
            markLatestUpdateAsRead();
            renderUpdatesSidebar();
            renderUpdateDetails(0);
        });
    }
    
    if (btnToastClose && toast) {
        btnToastClose.addEventListener('click', () => {
            toast.classList.remove('active');
            markLatestUpdateAsRead();
        });
    }
});
