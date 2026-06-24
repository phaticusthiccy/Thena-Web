const translations = {
    "en": {
        "lblSliderBefore": "Before",
        "lblSliderAfter": "After",
        "generateBtn": "Generate Image",
        "galleryBtn": "Gallery",
        "invalidApiKey": "Invalid API Key! Please check your API key.",
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
        "lblImg2PromptDetail": "Detail Level",
        "btnDetailLow": "Default",
        "btnDetailMedium": "Detailed",
        "btnDetailHigh": "Ultra Detailed",
        "btnCancel": "Cancel",
        "btnConfirm": "Yes, Delete",
        "btnConfirmAll": "Yes, Delete All",
        "btnConfirmReset": "Yes, Delete Everything",
        "btnClose": "Close",
        "btnUpload": "Click to Upload or Paste Image",
        "btnMobilePaste": "Paste from Clipboard",
        "btnGenPrompt": "Generate Prompt",
        "msgClipboardNoSupport": "Your browser does not support clipboard read. Please upload the image.",
        "msgClipboardNoImage": "No image found in clipboard. Copy an image first.",
        "msgClipboardDenied": "Clipboard access denied. Allow permission in browser settings.",
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
        "btnApiDocs": "API Documentation",
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
        "btnRevealBlur": "Reveal",
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
        "randomPromptTitle": "Random Prompt Generated",
        "randomPromptSubtitle": "New Prompt",
        "btnRandomApply": "Apply New Prompt",
        "msgPromptGenerating": "Prompt is being generated...",
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
        "modelUltra": "Intelligent",
        "modelUltraDesc": "More understanding ability but more robotic responses possible.",
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
        "filterPaid": "Paid Models",
        "chatSearchPlaceholder": "Search characters...",
        "unknownCharacter": "Unknown Character",
        "characterNM": " (Default)",
        "toggleThoughts": "Show Thoughts",
        "toggleEmotions": "Show Emotions",
        "emotionNames": {
            "happy": "Happy", "sad": "Sad", "angry": "Angry", "scared": "Scared",
            "surprised": "Surprised", "disgusted": "Disgusted", "excited": "Excited",
            "bored": "Bored", "confused": "Confused", "neutral": "Neutral",
            "flirtatious": "Flirtatious", "sarcastic": "Sarcastic", "shy": "Shy",
            "confident": "Confident", "amused": "Amused", "jealous": "Jealous",
            "guilty": "Guilty", "curious": "Curious", "hopeful": "Hopeful",
            "anxious": "Anxious", "frustrated": "Frustrated", "affectionate": "Affectionate",
            "romantic": "Romantic", "loving": "Loving", "passionate": "Passionate",
            "infatuated": "Infatuated", "seductive": "Seductive",
            "lustful": "Lustful", "aroused": "Aroused", "submissive": "Submissive",
            "dominant": "Dominant", "desiring": "Desiring",
            "melancholic": "Melancholic", "hopeless": "Hopeless", "lonely": "Lonely",
            "heartbroken": "Heartbroken", "nostalgic": "Nostalgic", "empty": "Empty",
            "desperate": "Desperate",
            "thrilled": "Thrilled", "euphoric": "Euphoric", "adventurous": "Adventurous"
        },
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
        "lblSkipIntroDesc": "Skip the cinematic intro page on your next visit.",
        "lblPowerSaver": "POWER SAVER",
        "lblPowerSaverDesc": "Automatically reduces power consumption after 20 seconds of inactivity. Limits FPS, pauses animations, and dims the screen.",
        "msgNotAllowed": "Please set moderation level to medium or low.",
        "msgNotAllowedLow": "This image cannot be generated with Thena.",
        "msgNotAllowedHighMod": "This prompt is unacceptable. Please edit your prompt!",
        "msgImgProcessing": "Image is being processed...",
        "promptProcessing": "Prompt is being generated...",
        "msgMinSteps": "Minimum steps is 10. Value updated.",
        "msgMaxSteps": "Maximum steps is 30. Value updated.",
        "msgMinCfg": "Minimum CFG Scale is 1. Value updated.",
        "msgMaxCfg": "Maximum CFG Scale is 20. Value updated.",
        "msgMinSeed": "Minimum Seed is -1. Value updated.",
        "msgMaxSeed": "Maximum Seed is 900000000. Value updated.",
        "msgImgSaved": "The image has been saved to the gallery.",
        "msgLimitExceeded": "Limit Exceeded! Please wait a few seconds and try again.",
        "modelMaintenance": "This model is currently under maintenance. Please try again later.",
        "msgServerOverloaded": "Thena is currently overloaded. Please try again later.",
        "msgGenError": "There was an error generating the image. Please try again.",
        "msgPromptUpdated": "Prompt updated successfully!",
        "msgModMedium": "Moderation set to medium.",
        "msgModLow": "Moderation set to low.",
        "msgModHigh": "Moderation set to high.",
        "msgModUltraLocked": "Moderation level is locked to High for this model.",
        "msgEnterApiKey": "Please enter an API Key first.",
        "msgModelUnavailableWait": "This model is currently unavailable. Remaining wait time: ",
        "msgRateLimitFail": "Rate limit check failed. Please try again.",
        "msgAnimeFastLimits": "Limits updated for Anime Fast model.",
        "msgPromptMagicLimit": "Prompt length reduced to fit Prompt Magic limit (1150 chars).",
        "msgPromptRestored": "Prompt length restored to 5000 chars.",
        "msgUnstableConn": "Your internet connection is unstable. Please wait a moment.",
        "msgPromptShort": "Prompt is too short! Please enter at least 10 characters.",
        "msgPromptLong1": "Prompt is too long! Max ",
        "msgPromptLong2": " characters allowed.",
        "msgPromptEmpty": "The prompt field is empty! Please type something.",
        "msgPromptGenErr": "The prompt could not be created. An error occurred.",
        "msgUnknownError": "An error occurred:",
        "msgTelegramSent": "Image has been sent to Telegram.",
        "msgTelegramErr": "Download failed. Please start the bot and try again!",
        "msgDownloadCompleted": "Download completed.",
        "msgDownloadFailed": "Download failed. Please try again.",
        "msgGalleryEmpty": "The gallery is already empty.",
        "msgGalleryCleaned": "The entire gallery has been successfully cleaned.",
        "msgGalleryCleanErr": "An error occurred during the deletion process.",
        "msgSettingsLoaded": "Settings loaded from this image!",
        "msgImgUploaded": "Image uploaded successfully!",
        "msgInvalidApi": "Invalid API Key provided.",
        "msgLimit10": "Upload limit exceeded. Max 10 uploads per day.",
        "msgServerErr": "Server error. Please try again later.",
        "msgImgNotBase": "Image source is not base64.",
        "msgUploadFailed": "Image upload failed.",
        "msgPerfModeOn": "Performance Mode Enabled",
        "msgPerfModeHalf": "Balanced Performance Mode Enabled",
        "msgPerfModeOff": "Performance Mode Disabled",
        "msgPerfMonOn": "Performance Monitor Enabled",
        "msgPerfMonOff": "Performance Monitor Disabled",
        "msgPreviewOn": "Prompt Preview Enabled",
        "msgPreviewOff": "Prompt Preview Disabled",
        "msgIntroSkipped": "Intro Skipped",
        "msgPowerSaverOn": "Power Saver Enabled",
        "msgPowerSaverOff": "Power Saver Disabled",
        "msgSilentModeOn": "Silent Mode Enabled",
        "msgSilentModeOff": "Silent Mode Disabled",
        "msgAdvModeOn": "Advanced Mode Enabled",
        "msgAdvModeOff": "Advanced Mode Disabled",
        "msgThemeUpdated": "Theme updated successfully!",
        "msgAppReset": "Application successfully reset. Page reloading...",
        "msgResetError": "Error occurred during reset: ",
        "msgShowcaseFetchErr": "Failed to fetch showcase images. Please try again later.",
        "msgInvalidImgFile": "Please select a valid image file.",
        "msgImgTooLarge": "Image is too large (Max 5MB).",
        "msgGenPrompt": "Generating prompt from image. This may take a moment...",
        "msgModelUpdated": "Model switched to: ",
        "msgPromptSettingsApplied": "Prompt and settings applied successfully!",
        "msgGenPromptFailed": "Failed to generate prompt. Please try different image.",
        "msgPromptCopied": "Prompt copied to clipboard!",
        "msgHistCleared": "Prompt history cleared successfully.",
        "msgNoRefresh": "You cannot refresh the page while the process is running.",
        "msgImgDeleted": "The image has been successfully deleted.",
        "msgImgDeleteErr": "An error occurred during the deletion process.",
        "msgAutocompleteOff": "Autocomplete Disabled",
        "msgAutocompleteOn": "Autocomplete Enabled",
        "msgBaseModelsLoaded": "Reverted to base models.",
        "msgAllModelsLoaded": "All models loaded!",
        "msgModelUpdateErr": "Failed to update models.",
        "msgImgUploadSuccess": "Image uploaded successfully!",
        "msgModHighSet": "Moderation set to high.",
        "msgModMediumSet": "Moderation set to medium.",
        "msgModLowSet": "Moderation set to low.",
        "msgApiKeyRequired": "Please enter your API Key.",
        "msgImgRequired": "Please upload an image.",
        "msgPromptRequired": "Please enter a prompt.",
        "msgGeneratingQueued": "Generating... Queued.",
        "msgGenerating": "Generating...",
        "msgQueued": "Model queued...",
        "msgLimitWait": "Limit Exceeded! Please wait {0} seconds and try again.",
        "priorLimitDaily": "You have exceeded the daily limit for this feature. Please try again tomorrow.",
        "msgModMediumLowReq": "Please set moderation level to medium or low.",
        "msgThenaOverloaded": "Thena is currently overloaded. Please try again later.",
        "msgErrorPrefix": "Error: ",
        "msgVariationSuccess": "Variation generated successfully!",
        "msgImageShared": "Image shared!",
        "msgDownloadingImg": "Downloading image...",
        "msgImageNotFound": "Image not found.",
        "msgDownloadFailed": "Download failed.",
        "presetFilterAll": "Show All Presets",
        "presetFilterSafe": "Show only Safe Presets",
        "presetFilterPlus18": "Show only +18 Presets",
        "btnPresetFilterTitle": "Filter Presets",
        "msgPleaseWait": "Please do not close the page.",
        "editorCropLabel": "Crop Image",
        "editorCropCancel": "Cancel",
        "editorCropApply": "Apply",
        "exclusiveLabel": "Exclusive",
        "paidLabel": "Paid",
        "galleryStatsTitle": "Gallery Statistics",
        "statsModelsTitle": "Models Used",
        "statsExtrasTitle": "Extras Used",
        "statsCostTitle": "Total Estimated Cost",
        "statsApprox": "({0} Dollars Approx)",
        "statsApproxCents": "({0} Cents Approx)",
        "statsNoModels": "No images in gallery yet.",
        "statsNoExtras": "No extras used yet.",
        "mgTitle": "Select Finetuned Model",
        "mgRequestNewModel": "Request New Model",
        "mgSearchPlaceholder": "Search models...",
        "mgSortLabel": "Sort:",
        "mgCatLabel": "Category:",
        "mgProvLabel": "Provider:",
        "mgOptDefault": "Default",
        "mgOptNameAsc": "Name (A-Z)",
        "mgOptNameDesc": "Name (Z-A)",
        "mgCatAll": "All",
        "mgProvAll": "All Providers",
        "mgNoResults": "No models found.",
        "mgBadge": "Custom Model",
        "mgModels": "Model Gallery",
        "mgLblDescription": "Description",
        "mgLblCategory": "Category",
        "mgLblProvider": "Provider",
        "mgLblCost": "Cost / Image",
        "mgLblType": "Type",
        "mgSelectBtn": "Generate with this Model",
        "mgModelSelected": "Model selected",
        "mgRequestTitle": "Request New Model",
        "mgReqName": "Name",
        "mgReqMail": "Email",
        "mgReqTelegram": "Telegram",
        "mgOptional": "(optional)",
        "mgReqText": "Model Request",
        "mgReqNamePlaceholder": "Your name",
        "mgReqMailPlaceholder": "your@email.com",
        "mgReqTelegramPlaceholder": "@username",
        "mgReqTextPlaceholder": "Describe the model you want...",
        "mgCancelText": "Cancel",
        "mgSubmitText": "Send",
        "mgSending": "Sending...",
        "mgRequestSent": "Request sent successfully!",
        "mgRequestFail": "Failed to send request. Please try again.",
        "mgTypeBase": "Base Model",
        "mgLblTotalUsage": "Total Generated",
        "mgLblPerUnit": "Images per $1",
        "mgLblCredit": "Credits per Image",
        "mgOptPriceAsc": "Price (Low to High)",
        "mgOptPriceDesc": "Price (High to Low)",
        "mgOptUsageDesc": "Most Used",
        "mgOptUsageAsc": "Least Used",
        "mgPrevImg": "Previous Image",
        "mgNextImg": "Next Image",
        "msgServerBusy": "Server Busy",
        "msgServerBusyDesc": "Thena is very busy right now. Image generation may take a while.",
        "mgShowMoreStats": "Show more",
        "mgShowMoreLoading": "Loading...",
        "mgModelLoadTime": "Model Loading Time",
        "mgGenTime": "Avg. Generation Time",
        "elementsLabel": "Elements",
        "elementsAddTitle": "Add Element",
        "elementsSearchPlaceholder": "Search elements...",
        "elementsLoading": "Loading elements...",
        "elementsEmpty": "No elements found.",
        "elementsNsfwToggle": "+18",
        "elementsUseBtn": "Use Element",
        "elementsUseBtnSelected": "✓ Selected",
        "elementsMaxReached": "You can select at most 2 elements.",
        "elementsNoModel": "Please select a model first.",
        "elementsLoadFailed": "Failed to load elements.",
        "elInfoTitle": "What are Elements?",
        "elInfoSub": "LoRA-based Style Layers",
        "elInfoDesc": "Elements are <strong>LoRA</strong> (Low-Rank Adaptation) layers specific to the selected model. They add extra style, atmosphere, or character traits to your image. You can select up to <strong>2 elements</strong> at once.",
        "elInfoI1Title": "Model Compatibility",
        "elInfoI1Desc": "Each element only works with certain models. Elements reset when you change the model.",
        "elInfoI2Title": "Style Layer",
        "elInfoI2Desc": "Adds an art style, lighting effect, or special look to the image. It enhances your prompt, not replaces it.",
        "elInfoI3Title": "Max 2 Elements",
        "elInfoI3Desc": "At most 2 elements can be active per generation. Click the \"+\" button to open the element gallery.",
        "elInfoI4Title": "NSFW Elements",
        "elInfoI4Desc": "Use the NSFW toggle in the element gallery to show +18 elements.",
        "mgLoadFailed": "Failed to load models. Please try again.",
        "mgRetry": "Try Again",
        "editorModelLabel": "AI Model",
        "editorModelV1Name": "PixelFusion",
        "editorModelV1Tag": "U-Net",
        "editorModelV2Name": "NeuralFlow",
        "editorModelV2Tag": "Transformer",
        "editorV1InfoTitle": "PixelFusion",
        "editorV1InfoSub": "U-Net Architecture",
        "editorV1InfoDesc": "PixelFusion uses a classic <strong>U-Net</strong> encoder-decoder architecture for fast, reliable image variation generation. Ideal for precise edits with high spatial fidelity.",
        "editorV1I1Title": "Fast Generation",
        "editorV1I1Desc": "Optimized convolutional pipeline delivers results quickly, making it great for rapid iteration.",
        "editorV1I2Title": "Spatial Precision",
        "editorV1I2Desc": "Preserves structural details and edges, keeping edits true to the original image layout.",
        "editorV1I3Title": "Recommended For",
        "editorV1I3Desc": "Style transfers, color changes, texture variations, and edits that require high structural accuracy.",
        "editorV2InfoTitle": "NeuralFlow",
        "editorV2InfoSub": "Transformer Architecture",
        "editorV2InfoDesc": "NeuralFlow is powered by a modern <strong>Transformer</strong> attention mechanism, enabling richer semantic understanding. Produces highly creative and contextually aware variations.",
        "editorV2I1Title": "Semantic Understanding",
        "editorV2I1Desc": "Uses global attention to understand the full context of the image, leading to more coherent results.",
        "editorV2I2Title": "Creative Variations",
        "editorV2I2Desc": "Excels at generating imaginative and diverse outputs that go beyond simple pixel-level edits.",
        "editorV2I3Title": "Recommended For",
        "editorV2I3Desc": "Complex scene understanding, artistic reimaginings, and prompts that describe significant content changes.",
        "editorModelV3Name": "Synapse",
        "editorModelV3Tag": "Reasoning",
        "editorModelV3Badge": "MAX",
        "editorV3InfoTitle": "Synapse",
        "editorV3InfoSub": "Reasoning-Guided Generation",
        "editorV3InfoDesc": "Synapse is the most powerful editor model, driven by a <strong>reasoning engine</strong> that thinks through your prompt before generating. Delivers unmatched precision, coherence, and detail in every output.",
        "editorV3I1Title": "Reasoning Engine",
        "editorV3I1Desc": "Analyses the prompt deeply before generating — understanding intent, context, and nuance for highly accurate results.",
        "editorV3I2Title": "Maximum Quality",
        "editorV3I2Desc": "Highest fidelity output across all metrics — detail, coherence, and visual quality are all at their peak.",
        "editorV3I3Title": "Recommended For",
        "editorV3I3Desc": "Professional edits, complex multi-subject prompts, and any task where quality must not be compromised.",
        "editorProsTitle": "Strengths",
        "editorConsTitle": "Limitations",
        "editorModelV1Badge": "FAST",
        "editorModelV2Badge": "BEST",
        "editorV1Pro1": "Blazing fast results",
        "editorV1Pro2": "Preserves original composition",
        "editorV1Con1": "Limited to subtle edits",
        "editorV1Con2": "Lower output quality ceiling",
        "editorV2Pro1": "Rich, high-quality output",
        "editorV2Pro2": "Handles major scene changes",
        "editorV2Pro3": "Strong prompt comprehension",
        "editorV2Con1": "Sensitive to prompt wording",
        "editorV2Con2": "Vague prompts yield inconsistent results",
        "editorV3Pro1": "Highest quality output",
        "editorV3Pro2": "Deep intent understanding",
        "editorV3Pro3": "Best for complex instructions",
        "editorV3Con1": "Noticeably slower generation",
        "editorV3Con2": "Requires detailed, precise prompts",
        "outpaintLabel": "Outpaint Settings",
        "outpaintTop": "Top (px)",
        "outpaintBottom": "Bottom (px)",
        "outpaintLeft": "Left (px)",
        "outpaintRight": "Right (px)",
        "outpaintBtn": "Run Outpaint",
        "outpaintReset": "Reset",
        "outpaintPresetsTitle": "Quick Dimensions",
        "outpaintSuccess": "Outpaint completed successfully!",
        "outpaintQueued": "Outpaint queued. ",
        "outpaintPixelRequired": "Please enter at least one direction pixel value.",
        "torealBtn": "Generate Variation",
        "uhdBtn": "4K Upscale",
        "genderSwapBtn": "Gender Swap",
        "appCardGenderSwapName": "Gender Swap",
        "appCardGenderSwapDesc": "Swap the gender of the person in the image.",
        "msgNoHumanFound": "No human detected in the uploaded image.",
        "appCardEditName": "Image Editing",
        "appCardEditDesc": "Transform your image with AI, reshape with prompts.",
        "appCardOutpaintName": "Outpaint",
        "appCardOutpaintDesc": "Expand image borders with AI, add new areas.",
        "appCardAnythingToRealName": "Anything to Real",
        "appCardAnythingToRealDesc": "Transform any sketch or 3D view into a realistic image.",
        "appCardUhdUpscaleName": "4K Upscale",
        "appCardUhdUpscaleDesc": "Upscale your images to 4K quality.",
        "appCardFusionName": "Fusion",
        "appCardFusionDesc": "Fuse two images together using AI.",
        "editorFusionUploadLabel": "Upload Two Images",
        "fusionBtn": "Fusion",
        "fusionUpload1": "Click to upload Image 1",
        "fusionUpload2": "Click to upload Image 2",
        "fusionBlendRatio": "Blend Ratio",
        "fusionImage1": "Image 1",
        "fusionImage2": "Image 2",
        "appCardShowAll": "Show All",
        "appCardShowLess": "Show Less",
        "appCardStoriesName": "AI Stories",
        "appCardStoriesDesc": "Create interactive stories with AI.",
        "storiesReadySoon": "AI Stories will be ready soon!",
        "storiesSubtitle": "Get ready for a new dimension of interactive storytelling.",
        "toonHeaderBadge": "AI Toons",
        "toonHeaderTitle": "Thena Toons",
        "toonHeaderSub": "AI-generated comic stories",
        "toonSectionTitle": "Popular Stories",
        "toonCatAll": "All",
        "toonStoryCount": "{0} stories",
        "toonErrorMsg": "Failed to load stories. Please try again.",
        "toonRetryBtn": "Retry",
        "toonEmptyCategory": "No stories in this category.",
        "toonReaderFirstEp": "You are at the first episode.",
        "toonReaderSeasonEnd": "You are at the end of the season. Please switch to the next season.",
        "toonReaderEpEnded": "Episode Ended",
        "toonReaderSeasonEnded": "Season Ended",
        "navDonate": "Donate",
        "navShowcase": "Showcase",
        "navDeveloper": "API",
        "navApps": "Apps",
        "navSettings": "Settings",
        "navLanguage": "Language",
        "tutorialWelcomeTitle": "Welcome to Thena! ✨",
        "tutorialWelcomeDesc": "Would you like a quick tour of how Thena works?",
        "tutorialYes": "Yes, show me!",
        "tutorialNo": "No thanks",
        "tutorialApiTitle": "Your API Key 🔑",
        "tutorialApiDesc": "This is where you enter your Thena API key. Without it, image generation won't work. You can get one for free from Telegram!",
        "tutorialApiPrompt": "Go ahead — enter your API key now, then click Continue.",
        "tutorialContinue": "Continue →",
        "tutorialSkip": "Skip tutorial",
        "tutorialStep": "Step {0} of {1}",
        "tutorialBack": "← Back",
        "tutorialNext": "Next →",
        "tutorialModelTitle": "Choose Your Model 🎨",
        "tutorialModelDesc": "This is the model selector. Each card represents a different AI model with unique style and capabilities. Click one to select it before generating.",
        "tutorialShowAllTitle": "Show All Models 📋",
        "tutorialShowAllDesc": "Click this to expand and see all available models, including ones that aren\u2019t visible in the default view.",
        "tutorialGalleryTitle": "Model Gallery 🖼️",
        "tutorialGalleryDesc": "Open the gallery to browse all models with full previews, descriptions, and comparison details.",
        "tutorialLayoutTitle": "Switch Layout ⋞",
        "tutorialLayoutDesc": "Toggle between grid and list view for the model selector. Pick the layout that feels most comfortable to you.",
        "tutorialPromptTitle": "The Prompt Box ✍️",
        "tutorialPromptDesc": "This is the heart of Thena! Type a description of the image you want to generate here. Be specific — colors, style, mood, lighting and subject details all help the AI understand you better.",
        "tutorialCharCountTitle": "Character Counter 🔢",
        "tutorialCharCountDesc": "Shows how many characters you've used out of the 5000 character limit. Keep an eye on this — longer prompts usually produce richer results, but there's a sweet spot!",
        "tutorialHistoryTitle": "Prompt History 🕐",
        "tutorialHistoryDesc": "Click this to access your recently used prompts. You can quickly re-apply any previous prompt without retyping it. Great for iterating on ideas!",
        "tutorialImg2PromptTitle": "Image to Prompt 🖼️",
        "tutorialImg2PromptDesc": "Upload any image and Thena's AI will analyze it and generate a descriptive prompt based on what it sees. Perfect for reverse-engineering a style you love!",
        "tutorialModerationTitle": "Content Moderation 🛡️",
        "tutorialModerationDesc": "Controls the content safety level of generated images. High = family-friendly only. Medium = allows mild mature content. Low = most permissive. Choose carefully!",
        "tutorialMagicWandTitle": "Enhance Prompt ✨",
        "tutorialMagicWandDesc": "Click this magic wand to let AI automatically improve and expand your prompt. It adds detail, style cues, and artistic nuance — like having a pro artist refine your idea!",
        "tutorialRandomPromptTitle": "Random Prompt 🎲",
        "tutorialRandomPromptDesc": "Feeling adventurous? Click this to instantly generate a random creative prompt. Great for exploring unexpected ideas and breaking through creative blocks!",
        "tutorialAspectRatioTitle": "Aspect Ratio 📐",
        "tutorialAspectRatioDesc": "Choose the dimensions of your generated image. Square is great for social media, Portrait for characters and posters, Landscape for scenes, Mobile for stories and reels, and Cinematic for wide-screen art.",
        "tutorialExtraFeaturesTitle": "Extra Features ⚡",
        "tutorialExtraFeaturesDesc": "Boost your generation with special modes! Fast speeds things up, Creative makes results more artistic, Dense maximizes imagination, Movie adds cinematic color grading, High-Res upscales for max clarity, and Magic Prompt auto-enhances your text.",
        "tutorialElementsTitle": "Elements 🎨",
        "tutorialElementsDesc": "Elements are LoRA-based style layers tied to the selected model. They add extra artistic style, mood, or character traits on top of your prompt. You can stack up to 2 elements per generation for layered creative control.",
        "tutorialCreditWidgetTitle": "Credit Balance 🪙",
        "tutorialCreditWidgetDesc": "Here you can see your remaining credits. Click on this widget to open the Credit Center where you can manage your balance.",
        "tutorialCreditsBalanceTitle": "Remaining Credits 💰",
        "tutorialCreditsBalanceDesc": "This card displays your current active credit balance. You can refresh the balance in real-time.",
        "tutorialCreditsBreakdownTitle": "Credit Breakdown 📊",
        "tutorialCreditsBreakdownDesc": "See a detailed breakdown of your credits: purchased credits, used credits, sent gifts, and received gifts.",
        "tutorialCreditsGiftTitle": "Send Gift Credits 🎁",
        "tutorialCreditsGiftDesc": "Want to share the love? Enter a recipient's connection code and send them credits instantly!",
        "tutorialCreditsPackagesTitle": "Credit Packages 💎",
        "tutorialCreditsPackagesDesc": "Choose from various packages to top up your credits via secure Shopier payment. Higher tier packages offer better rates!",
        "tutorialSwitchAppsTitle": "Switch Apps 🔄",
        "tutorialSwitchAppsDesc": "Thena is more than just an image generator! Click this button to switch between all available apps: AI Image Generator, Image Editor, AI Chat Bots, and AI Stories.",
        "tutorialAppGridTitle": "Choose Your App 📱",
        "tutorialAppGridDesc": "Here you can see all of Thena's apps at a glance. Tap any card to switch instantly — AI Image Gen for creation, Image Editor for editing, AI Chat Bots to chat with characters, and AI Stories for interactive adventures.",
        "tutorialShowcaseTitle": "Community Showcase 🌍",
        "tutorialShowcaseDesc": "Explore images created by the Thena community! Get inspired by other creators, discover unique prompts, and see what's possible with Thena's AI models.",
        "tutorialOwnerTitle": "Meet the Developer 👨‍💻",
        "tutorialOwnerDesc": "Have questions, feedback, or ideas? Click here to get in touch with the developer directly. We love hearing from our community!",
        "lblTutorialRestart": "TUTORIAL MODE",
        "descTutorialRestart": "Replay the onboarding tutorial at any time to revisit Thena\u2019s features.",
        "btnTutorialRestart": "Start Tutorial",
        "navCredits": "Credits",
        "creditWidgetTitle": "Remaining Credits",
        "creditWidgetLabel": "credits",
        "creditsModalTitle": "Credit Center",
        "creditsModalSubtitle": "View your balance and buy credits",
        "creditsModalClose": "Close",
        "creditsBalanceLabel": "Remaining Credits",
        "creditsRefreshTitle": "Refresh",
        "creditsBreakdownPurchased": "Purchased",
        "creditsBreakdownUsed": "Used",
        "creditsBreakdownGifted": "Gifted",
        "creditsBreakdownGiftReceived": "Gift Received",
        "creditsNoApiWarning": "Please enter your API key to view credit balance.",
        "creditsPackagesTitle": "Credit Packages",
        "creditsPackageStarter": "STARTER",
        "creditsPackageStandard": "STANDARD",
        "creditsPackagePopular": "⭐ POPULAR",
        "creditsPackagePro": "💎 PRO",
        "creditsPackageUltra": "👑 ULTRA",
        "creditsPackageUnit": "Credits",
        "creditsPackageRateStarter": "≈ ₺0.60 / credit",
        "creditsPackageRateStandard": "≈ ₺0.50 / credit",
        "creditsPackageRatePopular": "≈ ₺0.45 / credit",
        "creditsPackageRatePro": "≈ ₺0.40 / credit",
        "creditsPackageRateUltra": "≈ ₺0.39 / credit",
        "creditsPackageBtn": "Buy with Shopier",
        "creditsPackagesNote": "Secured by Shopier · Turkish cards supported · 24/7 support",
        "buyWarningTitle": "Important Notice",
        "buyWarningDesc": "During the checkout process on the Shopier payment page, you MUST enter your API key in the 'Note' (Customer Note) field.<br><br>Otherwise, your purchased credits cannot be added to your account.",
        "buyWarningCheckbox": "I have read and understood.",
        "buyWarningCancel": "Cancel",
        "buyWarningConfirm": "Buy Now",
        "lblBuyWarningMyKey": "My API Key:",
        "lblBuyWarningClickCopy": "Copy",
        "lblCreditsGiftTitle": "Send Gift Credits",
        "lblGiftTargetKey": "Recipient Connection Code",
        "lblGiftAmount": "Amount to Send",
        "lblBtnSendGift": "Send",
        "lblGiftConfirmTitle": "Send Gift?",
        "lblGiftConfirmDesc": "This action cannot be undone. Are you sure you want to send {0} credits to this connection code?",
        "giftTargetKeyPlaceholder": "Enter recipient's connection code...",
        "lblMyShareCodePrefix": "My Connection Code:",
        "msgGiftSuccess": "Gift credits sent successfully!",
        "msgGiftErrNoApiKey": "Please enter your API Key first.",
        "msgGiftErrNoTargetKey": "Please enter the recipient connection code.",
        "msgGiftErrInvalidAmount": "Please enter a valid credit amount.",
        "msgGiftErr404": "Recipient connection code is incorrect or not registered to Thena.",
        "msgGiftErr403": "You cannot send gift credits to yourself.",
        "msgGiftErr400": "You do not have enough credits.",
        "msgGiftErrGeneric": "An error occurred while sending gift credits.",
        "msgGiftSending": "Sending gift credits...",
        "lblPackageDetailTitle": "Package Details",
        "lblPackageDetailSubtitle": "Usage limits and package comparisons",
        "lblSelectBasePackage": "Selected Package",
        "lblSelectComparePackage": "Compare with Package",
        "optCompareNone": "Not Selected",
        "lblRateCompareCost": "Cost per Credit:",
        "rateCompareSaving": "You save {0}% per credit with {1} package!",
        "lblTableModel": "Model Name",
        "lblTableBaseUsage": "Image Count",
        "lblTableCompareUsage": "Comparison",
        "btnPackageDetailBuy": "Buy Package",
        "lblImagesUnit": "images"
    },
    "tr": {
        "lblSliderBefore": "Önce",
        "lblSliderAfter": "Sonra",
        "generateBtn": "Görüntü Oluştur",
        "galleryBtn": "Galeri",
        "promptPlaceholder": "Resminizi tarif edin... (Min 10 karakter, Maks 5000 karakter)",
        "apiKeyPlaceholder": "Thena API anahtarınızı girin...",
        "apiKeyLabel": "API Anahtarı",
        "invalidApiKey": "Geçersiz API Anahtarı! Lütfen API anahtarınızı kontrol edin.",
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
        "lblImg2PromptDetail": "Detay Seviyesi",
        "btnDetailLow": "Varsayılan",
        "btnDetailMedium": "Detaylı",
        "btnDetailHigh": "Ultra Detaylı",
        "btnCancel": "İptal",
        "btnConfirm": "Evet, Sil",
        "btnConfirmAll": "Evet, Hepsini Sil",
        "btnConfirmReset": "Evet, Her Şeyi Sil",
        "btnClose": "Kapat",
        "btnUpload": "Resim Yüklemek veya Yapıştırmak için Tıklayın",
        "btnMobilePaste": "Panodan Yapıştır",
        "btnGenPrompt": "Prompt Oluştur",
        "msgClipboardNoSupport": "Tarayıcınız pano okumayı desteklemiyor. Lütfen resmi yükleyin.",
        "msgClipboardNoImage": "Panoda resim bulunamadı. Önce bir resim kopyalayın.",
        "msgClipboardDenied": "Pano erişimi reddedildi. Tarayıcı ayarlarından izin verin.",
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
        "btnApiDocs": "API Dökümantasyonu",
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
        "btnRevealBlur": "Göster",
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
        "randomPromptTitle": "Rastgele Prompt Üretildi",
        "randomPromptSubtitle": "Yeni Prompt",
        "btnRandomApply": "Yeni Promptu Uygula",
        "msgPromptGenerating": "Prompt üretiliyor...",
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
        "modelUltra": "Zeki",
        "modelUltraDesc": "Daha fazla anlamlandırma yeteneği fakat daha robotik yanıtlar çok daha olası.",
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
        "filterPaid": "Ücretli Modeller",
        "chatSearchPlaceholder": "Karakter ara...",
        "unknownCharacter": "Bilinmeyen Karakter",
        "characterNM": " (Varsayılan)",
        "toggleThoughts": "Düşünce Balonlarını Göster",
        "toggleEmotions": "Duygu Göstergelerini Göster",
        "emotionNames": {
            "happy": "Mutlu", "sad": "Üzgün", "angry": "Kızgın", "scared": "Korkmuş",
            "surprised": "Şaşkın", "disgusted": "İğrenmiş", "excited": "Heyecanlı",
            "bored": "Sıkılmış", "confused": "Kafası Karışmış", "neutral": "Nötr",
            "flirtatious": "Flirtöz", "sarcastic": "Alaylı", "shy": "Utangaç",
            "confident": "Özgüvenli", "amused": "Eğlenmiş", "jealous": "Kıskanç",
            "guilty": "Suçlu", "curious": "Meraklı", "hopeful": "Umutlu",
            "anxious": "Endişeli", "frustrated": "Sinirli", "affectionate": "Şefkatli",
            "romantic": "Romantik", "loving": "Sevgi Dolu", "passionate": "Tutkulu",
            "infatuated": "Vurgun", "seductive": "Baştan Çıkarıcı",
            "lustful": "Şehvetli", "aroused": "Tahrik Olmuş", "submissive": "İtaatkâr",
            "dominant": "Baskın", "desiring": "Arzulayan",
            "melancholic": "Melankolik", "hopeless": "Umutsuz", "lonely": "Yalnız",
            "heartbroken": "Kalbi Kırık", "nostalgic": "Nostaljik", "empty": "Boş",
            "desperate": "Çaresiz",
            "thrilled": "Heyecan Dolu", "euphoric": "Coşku İçinde", "adventurous": "Maceraperest"
        },
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
        "lblSkipIntroDesc": "Bir sonraki ziyaretinizde sinematik intro sayfasını atlayın.",
        "lblPowerSaver": "GÜÇ TASARRUFU",
        "lblPowerSaverDesc": "20 saniye hareketsizlik sonrası pil tüketimini otomatik olarak azaltır. FPS'yi sınırlar, animasyonları duraklatır ve ekranı karartır.",
        "msgNotAllowed": "Lütfen moderation seviyesini medium veya low olarak ayarlayın.",
        "msgNotAllowedLow": "Bu görsel Thena ile oluşturulamaz.",
        "msgNotAllowedHighMod": "Bu prompt kabul edilemez. Lütfen promptunuzu düzenleyin!",
        "msgImgProcessing": "Görüntü oluşturuluyor...",
        "promptProcessing": "Prompt oluşturuluyor...",
        "msgMinSteps": "Minimum adım sayısı 10. Değer güncellendi.",
        "msgMaxSteps": "Maksimum adım sayısı 30. Değer güncellendi.",
        "msgMinCfg": "Minimum CFG Scale 1. Değer güncellendi.",
        "msgMaxCfg": "Maksimum CFG Scale 20. Değer güncellendi.",
        "msgMinSeed": "Minimum Seed -1. Değer güncellendi.",
        "msgMaxSeed": "Maksimum Seed 900000000. Değer güncellendi.",
        "msgImgSaved": "Resim galeriye kaydedildi.",
        "msgLimitExceeded": "Limit tükendi! Lütfen biraz bekleyin ve tekrar deneyin.",
        "modelMaintenance": "Bu model şu anda bakım altında. Lütfen daha sonra tekrar deneyin.",
        "msgServerOverloaded": "Thena şuanda çok yoğun. Lütfen daha sonra tekrar deneyin.",
        "msgGenError": "Resim oluşturulamadı! Lütfen tekrar deneyin.",
        "msgPromptUpdated": "Prompt başarıyla güncellendi!",
        "msgModMedium": "Moderasyon düzeyi normal olarak ayarlandı.",
        "msgModLow": "Moderasyon düzeyi düşük olarak ayarlandı.",
        "msgModHigh": "Moderasyon düzeyi yüksek olarak ayarlandı.",
        "msgModUltraLocked": "Bu model için moderasyon seviyesi yüksek olarak sabitlenmiştir.",
        "msgEnterApiKey": "Lütfen API Anahtarını girin.",
        "msgModelUnavailableWait": "Bu model şu anda kullanılamıyor. Kalan bekleme süresi: ",
        "msgRateLimitFail": "Hız limiti kontrolü başarısız oldu. Lütfen tekrar deneyin.",
        "msgAnimeFastLimits": "Anime Fast modeli için limitler güncellendi.",
        "msgPromptMagicLimit": "Prompt uzunluğu Prompt Magic sınırına uygun hale getirildi (1150 karakter).",
        "msgPromptRestored": "Prompt uzunluğu 5000 karaktere geri döndü.",
        "msgUnstableConn": "İnternet bağlantınız stabil değil. Lütfen biraz bekleyiniz.",
        "msgPromptShort": "Prompt çok kısa! En az 10 karakter girmelisin.",
        "msgPromptLong1": "Prompt çok uzun! Maksimum ",
        "msgPromptLong2": " karakter girebilirsin.",
        "msgPromptEmpty": "Prompt alanı boş! Lütfen bir şey yazın.",
        "msgPromptGenErr": "Prompt oluşturulamadı. Bir hata oluştu.",
        "msgUnknownError": "Bir hata oluştu: ",
        "msgTelegramSent": "Resim Telegram'a gönderildi.",
        "msgTelegramErr": "Resim Telegram'a gönderilemedi. Lütfen botu başlatın ve tekrar deneyin!",
        "msgDownloadCompleted": "Resim indirildi.",
        "msgDownloadFailed": "Resim indirilemedi. Lütfen yeniden deneyin.",
        "msgGalleryEmpty": "Galeri halihazırda boş.",
        "msgGalleryCleaned": "Tüm galeri temizlendi.",
        "msgGalleryCleanErr": "Galeri temizlenirken bir hata oluştu.",
        "msgSettingsLoaded": "Ayarlar bu resimden yüklendi!",
        "msgImgUploaded": "Resim yüklendi!",
        "msgInvalidApi": "API anahtarınız geçerli değil.",
        "msgLimit10": "Limit aşıldı. Günlük 10 yükleme yapabilirsiniz.",
        "msgServerErr": "Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.",
        "msgImgNotBase": "Resim kaynağı base64 formatında değil.",
        "msgUploadFailed": "Resim yükleme hatası.",
        "msgPerfModeOn": "Performans Modü Aktif Edildi",
        "msgPerfModeHalf": "Dengeli Performans Modu Aktif Edildi",
        "msgPerfModeOff": "Performans Modü Deaktif Edildi",
        "msgPerfMonOn": "Performans Göstergesi Açıldı",
        "msgPerfMonOff": "Performans Göstergesi Kapatıldı",
        "msgPreviewOn": "Prompt Önizleme Aktif Edildi",
        "msgPreviewOff": "Prompt Önizleme Deaktif Edildi",
        "msgIntroSkipped": "Intro Atlandı",
        "msgPowerSaverOn": "Güç Tasarrufu Aktif Edildi",
        "msgPowerSaverOff": "Güç Tasarrufu Deaktif Edildi",
        "msgSilentModeOn": "Sessiz Mod Aktif Edildi",
        "msgSilentModeOff": "Sessiz Mod Deaktif Edildi",
        "msgAdvModeOn": "Gelişmiş Mod Aktif Edildi",
        "msgAdvModeOff": "Gelişmiş Mod Deaktif Edildi",
        "msgThemeUpdated": "Tema güncellendi",
        "msgAppReset": "Uygulama başarıyla sıfırlandı. Sayfa yenileniyor...",
        "msgResetError": "Reset hatası: ",
        "msgShowcaseFetchErr": "Showcase resmi alınamadı. Lütfen daha sonra tekrar deneyin.",
        "msgInvalidImgFile": "Lütfen geçerli bir resim dosyası seçin.",
        "msgImgTooLarge": "Resim dosyası 5MB'dan fazla olamaz.",
        "msgGenPrompt": "Görselden prompt oluşturuluyor. Bu işlem biraz sürebilir...",
        "msgModelUpdated": "Model güncellendi: ",
        "msgPromptSettingsApplied": "Prompt ve ayarlar başarıyla uygulandı!",
        "msgGenPromptFailed": "Prompt oluşturulamadı. Lütfen farklı bir resimle tekrar deneyin.",
        "msgPromptCopied": "Prompt kopyalandı!",
        "msgHistCleared": "Prompt geçmişi temizlendi.",
        "msgNoRefresh": "İşlem devam ederken sayfayı yenileyemezsiniz.",
        "msgImgDeleted": "Resim başarıyla silindi.",
        "msgImgDeleteErr": "Silme işleminde bir hata olustu.",
        "msgAutocompleteOff": "Autocomplete Deaktif Edildi",
        "msgAutocompleteOn": "Autocomplete Aktif Edildi",
        "msgBaseModelsLoaded": "Varsayılan modellere dönüldü.",
        "msgAllModelsLoaded": "Tüm modeller yüklendi!",
        "msgModelUpdateErr": "Modeller güncellenemedi.",
        "msgImgUploadSuccess": "Resim başarıyla yüklendi!",
        "msgModHighSet": "Moderasyon düzeyi yüksek olarak ayarlandı.",
        "msgModMediumSet": "Moderasyon düzeyi normal olarak ayarlandı.",
        "msgModLowSet": "Moderasyon düzeyi düşük olarak ayarlandı.",
        "msgApiKeyRequired": "Lütfen API Anahtarınızı girin.",
        "msgImgRequired": "Lütfen bir resim yükleyin.",
        "msgPromptRequired": "Lütfen bir prompt girin.",
        "msgGeneratingQueued": "Oluşturuluyor... Sıraya alındı.",
        "msgGenerating": "Oluşturuluyor...",
        "msgQueued": "Model sıraya alındı...",
        "msgLimitWait": "Limit tükendi! Lütfen {0} saniye sonra tekrar deneyin.",
        "priorLimitDaily": "Bu özelliğin günlük limitini aştınız. Lütfen yarın tekrar deneyin.",
        "msgModMediumLowReq": "Lütfen moderation seviyesini medium veya low olarak ayarlayın.",
        "msgThenaOverloaded": "Thena şuanda çok yoğun. Lütfen daha sonra tekrar deneyin.",
        "msgErrorPrefix": "Hata: ",
        "msgVariationSuccess": "Varyasyon başarıyla oluşturuldu!",
        "msgImageShared": "Resim paylaşıldı!",
        "msgDownloadingImg": "Resim indiriliyor...",
        "msgImageNotFound": "Resim bulunamadı.",
        "msgDownloadFailed": "İndirme başarısız oldu.",
        "presetFilterAll": "Tüm Önayarları Göster",
        "presetFilterSafe": "Sadece Güvenli Önayarları Göster",
        "presetFilterPlus18": "Sadece +18 Önayarları Göster",
        "btnPresetFilterTitle": "Önayarları Filtrele",
        "msgPleaseWait": "Lütfen sayfayı kapatmayınız.",
        "editorCropLabel": "Resmi Kırp",
        "editorCropCancel": "İptal",
        "editorCropApply": "Uygula",
        "exclusiveLabel": "Seçkin",
        "paidLabel": "Ücretli",
        "galleryStatsTitle": "Galeri İstatistikleri",
        "statsModelsTitle": "Kullanılan Modeller",
        "statsExtrasTitle": "Kullanılan Ekstralar",
        "statsCostTitle": "Toplam Tahmini Maliyet",
        "statsApprox": "(Yaklaşık {0} Lira)",
        "statsApproxCents": "(Yaklaşık {0} Kuruş)",
        "statsNoModels": "Henüz galeride görsel yok.",
        "statsNoExtras": "Henüz ekstra kullanılmadı.",
        "mgTitle": "İnce Ayarlı Model Seç",
        "mgRequestNewModel": "Yeni Model İste",
        "mgSearchPlaceholder": "Model ara...",
        "mgSortLabel": "Sırala:",
        "mgCatLabel": "Kategori:",
        "mgProvLabel": "Sağlayıcı:",
        "mgOptDefault": "Varsayılan",
        "mgOptNameAsc": "İsim (A-Z)",
        "mgOptNameDesc": "İsim (Z-A)",
        "mgCatAll": "Tümü",
        "mgProvAll": "Tüm Sağlayıcılar",
        "mgNoResults": "Model bulunamadı.",
        "mgBadge": "Özel Model",
        "mgLblDescription": "Açıklama",
        "mgLblCategory": "Kategori",
        "mgLblProvider": "Sağlayıcı",
        "mgLblCost": "Maliyet / Görsel",
        "mgLblType": "Tür",
        "mgSelectBtn": "Bu Modelle Oluştur",
        "mgModelSelected": "Model seçildi",
        "mgRequestTitle": "Yeni Model İste",
        "mgReqName": "İsim",
        "mgReqMail": "E-posta",
        "mgReqTelegram": "Telegram",
        "mgOptional": "(opsiyonel)",
        "mgReqText": "Model İsteği",
        "mgReqNamePlaceholder": "Adınız",
        "mgReqMailPlaceholder": "mail@adresiniz.com",
        "mgReqTelegramPlaceholder": "@kullaniciadi",
        "mgReqTextPlaceholder": "İstediğiniz modeli açıklayın...",
        "mgCancelText": "İptal",
        "mgSubmitText": "Gönder",
        "mgSending": "Gönderiliyor...",
        "mgRequestSent": "İstek başarıyla gönderildi!",
        "mgRequestFail": "İstek gönderilemedi. Lütfen tekrar deneyin.",
        "mgTypeBase": "Temel Model",
        "mgLblTotalUsage": "Toplam Üretim",
        "mgLblPerUnit": "1₺ ile Üretim",
        "mgLblCredit": "Görsel Başına Kredi",
        "mgOptPriceAsc": "Ücret (Artan)",
        "mgOptPriceDesc": "Ücret (Azalan)",
        "mgOptUsageDesc": "En Çok Kullanılan",
        "mgOptUsageAsc": "En Az Kullanılan",
        "mgModels": "Model Galerisi",
        "mgPrevImg": "Önceki Resim",
        "mgNextImg": "Sonraki Resim",
        "msgServerBusy": "Sunucu Meşgul",
        "msgServerBusyDesc": "Thena şu an çok yoğun. Görsel oluşturma biraz zaman alabilir.",
        "mgShowMoreStats": "Daha fazla göster",
        "mgShowMoreLoading": "Yükleniyor...",
        "mgModelLoadTime": "RAM'e Yüklenme Süresi",
        "mgGenTime": "Ortalama Üretim Süresi",
        "elementsLabel": "Elementler",
        "elementsAddTitle": "Element Ekle",
        "elementsSearchPlaceholder": "Element ara...",
        "elementsLoading": "Elementler yükleniyor...",
        "elementsEmpty": "Element bulunamadı.",
        "elementsNsfwToggle": "+18",
        "elementsUseBtn": "Elementi Kullan",
        "elementsUseBtnSelected": "✓ Seçildi",
        "elementsMaxReached": "En fazla 2 element seçebilirsiniz.",
        "elementsNoModel": "Lütfen önce bir model seçin.",
        "elementsLoadFailed": "Elementler yüklenemedi.",
        "elInfoTitle": "Elementler Nedir?",
        "elInfoSub": "LoRA Tabanlı Stil Katmanları",
        "elInfoDesc": "Elementler, seçtiğiniz modele özel <strong>LoRA</strong> (Low-Rank Adaptation) katmanlarıdır. Görselinize ekstra stil, atmosfer veya karakter özellikleri kazandırır. Aynı anda en fazla <strong>2 element</strong> seçebilirsiniz.",
        "elInfoI1Title": "Model Uyumluluğu",
        "elInfoI1Desc": "Her element yalnızca belirli modellerle çalışır. Model değiştirdiğinizde elementler sıfırlanır.",
        "elInfoI2Title": "Stil Katmanı",
        "elInfoI2Desc": "Görsele sanat stili, ışık efekti veya özel görünüm ekler. Prompt'unuzu destekler, değiştirmez.",
        "elInfoI3Title": "Maks. 2 Element",
        "elInfoI3Desc": "Her üretimde en fazla 2 element aktif olabilir. \"+\" butonuna tıklayarak element galerini açabilirsiniz.",
        "elInfoI4Title": "NSFW Elementler",
        "elInfoI4Desc": "Element galerisindeki NSFW butonu ile +18 elementleri görüntüleyebilirsiniz.",
        "mgLoadFailed": "Modeller yüklenemedi. Lütfen tekrar deneyin.",
        "mgRetry": "Tekrar Dene",
        "editorModelLabel": "AI Modeli",
        "editorModelV1Name": "PixelFusion",
        "editorModelV1Tag": "U-Net",
        "editorModelV2Name": "NeuralFlow",
        "editorModelV2Tag": "Transformer",
        "editorV1InfoTitle": "PixelFusion",
        "editorV1InfoSub": "U-Net Mimarisi",
        "editorV1InfoDesc": "PixelFusion, hızlı ve güvenilir görsel varyasyonu için klasik <strong>U-Net</strong> kodlayıcı-çözücü mimarisini kullanır. Yüksek mekansal doğrulukla hassas düzenlemeler için idealdir.",
        "editorV1I1Title": "Hızlı Üretim",
        "editorV1I1Desc": "Optimize edilmiş konvolüsyonel boru hattı sonuçları hızlıca sunar; hızlı deneme-yanılma süreçleri için mükemmeldir.",
        "editorV1I2Title": "Mekansal Hassasiyet",
        "editorV1I2Desc": "Yapısal detayları ve kenarları korur, düzenlemelerin orijinal görsel düzeniyle uyumlu kalmasını sağlar.",
        "editorV1I3Title": "Tavsiye Edilen Kullanım",
        "editorV1I3Desc": "Stil transferleri, renk değişiklikleri, doku varyasyonları ve yüksek yapısal doğruluk gerektiren düzenlemeler.",
        "editorV2InfoTitle": "NeuralFlow",
        "editorV2InfoSub": "Transformer Mimarisi",
        "editorV2InfoDesc": "NeuralFlow, daha zengin anlamsal anlayış sağlayan modern bir <strong>Transformer</strong> dikkat mekanizmasıyla çalışır. Yüksek yaratıcılık ve bağlam farkında varyasyonlar üretir.",
        "editorV2I1Title": "Anlamsal Anlayış",
        "editorV2I1Desc": "Görselin tüm bağlamını anlamak için global dikkat kullanır; daha tutarlı sonuçlara ulaşır.",
        "editorV2I2Title": "Yaratıcı Varyasyonlar",
        "editorV2I2Desc": "Basit piksel düzeyindeki düzenlemelerin ötesine geçen yaratıcı ve çeşitli çıktılar üretmekte öne çıkar.",
        "editorV2I3Title": "Tavsiye Edilen Kullanım",
        "editorV2I3Desc": "Karmaşık sahne anlamlandırması, sanatsal yeniden yorumlamalar ve önemli içerik değişikliklerini tanımlayan promptlar.",
        "editorModelV3Name": "Synapse",
        "editorModelV3Tag": "Muhakeme",
        "editorModelV3Badge": "MAX",
        "editorV3InfoTitle": "Synapse",
        "editorV3InfoSub": "Muhakeme Destekli Üretim",
        "editorV3InfoDesc": "Synapse, prompt'unuzu üretmeden önce düşünen bir <strong>muhakeme motoru</strong> tarafından yönetilen en güçlü editör modelidir. Her çıktıda eşsiz hassasiyet, uyum ve detay sunar.",
        "editorV3I1Title": "Muhakeme Motoru",
        "editorV3I1Desc": "Prompt'u üretmeden önce derinlemesine analiz eder — amaç, bağlam ve ince ayrıntıları anlayarak son derece doğru sonuçlar üretir.",
        "editorV3I2Title": "Maksimum Kalite",
        "editorV3I2Desc": "Tüm metriklerde en yüksek çıktı kalitesi — detay, uyum ve görsel kalite zirvede.",
        "editorV3I3Title": "Tavsiye Edilen Kullanım",
        "editorV3I3Desc": "Profesyonel düzenlemeler, çok öğeli karmaşık promptlar ve kalitenin kesinlikle taviz verilmemesi gereken görevler.",
        "editorProsTitle": "Güçlü Yanları",
        "editorConsTitle": "Zayıf Yanları",
        "editorModelV1Badge": "HIZLI",
        "editorModelV2Badge": "EN İYİ",
        "editorV1Pro1": "Yıldırım hızında sonuç üretir",
        "editorV1Pro2": "Orijinal kompozisyonu korur",
        "editorV1Con1": "Yalnızca ince değişikliklerle sınırlı",
        "editorV1Con2": "Çıktı kalitesi tavanı düşüktür",
        "editorV2Pro1": "Zengin, yüksek kaliteli çıktılar",
        "editorV2Pro2": "Büyük sahne değişikliklerini destekler",
        "editorV2Pro3": "Promptu iyi yorumlar",
        "editorV2Con1": "Prompt ifadesine karşı hassas",
        "editorV2Con2": "Belirsiz promptlarda tutarsız sonuçlar",
        "editorV3Pro1": "En yüksek çıktı kalitesi",
        "editorV3Pro2": "Derin niyet anlayışı",
        "editorV3Pro3": "Karmaşık talimatlar için ideal",
        "editorV3Con1": "Gözle görülür yavaş üretim",
        "editorV3Con2": "Ayrıntılı ve hassas prompt gerektirir",
        "outpaintLabel": "Outpaint Ayarları",
        "outpaintTop": "Üst (px)",
        "outpaintBottom": "Alt (px)",
        "outpaintLeft": "Sol (px)",
        "outpaintRight": "Sağ (px)",
        "outpaintBtn": "Outpaint Yap",
        "outpaintReset": "Sıfırla",
        "outpaintPresetsTitle": "Hızlı Boyutlar",
        "outpaintSuccess": "Outpaint başarıyla tamamlandı!",
        "outpaintQueued": "Outpaint sıraya alındı. ",
        "outpaintPixelRequired": "Lütfen en az bir yön için piksel değeri girin.",
        "torealBtn": "Varyasyon Oluştur",
        "uhdBtn": "4K Upscale",
        "genderSwapBtn": "Gender Swap",
        "appCardGenderSwapName": "Gender Swap",
        "appCardGenderSwapDesc": "Görseldeki kişinin cinsiyetini değiştirin.",
        "msgNoHumanFound": "Yüklenen görselde insan bulunamadı.",
        "appCardEditName": "Resim Düzenleme",
        "appCardEditDesc": "Görselini AI ile dönüştür, prompt ile yeniden şekillendir.",
        "appCardOutpaintName": "Outpaint",
        "appCardOutpaintDesc": "Görselin kenarlarını AI ile genişlet, yeni alanlar ekle.",
        "appCardAnythingToRealName": "Anything to Real",
        "appCardAnythingToRealDesc": "Çizimleri veya 3D görselleri gerçekçi fotoğraflara dönüştür.",
        "appCardUhdUpscaleName": "4K Upscale",
        "appCardUhdUpscaleDesc": "Görsellerinizi 4K kalitesine yükseltin.",
        "appCardFusionName": "Fusion",
        "appCardFusionDesc": "İki görseli yapay zeka ile harmanlayarak birleştir.",
        "editorFusionUploadLabel": "İki Görsel Yükle",
        "fusionBtn": "Birleştir (Fusion)",
        "fusionUpload1": "Görsel 1 yüklemek için tıklayın",
        "fusionUpload2": "Görsel 2 yüklemek için tıklayın",
        "fusionBlendRatio": "Karışım Oranı",
        "fusionImage1": "Görsel 1",
        "fusionImage2": "Görsel 2",
        "appCardShowAll": "Tümünü Göster",
        "appCardShowLess": "Daha Az Göster",
        "appCardStoriesName": "AI Hikayeleri",
        "appCardStoriesDesc": "Yapay zeka ile etkileşimli hikayeler oluşturun.",
        "storiesReadySoon": "AI Hikayeleri yakında hazır olacak!",
        "storiesSubtitle": "Yapay zeka destekli etkileşimli hikaye anlatımının yeni boyutuna hazır olun.",
        "toonHeaderBadge": "AI Toons",
        "toonHeaderTitle": "Thena Toons",
        "toonHeaderSub": "AI ile oluşturulmuş çizgi roman hikayeleri",
        "toonSectionTitle": "Popüler Hikayeler",
        "toonCatAll": "Tümü",
        "toonStoryCount": "{0} hikaye",
        "toonErrorMsg": "Hikayeler yüklenemedi. Lütfen tekrar deneyin.",
        "toonRetryBtn": "Tekrar Dene",
        "toonEmptyCategory": "Bu kategoride hikaye yok.",
        "toonReaderFirstEp": "İlk bölümdesiniz.",
        "toonReaderSeasonEnd": "Sezonun sonundasınız. Lütfen sonraki sezona geçin.",
        "toonReaderEpEnded": "Bölüm Bitti",
        "toonReaderSeasonEnded": "Sezon Bitti",
        "navDonate": "Destek",
        "navShowcase": "Vitrin",
        "navDeveloper": "API",
        "navApps": "Uygulamalar",
        "navSettings": "Ayarlar",
        "navLanguage": "Dil",
        "tutorialWelcomeTitle": "Thena'ya Hoş Geldin! ✨",
        "tutorialWelcomeDesc": "Thena'nın nasıl çalıştığını hızlıca öğrenmek ister misin?",
        "tutorialYes": "Evet, göster!",
        "tutorialNo": "Hayır, teşekkürler",
        "tutorialApiTitle": "API Anahtarın 🔑",
        "tutorialApiDesc": "Thena API anahtarını buraya girersin. Anahtarın olmadan görsel oluşturamazsın. Telegram'dan ücretsiz alabilirsin!",
        "tutorialApiPrompt": "Hadi devam et — API anahtarını şimdi gir, ardından Devam'a tıkla.",
        "tutorialContinue": "Devam →",
        "tutorialSkip": "Turu atla",
        "tutorialStep": "Adım {0} / {1}",
        "tutorialBack": "← Geri",
        "tutorialNext": "İleri →",
        "tutorialModelTitle": "Modelini Seç 🎨",
        "tutorialModelDesc": "Bu kısımda AI modellerini seçebilirsin. Her kart, farklı bir stile ve kapasiteye sahip bir modeli temsil eder. Görsel oluşturmadan önce birine tıkla.",
        "tutorialShowAllTitle": "Tüm Modelleri Göster 💻",
        "tutorialShowAllDesc": "Varsayılan görünümde çıkmayan modeller de dahil olmak üzere tüm modelleri görmek için buna tıkla.",
        "tutorialGalleryTitle": "Model Galerisi 🖼️",
        "tutorialGalleryDesc": "Tüm modelleri tam ön izleme, açıklama ve karşılaştırma detaylarıyla görmek için galeriyi aç.",
        "tutorialLayoutTitle": "Görünüm Değiştir ⋞",
        "tutorialLayoutDesc": "Model seçiciyi ızgara veya liste görünümü arasında geçiş yap. Sana en rahat gelen düzeni seç.",
        "tutorialPromptTitle": "Prompt Kutusu ✍️",
        "tutorialPromptDesc": "Thena'nın kalbi burası! Oluşturmak istediğin görseli buraya tarif et. Ne kadar detaylı olursan o kadar iyi — renkler, stil, atmosfer, ışık ve konu detayları yapay zekanın seni daha iyi anlamasına yardımcı olur.",
        "tutorialCharCountTitle": "Karakter Sayacı 🔢",
        "tutorialCharCountDesc": "5000 karakterlik sınırdan ne kadar kullandığını gösterir. Bunu takip et — uzun promptlar genellikle daha zengin sonuçlar üretir, ama bir denge noktası bulmak önemlidir!",
        "tutorialHistoryTitle": "Prompt Geçmişi 🕐",
        "tutorialHistoryDesc": "Son kullandığın promptlara buradan erişebilirsin. Herhangi bir önceki promptu tekrar yazmadan kolayca uygulayabilirsin. Fikirler üzerinde çalışmak için harika!",
        "tutorialImg2PromptTitle": "Görselden Prompt Oluştur 🖼️",
        "tutorialImg2PromptDesc": "Herhangi bir görsel yükle, Thena'nın yapay zekası görüntüyü analiz edip ne gördüğüne dair açıklayıcı bir prompt oluşturacak. Beğendiğin bir stili tersine mühendislik etmek için mükemmel!",
        "tutorialModerationTitle": "İçerik Denetimi 🛡️",
        "tutorialModerationDesc": "Oluşturulan görsellerin içerik güvenlik seviyesini kontrol eder. Yüksek = yalnızca aile dostu. Orta = hafif yetişkin içerik izinli. Düşük = en geniş izin. Dikkatli seç!",
        "tutorialMagicWandTitle": "Prompt Geliştir ✨",
        "tutorialMagicWandDesc": "Promptunu yapay zekanın otomatik olarak geliştirmesi için bu sihirli değneğe tıkla. Detaylar, stil ipuçları ve sanatsal nüanslar ekler — bir profesyonelin fikrini rafine etmesi gibi!",
        "tutorialRandomPromptTitle": "Rastgele Prompt 🎲",
        "tutorialRandomPromptDesc": "Maceraperest misin? Anında rastgele yaratıcı bir prompt oluşturmak için buna tıkla. Beklenmedik fikirleri keşfetmek ve yaratıcı tıkanıklıkları aşmak için harika!",
        "tutorialAspectRatioTitle": "En Boy Oranı 📐",
        "tutorialAspectRatioDesc": "Oluşturulacak görselin boyutlarını seç. Kare sosyal medya için ideal, Portre karakter ve posterler için, Manzara sahneler için, Mobil hikayeler ve reels için, Sinematik ise geniş ekran sanat için harikadır.",
        "tutorialExtraFeaturesTitle": "Ekstra Özellikler ⚡",
        "tutorialExtraFeaturesDesc": "Oluşturmayı özel modlarla güçlendir! Hızlı modu süreyi kısaltır, Yaratıcı sonuçları daha sanatsal yapar, Yoğun hayal gücünü üst seviyeye taşır, Film Filtresi sinematik renk tonu katar, Yüksek Çözünürlük görüntüyü büyütür ve Sihirli Prompt metni otomatik geliştirir.",
        "tutorialElementsTitle": "Elementler 🎨",
        "tutorialElementsDesc": "Elementler, seçili modele özgü LoRA tabanlı stil katmanlarıdır. Promptunuzun üstüne ekstra sanatsal stil, atmosfer veya karakter özellikleri eklerler. Her oluşturma için en fazla 2 element seçip katmanlı bir yaratıcı kontrol sağlayabilirsin.",
        "tutorialCreditWidgetTitle": "Kredi Bakiyesi 🪙",
        "tutorialCreditWidgetDesc": "Kalan kredinizi buradan görebilirsiniz. Kredilerinizi yönetebileceğiniz Kredi Merkezi'ni açmak için bu alana tıklayın.",
        "tutorialCreditsBalanceTitle": "Kalan Kredi 💰",
        "tutorialCreditsBalanceDesc": "Bu kart güncel aktif kredi bakiyenizi gösterir. Bakiyenizi anlık olarak yenileyebilirsiniz.",
        "tutorialCreditsBreakdownTitle": "Kredi Detayı 📊",
        "tutorialCreditsBreakdownDesc": "Kredilerinizin detaylı dökümünü inceleyin: satın alınan, kullanılan, gönderilen hediye ve alınan hediye krediler.",
        "tutorialCreditsGiftTitle": "Hediye Kredi Gönder 🎁",
        "tutorialCreditsGiftDesc": "Kredilerinizi paylaşmak ister misiniz? Alıcının bağlantı kodunu girerek anında kredi gönderebilirsiniz!",
        "tutorialCreditsPackagesTitle": "Kredi Paketleri 💎",
        "tutorialCreditsPackagesDesc": "Güvenli Shopier ödemesi ile bakiye yüklemek için çeşitli paketlerden birini seçin. Üst paketler daha avantajlı kredi oranları sunar!",
        "tutorialSwitchAppsTitle": "Uygulama Değiştir 🔄",
        "tutorialSwitchAppsDesc": "Thena sadece bir görsel üretici değil! Tüm uygulamalar arasında geçiş yapmak için bu butona tıkla: AI Görsel Üreticisi, Görsel Düzeleyici, AI Sohbet Botları ve AI Hikayeler.",
        "tutorialAppGridTitle": "Uygulama Seç 📱",
        "tutorialAppGridDesc": "Thena'nın tüm uygulamalarını burada bir arada görebilirsin. Herhangi bir karta dokunarak anında geçiş yap — Oluşturma için AI Görsel, düzenleme için Görsel Düzeleyici, karakterlerle konuşmak için AI Sohbet ve macera için AI Hikayeler.",
        "tutorialShowcaseTitle": "Topluluk Vitrini 🌍",
        "tutorialShowcaseDesc": "Thena topluluğu tarafından oluşturulan görselleri keşfet! Diğer kullanıcılardan ilham al, benzersiz promptlar keşff et ve Thena'nın AI modelleriyle neler yapılabildiğini gör.",
        "tutorialOwnerTitle": "Geliştiriciye Ulaş 👨‍💻",
        "tutorialOwnerDesc": "Soruların, geri bildirimlerin veya önerilen mi var? Geliştiriciyle doğrudan iletişime geçmek için buraya tıkla. Topluluktan duymayı seviyoruz!",
        "lblTutorialRestart": "EĞİTİM MODU",
        "descTutorialRestart": "Thena'nın özelliklerini tekrar keşfetmek için eğitim turunu istediğin zaman yeniden başlat.",
        "btnTutorialRestart": "Eğitimi Başlat",
        "navCredits": "Kredi",
        "creditWidgetTitle": "Kalan Kredi",
        "creditWidgetLabel": "kredi",
        "creditsModalTitle": "Kredi Merkezi",
        "creditsModalSubtitle": "Bakiyenizi görüntüleyin ve kredi satın alın",
        "creditsModalClose": "Kapat",
        "creditsBalanceLabel": "Kalan Kredi",
        "creditsRefreshTitle": "Yenile",
        "creditsBreakdownPurchased": "Satın Alınan",
        "creditsBreakdownUsed": "Kullanılan",
        "creditsBreakdownGifted": "Gönderilen",
        "creditsBreakdownGiftReceived": "Alınan",
        "creditsNoApiWarning": "Kredi bilgisini görmek için lütfen API anahtarınızı girin.",
        "creditsPackagesTitle": "Kredi Paketleri",
        "creditsPackageStarter": "BAŞLANGIÇ",
        "creditsPackageStandard": "STANDART",
        "creditsPackagePopular": "⭐ POPÜLER",
        "creditsPackagePro": "💎 PRO",
        "creditsPackageUltra": "👑 ULTRA",
        "creditsPackageUnit": "Kredi",
        "creditsPackageRateStarter": "≈ ₺0.60 / kredi",
        "creditsPackageRateStandard": "≈ ₺0.50 / kredi",
        "creditsPackageRatePopular": "≈ ₺0.45 / kredi",
        "creditsPackageRatePro": "≈ ₺0.40 / kredi",
        "creditsPackageRateUltra": "≈ ₺0.39 / kredi",
        "creditsPackageBtn": "Shopier ile Al",
        "creditsPackagesNote": "Shopier güvencesiyle · Türk kartları desteklenir · 7/24 destek",
        "buyWarningTitle": "Önemli Uyarı",
        "buyWarningDesc": "Satın alma işlemi sırasında Shopier ödeme sayfasındaki 'Not' (Müşteri Notu) bölümüne API anahtarınızı (API Key) yazmanız gerekmektedir.<br><br>Aksi takdirde satın aldığınız krediler hesabınıza tanımlanamayacaktır.",
        "buyWarningCheckbox": "Okudum, anladım.",
        "buyWarningCancel": "İptal",
        "buyWarningConfirm": "Satın Al",
        "lblBuyWarningMyKey": "API Anahtarım:",
        "lblBuyWarningClickCopy": "Kopyala",
        "lblCreditsGiftTitle": "Hediye Kredi Gönder",
        "lblGiftTargetKey": "Alıcı Bağlantı Kodu",
        "lblGiftAmount": "Gönderilecek Miktar",
        "lblBtnSendGift": "Gönder",
        "lblGiftConfirmTitle": "Hediye Gönder?",
        "lblGiftConfirmDesc": "Bu işlem geri alınamaz. Bu bağlantı koduna {0} kredi göndermek istediğinizden emin misiniz?",
        "giftTargetKeyPlaceholder": "Alıcının bağlantı kodunu girin...",
        "lblMyShareCodePrefix": "Bağlantı Kodum:",
        "msgGiftSuccess": "Hediye kredi başarıyla gönderildi!",
        "msgGiftErrNoApiKey": "Lütfen önce kendi API anahtarınızı girin.",
        "msgGiftErrNoTargetKey": "Lütfen alıcı bağlantı kodunu girin.",
        "msgGiftErrInvalidAmount": "Lütfen geçerli bir kredi miktarı girin.",
        "msgGiftErr404": "Alıcı bağlantı kodu yanlış veya Thena'ya kayıtlı değil.",
        "msgGiftErr403": "Kendinize hediye gönderemezsiniz.",
        "msgGiftErr400": "Yetersiz kredi bakiyesi.",
        "msgGiftErrGeneric": "Hediye kredi gönderilirken bir hata oluştu.",
        "msgGiftSending": "Hediye kredi gönderiliyor...",
        "lblPackageDetailTitle": "Paket Detayları",
        "lblPackageDetailSubtitle": "Kullanım limitleri ve karşılaştırmalar",
        "lblSelectBasePackage": "Seçili Paket",
        "lblSelectComparePackage": "Karşılaştırılacak Paket",
        "optCompareNone": "Seçilmedi",
        "lblRateCompareCost": "Kredi Başına Maliyet:",
        "rateCompareSaving": "{1} paketi ile kredi başına %{0} tasarruf edersiniz!",
        "lblTableModel": "Model Adı",
        "lblTableBaseUsage": "Görsel Sayısı",
        "lblTableCompareUsage": "Karşılaştırma",
        "btnPackageDetailBuy": "Paketi Satın Al",
        "lblImagesUnit": "görsel"
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
        'lbl-intel', 'lbl-qual', 'lbl-speed', 'lbl-slider-before', 'lbl-slider-after',
        'btn-language', 'prompt', 'api-key', 'generate-btn', 'gallery-btn',
        'label-api-key', 'lbl-model-text', 'txt-show-all', 'btn-show-all-models',
        'txt-fast', 'txt-creative', 'txt-dense', 'txt-movie', 'txt-highres', 'txt-enhance',
        'txt-filter', 'txt-delete-all', 'lbl-solid-colors', 'lbl-gradient-themes',
        'lbl-perf-mode', 'desc-perf-mode', 'lbl-silent-mode', 'desc-silent-mode',
        "lbl-adv-mode", "desc-adv-mode", "lbl-auto-mode", "desc-auto-mode",
        "lbl-perf-monitor", "desc-perf-monitor",
        "lbl-data-mgmt", "btn-hard-reset", "btn-close-settings",
        "lbl-skip-intro", "desc-skip-intro",
        "lbl-power-saver", "desc-power-saver",
        'btn-share-copy', 'btn-img2prompt-generate', 'chat-back-btn',
        'character-search-input', 'chat-message-input', 'chat-data-btn',
        'chat-filter-reset-btn', 'custom-main-category-trigger', 'chat-main-category-filter',
        'lbl-toggle-thoughts', 'lbl-toggle-emotions', 'editor-prompt',
        'txt-tab-scene', 'txt-tab-action', 'txt-tab-system',
        'filter-label-img-gen', 'filter-label-category', 'filter-label-subcategories',
        'label-editor-upload', 'label-editor-presets', 'label-editor-instructions',
        'txt-editor-upload', 'txt-editor-loading-presets', 'editor-generate-btn', 'editor-preset-search',
        'editor-search-no-results-text',
        'txt-filter-chip-all', 'txt-filter-chip-paid', 'opt-preset-all', 'opt-preset-safe', 'opt-preset-18plus', 'btn-preset-filter',
        'lbl-crop-title', 'btn-crop-cancel', 'btn-crop-apply',
        'gallery-stats-title', 'stats-models-title', 'stats-extras-title', 'stats-cost-title', 'stats-approx-cost',
        'lbl-elinfo-title', 'lbl-elinfo-sub',
        'lbl-elinfo-i1-title', 'lbl-elinfo-i1-desc',
        'lbl-elinfo-i2-title', 'lbl-elinfo-i2-desc',
        'lbl-elinfo-i3-title', 'lbl-elinfo-i3-desc',
        'lbl-elinfo-i4-title', 'lbl-elinfo-i4-desc',
        'label-editor-model',
        'txt-editor-model-v1', 'txt-editor-model-v1-tag',
        'txt-editor-model-v2', 'txt-editor-model-v2-tag',
        'lbl-editor-v1-title', 'lbl-editor-v1-sub',
        'lbl-editor-v1-i1-title', 'lbl-editor-v1-i1-desc',
        'lbl-editor-v1-i2-title', 'lbl-editor-v1-i2-desc',
        'lbl-editor-v1-i3-title', 'lbl-editor-v1-i3-desc',
        'lbl-editor-v2-title', 'lbl-editor-v2-sub',
        'lbl-editor-v2-i1-title', 'lbl-editor-v2-i1-desc',
        'lbl-editor-v2-i2-title', 'lbl-editor-v2-i2-desc',
        'lbl-editor-v2-i3-title', 'lbl-editor-v2-i3-desc',
        'txt-editor-model-v3', 'txt-editor-model-v3-tag', 'txt-editor-model-v3-badge',
        'lbl-editor-v3-title', 'lbl-editor-v3-sub',
        'lbl-editor-v3-i1-title', 'lbl-editor-v3-i1-desc',
        'lbl-editor-v3-i2-title', 'lbl-editor-v3-i2-desc',
        'lbl-editor-v3-i3-title', 'lbl-editor-v3-i3-desc',
        'lbl-editor-v1-pros-title', 'lbl-editor-v1-pro-1', 'lbl-editor-v1-pro-2',
        'lbl-editor-v1-cons-title', 'lbl-editor-v1-con-1', 'lbl-editor-v1-con-2',
        'lbl-editor-v2-pros-title', 'lbl-editor-v2-pro-1', 'lbl-editor-v2-pro-2', 'lbl-editor-v2-pro-3',
        'lbl-editor-v2-cons-title', 'lbl-editor-v2-con-1', 'lbl-editor-v2-con-2',
        'lbl-editor-v3-pros-title', 'lbl-editor-v3-pro-1', 'lbl-editor-v3-pro-2', 'lbl-editor-v3-pro-3',
        'lbl-editor-v3-cons-title', 'lbl-editor-v3-con-1', 'lbl-editor-v3-con-2',
        'txt-editor-model-v1-badge', 'txt-editor-model-v2-badge',
        'txt-nav-donate', 'txt-nav-showcase', 'txt-nav-developer', 
        'txt-nav-apps', 'txt-nav-settings', 'txt-nav-language',
        'credit-widget', 'credit-widget-label',
        'lbl-credits-modal-title', 'lbl-credits-modal-subtitle', 'btn-close-credits',
        'lbl-credits-balance-label', 'btn-refresh-credits',
        'lbl-credits-breakdown-purchased', 'lbl-credits-breakdown-used',
        'lbl-credits-breakdown-gifted', 'lbl-credits-breakdown-gift-received',
        'lbl-credits-no-api-warning',
        'lbl-credits-packages-title',
        'lbl-credits-badge-starter', 'lbl-credits-badge-standard', 'lbl-credits-badge-popular', 'lbl-credits-badge-pro', 'lbl-credits-badge-ultra',
        'lbl-credits-unit-starter', 'lbl-credits-unit-standard', 'lbl-credits-unit-popular', 'lbl-credits-unit-pro', 'lbl-credits-unit-ultra',
        'lbl-credits-rate-starter', 'lbl-credits-rate-standard', 'lbl-credits-rate-popular', 'lbl-credits-rate-pro', 'lbl-credits-rate-ultra',
        'btn-credits-buy-starter', 'btn-credits-buy-standard', 'btn-credits-buy-popular', 'btn-credits-buy-pro', 'btn-credits-buy-ultra',
        'lbl-credits-note',
        'lbl-buy-warning-title', 'lbl-buy-warning-desc', 'lbl-buy-warning-checkbox', 'btn-cancel-buy-warning', 'btn-confirm-buy-warning',
        'lbl-buy-warning-my-key', 'lbl-buy-warning-click-copy',
        'lbl-credits-gift-title', 'lbl-gift-target-key', 'lbl-gift-amount', 'lbl-btn-send-gift', 'lbl-gift-confirm-title', 'btn-cancel-gift-confirm', 'btn-confirm-gift-send',
        'lbl-my-share-code-prefix'
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
        else if (txt === "Elements" || txt === "Elementler") type = 'elements';
        
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

function safelySetSvgText(id, text) {
    const el = domElementCache.static[id] || document.getElementById(id);
    if (el) {
        const textNodes = Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE);
        if (textNodes.length > 0) {
            textNodes.forEach(n => n.textContent = '');
            textNodes[textNodes.length - 1].textContent = '\n                        ' + text + '\n                    ';
        } else {
            el.appendChild(document.createTextNode('\n                        ' + text + '\n                    '));
        }
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
                    btnText.textContent = lang === 'tr' ? "Temel Modeller" : "Base Models";
                } else {
                    btnText.textContent = lang === 'tr' ? "Tüm Modelleri Göster" : "Show All Models";
                }
            }
        }
        else if (item.type === 'ratio') item.el.textContent = t.ratioLabel;
        else if (item.type === 'extra') item.el.textContent = t.extraLabel;
        else if (item.type === 'adv') item.el.textContent = t.advLabel;
        else if (item.type === 'elements') item.el.textContent = t.elementsLabel || 'Elements';
    }


    var idsToSetTextSafely = [
        ["lbl-slider-before", t.lblSliderBefore], ["lbl-slider-after", t.lblSliderAfter],
        ["txt-fast", t.featFast], ["txt-creative", t.featCreative], ["txt-dense", t.featDense], ["txt-movie", t.featMovie], ["txt-highres", t.featHighRes], 
        ["txt-enhance", t.featEnhance], ["txt-filter", t.lblFilter], ["txt-delete-all", t.btnDelAll], ["lbl-solid-colors", t.lblSolid], 
        ["lbl-gradient-themes", t.lblGradient], ["desc-perf-mode", t.lblPerfDesc], ["desc-silent-mode", t.lblSilentDesc], ["desc-adv-mode", t.lblAdvDesc],
        ["desc-auto-mode", t.lblAutoDesc], ["desc-perf-monitor", t.lblPerfMonDesc], ["desc-prompt-preview", t.lblPromptPreviewDesc],
        ["opt-preset-all", t.presetFilterAll], ["opt-preset-safe", t.presetFilterSafe], ["opt-preset-18plus", t.presetFilterPlus18],
        ["prompt-preview-title", t.promptPreviewTitle], ["lbl-data-mgmt", t.lblData], ["desc-skip-intro", t.lblSkipIntroDesc],
        ["desc-power-saver", t.lblPowerSaverDesc],
        ["lbl-crop-title", t.editorCropLabel], ["btn-crop-cancel", t.editorCropCancel], ["btn-crop-apply", t.editorCropApply],
        ["gallery-stats-title", t.galleryStatsTitle], ["stats-models-title", t.statsModelsTitle], ["stats-extras-title", t.statsExtrasTitle], ["stats-cost-title", t.statsCostTitle],
        ["lbl-img2prompt-detail", t.lblImg2PromptDetail], ["btn-detail-low", t.btnDetailLow], ["btn-detail-medium", t.btnDetailMedium], ["btn-detail-high", t.btnDetailHigh],
        ["lbl-elinfo-title", t.elInfoTitle], ["lbl-elinfo-sub", t.elInfoSub],
        ["lbl-elinfo-i1-title", t.elInfoI1Title], ["lbl-elinfo-i1-desc", t.elInfoI1Desc],
        ["lbl-elinfo-i2-title", t.elInfoI2Title], ["lbl-elinfo-i2-desc", t.elInfoI2Desc],
        ["lbl-elinfo-i3-title", t.elInfoI3Title], ["lbl-elinfo-i3-desc", t.elInfoI3Desc],
        ["lbl-elinfo-i4-title", t.elInfoI4Title], ["lbl-elinfo-i4-desc", t.elInfoI4Desc],
        ["label-editor-model", t.editorModelLabel],
        ["txt-editor-model-v1", t.editorModelV1Name], ["txt-editor-model-v1-tag", t.editorModelV1Tag],
        ["txt-editor-model-v2", t.editorModelV2Name], ["txt-editor-model-v2-tag", t.editorModelV2Tag],
        ["lbl-editor-v1-title", t.editorV1InfoTitle], ["lbl-editor-v1-sub", t.editorV1InfoSub],
        ["lbl-editor-v1-i1-title", t.editorV1I1Title], ["lbl-editor-v1-i1-desc", t.editorV1I1Desc],
        ["lbl-editor-v1-i2-title", t.editorV1I2Title], ["lbl-editor-v1-i2-desc", t.editorV1I2Desc],
        ["lbl-editor-v1-i3-title", t.editorV1I3Title], ["lbl-editor-v1-i3-desc", t.editorV1I3Desc],
        ["lbl-editor-v2-title", t.editorV2InfoTitle], ["lbl-editor-v2-sub", t.editorV2InfoSub],
        ["lbl-editor-v2-i1-title", t.editorV2I1Title], ["lbl-editor-v2-i1-desc", t.editorV2I1Desc],
        ["lbl-editor-v2-i2-title", t.editorV2I2Title], ["lbl-editor-v2-i2-desc", t.editorV2I2Desc],
        ["lbl-editor-v2-i3-title", t.editorV2I3Title], ["lbl-editor-v2-i3-desc", t.editorV2I3Desc],
        ["txt-editor-model-v3", t.editorModelV3Name], ["txt-editor-model-v3-tag", t.editorModelV3Tag],
        ["txt-editor-model-v3-badge", t.editorModelV3Badge],
        ["lbl-editor-v3-title", t.editorV3InfoTitle], ["lbl-editor-v3-sub", t.editorV3InfoSub],
        ["lbl-editor-v3-i1-title", t.editorV3I1Title], ["lbl-editor-v3-i1-desc", t.editorV3I1Desc],
        ["lbl-editor-v3-i2-title", t.editorV3I2Title], ["lbl-editor-v3-i2-desc", t.editorV3I2Desc],
        ["lbl-editor-v3-i3-title", t.editorV3I3Title], ["lbl-editor-v3-i3-desc", t.editorV3I3Desc],
        ["lbl-editor-v1-pros-title", t.editorProsTitle], ["lbl-editor-v1-pro-1", t.editorV1Pro1],
        ["lbl-editor-v1-pro-2", t.editorV1Pro2],
        ["lbl-editor-v1-cons-title", t.editorConsTitle], ["lbl-editor-v1-con-1", t.editorV1Con1],
        ["lbl-editor-v1-con-2", t.editorV1Con2],
        ["lbl-editor-v2-pros-title", t.editorProsTitle], ["lbl-editor-v2-pro-1", t.editorV2Pro1],
        ["lbl-editor-v2-pro-2", t.editorV2Pro2], ["lbl-editor-v2-pro-3", t.editorV2Pro3],
        ["lbl-editor-v2-cons-title", t.editorConsTitle], ["lbl-editor-v2-con-1", t.editorV2Con1],
        ["lbl-editor-v2-con-2", t.editorV2Con2],
        ["lbl-editor-v3-pros-title", t.editorProsTitle], ["lbl-editor-v3-pro-1", t.editorV3Pro1],
        ["lbl-editor-v3-pro-2", t.editorV3Pro2], ["lbl-editor-v3-pro-3", t.editorV3Pro3],
        ["lbl-editor-v3-cons-title", t.editorConsTitle], ["lbl-editor-v3-con-1", t.editorV3Con1],
        ["lbl-editor-v3-con-2", t.editorV3Con2],
        ["txt-editor-model-v1-badge", t.editorModelV1Badge],
        ["txt-editor-model-v2-badge", t.editorModelV2Badge],
        ["txt-nav-donate", t.navDonate], ["txt-nav-showcase", t.navShowcase],
        ["txt-nav-developer", t.navDeveloper], ["txt-nav-apps", t.navApps],
        ["txt-nav-settings", t.navSettings], ["txt-nav-language", t.navLanguage],
        ["credit-widget-label", t.creditWidgetLabel],
        ["lbl-credits-modal-title", t.creditsModalTitle],
        ["lbl-credits-modal-subtitle", t.creditsModalSubtitle],
        ["lbl-credits-balance-label", t.creditsBalanceLabel],
        ["lbl-credits-breakdown-purchased", t.creditsBreakdownPurchased],
        ["lbl-credits-breakdown-used", t.creditsBreakdownUsed],
        ["lbl-credits-breakdown-gifted", t.creditsBreakdownGifted],
        ["lbl-credits-breakdown-gift-received", t.creditsBreakdownGiftReceived],
        ["lbl-credits-no-api-warning", t.creditsNoApiWarning],
        ["lbl-credits-packages-title", t.creditsPackagesTitle],
        ["lbl-credits-badge-starter", t.creditsPackageStarter],
        ["lbl-credits-badge-standard", t.creditsPackageStandard],
        ["lbl-credits-badge-popular", t.creditsPackagePopular],
        ["lbl-credits-badge-pro", t.creditsPackagePro],
        ["lbl-credits-badge-ultra", t.creditsPackageUltra],
        ["lbl-credits-unit-starter", t.creditsPackageUnit],
        ["lbl-credits-unit-standard", t.creditsPackageUnit],
        ["lbl-credits-unit-popular", t.creditsPackageUnit],
        ["lbl-credits-unit-pro", t.creditsPackageUnit],
        ["lbl-credits-unit-ultra", t.creditsPackageUnit],
        ["lbl-credits-rate-starter", t.creditsPackageRateStarter],
        ["lbl-credits-rate-standard", t.creditsPackageRateStandard],
        ["lbl-credits-rate-popular", t.creditsPackageRatePopular],
        ["lbl-credits-rate-pro", t.creditsPackageRatePro],
        ["lbl-credits-rate-ultra", t.creditsPackageRateUltra],
        ["btn-credits-buy-starter", t.creditsPackageBtn],
        ["btn-credits-buy-standard", t.creditsPackageBtn],
        ["btn-credits-buy-popular", t.creditsPackageBtn],
        ["btn-credits-buy-pro", t.creditsPackageBtn],
        ["btn-credits-buy-ultra", t.creditsPackageBtn],
        ["lbl-credits-note", t.creditsPackagesNote],
        ["lbl-buy-warning-title", t.buyWarningTitle],
        ["lbl-buy-warning-checkbox", t.buyWarningCheckbox],
        ["btn-cancel-buy-warning", t.buyWarningCancel],
        ["btn-confirm-buy-warning", t.buyWarningConfirm],
        ["lbl-buy-warning-my-key", t.lblBuyWarningMyKey],
        ["lbl-buy-warning-click-copy", t.lblBuyWarningClickCopy],
        ["lbl-credits-gift-title", t.lblCreditsGiftTitle],
        ["lbl-gift-target-key", t.lblGiftTargetKey],
        ["lbl-gift-amount", t.lblGiftAmount],
        ["lbl-btn-send-gift", t.lblBtnSendGift],
        ["lbl-gift-confirm-title", t.lblGiftConfirmTitle],
        ["btn-cancel-gift-confirm", t.btnCancel],
        ["btn-confirm-gift-send", t.lblBtnSendGift],
        ["lbl-my-share-code-prefix", t.lblMyShareCodePrefix]
    ]
    
    idsToSetTextSafely.forEach(([id, text]) => {
        safelySetText(id, text);
    });

    const buyWarningDescEl = cache['lbl-buy-warning-desc'] || document.getElementById('lbl-buy-warning-desc');
    if (buyWarningDescEl && t.buyWarningDesc) {
        buyWarningDescEl.innerHTML = t.buyWarningDesc;
    }

    const giftTargetKeyInput = cache['gift-target-key'] || document.getElementById('gift-target-key');
    if (giftTargetKeyInput && t.giftTargetKeyPlaceholder) {
        giftTargetKeyInput.placeholder = t.giftTargetKeyPlaceholder;
    }

    if (cache['credit-widget']) {
        cache['credit-widget'].title = t.creditWidgetTitle;
    }
    if (cache['btn-refresh-credits']) {
        cache['btn-refresh-credits'].title = t.creditsRefreshTitle;
    }
    if (cache['btn-close-credits']) {
        cache['btn-close-credits'].setAttribute('aria-label', t.creditsModalClose);
        cache['btn-close-credits'].title = t.creditsModalClose;
    }

    const elInfoDescEl = document.getElementById('lbl-elinfo-desc');
    if (elInfoDescEl && t.elInfoDesc) elInfoDescEl.innerHTML = t.elInfoDesc;

    const editorV1DescEl = document.getElementById('lbl-editor-v1-desc');
    if (editorV1DescEl && t.editorV1InfoDesc) editorV1DescEl.innerHTML = t.editorV1InfoDesc;

    const editorV2DescEl = document.getElementById('lbl-editor-v2-desc');
    if (editorV2DescEl && t.editorV2InfoDesc) editorV2DescEl.innerHTML = t.editorV2InfoDesc;

    const editorV3DescEl = document.getElementById('lbl-editor-v3-desc');
    if (editorV3DescEl && t.editorV3InfoDesc) editorV3DescEl.innerHTML = t.editorV3InfoDesc;


    var idsToSetSvgTextSafely = [
        ["lbl-perf-mode", t.lblPerf], ["lbl-silent-mode", t.lblSilent], ["lbl-adv-mode", t.lblAdv],
        ["lbl-auto-mode", t.lblAuto], ["lbl-perf-monitor", t.lblPerfMon], ["lbl-prompt-preview", t.lblPromptPreview],
        ["lbl-skip-intro", t.lblSkipIntro], ["lbl-power-saver", t.lblPowerSaver]
    ]
    
    idsToSetSvgTextSafely.forEach(([id, text]) => {
        safelySetSvgText(id, text);
    });

    if (cache['btn-preset-filter']) cache['btn-preset-filter'].title = t.btnPresetFilterTitle;
    
    var idsToSetQueryText = [
        ["#gallery-modal .gallery-title", t.galleryTitle], ["#showcase-modal .gallery-title", t.showcaseTitle], ["#settings-modal h3", t.settingsTitle],
        ["#confirm-modal h3", t.deleteTitle], ["#confirm-modal p", t.deleteDesc], ["#btn-cancel", t.btnCancel], ["#btn-confirm", t.btnConfirm],
        ["#delete-all-modal h3", t.deleteAllTitle], ["#delete-all-modal p", t.deleteAllDesc], ["#btn-cancel-all", t.btnCancel], ["#btn-confirm-all", t.btnConfirmAll],
        ["#hard-reset-modal h3", t.resetTitle], ["#hard-reset-modal p", t.resetDesc], ["#btn-cancel-reset", t.btnCancel],
        ["#btn-confirm-reset", t.btnConfirmReset], ["#img2prompt-modal h3", t.img2promptTitle], ["#img2prompt-modal p", t.img2promptDesc],
        ["#upload-placeholder span", t.btnUpload], ["#btn-img2prompt-cancel", t.btnCancel], ["#lbl-mobile-paste", t.btnMobilePaste],
        ["#prompt-history-title", t.recentPrompts], ["#clear-history-btn", t.clearHistory],
        ["#history-clear-modal h3", t.historyClearTitle], ["#history-clear-modal p", t.historyClearDesc],
        ["#btn-history-cancel", t.btnCancel], ["#btn-history-confirm", t.btnYesClear], ["#wand-modal h3", t.wandTitle],
        ["#btn-wand-cancel", t.btnKeepOriginal], ["#btn-wand-confirm", t.btnApplyChanges],
        ["#random-prompt-modal-title", t.randomPromptTitle], ["#random-prompt-subtitle", t.randomPromptSubtitle],
        ["#btn-random-cancel", t.btnKeepOriginal], ["#btn-random-apply", t.btnRandomApply],
        ["#btn-close-settings", t.btnClose], ["#share-title", t.shareTitle], ["#share-desc", t.shareDesc],
        ["#txt-share-view", t.btnShareView]
    ]
    
    idsToSetQueryText.forEach(([id, text]) => {
        setQueryText(id, text);
    });

    const origTitle = document.querySelector('.diff-box.original h6');
    if (origTitle) origTitle.textContent = t.wandOriginal;
    const enhTitle = document.querySelector('.diff-box.enhanced h6');
    if (enhTitle) enhTitle.textContent = t.wandEnhanced;

    const resetDataBtn = cache['btn-hard-reset'];
    if (resetDataBtn) resetDataBtn.textContent = t.btnResetData;

    const copyBtn = cache['btn-share-copy'];
    if (copyBtn && !copyBtn.disabled) copyBtn.textContent = t.btnShareCopy;
    const genPromptBtn = cache['btn-img2prompt-generate'];
    if (genPromptBtn && !genPromptBtn.classList.contains('loading')) {
        const span = genPromptBtn.querySelector('span');
        if (span) span.textContent = t.btnGenPrompt;
    }

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
    safelySetText('lbl-toggle-emotions', t.toggleEmotions);
    
    safelySetText('label-editor-upload', t.editorUploadLabel);
    safelySetText('label-editor-presets', t.editorPresetsLabel);
    safelySetText('label-editor-instructions', t.editorInstructionsLabel);
    safelySetText('txt-editor-upload', t.editorUploadMsg);
    safelySetText('txt-editor-loading-presets', t.editorLoadingPresets);
    safelySetText('editor-generate-btn', t.editorGenerateBtn);

    safelySetText('txt-outpaint-label', t.outpaintLabel);
    safelySetText('txt-outpaint-top', t.outpaintTop);
    safelySetText('txt-outpaint-bottom', t.outpaintBottom);
    safelySetText('txt-outpaint-left', t.outpaintLeft);
    safelySetText('txt-outpaint-right', t.outpaintRight);
    safelySetText('txt-outpaint-btn', t.outpaintBtn);
    safelySetText('txt-outpaint-reset', t.outpaintReset);
    safelySetText('txt-outpaint-presets', t.outpaintPresetsTitle);
    safelySetText('txt-toreal-btn', t.torealBtn);
    safelySetText('txt-uhd-btn', t.uhdBtn);
    safelySetText('txt-genderswap-btn', t.genderSwapBtn);
    safelySetText('txt-app-card-edit', t.appCardEditName);
    safelySetText('txt-app-card-edit-desc', t.appCardEditDesc);
    safelySetText('txt-app-card-outpaint', t.appCardOutpaintName);
    safelySetText('txt-app-card-outpaint-desc', t.appCardOutpaintDesc);
    safelySetText('txt-app-card-anythingtoreal', t.appCardAnythingToRealName);
    safelySetText('txt-app-card-anythingtoreal-desc', t.appCardAnythingToRealDesc);
    safelySetText('txt-app-card-uhdupscale', t.appCardUhdUpscaleName);
    safelySetText('txt-app-card-uhdupscale-desc', t.appCardUhdUpscaleDesc);
    safelySetText('txt-app-card-genderswap', t.appCardGenderSwapName);
    safelySetText('txt-app-card-genderswap-desc', t.appCardGenderSwapDesc);
    safelySetText('txt-app-card-fusion', t.appCardFusionName);
    safelySetText('txt-app-card-fusion-desc', t.appCardFusionDesc);
    safelySetText('label-editor-fusion-upload', t.editorFusionUploadLabel);
    safelySetText('txt-fusion-btn', t.fusionBtn);
    safelySetText('txt-fusion-upload-1', t.fusionUpload1);
    safelySetText('txt-fusion-upload-2', t.fusionUpload2);
    safelySetText('label-fusion-strength', t.fusionBlendRatio || 'Blend Ratio');
    if (typeof updateFusionSliderLabel === 'function') {
        updateFusionSliderLabel();
    }

    const showAllBtn = document.getElementById('editor-app-show-all-btn');
    if (showAllBtn) {
        const isShowAll = document.getElementById('editor-app-popup')?.classList.contains('show-all');
        safelySetText('txt-app-show-all', isShowAll ? t.appCardShowLess : t.appCardShowAll);
    }


    if (typeof editorCurrentMode !== 'undefined') {
        const selectorLabel = document.getElementById('editor-app-selector-label');
        if (selectorLabel) {
            selectorLabel.textContent = editorCurrentMode === 'outpaint' 
                ? t.appCardOutpaintName 
                : editorCurrentMode === 'anythingtoreal'
                    ? t.appCardAnythingToRealName
                    : editorCurrentMode === 'uhdupscale'
                        ? t.appCardUhdUpscaleName
                        : editorCurrentMode === 'genderswap'
                            ? t.appCardGenderSwapName
                            : editorCurrentMode === 'fusion'
                                ? t.appCardFusionName
                                : t.appCardEditName;
        }
    }

    
    const editorPrompt = cache['editor-prompt'];
    if(editorPrompt) editorPrompt.placeholder = t.editorPromptPlaceholder;

    const editorPresetSearch = cache['editor-preset-search'];
    if(editorPresetSearch) editorPresetSearch.placeholder = t.editorSearchPlaceholder;

    safelySetText('editor-search-no-results-text', t.editorSearchNoResults);

    safelySetText('txt-filter-chip-all', t.filterAll);
    safelySetText('txt-filter-chip-paid', t.filterPaid);
    safelySetText('txt-blur-toggle', t.btnRevealBlur);

    safelySetText('toon-header-badge-txt', t.toonHeaderBadge);
    safelySetText('toon-header-title-txt', t.toonHeaderTitle);
    safelySetText('toon-header-sub-txt', t.toonHeaderSub);
    safelySetText('toon-section-title', t.toonSectionTitle);
    safelySetText('toon-cat-all', t.toonCatAll);
    safelySetText('toon-error-msg', t.toonErrorMsg);
    safelySetText('toon-retry-btn', t.toonRetryBtn);

    safelySetText('lbl-package-detail-title', t.lblPackageDetailTitle);
    safelySetText('lbl-package-detail-subtitle', t.lblPackageDetailSubtitle);
    safelySetText('lbl-select-base-package', t.lblSelectBasePackage);
    safelySetText('lbl-select-compare-package', t.lblSelectComparePackage);
    safelySetText('opt-compare-none', t.optCompareNone);
    safelySetText('lbl-rate-compare-cost', t.lblRateCompareCost);
    safelySetText('lbl-table-model', t.lblTableModel);
    safelySetText('lbl-table-base-usage', t.lblTableBaseUsage);
    safelySetText('lbl-table-compare-usage', t.lblTableCompareUsage);
    safelySetText('btn-package-detail-buy', t.btnPackageDetailBuy);

    const baseSelect = document.getElementById('select-base-package');
    if (baseSelect) {
        const starterOpt = baseSelect.querySelector('option[value="starter"]');
        if (starterOpt) starterOpt.textContent = `${t.creditsPackageStarter} (50 ${t.creditsPackageUnit})`;
        const standardOpt = baseSelect.querySelector('option[value="standard"]');
        if (standardOpt) standardOpt.textContent = `${t.creditsPackageStandard} (100 ${t.creditsPackageUnit})`;
        const popularOpt = baseSelect.querySelector('option[value="popular"]');
        if (popularOpt) popularOpt.textContent = `${t.creditsPackagePopular} (200 ${t.creditsPackageUnit})`;
        const proOpt = baseSelect.querySelector('option[value="pro"]');
        if (proOpt) proOpt.textContent = `${t.creditsPackagePro} (500 ${t.creditsPackageUnit})`;
        const ultraOpt = baseSelect.querySelector('option[value="ultra"]');
        if (ultraOpt) ultraOpt.textContent = `${t.creditsPackageUltra} (1000 ${t.creditsPackageUnit})`;
    }

    const compareSelect = document.getElementById('select-compare-package');
    if (compareSelect) {
        const noneOpt = compareSelect.querySelector('option[value="none"]');
        if (noneOpt) noneOpt.textContent = t.optCompareNone;
        const starterOpt = compareSelect.querySelector('option[value="starter"]');
        if (starterOpt) starterOpt.textContent = `${t.creditsPackageStarter} (50 ${t.creditsPackageUnit})`;
        const standardOpt = compareSelect.querySelector('option[value="standard"]');
        if (standardOpt) standardOpt.textContent = `${t.creditsPackageStandard} (100 ${t.creditsPackageUnit})`;
        const popularOpt = compareSelect.querySelector('option[value="popular"]');
        if (popularOpt) popularOpt.textContent = `${t.creditsPackagePopular} (200 ${t.creditsPackageUnit})`;
        const proOpt = compareSelect.querySelector('option[value="pro"]');
        if (proOpt) proOpt.textContent = `${t.creditsPackagePro} (500 ${t.creditsPackageUnit})`;
        const ultraOpt = compareSelect.querySelector('option[value="ultra"]');
        if (ultraOpt) ultraOpt.textContent = `${t.creditsPackageUltra} (1000 ${t.creditsPackageUnit})`;
    }

    if (typeof window.refreshPackageDetailModal === 'function') {
        window.refreshPackageDetailModal();
    }

    if (typeof window.updateModelSortLanguage === 'function') {
        window.updateModelSortLanguage();
    }

    if (typeof window._updateMultiSelectLanguage === 'function') {
        window._updateMultiSelectLanguage();
    }

    if (typeof window.updateModelGalleryLanguage === 'function') {
        window.updateModelGalleryLanguage();
    }

    if (typeof window.aiStoriesUpdateLang === 'function') {
        window.aiStoriesUpdateLang(lang);
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

            if (typeof window.updateTutorialRestartLang === 'function') {
                window.updateTutorialRestartLang();
            }

            if (typeof window.updateTutorialStepLang === 'function') {
                window.updateTutorialStepLang();
            }

            document.querySelectorAll('.flag-text').forEach(el => {
                if (translations[currentLang]) {
                    const card = el.closest('.model-card');
                    if (card && card.classList.contains('paid-model')) {
                        el.textContent = translations[currentLang].paidLabel || 'Paid';
                    } else if (translations[currentLang].exclusiveLabel) {
                        el.textContent = translations[currentLang].exclusiveLabel;
                    }
                }
            });

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
        storiesTitle: "AI Stories",
        storiesStatus: "Start",
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
        storiesTitle: "AI Hikayeleri",
        storiesStatus: "Başlat",
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
    const txtSoon = t.storiesStatus;

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
    safelySetTextById('txt-app-stories-title', t.storiesTitle);
    safelySetTextById('txt-app-stories-status', (currentMode === 'stories') ? txtActive : txtSoon);
    safelySetTextById('txt-app-close', t.close);

    const storiesReadyText = document.getElementById('txt-stories-ready-soon');
    if (storiesReadyText) {
        storiesReadyText.innerText = (lang === 'tr') ? translations.tr.storiesReadySoon : translations.en.storiesReadySoon;
    }

    const storiesSubtitleText = document.getElementById('txt-stories-subtitle');
    if (storiesSubtitleText) {
        storiesSubtitleText.innerText = (lang === 'tr') ? translations.tr.storiesSubtitle : translations.en.storiesSubtitle;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.lang = currentLang;
    updateAppSwitcherLang(currentLang);
});