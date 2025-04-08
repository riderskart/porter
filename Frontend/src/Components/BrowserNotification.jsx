// import ButtonWrapper from "./Buttons";
// import { useEffect, useCallback } from "react";

// const BrowserNotification = ({ title, body }) => {
//   // Define sendNotification function inside the component
//   const sendNotification = () => {
//     if ("Notification" in window && Notification.permission === "granted") {
//       new Notification(title, {
//         body,
//         // icon: "/images/logo.png",
//       });
//     }
//   };

//   // Request notification permission using useCallback
//   const requestNotificationPermission = useCallback(() => {
//     if ("Notification" in window) {
//       Notification.requestPermission().then(function (permission) {
//         if (permission === "granted") {
//           console.log("Notification permission granted!!");
//           sendNotification();
//         }
//       });
//     }
//   }, [sendNotification]);

//   // Request permission when the component is mounted
//   useEffect(() => {
//     if ("Notification" in window) {
//       requestNotificationPermission();
//     }
//   }, [requestNotificationPermission]);

//   return (
//     <div>
//       <h1 className="notificationButton">Hello Button</h1>
//       <ButtonWrapper onClick={sendNotification}>
//         Send Notification
//       </ButtonWrapper>
//     </div>
//   );
// };

function BrowserNotification({title, body, icon, link}) {
  // Function to send the notification
  const sendNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification(title, {
        body,
        icon,
      });

      // Add click functionality if a link is provided
      if (link) {
        notification.onclick = () => {
          window.open(link, "_blank");
        };
      }
    } else {
      console.error(
        "Notifications are not supported or permission not granted!"
      );
    }
  };

  // Request permission for notifications
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          sendNotification();
        } else {
          console.warn("Notification permission denied.");
        }
      });
    } else if (Notification.permission === "granted") {
      sendNotification();
    } else {
      console.warn("Notification permission denied.");
    }
  } else {
    console.error("Browser does not support notifications.");
  }
}

export default BrowserNotification;

