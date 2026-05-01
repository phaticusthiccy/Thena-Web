(function () {
    'use strict';

    const i18n = {
        en: {
            navCta: 'Launch App',
            navLinkImages: 'Images',
            navLinkChat: 'Chat',
            navLinkEditor: 'Editor',
            navLinkStories: 'Stories',
            navLinkTech: 'Tech',
            heroBadge: 'Introducing Thena',
            heroSubtitle: '<strong>AI Image Generation</strong> · <strong>Roleplay Chat</strong> · <strong>Image Editor</strong><br>All in one place. No installation needed.',
            heroBtn: 'Start Creating',
            heroGithub: 'View on GitHub',
            scrollExplore: 'Scroll to explore',

            feat1Badge: 'Image Generation',
            feat1Title: 'Turn words into <span class="text-gradient-purple">stunning visuals.</span>',
            feat1Desc: 'Access multiple AI models — from Photorealism to Anime, Cinematic to Abstract. With Magic Wand enhancement, live prompt preview, and creative parameters, your imagination has no limits.',
            feat1Tag: 'AI Image Generator',

            feat2Badge: 'AI Roleplay Chat',
            feat2Title: 'Characters that <span class="text-gradient-green">remember you.</span>',
            feat2Desc: 'Engage with deeply crafted AI personas. Dynamic system prompts adapt to your profile — name, age, personality. Every conversation is unique, every story unfolds differently.',
            feat2Tag: 'Roleplay Chat',

            feat3Badge: 'Image Editor',
            feat3Title: 'Edit like a <span class="text-gradient-orange">professional.</span>',
            feat3Desc: 'Instagram-like filters, fine-tuning controls, crop & resize — all within the browser. Apply presets with a tap, annotate with markup tools, and prepare your art for any platform.',
            feat3Tag: 'Image Editor',

            feat4Badge: 'AI Stories',
            feat4Title: 'Immersive Webtoon <span class="text-gradient-red">Reader.</span>',
            feat4Desc: 'Dive into curated visual stories with a dedicated reading interface. Experience dynamic chapter navigation, lazy-loaded image sequences, and whimsical end-of-episode animations.',
            feat4Tag: 'Webtoon Reader',

            feat5Badge: 'Gallery & Management',
            feat5Title: 'Organize your <span class="text-gradient-blue">masterpieces.</span>',
            feat5Desc: 'Filter by model, ratio, or date. Sort newest to oldest. Multi-select for batch operations. Drag-to-dismiss gestures. Your gallery, your way — powered by local-first architecture.',
            feat5Tag: 'Gallery',

            feat6Badge: 'AI Outpaint',
            feat6Title: 'Expand your <span class="text-gradient-purple">horizons.</span>',
            feat6Desc: 'Seamlessly extend any image beyond its original borders. Select specific directions, use intuitive size presets, and watch AI intelligently fill the canvas with perfectly matching context.',
            feat6Tag: 'AI Outpaint',

            specFastMode: '⚡ Fast Mode', specCreativeMode: '🎨 Creative Mode',
            specHighRes: '💎 HighRes', specPromptMagic: '✨ Prompt Magic',
            specMovieFilter: '🎬 Movie Filter', specDenseMode: '💠 Dense Mode',
            specElements: '🧩 LoRA Elements', specSynapse: '🧠 Synapse AI',
            specDeepLore: '🎭 Deep Lore', specStoryAwareness: '🧠 Story Awareness',
            specUserProfiles: '👤 User Profiles', specChatImageGen: '🖼️ Image Generation',
            specContentMod: '🔒 Content Moderation',
            specInstantPresets: '🎨 Instant Presets', specFineTuning: '🔧 Fine-Tuning',
            specCropResize: '✂️ Crop & Resize', specMarkupTools: '✍️ Markup Tools',
            specLocalSearch: '🔍 Localized Search', specOutpaint: '🖌️ AI Outpaint',
            specWebtoon: '📖 Visual Reader', specLazyLoad: '⚡ Lazy Loading',
            specStatus: '🔄 Status Tracking', specMultilingual: '💬 Multilingual UI',
            specSmartSearch: '🔍 Smart Search', specAdvancedFilters: '📊 Advanced Filters',
            specFavorites: '⭐ Favorites', specMultiSelect: '✅ Multi-Select',
            specDragDismiss: '👆 Drag to Dismiss',
            specDirectional: '⬅️ Directional Expansion', specQuickSize: '📐 Quick Size Presets',
            specSmartFill: '🪄 Smart Fill', specSeamless: '🔄 Seamless Blending',

            statModels: 'AI Models', statChars: 'AI Characters',
            statPresets: 'Editor Presets', statTotalUsage: 'Total Artworks',
            statCreativity: 'Creativity',

            divider1Big: '<span class="text-gradient-green">No frameworks.</span><br>Pure performance.',
            divider1Sub: 'Built with Vanilla JavaScript.',
            divider2Big: 'Your data stays<br><span class="text-gradient-blue">on your device.</span>',
            divider2Sub: 'IndexedDB-powered. No hidden uploads. Zero tracking. Complete privacy.',

            techLabel: 'Built With',
            techTitle: 'The tech behind<br>the magic.',
            techDesc: 'No React. No Vue. No Next.js. Just raw browser APIs pushed to their absolute limits.',
            techHtml: 'Semantic structure & DOM layout',
            techCss: 'Animations, Glassmorphism, Responsive Design',
            techJs: 'Core logic & API communication',
            techIdb: 'Persistent local storage',
            techAudio: 'Real-time audio synthesis',
            techCanvas: 'Image processing & editing',
            techSw: 'PWA & offline capabilities',

            finalTitle: 'Ready to<br><span class="gradient-text">create?</span>',
            finalSub: 'No downloads. No signups. Just open and start creating.',
            finalBtn: 'Launch Thena',
            finalApi: 'Get Free API Key',

            introWords: 'A|browser-based*|AI|creative|suite|that|pushes|the|boundaries*|of|what\'s|possible|—|entirely|client-side.*',
            footer: 'Developed by <a href="https://t.me/phaticusthiccy" target="_blank">@phaticusthiccy</a> &nbsp;·&nbsp; <a href="https://github.com/phaticusthiccy/Thena-Web" target="_blank">GitHub</a> &nbsp;·&nbsp; MIT License'
        },
        tr: {
            navCta: 'Uygulamayı Aç',
            navLinkImages: 'Görseller',
            navLinkChat: 'Sohbet',
            navLinkEditor: 'Editör',
            navLinkStories: 'Hikayeler',
            navLinkTech: 'Teknoloji',
            heroBadge: 'Thena ile Tanışın',
            heroSubtitle: '<strong>AI Görsel Üretimi</strong> · <strong>Roleplay Sohbet</strong> · <strong>Görsel Düzenleyici</strong><br>Hepsi tek bir yerde. Kurulum gerektirmez.',
            heroBtn: 'Oluşturmaya Başla',
            heroGithub: 'GitHub\'da Görüntüle',
            scrollExplore: 'Keşfetmek için kaydır',

            feat1Badge: 'Görsel Üretimi',
            feat1Title: 'Kelimeleri <span class="text-gradient-purple">büyüleyici görsellere</span> dönüştür.',
            feat1Desc: 'Fotogerçekçilikten Anime\'ye, Sinematikten Soyuta — birden fazla AI modeline erişin. Sihirli Değnek geliştirmesi, canlı prompt önizleme ve yaratıcı parametrelerle hayal gücünüzün sınırı yok.',
            feat1Tag: 'AI Görsel Üretici',

            feat2Badge: 'AI Roleplay Sohbet',
            feat2Title: 'Sizi <span class="text-gradient-green">hatırlayan</span> karakterler.',
            feat2Desc: 'Derinlemesine hazırlanmış AI karakterleriyle etkileşime geçin. Dinamik sistem promptları profilinize uyum sağlar — isim, yaş, kişilik. Her sohbet benzersiz, her hikaye farklı gelişir.',
            feat2Tag: 'Roleplay Sohbet',

            feat3Badge: 'Görsel Düzenleyici',
            feat3Title: 'Bir <span class="text-gradient-orange">profesyonel</span> gibi düzenle.',
            feat3Desc: 'Instagram tarzı filtreler, ince ayar kontrolleri, kırpma ve yeniden boyutlandırma — hepsi tarayıcı içinde. Tek dokunuşla ön ayar uygulayın, işaretleme araçlarıyla açıklama ekleyin.',
            feat3Tag: 'Görsel Editör',

            feat4Badge: 'Yapay Zeka Hikayeleri',
            feat4Title: 'Sürükleyici Webtoon <span class="text-gradient-red">Okuyucu.</span>',
            feat4Desc: 'Dikkatinizi dağıtmayan özel bir okuma arayüzü ile görsel hikayelere dalın. Dinamik bölüm navigasyonu, hızlı yüklenen görseller ve bölüm sonu animasyonlarını deneyimleyin.',
            feat4Tag: 'Webtoon Okuyucu',

            feat5Badge: 'Galeri & Yönetim',
            feat5Title: '<span class="text-gradient-blue">Şaheserlerinizi</span> düzenleyin.',
            feat5Desc: 'Modele, orana veya tarihe göre filtreleyin. En yeniden en eskiye sıralayın. Toplu işlemler için çoklu seçim. Kaydırarak kapatma hareketleri. Galeriniz, sizin kurallarınız.',
            feat5Tag: 'Galeri',

            feat6Badge: 'AI Outpaint',
            feat6Title: 'Ufkunuzu <span class="text-gradient-purple">genişletin.</span>',
            feat6Desc: 'Herhangi bir görüntüyü orijinal sınırlarının ötesine sorunsuzca genişletin. Belirli yönleri seçin, akıllı boyut ön ayarlarını kullanın ve yapay zekanın tuvali mükemmel uyumlu bağlamla doldurmasını izleyin.',
            feat6Tag: 'AI Outpaint',

            specFastMode: '⚡ Hızlı Mod', specCreativeMode: '🎨 Yaratıcı Mod',
            specHighRes: '💎 Yüksek Çözünürlük', specPromptMagic: '✨ Prompt Sihri',
            specMovieFilter: '🎬 Film Filtresi', specDenseMode: '💠 Yoğun Mod',
            specElements: '🧩 LoRA Elementleri', specSynapse: '🧠 Synapse AI',
            specDeepLore: '🎭 Derin Hikaye', specStoryAwareness: '🧠 Hikaye Farkındalığı',
            specUserProfiles: '👤 Kullanıcı Profilleri', specChatImageGen: '🖼️ Görsel Üretimi',
            specContentMod: '🔒 İçerik Moderasyonu',
            specInstantPresets: '🎨 Anında Ön Ayarlar', specFineTuning: '🔧 İnce Ayar',
            specCropResize: '✂️ Kırp ve Yeniden Boyutlandır', specMarkupTools: '✍️ İşaretleme Araçları',
            specLocalSearch: '🔍 Yerel Arama', specOutpaint: '🖌️ AI Outpaint',
            specWebtoon: '📖 Görsel Okuyucu', specLazyLoad: '⚡ Tembel Yükleme',
            specStatus: '🔄 Durum Takibi', specMultilingual: '💬 Çok Dilli Arayüz',
            specSmartSearch: '🔍 Akıllı Arama', specAdvancedFilters: '📊 Gelişmiş Filtreler',
            specFavorites: '⭐ Favoriler', specMultiSelect: '✅ Çoklu Seçim',
            specDragDismiss: '👆 Kaydırarak Kapat',
            specDirectional: '⬅️ Yönlü Genişletme', specQuickSize: '📐 Hızlı Boyut',
            specSmartFill: '🪄 Akıllı Doldurma', specSeamless: '🔄 Kusursuz Kaynaştırma',

            statModels: 'AI Modeli', statChars: 'AI Karakter',
            statPresets: 'Editör Ön Ayarı', statTotalUsage: 'Toplam Görsel',
            statCreativity: 'Yaratıcılık',

            divider1Big: '<span class="text-gradient-green">Framework yok.</span><br>Saf performans.',
            divider1Sub: 'Vanilla JavaScript ile inşa edildi.',
            divider2Big: 'Verileriniz <span class="text-gradient-blue">cihazınızda</span> kalır.',
            divider2Sub: 'IndexedDB destekli. Gizli yükleme yok. Sıfır takip. Tam gizlilik.',

            techLabel: 'Teknolojiler',
            techTitle: 'Sihrin arkasındaki<br>teknoloji.',
            techDesc: 'React yok. Vue yok. Next.js yok. Sadece tarayıcı API\'lerinin sınırlarını zorlayan ham kod.',
            techHtml: 'Semantik yapı & DOM düzeni',
            techCss: 'Animasyonlar, Glassmorphism, Duyarlı Tasarım',
            techJs: 'Temel mantık & API iletişimi',
            techIdb: 'Kalıcı yerel depolama',
            techAudio: 'Gerçek zamanlı ses sentezi',
            techCanvas: 'Görsel işleme & düzenleme',
            techSw: 'PWA & çevrimdışı yetenekler',

            finalTitle: 'Oluşturmaya<br><span class="gradient-text">hazır mısın?</span>',
            finalSub: 'İndirme yok. Kayıt yok. Sadece aç ve oluşturmaya başla.',
            finalBtn: 'Thena\'yı Başlat',
            finalApi: 'Ücretsiz API Key Al',

            introWords: 'Tarayıcı|tabanlı*|bir|AI|yaratıcı|paketi|—|mümkün|olanın|sınırlarını*|zorluyor|—|tamamen|istemci*|tarafında.',
            footer: 'Geliştiren <a href="https://t.me/phaticusthiccy" target="_blank">@phaticusthiccy</a> &nbsp;·&nbsp; <a href="https://github.com/phaticusthiccy/Thena-Web" target="_blank">GitHub</a> &nbsp;·&nbsp; MIT Lisansı'
        }
    };

    let currentLang = localStorage.getItem('thena-trailer-lang') || 'en';

    function applyLang(lang) {
        currentLang = lang;
        localStorage.setItem('thena-trailer-lang', lang);
        const labelEl = document.getElementById('lang-label');
        if (labelEl) labelEl.textContent = lang === 'en' ? 'TR' : 'EN';
        document.documentElement.lang = lang === 'en' ? 'en' : 'tr';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (!i18n[lang][key]) return;
            if (key === 'introWords') {
                buildWordReveal(el, i18n[lang][key]);
            } else {
                el.innerHTML = i18n[lang][key];
            }
        });
    }

    function buildWordReveal(el, wordsStr) {
        el.innerHTML = '';
        el.classList.remove('visible');
        wordsStr.split('|').forEach((w, i) => {
            const span = document.createElement('span');
            span.className = w.endsWith('*') ? 'word highlight' : 'word';
            span.textContent = w.replace(/\*$/, '') + ' ';
            span.style.transitionDelay = (i * 0.065) + 's';
            el.appendChild(span);
        });
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { el.classList.add('visible'); });
        });
    }

    const introEl = document.getElementById('intro-text');
    if (introEl) buildWordReveal(introEl, i18n[currentLang].introWords);

    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            applyLang(currentLang === 'en' ? 'tr' : 'en');
        });
    }

    if (currentLang !== 'en') applyLang(currentLang);

    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        let cx = 0, cy = 0;
        let rx = 0, ry = 0;
        document.addEventListener('mousemove', e => {
            cx = e.clientX;
            cy = e.clientY;
        }, { passive: true });

        (function animateCursor() {
            rx += (cx - rx) * 0.1;
            ry += (cy - ry) * 0.1;
            cursorGlow.style.left = rx + 'px';
            cursorGlow.style.top  = ry + 'px';
            requestAnimationFrame(animateCursor);
        })();
    }

    const particlesEl = document.getElementById('particles');
    if (particlesEl) {
        for (let i = 0; i < 90; i++) {
            const isStar = Math.random() < 0.09;
            const p = document.createElement('div');
            p.className = isStar ? 'particle particle-star' : 'particle';
            p.style.left = Math.random() * 100 + '%';
            const dur = 9 + Math.random() * 14;
            const del = -(Math.random() * dur);
            p.style.animationDuration = dur + 's';
            p.style.animationDelay = del + 's';
            if (isStar) {
                const inner = document.createElement('span');
                inner.textContent = ['✦', '✧', '⋆'][Math.floor(Math.random() * 3)];
                inner.style.fontSize = (6 + Math.random() * 7) + 'px';
                inner.style.animation = `starTwinkle ${1.5 + Math.random() * 2}s ease-in-out infinite`;
                inner.style.display = 'inline-block';
                p.appendChild(inner);
            } else {
                const sz = (1 + Math.random() * 2.5) + 'px';
                p.style.width = sz;
                p.style.height = sz;
            }
            particlesEl.appendChild(p);
        }
    }

    const nav = document.getElementById('trailer-nav');
    window.addEventListener('scroll', () => {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });

    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .word-reveal');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('word-reveal')) {
                    entry.target.querySelectorAll('.word').forEach((w, idx) => {
                        w.style.transitionDelay = (idx * 0.065) + 's';
                    });
                }
            }
        });
    }, { root: null, rootMargin: '0px 0px -70px 0px', threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));

    function animateCounter(el, target, suffix) {
        el.dataset.animated = 'true';
        el.dataset.suffix = suffix;
        let current = 0;
        const duration = 1600;
        const startTime = performance.now();
        const easeOut = t => 1 - Math.pow(1 - t, 3);

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOut(progress);
            current = Math.round(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    const counters = document.querySelectorAll('.counter[data-target]');
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const suffix = el.getAttribute('data-suffix') !== null
                    ? el.getAttribute('data-suffix')
                    : '+';
                animateCounter(el, target, suffix);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

    const featureVisuals = document.querySelectorAll('.feature-visual');
    let ticking = false;

    function parallaxUpdate() {
        const wh = window.innerHeight;
        featureVisuals.forEach(v => {
            const rect = v.getBoundingClientRect();
            if (rect.top < wh && rect.bottom > 0) {
                const progress = (wh - rect.top) / (wh + rect.height);
                const wrapper = v.querySelector('.feature-img-wrapper');
                if (wrapper) {
                    wrapper.style.transform = `translateY(${(progress - 0.5) * -24}px)`;
                }
            }
        });
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) { requestAnimationFrame(parallaxUpdate); ticking = true; }
    }, { passive: true });

    const heroContent = document.querySelector('.hero-content');
    const hero = document.getElementById('hero');

    window.addEventListener('scroll', () => {
        if (!hero || !heroContent) return;
        const progress = Math.min(window.scrollY / hero.offsetHeight, 1);
        heroContent.style.opacity = 1 - progress * 1.6;
        heroContent.style.transform = `translateY(${progress * 70}px) scale(${1 - progress * 0.08})`;
    }, { passive: true });

    function setCounter(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
        el.setAttribute('data-target', value);
        if (el.dataset.animated === 'true') {
            const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : '+';
            animateCounter(el, value, suffix);
        }
    }

    async function fetchDynamicStats() {
        const [usageRes, modelsRes, aicRes, presetsRes] = await Promise.allSettled([
            fetch('https://create.thena.workers.dev/totalUsage'),
            fetch('https://create.thena.workers.dev/models?type=all'),
            fetch('https://create.thena.workers.dev/aic'),
            fetch('https://create.thena.workers.dev/presets'),
        ]);

        if (usageRes.status === 'fulfilled' && usageRes.value.ok) {
            const text = await usageRes.value.text();
            const count = parseInt(text.trim());
            if (!isNaN(count)) {
                setCounter('total-usage-counter', count);
                setCounter('hero-usage-counter', count);
            }
        }

        if (modelsRes.status === 'fulfilled' && modelsRes.value.ok) {
            const data = await modelsRes.value.json();
            if (Array.isArray(data)) {
                const count = data.length;
                setCounter('stat-models-counter', count);
                setCounter('hero-models-counter', count);
            }
        }

        if (aicRes.status === 'fulfilled' && aicRes.value.ok) {
            const data = await aicRes.value.json();
            if (Array.isArray(data)) {
                setCounter('stat-chars-counter', data.length);
                setCounter('hero-chars-counter', data.length);
            }
        }

        if (presetsRes.status === 'fulfilled' && presetsRes.value.ok) {
            const data = await presetsRes.value.json();
            if (Array.isArray(data)) {
                setCounter('stat-presets-counter', data.length);
            }
        }
    }

    fetchDynamicStats();

})();