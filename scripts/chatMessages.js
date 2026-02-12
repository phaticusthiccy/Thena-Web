function parseMarkdown(text) {
    if (!text) return '';
    
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    
    html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre class="md-code-block"><code>${code.trim()}</code></pre>`;
    });
    
    html = html.replace(/`([^`]+)`/g, '<code class="md-inline-code">$1</code>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
    html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
    html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>');
    html = html.replace(/^### (.+)$/gm, '<h4 class="md-h4">$1</h4>');
    html = html.replace(/^## (.+)$/gm, '<h3 class="md-h3">$1</h3>');
    html = html.replace(/^# (.+)$/gm, '<h2 class="md-h2">$1</h2>');
    html = html.replace(/^[\-\*] (.+)$/gm, '<li class="md-li">$1</li>');
    html = html.replace(/(<li class="md-li">.*<\/li>\n?)+/g, '<ul class="md-ul">$&</ul>');
    html = html.replace(/^\d+\. (.+)$/gm, '<li class="md-oli">$1</li>');
    html = html.replace(/(<li class="md-oli">.*<\/li>\n?)+/g, '<ol class="md-ol">$&</ol>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="md-link">$1</a>');
    html = html.replace(/^&gt; (.+)$/gm, '<blockquote class="md-quote">$1</blockquote>');
    html = html.replace(/^---$/gm, '<hr class="md-hr">');
    html = html.replace(/\n/g, '<br>');
    
    return html;
}

function renderMessages(messages) {
    const container = document.getElementById('messages-container');
    if (!container) return;

    const t = translations[currentLang] || translations['en'];
    const locale = currentLang === 'tr' ? 'tr-TR' : 'en-US';

    if (messages.length === 0) {
        container.innerHTML = `<div class="no-messages">${t.chatNoMessages}</div>`;
        return;
    }

    container.innerHTML = messages.map(msg => {
        let timeStr = '--:--';
        try {
            timeStr = new Date(msg.timestamp).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
            console.error('Date parsing error:', e);
        }
        
        let messageContent = '';
        let content = '';
        if (msg.content === null || msg.content === undefined) content = '';
        else if (typeof msg.content === 'object') content = JSON.stringify(msg.content);
        else content = String(msg.content);
        
        try {
            let parsed = null;
            let isJson = false;
            try {
                parsed = JSON.parse(content);
                isJson = true;
            } catch (ignore) {}

            if (isJson && parsed && typeof parsed === 'object' && parsed.type === 'generated_image' && parsed.image) {
                const uniqueId = 'gen-img-' + (msg.id || Date.now()) + '-' + Date.now();
                const downloadTitle = (currentLang === 'tr') ? 'Resmi İndir' : 'Download Image';
                messageContent = `
                    <div class="generated-image-wrapper">
                        <img src="data:image/png;base64,${parsed.image}" alt="Generated Scene" style="max-width: 100%; border-radius: 8px; cursor: pointer;" onclick="window.open(this.src, '_blank')">
                        <button class="img-download-btn" data-img-id="${uniqueId}" onclick="downloadGeneratedImage(this, 'thena_${msg.id || Date.now()}_${Date.now()}.png')" title="${downloadTitle}">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                        </button>
                    </div>
                    <p style="margin-top: 8px; font-size: 12px; color: #888;">${parsed.caption || 'Imagine With Thena'}</p>
                `;
            } else if (content.startsWith('[Generated Image]')) {
                 const caption = content.replace('[Generated Image]', '').trim();
                 messageContent = `
                    <div style="display: flex; flex-direction: column; align-items: center; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; border: 1px dashed #444;">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#666" stroke-width="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        <p style="margin-top: 8px; font-size: 12px; color: #888;">${caption || 'Imagine With Thena'}</p>
                        <p style="margin-top: 4px; font-size: 10px; color: #555;">${currentLang === 'tr' ? '(Eski format - görsel kaybolmuş)' : '(Legacy format - image lost)'}</p>
                    </div>
                `;
            } else {
                try {
                    messageContent = parseMarkdown(content);
                } catch (err) {
                    console.error('Markdown parsing error:', err);
                    messageContent = content.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
                }
            }
        } catch (e) {
            console.error('Message rendering critical error:', e);
            messageContent = '<span style="color:red;">Error rendering message</span>';
        }
        
        return `
            <div class="message-bubble ${msg.role}">
                <div class="message-content">${messageContent}</div>
                <div class="message-time">${timeStr}</div>
            </div>
        `;
    }).join('');

    container.scrollTop = container.scrollHeight;
}

function closeChatScreen() {
    if (isChatGeneratingImage) {
        if (typeof playErrorSound === 'function') playErrorSound();
        showNotification((currentLang === 'tr') ? 'Görsel oluşturma işlemi devam ederken sayfadan çıkamazsınız.' : 'You cannot exit while image generation is in progress.', 'warning');
        return;
    }
    const modal = document.getElementById('chat-screen-modal');
    const messagesContainer = document.getElementById('messages-container');
    const conversationsList = document.getElementById('conversations-list');
    const t = translations[currentLang] || translations['en'];

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }

    if (messagesContainer) {
        messagesContainer.innerHTML = `<div class="no-conv-selected">${t.chatNoSelected}</div>`;
    }
    if (conversationsList) {
        conversationsList.innerHTML = `<div class="conv-empty">${t.chatNoConv}</div>`;
    }

    currentCharacter = null;
    currentConversationId = null;
}