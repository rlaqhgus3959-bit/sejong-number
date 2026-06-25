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

// 백그라운드 메시지 수신 (알림 중복 방지를 위해 화면 팝업 강제 호출 코드는 생략합니다)
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] 백그라운드 알림 수신 완료: ', payload);
});
