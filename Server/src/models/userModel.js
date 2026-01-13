import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, trim: true },
    phone: { type: String, trim: true },
    line1: { type: String, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pincode: { type: String, trim: true },
    country: { type: String, default: "India" },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, "Quantity must be at least 1"],
      max: [999, "Quantity too large"],
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    // ✅ Firebase unique identity
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    name: { type: String, trim: true, default: "" },

    // ✅ email optional, because Firebase phone auth users may not have email
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true, // allows multiple docs without email
    },

    profile: { type: String, default: "" },

    phone: { type: String, trim: true, default: "" },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      index: true,
    },

    isBlocked: { type: Boolean, default: false }, // ✅ useful in future

    addresses: [addressSchema], // ✅ scalable address system

    cart: [cartItemSchema],

    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order", index: true }],
  },
  { timestamps: true }
);


export default mongoose.model("User", userSchema);
