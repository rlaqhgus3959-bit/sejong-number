/* 세종경찰 재난관리 플랫폼 - FCM 서비스워커 */

self.addEventListener('install', function () {
self.skipWaiting();
});

self.addEventListener('activate', function (event) {
event.waitUntil(self.clients.claim());
});

/* FCM 라이브러리보다 먼저 선언 */
self.addEventListener('notificationclick', function (event) {
event.notification.close();

const targetUrl =
(event.notification.data && event.notification.data.url) ||
'./';

event.waitUntil(
self.clients.matchAll({
type: 'window',
includeUncontrolled: true
}).then(function (clientList) {
for (const client of clientList) {
if ('focus' in client) {
return client.focus();
}
}

```
  return self.clients.openWindow(targetUrl);
})
```

);
});

importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

const firebaseConfig = {
apiKey: "AIzaSyDJw2-fkhyX8ioYlKrv5ixNiCPi2kirY8k",
authDomain: "shut-down-80255.firebaseapp.com",
databaseURL: "https://shut-down-80255-default-rtdb.firebaseio.com",
projectId: "shut-down-80255",
storageBucket: "shut-down-80255.firebasestorage.app",
messagingSenderId: "620282815079",
appId: "1:620282815079:web:bd561b5a00483e94fdaac2",
measurementId: "G-XKW8CM4W06"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
console.log('[FCM 백그라운드 수신]', payload);

const notification = payload.notification || {};
const data = payload.data || {};

const title =
notification.title ||
data.title ||
'세종경찰 재난상황실 알림';

const options = {
body:
notification.body ||
data.body ||
'새 재난 상황이 등록되었습니다.',
icon: './icon-192.png',
badge: './icon-192.png',
tag: data.tag || 'sejong-disaster-alert',
renotify: true,
data: {
url: data.url || './'
}
};

return self.registration.showNotification(title, options);
});
