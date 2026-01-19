import React, { useContext, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { AppContext } from "../Context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { getCart, updateCartItem, removeCartItem } from "../api/cartApi";
import CartPageLoader from "@/components/loaders/CartPageLoader";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const { darkMode, setCartCount, user } = useContext(AppContext);
  const [cartId, setCartId] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      if (!user?.uid) return;
      try {
        const data = await getCart(user.uid); // ✅ use uid
        setCartId(data._id);
        setCartItems(data.items || []);
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [user]);
  const {pathname}=useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    },[pathname]);

  // 🔹 Update quantity
  const updateQuantity = async (productId, amount) => {
    if (!user?.uid) return;
    const item = cartItems.find((i) => i.productId._id === productId);
    if (!item) return;

    const newQty = Math.max(1, item.quantity + amount);

    try {
      const updatedCart = await updateCartItem(user.uid, productId, newQty);
      setCartItems(updatedCart.items || []);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // 🔹 Remove item
  const removeItem = async (productId) => {
    if (!user?.uid) return;
    try {
      const updatedCart = await removeCartItem(cartId, productId);
      setCartItems(updatedCart?.cart?.items || []);
      console.log("updatedCart",updatedCart);
      
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // 🔹 Sync cart count
  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems, setCartCount]);

  // 🔹 Price helper
  const parsePrice = (price) => {
    if (!price) return 0;
    if (typeof price === "number") return price;
    const numeric = parseFloat(price.toString().replace(/[^0-9.]/g, ""));
    return isNaN(numeric) ? 0 : numeric;
  };

  // 🔹 Total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.productId?.price) * item.quantity,
    0
  );
  
  // 🔹 Loading state
  if (loading) {
    return <CartPageLoader darkMode={darkMode} />;
  }
  return (
    <section
      className={`px-4 sm:px-6 lg:px-8 py-10 sm:py-16 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-600 dark:text-green-400 mb-8 sm:mb-10">
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p
            className={`text-center text-lg sm:text-xl font-medium ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Your cart is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.productId._id}
                  className={`flex relative flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl shadow-md ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <img
                    src={item.productId?.image}
                    alt={item.productId?.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-xl"
                  />
                  <div className="flex-1 w-full text-center sm:text-left">
                    <h4 className="font-semibold text-lg mb-1">
                      {item.productId?.name}
                    </h4>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      ${parsePrice(item.productId?.price).toFixed(2)} per unit
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex flex-col sm:flex-row sm:items-center mt-3 gap-3">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <button
                          className="px-2 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700"
                          onClick={() => updateQuantity(item.productId._id, -1)}
                        >
                          −
                        </button>
                        <span className="px-3 font-medium">
                          {item.quantity}
                        </span>
                        <button
                          className="px-2 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700"
                          onClick={() => updateQuantity(item.productId._id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.productId._id)}
                    className="absolute right-4 top-4 text-red-500 hover:text-red-600"
                    title="Remove"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div
              className={`rounded-2xl shadow-md p-6 h-fit ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">
                Order Summary
              </h3>
              <div className="flex justify-between mb-2">
                <span>Total Items:</span>
                <span>{cartItems.reduce((a, b) => a + b.quantity, 0)}</span>
              </div>
              <div className="flex justify-between font-medium text-lg mb-6">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
