import React, { useEffect, useState } from "react";
import Booking_And_services from "./Booking_And_services";
import FAQs from "./FAQs";
import { DomainUrl, FetchData } from "../../utility/fetchFromAPI";
import { useDispatch } from "react-redux";
import { addUser, clearUser } from "../../utility/Slice/UserInfoSlice";
import { alertError, alertSuccess } from "../../utility/Alert";
import { parseErrorMessage } from "../../utility/ErrorMessageParser";
import io from "socket.io-client";
import BrowserNotification from "../../Components/BrowserNotification";
import ButtonWrapper from "../../Components/Buttons";
import { useNavigate } from "react-router-dom";
// import ButtonWrapper from "../../Components/Buttons";

const socket = io(DomainUrl);

const Home = () => {
  const Dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);

  // console.log(notifications);


  useEffect(() => {
    socket.on("newOrder", (notification) => {
      console.log("New order received:", notification);
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("newOrder");
    };
  }, []);

  useEffect(() => {
    const CreateAlert = () => {
      if (notifications.length > 0)
        alertSuccess(notifications[notifications?.length - 1]?.title);
    };

    CreateAlert();
  }, [notifications]);

  const handleNotification = () => {
    BrowserNotification({
      title: "new order",
      body: "You have a new order",
      icon: "/favicon.ico",
      link: "/wallet-page",
    });
  };

  const Navigate = useNavigate();
  const NavigateProfile = () => {
    Navigate("/user-profile", { replace: true });
  };

  return (
    <div className="">
      {/* <div>
        <h1> All Notifications</h1>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              <div>
                <h1>{notification.title}</h1>
                <h3>{notification.body}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div> */}
      {/* <ButtonWrapper
        onClick={(e) => {
          e.preventDefault();
          handleNotification();
        }}
      >
        Send notification
      </ButtonWrapper> */}
      {/* <BrowserNotification title={"vivek's notification"} body={"hii pappa"} /> */}

      {/* <ButtonWrapper onClick={NavigateProfile}>Profile</ButtonWrapper> */}

      <Booking_And_services />
      <FAQs />
    </div>
  );
};

export default Home;
