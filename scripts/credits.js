(function () {
    'use strict';

    const CREDITS_API_BASE = 'https://create.thena.workers.dev/credits';
    const POLL_INTERVAL_MS = 4000;

    const creditWidget      = document.getElementById('credit-widget');
    const widgetCount       = document.getElementById('credit-widget-count');
    const widgetLabel       = document.getElementById('credit-widget-label');
    const creditsModal      = document.getElementById('credits-modal');
    const btnCloseCredits   = document.getElementById('btn-close-credits');
    const btnRefreshCredits = document.getElementById('btn-refresh-credits');
    const noApiWarning      = document.getElementById('credits-no-api-warning');

    const modalCreditCount  = document.getElementById('modal-credit-count');
    const modalPurchased    = document.getElementById('modal-purchased');
    const modalUsed         = document.getElementById('modal-used');
    const modalGifted       = document.getElementById('modal-gifted');
    const modalGiftReceived = document.getElementById('modal-gift-received');

    let _pollTimer = null;
    let _lastData  = null;


    function getApiKey() {
        const el = document.getElementById('api-key');
        return el ? el.value.trim() : '';
    }

    function maskApiKey(key) {
        if (!key) return '--';
        if (key.length <= 8) {
            return '••••••••';
        }
        return key.substring(0, 4) + '••••' + key.substring(key.length - 4);
    }

    function animateCount(el, newVal) {
        if (!el) return;
        el.classList.add('pulse-update');
        el.textContent = newVal;
        setTimeout(() => el.classList.remove('pulse-update'), 600);
    }

    function updateWidget(data) {
        if (!widgetCount) return;

        widgetCount.classList.add('updating');
        setTimeout(() => {
            widgetCount.textContent = data !== null ? data.credit : '--';
            widgetCount.classList.remove('updating');

            if (data !== null && data.credit <= 5) {
                creditWidget.classList.add('low-credits');
            } else {
                creditWidget.classList.remove('low-credits');
            }
        }, 250);
    }

    function updateModalBalance(data) {
        if (!modalCreditCount) return;

        if (data === null) {
            [modalCreditCount, modalPurchased, modalUsed, modalGifted, modalGiftReceived]
                .forEach(el => { if (el) el.textContent = '--'; });
            return;
        }

        animateCount(modalCreditCount,  data.credit);
        if (modalPurchased)    modalPurchased.textContent    = data.purchased    ?? 0;
        if (modalUsed)         modalUsed.textContent         = data.used         ?? 0;
        if (modalGifted)       modalGifted.textContent       = data.gifted       ?? 0;
        if (modalGiftReceived) modalGiftReceived.textContent = data.gift_received ?? 0;
    }

    function updateShareCode(data) {
        const container = document.getElementById('my-share-code-container');
        const valueEl = document.getElementById('my-share-code-value');
        if (!container || !valueEl) return;

        if (data && data.shareCode) {
            valueEl.textContent = data.shareCode;
            container.style.display = 'inline-flex';
        } else {
            container.style.display = 'none';
        }
    }


    async function fetchCredits(showRefreshAnim = false) {
        const apiKey = getApiKey();

        if (!apiKey) {
            updateWidget(null);
            updateModalBalance(null);
            updateShareCode(null);
            if (noApiWarning) noApiWarning.style.display = 'flex';
            return;
        }

        if (noApiWarning) noApiWarning.style.display = 'none';

        if (showRefreshAnim && btnRefreshCredits) {
            btnRefreshCredits.classList.add('spinning');
        }

        try {
            const resp = await fetch(`${CREDITS_API_BASE}?key=${encodeURIComponent(apiKey)}`);
            if (resp.status !== 200) {
                _lastData = null;
                updateWidget(null);
                updateModalBalance(null);
                updateShareCode(null);
                throw new Error('HTTP ' + resp.status);
            }
            const data = await resp.json();
            _lastData = data;
            updateWidget(data);
            updateModalBalance(data);
            updateShareCode(data);
        } catch (err) {
            console.warn('[credits] Fetch failed:', err.message);
        } finally {
            if (btnRefreshCredits) btnRefreshCredits.classList.remove('spinning');
        }
    }


    function startPolling() {
        if (_pollTimer) return;
        fetchCredits();
        _pollTimer = setInterval(() => fetchCredits(), POLL_INTERVAL_MS);
    }

    function stopPolling() {
        if (_pollTimer) {
            clearInterval(_pollTimer);
            _pollTimer = null;
        }
    }


    function openModal() {
        if (!creditsModal) return;
        creditsModal.classList.add('active');
        document.body.classList.add('no-scroll');
        if (_lastData) updateModalBalance(_lastData);
        fetchCredits(false);
    }

    function closeModal() {
        if (!creditsModal) return;
        creditsModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }


    if (creditWidget)    creditWidget.addEventListener('click', openModal);
    if (btnCloseCredits) btnCloseCredits.addEventListener('click', closeModal);
    if (creditsModal)    creditsModal.addEventListener('click', (e) => {
        if (e.target === creditsModal) closeModal();
    });

    if (btnRefreshCredits) {
        btnRefreshCredits.addEventListener('click', () => fetchCredits(true));
    }

    const buyWarningModal = document.getElementById('credits-buy-warning-modal');
    const chkUnderstand   = document.getElementById('chk-buy-warning-understand');
    const btnCancelBuy    = document.getElementById('btn-cancel-buy-warning');
    const btnConfirmBuy   = document.getElementById('btn-confirm-buy-warning');

    let pendingPurchaseUrl = '';

    document.querySelectorAll('.credits-package-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const url = btn.getAttribute('data-url');
            if (url) {
                pendingPurchaseUrl = url;
                if (chkUnderstand) chkUnderstand.checked = false;
                if (btnConfirmBuy) {
                    btnConfirmBuy.disabled = true;
                    btnConfirmBuy.style.opacity = '0.5';
                    btnConfirmBuy.style.cursor = 'not-allowed';
                }
                const keyValEl = document.getElementById('buy-warning-my-key-value');
                if (keyValEl) {
                    keyValEl.textContent = maskApiKey(getApiKey());
                }
                if (buyWarningModal) buyWarningModal.classList.add('active');
            }
        });
    });

    if (chkUnderstand && btnConfirmBuy) {
        chkUnderstand.addEventListener('change', () => {
            if (chkUnderstand.checked) {
                btnConfirmBuy.disabled = false;
                btnConfirmBuy.style.opacity = '1';
                btnConfirmBuy.style.cursor = 'pointer';
            } else {
                btnConfirmBuy.disabled = true;
                btnConfirmBuy.style.opacity = '0.5';
                btnConfirmBuy.style.cursor = 'not-allowed';
            }
        });
    }

    if (btnCancelBuy) {
        btnCancelBuy.addEventListener('click', () => {
            if (buyWarningModal) buyWarningModal.classList.remove('active');
            pendingPurchaseUrl = '';
        });
    }

    if (btnConfirmBuy) {
        btnConfirmBuy.addEventListener('click', () => {
            if (pendingPurchaseUrl) {
                window.open(pendingPurchaseUrl, '_blank', 'noopener,noreferrer');
                if (buyWarningModal) buyWarningModal.classList.remove('active');
                pendingPurchaseUrl = '';
            }
        });
    }

    if (buyWarningModal) {
        buyWarningModal.addEventListener('click', (e) => {
            if (e.target === buyWarningModal) {
                buyWarningModal.classList.remove('active');
                pendingPurchaseUrl = '';
            }
        });
    }

    const apiKeyEl = document.getElementById('api-key');
    if (apiKeyEl) {
        apiKeyEl.addEventListener('input', () => {
            stopPolling();
            startPolling();
        });
    }

    const giftTargetKeyInput    = document.getElementById('gift-target-key');
    const giftAmountInput       = document.getElementById('gift-amount');
    const btnSendGift           = document.getElementById('btn-send-gift');
    const giftConfirmModal      = document.getElementById('credits-gift-confirm-modal');
    const lblGiftConfirmDesc    = document.getElementById('lbl-gift-confirm-desc');
    const btnCancelGiftConfirm  = document.getElementById('btn-cancel-gift-confirm');
    const btnConfirmGiftSend    = document.getElementById('btn-confirm-gift-send');
    const myShareCodeContainer  = document.getElementById('my-share-code-container');

    if (myShareCodeContainer) {
        myShareCodeContainer.addEventListener('click', () => {
            const valueEl = document.getElementById('my-share-code-value');
            if (valueEl && valueEl.textContent && valueEl.textContent !== '--') {
                navigator.clipboard.writeText(valueEl.textContent).then(() => {
                    if (typeof showNotification === 'function') {
                        showNotification(currentLang === 'tr' ? 'Bağlantı kodunuz kopyalandı!' : 'Your connection code copied!', 'success');
                    }
                    if (typeof playInformationSound === 'function') playInformationSound();
                });
            }
        });
    }

    const buyWarningApiKeyContainer = document.getElementById('credits-buy-warning-apikey-container');
    if (buyWarningApiKeyContainer) {
        buyWarningApiKeyContainer.addEventListener('click', () => {
            const apiKey = getApiKey();
            if (!apiKey) {
                const t = translations[currentLang] || translations.en;
                if (typeof showNotification === 'function') {
                    showNotification(t.msgGiftErrNoApiKey || 'Please enter your API Key first.', 'error');
                }
                if (typeof playErrorSound === 'function') playErrorSound();
                return;
            }

            navigator.clipboard.writeText(apiKey).then(() => {
                buyWarningApiKeyContainer.classList.add('copy-success');
                
                const clickCopySpan = document.getElementById('lbl-buy-warning-click-copy');
                const originalCopyText = clickCopySpan ? clickCopySpan.textContent : '';
                if (clickCopySpan) {
                    clickCopySpan.textContent = currentLang === 'tr' ? 'Kopyalandı!' : 'Copied!';
                }

                if (typeof showNotification === 'function') {
                    showNotification(currentLang === 'tr' ? 'API anahtarınız kopyalandı!' : 'Your API Key copied!', 'success');
                }

                if (typeof playTone === 'function') {
                    playTone('sine', 600, 900, 0.08, 0, 0.08);
                    playTone('sine', 900, 1300, 0.15, 0.06, 0.12);
                }

                setTimeout(() => {
                    buyWarningApiKeyContainer.classList.remove('copy-success');
                    if (clickCopySpan) {
                        clickCopySpan.textContent = originalCopyText;
                    }
                }, 1500);
            });
        });
    }

    if (btnSendGift) {
        btnSendGift.addEventListener('click', () => {
            const fromKey = getApiKey();
            const toKey = giftTargetKeyInput ? giftTargetKeyInput.value.trim() : '';
            const amountVal = giftAmountInput ? giftAmountInput.value.trim() : '';
            const count = parseInt(amountVal, 10);

            const t = translations[currentLang] || translations.en;
            if (!fromKey) {
                if (typeof showNotification === 'function') showNotification(t.msgGiftErrNoApiKey, 'error');
                if (typeof playErrorSound === 'function') playErrorSound();
                return;
            }
            if (!toKey) {
                if (typeof showNotification === 'function') showNotification(t.msgGiftErrNoTargetKey, 'error');
                if (typeof playErrorSound === 'function') playErrorSound();
                return;
            }
            if (isNaN(count) || count <= 0) {
                if (typeof showNotification === 'function') showNotification(t.msgGiftErrInvalidAmount, 'error');
                if (typeof playErrorSound === 'function') playErrorSound();
                return;
            }

            if (lblGiftConfirmDesc) {
                lblGiftConfirmDesc.textContent = t.lblGiftConfirmDesc.replace('{0}', count);
            }
            if (giftConfirmModal) {
                giftConfirmModal.classList.add('active');
                if (typeof playInformationSound === 'function') playInformationSound();
            }
        });
    }

    if (btnCancelGiftConfirm) {
        btnCancelGiftConfirm.addEventListener('click', () => {
            if (giftConfirmModal) giftConfirmModal.classList.remove('active');
            if (typeof playInformationSound === 'function') playInformationSound();
        });
    }

    if (giftConfirmModal) {
        giftConfirmModal.addEventListener('click', (e) => {
            if (e.target === giftConfirmModal) {
                giftConfirmModal.classList.remove('active');
                if (typeof playInformationSound === 'function') playInformationSound();
            }
        });
    }

    if (btnConfirmGiftSend) {
        btnConfirmGiftSend.addEventListener('click', async () => {
            const fromKey = getApiKey();
            const toKey = giftTargetKeyInput ? giftTargetKeyInput.value.trim() : '';
            const amountVal = giftAmountInput ? giftAmountInput.value.trim() : '';
            const count = parseInt(amountVal, 10);

            const t = translations[currentLang] || translations.en;

            if (giftConfirmModal) giftConfirmModal.classList.remove('active');

            if (typeof showNotification !== 'function') return;

            const removeLoading = showNotification(t.msgGiftSending, 'loading');

            try {
                const response = await fetch('https://create.thena.workers.dev/gift', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: fromKey,
                        to: toKey,
                        count: count
                    })
                });

                removeLoading();

                if (response.status === 200) {
                    showNotification(t.msgGiftSuccess, 'success');
                    if (typeof playSuccessSound === 'function') playSuccessSound();
                    if (giftTargetKeyInput) giftTargetKeyInput.value = '';
                    if (giftAmountInput) giftAmountInput.value = '';
                    
                    fetchCredits(true);
                } else if (response.status === 404) {
                    showNotification(t.msgGiftErr404, 'error');
                    if (typeof playErrorSound === 'function') playErrorSound();
                } else if (response.status === 403) {
                    showNotification(t.msgGiftErr403, 'error');
                    if (typeof playErrorSound === 'function') playErrorSound();
                } else if (response.status === 400) {
                    showNotification(t.msgGiftErr400, 'error');
                    if (typeof playErrorSound === 'function') playErrorSound();
                } else {
                    showNotification(t.msgGiftErrGeneric + ' (HTTP ' + response.status + ')', 'error');
                    if (typeof playErrorSound === 'function') playErrorSound();
                }
            } catch (error) {
                removeLoading();
                showNotification(t.msgGiftErrGeneric + ' (' + error.message + ')', 'error');
                if (typeof playErrorSound === 'function') playErrorSound();
            }
        });
    }

    const packagesConfig = {
        starter: { credits: 50, price: 29.99, rate: 0.60, nameTr: "BAŞLANGIÇ", nameEn: "STARTER", buyBtnId: "btn-credits-buy-starter" },
        standard: { credits: 100, price: 49.99, rate: 0.50, nameTr: "STANDART", nameEn: "STANDARD", buyBtnId: "btn-credits-buy-standard" },
        popular: { credits: 200, price: 89.99, rate: 0.45, nameTr: "POPÜLER", nameEn: "POPULAR", buyBtnId: "btn-credits-buy-popular" },
        pro: { credits: 500, price: 199.99, rate: 0.40, nameTr: "PRO", nameEn: "PRO", buyBtnId: "btn-credits-buy-pro" },
        ultra: { credits: 1000, price: 389.99, rate: 0.39, nameTr: "ULTRA", nameEn: "ULTRA", buyBtnId: "btn-credits-buy-ultra" }
    };

    async function ensureModelPricesLoaded() {
        if (window.galleryModelPrices && Object.keys(window.galleryModelPrices).length > 0) {
            return window.galleryModelPrices;
        }
        try {
            const res = await fetch('https://create.thena.workers.dev/modelPrices');
            if (res.ok) {
                window.galleryModelPrices = await res.json();
                return window.galleryModelPrices;
            }
        } catch (err) {
            console.error('Error fetching model prices in credits.js', err);
        }
        return window.galleryModelPrices;
    }

    function getModelDisplayName(key) {
        const mapping = window.modelKeyMapping || {};
        for (const [name, val] of Object.entries(mapping)) {
            if (val === key) return name;
        }
        const fallback = {
            "gpt2": "GPT 2",
            "kling30": "Kling 3.0",
            "klingo1": "Kling O1",
            "flux2pro": "Flux 2 Pro",
            "seedream4": "Seedream 4",
            "nanobanana1": "Nano Banana 1",
            "midjourneyV8": "Midjourney V8",
            "nijiv7": "Niji V7",
        };
        return fallback[key] || key.toUpperCase();
    }

    const packageDetailModal = document.getElementById('credits-package-detail-modal');
    const btnClosePackageDetail = document.getElementById('btn-close-package-detail');
    const selectBasePackage = document.getElementById('select-base-package');
    const selectComparePackage = document.getElementById('select-compare-package');
    const packageRateComparison = document.getElementById('package-rate-comparison');
    const rateCompareValues = document.getElementById('rate-compare-values');
    const rateCompareSaving = document.getElementById('rate-compare-saving');
    const packageDetailModelsList = document.getElementById('package-detail-models-list');
    const btnPackageDetailBuy = document.getElementById('btn-package-detail-buy');

    function updateDisabledOptions() {
        const baseId = selectBasePackage ? selectBasePackage.value : 'starter';
        const compareId = selectComparePackage ? selectComparePackage.value : 'none';

        if (selectComparePackage) {
            Array.from(selectComparePackage.options).forEach(opt => {
                if (opt.value === 'none') return;
                opt.disabled = (opt.value === baseId);
            });
        }

        if (selectBasePackage) {
            Array.from(selectBasePackage.options).forEach(opt => {
                opt.disabled = (opt.value === compareId);
            });
        }
    }

    function openPackageDetailModal(packageId) {
        if (!packageDetailModal) return;
        document.body.classList.add('no-scroll');
        packageDetailModal.classList.add('active');
        if (selectBasePackage) {
            selectBasePackage.value = packageId;
        }
        if (selectComparePackage) {
            selectComparePackage.value = 'none';
        }
        updateDisabledOptions();
        refreshPackageDetailModal();
        if (typeof playInformationSound === 'function') playInformationSound();
    }

    function closePackageDetailModal() {
        if (!packageDetailModal) return;
        packageDetailModal.classList.remove('active');
        const creditsModal = document.getElementById('credits-modal');
        if (!creditsModal || !creditsModal.classList.contains('active')) {
            document.body.classList.remove('no-scroll');
        }
        if (typeof playInformationSound === 'function') playInformationSound();
    }

    window.refreshPackageDetailModal = async function() {
        if (!packageDetailModal || !packageDetailModal.classList.contains('active')) return;
        updateDisabledOptions();
        const baseId = selectBasePackage ? selectBasePackage.value : 'starter';
        const compareId = selectComparePackage ? selectComparePackage.value : 'none';
        const basePkg = packagesConfig[baseId];
        const comparePkg = compareId !== 'none' ? packagesConfig[compareId] : null;
        
        const prices = await ensureModelPricesLoaded();
        const paidModels = [];
        for (const [key, val] of Object.entries(prices)) {
            if (val && val.credit && val.credit > 0) {
                paidModels.push({ key, creditCost: val.credit });
            }
        }
        paidModels.sort((a, b) => b.creditCost - a.creditCost);

        if (packageDetailModelsList) {
            packageDetailModelsList.innerHTML = '';
            const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
            
            paidModels.forEach(m => {
                const displayName = getModelDisplayName(m.key);
                const baseCount = Math.floor(basePkg.credits / m.creditCost);
                
                const row = document.createElement('div');
                row.className = 'package-detail-model-row';
                
                let compareHtml = '';
                if (comparePkg) {
                    const compareCount = Math.floor(comparePkg.credits / m.creditCost);
                    const diffCount = compareCount - baseCount;
                    const diffText = diffCount >= 0 ? `+${diffCount}` : `${diffCount}`;
                    const diffClass = diffCount >= 0 ? '' : 'decreased';
                    compareHtml = `<span class="package-detail-model-compare ${diffClass}">${compareCount} <span style="font-size: 10px; opacity:0.7;">(${diffText})</span></span>`;
                } else {
                    compareHtml = `<span class="package-detail-model-compare" style="display:none;"></span>`;
                }
                
                const creditLabelText = lang === 'tr' ? 'kredi' : 'credits';
                row.innerHTML = `
                    <span class="package-detail-model-name">${displayName} <span class="package-detail-model-cost-tag">${m.creditCost} ${creditLabelText}</span></span>
                    <span class="package-detail-model-usage">${baseCount}</span>
                    ${compareHtml}
                `;
                packageDetailModelsList.appendChild(row);
            });
        }

        const lblTableCompareUsage = document.getElementById('lbl-table-compare-usage');
        if (lblTableCompareUsage) {
            if (comparePkg) {
                const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
                const comparePkgName = lang === 'tr' ? comparePkg.nameTr : comparePkg.nameEn;
                lblTableCompareUsage.textContent = comparePkgName;
                lblTableCompareUsage.style.display = 'block';
            } else {
                lblTableCompareUsage.style.display = 'none';
            }
        }

        if (packageRateComparison) {
            if (comparePkg) {
                const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
                const valText = `₺${basePkg.rate.toFixed(2)} vs ₺${comparePkg.rate.toFixed(2)}`;
                if (rateCompareValues) {
                    rateCompareValues.textContent = valText;
                }
                let savingPercent = 0;
                if (basePkg.rate > comparePkg.rate) {
                    savingPercent = Math.round(((basePkg.rate - comparePkg.rate) / basePkg.rate) * 100);
                } else if (comparePkg.rate > basePkg.rate) {
                    savingPercent = Math.round(((comparePkg.rate - basePkg.rate) / comparePkg.rate) * 100);
                }
                if (rateCompareSaving && savingPercent > 0) {
                    const baseName = lang === 'tr' ? basePkg.nameTr : basePkg.nameEn;
                    const compName = lang === 'tr' ? comparePkg.nameTr : comparePkg.nameEn;
                    let savingText = '';
                    if (basePkg.rate > comparePkg.rate) {
                        savingText = lang === 'tr'
                            ? `${compName} paketi ile kredi başına %${savingPercent} tasarruf edersiniz!`
                            : `You save ${savingPercent}% per credit with ${compName} package!`;
                        rateCompareSaving.style.color = '#34d399';
                    } else {
                        savingText = lang === 'tr'
                            ? `${baseName} paketi ile kredi başına %${savingPercent} daha tasarruflusunuz.`
                            : `${baseName} package is ${savingPercent}% cheaper per credit.`;
                        rateCompareSaving.style.color = '#f87171';
                    }
                    rateCompareSaving.querySelector('span').textContent = savingText;
                }
                packageRateComparison.style.display = 'block';
            } else {
                packageRateComparison.style.display = 'none';
            }
        }

        if (btnPackageDetailBuy) {
            const lang = typeof currentLang !== 'undefined' ? currentLang : 'en';
            const pkgName = lang === 'tr' ? basePkg.nameTr : basePkg.nameEn;
            btnPackageDetailBuy.textContent = lang === 'tr' ? `${pkgName} Paketini Satın Al` : `Buy ${pkgName} Package`;
        }
    };

    document.querySelectorAll('.credits-package-info-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const pkgId = btn.getAttribute('data-package');
            if (pkgId) {
                openPackageDetailModal(pkgId);
            }
        });
    });

    if (btnClosePackageDetail) {
        btnClosePackageDetail.addEventListener('click', closePackageDetailModal);
    }
    if (packageDetailModal) {
        packageDetailModal.addEventListener('click', (e) => {
            if (e.target === packageDetailModal) closePackageDetailModal();
        });
    }
    if (selectBasePackage) {
        selectBasePackage.addEventListener('change', () => {
            updateDisabledOptions();
            refreshPackageDetailModal();
        });
    }
    if (selectComparePackage) {
        selectComparePackage.addEventListener('change', () => {
            updateDisabledOptions();
            refreshPackageDetailModal();
        });
    }
    if (btnPackageDetailBuy) {
        btnPackageDetailBuy.addEventListener('click', () => {
            const baseId = selectBasePackage ? selectBasePackage.value : 'starter';
            const basePkg = packagesConfig[baseId];
            if (basePkg) {
                const mainBuyBtn = document.getElementById(basePkg.buyBtnId);
                if (mainBuyBtn) {
                    closePackageDetailModal();
                    const creditsModal = document.getElementById('credits-modal');
                    if (creditsModal) creditsModal.classList.remove('active');
                    mainBuyBtn.click();
                }
            }
        });
    }

    setTimeout(startPolling, 800);

})();
