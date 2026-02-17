document.addEventListener('DOMContentLoaded', () => {
    const DOMCache = {
        btnExport: document.getElementById('btn-export-data'),
        btnImport: document.getElementById('btn-import-data'),
        fileInputImport: document.getElementById('import-file-input'),
        langBtn: document.getElementById('btn-language'),
        dataModal: document.getElementById('data-selection-modal'),
        btnDataCancel: document.getElementById('btn-data-cancel'),
        btnDataConfirm: document.getElementById('btn-data-confirm'),
        chkSettings: document.getElementById('chk-settings'),
        chkGallery: document.getElementById('chk-gallery'),
        chkChat: document.getElementById('chk-chat'),
        modalTitle: document.getElementById('data-modal-title'),
        lblDesc: document.getElementById('data-modal-desc'),
        lblSet: document.getElementById('lbl-chk-settings'),
        lblGal: document.getElementById('lbl-chk-gallery'),
        lblChat: document.getElementById('lbl-chk-chat'),
        cpuText: document.getElementById('cpu-usage-text'),
        settingsModal: document.getElementById('settings-modal'),
        sizeSettings: document.getElementById('size-settings'),
        sizeGallery: document.getElementById('size-gallery'),
        sizeChat: document.getElementById('size-chat')
    };

    let pendingOperation = null; 
    let pendingImportData = null;

    window.updateDataManagementLanguage = function() {
        const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
        const t = translations[currentLang] || translations['en'];

        if (DOMCache.btnExport && t.btnBackup) DOMCache.btnExport.textContent = t.btnBackup;
        if (DOMCache.btnImport && t.btnRestore) DOMCache.btnImport.textContent = t.btnRestore;

        if (DOMCache.modalTitle && t.dataModalTitle) DOMCache.modalTitle.textContent = t.dataModalTitle;
        if (DOMCache.lblDesc && t.dataModalDesc) DOMCache.lblDesc.textContent = t.dataModalDesc;
        if (DOMCache.lblSet && t.lblChkSettings) DOMCache.lblSet.textContent = t.lblChkSettings;
        if (DOMCache.lblGal && t.lblChkGallery) DOMCache.lblGal.textContent = t.lblChkGallery;
        if (DOMCache.lblChat && t.lblChkChat) DOMCache.lblChat.textContent = t.lblChkChat;
        if (DOMCache.btnDataCancel && t.btnDataCancel) DOMCache.btnDataCancel.textContent = t.btnDataCancel;
        if (DOMCache.btnDataConfirm && t.btnDataConfirm) DOMCache.btnDataConfirm.textContent = t.btnDataConfirm;
    };

    window.updateDataManagementLanguage();
    if (DOMCache.cpuText) {
        let lastTime = performance.now();
        let frames = 0;
        let targetFPS = 60;
        
        const settingsModal = DOMCache.settingsModal; 
        const cpuText = DOMCache.cpuText;

        const updateCPU = (currentTime) => {
            if (!settingsModal || !settingsModal.classList.contains('active')) {
                setTimeout(() => requestAnimationFrame(updateCPU), 500); 
                return;
            }
            const now = currentTime || performance.now();
            const duration = now - lastTime;
            frames++;
            
            if (duration >= 1000) {
                const fps = (frames * 1000) / duration;
                if (fps > targetFPS) {
                    targetFPS = fps;
                }
                const maxFps = Math.ceil(targetFPS);
                
                let load = ((maxFps - fps) / maxFps) * 100;
                load = load < 0 ? 0 : (load > 100 ? 100 : Math.round(load));

                if(load < 5) load = Math.floor(Math.random() * 5) + 1; 
                
                cpuText.textContent = `CPU: ${load}%`;
                
                if (load > 50) cpuText.style.color = '#ff4444';
                else if (load > 20) cpuText.style.color = '#ffaa00';
                else cpuText.style.color = '#00ff88';

                frames = 0;
                lastTime = now;
            }
            requestAnimationFrame(updateCPU);
        };
        
        requestAnimationFrame(updateCPU);
    }

    if (DOMCache.langBtn) {
        DOMCache.langBtn.addEventListener('click', () => {
            setTimeout(() => {
                updateDataManagementLanguage();
            }, 100);
        });
    }

    if (DOMCache.btnExport) {
        DOMCache.btnExport.onclick = (e) => {
            e.preventDefault();
            openDataModal('backup');
        };
    }


    if (DOMCache.btnImport) {
        DOMCache.btnImport.onclick = (e) => {
            e.preventDefault();
            if (DOMCache.fileInputImport) {
                DOMCache.fileInputImport.value = ''; 
                DOMCache.fileInputImport.click();
            }
        };
    }


    if (DOMCache.fileInputImport) {
        DOMCache.fileInputImport.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const importedData = JSON.parse(event.target.result);
                    pendingImportData = importedData;
                    openDataModal('restore');

                } catch (err) {
                    console.error("JSON Hatası:", err);
                    if (typeof playErrorSound === "function") playErrorSound();
                    
                    const t = translations[currentLang] || translations['en'];
                    if(typeof showNotification === "function") 
                        showNotification(t.msgBackupError, "error");
                }
            };
            reader.readAsText(file);
        };
    }


    function openDataModal(mode) {
        if (!DOMCache.dataModal) return;

        pendingOperation = mode;
        updateDataManagementLanguage();
        
        if(DOMCache.chkSettings) DOMCache.chkSettings.checked = true;
        if(DOMCache.chkGallery) DOMCache.chkGallery.checked = true;
        if(DOMCache.chkChat) DOMCache.chkChat.checked = true;
        
        if (DOMCache.sizeSettings) DOMCache.sizeSettings.textContent = '...';
        if (DOMCache.sizeGallery) DOMCache.sizeGallery.textContent = '...';
        if (DOMCache.sizeChat) DOMCache.sizeChat.textContent = '...';

        calculateSizes(mode);

        if (typeof playInformationSound === "function") playInformationSound();
        DOMCache.dataModal.classList.add('active');
    }

    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    async function calculateSizes(mode) {
        let settingsSize = 0;
        let gallerySize = 0;
        let chatSize = 0;
        
        const enc = new TextEncoder();

        if (mode === 'backup') {
            const settings = {
                apiKey: localStorage.getItem('thena-api-key') || (typeof LS_KEYS !== 'undefined' ? localStorage.getItem(LS_KEYS.API_KEY) : null),
                themeColor: localStorage.getItem('thena-theme-color'),
                selectedModel: localStorage.getItem('thena-model'),
                autocomplete: localStorage.getItem('thena-autocomplete')
            };
            settingsSize = enc.encode(JSON.stringify(settings)).length;

            if (typeof dbHelper !== 'undefined') {
                try {
                    const images = await dbHelper.getAll();
                    gallerySize = enc.encode(JSON.stringify(images)).length;
                } catch (e) { console.error(e); }
            }

            if (typeof chatDbHelper !== 'undefined') {
                try {
                    const conversations = await chatDbHelper.getAllConversations();
                    const messages = await chatDbHelper.getAllMessages();
                    const chat = { conversations, messages };
                    chatSize = enc.encode(JSON.stringify(chat)).length;
                } catch (e) { console.error(e); }
            }

        } else if (mode === 'restore' && pendingImportData) {
            const data = pendingImportData;
            
            if (data.settings) {
                settingsSize = enc.encode(JSON.stringify(data.settings)).length;
            }
            
            if (data.images) {
                gallerySize = enc.encode(JSON.stringify(data.images)).length;
            }
            
            if (data.chat) {
                chatSize = enc.encode(JSON.stringify(data.chat)).length;
            }
        }

        if (DOMCache.sizeSettings) DOMCache.sizeSettings.textContent = formatBytes(settingsSize);
        if (DOMCache.sizeGallery) DOMCache.sizeGallery.textContent = formatBytes(gallerySize);
        if (DOMCache.sizeChat) DOMCache.sizeChat.textContent = formatBytes(chatSize);
    }

    function closeDataModal() {
        if (DOMCache.dataModal) DOMCache.dataModal.classList.remove('active');
        pendingOperation = null;
        pendingImportData = null;
        if (DOMCache.fileInputImport) DOMCache.fileInputImport.value = ''; 
    }

    if (DOMCache.btnDataCancel) {
        DOMCache.btnDataCancel.onclick = closeDataModal;
    }

    if (DOMCache.dataModal) {
        DOMCache.dataModal.onclick = (e) => {
            if (e.target === DOMCache.dataModal) closeDataModal();
        };
    }

    if (DOMCache.btnDataConfirm) {
        DOMCache.btnDataConfirm.addEventListener('click', () => {
            const includeSettings = DOMCache.chkSettings.checked;
            const includeGallery = DOMCache.chkGallery.checked;
            const includeChat = DOMCache.chkChat ? DOMCache.chkChat.checked : false;

            if (!includeSettings && !includeGallery && !includeChat) {
                if(typeof showNotification === "function") {
                    const msg = (typeof currentLang !== 'undefined' && currentLang === 'tr') 
                        ? "Lütfen en az bir seçenek seçin." 
                        : "Please select at least one option.";
                    showNotification(msg, "warning");
                }
                return;
            }

            DOMCache.dataModal.classList.remove('active');

            if (pendingOperation === 'backup') {
                executeBackup(includeSettings, includeGallery, includeChat);
            } else if (pendingOperation === 'restore') {
                if (pendingImportData) {
                    executeRestore(pendingImportData, includeSettings, includeGallery, includeChat);
                }
            }
            
            pendingOperation = null;
            pendingImportData = null;
        });
    }
    
    async function executeBackup(includeSettings, includeGallery, includeChat) {
        try {
            const exportData = {
                version: 1,
                date: new Date().toISOString(),
                images: [],
                settings: {},
                chat: null
            };

            if (includeGallery && typeof dbHelper !== 'undefined') {
                exportData.images = await dbHelper.getAll();
            }

            if (includeChat && typeof chatDbHelper !== 'undefined') {
                exportData.chat = {
                    conversations: await chatDbHelper.getAllConversations(),
                    messages: await chatDbHelper.getAllMessages()
                };
            }

            if (includeSettings) {
                exportData.settings = {
                    apiKey: localStorage.getItem('thena-api-key') || (typeof LS_KEYS !== 'undefined' ? localStorage.getItem(LS_KEYS.API_KEY) : null),
                    themeColor: localStorage.getItem('thena-theme-color'),
                    selectedModel: localStorage.getItem('thena-model'),
                    autocomplete: localStorage.getItem('thena-autocomplete')
                };
            }

            const dataStr = JSON.stringify(exportData, null, 2);
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            let typeSuffix = "";
            let includedParts = [];
            if(includeSettings) includedParts.push("settings");
            if(includeGallery) includedParts.push("gallery");
            if(includeChat) includedParts.push("chat");
            
            if(includedParts.length > 0) typeSuffix = "-" + includedParts.join("-");
            
            const timestamp = new Date().toISOString().slice(0,19).replace(/:/g, "-");
            a.download = `thena-backup${typeSuffix}-${timestamp}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            if (typeof playSuccessSound === "function") playSuccessSound();
            const msg = (typeof currentLang !== 'undefined' && currentLang === 'tr') ? "Yedekleme başarılı!" : "Backup created!";
            if(typeof showNotification === "function") showNotification(msg, "success");

        } catch (err) {
            let t = translations[currentLang] || translations['en'];
            if(typeof playErrorSound === "function") playErrorSound();
            if (typeof showNotification === "function") showNotification(t.msgExportError, "error");
            console.error("Backup error:", err);
        }
    }

    async function executeRestore(data, includeSettings, includeGallery, includeChat) {
        if (!data) return;
        let restoreCount = 0;
        let chatRestoreCount = 0;
        let t = translations[currentLang] || translations['en'];
        if (data.version !== 1 || (!data.hasOwnProperty('date') || !data.hasOwnProperty('images') || !data.hasOwnProperty('settings')) && (!includeSettings || !includeGallery || !includeChat) && (!data.settings.hasOwnProperty('apiKey') || !data.settings.hasOwnProperty('themeColor') || !data.settings.hasOwnProperty('selectedModel') || !data.settings.hasOwnProperty('autocomplete'))) {
            if(typeof playErrorSound === "function") playErrorSound();
            if(typeof showNotification === "function") 
                showNotification(t.msgBackupError, "error");
            return;
        }
        try {
            if (includeSettings && data.settings) {
                if (data.settings.apiKey) localStorage.setItem('thena-api-key', data.settings.apiKey);
                if (data.settings.themeColor) localStorage.setItem('thena-theme-color', data.settings.themeColor);
                if (data.settings.selectedModel) localStorage.setItem('thena-model', data.settings.selectedModel);
                if (data.settings.autocomplete) localStorage.setItem('thena-autocomplete', data.settings.autocomplete);
            }

            if (includeGallery && Array.isArray(data.images) && typeof dbHelper !== 'undefined') {
                for (const img of data.images) {
                    await dbHelper.add(img); 
                    restoreCount++;
                }
            }

            if (includeChat && data.chat && typeof chatDbHelper !== 'undefined') {
                if (data.chat.conversations && data.chat.messages) {
                    await chatDbHelper.restoreChatData(data.chat.conversations, data.chat.messages);
                    chatRestoreCount = data.chat.conversations.length;
                }
            }

            if (includeGallery || includeSettings || includeChat) {
                 setTimeout(() => location.reload(), 1000);
            }

            if (typeof playSuccessSound === "function") playSuccessSound();
            
            let msg = "";
            if(currentLang === 'tr') {
                msg = `Geri yükleme tamamlandı.`;
                if(includeGallery) msg += ` (${restoreCount} görsel)`;
                if(includeChat) msg += ` (${chatRestoreCount} sohbet)`;
            } else {
                msg = `Restore completed.`;
                if(includeGallery) msg += ` (${restoreCount} images)`;
                if(includeChat) msg += ` (${chatRestoreCount} chats)`;
            }
                
            if(typeof showNotification === "function") showNotification(msg, "success");

        } catch (err) {
            console.error("Restore error:", err);
            if (typeof playErrorSound === "function") playErrorSound();
            if (err.message.includes("already exists")) {
                if(typeof showNotification === "function") showNotification(currentLang == "tr" ? "Dosyayı yüklemek için lütfen verileri temizleyiniz." : "Please clear the data before uploading the backup file.", "error");
            } else {
                if(typeof showNotification === "function") showNotification(t.msgBackupError, "error");
            }
        }
    }
});

const lightboxFavBtn = document.querySelector('.lightbox-fav-btn');
if (lightboxFavBtn) {
    lightboxFavBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        if (!currentImageTimestamp) return;

        const isCurrentlyFav = lightboxFavBtn.classList.contains('active');
        const newState = !isCurrentlyFav;

        if (!isCurrentlyFav) {
            createConfetti(lightboxFavBtn);
            showNotification(currentLang == "tr" ? "Favorilere eklendi!" : "Added to favorites!", "success");
        } else {
            showNotification(currentLang == "tr" ? "Favorilerden kaldırıldı!" : "Removed from favorites!", "success");
        }
        try {
            if (typeof currentImageData !== 'undefined') {
                currentImageData.isFavorite = newState;
                await dbHelper.update(currentImageData);
                updateFavBtnUI(newState);
                loadGallery();
            }
        } catch (error) {
            console.error("Favori güncellenemedi:", error);
        }
    });
}