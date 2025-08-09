const CACHE_NAME = 'reckoning-v1';
const FILES = ['./','./index.html','./styles.css','./app.js','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install', evt=>{ evt.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', evt=>{ evt.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=> k!==CACHE_NAME?caches.delete(k):null)))); self.clients.claim(); });
self.addEventListener('fetch', evt=>{ evt.respondWith(caches.match(evt.request).then(r=> r || fetch(evt.request))); });
