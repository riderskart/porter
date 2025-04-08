self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
//     icon: "/icon.png", // Optional: Path to an icon for the notification
  });
});
