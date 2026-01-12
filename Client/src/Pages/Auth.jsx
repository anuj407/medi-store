import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

import { auth, googleProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { Mail, Lock, User } from "lucide-react";
import { getMe } from "@/api/userApi"; // ✅ new api

const getFirebaseError = (code) => {
  switch (code) {
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/wrong-password":
      return "Invalid email or password.";
    case "auth/user-not-found":
      return "Account not found. Please sign up.";
    case "auth/email-already-in-use":
      return "Email already registered. Please sign in.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/popup-closed-by-user":
      return "Popup closed. Please try again.";
    default:
      return "Something went wrong. Please try again.";
  }
};

const Auth = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode"); // signin/signup
  const navigate = useNavigate();

  const { darkMode, setUser, setDbUser } = useContext(AppContext);

  const [isSignup, setIsSignup] = useState(mode === "signup");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  // ✅ After firebase login, sync user with MongoDB
  const syncDbUser = async () => {
    const dbUser = await getMe(); // backend creates user if first time
    setDbUser?.(dbUser);          // optional: if you added this in context
    return dbUser;
  };

  // ✅ Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) return setError("Please enter your name.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      // ✅ Sync with backend (secure)
      const dbUser = await syncDbUser();

      setUser(user);
      setSuccess("Account created successfully!");
      navigate("/", { replace: true, state: { dbUser } });
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      const dbUser = await syncDbUser();

      setUser(user);
      setSuccess("Login successful!");
      navigate(-1, { replace: true, state: { dbUser } });
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const dbUser = await syncDbUser();

      setUser(user);
      setSuccess(`Welcome, ${user.displayName || "User"}!`);
      navigate(-1, { replace: true, state: { dbUser } });
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/auth-banner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div
        className={`relative w-[22rem] md:w-[26rem] px-6 py-8 rounded-2xl shadow-xl border
        ${darkMode ? "bg-gray-900/85 text-white" : "bg-white/95 text-black"}`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {error && <p className="text-red-500 text-center text-sm mb-3">{error}</p>}
        {success && <p className="text-green-500 text-center text-sm mb-3">{success}</p>}

        <form className="space-y-4" onSubmit={isSignup ? handleSignup : handleLogin}>
          {isSignup && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>

          {isSignup && (
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow hover:scale-[1.02] transition disabled:opacity-60"
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-400" />
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-400" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2 flex items-center justify-center gap-2 border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-60"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span>{loading ? "Please wait..." : "Continue with Google"}</span>
        </button>

        <div className="text-center text-sm mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            className="ml-1 text-green-500 font-medium hover:underline"
            onClick={() => {
              setIsSignup((prev) => !prev);
              setError("");
              setSuccess("");
            }}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
