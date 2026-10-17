const CACHE_NAME = 'reino-das-estrelas-v2';
const FILES = ['./', 'index.html', 'style.css', 'game.js', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];
const ASSETS = new Set(FILES.map(file => new URL(file, self.registration.scope).pathname));

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES.map(file => new Request(file, {cache: 'reload'})))));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('reino-das-estrelas-') && name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  const file = request.mode === 'navigate' ? new URL('./', self.registration.scope).pathname : url.pathname;
  if (!ASSETS.has(file)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const key = new URL(file, self.location.origin).href;
    try {
      const response = await fetch(request, {cache: 'no-cache'});
      if (response.ok) await cache.put(key, response.clone());
      return response;
    } catch (error) {
      const cached = await cache.match(key);
      if (cached) return cached;
      throw error;
    }
  })());
});
