const CACHE_NAME = 'sw-cache-example2';
const toCache = [
  '/',
  '/PWATestProject/TEMP/index.html',
  '/PWATestProject/TEMP/js/status.js',
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(toCache)
      })
      .then(self.skipWaiting())
  )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.open(CACHE_NAME)
          .then((cache) => {
            return cache.match(event.request)
          })
      })
  )
})

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
          }
        }))
      })
      .then(() => self.clients.claim())
  )
})

// self.addEventListener('install', (e) => {
//     e.waitUntil(
//       caches.open('fox-store').then((cache) => cache.addAll([
//         // '/pwa-examples/a2hs/',
//         // '/pwa-examples/a2hs/index.html',
//         // '/pwa-examples/a2hs/index.js',
//         // '/pwa-examples/a2hs/style.css',
//         // '/pwa-examples/a2hs/images/fox1.jpg',
//         // '/pwa-examples/a2hs/images/fox2.jpg',
//         // '/pwa-examples/a2hs/images/fox3.jpg',
//         // '/pwa-examples/a2hs/images/fox4.jpg',
//         // 'PWATestProject/views/index.html',
//         // 'PWATestProject/js/public/status.js'
//             '/',
//             '/index.html',
//             '/public/js/status.js',
//       ])),
//     );
//   });
  
//   self.addEventListener('fetch', (e) => {
//     console.log(e.request.url);
//     e.respondWith(
//       caches.match(e.request).then((response) => response || fetch(e.request)),
//     );
//   });
  