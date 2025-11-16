/** @type {ServiceWorkerGlobalScope} self */
const self = globalThis.self;

/**
 * @param {PushEvent} event
 * @return { title: string, body: string }
 * */
const parseEvent = (event) => {
  try {
    const data = event.data.json();

    return {
      ...data,
    };
  } catch (error) {
    try {
      const body = event.data.text();
      return {
        title: 'Playlist',
        body,
      };
    } catch (error) {
      return {
        title: 'Playlist',
        body: 'New updates available!',
      };
    }
  }
};

self.addEventListener('push', (event) => {
  const { title, body } = parseEvent(event);

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/icon_128.png',
      vibrate: [100, 50, 100],
      requireInteraction: true,
      actions: [
        { action: 'view', title: 'View' },
        { action: 'close', title: 'Dismiss' },
      ],
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  if (event.action !== 'close') {
    event.waitUntil(
      clients.openWindow('https://playlist.gillid.pro/steam/dashboard')
    );
  }

  event.notification.close();
});
