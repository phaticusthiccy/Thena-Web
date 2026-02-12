document.addEventListener('DOMContentLoaded', () => {
    const btnExport = document.getElementById('btn-export-data');
    const btnImport = document.getElementById('btn-import-data');
    const fileInputImport = document.getElementById('import-file-input');
    const langBtn = document.getElementById('btn-language');
    const dataModal = document.getElementById('data-selection-modal');
    const btnDataCancel = document.getElementById('btn-data-cancel');
    const btnDataConfirm = document.getElementById('btn-data-confirm');
    const chkSettings = document.getElementById('chk-settings');
    const chkGallery = document.getElementById('chk-gallery');
    const chkChat = document.getElementById('chk-chat');
    
    let pendingOperation = null; 
    let pendingImportData = null;

    window.updateDataManagementLanguage = function() {
        const lang = (typeof currentLang !== 'undefined') ? currentLang : 'en';
        const t = translations[currentLang] || translations['en'];

        const btnExport = document.getElementById('btn-export-data');
        const btnImport = document.getElementById('btn-import-data');
        if (btnExport && t.btnBackup) btnExport.textContent = t.btnBackup;
        if (btnImport && t.btnRestore) btnImport.textContent = t.btnRestore;

        const modalTitle = document.getElementById('data-modal-title');
        const lblDesc = document.getElementById('data-modal-desc');
        const lblSet = document.getElementById('lbl-chk-settings');
        const lblGal = document.getElementById('lbl-chk-gallery');
        const lblChat = document.getElementById('lbl-chk-chat');
        const btnCancel = document.getElementById('btn-data-cancel');
        const btnConfirm = document.getElementById('btn-data-confirm');

        if (modalTitle && t.dataModalTitle) modalTitle.textContent = t.dataModalTitle;
        if (lblDesc && t.dataModalDesc) lblDesc.textContent = t.dataModalDesc;
        if (lblSet && t.lblChkSettings) lblSet.textContent = t.lblChkSettings;
        if (lblGal && t.lblChkGallery) lblGal.textContent = t.lblChkGallery;
        if (lblChat && t.lblChkChat) lblChat.textContent = t.lblChkChat;
        if (btnCancel && t.btnDataCancel) btnCancel.textContent = t.btnDataCancel;
        if (btnConfirm && t.btnDataConfirm) btnConfirm.textContent = t.btnDataConfirm;
    };

    window.updateDataManagementLanguage();
    const cpuText = document.getElementById('cpu-usage-text');
    if (cpuText) {
        let lastTime = performance.now();
        let frames = 0;
        let targetFPS = 60;

        const updateCPU = (currentTime) => {
            if (!document.getElementById('settings-modal') || !document.getElementById('settings-modal').classList.contains('active')) {
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
                let load = Math.max(0, Math.min(100, Math.round(((maxFps - fps) / maxFps) * 100)));
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

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            setTimeout(() => {
                updateDataManagementLanguage();
            }, 100);
        });
    }

    if (btnExport) {
        btnExport.onclick = (e) => {
            e.preventDefault();
            openDataModal('backup');
        };
    }


    if (btnImport) {
        btnImport.onclick = (e) => {
            e.preventDefault();
            if (fileInputImport) {
                fileInputImport.value = ''; 
                fileInputImport.click();
            }
        };
    }


    if (fileInputImport) {
        fileInputImport.onchange = (e) => {
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
                    if(typeof showNotification === "function") 
                        showNotification(t.msgBackupError, "error");
                }
            };
            reader.readAsText(file);
        };
    }


    function openDataModal(mode) {
        if (!dataModal) return;

        pendingOperation = mode;
        updateDataManagementLanguage();
        
        if(chkSettings) chkSettings.checked = true;
        if(chkGallery) chkGallery.checked = true;
        if(chkChat) chkChat.checked = true;
        
        document.getElementById('size-settings').textContent = '...';
        document.getElementById('size-gallery').textContent = '...';
        document.getElementById('size-chat').textContent = '...';

        calculateSizes(mode);

        playInformationSound();
        dataModal.classList.add('active');
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

        if (mode === 'backup') {
            const settings = {
                apiKey: localStorage.getItem('thena-api-key') || (typeof LS_KEYS !== 'undefined' ? localStorage.getItem(LS_KEYS.API_KEY) : null),
                themeColor: localStorage.getItem('thena-theme-color'),
                selectedModel: localStorage.getItem('thena-model'),
                autocomplete: localStorage.getItem('thena-autocomplete')
            };
            settingsSize = new Blob([JSON.stringify(settings)]).size;

            if (typeof dbHelper !== 'undefined') {
                try {
                    const images = await dbHelper.getAll();
                    gallerySize = new Blob([JSON.stringify(images)]).size;
                } catch (e) { console.error(e); }
            }

            if (typeof chatDbHelper !== 'undefined') {
                try {
                    const conversations = await chatDbHelper.getAllConversations();
                    const messages = await chatDbHelper.getAllMessages();
                    const chat = { conversations, messages };
                    chatSize = new Blob([JSON.stringify(chat)]).size;
                } catch (e) { console.error(e); }
            }

        } else if (mode === 'restore' && pendingImportData) {
            const data = pendingImportData;
            
            if (data.settings) {
                settingsSize = new Blob([JSON.stringify(data.settings)]).size;
            }
            
            if (data.images) {
                gallerySize = new Blob([JSON.stringify(data.images)]).size;
            }
            
            if (data.chat) {
                chatSize = new Blob([JSON.stringify(data.chat)]).size;
            }
        }

        document.getElementById('size-settings').textContent = formatBytes(settingsSize);
        document.getElementById('size-gallery').textContent = formatBytes(gallerySize);
        document.getElementById('size-chat').textContent = formatBytes(chatSize);
    }

    function closeDataModal() {
        if (dataModal) dataModal.classList.remove('active');
        pendingOperation = null;
        pendingImportData = null;
        if (fileInputImport) fileInputImport.value = ''; 
    }

    if (btnDataCancel) {
        btnDataCancel.onclick = closeDataModal;
    }

    if (dataModal) {
        dataModal.onclick = (e) => {
            if (e.target === dataModal) closeDataModal();
        };
    }

    if (btnDataConfirm) {
        btnDataConfirm.addEventListener('click', () => {
            const includeSettings = chkSettings.checked;
            const includeGallery = chkGallery.checked;
            const includeChat = chkChat ? chkChat.checked : false;

            if (!includeSettings && !includeGallery && !includeChat) {
                if(typeof showNotification === "function") {
                    const msg = (typeof currentLang !== 'undefined' && currentLang === 'tr') 
                        ? "Lütfen en az bir seçenek seçin." 
                        : "Please select at least one option.";
                    showNotification(msg, "warning");
                }
                return;
            }

            dataModal.classList.remove('active');

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

    async function executeRestore(includeSettings, includeGallery, includeChat) {
        if (!pendingImportData) return;
        const data = pendingImportData;
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