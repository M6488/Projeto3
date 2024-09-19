const cacheName = 'v1';

const cacheAssets = [
  '/index.html',
  '/style.css',
  '/main.js',
  '/icons/icon.jpg',
];

self.addEventListener('install', (e) => {
  console.log('Service Worker: Instalado');

  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Service Worker: Cacheando arquivos');
        return cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});


self.addEventListener('activate', (e) => {
  console.log('Service Worker: Ativado');
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Limpando cache antigo');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Buscando');
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
