const translations = {
    "en": {
        "generateBtn": "Generate Image",
        "galleryBtn": "Gallery",
        "promptPlaceholder": "Describe your image... (Min 10 chars, Max 5000 chars)",
        "apiKeyPlaceholder": "Enter your Thena API key...",
        "apiKeyLabel": "API Key",
        "promptLabel": "Prompt",
        "modelLabel": "Model",
        "ratioLabel": "Aspect Ratio",
        "extraLabel": "Extra Features",
        "advLabel": "Advanced Settings",
        "featFast": "Fast Mode",
        "featCreative": "Creative",
        "featDense": "Dense",
        "featMovie": "Movie Filter",
        "featHighRes": "HighRes",
        "featEnhance": "Prompt Magic",
        "galleryTitle": "Gallery",
        "showcaseTitle": "Community Showcase",
        "settingsTitle": "Settings",
        "deleteTitle": "Delete the image?",
        "deleteDesc": "Are you sure you want to permanently delete this image? This action is irreversible.",
        "deleteAllTitle": "Delete All Gallery Images?",
        "deleteAllDesc": "All images in the gallery will be permanently deleted. This action is irreversible. Do you want to proceed?",
        "resetTitle": "Reset Application",
        "resetDesc": "This action will permanently delete ALL images in your gallery, your API key, and all settings. This action is irreversible.",
        "img2promptTitle": "Image to Prompt",
        "img2promptDesc": "Upload an image or paste from clipboard (Ctrl+V) to generate a prompt.",
        "btnCancel": "Cancel",
        "btnConfirm": "Yes, Delete",
        "btnConfirmAll": "Yes, Delete All",
        "btnConfirmReset": "Yes, Delete Everything",
        "btnClose": "Close",
        "btnUpload": "Click to Upload or Paste Image",
        "btnGenPrompt": "Generate Prompt",
        "getApiKey": "Get Your Free API Key ",
        "lblSolid": "THEME COLORS",
        "lblGradient": "GRADIENT THEMES",
        "lblPerf": "PERFORMANCE MODE",
        "lblPerfDesc": "Reduces animations, blur effects and shadows for faster experience.",
        "lblSilent": "SILENT MODE",
        "lblSilentDesc": "Disable all sound effects and interface tones.",
        "lblAdv": "ADVANCED MODE",
        "lblAdvDesc": "Enable manual control for Seed, CFG Scale, and Steps. Disables presets.",
        "lblAuto": "PROMPT AUTOCOMPLETE",
        "lblAutoDesc": "Enable intelligent tag suggestions while typing prompts.",
        "lblPerfMon": "PERFORMANCE MONITOR",
        "lblPerfMonDesc": "Displays real-time system resources and performance.",
        "lblData": "DATA MANAGEMENT",
        "lblDataDesc": "Clear all local data including API key, settings, and image gallery.",
        "btnResetData": "Reset Application Data",
        "suppTitle": "Support Thena AI",
        "redirectBotTitle": "Open Telegram Bot",
        "redirectBotDesc": "You are being redirected to Thena AI Bot on Telegram.",
        "redirectOwnerTitle": "Contact Developer",
        "redirectOwnerDesc": "You are being redirected to the developer's profile.",
        "redirectDonateTitle": "Support Thena AI",
        "redirectDonateDesc": "You are being redirected to our donation page. Thank you for your support!",
        "btnGo": "Go",
        "searchPlaceholder": "Search images...",
        "featDescFast": "Optimize generation speed. Reduces generation time significantly but may slightly reduce detail accuracy.",
        "featDescCreative": "Increases AI imagination. Results will be more artistic and varied, adhering less strictly to prompt constraints.",
        "featDescDense": "Creative Mode on steroids. Unleashes maximum AI imagination (2x Creative), resulting in highly complex, hyper-detailed, and artistic masterpieces.",
        "featDescMovie": "Applies cinematic color grading and lighting effects suitable for movie-like shots. Available only on specific models.",
        "featDescHighRes": "Upscales and refines the output for maximum clarity. Best for large format prints or wallpapers.",
        "featDescEnhance": "Automatically enhances your prompt with more details and stylistic improvements before generation. It causes a significant delay in long prompts.",
        "ratioDescSquare": "Perfect for social media posts, avatars, and profile pictures. Balanced composition. Slowest.",
        "ratioDescPortrait": "Classic portrait ratio. Ideal for character designs, mobile wallpapers, and poster art.",
        "ratioDescLandscape": "Traditional photography format. Great for classic compositions, painting styles, and detailed scenes.",
        "ratioDescMobile": "Full-screen vertical format. Best for TikTok, Reels, Stories, and mobile-first content.",
        "ratioDescCinematic": "Widescreen format. The standard for movies, YouTube videos, and desktop wallpapers.",
        "lblIntel": "Intelligence",
        "lblQual": "Quality",
        "lblSpeed": "Speed",
        "lblAnalyzing": "Analyzing...",
        "lblFilter": "Filter",
        "btnDelAll": "Delete All",
        "cfgTitle": "🎚️ CFG Scale",
        "cfgDesc": "<b>Classifier Free Guidance Scale.</b><br><br>Controls how strictly the AI follows your prompt.<br>• <b>Low (1-6):</b> More creative freedom, softer look.<br>• <b>Standard (7):</b> Balanced.<br>• <b>High (8-20):</b> Strictly follows prompt, but too high can burn the image.",
        "stepsTitle": "👣 Sampling Steps",
        "stepsDesc": "<b>Generation Steps.</b><br><br>The number of iterations the AI takes to refine the image.<br>• <b>Low (10-15):</b> Faster generation, rougher details.<br>• <b>High (25-30):</b> High quality and detail, but slower generation.<br>• <b>Default:</b> 20 is the sweet spot.",
        "recentPrompts": "Recent Prompts",
        "clearHistory": "Clear All",
        "historyClearTitle": "Clear History?",
        "historyClearDesc": "All saved prompts will be permanently deleted. This action cannot be undone.",
        "btnYesClear": "Yes, Clear All",
        "wandTitle": "Prompt Enhancement Preview",
        "wandOriginal": "ORIGINAL PROMPT",
        "wandEnhanced": "ENHANCED PROMPT",
        "btnKeepOriginal": "Keep Original",
        "btnApplyChanges": "Apply Changes",
        "shareTitle": "Public Share Link",
        "shareDesc": "Your image is now publicly accessible via this link. Anyone with this URL can view the image.",
        "btnShareCopy": "Copy Link",
        "btnShareView": "View Image",
        "btnShareWait": "Wait...",
        "btnShareCopied": "Copied!",
        "btnShareError": "Error",
        "msgUploading": "Uploading to server...",
        "msgUploadFail": "Upload failed. Please try again.",
        "btnDownload": "Download",
        "msgProcessing": "Processing...",
        "msgPreparingLink": "Preparing Link...",
        "btnBackup": "Backup Data",
        "btnRestore": "Restore Data",
        "msgBackupDownloaded": "Backup file downloaded successfully.",
        "msgBackupRestoring": "Restoring backup...",
        "msgBackupSuccess": "images restored successfully!",
        "msgBackupError": "File is corrupted or invalid.",
        "msgExportError": "Export error!",
        "btnConfirmBackup": "Confirm Backup",
        "restoreModalTitle": "Restore Options",
        "lblSelectData": "Select data to process:",
        "optGallery": "Gallery Images",
        "btnConfirm2": "Confirm",
        "dataModalTitle": "Backup Options",
        "dataModalDesc": "Choose which data you want to backup or restore.",
        "lblChkSettings": "Settings (API Key, Theme, etc.)",
        "lblChkGallery": "Gallery",
        "lblChkChat": "Chat Data",
        "btnDataCancel": "Cancel",
        "btnDataConfirm": "Confirm",
        "chatBackBtn": "Back",
        "chatNewBtn": "New",
        "chatSidebarTitle": "Chat History",
        "chatNoConv": "No chats yet. Start a new conversation.",
        "chatLoading": "Loading...",
        "chatLoadError": "Failed to load chats.",
        "chatNoSelected": "Select a chat or start a new one.",
        "chatNoMessages": "No messages yet. Type something!",
        "chatPlaceholder": "Type your message...",
        "chatPlaceholderReply": "This is a placeholder response. API integration coming soon.",
        "chatSelectFirst": "Select or start a conversation first.",
        "chatNewConv": "New chat",
        "chatDeleteBtn": "Delete",
        "userInfoName": "What is your name?",
        "userInfoAge": "How old are you?",
        "userInfoGender": "What is your gender?",
        "userInfoSubmit": "Start Chat",
        "userInfoNext": "Next",
        "userInfoAgeError": "Age must be between 16 and 70.",
        "userInfoNameError": "Name must be between 3 and 10 characters.",
        "userInfoCharName": "What should the character's name be?",
        "userInfoCharNameError": "Character name must be between 2 and 15 characters.",
        "genderMale": "Male",
        "genderFemale": "Female",
        "genderNonBinary": "Non-Binary",
        "genderGenderqueer": "Genderqueer",
        "genderGenderfluid": "Genderfluid",
        "genderAgender": "Agender",
        "genderOther": "Other",
        "tabScene": "Scene",
        "tabAction": "Action",
        "tabSystem": "System",
        "chatImageGenerated": "[User generated an image of the current scene]",
        "genderFemboy": "Femboy",
        "genderTransgender": "Transgender",
        "genderLesbian": "Lesbian",
        "genderGay": "Gay",
        "genderTomboy": "Tomboy",
        "genderBack": "Back",
        "userInfoModel": "Choose Model",
        "modelFast": "Fast",
        "modelThinking": "Thinking",
        "modelFastDesc": "Quick responses, great for casual chat.",
        "modelThinkingDesc": "Slower, detailed responses with reasoning.",
        "profileTitle": "User Profile",
        "profileName": "Name",
        "profileCharName": "AI Name",
        "profileAge": "Age",
        "profileGender": "Gender",
        "profileModel": "Model",
        "profileCost": "Total Cost",
        "dataBtn": "My Data",
        "chatDataTitle": "Chat Data",
        "chatDataTotalConvos": "Total Conversations",
        "chatDataTotalMessages": "Total Messages",
        "chatDataTotalCost": "Total Cost",
        "chatDataDownload": "Download Copy",
        "chatDataView": "View Logs",
        "chatDataClose": "Close",
        "filterImgGen": "Image Generation Support",
        "filterCategory": "Category",
        "filterSubCategories": "Sub Categories",
        "filterReset": "Reset Filters",
        "filterAll": "All",
        "chatSearchPlaceholder": "Search characters...",
        "unknownCharacter": "Unknown Character",
        "characterNM": " (Default)",
        "toggleThoughts": "Show Thoughts",
        "chatStoryFinished": "This story has reached its conclusion. You can start a new conversation to begin a new adventure.",
        "chatStoryFinishedPlaceholder": "This story has ended.",
        "chatStoryContinued": "The story had actually ended here, but the user wanted to continue.",
        "chatStoryContinuePlaceholder": "Continuing the story...",
        "editorUploadLabel": "Upload Image",
        "editorPresetsLabel": "Presets",
        "editorInstructionsLabel": "Instructions",
        "editorUploadMsg": "Click to Upload or Drag Image",
        "editorPromptPlaceholder": "Describe how you want to change the image...",
        "editorGenerateBtn": "Generate Variation",
        "editorLoadingPresets": "Loading presets...",
        "editorNoPresets": "No presets found.",
        "editorFailedPresets": "Failed to load presets.",
        "editorSearchPlaceholder": "Search presets...",
        "editorSearchNoResults": "No results found",
        "lblPromptPreview": "PROMPT PREVIEW",
        "lblPromptPreviewDesc": "Shows similar image previews while typing prompts to help visualize results before generating.",
        "promptPreviewNoResult": "No preview available",
        "promptPreviewTryEnglish": "Please try in English",
        "promptPreviewLoading": "Searching...",
        "promptPreviewCountdown": "Enter {0} more characters to preview",
        "promptPreviewTitle": "Preview",
        "sortDefault": "Default",
        "sortIntel": "Intelligent",
        "sortQual": "Quality",
        "sortSpeed": "Speed",
        "multiSelectDelete": "Delete Selected",
        "multiSelectCancel": "Cancel",
        "multiSelectCount": "{0} selected",
        "multiSelectConfirmTitle": "Delete Selected Images?",
        "multiSelectConfirmDesc": "The selected images will be permanently deleted. This action cannot be undone.",
        "lblSkipIntro": "SKIP INTRO",
        "lblSkipIntroDesc": "Skip the cinematic intro page on your next visit."
    },
    "tr": {
        "generateBtn": "Görüntü Oluştur",
        "galleryBtn": "Galeri",
        "promptPlaceholder": "Resminizi tarif edin... (Min 10 karakter, Maks 5000 karakter)",
        "apiKeyPlaceholder": "Thena API anahtarınızı girin...",
        "apiKeyLabel": "API Anahtarı",
        "promptLabel": "İstem (Prompt)",
        "modelLabel": "Model",
        "ratioLabel": "En boy Oranı",
        "extraLabel": "Ekstra Özellikler",
        "advLabel": "Gelişmiş Ayarlar",
        "featFast": "Hızlı Mod",
        "featCreative": "Yaratıcı",
        "featDense": "Yoğun",
        "featMovie": "Film Filtresi",
        "featHighRes": "Yüksek Çözünürlük",
        "featEnhance": "Sihirli Prompt",
        "galleryTitle": "Galeri",
        "showcaseTitle": "Topluluk Vitrini",
        "settingsTitle": "Ayarlar",
        "deleteTitle": "Görüntü Silinsin mi?",
        "deleteDesc": "Bu görüntüyü kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
        "deleteAllTitle": "Tüm Galeri Silinsin mi?",
        "deleteAllDesc": "Galerideki tüm görüntüler kalıcı olarak silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?",
        "resetTitle": "Uygulamayı Sıfırla",
        "resetDesc": "Bu işlem galerinizdeki TÜM görüntüleri, API anahtarınızı ve tüm ayarları kalıcı olarak silecektir. Geri alınamaz.",
        "img2promptTitle": "Görselden Prompt'a",
        "img2promptDesc": "Bir prompt oluşturmak için resim yükleyin veya yapıştırın (Ctrl+V).",
        "btnCancel": "İptal",
        "btnConfirm": "Evet, Sil",
        "btnConfirmAll": "Evet, Hepsini Sil",
        "btnConfirmReset": "Evet, Her Şeyi Sil",
        "btnClose": "Kapat",
        "btnUpload": "Resim Yüklemek veya Yapıştırmak için Tıklayın",
        "btnGenPrompt": "Prompt Oluştur",
        "getApiKey": "Ücretsiz API Anahtarını Al",
        "lblSolid": "TEMA RENKLERİ",
        "lblGradient": "GRADYAN TEMALAR",
        "lblPerf": "PERFORMANS MODU",
        "lblPerfDesc": "Daha hızlı bir deneyim için animasyonları, bulanıklık efektlerini ve gölgeleri azaltır.",
        "lblSilent": "SESSİZ MOD",
        "lblSilentDesc": "Tüm ses efektlerini ve arayüz tonlarını devre dışı bırakır.",
        "lblAdv": "GELİŞMİŞ MOD",
        "lblAdvDesc": "Seed, CFG Scale ve Adımlar için manuel kontrol sağlar. Hazır ayarları devre dışı bırakır.",
        "lblAuto": "PROMPT OTOMATİK TAMAMLAMA",
        "lblAutoDesc": "Prompt yazarken akıllı etiket önerilerini etkinleştirin.",
        "lblPerfMon": "PERFORMANS GÖSTERGESİ",
        "lblPerfMonDesc": "Anlık sistem kaynaklarını ve performansı gösterir.",
        "lblData": "VERİ YÖNETİMİ",
        "lblDataDesc": "API anahtarı, ayarlar ve resim galerisi dahil tüm yerel verileri temizleyin.",
        "btnResetData": "Uygulama Verilerini Sıfırla",
        "suppTitle": "Thena'ya Destek Ol",
        "redirectBotTitle": "Telegram Botunu Aç",
        "redirectBotDesc": "Telegram üzerindeki Thena AI Botuna yönlendiriliyorsunuz.",
        "redirectOwnerTitle": "Geliştiriciyle İletişim",
        "redirectOwnerDesc": "Geliştiricinin profiline yönlendiriliyorsunuz.",
        "redirectDonateTitle": "Thena AI'ye Destek Ol",
        "redirectDonateDesc": "Bağış sayfamıza yönlendiriliyorsunuz. Desteğiniz için teşekkürler!",
        "btnGo": "Git",
        "searchPlaceholder": "Görselleri Ara...",
        "featDescFast": "Oluşturma hızını optimize eder. Süreyi önemli ölçüde azaltır ancak detay doğruluğunu biraz düşürebilir.",
        "featDescCreative": "Yapay zeka hayal gücünü artırır. Sonuçlar daha sanatsal ve çeşitli olur, prompt sınırlamalarına daha az sadık kalır.",
        "featDescDense": "Yaratıcı Modun güçlendirilmiş hali. Maksimum hayal gücünü (2x Yaratıcı) serbest bırakır; çok karmaşık, aşırı detaylı ve sanatsal şaheserler ortaya çıkarır.",
        "featDescMovie": "Film benzeri kareler için sinematik renk derecelendirmesi ve ışık efektleri uygular. Sadece belirli modellerde mevcuttur.",
        "featDescHighRes": "Maksimum netlik için çıktıyı yükseltir ve iyileştirir. Büyük formatlı baskılar veya duvar kağıtları için en iyisidir.",
        "featDescEnhance": "Oluşturma öncesinde isteminizi (prompt) daha fazla detay ve stilistik iyileştirmelerle otomatik olarak geliştirir. Uzun istemlerde belirgin bir gecikmeye neden olur.",
        "ratioDescSquare": "Sosyal medya gönderileri, avatarlar ve profil resimleri için mükemmeldir. Dengeli kompozisyon. En yavaşı.",
        "ratioDescPortrait": "Klasik portre oranı. Karakter tasarımları, mobil duvar kağıtları ve poster sanatı için idealdir.",
        "ratioDescLandscape": "Geleneksel fotoğraf formatı. Klasik kompozisyonlar, boyama stilleri ve detaylı sahneler için harikadır.",
        "ratioDescMobile": "Tam ekran dikey format. TikTok, Reels, Hikayeler ve mobil öncelikli içerikler için en iyisidir.",
        "ratioDescCinematic": "Geniş ekran formatı. Filmler, YouTube videoları ve masaüstü duvar kağıtları için standarttır.",
        "lblIntel": "Zeka",
        "lblQual": "Kalite",
        "lblSpeed": "Hız",
        "lblAnalyzing": "Analiz ediliyor...",
        "lblFilter": "Filtrele",
        "btnDelAll": "Hepsini Sil",
        "cfgTitle": "🎚️ CFG Ölçeği",
        "cfgDesc": "<b>Sınıflandırıcıdan Bağımsız Rehberlik Ölçeği.</b><br><br>Yapay zekanın isteminize ne kadar sıkı uyacağını kontrol eder.<br>• <b>Düşük (1-6):</b> Daha fazla yaratıcı özgürlük, daha yumuşak görünüm.<br>• <b>Standart (7):</b> Dengeli.<br>• <b>Yüksek (8-20):</b> İsteme sıkı sıkıya uyar, ancak çok yüksek olması görüntüyü bozabilir.",
        "stepsTitle": "👣 Örnekleme Adımları",
        "stepsDesc": "<b>Oluşturma Adımları.</b><br><br>Yapay zekanın görüntüyü iyileştirmek için attığı adım sayısı.<br>• <b>Düşük (10-15):</b> Daha hızlı üretim, daha kaba detaylar.<br>• <b>Yüksek (25-30):</b> Yüksek kalite ve detay, ancak daha yavaş üretim.<br>• <b>Varsayılan:</b> 20 ideal noktadır.",
        "recentPrompts": "Son Promptlar",
        "clearHistory": "Temizle",
        "historyClearTitle": "Geçmiş Temizlensin mi?",
        "historyClearDesc": "Kaydedilen tüm promptlar kalıcı olarak silinecek. Bu işlem geri alınamaz.",
        "btnYesClear": "Evet, Hepsini Sil",
        "wandTitle": "Prompt İyileştirme Önizlemesi",
        "wandOriginal": "ORİJİNAL PROMPT",
        "wandEnhanced": "İYİLEŞTİRİLMİŞ PROMPT",
        "btnKeepOriginal": "Orijinali Koru",
        "btnApplyChanges": "Değişiklikleri Uygula",
        "shareTitle": "Genel Paylaşım Bağlantısı",
        "shareDesc": "Resminiz artık bu bağlantı üzerinden herkese açık. URL'ye sahip olan herkes resmi görüntüleyebilir.",
        "btnShareCopy": "Bağlantıyı Kopyala",
        "btnShareView": "Resmi Görüntüle",
        "btnShareWait": "Bekleyin...",
        "btnShareCopied": "Kopyalandı!",
        "btnShareError": "Hata",
        "msgUploading": "Sunucuya yükleniyor...",
        "msgUploadFail": "Yükleme başarısız. Tekrar deneyin.",
        "btnDownload": "İndir",
        "msgProcessing": "İşleniyor...",
        "msgPreparingLink": "Bağlantı Hazırlanıyor...",
        "btnBackup": "Verileri Yedekle",
        "btnRestore": "Verileri Geri Yükle",
        "msgBackupDownloaded": "Yedek dosyası başarıyla indirildi.",
        "msgBackupRestoring": "Yedek geri yükleniyor...",
        "msgBackupSuccess": "resim başarıyla geri yüklendi!",
        "msgBackupError": "Dosya bozuk veya geçersiz.",
        "msgExportError": "Yedekleme hatası!",
        "btnConfirmBackup": "Evet, Yedekle",
        "restoreModalTitle": "Geri Yükleme Seçenekleri",
        "lblSelectData": "İşlenecek verileri seçin:",
        "optGallery": "Galeri Görselleri",
        "btnConfirm2": "Onayla",
        "dataModalTitle": "Yedekleme Seçenekleri",
        "dataModalDesc": "Yedeklemek veya geri yüklemek istediğiniz verileri seçin.",
        "lblChkSettings": "Ayarlar (API Anahtarı, Tema vb.)",
        "lblChkGallery": "Galeri",
        "lblChkChat": "Sohbet Verileri",
        "btnDataCancel": "İptal",
        "btnDataConfirm": "Onayla",
        "chatBackBtn": "Geri",
        "chatNewBtn": "Yeni",
        "chatSidebarTitle": "Sohbet Geçmişi",
        "chatNoConv": "Henüz sohbet yok. Yeni bir konuşma başlatın.",
        "chatLoading": "Yükleniyor...",
        "chatLoadError": "Sohbetler yüklenemedi.",
        "chatNoSelected": "Bir sohbet seçin veya yeni bir tane başlatın.",
        "chatNoMessages": "Henüz mesaj yok. Bir şeyler yazın!",
        "chatPlaceholder": "Mesajınızı yazın...",
        "chatPlaceholderReply": "Bu bir taslak yanıttır. API entegrasyonu yakında eklenecek.",
        "chatSelectFirst": "Önce bir sohbet seçin veya başlatın.",
        "chatNewConv": "Yeni sohbet",
        "chatDeleteBtn": "Sil",
        "userInfoName": "Adınız nedir?",
        "userInfoAge": "Yaşınız kaç?",
        "userInfoGender": "Cinsiyetiniz nedir?",
        "userInfoSubmit": "Sohbeti Başlat",
        "userInfoNext": "İleri",
        "userInfoAgeError": "Yaş 16 ile 70 arasında olmalıdır.",
        "userInfoNameError": "İsim 3 ile 10 karakter arasında olmalıdır.",
        "userInfoCharName": "Karakterin adı ne olsun?",
        "userInfoCharNameError": "Karakter adı 2 ile 15 karakter arasında olmalıdır.",
        "genderMale": "Erkek",
        "genderFemale": "Kadın",
        "genderNonBinary": "Non-Binary",
        "genderGenderqueer": "Genderqueer",
        "genderGenderfluid": "Genderfluid",
        "genderAgender": "Agender",
        "genderOther": "Diğer",
        "tabScene": "Sahne",
        "tabAction": "Aksiyon",
        "tabSystem": "Sistem",
        "chatImageGenerated": "[Kullanıcı mevcut sahnenin bir görselini oluşturdu]",
        "genderFemboy": "Femboy",
        "genderTransgender": "Transgender",
        "genderLesbian": "Lezbiyen",
        "genderGay": "Gay",
        "genderTomboy": "Tomboy",
        "genderBack": "Geri",
        "userInfoModel": "Model Seçimi",
        "modelFast": "Hızlı",
        "modelThinking": "Düşünen",
        "modelFastDesc": "Hızlı yanıtlar, gündelik sohbet için ideal.",
        "modelThinkingDesc": "Daha yavaş, mantıklı ve detaylı yanıtlar.",
        "profileTitle": "Kullanıcı Profili",
        "profileName": "İsim",
        "profileCharName": "AI Adı",
        "profileAge": "Yaş",
        "profileGender": "Cinsiyet",
        "profileModel": "Model",
        "profileCost": "Harcanan Tutar",
        "dataBtn": "Veriler",
        "chatDataTitle": "Sohbet Verileri",
        "chatDataTotalConvos": "Toplam Sohbet",
        "chatDataTotalMessages": "Toplam Mesaj",
        "chatDataTotalCost": "Toplam Maliyet",
        "chatDataDownload": "Kopyayı İndir",
        "chatDataView": "Logları Gör",
        "chatDataClose": "Kapat",
        "filterImgGen": "Görsel Oluşturma Desteği",
        "filterCategory": "Kategori",
        "filterSubCategories": "Alt Kategoriler",
        "filterReset": "Filtreleri Sıfırla",
        "filterAll": "Tümü",
        "chatSearchPlaceholder": "Karakter ara...",
        "unknownCharacter": "Bilinmeyen Karakter",
        "characterNM": " (Varsayılan)",
        "toggleThoughts": "Düşünce Balonlarını Göster",
        "chatStoryFinished": "Bu hikaye sonuna ulaştı. Yeni bir maceraya başlamak için yeni bir sohbet başlatabilirsiniz.",
        "chatStoryFinishedPlaceholder": "Bu hikaye sona erdi.",
        "chatStoryContinued": "Hikaye aslında burada sona ermişti, ancak kullanıcı devam etmek istedi.",
        "chatStoryContinuePlaceholder": "Hikaye devam ediyor...",
        "editorUploadLabel": "Resim Yükle",
        "editorPresetsLabel": "Hazır Ayarlar",
        "editorInstructionsLabel": "Talimatlar",
        "editorUploadMsg": "Resim Yüklemek veya Sürüklemek için Tıklayın",
        "editorPromptPlaceholder": "Resmi nasıl değiştirmek istediğinizi tarif edin...",
        "editorGenerateBtn": "Varyasyon Oluştur",
        "editorLoadingPresets": "Hazır ayarlar yükleniyor...",
        "editorNoPresets": "Hazır ayar bulunamadı.",
        "editorFailedPresets": "Hazır ayarlar yüklenemedi.",
        "editorSearchPlaceholder": "Hazır ayarları ara...",
        "editorSearchNoResults": "Sonuç bulunamadı",
        "lblPromptPreview": "PROMPT ÖNİZLEME",
        "lblPromptPreviewDesc": "Prompt yazarken benzer görsellerin önizlemesini göstererek oluşturma öncesinde sonucu görselleştirmenize olanak tanır.",
        "promptPreviewNoResult": "Ön izleme bulunamadı",
        "promptPreviewTryEnglish": "Lütfen İngilizce deneyin",
        "promptPreviewLoading": "Aranıyor...",
        "promptPreviewCountdown": "Ön izleme için {0} karakter daha girin",
        "promptPreviewTitle": "Önizleme",
        "sortDefault": "Varsayılan",
        "sortIntel": "Zeka",
        "sortQual": "Kalite",
        "sortSpeed": "Hız",
        "multiSelectDelete": "Seçilenleri Sil",
        "multiSelectCancel": "İptal",
        "multiSelectCount": "{0} seçildi",
        "multiSelectConfirmTitle": "Seçilen Görseller Silinsin mi?",
        "multiSelectConfirmDesc": "Seçilen görseller kalıcı olarak silinecek. Bu işlem geri alınamaz.",
        "lblSkipIntro": "İNTROYU ATLA",
        "lblSkipIntroDesc": "Bir sonraki ziyaretinizde sinematik intro sayfasını atlayın."
    }
};

