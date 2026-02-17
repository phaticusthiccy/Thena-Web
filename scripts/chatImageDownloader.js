const MOBILE_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
const LOADING_SPINNER = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning"><circle cx="12" cy="12" r="10"></circle></svg>';

function setButtonLoading(btn, isLoading, originalContent = '') {
    if (isLoading) {
        btn.dataset.originalContent = btn.innerHTML;
        btn.innerHTML = LOADING_SPINNER;
        btn.disabled = true;
    } else {
        setTimeout(() => {
            btn.innerHTML = btn.dataset.originalContent || originalContent;
            btn.disabled = false;
            delete btn.dataset.originalContent;
        }, 500);
    }
}

function base64ToBlob(base64Data, contentType = 'image/png') {
    const base64 = base64Data.split(',')[1];
    const byteCharacters = atob(base64);
    const len = byteCharacters.length;
    const bytes = new Uint8Array(len);
    
    for (let i = 0; i < len; i++) {
        bytes[i] = byteCharacters.charCodeAt(i);
    }
    
    return new Blob([bytes], { type: contentType });
}
async function handleShare(blob, filename) {
    if (!navigator.share) return false;
    
    try {
        const file = new File([blob], filename, { type: blob.type });
        await navigator.share({
            files: [file],
            title: 'Thena Generated Image',
        });
        showNotification((typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Resim paylaşıldı!' : 'Image shared!', 'success');
        playSuccessSound();
        return true;
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.warn('Share failed, falling back to download:', err);
            return false;
        }
        return true;
    }
}

function downloadBlob(blob, filename) {
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
    }, 100);
    
    playSuccessSound();
    showNotification((typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Resim indiriliyor...' : 'Downloading image...', 'success');
}

function downloadDataUrl(dataUrl, filename) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    playSuccessSound();
    showNotification((typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Resim indiriliyor...' : 'Downloading image...', 'success');
}

async function downloadGeneratedImage(btnElement, filename) {
    const wrapper = btnElement.closest('.generated-image-wrapper');
    const img = wrapper ? wrapper.querySelector('img') : null;
    
    if (!img || !img.src) {
        showNotification((typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Resim bulunamadı.' : 'Image not found.', 'error');
        return;
    }

    setButtonLoading(btnElement, true);

    try {
        const isTelegramWebApp = window.Telegram && window.Telegram.WebApp;
        const isMobile = MOBILE_REGEX.test(navigator.userAgent);
        
        if (isTelegramWebApp || isMobile) {
            const blob = base64ToBlob(img.src);
            
            if (isMobile && navigator.share) {
                const shared = await handleShare(blob, filename);
                if (!shared) {
                    downloadBlob(blob, filename);
                }
            } else {
                downloadBlob(blob, filename);
            }
        } else {
            downloadDataUrl(img.src, filename);
        }
    } catch (error) {
        console.error('Download error:', error);
        playErrorSound();
        showNotification((typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'İndirme başarısız oldu.' : 'Download failed.', 'error');
    } finally {
        setButtonLoading(btnElement, false);
    }
}

function fallbackDownload(blob, filename) {
    downloadBlob(blob, filename);
}