(function () {
    'use strict';

    const CFG = {
        ANIMATED_SELECTORS: [
            '.gallery-item',
            '.showcase-item',
            '.app-card',
            '.char-card',
            '.char-card-inner',
            '.plasma-ring',
            '.plasma-svg',
            '[class*="plasma"]',
            '.element-chip',
            '.el-chip',
            '.story-finish-overlay',
            '.emotion-icon',
            '.suggest-item',
            '.ms-suggest-item',
            '.history-item',
            '.notification',
            '.preview-card',
            '.mg-card',
            '.mg-card-inner',
            '.canvas-overlay',
            '.editor-panel',
            '.chat-message',
            '.typing-indicator',
            '.skeleton',
            '[class*="skeleton"]',
            '.badge',
            '.badge-pulse',
            '.background-text',
            '.background-grid',
        ],

        BACKDROP_SELECTORS: [
            '.notification',
            '#moderation-btn',
            '#editor-moderation-btn',
            '.gallery-item .gallery-overlay',
            '.lightbox-content',
            '.feat-info-card',
            '.mg-card',
            '.char-card-inner',
        ],

        CONTENT_VISIBILITY_SELECTORS: [
            '#gallery-grid',
            '#showcase-grid',
            '.model-selector',
            '#elements-grid',
            '.char-grid',
            '.history-list',
        ],

        EXEMPT_SELECTORS: [
            '#power-saver-indicator',
            '#power-saver-dim',
            '#power-saver-oled',
            '.power-saver-exempt',
            '#perf-monitor-box',
            '#loading-screen',
            '.confirm-modal.active',
            '.gallery-modal.active',
            '.feature-modal.active',
            '#lightbox.active',
        ],
        ROOT_MARGIN: '50px',
        MUTATION_THROTTLE_MS: 500,
    };

    let _observer = null;
    let _mutationObserver = null;
    let _mutationTimer = null;
    let _initialized = false;
    let _observedSet = new WeakSet();

    function _isExempt(el) {
        if (document.body.classList.contains('performance-mode')) return true;
        if (document.body.classList.contains('power-saver-active')) return true;
        for (const sel of CFG.EXEMPT_SELECTORS) {
            try {
                if (el.matches && el.matches(sel)) return true;
                if (el.closest && el.closest(sel)) return true;
            } catch (_) { }
        }
        return false;
    }

    function _pauseElement(el) {
        if (_isExempt(el)) return;
        el.style.animationPlayState = 'paused';
        el.style.willChange = 'auto';
        el.setAttribute('data-vo-paused', '1');
    }

    function _resumeElement(el) {
        el.style.animationPlayState = '';
        el.style.willChange = '';
        el.removeAttribute('data-vo-paused');
    }

    const _backdropCache = new WeakMap();

    function _removeBackdrop(el) {
        if (_isExempt(el)) return;
        if (!_backdropCache.has(el)) {
            const cs = window.getComputedStyle(el);
            const bd = cs.backdropFilter || cs.webkitBackdropFilter || '';
            _backdropCache.set(el, bd || 'none');
        }
        el.style.backdropFilter = 'none';
        el.style.webkitBackdropFilter = 'none';
        el.setAttribute('data-vo-bd-removed', '1');
    }

    function _restoreBackdrop(el) {
        if (_backdropCache.has(el)) {
            const saved = _backdropCache.get(el);
            el.style.backdropFilter = saved === 'none' ? '' : saved;
            el.style.webkitBackdropFilter = saved === 'none' ? '' : saved;
        } else {
            el.style.backdropFilter = '';
            el.style.webkitBackdropFilter = '';
        }
        el.removeAttribute('data-vo-bd-removed');
    }

    function _onIntersect(entries) {
        for (const entry of entries) {
            const el = entry.target;
            if (_isExempt(el)) continue;

            if (entry.isIntersecting) {
                _resumeElement(el);
                if (el.hasAttribute('data-vo-bd-removed')) {
                    _restoreBackdrop(el);
                }
            } else {
                _pauseElement(el);
            }
        }
    }

    let _bdObserver = null;

    function _onBdIntersect(entries) {
        for (const entry of entries) {
            const el = entry.target;
            if (_isExempt(el)) continue;
            if (entry.isIntersecting) {
                _restoreBackdrop(el);
            } else {
                _removeBackdrop(el);
            }
        }
    }

    function _observe(el) {
        if (!el || _observedSet.has(el)) return;
        _observedSet.add(el);

        if (_observer) _observer.observe(el);
    }

    function _observeBackdrop(el) {
        if (!el) return;
        if (_bdObserver) _bdObserver.observe(el);
    }

    function _scanAndObserve() {
        for (const sel of CFG.ANIMATED_SELECTORS) {
            try {
                document.querySelectorAll(sel).forEach(_observe);
            } catch (_) { }
        }
        for (const sel of CFG.BACKDROP_SELECTORS) {
            try {
                document.querySelectorAll(sel).forEach(_observeBackdrop);
            } catch (_) { }
        }
    }

    function _applyContentVisibility() {
        for (const sel of CFG.CONTENT_VISIBILITY_SELECTORS) {
            try {
                document.querySelectorAll(sel).forEach(el => {
                    if (el.style.contentVisibility) return;
                    el.style.contentVisibility = 'auto';
                    el.style.containIntrinsicSize = 'auto 300px';
                });
            } catch (_) { }
        }
    }

    function _injectGlobalPausedRule() {
        if (document.getElementById('vo-global-style')) return;
        const style = document.createElement('style');
        style.id = 'vo-global-style';
        style.textContent = `
            [data-vo-paused],
            [data-vo-paused] *,
            [data-vo-paused]::before,
            [data-vo-paused]::after {
                animation-play-state: paused !important;
            }

            .confirm-modal:not(.active),
            .gallery-modal:not(.active),
            .feature-modal:not(.active),
            #lightbox:not(.active),
            #settings-modal:not(.active),
            #share-modal:not(.active),
            #redirect-modal:not(.active),
            #wand-modal:not(.active),
            #random-prompt-modal:not(.active),
            #img2prompt-modal:not(.active),
            #history-clear-modal:not(.active),
            #delete-all-modal:not(.active),
            #hard-reset-modal:not(.active),
            #app-switch-modal:not(.active),
            #credits-modal:not(.active) {
                content-visibility: hidden;
            }

            .confirm-modal.active,
            .gallery-modal.active,
            .feature-modal.active,
            #lightbox.active,
            #settings-modal.active,
            #share-modal.active,
            #redirect-modal.active,
            #wand-modal.active,
            #random-prompt-modal.active,
            #img2prompt-modal.active,
            #history-clear-modal.active,
            #delete-all-modal.active,
            #hard-reset-modal.active,
            #app-switch-modal.active,
            #credits-modal.active {
                content-visibility: visible !important;
            }

            body.performance-mode [data-vo-paused],
            body.power-saver-active [data-vo-paused] {
                animation-play-state: paused !important;
            }

            [data-vo-bd-removed] {
            }
        `;
        document.head.appendChild(style);
    }

    function _setupMutationObserver() {
        if (_mutationObserver) return;

        _mutationObserver = new MutationObserver(() => {
            if (_mutationTimer) return;
            _mutationTimer = setTimeout(() => {
                _mutationTimer = null;
                _scanAndObserve();
            }, CFG.MUTATION_THROTTLE_MS);
        });

        _mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    function _setupBodyClassWatcher() {
        const bodyObserver = new MutationObserver(() => {
            const isPerfMode = document.body.classList.contains('performance-mode');
            const isPowerSaver = document.body.classList.contains('power-saver-active');

            if (isPerfMode || isPowerSaver) {
                _clearAllVOStyles();
            } else {
                _scanAndObserve();
            }
        });

        bodyObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['class'],
        });
    }

    function _clearAllVOStyles() {
        document.querySelectorAll('[data-vo-paused]').forEach(_resumeElement);
        document.querySelectorAll('[data-vo-bd-removed]').forEach(_restoreBackdrop);
    }

    function _setupVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.querySelectorAll(CFG.ANIMATED_SELECTORS.join(',')).forEach(el => {
                    if (!_isExempt(el)) _pauseElement(el);
                });
            } else {
                if (_observer) _observer.disconnect();
                if (_bdObserver) _bdObserver.disconnect();
                _observedSet = new WeakSet();
                _scanAndObserve();
            }
        });
    }

    let _scrollTimer = null;
    let _isScrolling = false;

    function _setupScrollOptimization() {
        window.addEventListener('scroll', () => {
            if (!_isScrolling) {
                _isScrolling = true;
            }
            if (_scrollTimer) clearTimeout(_scrollTimer);
            _scrollTimer = setTimeout(() => {
                _isScrolling = false;
            }, 150);
        }, { passive: true });
    }

    function init() {
        if (_initialized) return;
        _initialized = true;

        _injectGlobalPausedRule();

        const ioOptions = {
            root: null, 
            rootMargin: CFG.ROOT_MARGIN,
            threshold: 0,
        };

        if ('IntersectionObserver' in window) {
            _observer = new IntersectionObserver(_onIntersect, ioOptions);
            _bdObserver = new IntersectionObserver(_onBdIntersect, {
                ...ioOptions,
                rootMargin: '0px', 
            });
        }

        _scanAndObserve();
        _applyContentVisibility();
        _setupMutationObserver();
        _setupBodyClassWatcher();
        _setupVisibilityChange();
        _setupScrollOptimization();
        window.addEventListener('resize', _debounce(_applyContentVisibility, 300));
    }

    function _debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    window.VisibilityOptimizer = {
        init,
        scan: _scanAndObserve,
        clearStyles: _clearAllVOStyles,
        isScrolling: () => _isScrolling,
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    const appEl = document.getElementById('app');
    if (appEl) {
        const appObserver = new MutationObserver(() => {
            if (appEl.classList.contains('visible')) {
                setTimeout(_scanAndObserve, 500);
                appObserver.disconnect();
            }
        });
        appObserver.observe(appEl, { attributes: true, attributeFilter: ['class'] });
    }

})();
