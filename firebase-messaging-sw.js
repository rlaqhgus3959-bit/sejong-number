importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDJw2-fkhyX8ioYlKrv5ixNiCPi2kirY8k",
  projectId: "shut-down-80255",
  messagingSenderId: "620282815079",
  appId: "1:620282815079:web:bd561b5a00483e94fdaac2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('백그라운드 푸시 수신:', payload);
  
  const notification = payload.notification || {};
  const data = payload.data || {};

  const title = notification.title || data.title || '🚨 재난상황실 알림';
  const options = {
    body: notification.body || data.body || '새로운 상황이 발생했습니다.',
    icon: '/firebase-logo.png',
    badge: '/firebase-logo.png',
    tag: 'sejong-disaster-alert',
    renotify: true,
    data: { url: '/' }
  };

  // 🚨 이 return이 없어서 스마트폰이 알림을 띄우지 않고 씹어버렸던 것입니다!
  return self.registration.showNotification(title, options);
});
