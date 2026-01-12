import React, { useContext, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

import Home from "./Pages/Home.jsx";
import Auth from "./Pages/Auth.jsx";
import Products from "./Pages/Products.jsx";
import Categories from "./Pages/Categories.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import CartPage from "./Pages/CartPage.jsx";
import CheckoutPage from "./Pages/CheckoutPage.jsx";
import ProductDetailsPage from "./Pages/ProductDetailsPage.jsx";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import FloatingCartBtn from "./components/FloatingCartBtn.jsx";
import TitleUpdater from "./components/TitleUpdater.jsx";

import { AppContext } from "./Context/AppContext.jsx";
import { startProgress, stopProgress } from "./progressBar.js";

import { useAutoLogout } from "./hooks/useAutoLagout.js";
import { useVisitorAnalytics } from "./hooks/useVisitorAnalytics.js";

// ✅ Progress handler
function ProgressHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    startProgress();
    const timer = setTimeout(stopProgress, 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function App() {
  useAutoLogout();

  const { pathname } = useLocation();
  useVisitorAnalytics(pathname); // ✅ visitors logic separated

  const { darkMode, setDarkMode, setCartCount } = useContext(AppContext);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(storedCart.length);
    } catch {
      setCartCount(0);
    }
  }, [setCartCount]);

  return (
    <div
      className={`min-h-screen w-full relative transition-colors duration-300 ${
        darkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-green-50 via-white to-emerald-50"
      }`}
    >
      <ProgressHandler />

      {/* Dark Mode Toggle */}
      <div className="fixed bottom-4 right-4 z-[9999]">
        <button
          onClick={toggleDarkMode}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            darkMode
              ? "bg-gray-800 text-yellow-400 hover:bg-gray-700 border border-gray-600"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          }`}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <Navbar />
      <TitleUpdater />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
      </Routes>

      <Footer />
      <FloatingCartBtn />
    </div>
  );
}

export default App;
