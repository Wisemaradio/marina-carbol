self.addEventListener('install', function(event) {

    event.waitUntil(
        caches.open('radio-cache-v2').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/logo.jpg',
                '/banner.jpg'
            ]);
        })
    );

    self.skipWaiting();
});

self.addEventListener('activate', function(event) {

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== 'radio-cache-v2') {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

self.addEventListener('fetch', function(event) {

    if (event.request.url.includes('/listen/')) return;

    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});