/* ================================================
   useNotifications.js
   Place in src/hooks/useNotifications.js

   Call this hook once in App.jsx:
     import useNotifications from './hooks/useNotifications';
     // inside App():
     useNotifications();

   It will:
   1. Register the service worker
   2. Request notification permission (once, on first visit)
   3. Send the SW a RESCHEDULE message so the weekly
      alarm survives page reloads / SW restarts
================================================ */

import { useEffect } from 'react';

export default function useNotifications() {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('Notification' in window)) return;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
        console.log('[SW] Registered:', reg.scope);

        /* Ask for permission once */
        if (Notification.permission === 'default') {
          const perm = await Notification.requestPermission();
          console.log('[SW] Notification permission:', perm);
        }

        /* Tell the active SW to (re)schedule the weekly alarm */
        const sw = reg.active || reg.installing || reg.waiting;
        if (sw) {
          sw.postMessage('RESCHEDULE');
        } else {
          navigator.serviceWorker.ready.then((r) => {
            r.active.postMessage('RESCHEDULE');
          });
        }
      } catch (err) {
        console.warn('[SW] Registration failed:', err);
      }
    };

    register();
  }, []);
}
