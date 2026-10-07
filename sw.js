// Kill switch for the old caching service worker: browsers that still have it
// installed fetch this file on their next visit, clear the stale caches and reload.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
	event.waitUntil(
		(async () => {
			for (const key of await caches.keys()) await caches.delete(key);
			await self.registration.unregister();
			for (const client of await self.clients.matchAll({ type: "window" })) {
				client.navigate(client.url);
			}
		})()
	);
});
