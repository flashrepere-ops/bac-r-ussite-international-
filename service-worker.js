// ======================================
// BAC RÉUSSITE INTERNATIONAL
// POWER PILOT TECHNOLOGY
// SERVICE WORKER
// ======================================

const CACHE_NAME = "bri-version-2";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.json"
];

// INSTALLATION
self.addEventListener("install", function (event) {

    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});


// ACTIVATION
self.addEventListener("activate", function (event) {

    event.waitUntil(
        caches.keys().then(function (cacheNames) {

            return Promise.all(
                cacheNames.map(function (cacheName) {

                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }

                })
            );

        })
    );

    self.clients.claim();
});


// GESTION DES REQUÊTES
self.addEventListener("fetch", function (event) {

    if (event.request.method !== "GET") {
        return;
    }

    const requestURL = new URL(event.request.url);

    if (requestURL.origin !== self.location.origin) {
        return;
    }

    event.respondWith(

        fetch(event.request)
            .then(function (response) {

                if (response && response.ok) {

                    const responseCopy = response.clone();

                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request, responseCopy);
                    });

                }

                return response;

            })

            .catch(function () {

                return caches.match(event.request).then(function (cachedResponse) {

                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    if (event.request.mode === "navigate") {
                        return caches.match("./index.html");
                    }

                    return new Response(
                        "Contenu indisponible hors connexion.",
                        {
                            status: 503,
                            headers: {
                                "Content-Type": "text/plain; charset=utf-8"
                            }
                        }
                    );

                });

            })

    );

});