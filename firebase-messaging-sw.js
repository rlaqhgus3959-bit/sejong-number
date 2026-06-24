importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// 🚨 주의: 아래 firebaseConfig 안의 내용은 선생님의 파이어베이스 프로젝트 설정값으로 바꿔주셔야 합니다!
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

// 백그라운드에서 알림이 왔을 때 화면에 띄워주는 역할
messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // 원하시는 경찰 마크나 알림 아이콘 이미지 경로로 변경 가능합니다.
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});