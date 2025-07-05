const CACHE_NAME = 'brasil-viagens-cache-v2'; // Atualizei a versão do cache para v2
const URLS_TO_CACHE = [
  './',
  './index.html',
  './sobre.html',
  './galeria.html',
  './contato.html',
  './css/estilo.css',
  './js/script.js',
  './imagens/logo-explorabrasil.png',
  './imagens/floripa.jpg',
  './imagens/maragogi.jpg',
  './imagens/jericoacoara.jpg',
  './imagens/lencois_maranhenses.jpg',
  './imagens/chapada_dos_guimaraes.jpg',
  './imagens/pantanal.jpg',
  './imagens/rio_de_janeiro.jpg',
  './imagens/gramado.jpg',
  './imagens/curitiba_jardim_botanico.jpg',
  './imagens/amazonia.jpg',
  './imagens/iguacu_cataratas.jpg',
  './imagens/bonito.jpg',
  './imagens/icon-192.png',
  './imagens/icon-512.png'
];

// Instalação do Service Worker e cache dos arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Ativação do SW e limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      ))
      .then(() => self.clients.claim())
  );
});

// Estratégia Cache First para requisições
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return; // ignorar métodos que não sejam GET

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // Retorna do cache imediatamente
          return cachedResponse;
        }
        // Caso não tenha no cache, faz fetch e adiciona ao cache
        return fetch(event.request).then(networkResponse => {
          // Só cachear respostas válidas e da mesma origem
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
          return networkResponse;
        });
      }).catch(() => {
        // Fallback: poderia retornar uma página offline, mas por enquanto não tem
      })
  );
});
