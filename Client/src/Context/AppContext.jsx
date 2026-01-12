/* eslint-disable react-refresh/only-export-components */
import { getProducts } from "@/api/productApi";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
   const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
   const[products, setProducts]=useState([]);
   const [cart, setCart] = useState(null);
   const [cartCount, setCartCount] = useState(0);
   const [user, setUser] = useState(null);
   const [dbUser, setDbUser] = useState(null);

     // ✅ Fetch products from backend and save in AppContext
     useEffect(() => {
       const fetchProducts = async () => {
         try {
           const res = await getProducts();
           const fetched = Array.isArray(res?.data) ? res.data : [];
           setProducts(fetched);
         } catch (err) {
           console.error("Error fetching products:", err);
           setProducts([]); // fallback empty
         }
       };
       fetchProducts();
     }, [setProducts]);
   
  return (
    <AppContext.Provider value={{
      darkMode,
      setDarkMode,
      cartCount,
      setCartCount,
      user,
      setUser,
      products,
      setProducts,
      cart,
      setCart,
      dbUser,
      setDbUser
    }}>
      {children}
    </AppContext.Provider>
  )
}