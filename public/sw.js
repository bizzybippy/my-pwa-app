const CACHE_NAME = 'my-pwa-cache-v1';
const BASE_PATH = '/my-pwa-app';
const urlsToCache = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/assets/icon-192x192.png`,
  `${BASE_PATH}/assets/icon-512x512.png`,
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache).catch(error => {
        console.error('Service Worker: Cache failed', error);
      });
    })
  );
});

self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname.startsWith(BASE_PATH)) {
    // แคชไฟล์ static จาก _next/static/ และ .html
    if (
      requestUrl.pathname.startsWith(`${BASE_PATH}/_next/static/`) ||
      requestUrl.pathname.endsWith('.html')
    ) {
      event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
          return cache.match(event.request).then(response => {
            return (
              response ||
              fetch(event.request)
                .then(networkResponse => {
                  cache.put(event.request, networkResponse.clone());
                  return networkResponse;
                })
                .catch(() => {
                  console.error(
                    'Service Worker: Fetch failed for',
                    event.request.url
                  );
                  // Fallback ไปที่ index.html สำหรับ navigation requests
                  if (event.request.mode === 'navigate') {
                    return caches.match(`${BASE_PATH}/index.html`);
                  }
                })
            );
          });
        })
      );
    } else {
      // สำหรับการร้องขออื่นๆ (เช่น API) ลองใช้แคชก่อน ถ้าไม่มีให้ fetch
      event.respondWith(
        caches.match(event.request).then(response => {
          return (
            response ||
            fetch(event.request).catch(error => {
              console.error('Service Worker: Fetch failed', error);
            })
          );
        })
      );
    }
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});
