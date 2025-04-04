import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: Date,
    // scopes: [String], // e.g., ['products:read', 'users:read']
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const ApiKey = mongoose.model("ApiKey", apiKeySchema);
