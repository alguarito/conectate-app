const CACHE_NAME = 'conectate-cache-v6-master'; // Force update
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './chat-tesla.js',
  './IMAGENES/ID_CONECTATE.png'
];

// Timestamp para forzar actualización byte-a-byte: 2026-03-27 06:12

self.addEventListener('install', event => {
  self.skipWaiting();
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
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  // Estrategia: Stale-while-revalidate para archivos del sitio, 
  // Cache-first para imágenes y fuentes externas.
  const isStaticAsset = event.request.url.match(/\.(png|jpg|jpeg|gif|svg|woff2|ttf|eot)$/) || 
                       event.request.url.includes('fonts.gstatic.com') ||
                       event.request.url.includes('unpkg.com');

  if (isStaticAsset) {
    // Cache-first
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        return cachedResponse || fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  } else {
    // Stale-while-revalidate
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
        return cachedResponse || fetchPromise;
      })
    );
  }
});
