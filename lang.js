const translations = {
    en: {
        generateBtn: "Generate Image",
        galleryBtn: "Gallery",
        promptPlaceholder: "Describe your image... (Min 10 chars, Max 5000 chars)",
        apiKeyPlaceholder: "Enter your Thena API key...",
        apiKeyLabel: "API Key",
        promptLabel: "Prompt",
        modelLabel: "Model",
        ratioLabel: "Aspect Ratio",
        extraLabel: "Extra Features",
        advLabel: "Advanced Settings",
        featFast: "Fast Mode",
        featCreative: "Creative",
        featDense: "Dense",
        featMovie: "Movie Filter",
        featHighRes: "HighRes",
        featEnhance: "Prompt Magic",
        galleryTitle: "Gallery",
        showcaseTitle: "Community Showcase",
        settingsTitle: "Settings",
        deleteTitle: "Delete the image?",
        deleteDesc: "Are you sure you want to permanently delete this image? This action is irreversible.",
        deleteAllTitle: "Delete All Gallery Images?",
        deleteAllDesc: "All images in the gallery will be permanently deleted. This action is irreversible. Do you want to proceed?",
        resetTitle: "Reset Application",
        resetDesc: "This action will permanently delete ALL images in your gallery, your API key, and all settings. This action is irreversible.",
        img2promptTitle: "Image to Prompt",
        img2promptDesc: "Upload an image or paste from clipboard (Ctrl+V) to generate a prompt.",
        btnCancel: "Cancel",
        btnConfirm: "Yes, Delete",
        btnConfirmAll: "Yes, Delete All",
        btnConfirmReset: "Yes, Delete Everything",
        btnClose: "Close",
        btnUpload: "Click to Upload or Paste Image",
        btnGenPrompt: "Generate Prompt",
        getApiKey: "Get Your Free API Key ",
        lblSolid: "SOLID COLORS",
        lblGradient: "GRADIENT THEMES",
        lblPerf: "PERFORMANCE MODE",
        lblPerfDesc: "Reduces animations, blur effects and shadows for faster experience.",
        lblSilent: "SILENT MODE",
        lblSilentDesc: "Disable all sound effects and interface tones.",
        lblAdv: "ADVANCED MODE",
        lblAdvDesc: "Enable manual control for Seed, CFG Scale, and Steps. Disables presets.",
        lblAuto: "PROMPT AUTOCOMPLETE",
        lblAutoDesc: "Enable intelligent tag suggestions while typing prompts.",
        lblData: "DATA MANAGEMENT",
        lblDataDesc: "Clear all local data including API key, settings, and image gallery.",
        btnResetData: "Reset Application Data",
        suppTitle: "Support Thena AI",
        redirectBotTitle: "Open Telegram Bot",
        redirectBotDesc: "You are being redirected to Thena AI Bot on Telegram.",
        redirectOwnerTitle: "Contact Developer",
        redirectOwnerDesc: "You are being redirected to the developer's profile.",
        redirectDonateTitle: "Support Thena AI",
        redirectDonateDesc: "You are being redirected to our donation page. Thank you for your support!",
        btnGo: "Go",
        searchPlaceholder: "Search images...",
        featDescFast: "Optimize generation speed. Reduces generation time significantly but may slightly reduce detail accuracy.",
        featDescCreative: "Increases AI imagination. Results will be more artistic and varied, adhering less strictly to prompt constraints.",
        featDescDense: "Creative Mode on steroids. Unleashes maximum AI imagination (2x Creative), resulting in highly complex, hyper-detailed, and artistic masterpieces.",
        featDescMovie: "Applies cinematic color grading and lighting effects suitable for movie-like shots. Available only on specific models.",
        featDescHighRes: "Upscales and refines the output for maximum clarity. Best for large format prints or wallpapers.",
        featDescEnhance: "Automatically enhances your prompt with more details and stylistic improvements before generation. It causes a significant delay in long prompts.",
        ratioDescSquare: "Perfect for social media posts, avatars, and profile pictures. Balanced composition. Slowest.",
        ratioDescPortrait: "Classic portrait ratio. Ideal for character designs, mobile wallpapers, and poster art.",
        ratioDescLandscape: "Traditional photography format. Great for classic compositions, painting styles, and detailed scenes.",
        ratioDescMobile: "Full-screen vertical format. Best for TikTok, Reels, Stories, and mobile-first content.",
        ratioDescCinematic: "Widescreen format. The standard for movies, YouTube videos, and desktop wallpapers.",
        lblIntel: "Intelligence",
        lblQual: "Quality",
        lblSpeed: "Speed",
        lblAnalyzing: "Analyzing...",
        lblFilter: "Filter",
        btnDelAll: "Delete All",
        cfgTitle: "🎚️ CFG Scale",
        cfgDesc: "<b>Classifier Free Guidance Scale.</b><br><br>Controls how strictly the AI follows your prompt.<br>• <b>Low (1-6):</b> More creative freedom, softer look.<br>• <b>Standard (7):</b> Balanced.<br>• <b>High (8-20):</b> Strictly follows prompt, but too high can burn the image.",
        stepsTitle: "👣 Sampling Steps",
        stepsDesc: "<b>Generation Steps.</b><br><br>The number of iterations the AI takes to refine the image.<br>• <b>Low (10-15):</b> Faster generation, rougher details.<br>• <b>High (25-30):</b> High quality and detail, but slower generation.<br>• <b>Default:</b> 20 is the sweet spot.",
        recentPrompts: "Recent Prompts",
        clearHistory: "Clear All",
        historyClearTitle: "Clear History?",
        historyClearDesc: "All saved prompts will be permanently deleted. This action cannot be undone.",
        btnYesClear: "Yes, Clear All",
        wandTitle: "Prompt Enhancement Preview",
        wandOriginal: "ORIGINAL PROMPT",
        wandEnhanced: "ENHANCED PROMPT",
        btnKeepOriginal: "Keep Original",
        btnApplyChanges: "Apply Changes",
        shareTitle: "Public Share Link",
        shareDesc: "Your image is now publicly accessible via this link. Anyone with this URL can view the image.",
        btnShareCopy: "Copy Link",
        btnShareView: "View Image",
        btnShareWait: "Wait...",
        btnShareCopied: "Copied!",
        btnShareError: "Error",
        msgUploading: "Uploading to server...",
        msgUploadFail: "Upload failed. Please try again.",
        btnDownload: "Download",
        msgProcessing: "Processing...",
        msgPreparingLink: "Preparing Link...",
    },
    tr: {
        btnDownload: "İndir",
        msgProcessing: "İşleniyor...",
        msgPreparingLink: "Bağlantı Hazırlanıyor...",
        shareTitle: "Genel Paylaşım Bağlantısı",
        shareDesc: "Resminiz artık bu bağlantı üzerinden herkese açık. URL'ye sahip olan herkes resmi görüntüleyebilir.",
        btnShareCopy: "Bağlantıyı Kopyala",
        btnShareView: "Resmi Görüntüle",
        btnShareWait: "Bekleyin...",
        btnShareCopied: "Kopyalandı!",
        btnShareError: "Hata",
        msgUploading: "Sunucuya yükleniyor...",
        msgUploadFail: "Yükleme başarısız. Tekrar deneyin.",
        wandTitle: "Prompt İyileştirme Önizlemesi",
        wandOriginal: "ORİJİNAL PROMPT",
        wandEnhanced: "İYİLEŞTİRİLMİŞ PROMPT",
        btnKeepOriginal: "Orijinali Koru",
        btnApplyChanges: "Değişiklikleri Uygula",
        recentPrompts: "Son Promptlar",
        clearHistory: "Temizle",
        historyClearTitle: "Geçmiş Temizlensin mi?",
        historyClearDesc: "Kaydedilen tüm promptlar kalıcı olarak silinecek. Bu işlem geri alınamaz.",
        btnYesClear: "Evet, Hepsini Sil",
        cfgTitle: "🎚️ CFG Ölçeği",
        cfgDesc: "<b>Sınıflandırıcıdan Bağımsız Rehberlik Ölçeği.</b><br><br>Yapay zekanın isteminize ne kadar sıkı uyacağını kontrol eder.<br>• <b>Düşük (1-6):</b> Daha fazla yaratıcı özgürlük, daha yumuşak görünüm.<br>• <b>Standart (7):</b> Dengeli.<br>• <b>Yüksek (8-20):</b> İsteme sıkı sıkıya uyar, ancak çok yüksek olması görüntüyü bozabilir.",
        stepsTitle: "👣 Örnekleme Adımları",
        stepsDesc: "<b>Oluşturma Adımları.</b><br><br>Yapay zekanın görüntüyü iyileştirmek için attığı adım sayısı.<br>• <b>Düşük (10-15):</b> Daha hızlı üretim, daha kaba detaylar.<br>• <b>Yüksek (25-30):</b> Yüksek kalite ve detay, ancak daha yavaş üretim.<br>• <b>Varsayılan:</b> 20 ideal noktadır.",
        lblFilter: "Filtrele",
        btnDelAll: "Hepsini Sil",
        lblAnalyzing: "Analiz ediliyor...",
        lblIntel: "Zeka",
        lblQual: "Kalite",
        lblSpeed: "Hız",
        ratioDescSquare: "Sosyal medya gönderileri, avatarlar ve profil resimleri için mükemmeldir. Dengeli kompozisyon. En yavaşı.",
        ratioDescPortrait: "Klasik portre oranı. Karakter tasarımları, mobil duvar kağıtları ve poster sanatı için idealdir.",
        ratioDescLandscape: "Geleneksel fotoğraf formatı. Klasik kompozisyonlar, boyama stilleri ve detaylı sahneler için harikadır.",
        ratioDescMobile: "Tam ekran dikey format. TikTok, Reels, Hikayeler ve mobil öncelikli içerikler için en iyisidir.",
        ratioDescCinematic: "Geniş ekran formatı. Filmler, YouTube videoları ve masaüstü duvar kağıtları için standarttır.",
        featDescFast: "Oluşturma hızını optimize eder. Süreyi önemli ölçüde azaltır ancak detay doğruluğunu biraz düşürebilir.",
        featDescCreative: "Yapay zeka hayal gücünü artırır. Sonuçlar daha sanatsal ve çeşitli olur, prompt sınırlamalarına daha az sadık kalır.",
        featDescDense: "Yaratıcı Modun güçlendirilmiş hali. Maksimum hayal gücünü (2x Yaratıcı) serbest bırakır; çok karmaşık, aşırı detaylı ve sanatsal şaheserler ortaya çıkarır.",
        featDescMovie: "Film benzeri kareler için sinematik renk derecelendirmesi ve ışık efektleri uygular. Sadece belirli modellerde mevcuttur.",
        featDescHighRes: "Maksimum netlik için çıktıyı yükseltir ve iyileştirir. Büyük formatlı baskılar veya duvar kağıtları için en iyisidir.",
        featDescEnhance: "Oluşturma öncesinde isteminizi (prompt) daha fazla detay ve stilistik iyileştirmelerle otomatik olarak geliştirir. Uzun istemlerde belirgin bir gecikmeye neden olur.",
        searchPlaceholder: "Görselleri Ara...",
        generateBtn: "Görüntü Oluştur",
        galleryBtn: "Galeri",
        promptPlaceholder: "Resminizi tarif edin... (Min 10 karakter, Maks 5000 karakter)",
        apiKeyPlaceholder: "Thena API anahtarınızı girin...",
        apiKeyLabel: "API Anahtarı",
        promptLabel: "İstem (Prompt)",
        modelLabel: "Model",
        ratioLabel: "En boy Oranı",
        extraLabel: "Ekstra Özellikler",
        advLabel: "Gelişmiş Ayarlar",
        featFast: "Hızlı Mod",
        featCreative: "Yaratıcı",
        featDense: "Yoğun",
        featMovie: "Film Filtresi",
        featHighRes: "Yüksek Çözünürlük",
        featEnhance: "Sihirli Prompt",
        galleryTitle: "Galeri",
        showcaseTitle: "Topluluk Vitrini",
        settingsTitle: "Ayarlar",
        deleteTitle: "Görüntü Silinsin mi?",
        deleteDesc: "Bu görüntüyü kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
        deleteAllTitle: "Tüm Galeri Silinsin mi?",
        deleteAllDesc: "Galerideki tüm görüntüler kalıcı olarak silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?",
        resetTitle: "Uygulamayı Sıfırla",
        resetDesc: "Bu işlem galerinizdeki TÜM görüntüleri, API anahtarınızı ve tüm ayarları kalıcı olarak silecektir. Geri alınamaz.",
        img2promptTitle: "Görselden Prompt'a",
        img2promptDesc: "Bir prompt oluşturmak için resim yükleyin veya yapıştırın (Ctrl+V).",
        btnCancel: "İptal",
        btnConfirm: "Evet, Sil",
        btnConfirmAll: "Evet, Hepsini Sil",
        btnConfirmReset: "Evet, Her Şeyi Sil",
        btnClose: "Kapat",
        btnUpload: "Resim Yüklemek veya Yapıştırmak için Tıklayın",
        btnGenPrompt: "Prompt Oluştur",
        getApiKey: "Ücretsiz API Anahtarını Al",
        lblSolid: "DÜZ RENKLER",
        lblGradient: "GRADYAN TEMALAR",
        lblPerf: "PERFORMANS MODU",
        lblPerfDesc: "Daha hızlı bir deneyim için animasyonları, bulanıklık efektlerini ve gölgeleri azaltır.",
        lblSilent: "SESSİZ MOD",
        lblSilentDesc: "Tüm ses efektlerini ve arayüz tonlarını devre dışı bırakır.",
        lblAdv: "GELİŞMİŞ MOD",
        lblAdvDesc: "Seed, CFG Scale ve Adımlar için manuel kontrol sağlar. Hazır ayarları devre dışı bırakır.",
        lblAuto: "PROMPT OTOMATİK TAMAMLAMA",
        lblAutoDesc: "Prompt yazarken akıllı etiket önerilerini etkinleştirin.",
        lblData: "VERİ YÖNETİMİ",
        lblDataDesc: "API anahtarı, ayarlar ve resim galerisi dahil tüm yerel verileri temizleyin.",
        btnResetData: "Uygulama Verilerini Sıfırla",
        suppTitle: "Thena'ya Destek Ol",
        redirectBotTitle: "Telegram Botunu Aç",
        redirectBotDesc: "Telegram üzerindeki Thena AI Botuna yönlendiriliyorsunuz.",
        redirectOwnerTitle: "Geliştiriciyle İletişim",
        redirectOwnerDesc: "Geliştiricinin profiline yönlendiriliyorsunuz.",
        redirectDonateTitle: "Thena AI'ye Destek Ol",
        redirectDonateDesc: "Bağış sayfamıza yönlendiriliyorsunuz. Desteğiniz için teşekkürler!",
        btnGo: "Git",
    }
};

