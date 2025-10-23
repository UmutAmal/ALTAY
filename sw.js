const CACHE_NAME = 'lingoplay-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/game.js',
    '/js/test.js',
    '/js/translations.js',
    '/js/offline.js',
    '/data/lessons.json',
    '/images/mascot_happy.png',
    '/images/mascot_thinking.png',
    '/images/background_pattern.png'
];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache).catch(err => {
                console.log('Cache addAll error:', err);
                // Bazı dosyaları cache'lemede hata olsa da devam et
                return Promise.resolve();
            });
        })
    );
    self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', event => {
    // GET istekleri için cache-first stratejisi
    if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    return response;
                }

                return fetch(event.request).then(response => {
                    // Başarılı yanıtları cache'le
                    if (!response || response.status !== 200 || response.type === 'error') {
                        return response;
                    }

                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                    return response;
                }).catch(() => {
                    // Offline ise cache'den döndür
                    return caches.match(event.request);
                });
            })
        );
    }
});

