// Lets the service report work with no signal. Bump VERSION after changing files.
const PREFIX = "cooltek-reports-", VERSION = PREFIX + "8";
const FILES = ["./", "index.html", "form.js", "../app/app.js", "../app/style.css", "../app/logo.png", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {   // remove only this app's old caches (and the original unprefixed ones)
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION && (k.startsWith(PREFIX) || /^cooltek-v\d+$/.test(k))).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// Network first (so updates appear straight away), cache when offline. Sync calls are never cached.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).pathname.startsWith("/api/")) return;
  e.respondWith(
    fetch(e.request).then((res) => {
      if (res.ok && new URL(e.request.url).origin === location.origin) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
