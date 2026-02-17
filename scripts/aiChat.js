let currentCharacter = null;
let currentConversationId = null;

async function openCharacterChat(characterData) {
    try {
        currentConversationId = null;
        disableChatInput();

        if (typeof chatDbHelper === 'undefined') {
            console.error('chatDbHelper is not defined');
            alert('Error: Database helper not loaded. Please refresh the page.');
            return;
        }

        currentCharacter = {
            id: characterData.id,
            name: characterData.name,
            image: characterData.characterIMG?.thumbnail || '',
            systemPrompt: characterData.systemPrompt,
            firstMessage: characterData.firstMessage,
            action: characterData.action,
            scene: characterData.scene,
            subCategories: characterData.subCategories || [],
            category: characterData.category || '',
            supportImageGeneration: characterData.supportImageGeneration || false,
            thenaModel: characterData.thenaModel || '',
            characterCLIP: characterData.characterCLIP || '',
            tokenPrice: characterData.tokenPrice || { en: 0.0000002, tr: 0.0000083 }
        };

        try {
            const settings = await chatDbHelper.getCharacterSettings(currentCharacter.id);
            const showThoughts = settings && settings.showThoughts !== undefined ? settings.showThoughts : true;
            if (typeof applyThoughtVisibility === 'function') {
                applyThoughtVisibility(showThoughts);
            }
        } catch (e) {
            console.warn('Failed to load character settings', e);
             if (typeof applyThoughtVisibility === 'function') {
                applyThoughtVisibility(true);
            }
        }

        const modal = document.getElementById('chat-screen-modal');
        const charImg = document.getElementById('chat-char-img');
        const charName = document.getElementById('chat-char-name');
        const messagesContainer = document.getElementById('messages-container');

        if (charImg) charImg.src = currentCharacter.image;
        if (charName) charName.textContent = currentCharacter.name || 'Unknown';

        const imgGenBtn = document.getElementById('chat-img-gen-btn');
        if (imgGenBtn) {
            if (currentCharacter.supportImageGeneration) {
                imgGenBtn.disabled = false;
                imgGenBtn.title = (typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Resim Oluştur' : 'Generate Image';
            } else {
                imgGenBtn.disabled = true;
                imgGenBtn.title = (typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Bu karakter resim oluşturmayı desteklemiyor' : 'This character does not support image generation';
            }

            imgGenBtn.onclick = async () => {
                 if (!currentConversationId || !currentCharacter) {
                    showNotification((typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Lütfen önce bir sohbet seçin.' : 'Please select a conversation first.', 'error');
                    return;
                }

                const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
                if (!apiKey) {
                    showNotification((typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'API anahtarı gerekli.' : 'API key is required.', 'error');
                    return;
                }

                const originalContent = imgGenBtn.innerHTML;
                try {
                    const allMessages = await chatDbHelper.getMessages(currentConversationId);
                    
                    const assistantMessages = allMessages
                        .filter(msg => msg.role === 'assistant')
                        .slice(-3)
                        .reverse()
                        .map(msg => msg.content);

                    if (assistantMessages.length < 3) {
                        playErrorSound();
                        showNotification((typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Resim oluşturmak için en az 3 karakter mesajı gerekli.' : 'At least 3 character messages are required to generate an image.', 'error');
                        return;
                    }

                    const hasGeneratedImage = assistantMessages.some(msg => {
                        try {
                            const parsed = JSON.parse(msg);
                            if (parsed.type === 'generated_image') return true;
                        } catch (e) {
                        }
                        return msg.startsWith('[Generated Image]');
                    });
                    if (hasGeneratedImage) {
                        playInformationSound();
                        showNotification((typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Son mesajlarda oluşturulmuş bir görsel var. Lütfen önce sohbete devam edin.' : 'There is a generated image in recent messages. Please continue the conversation first.', 'info');
                        return;
                    }

                    imgGenBtn.disabled = true;
                    isChatGeneratingImage = true;
                    imgGenBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spinning"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`;
                    const initialLoadingNotif = showNotification((typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Görsel Oluşturuluyor...' : 'Generating Image...', 'info', null, 7000);
                    disableChatInput((typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Görsel Oluşturuluyor...' : 'Generating Image...');

                    const messagesContainer = document.getElementById('messages-container');
                    const locale = (typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'tr-TR' : 'en-US';
                    const timeStr = new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

                    const loadingBubble = document.createElement('div');
                    loadingBubble.className = 'message-bubble assistant';
                    loadingBubble.id = 'img-gen-loading-bubble';
                    loadingBubble.innerHTML = `
                        <div class="message-content">
                            <div style="display: flex; flex-direction: column; align-items: center; padding: 30px 40px; background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--primary-rgb), 0.05) 100%); border-radius: 12px; border: 1px solid rgba(var(--primary-rgb), 0.2); min-width: 200px;">
                                <div class="img-gen-spinner" style="width: 48px; height: 48px; border: 3px solid rgba(var(--primary-rgb), 0.2); border-top-color: rgb(var(--primary-rgb)); border-radius: 50%; animation: spin 1s linear infinite;"></div>
                                <p style="margin-top: 16px; font-size: 14px; color: rgb(var(--primary-rgb)); font-weight: 500;">${(typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Görsel Oluşturuluyor...' : 'Generating Image...'}</p>
                                <p style="margin-top: 6px; font-size: 11px; color: #666;">${(typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Bu işlem birkaç saniye sürebilir' : 'This may take a few seconds'}</p>
                            </div>
                        </div>
                        <div class="message-time">${timeStr}</div>
                    `;
                    messagesContainer.appendChild(loadingBubble);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;

                    const response = await fetch('https://create.thena.workers.dev/genScenePhoto', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': apiKey
                        },
                        body: JSON.stringify({
                            lastMessages: assistantMessages,
                            model: currentCharacter.thenaModel || '',
                            chIMG: currentCharacter.image || ''
                        })
                    });

                    const data = await response.json();

                    if (data.status === 200 && data.image) {
                        if (initialLoadingNotif) initialLoadingNotif();
                        await pollImageGeneration(data.image, apiKey, 'img-gen-loading-bubble');
                    } else {
                        const errorMessage = data.error || data.message || 'Image generation failed';
                        throw new Error(errorMessage);
                    }

                } catch (error) {
                    console.error('Image generation error:', error);
                    const loadingBubble = document.getElementById('img-gen-loading-bubble');
                    if (loadingBubble) {
                        loadingBubble.remove();
                    }
                    playErrorSound();
                    showNotification(error.message || ((typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Resim oluşturulamadı. Lütfen tekrar deneyin.' : 'Failed to generate image. Please try again.'), 'error');
                } finally {
                    imgGenBtn.disabled = false;
                    imgGenBtn.innerHTML = originalContent;
                    enableChatInput();
                    isChatGeneratingImage = false;
                }
            };
        }

        let t = {}; 
        if (typeof translations !== 'undefined' && typeof currentLang !== 'undefined') {
             t = translations[currentLang] || translations['en'];
        }

        if (messagesContainer) {
            renderCharacterDetailsInChat(messagesContainer, currentCharacter);
        }
        
        await loadConversations(currentCharacter.id);

        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }

    } catch (err) {
        console.error("Critical error in openCharacterChat:", err);
        alert("An error occurred while opening the chat. Check console for details: " + err.message);
    }
}

async function pollImageGeneration(generationId, apiKey, loadingBubbleId) {
    let genNotif = showNotification((currentLang === 'tr') ? 'Oluşturuluyor... Sıraya alındı.' : 'Generating... Queued.', 'info', null, 120000, 0);
    const messagesContainer = document.getElementById('messages-container');
    const locale = currentLang === 'tr' ? 'tr-TR' : 'en-US';
    const timeStr = new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

    return new Promise((resolve, reject) => {
        const checkStatus = async () => {
            try {
                const statusRes = await fetch(`https://create.thena.workers.dev/status?id=${generationId}`, {
                    headers: { 'apikey': apiKey }
                });
                const statusData = await statusRes.json();

                if (statusData.status === 202) {
                    if (statusData.progress) {
                            genNotif.update(
                            (currentLang === 'tr') ? `Oluşturuluyor... %${statusData.progress}` : `Generating... ${statusData.progress}%`,
                            'info',
                            statusData.progress
                        );
                    }
                    setTimeout(checkStatus, 2000);

                } else if (statusData.status === 200) {
                    genNotif(); 
                    
                    const existingBubble = document.getElementById(loadingBubbleId);
                    if (existingBubble) {
                        existingBubble.removeAttribute('id');
                        const uniqueId = 'gen-img-' + Date.now();
                        
                        existingBubble.innerHTML = `
                            <div class="message-content">
                                <div class="generated-image-wrapper">
                                    <img src="data:image/png;base64,${statusData.image}" alt="Generated Scene" style="max-width: 100%; border-radius: 8px; cursor: default; animation: fadeIn 0.5s ease;">
                                    <div class="gen-img-actions" style="position: absolute; bottom: 10px; right: 10px; display: flex; gap: 5px;">
                                        <button class="img-action-btn img-download-btn" data-img-id="${uniqueId}" onclick="downloadGeneratedImage(this, 'thena_${Date.now()}.png')" title="${currentLang === 'tr' ? 'Resmi İndir' : 'Download Image'}">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                                <polyline points="7 10 12 15 17 10"></polyline>
                                                <line x1="12" y1="15" x2="12" y2="3"></line>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <p style="margin-top: 8px; font-size: 12px; color: #888;">${statusData.content || 'Imagine With Thena'}</p>
                            </div>
                            <div class="message-time">${timeStr}</div>
                        `;
                        
                        messagesContainer.scrollTop = messagesContainer.scrollHeight;
                    }

                    const imageMessageData = JSON.stringify({
                        type: 'generated_image',
                        image: statusData.image,
                        caption: statusData.content || 'Imagine With Thena'
                    });
                    await chatDbHelper.addMessage(currentConversationId, 'assistant', imageMessageData);

                    playSuccessSound();
                    showNotification((currentLang === 'tr') ? 'Resim başarıyla oluşturuldu!' : 'Image generated successfully!', 'success');
                    resolve();
                } else {
                        throw new Error(statusData.content || 'Generation failed');
                }
            } catch (err) {
                genNotif();
                reject(err);
            }
        };
        
        setTimeout(checkStatus, 2000);
    });
    await loadConversations(currentCharacter.id);

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
    }
}

async function loadConversations(characterId) {
    const listContainer = document.getElementById('conversations-list');
    if (!listContainer) return;

    const t = translations[currentLang] || translations['en'];
    listContainer.innerHTML = `<div class="conv-loading">${t.chatLoading}</div>`;

    try {
        const conversations = await chatDbHelper.getConversations(characterId);
        renderConversations(conversations);
    } catch (error) {
        listContainer.innerHTML = `<div class="conv-error">${t.chatLoadError}</div>`;
    }
}

function renderConversations(conversations) {
    const listContainer = document.getElementById('conversations-list');
    if (!listContainer) return;

    const t = translations[currentLang] || translations['en'];
    const locale = currentLang === 'tr' ? 'tr-TR' : 'en-US';

    if (conversations.length === 0) {
        listContainer.innerHTML = `<div class="conv-empty">${t.chatNoConv}</div>`;
        return;
    }

    listContainer.innerHTML = conversations.map(conv => {
        const date = new Date(conv.createdAt);
        const dateStr = date.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
        const timeStr = date.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
        const preview = conv.lastMessage ? conv.lastMessage.substring(0, 40) + (conv.lastMessage.length > 40 ? '...' : '') : t.chatNewConv;

        return `
            <div class="conversation-item" data-conv-id="${conv.id}">
                <div class="conv-preview">${preview}</div>
                <div class="conv-date">${dateStr} ${timeStr}</div>
                <button class="conv-delete-btn" data-conv-id="${conv.id}" title="${t.chatDeleteBtn}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `;
    }).join('');

    listContainer.querySelectorAll('.conversation-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.conv-delete-btn')) return;
            const convId = parseInt(item.dataset.convId);
            selectConversation(convId);
        });
    });

    listContainer.querySelectorAll('.conv-delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.stopPropagation();
            const convId = parseInt(btn.dataset.convId);
            await chatDbHelper.deleteConversation(convId);
            if (currentConversationId === convId) {
                currentConversationId = null;
                const t2 = translations[currentLang] || translations['en'];
                document.getElementById('messages-container').innerHTML = ''; 
                renderCharacterDetailsInChat(document.getElementById('messages-container'), currentCharacter);
            }
            await loadConversations(currentCharacter.id);
            playSuccessSound();
        });
    });
}

let tempUserInfo = {};
let userInfoStep = 0;
let isGenderOtherMode = false;


function disableChatInput(placeholderText) {
    const input = document.getElementById('chat-message-input');
    const btn = document.getElementById('chat-send-btn');
    if (input) {
        input.disabled = true;
        input.placeholder = placeholderText || ((currentLang === 'tr') ? 'Lütfen önce bilgilerinizi girin...' : 'Please enter your info first...');
        input.style.opacity = '0.5';
        input.style.cursor = 'not-allowed';
    }
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
        btn.removeAttribute('data-continue-mode');
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
        `;
    }
}

function enableChatInput() {
    const input = document.getElementById('chat-message-input');
    const btn = document.getElementById('chat-send-btn');
    const t = translations[currentLang] || translations['en'];
    
    if (input) {
        input.disabled = false;
        input.placeholder = t.chatPlaceholder;
        input.style.opacity = '1';
        input.style.cursor = 'text';
    }
    if (btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
        btn.removeAttribute('data-continue-mode');
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
        `;
    }
}

function showStoryFinishedState() {
    const t = translations[currentLang] || translations['en'];
    const input = document.getElementById('chat-message-input');
    const btn = document.getElementById('chat-send-btn');
    
    if (input) {
        input.disabled = true;
        input.placeholder = t.chatStoryFinishedPlaceholder;
        input.style.opacity = '0.5';
        input.style.cursor = 'not-allowed';
    }
    
    const imgGenBtn = document.getElementById('chat-img-gen-btn');
    if (imgGenBtn) {
        imgGenBtn.disabled = true;
        imgGenBtn.style.opacity = '0.5';
        imgGenBtn.style.cursor = 'not-allowed';
        const t = translations[currentLang] || translations['en'];
        imgGenBtn.title = (currentLang === 'tr') ? 'Hikaye tamamlandı.' : 'Story finished.';
    }
    
    if (btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
        btn.setAttribute('data-continue-mode', 'true');
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
            </svg>
        `;
    }
    
    const container = document.getElementById('messages-container');
    if (container && !container.querySelector('.story-finished-banner')) {
        if (typeof playStoryFinishSound === 'function') playStoryFinishSound();

        const banner = document.createElement('div');
        banner.className = 'story-finished-banner';
        banner.innerHTML = `
            <div class="story-finished-line"></div>
            <div class="story-finished-content">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    <line x1="12" y1="6" x2="12" y2="12"></line>
                    <line x1="9" y1="9" x2="15" y2="9"></line>
                </svg>
                <span>${t.chatStoryFinished}</span>
            </div>
            <div class="story-finished-line"></div>
        `;
        container.appendChild(banner);
        container.scrollTop = container.scrollHeight;
    }
}

async function continueStory() {
    if (!currentConversationId) return;
    
    const t = translations[currentLang] || translations['en'];
    
    const messages = await chatDbHelper.getMessages(currentConversationId);
    if (messages.length >= 2) {
        const lastMsg = messages[messages.length - 1];
        const secondLastMsg = messages[messages.length - 2];
        
        const container = document.getElementById('messages-container');
        if (container) {
            const bubbles = container.querySelectorAll('.message-bubble');
            const finishedBanner = container.querySelector('.story-finished-banner');
            
            if (finishedBanner) {
                finishedBanner.classList.add('msg-deleting');
            }

            if (bubbles.length >= 2) {
                const lastBubble = bubbles[bubbles.length - 1];
                const secondLastBubble = bubbles[bubbles.length - 2];
                
                lastBubble.classList.add('msg-deleting');
                secondLastBubble.classList.add('msg-deleting');
                
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        await chatDbHelper.deleteMessage(lastMsg.id);
        await chatDbHelper.deleteMessage(secondLastMsg.id);
    }
    
    await chatDbHelper.updateConversation(currentConversationId, { isFinished: false });
    
    await chatDbHelper.addMessage(currentConversationId, 'system', '[STORY_CONTINUED]');
    
    const updatedMessages = await chatDbHelper.getMessages(currentConversationId);
    renderMessages(updatedMessages);
    
    const container = document.getElementById('messages-container');
    if (container) {
        container.scrollTop = container.scrollHeight;
    }
    
    enableChatInput();

    const imgGenBtn = document.getElementById('chat-img-gen-btn');
    if (imgGenBtn && currentCharacter && currentCharacter.supportImageGeneration) {
        imgGenBtn.disabled = false;
        imgGenBtn.style.opacity = '1';
        imgGenBtn.style.cursor = 'pointer';
        imgGenBtn.title = (currentLang === 'tr') ? 'Resim Oluştur' : 'Generate Image';
    }
    
    if (typeof playSuccessSound === 'function') playSuccessSound();
    
    const input = document.getElementById('chat-message-input');
    if (input) input.focus();
}

function startUserInfoFlow(conversationId) {
    tempUserInfo = {};
    userInfoStep = 0;
    isGenderOtherMode = false;
    disableChatInput();
    renderUserInfoStep();
}

function renderUserInfoStep() {
    const container = document.getElementById('messages-container');
    const t = translations[currentLang] || translations['en'];
    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'user-info-wrapper';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';
    wrapper.style.height = '100%';
    wrapper.style.gap = '15px';

    let labelText = '';
    let contentHTML = '';

    if (userInfoStep === 0) {
        labelText = t.userInfoName;
        contentHTML = `<div style="position:relative; width:100%;">
                           <input type="text" id="user-info-input" class="chat-message-input" style="width:100% !important; border-radius:8px; padding:10px; padding-right:50px; background:#222; border:1px solid #444; color:#fff; min-height: 40px;" placeholder="Name..." autocomplete="off" maxlength="10">
                           <span id="name-char-count" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); color:rgb(255, 107, 107); font-size:11px; font-weight:500;">0/10</span>
                       </div>
                       <button id="user-info-next" class="chat-send-btn" style="width:100%; height:40px; margin-top:5px; border-radius:8px; font-weight:700;">${t.userInfoNext}</button>`;
    } else if (userInfoStep === 1) {
        labelText = t.userInfoCharName;
        const defaultCharName = currentCharacter ? currentCharacter.name : '';
        contentHTML = `<div style="position:relative; width:100%;">
                           <input type="text" id="user-info-input" class="chat-message-input" style="width:100% !important; border-radius:8px; padding:10px; padding-right:50px; background:#222; border:1px solid #444; color:#fff; min-height: 40px;" placeholder="${currentLang === 'tr' ? 'Karakter adı...' : 'Character name...'}" autocomplete="off" maxlength="15" value="${defaultCharName}">
                           <span id="name-char-count" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); color:#666; font-size:11px; font-weight:500;">${defaultCharName.length}/15</span>
                       </div>
                       <button id="user-info-next" class="chat-send-btn" style="width:100%; height:40px; margin-top:5px; border-radius:8px; font-weight:700;">${t.userInfoNext}</button>`;
    } else if (userInfoStep === 2) {
        labelText = t.userInfoAge;
        contentHTML = `<input type="number" id="user-info-input" class="chat-message-input" style="width:100% !important; border-radius:8px; padding:10px; background:#222; border:1px solid #444; color:#fff; min-height: 40px;" placeholder="Age..." autocomplete="off" value=16 min=16 max=70>
                       <button id="user-info-next" class="chat-send-btn" style="width:100%; height:40px; margin-top:5px; border-radius:8px; font-weight:700;">${t.userInfoNext}</button>`;
    } else if (userInfoStep === 3) {
        labelText = t.userInfoGender;
        
        if (isGenderOtherMode) {
             contentHTML = `<div class="gender-btn-group" style="flex-wrap: wrap;">
                               <button class="gender-select-btn" data-value="${t.genderFemboy}">${t.genderFemboy}</button>
                               <button class="gender-select-btn" data-value="${t.genderTransgender}">${t.genderTransgender}</button>
                               <button class="gender-select-btn" data-value="${t.genderLesbian}">${t.genderLesbian}</button>
                               <button class="gender-select-btn" data-value="${t.genderGay}">${t.genderGay}</button>
                               <button class="gender-select-btn" data-value="${t.genderTomboy}">${t.genderTomboy}</button>
                               <button class="gender-select-btn back-btn" style="width: 100%; margin-top: 10px; background-color: #444;">${t.genderBack}</button>
                           </div>`;
        } else {
            contentHTML = `<div class="gender-btn-group" style="flex-wrap: wrap;">
                               <button class="gender-select-btn" data-value="${t.genderMale}">${t.genderMale}</button>
                               <button class="gender-select-btn" data-value="${t.genderFemale}">${t.genderFemale}</button>
                               <button class="gender-select-btn" data-value="${t.genderNonBinary}">${t.genderNonBinary}</button>
                               <button class="gender-select-btn" data-value="${t.genderGenderqueer}">${t.genderGenderqueer}</button>
                               <button class="gender-select-btn" data-value="${t.genderGenderfluid}">${t.genderGenderfluid}</button>
                               <button class="gender-select-btn" data-value="${t.genderAgender}">${t.genderAgender}</button>
                               <button class="gender-select-btn" data-value="${t.genderOther}">${t.genderOther}</button>
                           </div>`;
        }
    } else if (userInfoStep === 4) {
        labelText = t.userInfoModel;
        contentHTML = `<div class="model-btn-group" style="display: flex; gap: 10px; width: 100%;">
            <button class="model-select-btn" data-value="fast">
                <div style="font-weight: 700; color: #fff; margin-bottom: 5px; transition: color 0.2s;">${t.modelFast}</div>
                <div style="font-size: 11px; color: #aaa; line-height: 1.3;">${t.modelFastDesc}</div>
            </button>
            <button class="model-select-btn" data-value="thinking">
                <div style="font-weight: 700; color: #fff; margin-bottom: 5px; transition: color 0.2s;">${t.modelThinking}</div>
                <div style="font-size: 11px; color: #aaa; line-height: 1.3;">${t.modelThinkingDesc}</div>
            </button>
        </div>`;
    }

    wrapper.innerHTML = `
        <div class="user-info-box" style="background:#1a1a1a; padding:20px; border-radius:12px; border:1px solid #333; width:300px; display:flex; flex-direction:column; gap:10px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
            <label style="color:#fff; font-size:14px; font-weight:600;">${labelText}</label>
            ${contentHTML}
        </div>
    `;

    container.appendChild(wrapper);

    if (userInfoStep === 3) {
        const genderBtns = wrapper.querySelectorAll('.gender-select-btn');
        genderBtns.forEach(btn => {
            btn.onclick = () => {
                if (btn.classList.contains('back-btn')) {
                    isGenderOtherMode = false;
                    renderUserInfoStep();
                    return;
                }

                const val = btn.dataset.value;
                
                if (val === t.genderOther && !isGenderOtherMode) {
                    isGenderOtherMode = true;
                    renderUserInfoStep();
                    return;
                }

                tempUserInfo.gender = val;
                userInfoStep++;
                renderUserInfoStep();
            };
        });
    } else if (userInfoStep === 4) {
        const modelBtns = wrapper.querySelectorAll('.model-select-btn');
        modelBtns.forEach(btn => {
            btn.onclick = () => {
                const val = btn.dataset.value;
                tempUserInfo.model = val;
                userInfoStep++;
                finishUserInfoFlow();
            };
        });
    } else {
        const btn = wrapper.querySelector('#user-info-next');
        const input = wrapper.querySelector('#user-info-input');
        input.focus();
        
        if (userInfoStep === 0 || userInfoStep === 1) {
            const charCount = wrapper.querySelector('#name-char-count');
            const maxLen = userInfoStep === 0 ? 10 : 15;
            const minLen = userInfoStep === 0 ? 3 : 2;
            
            if (charCount) {
                const updateCharCount = () => {
                    charCount.textContent = `${input.value.length}/${maxLen}`;
                    if (input.value.length >= maxLen || input.value.length < minLen) {
                        charCount.style.color = '#ff6b6b';
                    } else if (input.value.length >= maxLen - 3) {
                        charCount.style.color = '#ffa500';
                    } else {
                        charCount.style.color = '#666';
                    }
                };
                updateCharCount();
                input.addEventListener('input', updateCharCount);
            }
        }
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') btn.click();
        });

        btn.onclick = () => {
            const val = input.value.trim();
            if (!val) return;
            
            if (userInfoStep === 0) {
                if (val.length < 3 || val.length > 10) {
                    if (typeof showNotification === 'function') {
                        showNotification(t.userInfoNameError || 'Name must be between 3 and 10 characters.', 'error');
                    }
                    if (typeof playErrorSound === 'function') playErrorSound();
                    return;
                }
                tempUserInfo.name = val;
            } else if (userInfoStep === 1) {
                if (val.length < 2 || val.length > 15) {
                    if (typeof showNotification === 'function') {
                        showNotification(t.userInfoCharNameError || 'Character name must be between 2 and 15 characters.', 'error');
                    }
                    if (typeof playErrorSound === 'function') playErrorSound();
                    return;
                }
                tempUserInfo.charName = val;
            } else if (userInfoStep === 2) {
                const age = parseInt(val);
                if (isNaN(age) || age < 16 || age > 70) {
                    if (typeof showNotification === 'function') {
                        showNotification(t.userInfoAgeError, 'error');
                    }
                    if (typeof playErrorSound === 'function') playErrorSound();
                    return;
                }
                tempUserInfo.age = age;
            }
            
            userInfoStep++;
            renderUserInfoStep();
        };
    }
}

async function finishUserInfoFlow() {
    if (!currentConversationId) return;
    await chatDbHelper.updateConversation(currentConversationId, { userInfo: tempUserInfo });
    enableChatInput();

    const chatCharNameEl = document.getElementById('chat-char-name');
    if (chatCharNameEl && tempUserInfo.charName) {
        chatCharNameEl.textContent = tempUserInfo.charName;
    }
    
    let firstMsgText = '';

    if (currentCharacter && currentCharacter.firstMessage) {
        firstMsgText = (currentLang === 'tr' && currentCharacter.firstMessage.tr) 
                            ? currentCharacter.firstMessage.tr 
                            : (currentCharacter.firstMessage.en || '');
        
        if (firstMsgText && firstMsgText.trim()) {
            const userString = `${tempUserInfo.name}(${tempUserInfo.gender},${tempUserInfo.age}yo.)`;
            const charName = tempUserInfo.charName || currentCharacter.name || '';
            
            firstMsgText = firstMsgText.replace(/{{user}}/g, userString)
                                       .replace(/{{char}}/g, charName)
                                       .replace(/{{age}}/g, tempUserInfo.age);
            
            await chatDbHelper.addMessage(currentConversationId, 'assistant', firstMsgText);
        }
    }
    
    const messages = await chatDbHelper.getMessages(currentConversationId);
    renderMessages(messages);
    
    if (currentCharacter && currentCharacter.firstMessage && firstMsgText && firstMsgText.trim()) {
        const container = document.getElementById('messages-container');
        if (container) {
            const lastBubbleContent = container.querySelector('.message-bubble.assistant:last-child .message-content');
            if (lastBubbleContent) {
                typeWriterEffect(lastBubbleContent, firstMsgText);
            }
        }
    }
}

function typeWriterEffect(element, fullText, speed = 40) {
    let i = 0;
    element.innerHTML = '';
    const container = document.getElementById('messages-container');
    
    function type() {
        if (i < fullText.length) {
            const chunkSize = 3;
            i += chunkSize;
            if (i > fullText.length) i = fullText.length;
            
            element.innerHTML = parseMarkdown(fullText.substring(0, i));

            if(container) container.scrollTop = container.scrollHeight;
            
            if (i < fullText.length) {
                setTimeout(type, speed);
            }
        }
    }
    
    type();
}

async function selectConversation(conversationId) {
    currentConversationId = conversationId;

    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.toggle('active', parseInt(item.dataset.convId) === conversationId);
    });

    const conv = await chatDbHelper.getConversation(conversationId);
    if (conv && !conv.userInfo) {
        startUserInfoFlow(conversationId);
        return;
    }

    const chatCharNameEl = document.getElementById('chat-char-name');
    if (chatCharNameEl && conv && conv.userInfo && conv.userInfo.charName) {
        chatCharNameEl.textContent = conv.userInfo.charName;
    }

    const messages = await chatDbHelper.getMessages(conversationId);
    renderMessages(messages);

    if (conv && conv.isFinished) {
        showStoryFinishedState();
    } else {
        enableChatInput();
    }
}

async function startNewConversation() {
    if (!currentCharacter) return;

    const convId = await chatDbHelper.createConversation({
        id: currentCharacter.id,
        name: currentCharacter.name,
        image: currentCharacter.image
    });

    await loadConversations(currentCharacter.id);
    await selectConversation(convId);

    playSuccessSound();
}

function estimateTokenCount(text) {
    if (!text) return 0;
    return Math.ceil(text.length / 4);
}

async function updateConversationCost(conversationId, text, pricePerToken) {
    if (!conversationId || !text || !pricePerToken) return;
    
    const tokens = estimateTokenCount(text);
    const cost = tokens * pricePerToken;
    
    try {
        const conversation = await chatDbHelper.getConversation(conversationId);
        if (conversation) {
            let currentCost = conversation.totalCost || 0;
            await chatDbHelper.updateConversation(conversationId, {
                totalCost: currentCost + cost
            });
        }
    } catch (e) {
        console.error('Cost update error:', e);
    }
}

async function sendMessage() {
    const t = translations[currentLang] || translations['en'];

    if (currentConversationId) {
        const convCheck = await chatDbHelper.getConversation(currentConversationId);
        if (convCheck && convCheck.isFinished) return;
    }

    document.querySelector(".chat-char-counter").textContent = "0/1000";
    
    if (!currentConversationId) {
        playErrorSound();
        showNotification(t.chatSelectFirst, 'info');
        return;
    }

    const input = document.getElementById('chat-message-input');
    const content = input.value.trim();
    if (!content) return;

    input.value = '';
    
    const pricePerToken = (currentCharacter.tokenPrice && currentCharacter.tokenPrice.en) || 0.0000002;

    await chatDbHelper.addMessage(currentConversationId, 'user', content);
    await updateConversationCost(currentConversationId, content, pricePerToken);

    await chatDbHelper.updateConversation(currentConversationId, {
        lastMessage: content,
        lastMessageTime: new Date().toISOString()
    });

    const messages = await chatDbHelper.getMessages(currentConversationId);
    renderMessages(messages);

    await loadConversations(currentCharacter.id);

    const history = await chatDbHelper.getMessages(currentConversationId);
    
    let apiMessages = [];
    
    const currentConv = await chatDbHelper.getConversation(currentConversationId);
    const userInfo = currentConv ? currentConv.userInfo : null;

    if (currentCharacter && currentCharacter.systemPrompt) {
        let sysPromptText = (currentLang === 'tr' && currentCharacter.systemPrompt.tr) 
                              ? currentCharacter.systemPrompt.tr 
                              : (currentCharacter.systemPrompt.en || '');
        
        if (sysPromptText && userInfo) {
            const userString = `${userInfo.name}(${userInfo.gender},${userInfo.age}yo.)`;
            const charName = userInfo.charName || currentCharacter.name || '';
            sysPromptText = sysPromptText.replace(/{{user}}/g, userString)
                                         .replace(/{{char}}/g, charName)
                                         .replace(/{{age}}/g, userInfo.age);
        }

        if (sysPromptText) {
            apiMessages.push({ role: "system", content: sysPromptText });
        }
    }


    history.forEach(msg => {
        let messageContent = msg.content;
        
        try {
            const parsed = JSON.parse(msg.content);
            if (parsed.type === 'generated_image') {
                messageContent = t.chatImageGenerated;
            }
        } catch (e) {
            if (msg.content.startsWith('[Generated Image]')) {
                messageContent = t.chatImageGenerated;
            }
        }
        
        apiMessages.push({ role: msg.role, content: messageContent });
    });

    const apiKey = apiKeyInput ? apiKeyInput.value.trim() : "";
    
    const messagesContainer = document.getElementById('messages-container');
    const locale = currentLang === 'tr' ? 'tr-TR' : 'en-US';
    const timeStr = new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });

    const assistantBubble = document.createElement('div');
    assistantBubble.className = 'message-bubble assistant';
    assistantBubble.innerHTML = `
        <div class="message-content"><span class="typing-indicator">...</span></div>
        <div class="message-time">${timeStr}</div>
    `;
    messagesContainer.appendChild(assistantBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const contentDiv = assistantBubble.querySelector('.message-content');
    let fullResponse = "";
    let isFirstChunk = true;
    let storyFinished = false;

    try {
        const response = await fetch('https://create.thena.workers.dev/characterChat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey
            },
            body: JSON.stringify({
                messages: apiMessages,
                scene: currentCharacter.scene,
                model: (userInfo && userInfo.model) ? userInfo.model : "fast"
            })
        });

        if (!response.ok) {
            contentDiv.innerHTML = `<span style="color:#ff4444;">Error: ${response.statusText}</span>`;
            fullResponse = "Error: " + response.statusText;
        } else {
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop(); 

                for (const line of lines) {
                    if (line.trim().startsWith('data:')) {
                        const jsonStr = line.replace('data: ', '').trim();
                        if (jsonStr === '[DONE]') break;
                        if (jsonStr === '[FINISH]') {
                            storyFinished = true;
                            break;
                        }

                        try {
                            const data = JSON.parse(jsonStr);
                            if (data.content) {
                                if (isFirstChunk) {
                                    contentDiv.innerHTML = "";
                                    isFirstChunk = false;
                                }
                                fullResponse += data.content;
                                
                                contentDiv.innerHTML = parseMarkdown(fullResponse); 
                                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                            }
                        } catch (e) {
                            console.warn("JSON parse hatası (bu satır atlandı):", jsonStr, e);
                        }
                    }
                }
            }
        }

    } catch (error) {
        console.error("Chat API Error:", error);
        contentDiv.innerHTML = `<span style="color:#ff4444;">Connection Error</span>`;
        fullResponse = "Connection Error";
    }

    if (fullResponse) {
        if (fullResponse.trimEnd().endsWith('[FINISH]')) {
            storyFinished = true;
            fullResponse = fullResponse.replace(/\[FINISH\]\s*$/, '').trimEnd();
            contentDiv.innerHTML = parseMarkdown(fullResponse);
        }

        await chatDbHelper.addMessage(currentConversationId, 'assistant', fullResponse);
        await updateConversationCost(currentConversationId, fullResponse, pricePerToken);
        await chatDbHelper.updateConversation(currentConversationId, {
            lastMessage: fullResponse,
            lastMessageTime: new Date().toISOString()
        });
        await loadConversations(currentCharacter.id);

        if (storyFinished) {
            await chatDbHelper.updateConversation(currentConversationId, { isFinished: true });
            showStoryFinishedState();
        }
    }
}

async function showCharacterDetails(character) {
    const modal = document.getElementById('character-details-modal');
    const img = document.getElementById('detail-char-img');
    const name = document.getElementById('detail-char-name');
    const contentEl = document.getElementById('detail-char-content');
    const emptyEl = document.getElementById('detail-char-empty');
    const categories = document.getElementById('detail-char-categories');
    const imgGenBadge = document.getElementById('detail-img-gen-badge');
    const featuresContainer = document.getElementById('detail-char-features');
    const tabsContainer = document.getElementById('detail-char-tabs');

    const toggleThoughts = document.getElementById('toggle-thoughts');
    if (toggleThoughts && character) {
        try {
            const settings = await chatDbHelper.getCharacterSettings(character.id);
            toggleThoughts.checked = settings && settings.showThoughts !== undefined ? settings.showThoughts : true;
        } catch (e) {
            console.warn('Failed to load settings for modal', e);
            toggleThoughts.checked = true;
        }
    }

    if (!modal || !character) return;
    
    modal.dataset.characterId = character.id;

    modal.dataset.charData = JSON.stringify({
        scene: character.scene,
        action: character.action,
        systemPrompt: character.systemPrompt
    });

    if (img) img.src = character.image || ''; 
    
    if (name) name.textContent = character.name;
    
    if (imgGenBadge) {
        imgGenBadge.style.display = character.supportImageGeneration ? 'block' : 'none';
    }

    if (categories) {
        categories.innerHTML = '';
        if (character.subCategories && Array.isArray(character.subCategories)) {
            character.subCategories.forEach(cat => {
                const tag = document.createElement('span');
                tag.style.cssText = `
                    background: rgba(var(--primary-rgb), 0.15);
                    color: var(--primary);
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                    border: 1px solid rgba(var(--primary-rgb), 0.3);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                `;
                tag.textContent = cat;
                categories.appendChild(tag);
            });
        }
    }

    function updateTabContent(tabName) {
        const charData = JSON.parse(modal.dataset.charData || '{}');
        let content = '';

        if (tabName === 'scene') {
            if (charData.scene) {
                content = (currentLang === 'tr' && charData.scene.tr) 
                    ? charData.scene.tr 
                    : (charData.scene.en || '');
            }
        } else if (tabName === 'action') {
            if (charData.action) {
                content = (currentLang === 'tr' && charData.action.tr) 
                    ? charData.action.tr 
                    : (charData.action.en || '');
            }
        } else if (tabName === 'system') {
            if (charData.systemPrompt) {
                content = (currentLang === 'tr' && charData.systemPrompt.tr) 
                    ? charData.systemPrompt.tr 
                    : (charData.systemPrompt.en || '');
            }
        }

        if (contentEl && emptyEl) {
            if (content && content.trim()) {
                contentEl.textContent = content;
                contentEl.style.display = 'block';
                emptyEl.style.display = 'none';
            } else {
                contentEl.style.display = 'none';
                emptyEl.style.display = 'block';
                emptyEl.textContent = currentLang === 'tr' ? 'Veri bulunamadı' : 'No data available';
            }
        }
    }

    if (tabsContainer) {
        const tabBtns = tabsContainer.querySelectorAll('.char-tab-btn');
        const infoBox = document.getElementById('detail-char-info-box');
        
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === 'action') btn.classList.add('active');
            
            btn.onclick = () => {
                if (btn.classList.contains('active')) return;
                
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                if (infoBox) {
                    const startHeight = infoBox.offsetHeight;
                    infoBox.style.height = startHeight + 'px';
                    
                    infoBox.classList.remove('tab-switching');
                    
                    updateTabContent(btn.dataset.tab);
                    
                    requestAnimationFrame(() => {
                        infoBox.style.height = 'auto';
                        const endHeight = infoBox.offsetHeight;
                        infoBox.style.height = startHeight + 'px';
                        
                        void infoBox.offsetWidth;
                        
                        infoBox.classList.add('tab-switching');
                        infoBox.style.height = endHeight + 'px';
                        
                        setTimeout(() => {
                            infoBox.style.height = '';
                            infoBox.classList.remove('tab-switching');
                        }, 350);
                    });
                } else {
                    updateTabContent(btn.dataset.tab);
                }
            };
        });
    }

    updateTabContent('action');

    if (featuresContainer) {
        featuresContainer.innerHTML = '';
        
        if (character.supportImageGeneration) {
            const imgGenFeature = document.createElement('div');
            imgGenFeature.style.cssText = `
                display: flex;
                align-items: center;
                gap: 6px;
                background: rgba(var(--primary-rgb), 0.1);
                border: 1px solid rgba(var(--primary-rgb), 0.3);
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 11px;
                color: rgb(var(--primary-rgb));
            `;
            imgGenFeature.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                    <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span>${currentLang === 'tr' ? 'Görsel Oluşturma' : 'Image Generation'}</span>
            `;
            featuresContainer.appendChild(imgGenFeature);
        }

        if (character.subCategories && character.subCategories.length > 0) {
            const catFeature = document.createElement('div');
            catFeature.style.cssText = `
                display: flex;
                align-items: center;
                gap: 6px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid #333;
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 11px;
                color: #888;
            `;
            catFeature.innerHTML = `
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                <span>${character.subCategories.length} ${currentLang === 'tr' ? 'Kategori' : 'Categories'}</span>
            `;
            featuresContainer.appendChild(catFeature);
        }
    }

    modal.classList.add('active');

    const closeBtn = document.getElementById('close-char-details');
    if (closeBtn) {
        closeBtn.onclick = () => modal.classList.remove('active');
    }
    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.remove('active');
    };
}

