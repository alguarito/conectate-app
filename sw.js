const CACHE_NAME = 'conectate-cache-v2-2026'; // Versión actualizada
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './chat-tesla.js',
  './IMAGENES/LOGO 1.png',
  './IMAGENES/PERFIL.png'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Obligamos al nuevo SW a tomar el control inmediatamente
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando cache viejo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Forzamos el control del cliente
  );
});

// ESTRATEGIA: Network First (Red primero, luego caché)
// Esto asegura que si hay internet, el usuario SIEMPRE vea la última versión
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Guardamos una copia en el cache para uso offline
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // Si la red falla (offline), devolvemos el cache
        return caches.match(event.request);
      })
  );
});
