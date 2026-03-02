(function () {
    'use strict';

    const i18n = {
        en: {
            navCta: 'Launch App', heroBadge: 'Introducing Thena',
            heroSubtitle: '<strong>AI Image Generation</strong> · <strong>Roleplay Chat</strong> · <strong>Image Editor</strong><br>All in one place. No installation needed.',
            heroBtn: 'Start Creating', heroGithub: 'View on GitHub', scrollExplore: 'Scroll to explore',
            feat1Badge: 'Image Generation',
            feat1Title: 'Turn words into <span class="text-gradient-purple">stunning visuals.</span>',
            feat1Desc: 'Access multiple AI models — from Photorealism to Anime, Cinematic to Abstract. With Magic Wand enhancement, live prompt preview, and creative parameters, your imagination has no limits.',
            divider1Big: '<span class="text-gradient-green">No frameworks.</span><br>Pure performance.',
            divider1Sub: 'Built with Vanilla JavaScript. Every pixel intentional.',
            feat2Badge: 'AI Roleplay Chat',
            feat2Title: 'Characters that <span class="text-gradient-green">remember you.</span>',
            feat2Desc: 'Engage with deeply crafted AI personas. Dynamic system prompts adapt to your profile — name, age, personality. Every conversation is unique, every story unfolds differently.',
            statModels: 'AI Models', statChars: 'AI Characters', statPresets: 'Editor Presets', statCreativity: 'Creativity',
            feat3Badge: 'Image Editor',
            feat3Title: 'Edit like a <span class="text-gradient-orange">professional.</span>',
            feat3Desc: 'Instagram-like filters, fine-tuning controls, crop & resize — all within the browser. Apply presets with a tap, annotate with markup tools, and prepare your art for any platform.',
            divider2Big: 'Your data stays<br><span class="text-gradient-blue">on your device.</span>',
            divider2Sub: 'IndexedDB-powered. No hidden uploads. Zero tracking. Complete privacy.',
            feat4Badge: 'Gallery & Management',
            feat4Title: 'Organize your <span class="text-gradient-blue">masterpieces.</span>',
            feat4Desc: 'Filter by model, ratio, or date. Sort newest to oldest. Multi-select for batch operations. Drag-to-dismiss gestures. Your gallery, your way — powered by local-first architecture.',
            techLabel: 'Built With', techTitle: 'The tech behind<br>the magic.',
            techDesc: 'No React. No Vue. No Next.js. Just raw browser APIs pushed to their absolute limits.',
            finalTitle: 'Ready to<br><span class="gradient-text">create?</span>',
            finalSub: 'No downloads. No signups. Just open and start creating.',
            finalBtn: 'Launch Thena', finalApi: 'Get Free API Key',
            introWords: 'A|browser-based*|AI|creative|suite|that|pushes|the|boundaries*|of|what\'s|possible|—|entirely|client-side.*',
            techHtml: 'Semantic structure & DOM layout', techCss: 'Animations, Glassmorphism, Responsive Design',
            techJs: 'Core logic & API communication', techIdb: 'Persistent local storage',
            techAudio: 'Real-time audio synthesis', techCanvas: 'Image processing & editing',
            techSw: 'PWA & offline capabilities',
            footer: 'Developed by <a href="https://t.me/phaticusthiccy" target="_blank">@phaticusthiccy</a> &nbsp;·&nbsp; <a href="https://github.com/phaticusthiccy/Thena-Web" target="_blank">GitHub</a> &nbsp;·&nbsp; MIT License'
        },
        tr: {
            navCta: 'Uygulamayı Aç', heroBadge: 'Thena ile Tanışın',
            heroSubtitle: '<strong>AI Görsel Üretimi</strong> · <strong>Roleplay Sohbet</strong> · <strong>Görsel Düzenleyici</strong><br>Hepsi tek bir yerde. Kurulum gerektirmez.',
            heroBtn: 'Oluşturmaya Başla', heroGithub: 'GitHub\'da Görüntüle', scrollExplore: 'Keşfetmek için kaydır',
            feat1Badge: 'Görsel Üretimi',
            feat1Title: 'Kelimeleri <span class="text-gradient-purple">büyüleyici görsellere</span> dönüştür.',
            feat1Desc: 'Fotogerçekçilikten Anime\'ye, Sinematikten Soyuta — birden fazla AI modeline erişin. Sihirli Değnek geliştirmesi, canlı prompt önizleme ve yaratıcı parametrelerle hayal gücünüzün sınırı yok.',
            divider1Big: '<span class="text-gradient-green">Framework yok.</span><br>Saf performans.',
            divider1Sub: 'Vanilla JavaScript ile inşa edildi. Her piksel kasıtlı.',
            feat2Badge: 'AI Roleplay Sohbet',
            feat2Title: 'Sizi <span class="text-gradient-green">hatırlayan</span> karakterler.',
            feat2Desc: 'Derinlemesine hazırlanmış AI karakterleriyle etkileşime geçin. Dinamik sistem promptları profilinize uyum sağlar — isim, yaş, kişilik. Her sohbet benzersiz, her hikaye farklı gelişir.',
            statModels: 'AI Modeli', statChars: 'AI Karakter', statPresets: 'Editör Ön Ayarı', statCreativity: 'Yaratıcılık',
            feat3Badge: 'Görsel Düzenleyici',
            feat3Title: 'Bir <span class="text-gradient-orange">profesyonel</span> gibi düzenle.',
            feat3Desc: 'Instagram tarzı filtreler, ince ayar kontrolleri, kırpma ve yeniden boyutlandırma — hepsi tarayıcı içinde. Tek dokunuşla ön ayar uygulayın, işaretleme araçlarıyla açıklama ekleyin.',
            divider2Big: 'Verileriniz <span class="text-gradient-blue">cihazınızda</span> kalır.',
            divider2Sub: 'IndexedDB destekli. Gizli yükleme yok. Sıfır takip. Tam gizlilik.',
            feat4Badge: 'Galeri & Yönetim',
            feat4Title: '<span class="text-gradient-blue">Şaheserlerinizi</span> düzenleyin.',
            feat4Desc: 'Modele, orana veya tarihe göre filtreleyin. En yeniden en eskiye sıralayın. Toplu işlemler için çoklu seçim. Kaydırarak kapatma hareketleri. Galeriniz, sizin kurallarınız.',
            techLabel: 'Teknolojiler', techTitle: 'Sihrin arkasındaki<br>teknoloji.',
            techDesc: 'React yok. Vue yok. Next.js yok. Sadece tarayıcı API\'lerinin sınırlarını zorlayan ham kod.',
            finalTitle: 'Oluşturmaya<br><span class="gradient-text">hazır mısın?</span>',
            finalSub: 'İndirme yok. Kayıt yok. Sadece aç ve oluşturmaya başla.',
            finalBtn: 'Thena\'yı Başlat', finalApi: 'Ücretsiz API Key Al',
            introWords: 'Tarayıcı|tabanlı*|bir|AI|yaratıcı|paketi|—|mümkün|olanın|sınırlarını*|zorluyor|—|tamamen|istemci*|tarafında.',
            techHtml: 'Semantik yapı & DOM düzeni', techCss: 'Animasyonlar, Glassmorphism, Duyarlı Tasarım',
            techJs: 'Temel mantık & API iletişimi', techIdb: 'Kalıcı yerel depolama',
            techAudio: 'Gerçek zamanlı ses sentezi', techCanvas: 'Görsel işleme & düzenleme',
            techSw: 'PWA & çevrimdışı yetenekler',
            footer: 'Geliştiren <a href="https://t.me/phaticusthiccy" target="_blank">@phaticusthiccy</a> &nbsp;·&nbsp; <a href="https://github.com/phaticusthiccy/Thena-Web" target="_blank">GitHub</a> &nbsp;·&nbsp; MIT Lisansı'
        }
    };

    let currentLang = localStorage.getItem('thena-trailer-lang') || 'en';

    function applyLang(lang) {
        currentLang = lang;
        localStorage.setItem('thena-trailer-lang', lang);
        document.getElementById('lang-label').textContent = lang === 'en' ? 'TR' : 'EN';
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
            span.style.transitionDelay = (i * 0.06) + 's';
            el.appendChild(span);
        });
        requestAnimationFrame(() => { requestAnimationFrame(() => { el.classList.add('visible'); }); });
    }

    buildWordReveal(document.getElementById('intro-text'), i18n[currentLang].introWords);

    document.getElementById('lang-toggle').addEventListener('click', () => {
        applyLang(currentLang === 'en' ? 'tr' : 'en');
    });

    if (currentLang !== 'en') applyLang(currentLang);

    const particlesEl = document.getElementById('particles');
    if (particlesEl) {
        for (let i = 0; i < 100; i++) {
            const isStar = Math.random() < 0.08;
            const p = document.createElement('div');
            p.className = isStar ? 'particle particle-star' : 'particle';
            p.style.left = Math.random() * 100 + '%';
            
            const dur = 8 + Math.random() * 12;
            const del = -(Math.random() * dur);
            
            p.style.animationDuration = dur + 's';
            p.style.animationDelay = del + 's';
            
            if (isStar) {
                const inner = document.createElement('span');
                inner.textContent = '✦';
                inner.style.fontSize = (6 + Math.random() * 6) + 'px';
                inner.style.animation = 'starTwinkle 2s ease-in-out infinite';
                inner.style.display = 'inline-block';
                p.appendChild(inner);
            } else {
                p.style.width = p.style.height = (1 + Math.random() * 2) + 'px';
            }
            particlesEl.appendChild(p);
        }
    }

    const nav = document.getElementById('trailer-nav');
    let lastScrollY = 0;
    window.addEventListener('scroll', () => {
        const sy = window.scrollY;
        nav.classList.toggle('scrolled', sy > 60);
        lastScrollY = sy;
    }, { passive: true });

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .word-reveal');
    const observerOptions = { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.15 };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('word-reveal')) {
                    entry.target.classList.add('visible');
                    const words = entry.target.querySelectorAll('.word');
                    words.forEach((word, idx) => { word.style.transitionDelay = (idx * 0.06) + 's'; });
                } else {
                    entry.target.classList.add('visible');
                }
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    const counters = document.querySelectorAll('.counter[data-target]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                let current = 0;
                const increment = Math.ceil(target / 60);
                const suffix = el.getAttribute('data-suffix') || '+';
                const updateCounter = () => {
                    current += increment;
                    if (current >= target) { el.textContent = target + suffix; }
                    else { el.textContent = current + suffix; requestAnimationFrame(updateCounter); }
                };
                updateCounter();
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
                v.querySelector('.feature-img-wrapper').style.transform = `translateY(${(progress - 0.5) * -30}px)`;
            }
        });
        ticking = false;
    }
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(parallaxUpdate); ticking = true; } }, { passive: true });

    const heroContent = document.querySelector('.hero-content');
    const hero = document.getElementById('hero');
    window.addEventListener('scroll', () => {
        if (!hero) return;
        const progress = Math.min(window.scrollY / hero.offsetHeight, 1);
        if (heroContent) {
            heroContent.style.opacity = 1 - progress * 1.5;
            heroContent.style.transform = `translateY(${progress * 80}px) scale(${1 - progress * 0.1})`;
        }
    }, { passive: true });

})();