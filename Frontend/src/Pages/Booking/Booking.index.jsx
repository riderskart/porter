import React from "react";
import BookingInput from "./BookingInput";
import { MapImg } from "../../Constants/BookingConstants";
import { useState, useEffect, useRef } from "react";

const Booking = () => {

  const MapInput = () => {
    const [address, setAddress] = useState("");
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
      const initMap = () => {
        const google = window.google;
        const initialPosition = { lat: 23.3441, lng: 85.3096 }; // default location (ranchi, India)

        const newMap = new google.maps.Map(mapRef.current, {
          center: initialPosition,
          zoom: 12,
        });

        const newMarker = new google.maps.Marker({
          position: initialPosition,
          map: newMap,
          draggable: true,
        });

        const geocoder = new google.maps.Geocoder();

        newMarker.addListener("dragend", () => {
          const position = newMarker.getPosition();
          geocoder.geocode({ location: position }, (results, status) => {
            if (status === "OK" && results[0]) {
              setAddress(results[0].formatted_address);
            }
          });
        });

        setMap(newMap);
        setMarker(newMarker);
      };

      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDZdeOdPnr9D_5CEQ7uBRxRU0l6I73IKZc_KEY&libraries=places`;
        // script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
        script.async = true;
        script.onload = () => initMap();
        document.head.appendChild(script);
      } else {
        initMap();
      }
    }, []);

    return (
      <div className="flex flex-col items-center p-4 w-full h-full bg-[#FFFFFF]">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={address}
          readOnly
          placeholder="Select a location on the map"
        />
        <div
          ref={mapRef}
          className="w-full h-full mt-4 rounded-md shadow-lg bg-[#D5D5D7]"
        ></div>
      </div>
    );
  };

  return (
    <div>
      <div className="Map w-full  phone:h-[30vh] tablet:h-[27vh] laptop:h-[60vh] phone:hidden laptop:block">
        {/* <img src={MapImg} alt="" className="h-full w-full" /> */}
      <MapInput />
      </div>
      <BookingInput />
    </div>
  );
};

export default Booking;
