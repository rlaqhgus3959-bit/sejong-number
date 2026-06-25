// 1. 메인 화면(index.html)과 똑같이 8.10.1 버전으로 통일합니다.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyDJw2-fkhyX8ioYlKrv5ixNiCPi2kirY8k",
  authDomain: "shut-down-80255.firebaseapp.com",
  databaseURL: "https://shut-down-80255-default-rtdb.firebaseio.com",
  projectId: "shut-down-80255",
  storageBucket: "shut-down-80255.firebasestorage.app",
  messagingSenderId: "620282815079",
  appId: "1:620282815079:web:bd561b5a00483e94fdaac2"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] 백그라운드 알림 수신 완료: ', payload);

  const notification = payload.notification || {};
  const data = payload.data || {};

  // 2. 스마트폰이 알림을 띄울 때까지 기다려주도록 반드시 'return'을 붙여야 합니다.
  return self.registration.showNotification(
    notification.title || data.title || '🚨 세종경찰 재난상황실',
    {
      body: notification.body || data.body || '새로운 상황이 발생했습니다.',
      icon: '/firebase-logo.png', // 이미지가 없다면 안 보여도 알림은 정상적으로 뜹니다.
      badge: '/firebase-logo.png',
      tag: 'sejong-disaster-alert',
      renotify: true,
      data: { url: '/' }
    }
  );
});
