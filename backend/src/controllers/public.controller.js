import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";


const GetMyOrders = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("allOrders");

  if (!user) throw new ApiError(404, "User not found");

  res.status(201).json(new ApiResponse(201, user, "All Orders"));
});

const CreateOrder = asyncHandler(async (req, res) => {
  // TODO: frontend can't provide Delivery partner's details, Backend will have to set it accordingly
  const { senderData, receiverData, vehicle, productDetailsData } = req.body;

  const sender = JSON.parse(senderData);
  const receiver = JSON.parse(receiverData);
  const productDetails = JSON.parse(productDetailsData);

  console.log(sender, receiver, productDetails);

  // Validate user
  if (!req.user)
    throw new ApiError(
      500,
      "Please check the middleware because it failed in validation"
    );

  if (
    !sender.senderName ||
    !sender.senderEmail ||
    !sender.senderNumber ||
    !sender.senderAddress ||
    !sender.senderHouseNumber
  ) {
    // Validate sender details
    throw new ApiError(401, "Please provide all sender details");
  }
  if (!sender.pickupCoordinates.long || !sender.pickupCoordinates.lat) {
    throw new ApiError(401, "Please select pickup location!");
  }

  // Validate receiver details
  if (
    !receiver.receiverName ||
    !receiver.receiverEmail ||
    !receiver.receiverNumber ||
    !receiver.receiverAddress ||
    !receiver.receiverHouseNumber
  ) {
    throw new ApiError(401, "Please provide all receiver details");
  }
  if (!receiver.dropCoordinates.long || !receiver.dropCoordinates.lat) {
    throw new ApiError(401, "Please provide receiver's drop location");
  }

  // Validate vehicle
  if (!vehicle) {
    throw new ApiError(401, "Please select a vehicle");
  }

  // Validate product details
  if (
    !productDetails.productType ||
    !productDetails.productWeight ||
    !productDetails.length ||
    !productDetails.width ||
    !productDetails.height ||
    !productDetails.productValue
  ) {
    throw new ApiError(401, "Please provide complete product details");
  }

  // Create a new order
  const newOrder = await Order.create({
    user: req.user,
    sender: {
      name: sender.senderName,
      email: sender.senderEmail,
      number: sender.senderNumber,
      pickup: {
        type: "Point",
        coordinates: [
          sender.pickupCoordinates.long,
          sender.pickupCoordinates.lat,
        ],
      },
      houseNo: sender.senderHouseNumber || null,
      address: sender.senderAddress,
    },
    receiver: {
      name: receiver.receiverName,
      email: receiver.receiverEmail,
      number: receiver.receiverNumber,
      drop: {
        // lat: receiver.dropCoordinates.lat,
        // long: receiver.dropCoordinates.long,
        type: "Point",
        coordinates: [
          receiver.dropCoordinates.long,
          receiver.dropCoordinates.lat,
        ],
      },
      houseNo: receiver.receiverHouseNumber || null,
      address: receiver.receiverAddress,
    },
    vehicle,
    productDetails: {
      productType: productDetails.productType,
      productWeight: productDetails.productWeight,
      Dimension: {
        length: productDetails.length,
        width: productDetails.width,
        height: productDetails.height,
      },
      value: productDetails.productValue,
    },
    tracking: {
      current: {
        type: "Point",
        coordinates: [
          sender.pickupCoordinates.long,
          sender.pickupCoordinates.lat,
        ],
      },
    },
    status: orderStatus[0],
    paymentStatus: paymentStatus[0],
  });

  const createdOrder = await Order.findById(newOrder._id);

  if (!createdOrder)
    throw new ApiError(
      500,
      "Failed to create order due to some internal error! Please try again after some time"
    );

  const user = await User.findById(req.user._id);
  user.allOrders.push(createdOrder._id);
  await user.save();

  const allNearByDrivers = await FindNearbyDrivers(
    createdOrder.sender.pickup.coordinates
  );

  console.log(allNearByDrivers);

  PushNotification(allNearByDrivers, createdOrder);

  // Return success response
  return res
    .status(201)
    .json(
      new ApiResponse(201, { order: newOrder }, "Order created successfully")
    );
});