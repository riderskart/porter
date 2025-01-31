import React from "react";
import BookingInput from "./BookingInput";
import { MapImg } from "../../Constants/BookingConstants";

const Booking = () => {
  return (
    <div>
      <div className="Map w-full bg-color-standard phone:h-[30vh] tablet:h-[27vh] laptop:h-[60vh]">
        <img src={MapImg} alt="" />
      </div>
      <BookingInput />
    </div>
  );
};

export default Booking;
