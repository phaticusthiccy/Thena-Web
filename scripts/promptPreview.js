let promptPreviewTimer = null;
let promptPreviewAbort = null;

function setPreviewCardsLoading() {
    const t = translations[currentLang] || translations['en'];
    const box = document.getElementById('prompt-preview-box');
    if (box) box.style.display = '';

    for (let i = 0; i < 3; i++) {
        const card = document.getElementById('preview-card-' + i);
        if (card) {
            card.classList.add('loading');
            card.style.display = '';
            const img = card.querySelector('img');
            if (img) { img.classList.remove('visible'); img.src = ''; }
            const nr = card.querySelector('.preview-no-result');
            if (nr) { nr.style.display = 'none'; }
            
            const status = card.querySelector('.preview-loading-status');
            if (status) {
                status.style.display = '';
                status.textContent = t.promptPreviewLoading || 'Searching...';
            }

            const countdown = card.querySelector('.preview-countdown');
            if (countdown) countdown.style.display = 'none';
            
            const pt = card.querySelector('.preview-card-prompt');
            if (pt) pt.textContent = '';
            card.onclick = null;
            card.style.cursor = '';
        }
    }
}

function setPreviewCountdown(remaining) {
    const t = translations[currentLang] || translations['en'];
    const box = document.getElementById('prompt-preview-box');
    if (box) box.style.display = '';

    const text = (t.promptPreviewCountdown || "Enter {0} more characters").replace('{0}', remaining);

    for (let i = 0; i < 3; i++) {
        const card = document.getElementById('preview-card-' + i);
        if (card) {
            card.classList.remove('loading');
            card.style.display = '';
            const img = card.querySelector('img');
            if (img) { img.classList.remove('visible'); img.src = ''; }
            
            const nr = card.querySelector('.preview-no-result');
            if (nr) nr.style.display = 'none';
            
            const status = card.querySelector('.preview-loading-status');
            if (status) status.style.display = 'none';

            const countdown = card.querySelector('.preview-countdown');
            if (countdown) {
                countdown.style.display = '';
                countdown.textContent = text;
            }

            const pt = card.querySelector('.preview-card-prompt');
            if (pt) pt.textContent = '';
            card.onclick = null;
            card.style.cursor = '';
        }
    }
}

function renderPreviewResults(content) {
    const t = translations[currentLang] || translations['en'];
    const box = document.getElementById('prompt-preview-box');
    if (!box) return;

    if (!content || content.length === 0) {
        for (let i = 0; i < 3; i++) {
            const card = document.getElementById('preview-card-' + i);
            if (card) {
                card.classList.remove('loading');
                card.onclick = null;
                card.style.cursor = '';
                const img = card.querySelector('img');
                if (img) { img.classList.remove('visible'); img.src = ''; }
                
                const status = card.querySelector('.preview-loading-status');
                if (status) status.style.display = 'none';

                const countdown = card.querySelector('.preview-countdown');
                if (countdown) countdown.style.display = 'none';

                const nr = card.querySelector('.preview-no-result');
                if (nr) { nr.style.display = ''; nr.innerHTML = (t.promptPreviewNoResult || 'No preview available') + '<br><span style="font-size:11px;opacity:0.6;margin-top:4px;display:inline-block;">' + (t.promptPreviewTryEnglish || 'Please try in English') + '</span>'; }
            }
        }
        return;
    }

    for (let i = 0; i < 3; i++) {
        const card = document.getElementById('preview-card-' + i);
        if (!card) continue;
        card.classList.remove('loading');
        
        const status = card.querySelector('.preview-loading-status');
        if (status) status.style.display = 'none';

        const countdown = card.querySelector('.preview-countdown');
        if (countdown) countdown.style.display = 'none';

        if (i < content.length) {
            card.style.display = '';
            const img = card.querySelector('img');
            if (img) { img.src = content[i].image; img.classList.add('visible'); }
            const nr = card.querySelector('.preview-no-result');
            if (nr) nr.style.display = 'none';
            const pt = card.querySelector('.preview-card-prompt');
            if (pt) pt.textContent = content[i].prompt || '';
            card.style.cursor = 'pointer';
            card.onclick = ((promptText, cardElement) => () => {
                if (typeof playModelSelectSound === 'function') playModelSelectSound();
                cardElement.classList.add('selected');
                setTimeout(() => {
                    cardElement.classList.remove('selected');
                }, 2000);

                typeWriterEffect2(promptText, promptInput);
            })(content[i].prompt || '', card);
        } else {
            card.style.display = 'none';
        }
    }
}

async function fetchPromptPreview(promptText) {
    const box = document.getElementById('prompt-preview-box');
    if (!box) return;

    if (promptPreviewAbort) {
        promptPreviewAbort.abort();
    }
    promptPreviewAbort = new AbortController();

    box.style.display = '';
    setPreviewCardsLoading();

    try {
        const resp = await fetch(
            'https://create.thena.workers.dev/searchPrompt?prompt=' + encodeURIComponent(promptText),
            { signal: promptPreviewAbort.signal }
        );
        const data = await resp.json();
        if (data.status === 200) {
            renderPreviewResults(data.content);
        } else {
            renderPreviewResults([]);
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            renderPreviewResults([]);
        }
    }
}