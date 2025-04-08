import { Offer } from "../models/Offers.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const CreateOffer = asyncHandler(async (req, res) => {
  const {
    offerName,
    offerDescription,
    offerPrice,
    offerPercentage,
    offerValidity,
    audience,
  } = req.body;

  let parsedAudience;
  try {
    parsedAudience = JSON.parse(audience);
    if (!Array.isArray(parsedAudience)) {
      throw new Error("Audience must be an array");
    }
  } catch (error) {
    throw new ApiError(400, "Invalid audience format. Expected an array.");
  }

  // Validation
  if (
    !offerName ||
    !offerDescription ||
    !offerPrice ||
    !offerPercentage ||
    !offerValidity ||
    !parsedAudience
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (offerPercentage > 100)
    throw new ApiError(400, "Invalid offer Percentage");

  const now = new Date();
  const offerValidityDate = new Date(offerValidity);

  if (offerValidityDate <= now)
    throw new ApiError(400, "Invalid offer validity");

  // Create Offer
  const offer = await Offer.create({
    offerName,
    offerDescription,
    offerPrice,
    offerPercentage,
    offerValidity: offerValidityDate,
    audience: parsedAudience,
    // createdBy: req.user._id,
  });

  if (!offer) {
    throw new ApiError(
      400,
      "Failed to create offer due to some internal error! Please try again"
    );
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.createdOffers.push(offer._id);
  await user.save();

  res
    .status(201)
    .json(new ApiResponse(201, offer, "Offer created successfully"));
});

export { CreateOffer };
