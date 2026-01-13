import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export const useAutoLogout = () => {
  useEffect(() => {
    const updateActivity = () => {
      localStorage.setItem("lastActivity", Date.now().toString());
    };

    // ✅ Mark activity on important events
    const events = ["click", "mousemove", "keydown", "scroll", "touchstart"];

    events.forEach((event) => window.addEventListener(event, updateActivity, { passive: true }));

    // ✅ Initialize activity timestamp if not exists
    if (!localStorage.getItem("lastActivity")) updateActivity();

    const checkSession = async () => {
      const last = Number(localStorage.getItem("lastActivity") || 0);
      const now = Date.now();

      // ✅ If user is logged in AND inactive > 7 days => logout
      if (auth.currentUser && now - last > ONE_WEEK_MS) {
        await signOut(auth);
        localStorage.removeItem("lastActivity");
      }
    };

    // ✅ check when app loads
    checkSession();

    // ✅ check every 1 hour (optional)
    const interval = setInterval(checkSession, 60 * 60 * 1000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, updateActivity));
      clearInterval(interval);
    };
  }, []);
};