let currentLang = localStorage.getItem('thena-language') || 'en';

function updateLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    const lblIntel = document.getElementById('lbl-intel');
    const lblQual = document.getElementById('lbl-qual');
    const lblSpeed = document.getElementById('lbl-speed');

    if (lblIntel) lblIntel.textContent = t.lblIntel;
    if (lblQual) lblQual.textContent = t.lblQual;
    if (lblSpeed) lblSpeed.textContent = t.lblSpeed;
    const langBtn = document.getElementById('btn-language');
    if (langBtn) {
        langBtn.title = lang === 'en' ? "Language: English" : "Dil: Türkçe";
    }

    const promptInput = document.getElementById('prompt');
    const apiKeyInput = document.getElementById('api-key');
    const genBtn = document.getElementById('generate-btn');
    const galBtn = document.getElementById('gallery-btn');
    
    document.querySelector(".search-input").placeholder = t.searchPlaceholder;
    document.querySelector("#showcase-search").placeholder = t.searchPlaceholder;

    if (promptInput) promptInput.placeholder = t.promptPlaceholder;
    if (apiKeyInput) apiKeyInput.placeholder = t.apiKeyPlaceholder;
    if (genBtn) genBtn.textContent = t.generateBtn;
    if (galBtn) galBtn.textContent = t.galleryBtn;

    const apiKeyLabel = document.getElementById('label-api-key');
    if (apiKeyLabel) {
        apiKeyLabel.innerHTML = `${t.apiKeyLabel} <a href="https://t.me/ThenaAIBot?start=refAPI" target="_blank" class="api-link-btn"> ${t.getApiKey} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`;
    }

    const labels = document.querySelectorAll('label');
    labels.forEach(lbl => {
        const txt = lbl.innerText.trim();
        if(txt.includes("API Key")) lbl.innerHTML = `${t.apiKeyLabel} <a href="https://t.me/ThenaAIBot?start=refAPI" target="_blank" class="api-link-btn"> Get Your Free API Key <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`;
        else if(txt.startsWith("Prompt")) lbl.textContent = t.promptLabel;
        else if(txt === "Model") lbl.textContent = t.modelLabel;
        else if(txt === "Aspect Ratio") lbl.textContent = t.ratioLabel;
        else if(txt === "Extra Features") lbl.textContent = t.extraLabel;
        else if(txt.includes("Advanced Settings")) lbl.textContent = t.advLabel;
    });

    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    setText('txt-fast', t.featFast);
    setText('txt-creative', t.featCreative);
    setText('txt-dense', t.featDense);
    setText('txt-movie', t.featMovie);
    setText('txt-highres', t.featHighRes);
    setText('txt-enhance', t.featEnhance);
    setText('txt-filter', t.lblFilter);
    setText('txt-delete-all', t.btnDelAll);

    setText('lbl-solid-colors', t.lblSolid);
    setText('lbl-gradient-themes', t.lblGradient);
    
    setText('lbl-perf-mode', t.lblPerf);
    setText('desc-perf-mode', t.lblPerfDesc);
    
    setText('lbl-silent-mode', t.lblSilent);
    setText('desc-silent-mode', t.lblSilentDesc);
    
    setText('lbl-adv-mode', t.lblAdv);
    setText('desc-adv-mode', t.lblAdvDesc);
    
    setText('lbl-auto-mode', t.lblAuto);
    setText('desc-auto-mode', t.lblAutoDesc);
    
    setText('lbl-data-mgmt', t.lblData);
    setText('desc-data-mgmt', t.lblDataDesc);


    const setTxt = (sel, txt) => { const el = document.querySelector(sel); if(el) el.textContent = txt; };
    
    setTxt('#gallery-modal .gallery-title', t.galleryTitle);
    setTxt('#showcase-modal .gallery-title', t.showcaseTitle);
    setTxt('#settings-modal h3', t.settingsTitle);
    
    setTxt('#confirm-modal h3', t.deleteTitle);
    setTxt('#confirm-modal p', t.deleteDesc);
    setTxt('#btn-cancel', t.btnCancel);
    setTxt('#btn-confirm', t.btnConfirm);
    
    setTxt('#delete-all-modal h3', t.deleteAllTitle);
    setTxt('#delete-all-modal p', t.deleteAllDesc);
    setTxt('#btn-cancel-all', t.btnCancel);
    setTxt('#btn-confirm-all', t.btnConfirmAll);

    setTxt('#hard-reset-modal h3', t.resetTitle);
    setTxt('#hard-reset-modal p', t.resetDesc);
    setTxt('#btn-cancel-reset', t.btnCancel);
    setTxt('#btn-confirm-reset', t.btnConfirmReset);
    
    setTxt('#img2prompt-modal h3', t.img2promptTitle);
    setTxt('#img2prompt-modal p', t.img2promptDesc);
    setTxt('#upload-placeholder span', t.btnUpload);
    setTxt('#btn-img2prompt-cancel', t.btnCancel);
    
    setTxt('#prompt-history-title', t.recentPrompts);
    setTxt('#clear-history-btn', t.clearHistory);

    setTxt('#history-clear-modal h3', t.historyClearTitle);
    setTxt('#history-clear-modal p', t.historyClearDesc);
    setTxt('#btn-history-cancel', t.btnCancel);
    setTxt('#btn-history-confirm', t.btnYesClear);

    setTxt('#wand-modal h3', t.wandTitle);
    const origTitle = document.querySelector('.diff-box.original h6');
    if(origTitle) origTitle.textContent = t.wandOriginal;
    const enhTitle = document.querySelector('.diff-box.enhanced h6');
    if(enhTitle) enhTitle.textContent = t.wandEnhanced;

    setTxt('#btn-wand-cancel', t.btnKeepOriginal);
    setTxt('#btn-wand-confirm', t.btnApplyChanges);

    const resetDataBtn = document.getElementById('btn-hard-reset');
    if(resetDataBtn) resetDataBtn.textContent = t.btnResetData;
    
    setTxt('#btn-close-settings', t.btnClose);

    setTxt('#share-title', t.shareTitle);
    setTxt('#share-desc', t.shareDesc);
    setTxt('#txt-share-view', t.btnShareView);
    const copyBtn = document.getElementById('btn-share-copy');
    if(copyBtn && !copyBtn.disabled) copyBtn.textContent = t.btnShareCopy;
    const genPromptBtn = document.getElementById('btn-img2prompt-generate');
    if(genPromptBtn && !genPromptBtn.classList.contains('loading')) {
        const span = genPromptBtn.querySelector('span');
        if(span) span.textContent = t.btnGenPrompt;
    }

    setTxt('#btn-close-settings', t.btnClose);

    const settingsLabels = document.querySelectorAll('.settings-content label');
    settingsLabels.forEach(l => {
        const cleanTxt = l.innerText.split('\n')[0].trim();
        
        if(cleanTxt.includes("SOLID COLORS")) l.firstChild.textContent = t.lblSolid;
        if(cleanTxt.includes("GRADIENT THEMES")) l.firstChild.textContent = t.lblGradient;
        
        if(cleanTxt.includes("PERFORMANCE MODE")) {
             l.childNodes[0].textContent = t.lblPerf + "\n";
             if(l.nextElementSibling && l.nextElementSibling.tagName === 'P') l.nextElementSibling.textContent = t.lblPerfDesc;
        }
        if(cleanTxt.includes("SILENT MODE")) {
             l.childNodes[0].textContent = t.lblSilent + "\n";
             if(l.nextElementSibling && l.nextElementSibling.tagName === 'P') l.nextElementSibling.textContent = t.lblSilentDesc;
        }
        if(cleanTxt.includes("ADVANCED MODE")) {
             l.childNodes[0].textContent = t.lblAdv + "\n";
             if(l.nextElementSibling && l.nextElementSibling.tagName === 'P') l.nextElementSibling.textContent = t.lblAdvDesc;
        }
        if(cleanTxt.includes("PROMPT AUTOCOMPLETE")) {
             l.childNodes[0].textContent = t.lblAuto + "\n";
             if(l.nextElementSibling && l.nextElementSibling.tagName === 'P') l.nextElementSibling.textContent = t.lblAutoDesc;
        }
        if(cleanTxt.includes("DATA MANAGEMENT")) {
             l.textContent = t.lblData;
             if(l.nextElementSibling && l.nextElementSibling.tagName === 'P') l.nextElementSibling.textContent = t.lblDataDesc;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('btn-language');
    
    updateLanguage(currentLang);
    const sortText = document.getElementById('sort-text');
    sortText.textContent = sortNewestFirst ? currentLang == "tr" ? "En Yeni" : "Newest" : currentLang == "tr" ? "En Eski" : "Oldest";
    if(langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'tr' : 'en';
            localStorage.setItem('thena-language', currentLang);
            updateLanguage(currentLang);
            
            if(typeof playInformationSound === "function") playInformationSound();
            
            if(typeof showNotification === "function") {
                const msg = currentLang === 'en' ? "Language changed to English" : "Dil Türkçe olarak değiştirildi";
                showNotification(msg, "info");
            }
        });
    }
});