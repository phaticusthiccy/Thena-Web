document.addEventListener('DOMContentLoaded', () => {
    function setupCustomSelect(customId, selectId, valueId, dropdownId) {
        const customEl = document.getElementById(customId);
        const selectEl = document.getElementById(selectId);
        const valueEl = document.getElementById(valueId);
        const dropdownEl = document.getElementById(dropdownId);
        const trigger = customEl.querySelector('.mg-select-trigger');

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const wasOpen = customEl.classList.contains('open');
            document.querySelectorAll('.mg-custom-select').forEach(el => el.classList.remove('open'));
            if (!wasOpen) customEl.classList.add('open');
        });

        dropdownEl.addEventListener('click', (e) => {
            const opt = e.target.closest('.mg-select-option');
            if (!opt) return;
            e.stopPropagation();

            dropdownEl.querySelectorAll('.mg-select-option').forEach(el => el.classList.remove('active'));
            opt.classList.add('active');
            valueEl.textContent = opt.textContent;

            selectEl.value = opt.dataset.value;
            selectEl.dispatchEvent(new Event('change'));

            customEl.classList.remove('open');
        });
    }

    setupCustomSelect('mg-sort-custom', 'mg-sort-select', 'mg-sort-value', 'mg-sort-dropdown');
    setupCustomSelect('mg-cat-custom', 'mg-cat-select', 'mg-cat-value', 'mg-cat-dropdown');

    document.addEventListener('click', () => {
        document.querySelectorAll('.mg-custom-select').forEach(el => el.classList.remove('open'));
    });

    const catSelect = document.getElementById('mg-cat-select');
    const catDropdown = document.getElementById('mg-cat-dropdown');
    const catValue = document.getElementById('mg-cat-value');

    const observer = new MutationObserver(() => {
        catDropdown.innerHTML = '';
        Array.from(catSelect.options).forEach((opt, idx) => {
            const div = document.createElement('div');
            div.className = 'mg-select-option' + (opt.selected ? ' active' : '');
            div.dataset.value = opt.value;
            if (opt.id && opt.id !== 'mg-opt-all-cats') div.id = opt.id;
            if (opt.value === 'all') div.id = 'mg-opt-all-cats';
            div.textContent = opt.textContent;
            catDropdown.appendChild(div);
        });
        const selectedOpt = catSelect.options[catSelect.selectedIndex];
        if (selectedOpt) catValue.textContent = selectedOpt.textContent;
    });

    observer.observe(catSelect, { childList: true, subtree: true });

    setTimeout(() => {
        const originalUpdate = window.updateModelGalleryLanguage;
        if (originalUpdate) {
            window.updateModelGalleryLanguage = function () {
                originalUpdate();
                setTimeout(() => {
                    const activeSort = document.querySelector('#mg-sort-dropdown .mg-select-option.active');
                    if (activeSort) document.getElementById('mg-sort-value').textContent = activeSort.textContent;

                    const activeCat = document.querySelector('#mg-cat-dropdown .mg-select-option.active');
                    if (activeCat) document.getElementById('mg-cat-value').textContent = activeCat.textContent;
                }, 50);
            };
        }
    }, 1000);
});