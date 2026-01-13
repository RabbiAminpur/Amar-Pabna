
const CACHE_NAME = 'amar-pabna-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://fonts.maateen.me/solaiman-lipi/font.css'
];

// ইন্সটল করার সময় ফাইল ক্যাশ করা
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// পুরনো ক্যাশ ডিলিট করা
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// নেটওয়ার্ক রিকোয়েস্ট ইন্টারসেপ্ট করা
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // যদি ক্যাশে থাকে তবে ক্যাশ থেকে দাও, নাহলে নেটওয়ার্ক থেকে আনো
      return cachedResponse || fetch(event.request).then((response) => {
        // নতুন রিকোয়েস্টগুলো ক্যাশে সেভ করে রাখা (বিশেষ করে ছবিগুলো)
        if (event.request.method === 'GET' && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      });
    }).catch(() => {
      // যদি নেটওয়ার্ক না থাকে এবং ক্যাশেও না থাকে (যেমন নতুন পেজ)
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});