let currentLang = localStorage.getItem('thena-language') || 'en';

const domElementCache = {
    initialized: false,
    static: {},
    labels: []
};

function initDomCache() {
    if (domElementCache.initialized) return;

    const ids = [
        'lbl-intel', 'lbl-qual', 'lbl-speed', 'btn-export-data', 'btn-import-data',
        'btn-language', 'prompt', 'api-key', 'generate-btn', 'gallery-btn',
        'label-api-key', 'lbl-model-text', 'txt-show-all', 'btn-show-all-models',
        'txt-fast', 'txt-creative', 'txt-dense', 'txt-movie', 'txt-highres', 'txt-enhance',
        'txt-filter', 'txt-delete-all', 'lbl-solid-colors', 'lbl-gradient-themes',
        'lbl-perf-mode', 'desc-perf-mode', 'lbl-silent-mode', 'desc-silent-mode',
        "lbl-adv-mode", "desc-adv-mode", "lbl-auto-mode", "desc-auto-mode",
        "lbl-perf-monitor", "desc-perf-monitor",
        "lbl-data-mgmt", "desc-data-mgmt", "btn-hard-reset", "btn-close-settings",
        "lbl-skip-intro", "desc-skip-intro",
        'btn-share-copy', 'btn-img2prompt-generate', 'chat-back-btn',
        'character-search-input', 'chat-message-input', 'chat-data-btn',
        'chat-filter-reset-btn', 'custom-main-category-trigger', 'chat-main-category-filter',
        'lbl-toggle-thoughts', 'editor-prompt',
        'txt-tab-scene', 'txt-tab-action', 'txt-tab-system',
        'filter-label-img-gen', 'filter-label-category', 'filter-label-subcategories',
        'label-editor-upload', 'label-editor-presets', 'label-editor-instructions',
        'txt-editor-upload', 'txt-editor-loading-presets', 'editor-generate-btn', 'editor-preset-search',
        'editor-search-no-results-text',
        'txt-filter-chip-all'
    ];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) domElementCache.static[id] = el;
    });

    const labels = document.querySelectorAll('label');
    labels.forEach(lbl => {
        if (lbl.id && lbl.id.startsWith('label-editor-')) return;
        
        const txt = lbl.innerText.trim();
        let type = null;
        
        if (txt.startsWith("Prompt") || txt.startsWith("İstem")) type = 'prompt';
        else if (txt.includes("Model")) type = 'model';
        else if (txt === "Aspect Ratio" || txt === "En boy Oranı") type = 'ratio';
        else if (txt === "Extra Features" || txt === "Ekstra Özellikler") type = 'extra';
        else if (txt.includes("Advanced Settings") || txt.includes("Gelişmiş Ayarlar")) type = 'adv';
        
        if (type) {
            domElementCache.labels.push({ el: lbl, type: type });
        }
    });

    domElementCache.initialized = true;
}

