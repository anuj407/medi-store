import express from "express";

import {
  getMe,
  updateMe,
  getAllUsers,
  addToCart,
  removeFromCart,
  placeOrder,
  getMyOrders,
} from "../controllers/userController.js";

import { firebaseAuth } from "../middlewares/firebaseAuth.js";
import { loadDbUser } from "../middlewares/loadDbUser.js";
import { allowRoles } from "../middlewares/allowRoles.js";

const router = express.Router();

/**
 * ✅ User Profile
 * /api/users/me
 */
router.get("/me", firebaseAuth, loadDbUser, getMe);
router.put("/me", firebaseAuth, loadDbUser, updateMe);

/**
 * ✅ Cart
 * /api/users/me/cart
 */
router.post("/me/cart", firebaseAuth, loadDbUser, addToCart);
router.delete("/me/cart/:productId", firebaseAuth, loadDbUser, removeFromCart);

/**
 * ✅ Orders
 * /api/users/me/orders
 */
router.post("/me/orders", firebaseAuth, loadDbUser, placeOrder);
router.get("/me/orders", firebaseAuth, loadDbUser, getMyOrders);

/**
 * ✅ Admin: users list
 * /api/users
 */
router.get("/", firebaseAuth, loadDbUser, allowRoles("admin"), getAllUsers);

export default router;
