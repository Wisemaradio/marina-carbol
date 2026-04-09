const CACHE_NAME = 'marina-pwa-v3';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        if (k !== CACHE_NAME) return caches.delete(k);
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {

  const url = event.request.url;

  // ❌ no cachear streaming ni api
  if (url.includes('/listen/') || url.includes('/api/')) return;

  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));

});