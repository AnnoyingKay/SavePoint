/* SavePoint service worker. Network first, never trusts the browser cache for our own files.
   The cache name changes every version so old files are always dropped. */
const VERSION = 11;
const CACHE = 'savepoint-v' + VERSION;

self.addEventListener('install', e => { self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('savepoint-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const gstatic = url.hostname === 'www.gstatic.com' && url.pathname.indexOf('/firebasejs/') === 0;
  if (!sameOrigin && !gstatic) return; /* RAWG, Google sign-in, Firestore: straight to the network */
  e.respondWith((async () => {
    try {
      const res = await fetch(req, sameOrigin ? { cache: 'no-store' } : undefined);
      if (res && res.ok) { const c = await caches.open(CACHE); c.put(req, res.clone()); }
      return res;
    } catch (err) {
      const hit = await caches.match(req, { ignoreSearch: sameOrigin });
      if (hit) return hit;
      if (req.mode === 'navigate') { const idx = await caches.match('./index.html') || await caches.match('./'); if (idx) return idx; }
      throw err;
    }
  })());
});
