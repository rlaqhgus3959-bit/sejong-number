importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDJw2-fkhyX8ioYlKrv5ixNiCPi2kirY8k",
  authDomain: "shut-down-80255.firebaseapp.com",
  databaseURL: "https://shut-down-80255-default-rtdb.firebaseio.com",
  projectId: "shut-down-80255",
  storageBucket: "shut-down-80255.firebasestorage.app",
  messagingSenderId: "620282815079",
  appId: "1:620282815079:web:bd561b5a00483e94fdaac2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] 백그라운드 푸시 수신:', payload);
  
  const notification = payload.notification || {};
  const data = payload.data || {};

  return self.registration.showNotification(
    notification.title || data.title || '세종경찰 재난상황실',
    {
      body: notification.body || data.body || '새로운 상황이 접수되었습니다.',
      icon: './firebase-logo.png', // 추후 상황실 아이콘으로 변경
      badge: './firebase-logo.png',
      tag: 'sejong-disaster-alert',
      renotify: true,
      data: { url: data.url || '/' }
    }
  );
});
