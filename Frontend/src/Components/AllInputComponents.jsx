import {
  ChevronUp,
  ChevronDown,
  Component,
  IndianRupee,
  MapPin,
  Circle,
  CircleCheck,
} from "lucide-react";
import { useState } from "react";
import { AvailableDeliveryPartner } from "../Constants/BookingConstants";

// UI for Address Input
export const AddressInput = ({ AddressFor }) => {
  return (
    <div className={`flex flex-col w-full  `}>
      <div className="flex phone:flex-col-reverse laptop:flex-row tablet:w-1/2">
        {/* Address Section */}
        <div className="border-b-2 laptop:ml-2 pb-2 laptop:w-96 phone:w-full laptop:h-24 phone:h-fit  flex flex-wrap justify-between  ">
          <div className="Selected Address w-fit flex items-center px-5 pt-4   ">
            <span>
              <MapPin color="#0000ff" />
            </span>
            <span className="font-bold mx-2 laptop:text-lg  font-serif">
              Kathitand
            </span>
          </div>
          <button className="heading-text-gray underline phone:mr-4">
            Edit
          </button>
          <span className=" phone:w-1/2 laptop:w-full text-sm text-gray-600 pl-5 font-Exo ">
            C67J+M65, Kathitand, Ratu, Ranchi, Jharkhand 835222, India
          </span>
        </div>

        {/* title  */}
        <span className="text-xl font-serif font-bold m-auto">
          {AddressFor}'s Details
        </span>
      </div>

      {/* Input section */}
      <div className="flex tablet:flex-row tablet:flex-wrap tablet:w-[90vw] laptop:w-[87vw] phone:flex-col">
        <div className="Name w-72 m-5">
          <label className="block mb-2 text-md w-fit font-serif txt-Gray">
            {AddressFor}'s Name
          </label>
          <input
            type="text"
            className=" border-l-2 border-b-2 backdrop-blur-xl border-gray-900/30 txt-light-brown text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-900 dark:text-black drop-shadow-xl focus:outline-none"
            placeholder="Your Name"
            name={`${AddressFor}Name`}
            required
          />
        </div>

        <div className="email w-72 m-5">
          <label className="block mb-2 text-md w-fit font-serif txt-Gray">
            {AddressFor}'s Email
          </label>
          <input
            type="email"
            className="drop-shadow-xl border-l-2 border-b-2 backdrop-blur-xl border-gray-900/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none"
            placeholder="user@gmail.com"
            name={`${AddressFor}email`}
            required
          />
        </div>

        <div className="Phone w-72 m-5">
          <label className="block mb-2 text-md w-fit font-serif txt-Gray">
            {AddressFor}'s Phone Number
          </label>
          <input
            type="number"
            className="drop-shadow-xl border-l-2 border-b-2 backdrop-blur-xl border-gray-900/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black focus:outline-none"
            placeholder="9955******"
            name={`${AddressFor}phone`}
            required
          />
        </div>

        <div className="House-No w-72 m-5">
          <label className="block mb-2 text-md w-fit font-serif txt-Gray">
            {AddressFor}'s House no./Flat no.
          </label>
          <input
            type="text"
            className=" border-l-2 border-b-2 backdrop-blur-xl border-gray-900/30 txt-light-brown text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-900 dark:text-black drop-shadow-xl focus:outline-none"
            placeholder="Please enter"
            name={`${AddressFor}HouseName`}
            required
          />
        </div>
      </div>
    </div>
  );
};

