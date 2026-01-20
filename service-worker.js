// public/service-worker.js

console.log('Service Worker: Script loaded and running!'); // <-- NUEVO LOG AQUI

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  event.waitUntil(self.skipWaiting()); // Forzar la activación del nuevo Service Worker
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  event.waitUntil(self.clients.claim()); // Tomar control de las páginas existentes
});

self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received', event);
  const data = event.data.json();
  console.log('Push data:', data);

  const title = data.title || 'Nueva Notificación';
  const options = {
    body: data.body || 'Tienes una nueva actualización.',
    icon: data.icon || '/images/web-icon.png', // Icono por defecto
    badge: data.badge || '/images/web-icon.png', // Badge por defecto
    data: {
      url: data.url || '/', // URL a abrir al hacer clic en la notificación
    },
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked', event);
  event.notification.close(); // Cerrar la notificación

  const urlToOpen = event.notification.data.url;

  event.waitUntil(
    clients.openWindow(urlToOpen) // Abrir la URL asociada a la notificación
  );
});