const userProfileBtn = document.getElementById('show-user-profile-btn');
const userProfileModal = document.getElementById('user-profile-modal');
const closeUserProfileBtn = document.getElementById('close-user-profile');

if (userProfileBtn) {
    userProfileBtn.addEventListener('click', async (e) => {
        e.stopPropagation();
        
        if (!currentConversationId) {
             const msg = (typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Lütfen önce listeden bir sohbet seçin veya yeni bir sohbet başlatın.' : 'Please select a chat from the list first.';
             if (typeof showNotification === 'function') {
                 showNotification(msg, 'info');
             }
             if (typeof playInformationSound === 'function') {
                playInformationSound();
             }
             return;
        }

        const conv = await chatDbHelper.getConversation(currentConversationId);
        
        const nameEl = document.getElementById('display-user-name');
        const charNameEl = document.getElementById('display-char-name');
        const ageEl = document.getElementById('display-user-age');
        const genderEl = document.getElementById('display-user-gender');
        const modelEl = document.getElementById('display-user-model');
        const totalCostEl = document.getElementById('display-total-cost');

        if (conv && conv.userInfo) {
            if (nameEl) nameEl.textContent = conv.userInfo.name || '-';
            if (charNameEl) charNameEl.textContent = conv.userInfo.charName || '-';
            if (ageEl) ageEl.textContent = conv.userInfo.age || '-';
            if (genderEl) genderEl.textContent = conv.userInfo.gender || '-';
            
            if (modelEl) {
                const modelKey = conv.userInfo.model || 'fast';
                const t = translations[currentLang] || translations['en'];
                let displayModel = modelKey;
                if (modelKey === 'fast') displayModel = t.modelFast || 'Fast';
                else if (modelKey === 'thinking') displayModel = t.modelThinking || 'Thinking';
                modelEl.textContent = displayModel;
            }
            
            if (totalCostEl) {
                const costUSD = conv.totalCost || 0;
                
                if (currentLang === 'tr') {
                    let rate = 43.6;
                    if (currentCharacter && currentCharacter.tokenPrice && currentCharacter.tokenPrice.tr > 0 && currentCharacter.tokenPrice.en > 0) {
                        rate = currentCharacter.tokenPrice.tr / currentCharacter.tokenPrice.en;
                    }
                    const costTL = costUSD * rate;
                    totalCostEl.textContent = '₺' + costTL.toFixed(5);
                } else {
                    totalCostEl.textContent = '$' + costUSD.toFixed(7);
                }
            }
            
            if (userProfileModal) userProfileModal.classList.add('active');
        } else {
             const msg = (typeof currentLang !== 'undefined' && currentLang === 'tr') ? 'Bu sohbette kullanıcı bilgisi bulunamadı.' : 'No user info found in this chat.';
             if (typeof showNotification === 'function') {
                 showNotification(msg, 'info');
             }
        }
    });
}

if (closeUserProfileBtn && userProfileModal) {
    closeUserProfileBtn.addEventListener('click', () => {
        userProfileModal.classList.remove('active');
    });
}

if (userProfileModal) {
    userProfileModal.addEventListener('click', (e) => {
        if (e.target === userProfileModal) {
            userProfileModal.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const chatDataBtn = document.getElementById('chat-data-btn');
    const chatDataModal = document.getElementById('chat-data-modal');
    const btnChatDataClose = document.getElementById('btn-chat-data-close');
    const btnChatDataDownload = document.getElementById('btn-chat-data-download');
    const listContainer = document.getElementById('chat-data-list-container');

    if (listContainer) {
        listContainer.addEventListener('click', (e) => {
            const btn = e.target.closest('.logs-toggle-btn');
            if (!btn) return;
            
            const wrapper = btn.closest('.logs-wrapper');
            const content = wrapper.querySelector('.logs-content');
            const arrow = btn.querySelector('.logs-arrow');
            
            if (content.style.maxHeight === '0px' || !content.style.maxHeight) {
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                if(arrow) arrow.style.transform = 'rotate(90deg)';
            } else {
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                if(arrow) arrow.style.transform = 'rotate(0deg)';
            }
        });
    }

    if (chatDataBtn) {
        chatDataBtn.addEventListener('click', async () => {
            if (!chatDataModal) return;

            const t = translations[currentLang] || translations['en'];
            const titleEl = document.getElementById('chat-data-title');
            if (titleEl) titleEl.textContent = t.chatDataTitle;
            const closeBtn = document.getElementById('btn-chat-data-close');
            if (closeBtn) closeBtn.textContent = t.chatDataClose;
            const downloadBtn = document.getElementById('btn-chat-data-download');
            if (downloadBtn) downloadBtn.textContent = t.chatDataDownload;
            
            const listContainer = document.getElementById('chat-data-list-container');
            listContainer.innerHTML = `<div style="text-align:center; padding:20px; color:#888;">${t.chatLoading || 'Loading...'}</div>`;
            
            chatDataModal.classList.add('active');

            try {
                const allConvs = await chatDbHelper.getAllConversations();
                const allMsgs = await chatDbHelper.getAllMessages();

                let totalMessages = allMsgs.length;
                let totalCost = 0;
                let totalConvs = allConvs.length;

                allConvs.forEach(c => {
                    if (c.totalCost) totalCost += c.totalCost;
                });

                const statsContainer = document.getElementById('chat-data-stats-container');
                if (statsContainer) {
                    const currencySymbol = currentLang === 'tr' ? '₺' : '$';
                    const displayCost = currentLang === 'tr' ? (totalCost * 34) : totalCost;

                    statsContainer.innerHTML = `
                        <div class="data-stat-card">
                            <div class="data-stat-value">${totalConvs}</div>
                            <div class="data-stat-label">${t.chatDataTotalConvos}</div>
                        </div>
                        <div class="data-stat-card">
                            <div class="data-stat-value">${totalMessages}</div>
                            <div class="data-stat-label">${t.chatDataTotalMessages}</div>
                        </div>
                        <div class="data-stat-card">
                            <div class="data-stat-value" style="color: var(--primary);">${currencySymbol}${displayCost.toFixed(6)}</div>
                            <div class="data-stat-label">${t.chatDataTotalCost} (${currentLang === 'tr' ? 'TRY' : 'USD'})</div>
                        </div>
                    `;
                }

                listContainer.innerHTML = '';
                
                allConvs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                allConvs.forEach(conv => {
                    const convMsgs = allMsgs.filter(m => m.conversationId === conv.id).sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
                    const item = document.createElement('div');
                    item.className = 'data-item';

                    const createdDate = new Date(conv.createdAt).toLocaleString(currentLang === 'tr' ? 'tr-TR' : 'en-US');
                    const lastMsgDate = conv.lastMessageTime ? new Date(conv.lastMessageTime).toLocaleString(currentLang === 'tr' ? 'tr-TR' : 'en-US') : '-';
                    
                    let userInfoHtml = '';
                    if (conv.userInfo) {
                        userInfoHtml = `
                            <div class="data-content-row"><span class="data-label">User:</span> <span class="data-value">${conv.userInfo.name || '-'} (${conv.userInfo.age || '-'}, ${conv.userInfo.gender || '-'})</span></div>
                            <div class="data-content-row"><span class="data-label">${t.profileCharName}:</span> <span class="data-value">${conv.userInfo.charName || '-'}</span></div>
                            <div class="data-content-row"><span class="data-label">Model:</span> <span class="data-value">${conv.userInfo.model || '-'}</span></div>
                        `;
                    }

                    const detailObj = {
                        ...conv,
                        messages: convMsgs
                    };
                    const detailJson = JSON.stringify(detailObj, null, 2);

                    item.innerHTML = `
                        <div class="data-header">
                            <span>${conv.characterName || t.unknownCharacter} ${t.characterNM}</span>
                            <span style="font-size:11px; opacity:0.7;">ID: ${conv.id}</span>
                        </div>
                        <div class="data-content-row"><span class="data-label">Created:</span> <span class="data-value">${createdDate}</span></div>
                        <div class="data-content-row"><span class="data-label">Last Msg:</span> <span class="data-value">${lastMsgDate}</span></div>
                        <div class="data-content-row"><span class="data-label">Messages:</span> <span class="data-value">${convMsgs.length}</span></div>
                        <div class="data-content-row"><span class="data-label">Cost:</span> <span class="data-value">$${(conv.totalCost || 0).toFixed(7)}</span></div>
                        ${userInfoHtml}
                        
                        <div class="logs-wrapper" style="margin-top:10px; border-top:1px solid #222; padding-top:5px;">
                            <button class="logs-toggle-btn" style="background:none; border:none; cursor:pointer; color:var(--primary); font-size:11px; outline:none; padding:5px 0; display:flex; align-items:center; gap:5px;">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" class="logs-arrow" style="transition: transform 0.3s ease; stroke: currentColor;">
                                    <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                ${t.chatDataView || 'View Logs'}
                            </button>
                            <div class="logs-content" style="max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.3s ease-out, opacity 0.3s ease-out;">
                                <pre style="white-space: pre-wrap; word-wrap: break-word; font-size: 11px; color: #888; background: #050505; padding: 10px; margin-top: 5px; border-radius: 4px; overflow-x:auto;">${escapeHtml(detailJson)}</pre>
                            </div>
                        </div>
                    `;
                    listContainer.appendChild(item);
                });

                if (allConvs.length === 0) {
                     listContainer.innerHTML = `<div style="text-align:center; padding:20px; color:#666;">${t.chatNoConv || 'No conversations found.'}</div>`;
                }



            } catch (e) {
                console.error('Error loading chat data:', e);
                listContainer.innerHTML = `<div style="text-align:center; padding:20px; color:#f44;">Error loading data.</div>`;
            }
        });
    }

    if (btnChatDataClose) {
        btnChatDataClose.addEventListener('click', () => {
            chatDataModal.classList.remove('active');
        });
    }

    if (chatDataModal) {
        chatDataModal.addEventListener('click', (e) => {
            if (e.target === chatDataModal) {
                chatDataModal.classList.remove('active');
            }
        });
    }

    if (btnChatDataDownload) {
        btnChatDataDownload.addEventListener('click', async () => {
            if (typeof playSuccessSound === "function") playSuccessSound();
            try {
                const allConvs = await chatDbHelper.getAllConversations();
                const allMsgs = await chatDbHelper.getAllMessages();
                
                const exportData = {
                    exportedAt: new Date().toISOString(),
                    conversations: allConvs,
                    messages: allMsgs
                };
                
                const jsonStr = JSON.stringify(exportData, null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = `thena_chat_data_${Date.now()}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showNotification((currentLang === 'tr') ? 'Veriler indirildi.' : 'Data downloaded.', 'success');
            } catch (e) {
                console.error('Download error:', e);
                showNotification('Download failed', 'error');
            }
        });
    }
});

function escapeHtml(text) {
    if (!text) return text;
    return text.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/"/g, "&quot;")
               .replace(/'/g, "&#039;");
}

function renderCharacterDetailsInChat(container, character) {
    if (!container || !character) return;

    const t = translations[currentLang] || translations['en'];

    const getTranslatedContent = (obj) => {
        if (!obj) return '';
        return (currentLang === 'tr' && obj.tr) ? obj.tr : (obj.en || '');
    };

    const action = getTranslatedContent(character.action);

    let initialContent = action || (currentLang === 'tr' ? 'Sahne bilgisi bulunamadı.' : 'No scene description available.');

    container.innerHTML = `
        <div class="chat-empty-details">
            <div class="chat-empty-avatar-container">
                <img src="${character.image}" class="chat-empty-avatar" onload="adjustAvatarAspectRatio(this)">
                ${character.supportImageGeneration ? `
                <div style="position: absolute; bottom: 5px; right: 5px; background: linear-gradient(135deg, #00ff88 0%, #00ccff 100%); padding: 4px 8px; border-radius: 12px; font-size: 10px; font-weight: 700; color: #000; box-shadow: 0 2px 10px rgba(0, 255, 136, 0.4); display: flex; align-items: center; gap: 2px;">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    IMG
                </div>` : ''}
            </div>
            
            <h2 class="chat-empty-name">${character.name}</h2>
            
             <div class="chat-empty-content-box custom-scrollbar">
                <p id="chat-detail-text" class="chat-empty-text">${initialContent}</p>
            </div>
            
             <div class="chat-empty-tags">
                ${character.subCategories ? character.subCategories.map(cat => `
                    <div class="chat-empty-tag">
                        <span>${cat}</span>
                    </div>
                `).join('') : ''}
            </div>

        </div>
    `;
}


function applyThoughtVisibility(shouldShow) {
    const containers = document.querySelectorAll('.messages-container');
    containers.forEach(container => {
        if (shouldShow) {
            container.classList.remove('hide-thoughts');
        } else {
            container.classList.add('hide-thoughts');
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const toggleThoughts = document.getElementById('toggle-thoughts');
    if (toggleThoughts) {
        toggleThoughts.addEventListener('change', async (e) => {
            const checked = e.target.checked;
            const modal = document.getElementById('character-details-modal');
            const characterId = modal ? modal.dataset.characterId : null;
            
            if (characterId) {
                try {
                    await chatDbHelper.saveCharacterSettings(characterId, { showThoughts: checked });
                    if (currentCharacter && currentCharacter.id == characterId) {
                        applyThoughtVisibility(checked);
                    }
                } catch (err) {
                    console.error('Failed to save character settings:', err);
                }
            } else if (currentCharacter) {
                try {
                    await chatDbHelper.saveCharacterSettings(currentCharacter.id, { showThoughts: checked });
                     applyThoughtVisibility(checked);
                } catch (err) {
                    console.error('Failed to save character settings (fallback):', err);
                }
            }
            
            if (typeof playButtonSound === "function") playButtonSound();
        });
    }
});

function adjustAvatarAspectRatio(img) {
    if (!img || !img.naturalWidth || !img.naturalHeight) return;
    
    const ratio = img.naturalWidth / img.naturalHeight;
    const isSquare = ratio > 0.85 && ratio < 1.15; 
    
    if (!isSquare) {
        img.style.height = 'auto';
        img.style.borderRadius = '12px';
        img.style.objectFit = 'contain';
        img.style.boxShadow = '0 5px 25px rgba(0,0,0,0.3)';
        
        if (ratio < 1) {
            img.style.width = '140px'; 
        } else {
            img.style.width = '220px';
        }
    } else {
    }
}
