self.addEventListener('install', function(event) {
console.log('Service Worker instalado');
});

self.addEventListener('activate', function(event) {
console.log('Service Worker activado');
});

self.addEventListener('fetch', function(event) {
// No interceptamos nada, solo permitimos que la app funcione
});
