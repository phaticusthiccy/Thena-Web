var _cachedMemoryBytes = null;
var _memoryMeasureInterval = null;

async function _measureMemoryAsync() {
    try {
        if (typeof performance.measureUserAgentSpecificMemory === 'function') {
            const result = await performance.measureUserAgentSpecificMemory();
            _cachedMemoryBytes = result.bytes;
        }
    } catch (e) {
    }
}

function _startMemoryPolling() {
    if (_memoryMeasureInterval) return;
    _measureMemoryAsync();
    _memoryMeasureInterval = setInterval(_measureMemoryAsync, 5000);
}

function _stopMemoryPolling() {
    if (_memoryMeasureInterval) {
        clearInterval(_memoryMeasureInterval);
        _memoryMeasureInterval = null;
    }
    _cachedMemoryBytes = null;
}

var _cpuBusyTime = 0;
var _cpuTotalTime = 0;
var _cpuPercent = 0;
var _lastCpuFrameTime = 0;
var _longTaskTime = 0;
var _longTaskObserver = null;

function _startCpuMonitoring() {
    _lastCpuFrameTime = performance.now();
    _cpuBusyTime = 0;
    _cpuTotalTime = 0;
    _longTaskTime = 0;

    try {
        if (typeof PerformanceObserver !== 'undefined') {
            _longTaskObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    _longTaskTime += entry.duration;
                }
            });
            _longTaskObserver.observe({ entryTypes: ['longtask'] });
        }
    } catch (e) {
    }
}

function _stopCpuMonitoring() {
    if (_longTaskObserver) {
        _longTaskObserver.disconnect();
        _longTaskObserver = null;
    }
    _cpuPercent = 0;
    _cpuBusyTime = 0;
    _cpuTotalTime = 0;
    _longTaskTime = 0;
}

function _updateCpuFrame(now) {
    if (_lastCpuFrameTime > 0) {
        const frameDelta = now - _lastCpuFrameTime;
        const idealFrame = 1000 / 60;
        const busyEstimate = Math.min(frameDelta, frameDelta - idealFrame + idealFrame * 0.5);
        _cpuBusyTime += Math.max(0, busyEstimate);
        _cpuTotalTime += frameDelta;
    }
    _lastCpuFrameTime = now;
}

function _calcCpuPercent() {
    if (_cpuTotalTime <= 0) return 0;
    const frameBusyness = (_cpuBusyTime / _cpuTotalTime) * 100;
    const longTaskImpact = (_longTaskTime / _cpuTotalTime) * 100;
    const combined = Math.min(100, Math.round(frameBusyness * 0.6 + longTaskImpact * 0.4));
    _cpuBusyTime = 0;
    _cpuTotalTime = 0;
    _longTaskTime = 0;
    return combined;
}