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
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
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

    setTimeout(startPolling, 800);

})();
