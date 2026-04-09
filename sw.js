const CACHE_NAME = 'marina-final-v4';

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

  // 🔥 NO tocar streaming NI API (CLAVE)
  if (
    url.includes('/listen/') ||
    url.includes('/api/') ||
    url.includes('nowplaying')
  ) {
    return;
  }

  // Solo cache básico
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );

});