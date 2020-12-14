if('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./serviceworker.js')
    .then(function() { console.log('Service Worker Registered') })
}

var CACHE_STATIC_NAME = 'static-v001'
var CACHE_DYNAMIC_NAME = 'dynamic-v002'

self.addEventListener('install', function (event) {
  self.skipWaiting()
  console.log('Installing Service Worker ...', event)
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function (cache) {
        console.log('Precaching App Shell')
        cache.addAll([
            '/login.html',
            '/login.css',
            '',
            '/256.png',
            '/barrel.jpg',
            '/offLine.html',
        ])
      })
  )
})

self.addEventListener('activate', function (event) {
  console.log('Activating Service Worker ....', event)
  event.waitUntil(
    caches.keys()
      .then(function (keyList) {
        return Promise.all(keyList.map(function (key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('Removing old cache.', key)
            return caches.delete(key)
          }
        }))
      })
  )
  return self.clients.claim()
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    // Try the network
    fetch(event.request)
      .then(function(res) {
        return caches.open(CACHE_DYNAMIC_NAME)
          .then(function(cache) {
            // Put in cache if succeeds
            cache.put(event.request.url, res.clone())
            return res;
          })
      })
      .catch(function(err) {
          // Fallback to cache
          return caches.match(event.request)
            .then(function(res){
              if (res === undefined) { 
                // get and return the offline page
                res = caches.match('/offLine.html')
              } 
              return res;
          })
      })
  )
})





///////////////////////////////
// const filesToCache = [
//   '/',
//   '/login.html',
//   '/login.css',
//   '',
//   '/256.png',
//   '/barrel.jpg',
//   '/offLine.html',
//   '../../pages/site/index.html'
// ]

// const staticCacheName = 'pages-cache-v1';

// self.addEventListener('install', event => {
//   console.log('Attempting to install service worker and cache static assets');
//   event.waitUntil(
//     caches.open(staticCacheName)
//     .then(cache => {
//       return cache.addAll(filesToCache);
//     })
//   );
// });

// self.addEventListener('activate', event => {
//   console.log('Activating new service worker...');

//   const cacheWhitelist = [staticCacheName];

//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cacheName => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', event => {
//   console.log('Fetch event for ', event.request.url);
//   // cookie_or_null = (document.cookie.match(/^(?:.*;)?\s*BudApp\s*=\s*([^;]+)(?:.*)?$/)||[,null])[1]
  
//   // if (document,ment.cookie.match(/^(?:.*;)?\s*BudApp\s*=\s*([^;]+)(?:.*)?$/)||[,null][1]) {
//   //   return caches.match('offLine.html')
//   // }

//   event.respondWith(
//     caches.match(event.request)
//     .then(response => {
//       if (response) {
//         console.log('Found ', event.request.url, ' in cache');
//         return response;
//       }
//       console.log('Network request for ', event.request.url);
//       return fetch(event.request)
//       .then(response => {
//         if (response.status === 404) {
//           return caches.match('offLine.html');
//         }
//         return caches.open(staticCacheName)
//         .then(cache => {
//           cache.put(event.request.url, response.clone());
//           return response;
//         });
//       });
//     }).catch(error => {
      // console.log('Error, ', error);
      // return caches.match('offLine.html');
//     })
//   );
// });