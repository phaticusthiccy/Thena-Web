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
        const btnCancel = document.getElementById('btn-data-cancel');
        const btnConfirm = document.getElementById('btn-data-confirm');

        if (modalTitle && t.dataModalTitle) modalTitle.textContent = t.dataModalTitle;
        if (lblDesc && t.dataModalDesc) lblDesc.textContent = t.dataModalDesc;
        if (lblSet && t.lblChkSettings) lblSet.textContent = t.lblChkSettings;
        if (lblGal && t.lblChkGallery) lblGal.textContent = t.lblChkGallery;
        if (btnCancel && t.btnDataCancel) btnCancel.textContent = t.btnDataCancel;
        if (btnConfirm && t.btnDataConfirm) btnConfirm.textContent = t.btnDataConfirm;
    };

    window.updateDataManagementLanguage();

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
        playInformationSound();
        dataModal.classList.add('active');
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

            if (!includeSettings && !includeGallery) {
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
                executeBackup(includeSettings, includeGallery);
            } else if (pendingOperation === 'restore') {
                if (pendingImportData) {
                    executeRestore(pendingImportData, includeSettings, includeGallery);
                }
            }
            
            pendingOperation = null;
            pendingImportData = null;
        });
    }
    
    async function executeBackup(includeSettings, includeGallery) {
        try {
            const exportData = {
                version: 1,
                date: new Date().toISOString(),
                images: [],
                settings: {}
            };

            if (includeGallery && typeof dbHelper !== 'undefined') {
                exportData.images = await dbHelper.getAll();
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
            if(includeSettings && !includeGallery) typeSuffix = "-settings";
            if(!includeSettings && includeGallery) typeSuffix = "-gallery";
            
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

    async function executeRestore(includeSettings, includeGallery) {
        if (!pendingImportData) return;
        const data = pendingImportData;
        let restoreCount = 0;
        let t = translations[currentLang] || translations['en'];
        if (data.version !== 1 || (!data.hasOwnProperty('date') || !data.hasOwnProperty('images') || !data.hasOwnProperty('settings')) && (!includeSettings || !includeGallery) && (!data.settings.hasOwnProperty('apiKey') || !data.settings.hasOwnProperty('themeColor') || !data.settings.hasOwnProperty('selectedModel') || !data.settings.hasOwnProperty('autocomplete'))) {
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
                setTimeout(() => location.reload(), 500);
            } else if (includeSettings) {
                setTimeout(() => location.reload(), 500);
            }
            if (typeof playSuccessSound === "function") playSuccessSound();
            const msg = (typeof currentLang !== 'undefined' && currentLang === 'tr') 
                ? `Geri yükleme tamamlandı (${restoreCount} görsel)` 
                : `Restore completed (${restoreCount} images)`;
                
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