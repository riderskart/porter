import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  Circle,
  IndianRupee,
  Component,
} from "lucide-react";
import Input from "../../Components/Input";
import Label from "../../Components/Label";
import ButtonWrapper from "../../Components/Buttons";
import { AvailableDeliveryPartner } from "../../Constants/BookingConstants";
import { alertError, alertSuccess } from "../../utility/Alert";
import { parseErrorMessage } from "../../utility/ErrorMessageParser";
import { FetchData } from "../../utility/fetchFromAPI";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/Booking/BookingBackground.jpg";

const formSections = [
  "Sender's Details",
  "Receiver's Details",
  "Product Details",
  // "Estimation Details",
  "Review Page",
];

export default function BookingInput() {
  // variables
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedPartner, setSelectedPartner] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  //  const [productType, setProductType] = useState("");
  const formRef = useRef(null);
  const [sender, setSender] = useState({
    senderName: "",
    senderAddress: "Kathitand",
    pickupCoordinates: {
      lat: 23.412493937013437,
      long: 85.22944063510043,
    },
    senderNumber: Number,
    senderEmail: "",
    senderHouseNumber: "",
  });

  const [receiver, setReceiver] = useState({
    receiverName: "",
    receiverAddress: "Lalpur",
    dropCoordinates: {
      lat: 23.378967662926954,
      long: 85.31496329095134,
    },
    receiverPhone: Number,
    receiverEmail: "",
    receiverHouseNumber: "",
  });

  const [itemDetails, setItemDetails] = useState({
    TypeOfVehicle: "",
    productType: "",
    productWeight: Number,
    length: Number,
    width: Number,
    height: Number,
    productValue: Number,
  });

  // Utilities functions
  const nextSection = async (currentForm) => {
    const formData = new FormData(formRef.current);

    // Check if the fields are empty or not
    for (let [key, value] of formData.entries()) {
      if (!value.trim()) {
        alert(`${key} is required`); // If any field is empty
        return;
      }
    }

    if (currentForm === 0) {
      setSender((prevState) => ({
        ...prevState, // Spread the previous state in case you want to retain other fields
        ...Object.fromEntries(formData), // Spread the formData to overwrite the corresponding values
      }));
    } else if (currentForm === 1) {
      setReceiver((prevState) => ({
        ...prevState, // Spread the previous state in case you want to retain other fields
        ...Object.fromEntries(formData), // Spread the formData to overwrite the corresponding values
      }));
    } else if (currentForm === 2) {
      setItemDetails((prevState) => ({
        ...prevState, // Spread the previous state in case you want to retain other fields
        ...Object.fromEntries(formData), // Spread the formData to overwrite the corresponding values
      }));
    }

    if (currentSection < formSections.length - 1) {
      setDirection(1);
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setDirection(-1);
      setCurrentSection(currentSection - 1);
    }
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };
  const Navigate = useNavigate();

  const HandleAllOrders = () => {
    Navigate("/all-orders");
  };

  const HandelSubmit = async () => {
    const formData = new FormData(formRef.current);

    // //console.log(sender);
    // Append data from all objects to the FormData
    formData.append("senderData", JSON.stringify(sender));
    formData.append("receiverData", JSON.stringify(receiver));
    formData.append("vehicle", itemDetails.TypeOfVehicle);
    formData.append("productDetailsData", JSON.stringify(itemDetails));

    for (let [key, value] of formData.entries()) {
      // //console.log(key, value);
    }

    try {
      const response = await FetchData(
        "order/create-new-order",
        "post",
        formData
      );

      //console.log(response);

      alertSuccess(response.data.message);
      HandleAllOrders();
    } catch (error) {
      //console.log(error);
      // alertError(parseErrorMessage(error.response.data));
    }
  };

  // UI for Different forms
  function SenderDetails() {
    return (
      <div className="">
        {/* Form Heading and address */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{formSections[currentSection]}</h2>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{sender.senderAddress}</span>
            <button className="ml-2 text-blue-500 hover:underline">Edit</button>
          </div>
        </div>

        {/* Form */}
        <div className="grid laptop:grid-cols-4 phone:grid-cols-1 tablet:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="senderName">Sender's Name</Label>
            <Input
              id="senderName"
              placeholder="Your Name"
              name={"senderName"}
            />
          </div>
          <div>
            <Label htmlFor="senderEmail">Sender's Email</Label>
            <Input
              id="senderEmail"
              type="email"
              placeholder="user@gmail.com"
              name={"senderEmail"}
            />
          </div>
          <div>
            <Label htmlFor="senderPhone">Sender's Phone Number</Label>
            <Input
              id="senderPhone"
              type="number"
              placeholder="9955******"
              name={"senderNumber"}
            />
          </div>
          <div>
            <Label htmlFor="senderHouseNumber">Sender's Address</Label>
            <Input
              id="senderHouseNumber"
              placeholder="Please enter"
              name={"senderHouseNumber"}
            />
          </div>
        </div>
      </div>
    );
  }

  function ReceiverDetails() {
    return (
      <div>
        {/* Form Heading and address */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{formSections[currentSection]}</h2>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{receiver.receiverAddress}</span>
            <button className="ml-2 text-blue-500 hover:underline">Edit</button>
          </div>
        </div>

        {/* Form */}
        <div className="grid laptop:grid-cols-4 phone:grid-cols-1 tablet:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="receiverName">Receiver's Name</Label>
            <Input
              id="receiverName"
              placeholder="Receiver's Name"
              name={"receiverName"}
            />
          </div>
          <div>
            <Label htmlFor="receiverEmail">Receiver's Email</Label>
            <Input
              id="receiverEmail"
              type="email"
              placeholder="receiver@gmail.com"
              name={"receiverEmail"}
            />
          </div>
          <div>
            <Label htmlFor="receiverPhone">Receiver's Phone Number</Label>
            <Input
              id="receiverPhone"
              type="number"
              placeholder="Phone Number"
              name={"receiverNumber"}
            />
          </div>
          <div>
            <Label htmlFor="recieverHouseNumber">Receiver's Address</Label>
            <Input
              id="receiverHouseNumber"
              placeholder="Full Address"
              name={"receiverHouseNumber"}
            />
          </div>
        </div>
      </div>
    );
  }

  function ProductDetails() {
    return (
      <div>
        {/* Form Heading  */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{formSections[currentSection]}</h2>
        </div>

        <div className="grid phone:grid-cols-1 tablet:grid-cols-2 gap-4 laptop:flex laptop:justify-evenly laptop:items-start">
          {/* Vehicle Type */}
          <div>
            <div>
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <select
                name="TypeOfVehicle"
                id="vehicleType"
                className="border-gray-900/30 border txt-light-brown text-sm rounded-lg block phone:w-5/6 p-2.5 dark:placeholder-gray-900 dark:text-black drop-shadow-xl focus:outline-none flex justify-center items-center laptop:w-40 laptop:mt-5"
                value={vehicleType} // Bind to state
                onChange={(e) => setVehicleType(e.target.value)} // Update state on change
              >
                <option value="" disabled hidden>
                  Select an Option
                </option>
                <option value="Bike">Bike</option>
                <option value="Scooty">Scooty</option>
                <option value="Pickup">Pickup</option>
                <option value="Truck">Truck</option>
              </select>
            </div>
            <div className="laptop:block phone:hidden mt-10">
              <Label htmlFor="productType">Product Type</Label>
              <select
                name="productType"
                id="productType"
                className="border-gray-900/30 border txt-light-brown text-sm rounded-lg block phone:w-5/6 p-2.5 dark:placeholder-gray-900 dark:text-black drop-shadow-xl focus:outline-none flex justify-center items-center laptop:w-40 laptop:mt-5"
                defaultValue="none"
              >
                <option value="none" disabled hidden>
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
          </div>

          {/* Product type */}
          <div className="laptop:hidden phone:block">
            <Label htmlFor="productType">Product Type</Label>
            <select
              name="productType"
              id="productType"
              className="border-gray-900/30 border txt-light-brown text-sm rounded-lg block w-5/6 p-2.5 dark:placeholder-gray-900 dark:text-black drop-shadow-xl focus:outline-none flex justify-center items-center"
              defaultValue="none"
            >
              <option value="none" disabled hidden>
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

          {/* weight */}
          <div>
            <Label htmlFor="productWeight">Product Weight (kg)</Label>
            <Input
              id="productWeight"
              type="number"
              placeholder="Weight in kg"
              name={"productWeight"}
            />
          </div>

          {/* Dimensions */}
          <div>
            <Label htmlFor="productDimensions">Product Dimensions (cm)</Label>

            <Input
              id="length"
              type="number"
              placeholder="Length"
              name={"length"}
            />

            <Input
              id="width"
              type="number"
              placeholder="Width "
              name={"width"}
            />

            <Input
              id="height"
              type="number"
              placeholder="Height"
              name={"height"}
            />
          </div>

          {/* Value */}
          <div>
            <Label htmlFor="productValue">Product Value (₹) (optional)</Label>
            <Input
              id="productValue"
              type="number"
              placeholder="Value in Rupees"
              name={"productValue"}
            />
          </div>
        </div>
      </div>
    );
  }

  function EstimationDetails() {
    const partnersRef = useRef(null); // Reference to the partners list container

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
      <div className="w-[88vw] select-none flex flex-col items-center justify-center">
        {/* Title */}
        <div>
          <h1 className="text-center text-xl font-Fredoka ">
            Estimate Expense
          </h1>
        </div>

        <div className="h-fit laptop:w-1/2 rounded-lg my-5">
          {/* Date and Price */}
          <div className="flex justify-between px-4 py-2 rounded-lg border-2">
            {/* Date and time */}
            <div className="flex items-center">
              <span>
                <Component />
              </span>
              <div className="mx-4">
                <h2 className="text-sm">
                  {AvailableDeliveryPartner[selectedPartner]?.name}
                </h2>
                <h2 className="font-Fredoka">
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
          <div>
            <div className="mt-5 mx-5 w-fit h-7 flex justify-center items-center border-b-2">
              <h1 className="mr-5">All available Partners</h1>
            </div>

            {/* Container with ref to manipulate height */}
            <motion.div
              ref={partnersRef} // Reference to the container
              initial={{ height: 0 }}
              animate={{ height: "auto" }} // Let Framer Motion handle the animation
              className="overflow-hidden"
              style={{ height: 0 }} // Default height set to 0 (hidden)
            >
              <div className="flex flex-col items-center">
                {AvailableDeliveryPartner.map((partner, index) => (
                  <DeliveryPartner
                    key={index}
                    index={index}
                    partner={partner}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  function ReviewPage() {
    return (
      <div className="laptop:flex phone:flex phone:flex-col laptop:flex-row">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{formSections[currentSection]}</h2>
        </div>
        <div className="flex laptop:flex-row phone:flex-col">
          <section className="Shipment-details flex  border-b-2 pb-2 flex-col mr-40 ">
            {/* Name, number and address */}
            <div className="Sender  w-full h-fit p-4 flex  justify-between border-r-2  ">
              <div className=" w-[90%] h-fit ">
                <div className="flex gap-2">
                  <h2 className="text-lg font-serif">{sender?.senderName}</h2>
                  <span className="text-gray-400">{sender?.senderNumber}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">
                    House Number:{" "}
                    {sender.senderHouseNumber + ", " + sender.senderAddress}
                  </span>
                </div>
              </div>
            </div>
            <div className="Reciever  w-full h-fit p-4 flex justify-between  ">
              {/* Name, number and address */}
              <div className=" w-[90%] h-fit ">
                <div className="flex gap-2 flex-row">
                  <h2>{receiver?.receiverName}</h2>
                  <span className="text-gray-400">
                    {receiver?.receiverAddress}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">
                    House Number:{" "}
                    {receiver.receiverHouseNumber +
                      ", " +
                      receiver.receiverAddress}
                  </span>
                </div>
              </div>
              {/* Edit btn */}
              {/* <div>
                <button className="heading-text-gray hover:underline transition duration-300 ease-in-out">
                  Edit
                </button>
              </div> */}
            </div>
          </section>
          <section className="Item-Details flex justify-between mt-5 border-b-2 pb-2 mr-40">
            {/* Details */}
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg ">
                  Type of Parcel: {itemDetails.productType} 
                </h3>
                <h3>weight: {itemDetails.productWeight} kg</h3>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg ">
                  volume:{" "}
                  <span className="font-exo font-bold">
                    {itemDetails.length *
                      itemDetails.width *
                      itemDetails.height}{" "}
                  </span>
                  <span className="text-sm font-Exo"> cubic cm </span>
                </h3>
                <h3>worth: {itemDetails.productValue}</h3>
              </div>
            </div>
            {/* Edit btn */}
            {/* <div>
              <button className="heading-text-gray hover:underline transition duration-300 ease-in-out">
                Edit
              </button>
            </div> */}
          </section>
          <section className="Date-and-payment-details  mt-5 border-b-2 pb-2">
            <h2>Final checkout</h2>
            <div>
              {/* Shipment date, partner and price */}
              <div className="flex justify-between items-center px-4 py-2 rounded-lg ">
                {/* Date and time */}
                <div className="flex items-center">
                  <div className="mx-4">
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
                </div>
              </div>
              {/* External charges */}
              <div className="px-7">
                {/* CGST */}
                <div className="flex justify-between">
                  <h4>CGST @ 9%</h4>
                  <div>
                    <div className="flex">
                      <span>
                        <IndianRupee width={17} />
                      </span>
                      <h2>10</h2>
                    </div>
                  </div>
                </div>

                {/* SGST/UTGST */}
                <div className="flex justify-between">
                  <h4>SGST/UTGST @ 9%</h4>
                  <div>
                    <div className="flex">
                      <span>
                        <IndianRupee width={17} />
                      </span>
                      <h2>10</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between px-7 mt-2">
              <span className="text-lg font-bold font-serif">Total</span>
              <div>
                <div className="flex">
                  <span>
                    <IndianRupee width={17} />
                  </span>
                  <h2 className="text-lg font-bold font-serif">130</h2>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-full phone:h-fit   ">
      <div className="absolute h-[40vh] overflow-hidden phone:hidden laptop:block">
        <img src={BackgroundImage} className=" w-full " />
      </div>
      <div className="laptop:h-80 relative w-full z-50">
        <div className=" phone:max-w-[90vw] laptop:max-w-[80vw] laptop:absolute bottom-20 laptop:mx-40 phone:mx-20 p-6 backdrop-blur-2xl rounded-lg shadow-lg phone:h-fit phone:top-4 phone:mb-10 laptop:-top-40">
          <form ref={formRef} action="">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentSection}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "tween", duration: 0.5 }}
              >
                {currentSection === 0 && <SenderDetails />}
                {currentSection === 1 && <ReceiverDetails />}
                {currentSection === 2 && <ProductDetails />}
                {currentSection === 3 && <ReviewPage />}
              </motion.div>
            </AnimatePresence>
          </form>

          {/* previous and next btn  */}
          <div className="mt-6 flex justify-between">
            {currentSection === 3 ? (
              <ButtonWrapper
                onClick={async (e) => {
                  e.preventDefault();
                  await nextSection(currentSection);
                  HandelSubmit();
                }}
                // disabled={currentSection === formSections.length - 1}
              >
                <div className="flex justify-center items-center">
                  Book Shipment
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </ButtonWrapper>
            ) : (
              <ButtonWrapper
                onClick={() => {
                  nextSection(currentSection);
                }}
                // disabled={currentSection === formSections.length - 1}
              >
                <div className="flex justify-center items-center">
                  save & Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </ButtonWrapper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
