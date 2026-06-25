// 1. 메인 화면과 동일한 8.10.1 버전으로 통일합니다.
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
  console.log('백그라운드 알림 수신:', payload);
  
  // 2. 서버에서 보내는 데이터 형식에 상관없이 에러가 나지 않도록 방어
  const notification = payload.notification || {};
  const data = payload.data || {};

  const title = notification.title || data.title || '🚨 세종경찰 재난상황실';
  const options = {
    body: notification.body || data.body || '새로운 상황이 발생했습니다.',
    icon: '/firebase-logo.png', // 이미지가 없다면 기본 알림 모양으로 뜹니다.
    badge: '/firebase-logo.png',
    tag: 'sejong-disaster-alert',
    renotify: true,
    data: { url: data.url || '/' }
  };

  // 3. 반드시 return을 붙여야 백그라운드에서 정상적으로 팝업이 생성됩니다!
  return self.registration.showNotification(title, options);
});
