(function () {
    'use strict';

    function tutT(key) {
        try {
            var lang = localStorage.getItem('thena-language') || 'en';
            return (translations[lang] && translations[lang][key]) || (translations['en'][key]) || key;
        } catch (e) { return key; }
    }

    function tutStep(num, total) {
        return tutT('tutorialStep').replace('{0}', num).replace('{1}', total);
    }

    function tutPlayLetterSound(index) {
        if (typeof isMuted !== 'undefined' && isMuted) return;
        try {
            var ctx = typeof audioCtx !== 'undefined' ? audioCtx : new (window.AudioContext || window.webkitAudioContext)();
            if (ctx.state === 'suspended') ctx.resume();

            var baseFreqs = [65, 75, 85, 95, 110];
            var freq = baseFreqs[index] || 80;
            var osc = ctx.createOscillator();
            var gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq * 2.2, ctx.currentTime + 0.45);
            gain.gain.setValueAtTime(0.22, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.58);

            var buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.08), ctx.sampleRate);
            var data = buf.getChannelData(0);
            for (var i = 0; i < data.length; i++) {
                data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) * 0.25;
            }
            var src = ctx.createBufferSource();
            var gGlitch = ctx.createGain();
            src.buffer = buf;
            gGlitch.gain.setValueAtTime(0.3, ctx.currentTime);
            gGlitch.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
            src.connect(gGlitch);
            gGlitch.connect(ctx.destination);
            src.start(ctx.currentTime + 0.02);

            var shimOsc = ctx.createOscillator();
            var shimGain = ctx.createGain();
            shimOsc.type = 'triangle';
            shimOsc.frequency.setValueAtTime(2400 + index * 200, ctx.currentTime);
            shimOsc.frequency.exponentialRampToValueAtTime(4000 + index * 300, ctx.currentTime + 0.3);
            shimGain.gain.setValueAtTime(0.06, ctx.currentTime);
            shimGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
            shimOsc.connect(shimGain);
            shimGain.connect(ctx.destination);
            shimOsc.start(ctx.currentTime + 0.05);
            shimOsc.stop(ctx.currentTime + 0.38);
        } catch (e) {}
    }

    function tutPlayFinalSound() {
        if (typeof isMuted !== 'undefined' && isMuted) return;
        try {
            var ctx = typeof audioCtx !== 'undefined' ? audioCtx : new (window.AudioContext || window.webkitAudioContext)();
            if (ctx.state === 'suspended') ctx.resume();
            [[196, 0], [247, 0.08], [330, 0.16], [392, 0.24]].forEach(function(pair) {
                var f = pair[0], d = pair[1];
                var o = ctx.createOscillator();
                var g = ctx.createGain();
                o.type = 'sine';
                o.frequency.setValueAtTime(f, ctx.currentTime + d);
                o.frequency.exponentialRampToValueAtTime(f * 1.5, ctx.currentTime + d + 0.9);
                g.gain.setValueAtTime(0.0001, ctx.currentTime + d);
                g.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + d + 0.2);
                g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + d + 0.9);
                o.connect(g);
                g.connect(ctx.destination);
                o.start(ctx.currentTime + d);
                o.stop(ctx.currentTime + d + 1.0);
            });
        } catch (e) {}
    }

    function finishTutorial() {
        localStorage.setItem('tutorialSeen', 'true');

        var appModal = document.getElementById('app-switch-modal');
        if (appModal) appModal.classList.remove('active');

        var creditsModal = document.getElementById('credits-modal');
        if (creditsModal) {
            var closeBtn = document.getElementById('btn-close-credits');
            if (closeBtn) closeBtn.click();
        }

        var spl   = document.getElementById('tutorial-spotlight-overlay');
        var frame = document.getElementById('tutorial-spotlight-frame');
        var bbl   = document.getElementById('tutorial-bubble');

        if (bbl) {
            bbl.classList.remove('tut-bbl-visible');
            setTimeout(function () { if (bbl.parentNode) bbl.parentNode.removeChild(bbl); }, 400);
        }
        if (frame) {
            frame.style.opacity = '0';
            setTimeout(function () { if (frame.parentNode) frame.parentNode.removeChild(frame); }, 500);
        }
        if (spl) {
            spl.classList.remove('tut-spl-visible');
            setTimeout(function () { if (spl.parentNode) spl.parentNode.removeChild(spl); }, 500);
        }

        setTimeout(function () {
            if (typeof playSuccessSound === 'function') playSuccessSound();

            var cel = document.createElement('div');
            cel.id = 'tut-celebration';
            cel.innerHTML =
                '<div class="tut-cel-bg"></div>' +
                '<div class="tut-cel-scene">' +
                    '<div class="tut-cel-ring tut-cel-ring1"></div>' +
                    '<div class="tut-cel-ring tut-cel-ring2"></div>' +
                    '<div class="tut-cel-ring tut-cel-ring3"></div>' +
                    '<div class="tut-cel-trophy">🏆</div>' +
                    '<div class="tut-cel-particles" id="tut-cel-particles"></div>' +
                    '<div class="tut-cel-title" id="tut-cel-title"></div>' +
                    '<div class="tut-cel-sub" id="tut-cel-sub"></div>' +
                    '<button class="tut-cel-btn" id="tut-cel-btn"></button>' +
                '</div>';
            document.body.appendChild(cel);

            var lang = (function() {
                try { return localStorage.getItem('thena-language') || 'en'; } catch(e) { return 'en'; }
            })();
            var isEn = lang !== 'tr';
            document.getElementById('tut-cel-title').textContent = isEn ? '🎉 You\'re all set!' : '🎉 Hazırsın!';
            document.getElementById('tut-cel-sub').textContent   = isEn
                ? 'You\'ve completed the Thena tutorial. Time to create something amazing!'
                : 'Thena turunu tamamladın. Harika şeyler yaratmanın vakti geldi!';
            document.getElementById('tut-cel-btn').textContent   = isEn ? 'Start Creating →' : 'Oluşturmaya Başla →';

            var container = document.getElementById('tut-cel-particles');
            var colors = ['#00ff88','#00c3ff','#ff6b6b','#ffd700','#a855f7','#ec4899'];
            for (var p = 0; p < 60; p++) {
                (function(i) {
                    var dot = document.createElement('div');
                    dot.className = 'tut-cel-dot';
                    dot.style.cssText =
                        'left:'   + (Math.random() * 100) + '%;' +
                        'top:'    + (Math.random() * 100) + '%;' +
                        'background:' + colors[i % colors.length] + ';' +
                        'width:'  + (4 + Math.random() * 8) + 'px;' +
                        'height:' + (4 + Math.random() * 8) + 'px;' +
                        'animation-delay:' + (Math.random() * 1.5) + 's;' +
                        'animation-duration:' + (1.8 + Math.random() * 1.5) + 's;';
                    container.appendChild(dot);
                })(p);
            }

            requestAnimationFrame(function () {
                requestAnimationFrame(function () { cel.classList.add('tut-cel-visible'); });
            });

            document.getElementById('tut-cel-btn').addEventListener('click', function () {
                cel.classList.remove('tut-cel-visible');
                setTimeout(function () { if (cel.parentNode) cel.parentNode.removeChild(cel); }, 600);
            });
        }, 550);
    }


    function ensureCreditsModalOpen() {
        var modal = document.getElementById('credits-modal');
        if (modal && !modal.classList.contains('active')) {
            var widget = document.getElementById('credit-widget');
            if (widget) widget.click();
        }
    }

    var TUTORIAL_STEPS = [
        {
            selector:     '.shared-header',
            titleKey:     'tutorialApiTitle',
            descKey:      'tutorialApiDesc',
            promptKey:    'tutorialApiPrompt',
            hasApiCheck:  true,
            scrollBlock:  'center'
        },
        {
            selector:     '.model-selector-wrapper',
            titleKey:     'tutorialModelTitle',
            descKey:      'tutorialModelDesc',
            scrollBlock:  'center'
        },
        {
            selector:     '#btn-show-all-models',
            titleKey:     'tutorialShowAllTitle',
            descKey:      'tutorialShowAllDesc',
            scrollBlock:  'nearest'
        },
        {
            selector:     '#btn-open-model-gallery',
            titleKey:     'tutorialGalleryTitle',
            descKey:      'tutorialGalleryDesc',
            scrollBlock:  'nearest'
        },
        {
            selector:     '#btn-toggle-model-layout',
            titleKey:     'tutorialLayoutTitle',
            descKey:      'tutorialLayoutDesc',
            scrollBlock:  'nearest'
        },
        {
            selector:     '#prompt',
            titleKey:     'tutorialPromptTitle',
            descKey:      'tutorialPromptDesc',
            scrollBlock:  'center'
        },
        {
            selector:     '#char-count',
            titleKey:     'tutorialCharCountTitle',
            descKey:      'tutorialCharCountDesc',
            scrollBlock:  'nearest'
        },
        {
            selector:     '#prompt-history-btn',
            titleKey:     'tutorialHistoryTitle',
            descKey:      'tutorialHistoryDesc',
            scrollBlock:  'nearest'
        },
        {
            selector:     '#img2prompt-btn',
            titleKey:     'tutorialImg2PromptTitle',
            descKey:      'tutorialImg2PromptDesc',
            scrollBlock:  'nearest'
        },
        {
            selector:     '#moderation-btn',
            titleKey:     'tutorialModerationTitle',
            descKey:      'tutorialModerationDesc',
            scrollBlock:  'nearest'
        },
        {
            selector:     '#magic-wand-btn',
            titleKey:     'tutorialMagicWandTitle',
            descKey:      'tutorialMagicWandDesc',
            scrollBlock:  'nearest'
        },
        {
            selector:     '#random-prompt-btn',
            titleKey:     'tutorialRandomPromptTitle',
            descKey:      'tutorialRandomPromptDesc',
            scrollBlock:  'nearest'
        },
        {
            selector:     '#app > div.container > div:nth-child(9)',
            titleKey:     'tutorialAspectRatioTitle',
            descKey:      'tutorialAspectRatioDesc',
            scrollBlock:  'center'
        },
        {
            selector:     '#app > div.container > div:nth-child(10)',
            titleKey:     'tutorialExtraFeaturesTitle',
            descKey:      'tutorialExtraFeaturesDesc',
            scrollBlock:  'center',
            bubbleAbove:  true
        },
        {
            selector:     '#elements-section',
            titleKey:     'tutorialElementsTitle',
            descKey:      'tutorialElementsDesc',
            scrollBlock:  'center',
            bubbleAbove:  true
        },
        {
            selector:     '#credit-widget',
            titleKey:     'tutorialCreditWidgetTitle',
            descKey:      'tutorialCreditWidgetDesc',
            scrollBlock:  'nearest',
            onEnter: function() {
                var closeBtn = document.getElementById('btn-close-credits');
                if (closeBtn) closeBtn.click();
            }
        },
        {
            selector:     '.credits-balance-card',
            titleKey:     'tutorialCreditsBalanceTitle',
            descKey:      'tutorialCreditsBalanceDesc',
            scrollBlock:  'center',
            onEnter:      ensureCreditsModalOpen,
            onLeave: function(nextIdx) {
                var nextStep = TUTORIAL_STEPS[nextIdx];
                var isModal = nextStep && nextStep.selector && nextStep.selector.indexOf('.credits-') === 0;
                if (!isModal) {
                    var closeBtn = document.getElementById('btn-close-credits');
                    if (closeBtn) closeBtn.click();
                }
            }
        },
        {
            selector:     '.credits-balance-breakdown',
            titleKey:     'tutorialCreditsBreakdownTitle',
            descKey:      'tutorialCreditsBreakdownDesc',
            scrollBlock:  'center',
            onEnter:      ensureCreditsModalOpen,
            onLeave: function(nextIdx) {
                var nextStep = TUTORIAL_STEPS[nextIdx];
                var isModal = nextStep && nextStep.selector && nextStep.selector.indexOf('.credits-') === 0;
                if (!isModal) {
                    var closeBtn = document.getElementById('btn-close-credits');
                    if (closeBtn) closeBtn.click();
                }
            }
        },
        {
            selector:     '.credits-gift-card',
            titleKey:     'tutorialCreditsGiftTitle',
            descKey:      'tutorialCreditsGiftDesc',
            scrollBlock:  'center',
            onEnter:      ensureCreditsModalOpen,
            onLeave: function(nextIdx) {
                var nextStep = TUTORIAL_STEPS[nextIdx];
                var isModal = nextStep && nextStep.selector && nextStep.selector.indexOf('.credits-') === 0;
                if (!isModal) {
                    var closeBtn = document.getElementById('btn-close-credits');
                    if (closeBtn) closeBtn.click();
                }
            }
        },
        {
            selector:     '.credits-packages-section',
            titleKey:     'tutorialCreditsPackagesTitle',
            descKey:      'tutorialCreditsPackagesDesc',
            scrollBlock:  'center',
            onEnter:      ensureCreditsModalOpen,
            onLeave: function(nextIdx) {
                var nextStep = TUTORIAL_STEPS[nextIdx];
                var isModal = nextStep && nextStep.selector && nextStep.selector.indexOf('.credits-') === 0;
                if (!isModal) {
                    var closeBtn = document.getElementById('btn-close-credits');
                    if (closeBtn) closeBtn.click();
                }
            }
        },
        {
            selector:     '#btn-switch-apps',
            titleKey:     'tutorialSwitchAppsTitle',
            descKey:      'tutorialSwitchAppsDesc',
            scrollBlock:  'nearest',
            onEnter: function() {
                var modal = document.getElementById('app-switch-modal');
                if (modal) modal.classList.remove('active');
            }
        },
        {
            selector:     '.app-grid-container',
            titleKey:     'tutorialAppGridTitle',
            descKey:      'tutorialAppGridDesc',
            scrollBlock:  'center',
            onEnter: function() {
                var modal = document.getElementById('app-switch-modal');
                if (modal) modal.classList.add('active');
            },
            onLeave: function() {
                var modal = document.getElementById('app-switch-modal');
                if (modal) modal.classList.remove('active');
            }
        },
        {
            selector:     '#btn-showcase',
            titleKey:     'tutorialShowcaseTitle',
            descKey:      'tutorialShowcaseDesc',
            scrollBlock:  'nearest'
        },
        {
            selector:     '#btn-open-owner',
            titleKey:     'tutorialOwnerTitle',
            descKey:      'tutorialOwnerDesc',
            scrollBlock:  'nearest'
        }
    ];

    function startTutorial() {
        if (document.getElementById('tutorial-bubble') ||
            document.getElementById('tutorial-spotlight-overlay')) {
            return;
        }

        var PAD    = 10;
        var GAP    = 14;
        var MARGIN = 16;
        var currentStepIndex = 0;
        var currentTarget    = null;
        var apiKeyListener   = null;

        var spl = document.createElement('div');
        spl.id = 'tutorial-spotlight-overlay';
        spl.style.pointerEvents = 'none';
        document.body.appendChild(spl);

        var frame = document.createElement('div');
        frame.id = 'tutorial-spotlight-frame';
        document.body.appendChild(frame);

        var bbl = document.createElement('div');
        bbl.id = 'tutorial-bubble';
        document.body.appendChild(bbl);

        function updatePositions() {
            if (!currentTarget) return;
            var rect = currentTarget.getBoundingClientRect();
            var W = window.innerWidth;
            var H = window.innerHeight;

            var hx1 = Math.max(0, rect.left   - PAD);
            var hy1 = Math.max(0, rect.top    - PAD);
            var hx2 = Math.min(W, rect.right  + PAD);
            var hy2 = Math.min(H, rect.bottom + PAD);

            spl.style.clipPath =
                'polygon(' +
                '0px 0px, ' + W + 'px 0px, ' + W + 'px ' + H + 'px, 0px ' + H + 'px, ' +
                '0px ' + hy1 + 'px, ' +
                hx1 + 'px ' + hy1 + 'px, ' +
                hx1 + 'px ' + hy2 + 'px, ' +
                hx2 + 'px ' + hy2 + 'px, ' +
                hx2 + 'px ' + hy1 + 'px, ' +
                '0px ' + hy1 + 'px' +
                ')';

            frame.style.left   = hx1 + 'px';
            frame.style.top    = hy1 + 'px';
            frame.style.width  = (hx2 - hx1) + 'px';
            frame.style.height = (hy2 - hy1) + 'px';

            var bblW = bbl.offsetWidth  || 420;
            var bblH = bbl.offsetHeight || 210;

            var step = TUTORIAL_STEPS[currentStepIndex];
            var placeAbove = step && step.bubbleAbove;
            var top, left;

            if (placeAbove) {
                bbl.classList.remove('arrow-up');
                top = hy1 - bblH - GAP;
                if (top < MARGIN) top = MARGIN;
            } else {
                bbl.classList.add('arrow-up');
                top = Math.min(hy2 + GAP, H - bblH - MARGIN);
                top = Math.max(MARGIN, top);
            }

            left = hx1;
            if (left + bblW > W - MARGIN) left = W - bblW - MARGIN;
            left = Math.max(MARGIN, left);

            bbl.style.top  = top  + 'px';
            bbl.style.left = left + 'px';
        }

        function renderStep(idx) {
            currentStepIndex = idx;
            var step  = TUTORIAL_STEPS[idx];
            var total = TUTORIAL_STEPS.length;
            var isFirst = idx === 0;
            var isLast  = idx === total - 1;

            if (apiKeyListener) {
                var oldApi = document.getElementById('api-key');
                if (oldApi) oldApi.removeEventListener('input', apiKeyListener);
                apiKeyListener = null;
            }

            var nextLabel = isLast ? tutT('tutorialContinue') : tutT('tutorialNext');
            var nextDisabled = step.hasApiCheck ? ' disabled' : '';

            bbl.innerHTML =
                '<div class="tut-bbl-header">' +
                    '<span class="tut-bbl-step">' + tutStep(idx + 1, total) + '</span>' +
                '</div>' +
                '<div class="tut-bbl-title">' + tutT(step.titleKey) + '</div>' +
                '<div class="tut-bbl-desc">'  + tutT(step.descKey)  + '</div>' +
                (step.promptKey ?
                    '<div class="tut-bbl-prompt" id="tut-prompt-box">' + tutT(step.promptKey) + '</div>'
                    : '') +
                '<div class="tut-bbl-footer">' +
                    '<button class="tut-bbl-skip" id="tut-skip-btn">' + tutT('tutorialSkip') + '</button>' +
                    '<div class="tut-bbl-nav">' +
                        (!isFirst ? '<button class="tut-bbl-btn tut-bbl-btn-secondary" id="tut-back-btn">' + tutT('tutorialBack') + '</button>' : '') +
                        '<button class="tut-bbl-btn tut-bbl-btn-primary" id="tut-next-btn"' + nextDisabled + '>' + nextLabel + '</button>' +
                    '</div>' +
                '</div>';

            document.getElementById('tut-skip-btn').addEventListener('click', function () {
                globalCleanup(); finishTutorial();
            });

            var nextBtn = document.getElementById('tut-next-btn');
            var backBtn = document.getElementById('tut-back-btn');

            nextBtn.addEventListener('click', function () {
                if (isLast) {
                    globalCleanup();
                    finishTutorial();
                } else {
                    if (typeof playInformationSound === 'function') playInformationSound();
                    goToStep(idx + 1);
                }
            });

            if (backBtn) {
                backBtn.addEventListener('click', function () {
                    if (typeof playInformationSound === 'function') playInformationSound();
                    goToStep(idx - 1);
                });
            }

            if (step.hasApiCheck) {
                var apiInput  = document.getElementById('api-key');
                var promptBox = document.getElementById('tut-prompt-box');
                var promptShown = false;

                apiKeyListener = function () {
                    var val = apiInput ? apiInput.value.trim() : '';
                    if (val.length > 3) {
                        nextBtn.disabled = false;
                        if (!promptShown && promptBox) {
                            promptShown = true;
                            promptBox.classList.add('tut-visible');
                            if (typeof playInformationSound === 'function') playInformationSound();
                        }
                    } else {
                        nextBtn.disabled = true;
                        promptShown = false;
                        if (promptBox) promptBox.classList.remove('tut-visible');
                    }
                };

                if (apiInput) {
                    apiInput.addEventListener('input', apiKeyListener);
                    apiKeyListener();
                }
            }

            currentTarget = document.querySelector(step.selector);
            if (!currentTarget) {
                if (!isLast) goToStep(idx + 1); else { globalCleanup(); finishTutorial(); }
                return;
            }

            currentTarget.scrollIntoView({ behavior: 'smooth', block: step.scrollBlock || 'center' });
            setTimeout(function () {
                void bbl.offsetHeight;
                updatePositions();
            }, 500);
        }

        function goToStep(idx) {
            var leaving = TUTORIAL_STEPS[currentStepIndex];
            if (leaving && typeof leaving.onLeave === 'function') {
                try { leaving.onLeave(idx); } catch(e) {}
            }
            var entering = TUTORIAL_STEPS[idx];
            if (entering && typeof entering.onEnter === 'function') {
                try { entering.onEnter(); } catch(e) {}
            }
            renderStep(idx);
        }

        function globalCleanup() {
            window.removeEventListener('scroll', updatePositions);
            window.removeEventListener('resize', updatePositions);
            if (apiKeyListener) {
                var apiEl = document.getElementById('api-key');
                if (apiEl) apiEl.removeEventListener('input', apiKeyListener);
                apiKeyListener = null;
            }
            window.updateTutorialStepLang = null;
        }

        window.updateTutorialStepLang = function () {
            if (currentTarget) renderStep(currentStepIndex);
        };


        window.addEventListener('scroll', updatePositions, { passive: true });
        window.addEventListener('resize', updatePositions);

        currentTarget = document.querySelector(TUTORIAL_STEPS[0].selector);
        if (currentTarget) currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(function () {
            void bbl.offsetHeight;
            renderStep(0);
            updatePositions();

            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    spl.classList.add('tut-spl-visible');
                    frame.classList.add('tut-frame-visible');
                    bbl.classList.add('tut-bbl-visible');
                });
            });
        }, 600);
    }

    function startCinematicIntro() {
        var overlay = document.createElement('div');
        overlay.id = 'tutorial-cinematic-overlay';

        var lettersWrap = document.createElement('div');
        lettersWrap.className = 'tut-cin-letters';

        var word = 'THENA';
        var letterEls = [];
        for (var i = 0; i < word.length; i++) {
            var span = document.createElement('span');
            span.className = 'tut-cin-letter';
            span.textContent = word[i];
            lettersWrap.appendChild(span);
            letterEls.push(span);
        }

        overlay.appendChild(lettersWrap);
        document.body.appendChild(overlay);

        requestAnimationFrame(function () {
            requestAnimationFrame(function () { overlay.classList.add('tut-cin-visible'); });
        });

        var letterDelay = 180;
        var animDur = 550;

        letterEls.forEach(function (el, idx) {
            setTimeout(function () {
                el.classList.add('tut-cin-animate');
                tutPlayLetterSound(idx);
            }, idx * letterDelay);
        });

        var allInAt = word.length * letterDelay + animDur + 200;
        setTimeout(function () {
            letterEls.forEach(function (el) {
                el.classList.remove('tut-cin-animate');
                el.style.opacity = '1';
                el.style.transform = 'rotateY(0deg) scale(1)';
                el.style.filter = 'brightness(1.5)';
                el.classList.add('tut-cin-glow');
            });
            tutPlayFinalSound();
        }, allInAt);

        setTimeout(function () {
            overlay.classList.add('tut-cin-fadeout');
            setTimeout(function () {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
                startTutorial();
            }, 550);
        }, allInAt + 1400);
    }

    function showWelcomeModal() {
        var modal   = document.getElementById('tutorial-welcome-modal');
        if (!modal) return;

        var titleEl = document.getElementById('tutorial-welcome-title');
        var descEl  = document.getElementById('tutorial-welcome-desc');
        var yesBtn  = document.getElementById('tutorial-yes-btn');
        var noBtn   = document.getElementById('tutorial-no-btn');

        if (titleEl) titleEl.textContent = tutT('tutorialWelcomeTitle');
        if (descEl)  descEl.textContent  = tutT('tutorialWelcomeDesc');
        if (yesBtn)  yesBtn.textContent  = tutT('tutorialYes');
        if (noBtn)   noBtn.textContent   = tutT('tutorialNo');

        requestAnimationFrame(function () {
            requestAnimationFrame(function () { modal.classList.add('tut-visible'); });
        });

        function closeModal(cb) {
            modal.classList.remove('tut-visible');
            setTimeout(function () {
                modal.style.display = 'none';
                if (typeof cb === 'function') cb();
            }, 450);
        }

        if (yesBtn) {
            yesBtn.addEventListener('click', function () {
                localStorage.setItem('tutorialSeen', 'true');
                closeModal(function () { setTimeout(startCinematicIntro, 120); });
            });
        }
        if (noBtn) {
            noBtn.addEventListener('click', function () {
                localStorage.setItem('tutorialSeen', 'true');
                closeModal();
            });
        }
    }

    function tryInit() {
        try {
            var firstTime = localStorage.getItem('firstTime');
            var tutSeen   = localStorage.getItem('tutorialSeen');

            if (firstTime !== 'false') return;
            if (tutSeen === 'true') return;

            var loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen &&
                !loadingScreen.classList.contains('fade-out') &&
                window.getComputedStyle(loadingScreen).opacity !== '0') {

                var obs = new MutationObserver(function () {
                    var op = parseFloat(window.getComputedStyle(loadingScreen).opacity);
                    if (loadingScreen.classList.contains('fade-out') || op < 0.1) {
                        obs.disconnect();
                        setTimeout(showWelcomeModal, 900);
                    }
                });
                obs.observe(loadingScreen, { attributes: true, attributeFilter: ['class', 'style'] });

                setTimeout(function () {
                    obs.disconnect();
                    if (localStorage.getItem('tutorialSeen') !== 'true') showWelcomeModal();
                }, 5000);
            } else {
                setTimeout(showWelcomeModal, 900);
            }
        } catch (e) {}
    }

    function updateTutorialRestartLang() {
        var lblEl  = document.getElementById('lbl-tutorial-restart');
        var descEl = document.getElementById('desc-tutorial-restart');
        var txtEl  = document.getElementById('txt-btn-start-tutorial');
        if (lblEl)  lblEl.textContent  = tutT('lblTutorialRestart');
        if (descEl) descEl.textContent = tutT('descTutorialRestart');
        if (txtEl)  txtEl.textContent  = tutT('btnTutorialRestart');
    }

    function bindRestartBtn() {
        var btn = document.getElementById('btn-start-tutorial');
        if (!btn) return;

        updateTutorialRestartLang();

        btn.addEventListener('click', function () {
            var settingsModal = document.getElementById('settings-modal');
            if (settingsModal) settingsModal.classList.remove('active');

            localStorage.removeItem('tutorialSeen');
            setTimeout(function () {
                if (typeof playSuccessSound === 'function') playSuccessSound();
                startCinematicIntro();
            }, 450);
        });

        btn.addEventListener('mouseenter', function () {
            btn.style.background = 'rgba(var(--primary-rgb), 0.15)';
            btn.style.boxShadow  = '0 0 20px rgba(var(--primary-rgb), 0.25)';
        });
        btn.addEventListener('mouseleave', function () {
            btn.style.background = 'rgba(var(--primary-rgb), 0.08)';
            btn.style.boxShadow  = '';
        });

        window.updateTutorialRestartLang = updateTutorialRestartLang;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            tryInit();
            bindRestartBtn();
        });
    } else {
        tryInit();
        bindRestartBtn();
    }
})();
