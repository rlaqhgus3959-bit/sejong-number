importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// 🚨 파이어베이스 웹 앱(shut down) 화면에 나온 설정값을 아래에 똑같이 넣어주세요!
const firebaseConfig = {
  apiKey: "선생님의_API_KEY",
  authDomain: "shut-down-80255.firebaseapp.com",
  databaseURL: "https://shut-down-80255-default-rtdb.firebaseio.com",
  projectId: "shut-down-80255",
  storageBucket: "shut-down-80255.appspot.com",
  messagingSenderId: "선생님의_SENDER_ID",
  appId: "선생님의_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 상황실 브라우저가 내려가 있을 때 알림을 띄워주는 역할
messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // 추후 경찰 마크 이미지 등으로 변경 가능합니다.
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