function safelySetText(id, text) {
    const el = domElementCache.static[id] || document.getElementById(id);
    if (el) {
        el.textContent = text;
        if (!domElementCache.static[id]) domElementCache.static[id] = el;
    }
}

function setQueryText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
}

function updateLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    
    if (!domElementCache.initialized) initDomCache();

    const cache = domElementCache.static;

    if (cache['lbl-intel']) cache['lbl-intel'].textContent = t.lblIntel;
    if (cache['lbl-qual']) cache['lbl-qual'].textContent = t.lblQual;
    if (cache['lbl-speed']) cache['lbl-speed'].textContent = t.lblSpeed;
    if (cache['btn-export-data']) cache['btn-export-data'].textContent = t.btnBackup;
    if (cache['btn-import-data']) cache['btn-import-data'].textContent = t.btnRestore;

    if (cache['btn-language']) {
        cache['btn-language'].title = lang === 'en' ? "Language: English" : "Dil: Türkçe";
    }

    document.querySelector(".search-input").placeholder = t.searchPlaceholder;
    document.querySelector("#showcase-search").placeholder = t.searchPlaceholder;

    if (cache['prompt']) cache['prompt'].placeholder = t.promptPlaceholder;
    if (cache['api-key']) cache['api-key'].placeholder = t.apiKeyPlaceholder;
    if (cache['generate-btn']) cache['generate-btn'].textContent = t.generateBtn;
    if (cache['gallery-btn']) cache['gallery-btn'].textContent = t.galleryBtn;

    const apiKeyLabel = cache['label-api-key'];
    if (apiKeyLabel) {
        apiKeyLabel.innerHTML = `${t.apiKeyLabel} <a href="https://t.me/ThenaAIBot?start=refAPI" target="_blank" class="api-link-btn"> ${t.getApiKey} <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`;
    }

    for (let i = 0; i < domElementCache.labels.length; i++) {
        const item = domElementCache.labels[i];
        if (item.type === 'prompt') item.el.textContent = t.promptLabel;
        else if (item.type === 'model') {
             const spanText = cache['lbl-model-text'];
             if (spanText) spanText.textContent = t.modelLabel;
             
             const btnText = cache['txt-show-all'];
             const btn = cache['btn-show-all-models'];

             if (btnText && btn) {
                if (btn.classList.contains('active')) {
                    btnText.textContent = lang === 'tr' ? "Sadece Temel Modeller" : "Base Models Only";
                } else {
                    btnText.textContent = lang === 'tr' ? "Tüm Modelleri Göster" : "Show All Models";
                }
            }
        }
        else if (item.type === 'ratio') item.el.textContent = t.ratioLabel;
        else if (item.type === 'extra') item.el.textContent = t.extraLabel;
        else if (item.type === 'adv') item.el.textContent = t.advLabel;
    }

    safelySetText('txt-fast', t.featFast);
    safelySetText('txt-creative', t.featCreative);
    safelySetText('txt-dense', t.featDense);
    safelySetText('txt-movie', t.featMovie);
    safelySetText('txt-highres', t.featHighRes);
    safelySetText('txt-enhance', t.featEnhance);
    safelySetText('txt-filter', t.lblFilter);
    safelySetText('txt-delete-all', t.btnDelAll);

    safelySetText('lbl-solid-colors', t.lblSolid);
    safelySetText('lbl-gradient-themes', t.lblGradient);

    safelySetText('lbl-perf-mode', t.lblPerf);
    safelySetText('desc-perf-mode', t.lblPerfDesc);

    safelySetText('lbl-silent-mode', t.lblSilent);
    safelySetText('desc-silent-mode', t.lblSilentDesc);

    safelySetText('lbl-adv-mode', t.lblAdv);
    safelySetText('desc-adv-mode', t.lblAdvDesc);

    safelySetText('lbl-auto-mode', t.lblAuto);
    safelySetText('desc-auto-mode', t.lblAutoDesc);

    safelySetText('lbl-perf-monitor', t.lblPerfMon);
    safelySetText('desc-perf-monitor', t.lblPerfMonDesc);

    safelySetText('lbl-prompt-preview', t.lblPromptPreview);
    safelySetText('desc-prompt-preview', t.lblPromptPreviewDesc);
    safelySetText('prompt-preview-title', t.promptPreviewTitle);

    safelySetText('lbl-data-mgmt', t.lblData);
    safelySetText('desc-data-mgmt', t.lblDataDesc);

    safelySetText('lbl-skip-intro', t.lblSkipIntro);
    safelySetText('desc-skip-intro', t.lblSkipIntroDesc);


    setQueryText('#gallery-modal .gallery-title', t.galleryTitle);
    setQueryText('#showcase-modal .gallery-title', t.showcaseTitle);
    setQueryText('#settings-modal h3', t.settingsTitle);

    setQueryText('#confirm-modal h3', t.deleteTitle);
    setQueryText('#confirm-modal p', t.deleteDesc);
    setQueryText('#btn-cancel', t.btnCancel);
    setQueryText('#btn-confirm', t.btnConfirm);

    setQueryText('#delete-all-modal h3', t.deleteAllTitle);
    setQueryText('#delete-all-modal p', t.deleteAllDesc);
    setQueryText('#btn-cancel-all', t.btnCancel);
    setQueryText('#btn-confirm-all', t.btnConfirmAll);

    setQueryText('#hard-reset-modal h3', t.resetTitle);
    setQueryText('#hard-reset-modal p', t.resetDesc);
    setQueryText('#btn-cancel-reset', t.btnCancel);
    setQueryText('#btn-confirm-reset', t.btnConfirmReset);

    setQueryText('#img2prompt-modal h3', t.img2promptTitle);
    setQueryText('#img2prompt-modal p', t.img2promptDesc);
    setQueryText('#upload-placeholder span', t.btnUpload);
    setQueryText('#btn-img2prompt-cancel', t.btnCancel);

    setQueryText('#prompt-history-title', t.recentPrompts);
    setQueryText('#clear-history-btn', t.clearHistory);

    setQueryText('#history-clear-modal h3', t.historyClearTitle);
    setQueryText('#history-clear-modal p', t.historyClearDesc);
    setQueryText('#btn-history-cancel', t.btnCancel);
    setQueryText('#btn-history-confirm', t.btnYesClear);

    setQueryText('#wand-modal h3', t.wandTitle);
    const origTitle = document.querySelector('.diff-box.original h6');
    if (origTitle) origTitle.textContent = t.wandOriginal;
    const enhTitle = document.querySelector('.diff-box.enhanced h6');
    if (enhTitle) enhTitle.textContent = t.wandEnhanced;

    setQueryText('#btn-wand-cancel', t.btnKeepOriginal);
    setQueryText('#btn-wand-confirm', t.btnApplyChanges);

    const resetDataBtn = cache['btn-hard-reset'];
    if (resetDataBtn) resetDataBtn.textContent = t.btnResetData;

    setQueryText('#btn-close-settings', t.btnClose);

    setQueryText('#share-title', t.shareTitle);
    setQueryText('#share-desc', t.shareDesc);
    setQueryText('#txt-share-view', t.btnShareView);
    const copyBtn = cache['btn-share-copy'];
    if (copyBtn && !copyBtn.disabled) copyBtn.textContent = t.btnShareCopy;
    const genPromptBtn = cache['btn-img2prompt-generate'];
    if (genPromptBtn && !genPromptBtn.classList.contains('loading')) {
        const span = genPromptBtn.querySelector('span');
        if (span) span.textContent = t.btnGenPrompt;
    }

    setQueryText('#btn-close-settings', t.btnClose);

    const settingsLabels = document.querySelectorAll('.settings-content label'); 
    settingsLabels.forEach(l => {
        const cleanTxt = l.innerText.split('\n')[0].trim();
        if (cleanTxt.includes("THEME COLORS") || cleanTxt.includes("TEMA RENKLERİ")) l.firstChild.textContent = t.lblSolid;
        if (cleanTxt.includes("GRADIENT THEMES") || cleanTxt.includes("GRADYAN TEMALAR")) l.firstChild.textContent = t.lblGradient;

        if (cleanTxt.includes("PERFORMANCE MODE") || cleanTxt.includes("PERFORMANS MODU")) {
            l.childNodes[0].textContent = t.lblPerf + "\n";
            if (l.nextElementSibling && l.nextElementSibling.tagName === 'P') l.nextElementSibling.textContent = t.lblPerfDesc;
        }
        if (cleanTxt.includes("SILENT MODE") || cleanTxt.includes("SESSİZ MOD")) {
            l.childNodes[0].textContent = t.lblSilent + "\n";
            if (l.nextElementSibling && l.nextElementSibling.tagName === 'P') l.nextElementSibling.textContent = t.lblSilentDesc;
        }
        if (cleanTxt.includes("ADVANCED MODE") || cleanTxt.includes("GELİŞMİŞ MOD")) {
            l.childNodes[0].textContent = t.lblAdv + "\n";
            if (l.nextElementSibling && l.nextElementSibling.tagName === 'P') l.nextElementSibling.textContent = t.lblAdvDesc;
        }
        if (cleanTxt.includes("PROMPT AUTOCOMPLETE") || cleanTxt.includes("PROMPT OTOMATİK TAMAMLAMA")) {
            l.childNodes[0].textContent = t.lblAuto + "\n";
            if (l.nextElementSibling && l.nextElementSibling.tagName === 'P') l.nextElementSibling.textContent = t.lblAutoDesc;
        }
        if (cleanTxt.includes("PERFORMANCE MONITOR") || cleanTxt.includes("PERFORMANS GÖSTERGESİ")) {
            l.childNodes[0].textContent = t.lblPerfMon + "\n";
            if (l.nextElementSibling && l.nextElementSibling.tagName === 'P') l.nextElementSibling.textContent = t.lblPerfMonDesc;
        }
        if (cleanTxt.includes("DATA MANAGEMENT") || cleanTxt.includes("VERİ YÖNETİMİ")) {
            l.textContent = t.lblData;
            if (l.nextElementSibling && l.nextElementSibling.tagName === 'P') l.nextElementSibling.textContent = t.lblDataDesc;
        }
    });

    const chatBackBtn = cache['chat-back-btn'];
    if (chatBackBtn) chatBackBtn.title = t.chatBackBtn;

    const newChatBtnSpan = document.querySelector('#new-chat-btn span');
    if (newChatBtnSpan) newChatBtnSpan.textContent = t.chatNewBtn;

    const sidebarTitle = document.querySelector('.sidebar-header-title');
    if (sidebarTitle) sidebarTitle.textContent = t.chatSidebarTitle;

    const characterSearchInput = cache['character-search-input'];
    if (characterSearchInput) characterSearchInput.placeholder = t.chatSearchPlaceholder;

    const chatMsgInput = cache['chat-message-input'];
    if (chatMsgInput) chatMsgInput.placeholder = t.chatPlaceholder;

    const noConvSelected = document.querySelector('.no-conv-selected');
    if (noConvSelected) noConvSelected.textContent = t.chatNoSelected;

    const convEmpty = document.querySelector('.conv-empty');
    if (convEmpty) convEmpty.textContent = t.chatNoConv;

    safelySetText('txt-tab-scene', t.tabScene);
    safelySetText('txt-tab-action', t.tabAction);
    safelySetText('txt-tab-system', t.tabSystem);

    const profileTitle = document.querySelector('#user-profile-modal h3');
    if (profileTitle) profileTitle.textContent = t.profileTitle;
    
    const profileLabels = document.querySelectorAll('.profile-label');
    if (profileLabels.length > 0) {
        // 0: Name, 1: CharName, 2: Age, 3: Gender, 4: Model, 5: Cost
        if (profileLabels[0]) profileLabels[0].textContent = t.profileName;
        if (profileLabels[1]) profileLabels[1].textContent = t.profileCharName;
        if (profileLabels[2]) profileLabels[2].textContent = t.profileAge;
        if (profileLabels[3]) profileLabels[3].textContent = t.profileGender;
        if (profileLabels[4]) profileLabels[4].textContent = t.profileModel;
        if (profileLabels[5]) profileLabels[5].textContent = t.profileCost;
    }

    const chatDataBtn = cache['chat-data-btn'];
    if (chatDataBtn) chatDataBtn.textContent = t.dataBtn;

    safelySetText('filter-label-img-gen', t.filterImgGen);
    safelySetText('filter-label-category', t.filterCategory);
    safelySetText('filter-label-subcategories', t.filterSubCategories);
    safelySetText('chat-filter-reset-btn', t.filterReset);

    const customDropdownAllOption = document.querySelector('.custom-dropdown-option[data-value=""]');
    if (customDropdownAllOption) customDropdownAllOption.textContent = t.filterAll;

    const customDropdownTrigger = cache['custom-main-category-trigger'];
    const customDropdownInput = cache['chat-main-category-filter'];
    if (customDropdownTrigger && customDropdownInput && customDropdownInput.value === "") {
        customDropdownTrigger.textContent = t.filterAll;
    }

    safelySetText('lbl-toggle-thoughts', t.toggleThoughts);
    
    safelySetText('label-editor-upload', t.editorUploadLabel);
    safelySetText('label-editor-presets', t.editorPresetsLabel);
    safelySetText('label-editor-instructions', t.editorInstructionsLabel);
    safelySetText('txt-editor-upload', t.editorUploadMsg);
    safelySetText('txt-editor-loading-presets', t.editorLoadingPresets);
    safelySetText('editor-generate-btn', t.editorGenerateBtn);
    
    const editorPrompt = cache['editor-prompt'];
    if(editorPrompt) editorPrompt.placeholder = t.editorPromptPlaceholder;

    const editorPresetSearch = cache['editor-preset-search'];
    if(editorPresetSearch) editorPresetSearch.placeholder = t.editorSearchPlaceholder;

    safelySetText('editor-search-no-results-text', t.editorSearchNoResults);

    safelySetText('txt-filter-chip-all', t.filterAll);

    if (typeof window.updateModelSortLanguage === 'function') {
        window.updateModelSortLanguage();
    }

    if (typeof window._updateMultiSelectLanguage === 'function') {
        window._updateMultiSelectLanguage();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initDomCache();
    
    const langBtn = document.getElementById('btn-language');

    updateLanguage(currentLang);
    updateAppSwitcherLang(currentLang);
    const sortText = document.getElementById('sort-text');
    if (sortText) { 
        sortText.textContent = typeof sortNewestFirst !== 'undefined' && sortNewestFirst 
            ? (currentLang == "tr" ? "En Yeni" : "Newest") 
            : (currentLang == "tr" ? "En Eski" : "Oldest");
    }
    
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'tr' : 'en';
            localStorage.setItem('thena-language', currentLang);
            document.documentElement.lang = currentLang;
            updateLanguage(currentLang);
            updateAppSwitcherLang(currentLang);

            const sortTextEl = document.getElementById('sort-text');
            if (sortTextEl) {
                sortTextEl.textContent = typeof sortNewestFirst !== 'undefined' && sortNewestFirst
                    ? (currentLang === 'tr' ? 'En Yeni' : 'Newest')
                    : (currentLang === 'tr' ? 'En Eski' : 'Oldest');
            }

            if (typeof window.updateDataManagementLanguage === 'function') {
                window.updateDataManagementLanguage();
            }

            if (typeof renderCharacters === 'function' && typeof allCharacters !== 'undefined' && allCharacters.length > 0) {
                renderCharacters(allCharacters);
            }

            if (typeof playInformationSound === "function") playInformationSound();

            if (typeof showNotification === "function") {
                const msg = currentLang === 'en' ? "Language changed to English" : "Dil Türkçe olarak değiştirildi";
                showNotification(msg, "info");
            }
        });
    }
});

