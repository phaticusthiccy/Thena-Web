function downloadGeneratedImage(btnElement, filename) {
    const wrapper = btnElement.closest('.generated-image-wrapper');
    const img = wrapper ? wrapper.querySelector('img') : null;
    
    if (!img || !img.src) {
        showNotification((currentLang === 'tr') ? 'Resim bulunamadı.' : 'Image not found.', 'error');
        return;
    }
    
    const base64Data = img.src;
    
    const originalContent = btnElement.innerHTML;
    btnElement.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning"><circle cx="12" cy="12" r="10"></circle></svg>';
    btnElement.disabled = true;
    
    try {
        const isTelegramWebApp = window.Telegram && window.Telegram.WebApp;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isTelegramWebApp || isMobile) {
            const base64 = base64Data.split(',')[1];
            const byteCharacters = atob(base64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });
            
            if (navigator.share && isMobile) {
                const file = new File([blob], filename, { type: 'image/png' });
                navigator.share({
                    files: [file],
                    title: 'Thena Generated Image',
                }).then(() => {
                    playSuccessSound();
                    showNotification((currentLang === 'tr') ? 'Resim paylaşıldı!' : 'Image shared!', 'success');
                }).catch((err) => {
                    if (err.name !== 'AbortError') {
                        fallbackDownload(blob, filename);
                    }
                });
            } else {
                fallbackDownload(blob, filename);
            }
        } else {
            const link = document.createElement('a');
            link.href = base64Data;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            playSuccessSound();
            showNotification((currentLang === 'tr') ? 'Resim indiriliyor...' : 'Downloading image...', 'success');
        }
    } catch (error) {
        console.error('Download error:', error);
        playErrorSound();
        showNotification((currentLang === 'tr') ? 'İndirme başarısız oldu.' : 'Download failed.', 'error');
    } finally {
        setTimeout(() => {
            btnElement.innerHTML = originalContent;
            btnElement.disabled = false;
        }, 1000);
    }
}

function fallbackDownload(blob, filename) {
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
    showNotification((currentLang === 'tr') ? 'Resim indiriliyor...' : 'Downloading image...', 'success');
}