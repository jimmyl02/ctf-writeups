self.addEventListener('install', function(event) {
  // Skip the 'waiting' lifecycle phase, to go directly from 'installed' to 'activated', even if
  // there are still previous incarnations of this service worker registration active.
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event) {
  // Claim any clients immediately, so that the page will be under SW control without reloading.
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    const url = event.request.url;
    if(url.startsWith('https://app.maria-bin.tk/search')){
        const params = new URL(url).searchParams;
        const name = encodeURIComponent(params.get('name'));
        const csrf = encodeURIComponent(params.get('csrf'));
        const type = encodeURIComponent(params.get('type'));

        return event.respondWith(fetch('https://app.maria-bin.tk/search', {
            'body': 'type=' + type + '&name=' + name + '&csrf=' + csrf,
            'credentials': 'include',
            'mode': 'no-cors',
            'method': 'POST'
        }));
    }else{
        return event.respondWith(fetch(event.request));
    }
});
