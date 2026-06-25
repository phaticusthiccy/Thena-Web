const CACHE_NAME = 'thena-app-v3';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './trailer.html',
    './manifest.json',
    './src/icon-192.png',
    './src/icon-512.png',
    './src/adv_settings_image_gen.webp',
    './src/apps.webp',
    './src/chat_end.webp',
    './src/chat_start.webp',
    './src/chatbot.webp',
    './src/gallery.webp',
    './src/gallery_stats.webp',
    './src/image_edit.webp',
    './src/image_gen.webp',
    './src/prompt_preview.webp',
    './src/settings.webp',
    './src/showcase.webp',
    './src/trailer.webp',
    './src/credit_help.gif',
    './css/style.css',
    './css/prompt-preview.css',
    './css/editor-search.css',
    './css/trailer.css',
    './css/model-gallery.css',
    './css/welcome.css',
    './scripts/script.js',
    './scripts/credits.js',
    './scripts/promptexpansion.js',
    './scripts/lang.js',
    './scripts/loadAllModels.js',
    './scripts/favorites-backups.js',
    './scripts/chatImageDownloader.js',
    './scripts/chatMessages.js',
    './scripts/aiChat.js',
    './.version',
    './LICENSE',
    './scripts/imageEditor.js',
    './scripts/promptPreview.js',
    './scripts/cpu.js',
    './scripts/trailer.js',
    './scripts/powerSaver.js',
    './scripts/modelGallery.js',
    './scripts/customSelect.js',
    './scripts/welcome.js',
    './scripts/updates.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(
                ASSETS_TO_CACHE.map((url) => {
                    return cache.add(url).catch((err) => {
                        console.error(`Failed to cache asset: ${url}`, err);
                    });
                })
            );
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('create.thena.workers.dev')) {
        return;
    }

    event.respondWith(
        fetch(event.request).then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
            });
            return response;
        }).catch(() => {
            return caches.match(event.request);
        })
    );
});