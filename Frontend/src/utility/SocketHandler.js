import { useEffect } from "react";
import BrowserNotification from "../Components/BrowserNotification";

// Functions for capturing socket notifications
useEffect(() => {
  socket.on("allAppointments", (notification) => {
    console.log("all Appointments received:", notification);
    BrowserNotification({
      title: "new order",
      body: "You have a new order",
      icon: "/favicon.ico",
      link: "/wallet-page",
    });
  });

  return () => {
    socket.off("allAppointments");
  };
}, []);

useEffect(() => {}, [notifications]);