const appSwitcherTranslations = {
    en: {
        title: "Select Application",
        genTitle: "AI Image Gen",
        genStatus: "Active",
        chatTitle: "AI Chat Bots",
        chatStatus: "Start",
        editorTitle: "Image Editor",
        editorStatus: "Start",
        close: "Close"
    },
    tr: {
        title: "Uygulama Seçin",
        genTitle: "AI Görsel Üretim",
        genStatus: "Aktif",
        chatTitle: "AI Sohbet Botları",
        chatStatus: "Başlat",
        editorTitle: "Resim Editörü",
        editorStatus: "Başlat",
        close: "Kapat"
    }
};

function updateAppSwitcherLang(lang) {
    if (!lang) {
        lang = document.documentElement.lang || 'en';
    }

    if (!appSwitcherTranslations[lang]) lang = 'en';

    const t = appSwitcherTranslations[lang];

    const currentMode = localStorage.getItem('thena-last-app-mode') || 'image';
    const txtActive = t.genStatus; 
    const txtStart = t.chatStatus;

    const safelySetTextById = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    };

    safelySetTextById('txt-app-switch-title', t.title);
    safelySetTextById('txt-app-gen-title', t.genTitle);
    safelySetTextById('txt-app-gen-status', (currentMode === 'image') ? txtActive : txtStart);
    safelySetTextById('txt-app-chat-title', t.chatTitle);
    safelySetTextById('txt-app-chat-status', (currentMode === 'chat') ? txtActive : txtStart);
    safelySetTextById('txt-app-editor-title', t.editorTitle);
    safelySetTextById('txt-app-editor-status', (currentMode === 'editor') ? txtActive : txtStart);
    safelySetTextById('txt-app-close', t.close);
}

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.lang = currentLang;
    updateAppSwitcherLang(currentLang);
});