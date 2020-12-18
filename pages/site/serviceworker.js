if('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./serviceworker.js')
    .then(function() { console.log('Service Worker Registered') })
}

var CACHE_STATIC = 'static-v002'


self.addEventListener('install', function (event) {
  self.skipWaiting()
  console.log('Installing Service Worker ...', event)
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(function (cache) {
        console.log('Precaching App Shell')
        cache.addAll([
            // '/login.html',
            '/login.css',
            // '',
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
          if (key !== CACHE_STATIC) {
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
    caches.match(event.request).then(function(response) {
      if (response && !event.request.url.endsWith('login.html')) {
        console.log('From Cache', event.request.url)
        return response
      }
      return fetch(event.request).then(function(response) {
        console.log('From Network', event.request.method, response.status, event.request.url)
        if ((response.status === 200 || response.status === 0) && (event.request.method !== 'POST' && event.request.method !== 'PATCH' && event.request.method !== 'DELETE')) { 
          return caches.open(CACHE_STATIC)
            .then(function(cache) {
              console.log('Put cache', event.request.method, event.request.url)
              cache.put(event.request.url, response.clone())
              return response
          }) 
        } else if (response.status === 404) {
          return caches.match('/offLine.html');
        }
        return response
      });
    }).catch(function() {
      return caches.match('/offLine.html')
    })
  );
});





// var CACHE_STATIC_NAME = 'static-v001'
// var CACHE_DYNAMIC_NAME = 'dynamic-v002'

// self.addEventListener('install', function (event) {
//   self.skipWaiting()
//   console.log('Installing Service Worker ...', event)
//   event.waitUntil(
//     caches.open(CACHE_STATIC_NAME)
//       .then(function (cache) {
//         console.log('Precaching App Shell')
//         cache.addAll([
//             // '/login.html',
//             '/login.css',
//             // '',
//             '/256.png',
//             '/barrel.jpg',
//             '/offLine.html',
//         ])
//       })
//   )
// })

// self.addEventListener('activate', function (event) {
//   console.log('Activating Service Worker ....', event)
//   event.waitUntil(
//     caches.keys()
//       .then(function (keyList) {
//         return Promise.all(keyList.map(function (key) {
//           if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
//             console.log('Removing old cache.', key)
//             return caches.delete(key)
//           }
//         }))
//       })
//   )
//   return self.clients.claim()
// })

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     // Try the network
    // fetch(event.request)
    //   .then(function(res) {
    //     return caches.open(CACHE_DYNAMIC_NAME)
    //       .then(function(cache) {
    //         // Put in cache if succeeds
    //         cache.put(event.request.url, res.clone())
    //         return res;
    //       })
    //   })
//       .catch(function(err) {
//           // Fallback to cache
          // return caches.match(event.request)
          //   .then(function(res){
          //     if (res === undefined) { 
          //       // get and return the offline page
          //       res = caches.match('/offLine.html')
          //     } 
          //     return res;
          // })
//       })
//   )
// })
