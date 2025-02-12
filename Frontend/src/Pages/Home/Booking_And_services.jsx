import React, { useEffect, useState } from "react";
import Bg from "../../assets/Bg.svg";
import { ChevronDown, CornerDownRight, MapPin, MoveRight } from "lucide-react";
import { OurServices, VehicleData } from "../../Constants/homeConstants";
import { Link } from "react-router-dom";
import HomeBackGround from "../../assets/Home/HomeBackground.jpg";
import ButtonWrapper from "../../Components/Buttons";

const Booking_And_services = () => {
  // Constants
  const [current, setCurrent] = useState(0);

  // UI for Vehicle icon
  const Vehicle = ({ field }) => {
    return (
      <Link
        to={`/booking`}
        className="flex flex-col justify-center items-center m-2"
      >
        <div className="Img laptop:w-28 phone:w-14 bg-primary rounded-lg overflow-hidden drop-shadow-lg hover:drop-shadow-xl p-2">
          <img
            src={field?.icon}
            alt=""
            className="hover:scale-105 transition duration-200 ease-in-out rounded-lg"
          />
        </div>
        <h3 className="name text-center w-24 text-sm mt-2 ">{field.name}</h3>
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
      <div className="relative laptop:h-52 laptop:w-96 phone:h-fit phone:flex-row rounded-xl backdrop-blur-md backdrop-brightness-95 text-black mb-10 drop-shadow-xl overflow-hidden shadow flex laptop:justify-around laptop:items-start phone:justify-evenly phone:items-center laptop:flex-col">
        {/* pink and white color background */}
        {/* <div class="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div> */}

        {/* red and gray color background */}
        {/* <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(128,128,128,.5)_50%,rgba(255,0,0,.5)_100%)]"></div> */}

        <div className="Name text-black py-5 px-5">
          <span className="rounded-r-full font-Fredoka text-4xl">
            {field.name}
          </span>
        </div>
        <div className="Description text-xl px-5 font-Fredoka heading-text-gray phone:hidden laptop:block">
          {field.description}
        </div>
        <div className="laptop:px-5 phone:hidden laptop:block">
          <ButtonWrapper children={"Read More"} />
        </div>
      </div>
    );
  };
  const nextSlide = (index) => {
    index === OurServices.length - 1 ? setCurrent(0) : setCurrent(87 * current);

    index++;
    console.log(current);
  };
  const PopupButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);

    return (
      <div className="flex flex-col  justify-center items-center h-screen bg-transparent laptop:hidden">
        <h1 className="flex flex-col justify-center items-center gap-2">
          <span className="text-4xl font-semibold">Rider's Kart</span>
          <span>Most favourable application for sending Parcels </span>
        </h1>
        <button
          onClick={openPopup}
          className="px-8 py-5 mt-5 text-xl rounded-2xl drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl transition duration-150 ease-in-out bg-[#DF3F33] text-white"
        >
          Tap to book parcel
        </button>

        {/* Popup Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
            <div className=" rounded-lg p-8 w-fit text-center">
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
              {/* booking section with 4 bubas */}
              <div className=" z-10 w-full h-4/5 text-center top-0 heading-text-gray flex flex-col laptop:justify-center items-center phone:justify-start phone:mt-5  tablet:mt-10 ">
                {/* booking section */}
                <div className="Booking-section relative lg:mx-20 bg-[#949597] rounded-xl  drop-shadow-lg p-4 lg:p-0 text-black ">
                  {/* City btn only for phone */}
                  <div className=" City-btn w-full laptop:hidden bg-white rounded-xl my-4">
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
                      <span className="ml-2 text-xl"> City:</span>{" "}
                      <span className="font-bold mx-2 text-xl heading-text-gray">
                        Ranchi
                      </span>
                    </button>
                  </div>
                  {/* Vehicle for phone */}
                  <div className="flex gap-5 laptop:hidden w-fit justify-center items-center">
                    {/* <div className="laptop:hidden flex w-40 tablet:w-fit overflow-hidden overflow-x-scroll"> */}
                    <div className=" flex flex-col w-40 tablet:w-fit overflow-hidden overflow-x-scroll justify-start items-start ">
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
                        <span className="text-xl  heading-text-gray">
                          Book a parcel{" "}
                        </span>
                        <span className=" heading-text-gray">
                          <CornerDownRight />
                        </span>
                      </Link>
                    </div>
                  </div>
                  {/* Vehicle for laptop */}
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
              </div>

              <button
                onClick={closePopup}
                className="mt-10 px-6 py-3 bg-[#D5D4D7] text-black rounded-lg font-semibold hover:bg-[#DF3F33] hover:text-white transition duration-300 ease-in-out"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="BODY  flex flex-col justify-center items-center bg-[#D5D5D7] select-none">
      {/* Bg Image and text */}
      <div className="BG-and-Text relative laptop:h-[70vh] tablet:h-[30vh] overflow-hidden">
        <img src={HomeBackGround} alt="" className="w-full" />
        <div className="absolute z-10 w-full h-4/5 text-center top-0 heading-text-gray flex gap-10 laptop:justify-center items-center phone:justify-start phone:mt-5  tablet:mt-10 ">
          {/* <PopupButton /> */}
          <div className=" z-10 w-full h-4/5 text-center top-0 heading-text-gray flex flex-col laptop:justify-center items-center phone:justify-start phone:mt-5  tablet:mt-10  ">
            {/* booking section */}
            <div className="Booking-section relative lg:mx-20 bg-transparent rounded-xl  drop-shadow-lg p-4 lg:p-0 text-black backdrop-blur-sm shadow-neutral-600 shadow-2xl laptop:block phone:hidden">
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
                    <span className="text-xl  heading-text-gray">
                      Book a parcel{" "}
                    </span>
                    <span className=" heading-text-gray">
                      <CornerDownRight />
                    </span>
                  </Link>
                </div>
              </div>

              {/* Vehicle */}
              <div className="Vehicle phone:hidden laptop:flex px-5 rounded-xl ">
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
            <PopupButton />
          </div>
        </div>
      </div>
      {/* <div className="bg-red-400 laptop:hidden">
        <PopupButton />
      </div> */}

      {/* Our Services */}
      <section className="Our-Services  w-full h-fit mb-20 relative inset-0 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        {/* <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div> */}
        {/* Title */}
        <div className="Title pt-10  flex flex-col justify-center items-center">
          <span className="  h-14 font-semibold text-[3rem]  heading-text-gray">
            Our Services
          </span>
        </div>

        {/* Our services card for mobile */}
        <div className="OurServices overflow-hidden relative tablet:hidden mt-10">
          <div
            className={`flex phone:flex-col transition ease-out duration-100 justify-center items-center`}
          >
            {OurServices.map((item, index) => {
              return (
                <div key={index} className="">
                  <OurServicesCard field={item} />
                </div>
              );
            })}
          </div>
        </div>

        {/* All services */}
        <div className="All-Services relative overflow-hidden phone:hidden tablet:flex flex justify-center items-center ">
          <div className="w-[90%] flex justify-center items-center pr-96">
            <OurServicesSlider />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking_And_services;
