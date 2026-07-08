// Service Worker for Find My Coach PWA
const CACHE_NAME = 'find-my-coach-static-v6';
const RUNTIME_CACHE = 'find-my-coach-runtime-v6';
const urlsToCache = [
  '/',
  '/index.html',
  '/ms/',
  '/ms/index.html',
  '/waitlist.html',
  '/ms/waitlist.html',
  '/coaches.html',
  '/ms/coaches.html',
  '/news/',
  '/news/index.html',
  '/news/launching-mid-2026-in-kuala-lumpur.html',
  '/news/padel-added-to-launch-sports.html',
  '/news/coach-waitlist-3-month-free-trial.html',
  '/ms/news/',
  '/ms/news/index.html',
  '/ms/news/launching-mid-2026-in-kuala-lumpur.html',
  '/ms/news/padel-added-to-launch-sports.html',
  '/ms/news/coach-waitlist-3-month-free-trial.html',
  '/privacy.html',
  '/ms/privacy.html',
  '/tos.html',
  '/cookies.html',
  '/thank-you.html',
  '/ms/thank-you.html',
  '/404.html',
  '/css/styles.css',
  '/js/script.js',
  '/js/site-config.js',
  '/images/og-share.jpg',
  '/js/seo-config.js',
  '/js/seo-schema.js',
  '/js/news-data.js',
  '/js/news-schema.js',
  '/js/analytics.js',
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml',
  '/images/logo/findmycoachlogo.jpg',
  '/images/phone-mockup.png',
  '/images/app/home.png',
  '/images/app/sports.png',
  '/images/app/profile.png',
  '/images/app/onboarding.png',
  '/favicon/android-chrome-192x192.png',
  '/favicon/android-chrome-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return Promise.allSettled(
          urlsToCache.map((url) =>
            cache.add(url).catch((err) => {
              console.warn(`Failed to cache ${url}:`, err);
            })
          )
        );
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              return caches.delete(cacheName);
            }
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin !== location.origin || request.method !== 'GET') {
    return;
  }

  if (request.destination === 'document' || request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() =>
          caches.match(request).then((cachedResponse) =>
            cachedResponse || caches.match('/index.html') || caches.match('/')
          )
        )
    );
    return;
  }

  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
  }
});
