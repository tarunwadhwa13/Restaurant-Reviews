const cacheName = "res";

const assets = [
    "/",
    "/index.html",
    "/restaurant.html",
    "/css/styles.css",
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/5.jpg",
    "/img/5.jpg",
    "/img/6.jpg",
    "/img/7.jpg",
    "/img/8.jpg",
    "/img/9.jpg",
    "/img/10.jpg",
    "/js/main.js",
    "/js/custom.js",    
    "/js/dbhelper.js",
    "/js/restaurant_info.js",
];


// Installing resources for offline use 
self.addEventListener('install', e => {
    console.log("Installing assets")
    e.waitUntil(
        caches.open(cacheName)
              .then(cache => cache.addAll(assets))
              .catch(error => console.error("Error Occured", error))
            );
});

// Match in cache and fetch
self.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
        })
        );     
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== CACHE_VERSION){
                    return caches.delete(keys[i]);
                }
            }));
        })
    );
});