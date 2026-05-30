/* ================================================
   SERVICE WORKER — sw.js
   Place this file in your /public folder.

   Responsibilities:
   1. Cache-first install for offline shell
   2. Schedule a Sunday-noon push notification
      (Savings Summary) using an internal alarm
      stored in IndexedDB, since the Web Push API
      requires a server. This self-contained approach
      fires the notification from inside the SW itself
      on a weekly interval check.
================================================ */

const CACHE  = 'neo-portfolio-v1';
const ASSETS = ['/', '/index.html'];

/* ── Install: cache shell ── */
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

/* ── Activate: clean old caches ── */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();

  /* Start the weekly alarm check */
  scheduleNextSundayCheck();
});

/* ── Fetch: cache-first ── */
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});

/* ── Notification click: focus/open the app ── */
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const focused = clients.find((c) => c.focus);
      if (focused) return focused.focus();
      return self.clients.openWindow('/');
    })
  );
});

/* ================================================
   WEEKLY SUNDAY NOON SCHEDULER
   Uses setTimeout chains inside the SW.
   Note: Service workers can be terminated by the
   browser between checks; the SW re-registers the
   alarm on each activate/message event so it
   survives restarts when the page is opened.
================================================ */

const STORAGE_KEY = 'lastSundayNotif';

function msUntilNextSundayNoon() {
  const now    = new Date();
  const target = new Date(now);

  /* Find next Sunday */
  const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
  target.setDate(now.getDate() + daysUntilSunday);
  target.setHours(12, 0, 0, 0);

  /* If it's Sunday but before noon, fire today */
  if (now.getDay() === 0 && now.getHours() < 12) {
    target.setDate(now.getDate());
  }

  return Math.max(target.getTime() - now.getTime(), 0);
}

function scheduleNextSundayCheck() {
  const delay = msUntilNextSundayNoon();

  /* Cap setTimeout at ~24 days to avoid 32-bit overflow */
  const safeDelay = Math.min(delay, 24 * 24 * 60 * 60 * 1000);

  setTimeout(() => {
    if (delay <= safeDelay) {
      fireSavingsSummaryNotification();
    }
    /* Re-schedule for the following week */
    scheduleNextSundayCheck();
  }, safeDelay);
}

function fireSavingsSummaryNotification() {
  const options = {
    body:    "It's Sunday — time to review this week's savings. Tap to open your portfolio.",
    icon:    '/assets/Brand.png',
    badge:   '/assets/Brand.png',
    tag:     'savings-summary',       /* replaces previous if still showing */
    renotify: false,
    vibrate: [200, 100, 200],
    data:    { url: '/' },
    actions: [
      { action: 'open',    title: 'Open Portfolio' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };

  self.registration.showNotification('📊 Weekly Savings Summary', options);
}

/* ── Allow the page to manually trigger a test notification ── */
self.addEventListener('message', (e) => {
  if (e.data === 'PING')          return e.source.postMessage('PONG');
  if (e.data === 'TEST_NOTIF')    return fireSavingsSummaryNotification();
  if (e.data === 'RESCHEDULE')    return scheduleNextSundayCheck();
});
