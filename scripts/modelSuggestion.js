let modelSuggestionTimer = null;
let modelSuggestionAbort = null;
let isModelSuggestionEnabled = localStorage.getItem('thena-model-suggestion') === 'true';

function highlightSuggestedModels(modelNamesStr) {
    if (!modelNamesStr) return;
    
    const suggestedNames = modelNamesStr.split(',').map(name => name.trim().toLowerCase());
    
    const modelCards = document.querySelectorAll('.model-card');
    let foundAny = false;
    
    modelCards.forEach(card => {
        const nameEl = card.querySelector('.model-name');
        if (nameEl) {
            const cardName = nameEl.textContent.trim().toLowerCase();
            if (suggestedNames.some(sName => cardName.includes(sName) || sName.includes(cardName))) {
                card.classList.add('model-suggest-blink');
                foundAny = true;
            } else {
                card.classList.remove('model-suggest-blink');
            }
        }
    });
}

function stopModelSuggestionHighlight() {
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach(card => {
        card.classList.remove('model-suggest-blink');
    });
}

async function fetchModelSuggestion(promptText) {
    if (!isModelSuggestionEnabled || !promptText || promptText.trim().length < 10) {
        stopModelSuggestionHighlight();
        return;
    }

    if (modelSuggestionAbort) {
        modelSuggestionAbort.abort();
    }
    modelSuggestionAbort = new AbortController();

    try {
        const resp = await fetch('https://create.thena.workers.dev/suggestModel', {
            method: 'POST',
            body: JSON.stringify({ prompt: promptText }),
            headers: {
                'Content-Type': 'application/json'
            },
            signal: modelSuggestionAbort.signal
        });
        
        if (resp.ok) {
            const data = await resp.text();
            if (!document.getElementById("btn-show-all-models").classList.contains('active')) {
                document.getElementById("btn-show-all-models").click()
                // wait until models are loaded
                setTimeout(() => {
                    highlightSuggestedModels(data);
                }, 1000);
            } else {
                document.querySelector("#txt-filter-chip-all").click()
                setTimeout(() => {
                    highlightSuggestedModels(data);
                }, 500);
            }
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Model suggestion error:', err);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('model-suggestion-toggle');
    if (toggle) {
        toggle.checked = isModelSuggestionEnabled;
        toggle.addEventListener('change', (e) => {
            isModelSuggestionEnabled = e.target.checked;
            localStorage.setItem('thena-model-suggestion', isModelSuggestionEnabled);
            
            if (!isModelSuggestionEnabled) {
                stopModelSuggestionHighlight();
            } else {
                const promptInput = document.getElementById('prompt');
                if (promptInput && promptInput.value.length >= 10) {
                    fetchModelSuggestion(promptInput.value);
                }
            }
            
            if (typeof showToast === 'function') {
                const t = translations[currentLang] || translations['en'];
                showToast(isModelSuggestionEnabled ? (currentLang === 'tr' ? "Model Önerisi Aktif Edildi" : "Model Suggestion Enabled") : (currentLang === 'tr' ? "Model Önerisi Deaktif Edildi" : "Model Suggestion Disabled"));
            }
        });
    }
});
