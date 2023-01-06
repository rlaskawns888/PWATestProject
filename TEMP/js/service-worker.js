// const CACHE_NAME = 'sw-cache-example2';
// const toCache = [
//   '/PWATestProject/TEMP/',
//   '/PWATestProject/TEMP/index.html',
//   '/PWATestProject/TEMP/js/status.js',
// ];

// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(function(cache) {
//         return cache.addAll(toCache)
//       })
//       .then(self.skipWaiting())
//   )
// });

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request)
//       .catch(() => {
//         return caches.open(CACHE_NAME)
//           .then((cache) => {
//             return cache.match(event.request)
//           })
//       })
//   )
// })

// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys()
//       .then((keyList) => {
//         return Promise.all(keyList.map((key) => {
//           if (key !== CACHE_NAME) {
//             console.log('[ServiceWorker] Removing old cache', key)
//             return caches.delete(key)
//           }
//         }))
//       })
//       .then(() => self.clients.claim())
//   )
// })

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      '/PWATestProject/TEMP/',
      '/PWATestProject/TEMP/index.html',
      '/PWATestProject/TEMP/js/status.js',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
  