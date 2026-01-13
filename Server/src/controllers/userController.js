import mongoose from "mongoose";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

// ✅ Helper: pick allowed fields only
const pick = (obj, allowed) => {
  const result = {};
  for (const key of allowed) {
    if (obj[key] !== undefined) result[key] = obj[key];
  }
  return result;
};

/**
 * ✅ Get current logged-in user (auto create if first login)
 * Route: GET /api/users/me
 */
export const getMe = async (req, res) => {
  try {
    const firebaseUid = req.auth.uid;
    const email = req.auth.email || "";
    const name = req.auth.name || "";
    const profile = req.auth.picture || "";

    let user = await User.findOne({ firebaseUid });

    // create if not exists
    if (!user) {
      user = await User.create({
        firebaseUid,
        name: name || email.split("@")[0],
        email,
        profile,
        role: "user",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error: error.message });
  }
};

/**
 * ✅ Update profile (only allowed fields)
 * Route: PUT /api/users/me
 */
export const updateMe = async (req, res) => {
  try {
    const firebaseUid = req.auth.uid;

    const updateData = pick(req.body, ["name", "profile", "phone", "address"]);

    const user = await User.findOneAndUpdate(
      { firebaseUid },
      { $set: updateData },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

/**
 * ✅ Get all users (admin)
 * Route: GET /api/users
 */
export const getAllUsers = async (req, res) => {
  try {
    // req.dbUser.role should be checked by middleware already
    const users = await User.find().select("-cart -orders").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

/**
 * ✅ Add item to cart
 * Route: POST /api/users/me/cart
 */
export const addToCart = async (req, res) => {
  try {
    const firebaseUid = req.auth.uid;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const qty = Number(quantity);
    if (!qty || qty < 1) {
      return res.status(400).json({ message: "Quantity must be >= 1" });
    }

    const product = await Product.findById(productId).select("_id");
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findOne({ firebaseUid });
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      user.cart.push({ productId, quantity: qty });
    }

    await user.save();
    res.json({ message: "Added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error: error.message });
  }
};

/**
 * ✅ Remove item from cart
 * Route: DELETE /api/users/me/cart/:productId
 */
export const removeFromCart = async (req, res) => {
  try {
    const firebaseUid = req.auth.uid;
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    const user = await User.findOne({ firebaseUid });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter((item) => item.productId.toString() !== productId);
    await user.save();

    res.json({ message: "Removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error: error.message });
  }
};

/**
 * ✅ Place order from user's cart (professional way)
 * Route: POST /api/users/me/orders
 */
export const placeOrder = async (req, res) => {
  try {
    const firebaseUid = req.auth.uid;
    const { shippingAddress, paymentMethod } = req.body;

    const user = await User.findOne({ firebaseUid }).populate("cart.productId");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.cart.length) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // ✅ compute total from DB
    let totalAmount = 0;
    const items = user.cart.map((c) => {
      const price = Number(c.productId.price || 0);
      totalAmount += price * c.quantity;

      return {
        productId: c.productId._id,
        quantity: c.quantity,
        priceAtPurchase: price,
      };
    });

    const order = await Order.create({
      userId: user._id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: "pending",
    });

    user.orders.push(order._id);
    user.cart = [];
    await user.save();

    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error: error.message });
  }
};

/**
 * ✅ Get orders of logged-in user
 * Route: GET /api/users/me/orders
 */
export const getMyOrders = async (req, res) => {
  try {
    const firebaseUid = req.auth.uid;

    const user = await User.findOne({ firebaseUid }).populate({
      path: "orders",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "items.productId",
        model: "Product",
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: error.message });
  }
};
