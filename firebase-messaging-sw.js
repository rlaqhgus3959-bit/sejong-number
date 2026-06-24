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

messaging.onBackgroundMessage((payload) => {
    const title = payload.notification.title;
    const options = {
        body: payload.notification.body
    };
    return self.registration.showNotification(title, options);
});