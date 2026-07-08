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

// 세종권 외 기상특보 알림 차단
// 세종·세종북부·세종남부가 명확히 포함된 기상특보 알림만 표시합니다.
const SEJONG_WEATHER_SCOPE_RE = /(세종\s*\(\s*세종\s*\)|세종\s*\(\s*세종북부\s*\)|세종\s*\(\s*세종남부\s*\)|세종특별자치시|세종북부|세종남부|\b세종\b)/;
const WEATHER_NOTIFICATION_RE = /(기상특보|특보|주의보|경보|호우|대설|강풍|풍랑|한파|폭염|건조|태풍|황사|폭풍해일|지진해일|안개|열대야)/;

function normalizeNotificationText(value) {
  return String(value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function shouldDisplayIncomingNotification(payload = {}) {
  const notification = payload.notification || {};
  const data = payload.data || {};
  const title = normalizeNotificationText(notification.title || data.title || '');
  const body = normalizeNotificationText(notification.body || data.body || '');
  const areaText = normalizeNotificationText([
    data.scope, data.region, data.area, data.target, data.warningArea, data.warningRegion,
    data.stn, data.stnName, data.office, body
  ].filter(Boolean).join(' '));
  const allText = normalizeNotificationText([title, body, JSON.stringify(data || {})].join(' '));

  // 기상특보가 아닌 도로통제·대피소 등 알림은 표시합니다.
  if (!WEATHER_NOTIFICATION_RE.test(allText)) return true;

  // 기상특보 알림은 세종권 문구가 있을 때만 표시합니다.
  return SEJONG_WEATHER_SCOPE_RE.test(areaText);
}

messaging.onBackgroundMessage((payload) => {
  if (!shouldDisplayIncomingNotification(payload)) {
    console.warn('세종권 외 기상특보 백그라운드 알림 차단:', payload);
    return;
  }

  const notification = payload.notification || {};
  const data = payload.data || {};
  const title = notification.title || data.title || '재난상황실 알림';
  const options = {
    body: notification.body || data.body || '',
    icon: notification.icon || data.icon || '/icons/icon-192.png',
    badge: notification.badge || data.badge || '/icons/icon-192.png',
    data: {
      url: data.url || data.click_action || '/',
      ...data
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
      return null;
    })
  );
});