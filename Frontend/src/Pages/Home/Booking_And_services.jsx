import React, { useEffect, useState } from "react";
import Bg from "../../assets/Bg.svg";
import { CornerDownRight, MapPin, MoveRight } from "lucide-react";
import { OurServices, VehicleData } from "../../Constants/homeConstants";
import { Link } from "react-router-dom";

const Booking_And_services = () => {
  // Constants
  const [current, setCurrent] = useState(0);

  // UI for Vehicle icon
  const Vehicle = ({ field }) => {
    return (
      <Link to={`#`} className="flex flex-col justify-center items-center m-2">
        <div className="Img w-28 bg-primary rounded-lg overflow-hidden drop-shadow-lg hover:drop-shadow-xl">
          <img
            src={field?.icon}
            alt=""
            className="hover:scale-105 transition duration-200 ease-in-out"
          />
        </div>
        <h3 className="name text-center w-24 text-sm mt-2 text-white">
          {field.name}
        </h3>
      </Link>
    );
  };
  const OurServicesSlider = () => {
    const [offset, setOffset] = useState(0);
    const sliderSpeed = 3000;
    const slideWidth = 384;

    useEffect(() => {
      const interval = setInterval(() => {
        setOffset((prevOffset) => {
          const maxOffset = slideWidth * (OurServices.length - 1);
          return prevOffset >= maxOffset ? 0 : prevOffset + slideWidth;
        });
      }, sliderSpeed);

      return () => clearInterval(interval);
    }, [slideWidth, sliderSpeed, OurServices.length]);

    return (
      <div
        className="overflow-hidden relative w-full "
        style={{ width: "80vw", left: "15vw" }}
      >
        <div
          className="flex gap-10 mt-10"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: "transform 0.5s ease-in-out",
            width: `${slideWidth * OurServices.length}px`,
          }}
        >
          {OurServices.map((item, index) => (
            <div
              key={index}
              style={{ flex: "0 0 auto", width: `${slideWidth}px` }}
            >
              <OurServicesCard field={item} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const OurServicesCard = ({ field }) => {
    return (
      <div className="relative h-52 w-96 rounded-xl backdrop-blur-lg mb-10 drop-shadow-xl shadow-[#DF3F33] px-5 bg-[#949597]">
        <div className="Name mt-7 text-black py-5">
          <span className="rounded-r-full mt-5 font-Fredoka text-4xl text-white">
            {field.name}
          </span>
        </div>
        <div className="Description text-xl p-2 font-Fredoka heading-text-gray">
          {field.description}
        </div>
      </div>
    );
  };

  const nextSlide = (index) => {
    index === OurServices.length - 1 ? setCurrent(0) : setCurrent(87 * current);

    index++;
    console.log(current);
  };

  return (
    <div className="BODY  flex flex-col justify-center items-center bg-[#D5D5D7] select-none">
      {/* Bg Image and text */}
      <div className="BG-and-Text relative phone:h-[45vh] laptop:h-[60vh] tablet:h-[30vh] overflow-hidden">
        <img src={Bg} alt="" className="w-full" />

        <div className="absolute z-10 w-full h-4/5 text-center top-0 heading-text-gray flex flex-col laptop:justify-center items-center phone:justify-start phone:mt-5  tablet:mt-10 ">
          <span className="laptop:text-[5rem] phone:text-[2.5rem] font-Knewave accent-color">
            Rider's Kart
          </span>
          <span className="relative -top-4 text-lg  subtitle-text-gray">
            Get your things on point
          </span>
        </div>
      </div>

      {/* booking section */}
      <div className="Booking-section relative -top-32 lg:mx-20 bg-[#949597] rounded-xl  drop-shadow-lg p-4 lg:p-0 text-black ">
        {/* City btn */}
        <div className=" City-btn w-full laptop:hidden ">
          <button
            className="flex mx-5 mt-3"
            onClick={() => {
              setCityMenu({
                isOpened: true,
                value: cityMenu.value,
              });
            }}
          >
            <span>
              <MapPin width={15} color="#93161a" />
            </span>
            <span className="ml-2 text-sm"> City:</span>{" "}
            <span className="font-bold mx-2 text-sm heading-text-gray">
              Ranchi
            </span>
          </button>
        </div>

        <div className="flex gap-5 laptop:hidden w-fit justify-center items-center">
          {/* <div className="laptop:hidden flex w-40 tablet:w-fit overflow-hidden overflow-x-scroll"> */}
          <div className="hidden lg-block flex w-40 tablet:w-fit overflow-hidden overflow-x-scroll justify-start items-start">
            {VehicleData.map((field, index) => (
              <Vehicle key={index} field={field} />
            ))}
          </div>

          {/* Estimation Btn */}
          <div>
            <Link
              to={`/booking`}
              className=" phone:w-32 h-32  tablet:w-36 p-2  flex flex-col justify-between bg-secondary-color rounded-2xl drop-shadow-lg hover:scale-110  hover:drop-shadow-2xl transition duration-200 ease-in-out bg-[#DF3F33]"
            >
              <span className="text-xl  heading-text-gray">Book a parcel </span>
              <span className=" heading-text-gray">
                <CornerDownRight />
              </span>
            </Link>
          </div>
        </div>

        {/* Vehicle */}
        <div className="Vehicle phone:hidden laptop:flex bg-[#949597] ">
          <div className="flex w-full h-[100%] justify-center items-start py-16 gap-10 text-black ">
            {/* All vehicles */}
            {VehicleData.map((field, index) => (
              <Vehicle key={index} field={field} />
            ))}

            {/* Estimation Btn */}
            <div>
              <Link
                to={`/booking`}
                className=" h-32 w-32 p-2 my-3  flex flex-col justify-between text-white rounded-2xl drop-shadow-lg hover:scale-110 hover:drop-shadow-2xl transition duration-200 ease-in-out bg-[#DF3F33]"
              >
                <span className="text-2xl ">Book a parcel </span>
                <span>
                  <CornerDownRight />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Our Services */}
      <section className="Our-Services relative w-full h-fit mb-20 ">
        {/* Title */}
        <div className="Title  flex flex-col justify-center items-center">
          <span className="  h-14 font-serif font-bold text-[3rem]  heading-text-gray">
            Our Services
          </span>
        </div>

        {/* Our services card for mobile */}
        <div className="OurServices overflow-hidden relative tablet:hidden ">
          <div
            className={`flex gap-10 ml-10 transition ease-out duration-100 -translate-x-[174vw]`}
          >
            {OurServices.map((item, index) => {
              return (
                <div key={index}>
                  <OurServicesCard field={item} />
                </div>
              );
            })}
          </div>
        </div>

        {/* All services */}
        <div className="All-Services relative overflow-hidden phone:hidden tablet:flex flex justify-center items-center">
          <div className="w-[90%] flex justify-center items-center pr-96">
            <OurServicesSlider />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking_And_services;
