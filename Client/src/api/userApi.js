// src/api/userApi.js
import axios from "axios";
import { auth } from "../firebase"; // update path if needed

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

/**
 * ✅ Attach Firebase ID token to every request
 * Best practice: backend never trusts uid from frontend
 */
API.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken(); // Firebase auto refreshes
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Get logged-in user profile (Auto-create Mongo user if first login)
export const getMe = async () => {
  const { data } = await API.get("/users/me");
  return data;
};

// ✅ Update logged-in user profile
export const updateMe = async (updateData) => {
  const { data } = await API.put("/users/me", updateData);
  return data;
};

// ✅ Add item to cart
export const addToCart = async (productId, quantity = 1) => {
  const { data } = await API.post("/users/me/cart", { productId, quantity });
  return data;
};

// ✅ Remove item from cart
export const removeFromCart = async (productId) => {
  const { data } = await API.delete(`/users/me/cart/${productId}`);
  return data;
};

// ✅ Place order (backend calculates total securely)
export const placeOrder = async (orderData) => {
  const { data } = await API.post("/users/me/orders", orderData);
  return data;
};

// ✅ Get my orders
export const getMyOrders = async () => {
  const { data } = await API.get("/users/me/orders");
  return data;
};
