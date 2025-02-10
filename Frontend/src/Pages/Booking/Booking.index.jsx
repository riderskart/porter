import React from "react";
import BookingInput from "./BookingInput";
import { MapImg } from "../../Constants/BookingConstants";

const Booking = () => {
  return (
    <div>
      <div className="Map w-full  phone:h-[30vh] tablet:h-[27vh] laptop:h-[60vh]">
        <img src={MapImg} alt="" className="h-full w-full" />
      </div>
      <BookingInput />
    </div>
  );
};

export default Booking;
