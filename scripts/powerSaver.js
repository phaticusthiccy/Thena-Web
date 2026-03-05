(function () {
    'use strict';

    const IDLE_TIMEOUT = 20000;
    const LOW_FPS_INTERVAL = 1000 / 30;
    const LOW_BATTERY_THRESHOLD = 0.20;

    let _enabled = false;
    let _isIdle = false;
    let _idleTimer = null;
    let _dimOverlay = null;
    let _powerStyleSheet = null;
    let _originalRAF = null;
    let _rafPatched = false;
    let _statusIndicator = null;
    let _batteryRef = null;
    let _batteryAutoEnabled = false;
    let _gpuStyleSheet = null;
    let _oledOverlay = null;
    let _wasMutedBefore = false;
    let _pausedIntervals = [];
    let _wakeLock = null;

    const ACTIVITY_EVENTS = [
        'mousemove', 'mousedown', 'keydown', 'keyup',
        'touchstart', 'touchmove', 'scroll', 'wheel',
        'pointerdown', 'pointermove', 'click'
    ];

    function setPowerSaverEnabled(enable) {
        _enabled = enable;
        localStorage.setItem('thena-power-saver', enable ? 'true' : 'false');

        if (enable) {
            _startListening();
            _resetIdleTimer();
            _startBatteryMonitoring();
        } else {
            _stopListening();
            _wakeUp();
            if (_idleTimer) {
                clearTimeout(_idleTimer);
                _idleTimer = null;
            }
        }
    }

    function isPowerSaverEnabled() {
        return _enabled;
    }

    function isPowerSaverActive() {
        return _isIdle;
    }

    function _startListening() {
        ACTIVITY_EVENTS.forEach(evt => {
            window.addEventListener(evt, _onActivity, { passive: true, capture: true });
        });
        document.addEventListener('visibilitychange', _onVisibilityChange);
    }

    function _stopListening() {
        ACTIVITY_EVENTS.forEach(evt => {
            window.removeEventListener(evt, _onActivity, { capture: true });
        });
        document.removeEventListener('visibilitychange', _onVisibilityChange);
    }

    function _onActivity() {
        if (_isIdle) {
            _wakeUp();
        }
        _resetIdleTimer();
    }

    function _onVisibilityChange() {
        if (document.hidden && _enabled) {
            _goIdle();
        } else if (!document.hidden && _isIdle) {
            _wakeUp();
            _resetIdleTimer();
        }
    }

    function _resetIdleTimer() {
        if (_idleTimer) clearTimeout(_idleTimer);
        if (!_enabled) return;
        _idleTimer = setTimeout(_goIdle, IDLE_TIMEOUT);
    }

    function _goIdle() {
        if (_isIdle) return;
        _isIdle = true;
        document.body.classList.add('power-saver-active');
        _injectPowerStyleSheet();
        _throttleRAF();
        _showDimOverlay();
        _showStatusIndicator();
        _pauseOffscreenMedia();
        _showOLEDOverlay();
        _injectGPUReductionSheet();
        _muteAudio();
        _pauseBackgroundPolling();
        _releaseWakeLock();
        window.dispatchEvent(new CustomEvent('powersaver:idle'));
    }

    function _wakeUp() {
        if (!_isIdle) return;
        _isIdle = false;
        document.body.classList.remove('power-saver-active');
        _removePowerStyleSheet();
        _restoreRAF();
        _hideDimOverlay();
        _hideStatusIndicator();
        _resumeMedia();
        _hideOLEDOverlay();
        _removeGPUReductionSheet();
        _unmuteAudio();
        _resumeBackgroundPolling();
        _acquireWakeLock();
        window.dispatchEvent(new CustomEvent('powersaver:wake'));
    }

    function _throttleRAF() {
        if (_rafPatched) return;
        _originalRAF = window.requestAnimationFrame;
        _rafPatched = true;

        let lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            if (!_isIdle) {
                return _originalRAF.call(window, callback);
            }
            return _originalRAF.call(window, function (timestamp) {
                if (timestamp - lastTime >= LOW_FPS_INTERVAL) {
                    lastTime = timestamp;
                    callback(timestamp);
                } else {
                    _originalRAF.call(window, callback);
                }
            });
        };
    }

    function _restoreRAF() {
        if (!_rafPatched || !_originalRAF) return;
        window.requestAnimationFrame = _originalRAF;
        _rafPatched = false;
    }

    function _injectPowerStyleSheet() {
        if (_powerStyleSheet) return;
        _powerStyleSheet = document.createElement('style');
        _powerStyleSheet.id = 'power-saver-styles';
        _powerStyleSheet.textContent = `
            body.power-saver-active *,
            body.power-saver-active *::before,
            body.power-saver-active *::after {
                animation-play-state: paused !important;
                transition-duration: 0s !important;
            }

            body.power-saver-active .power-saver-exempt,
            body.power-saver-active .power-saver-exempt *,
            body.power-saver-active #power-saver-indicator,
            body.power-saver-active #power-saver-indicator *,
            body.power-saver-active #power-saver-oled,
            body.power-saver-active #power-saver-dim {
                animation-play-state: running !important;
                transition-duration: 0.3s !important;
            }

            body.power-saver-active {
                will-change: auto !important;
            }

            body.power-saver-active .glitch-text {
                animation: none !important;
                text-shadow: none !important;
            }

            body.power-saver-active *:not(#power-saver-dim):not(#power-saver-indicator):not(#power-saver-oled) {
                box-shadow: none !important;
                text-shadow: none !important;
            }

            body.power-saver-active img:not([loading="eager"]) {
                content-visibility: auto;
            }

            body.power-saver-active .gallery-grid,
            body.power-saver-active .gallery-item,
            body.power-saver-active .showcase-grid {
                will-change: auto !important;
            }

            body.power-saver-active *::-webkit-scrollbar-thumb {
                background: #333 !important;
            }

            body.power-saver-active canvas {
                image-rendering: pixelated;
            }
        `;
        document.head.appendChild(_powerStyleSheet);
    }

    function _removePowerStyleSheet() {
        if (_powerStyleSheet) {
            _powerStyleSheet.remove();
            _powerStyleSheet = null;
        }
    }

    function _showDimOverlay() {
        if (_dimOverlay) return;
        _dimOverlay = document.createElement('div');
        _dimOverlay.id = 'power-saver-dim';
        Object.assign(_dimOverlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0)',
            zIndex: '99999990',
            pointerEvents: 'none',
            transition: 'background 0.8s ease'
        });
        document.body.appendChild(_dimOverlay);

        requestAnimationFrame(() => {
            if (_dimOverlay) {
                _dimOverlay.style.background = 'rgba(0, 0, 0, 0.15)';
            }
        });
    }

    function _hideDimOverlay() {
        if (!_dimOverlay) return;
        _dimOverlay.style.background = 'rgba(0, 0, 0, 0)';
        const overlay = _dimOverlay;
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 800);
        _dimOverlay = null;
    }

    function _showStatusIndicator() {
        if (_statusIndicator) return;
        _statusIndicator = document.createElement('div');
        _statusIndicator.id = 'power-saver-indicator';
        _statusIndicator.className = 'power-saver-exempt';
        _statusIndicator.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 7h11a4 4 0 0 1 0 8H6V3z"></path>
                <line x1="6" y1="15" x2="6" y2="21"></line>
                <line x1="10" y1="15" x2="10" y2="21"></line>
            </svg>
            <span>${typeof currentLang !== 'undefined' && currentLang === 'tr' ? 'Güç Tasarrufu' : 'Power Saver'}</span>
            <span class="ps-battery" style="margin-left:4px; font-size:11px; opacity:0.8;"></span>
        `;

        Object.assign(_statusIndicator.style, {
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%) translateY(20px)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 170, 0, 0.3)',
            borderRadius: '30px',
            color: '#ffaa00',
            fontSize: '12px',
            fontWeight: '600',
            fontFamily: "'Inter', 'Segoe UI', sans-serif",
            letterSpacing: '0.5px',
            zIndex: '99999991',
            opacity: '0',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            pointerEvents: 'none',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(255, 170, 0, 0.05)'
        });

        document.body.appendChild(_statusIndicator);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (_statusIndicator) {
                    _statusIndicator.style.opacity = '1';
                    _statusIndicator.style.transform = 'translateX(-50%) translateY(0)';
                }
                if (_batteryRef) {
                    _updateBatteryIndicator(_batteryRef);
                }
            });
        });
    }

    function _hideStatusIndicator() {
        if (!_statusIndicator) return;
        _statusIndicator.style.opacity = '0';
        _statusIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        const indicator = _statusIndicator;
        setTimeout(() => {
            if (indicator && indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }, 500);
        _statusIndicator = null;
    }

    function _pauseOffscreenMedia() {
        document.querySelectorAll('video').forEach(video => {
            if (!video.paused && !_isElementInViewport(video)) {
                video._powerSaverPaused = true;
                video.pause();
            }
        });
    }

    function _resumeMedia() {
        document.querySelectorAll('video').forEach(video => {
            if (video._powerSaverPaused) {
                video._powerSaverPaused = false;
                video.play().catch(() => { });
            }
        });
    }

    function _isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom > 0 &&
            rect.left < window.innerWidth &&
            rect.right > 0
        );
    }

    function _muteAudio() {
        if (typeof isMuted !== 'undefined') {
            _wasMutedBefore = isMuted;
        }
        if (typeof audioCtx !== 'undefined' && audioCtx && audioCtx.state === 'running') {
            audioCtx.suspend().catch(() => { });
        }
        if (typeof isMuted !== 'undefined') {
            isMuted = true;
        }
    }

    function _unmuteAudio() {
        if (!_wasMutedBefore) {
            if (typeof isMuted !== 'undefined') {
                isMuted = false;
            }
        }
        if (typeof audioCtx !== 'undefined' && audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().catch(() => { });
        }
    }

    function _pauseBackgroundPolling() {
        const perfMonSaved = localStorage.getItem('thena-perf-monitor');
        if (perfMonSaved === 'true') {
            return;
        }

        if (typeof _stopCpuMonitoring === 'function') {
            try { _stopCpuMonitoring(); } catch (e) { }
            _pausedIntervals.push('cpu');
        }
        if (typeof _stopMemoryPolling === 'function') {
            try { _stopMemoryPolling(); } catch (e) { }
            _pausedIntervals.push('memory');
        }
        if (typeof perfAnimationFrame !== 'undefined' && perfAnimationFrame) {
            try {
                cancelAnimationFrame(perfAnimationFrame);
                _pausedIntervals.push('perfMonitor');
            } catch (e) { }
        }
    }

    function _resumeBackgroundPolling() {
        if (_pausedIntervals.includes('cpu')) {
            if (typeof _startCpuMonitoring === 'function') {
                try { _startCpuMonitoring(); } catch (e) { }
            }
        }

        if (_pausedIntervals.includes('memory')) {
            if (typeof _startMemoryPolling === 'function') {
                try { _startMemoryPolling(); } catch (e) { }
            }
        }

        if (_pausedIntervals.includes('perfMonitor')) {
            if (typeof loopPerfMonitor === 'function') {
                try { loopPerfMonitor(); } catch (e) { }
            }
        }

        _pausedIntervals = [];
    }

    function _releaseWakeLock() {
        if (_wakeLock) {
            _wakeLock.release().then(() => {
                _wakeLock = null;
            }).catch(() => { });
        }
    }

    async function _acquireWakeLock() {
        if (!('wakeLock' in navigator)) return;
        if (document.hidden) return;

        try {
            _wakeLock = await navigator.wakeLock.request('screen');
            _wakeLock.addEventListener('release', () => {
                _wakeLock = null;
            });
        } catch {
        }
    }

    function _showOLEDOverlay() {
        if (_oledOverlay) return;
        _oledOverlay = document.createElement('div');
        _oledOverlay.id = 'power-saver-oled';
        Object.assign(_oledOverlay.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0)',
            zIndex: '99999989',
            pointerEvents: 'none',
            transition: 'background 1.5s ease'
        });
        document.body.appendChild(_oledOverlay);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (_oledOverlay) {
                    _oledOverlay.style.background = 'rgba(0, 0, 0, 0.35)';
                }
            });
        });
    }

    function _hideOLEDOverlay() {
        if (!_oledOverlay) return;
        _oledOverlay.style.background = 'rgba(0, 0, 0, 0)';
        const overlay = _oledOverlay;
        setTimeout(() => {
            if (overlay && overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 1500);
        _oledOverlay = null;
    }

    function _injectGPUReductionSheet() {
        if (_gpuStyleSheet) return;
        _gpuStyleSheet = document.createElement('style');
        _gpuStyleSheet.id = 'power-saver-gpu-reduction';
        _gpuStyleSheet.textContent = `
            body.power-saver-active *:not(#power-saver-dim):not(#power-saver-indicator):not(#power-saver-oled):not(.power-saver-exempt) {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                filter: none !important;
                will-change: auto !important;
                transform: none !important;
                perspective: none !important;
                backface-visibility: visible !important;
                -webkit-backface-visibility: visible !important;
            }

            body.power-saver-active .confirm-content,
            body.power-saver-active .settings-content,
            body.power-saver-active .gallery-content,
            body.power-saver-active .modal-box {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: #111 !important;
            }

            body.power-saver-active .notification {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                background: #1a1a1a !important;
            }

            body.power-saver-active .glitch-text,
            body.power-saver-active .logo-container {
                filter: none !important;
                transform: none !important;
            }

            body.power-saver-active *::before,
            body.power-saver-active *::after {
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                filter: none !important;
            }

            body.power-saver-active .theme-btn,
            body.power-saver-active .extra-btn,
            body.power-saver-active .ratio-btn,
            body.power-saver-active .model-card {
                transform: none !important;
                filter: none !important;
            }
        `;
        document.head.appendChild(_gpuStyleSheet);
    }

    function _removeGPUReductionSheet() {
        if (_gpuStyleSheet) {
            _gpuStyleSheet.remove();
            _gpuStyleSheet = null;
        }
    }

    function _startBatteryMonitoring() {
        if (!('getBattery' in navigator)) return;

        navigator.getBattery().then(battery => {
            _batteryRef = battery;
            _checkBatteryLevel(battery);

            battery.addEventListener('levelchange', () => _checkBatteryLevel(battery));
            battery.addEventListener('chargingchange', () => _checkBatteryLevel(battery));
        }).catch(() => { });
    }

    function _checkBatteryLevel(battery) {
        if (!_enabled) return;

        const isLow = battery.level <= LOW_BATTERY_THRESHOLD && !battery.charging;

        if (isLow && !_isIdle) {
            _batteryAutoEnabled = true;
            _goIdle();

            const msg = typeof currentLang !== 'undefined' && currentLang === 'tr'
                ? translations.tr.msgBatteryLow1 + Math.round(battery.level * 100) + translations.tr.msgBatteryLow2
                : translations.en.msgBatteryLow1 + Math.round(battery.level * 100) + translations.en.msgBatteryLow2;
            if (typeof showNotification === 'function') {
                showNotification(msg, 'info');
            }
        }

        _updateBatteryIndicator(battery);
    }

    function _updateBatteryIndicator(battery) {
        if (!_statusIndicator) return;
        const batterySpan = _statusIndicator.querySelector('.ps-battery');
        const level = Math.round(battery.level * 100);
        const charging = battery.charging;
        const color = level <= 20 ? '#ff4444' : level <= 50 ? '#ffaa00' : '#00ff88';
        const icon = charging ? '⚡' : '🔋';

        if (batterySpan) {
            batterySpan.innerHTML = `${icon} <span style="color:${color}">${level}%</span>`;
        }
    }

    function _getBatteryInfo() {
        if (!_batteryRef) return null;
        return {
            level: Math.round(_batteryRef.level * 100),
            charging: _batteryRef.charging,
            isLow: _batteryRef.level <= LOW_BATTERY_THRESHOLD && !_batteryRef.charging
        };
    }

    window.PowerSaver = {
        enable: () => setPowerSaverEnabled(true),
        disable: () => setPowerSaverEnabled(false),
        toggle: (val) => setPowerSaverEnabled(val),
        isEnabled: isPowerSaverEnabled,
        isActive: isPowerSaverActive,
        getBattery: _getBatteryInfo
    };

    const saved = localStorage.getItem('thena-power-saver');
    if (saved === 'true') {
        setPowerSaverEnabled(true);
    }

})();