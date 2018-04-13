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
    "/data/restaurants.json"
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
    if(event.request.url.includes('restaurant.html?id=')){
        const strippedurl = event.request.url.split('?')[0];

        event.respondWith(
            catches.match(strippedurl).then(function(response){
                return response || fetch(event.response);
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request);
        })
    );
});