export const ItemDetails = () => {
  const [productType, setProductType] = useState(null);

  return (
    <div className="laptop:w-[88vw] phone:w-full laptop:h-full  phone:h-[80vh] phone:overflow-x-scroll border  tablet:h-[40vh]">
      <div>
        <h1 className="text-xl font-serif text-center">Item Details</h1>
      </div>

      <div className="flex phone:flex-col phone:ml-4 laptop:ml-0">
        <div className="Type-of-Product w-72 m-5">
          <label
            htmlFor="TypeOfVehicle"
            className="block mb-2 text-md w-fit font-serif txt-Gray"
          >
            Type Of Vehicle
          </label>

          <select
            name="TypeOfVehicle"
            id=""
            className=" border-l-2 border-b-2 backdrop-blur-xl border-gray-900/30 txt-light-brown text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-900 dark:text-black drop-shadow-xl focus:outline-none"
            onChange={(e) => {
              setProductType(e.target.value);
            }}
          >
            <option value="none" selected disabled hidden>
              Select an Option
            </option>
            <option value="Bike">Bike</option>
            <option value="Scooty">Scooty</option>
            <option value="Pickup">Pickup</option>
            <option value="Truck">Truck</option>
          </select>
        </div>

        <div className="PackageType-and-weight tablet:flex laptop:block">
          <div className="Type-of-Product w-72 m-5">
            <label
              htmlFor="TypeOfProduct"
              className="block mb-2 text-md w-fit font-serif txt-Gray"
            >
              Type Of Product
            </label>

            <select
              name="TypeOfProduct"
              id=""
              className=" border-l-2 border-b-2 backdrop-blur-xl border-gray-900/30 txt-light-brown text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-900 dark:text-black drop-shadow-xl focus:outline-none"
              onChange={(e) => {
                setProductType(e.target.value);
              }}
            >
              <option value="none" selected disabled hidden>
                Select an Option
              </option>
              <option value="Document">Document</option>
              <option value="Hardware">Hardware</option>
              <option value="Books & Stationary">Books & Stationary</option>
              <option value="Personal Item">Personal Item</option>
              <option value="Clothes">Clothes</option>
              <option value="Household Items">Household Items</option>
            </select>
          </div>
          <div className="Weight w-72 m-5">
            <label className="block mb-2 text-md w-fit font-serif txt-Gray">
              Package Weight
            </label>
            <input
              type="text"
              className=" border-l-2 border-b-2 backdrop-blur-xl border-gray-900/30 txt-light-brown text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-900 dark:text-black drop-shadow-xl focus:outline-none"
              placeholder="in Kg"
              name="weight"
              required
            />
          </div>
        </div>

        {productType != "Document" && (
          <div className="Dimensions flex flex-wrap">
            <div className="Length w-72 m-5">
              <label className="block mb-2 text-md w-fit font-serif txt-Gray">
                Package Length
              </label>
              <input
                type="number"
                className="drop-shadow-xl border-l-2 border-b-2 backdrop-blur-xl border-gray-900/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black "
                placeholder="in cm"
                name="length"
                required
              />
            </div>
            <div className="Width w-72 m-5">
              <label className="block mb-2 text-md w-fit font-serif txt-Gray">
                Package width
              </label>
              <input
                type="number"
                className="drop-shadow-xl border-l-2 border-b-2 backdrop-blur-xl border-gray-900/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black "
                placeholder="in cm"
                name="width"
                required
              />
            </div>
            <div className="Height w-72 m-5">
              <label className="block mb-2 text-md w-fit font-serif txt-Gray">
                Package Height
              </label>
              <input
                type="number"
                className="drop-shadow-xl border-l-2 border-b-2 backdrop-blur-xl border-gray-900/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black "
                placeholder="in cm"
                name="Height"
                required
              />
            </div>
            <div className="Value w-72 mx-5">
              <label className="block mb-2 text-md w-fit font-serif txt-Gray">
                Value of the product
              </label>
              <input
                type="number"
                className="drop-shadow-xl border-l-2 border-b-2 backdrop-blur-xl border-gray-900/30 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-700 dark:text-black "
                placeholder="in Rs"
                name="value"
                required
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Estimation = () => {
  const [showPartners, setShowPartners] = useState(-100);
  const [selectedPartner, setSelectedPartner] = useState(0);

  // UI for Available Delivery partners
  const DeliveryPartner = ({ partner, index }) => {
    return (
      <div
        onClick={() => setSelectedPartner(index)}
        className=" w-5/6 flex justify-between px-2 my-2 rounded-lg hover:bg-gray-100 hover:scale-105 hover:drop-shadow-lg transition duration-150 ease-in-out"
      >
        {/* Date and time */}
        <div className="flex items-center">
          {selectedPartner === index ? (
            <span>
              <CircleCheck />
            </span>
          ) : (
            <span>
              <Circle />
            </span>
          )}

          <div className=" mx-4">
            <h2>{partner.name}</h2>
            <h2 className="text-sm text-gray-500">{partner.deliveryTime}</h2>
          </div>
        </div>

        {/* Price */}
        <div>
          <div className="flex">
            <span>
              <IndianRupee width={17} />
            </span>
            <h2>{partner.price}</h2>
          </div>
          <span className="text-xs text-gray-400">+ GST charges</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-[88vw] select-none  flex flex-col items-center justify-center">
      {/* Title */}
      <div>
        <h1 className="text-center text-xl font-serif font-bold  ">
          Estimate Expense
        </h1>
      </div>

      <div className=" h-fit laptop:w-1/2 phone:ml-  rounded-lg my-5  ">
        {/*  Date and Price */}
        <div className="flex justify-between px-4 py-2 rounded-lg border-2 ">
          {/* Date and time */}
          <div className="flex items-center">
            <span>
              <Component />
            </span>
            <div className=" mx-4">
              <h2 className="text-sm">
                {AvailableDeliveryPartner[selectedPartner]?.name}
              </h2>
              <h2 className="font-bold font-serif">
                {AvailableDeliveryPartner[selectedPartner]?.deliveryTime}
              </h2>
            </div>
          </div>

          {/* Price */}
          <div>
            <div className="flex">
              <span>
                <IndianRupee width={17} />
              </span>
              <h2>{AvailableDeliveryPartner[selectedPartner]?.price}</h2>
            </div>
            <span className="text-xs text-gray-400">+ GST charges</span>
          </div>
        </div>

        {/* Delivery Partner */}
        <div className="">
          <div className=" mt-5 mx-5 w-fit h-7 flex justify-center items-center  border-b-2">
            <h1 className="mr-5 ">All available Partner</h1>

            {/* Show and hide btn */}
            {showPartners === -100 ? (
              <button onClick={() => setShowPartners(0)}>
                <span>
                  <ChevronDown />
                </span>
              </button>
            ) : (
              <button onClick={() => setShowPartners(-100)}>
                <span>
                  <ChevronUp />
                </span>
              </button>
            )}
          </div>

          <div className="overflow-hidden ">
            <div
              className="flex flex-col items-center transition duration-700 ease-in-out"
              style={{
                transform: `translateY(${showPartners}%)`,
              }}
            >
              {AvailableDeliveryPartner.map((partner, index) => {
                return (
                  <DeliveryPartner
                    key={index}
                    index={index}
                    partner={partner}
                  />
                );
              })}
            </div>
          </div>

          {/* {showPartners && (
            <div className="flex flex-col items-center">
              {AvailableDeliveryPartner.map((partner, index) => {
                return (
                  <DeliveryPartner
                    key={index}
                    index={index}
                    partner={partner}
                  />
                );
              })}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export const ReviewPart = () => {
  return (
    <div>
      <div className="Address">
        <h2>Shipping Details </h2>
        <div>
          <div className="Pickup"></div>
          <div className="Drop"></div>
        </div>
      </div>
      <div className="Delivery-Date"></div>
      <div className="Package-Details"></div>
      <div className="Payment"></div>
      <div className="Proceed-btn"></div>
    </div>
  );
};
