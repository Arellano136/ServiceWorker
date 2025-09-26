self.addEventListener("install", (event) => {
  sendMessage("Instalada");
  self.skipWaiting(); // pasa a waiting
});

self.addEventListener("activate", (event) => {
  sendMessage("Activación");
  event.waitUntil(clients.claim()); // lo hace activo inmediatamente
});

self.addEventListener("message", (event) => {
  if (event.data === "checkIdle") {
    sendMessage("Ocioso");
  }
});

// Función para enviar mensajes al cliente (páginas)
function sendMessage(status) {
  const now = new Date();
  const timestamp = now.toISOString() + `.${now.getMilliseconds()}`;
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({ status, timestamp });
    });
  });
}
