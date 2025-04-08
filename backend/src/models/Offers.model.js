import mongoose, { Schema } from "mongoose";

const offerSchema = new Schema(
  {
    offerName: {
      type: String,
      required: true,
    },
    offerDescription: {
      type: String,
      required: true,
    },
    offerPrice: {
      type: Number,
      min: 0,
      max: 500, // Assuming the max price is Rs 500
      validate: {
        validator: Number.isInteger,
        message: "Offer price must be an integer",
      },
    },
    offerPercentage: {
      type: Number,
      min: 0,
      max: 100, // Ensure percentage is valid
    },
    offerValidity: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "Offer validity must be a future date",
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensure every offer is linked to a user
    },
    audience: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true, // Ensure audience references are valid users
      },
    ],
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

export const Offer = mongoose.model("Offer", offerSchema);
