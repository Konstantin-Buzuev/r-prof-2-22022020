// Должно быть true в production
var doCache = true;

// Имя кэша
var CACHE_NAME = 'geekmessenger-cache' ;

/*** "activate" ****************************************************************
вызывается сразу после install и очищает ресурсы, 
использованные в предыдущей версии скрипта сервис-воркера.
*******************************************************************************/
// Очищает старый кэш
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all (keyList.map(key => {
          if(!cacheWhitelist.includes(key)) {
            console.log('Deleting cache: ' + key);
            return caches.delete(key);
          }
        }))
      );
  );
});

/*** "install" *****************************************************************
вызывается при первом открытии сайта, на котором есть service worker.
Это процедура установки сервис-воркера в браузер пользователя.
В ее обработчике в массиве urlsToCache вы можете указать страницы сайта,
которые будут кешироваться, включая статику.
*******************************************************************************/
self.addEventListener('install', function(event) {
  if(doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function (cache) {
          // Получаем данные из манифеста (они кэшируются)
          fetch('manifest/manifest.json')
            .then(response => {
              response.json()
            })
            .then(assets => {
              // Открываем и кэшируем нужные страницы и файлы
              const urlsToCache = [
                '',
                '/chat/*',
              ];
              cache.addAll(urlsToCache);
              console.log('cached');
            });
        });
    );
  };
});

/*** "fetch" *******************************************************************
Генерируется при каждом запросе на сервер.
Сервис-воркер будет перехватывать каждое такое событие
и искать в кеше запрашиваемые ресурсы, прежде чем идти за ними на сервер.
*******************************************************************************/
// Когда приложение запущено, service worker перехватывает запросы
// и отвечает на них данными из кеша, если они есть
self.addEventListener('fetch', function(event) {
  if(doCache) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        return response || fetch (event.request);
      })
    );
  };
});

self.addEventListener('push', function(event) {
  console.info('Event: Push');
  var title = 'Тут новый пуш прилетел!';
  var body = {
      'body': 'Нажми сюда, чтобы открыть',
      'tag': 'pwa',
      'icon': './manifest/logo-pwa-48.png'
    };
  event.waitUntil(
    self.registration.showNotification(title, body);
  );
});

