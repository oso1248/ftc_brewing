const staticBudApp = "budApp-v1"
const assets = [
  "/",
  "/login.html",
  "/login.css",
  "",
  "/contract.png",
  
]



if('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./serviceworker.js')
    .then(function() { console.log("Service Worker Registered"); });
}


self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticBudApp).then(cache => {
      cache.addAll(assets)
    })
  )
})

// self.addEventListener("fetch", fetchEvent => {
//   fetchEvent.respondWith(
//     caches.match(fetchEvent.request).then(res => {
//       return res || fetch(fetchEvent.request)
//     })
//   )
// })