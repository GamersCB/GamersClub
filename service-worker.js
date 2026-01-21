// Este es el script del Service Worker para las notificaciones push.
// Será registrado por la aplicación cliente.

// Escucha el evento 'push' del servicio push.
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Notificación de Gamer Club';
  const body = data.body || '¡Tienes un nuevo mensaje de Gamer Club!';
  const url = data.url || '/'; // URL por defecto para abrir cuando se hace clic en la notificación

  const options = {
    body: body,
    icon: '/images/web-icon.png', // Ruta a tu icono de la aplicación
    badge: '/images/web-icon.png', // Ruta a un icono de insignia (solo Android)
    data: {
      url: url // Datos personalizados para pasar al evento notificationclick
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Escucha el evento 'notificationclick'.
self.addEventListener('notificationclick', function(event) {
  event.notification.close(); // Cierra la notificación

  const urlToOpen = event.notification.data.url;

  event.waitUntil(
    clients.openWindow(urlToOpen) // Abre la URL cuando se hace clic en la notificación
  );
});

// Opcional: Escucha los eventos 'install' y 'activate' para caché u otra configuración
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  self.skipWaiting(); // Activa el nuevo service worker inmediatamente
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activado');
  event.waitUntil(clients.claim()); // Toma el control de todos los clientes inmediatamente
});