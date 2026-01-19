import React, { useContext, useEffect, useState } from "react";
import {
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  User,
  MessageCircle,
} from "lucide-react";
import { AppContext } from "../Context/AppContext";
import { useLocation } from "react-router-dom";
import ContactPageLoader from "@/components/loaders/ContactPageLoader";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const { darkMode } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid.";
    }
    if (!formData.message) tempErrors.message = "Message is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
    }
  };
const {pathname}=useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  },[pathname]);

  // 🔹 Loading state
  if (loading) {
    return <ContactPageLoader darkMode={darkMode} />;
  }

  return (
    <section
      className={`px-4 py-16 transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl pt-8 mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-600 dark:text-green-400 mb-4">
          Contact Us
        </h2>
        <p
          className={`text-center mb-10 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          We're here to assist you. Feel free to get in touch.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className={`col-span-2 w-full mx-auto p-6 md:p-8 rounded-2xl shadow-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block font-medium mb-1">Full Name *</label>
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl border ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  } focus-within:ring-2 focus-within:ring-green-500`}
                >
                  <User size={18} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full bg-transparent focus:outline-none placeholder-gray-400 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium mb-1">Email *</label>
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl border ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  } focus-within:ring-2 focus-within:ring-green-500`}
                >
                  <Mail size={18} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className={`w-full bg-transparent focus:outline-none placeholder-gray-400 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-medium mb-1">Phone</label>
                <div
                  className={`flex items-center gap-3 p-3 rounded-xl border ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  } focus-within:ring-2 focus-within:ring-green-500`}
                >
                  <Phone size={18} />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Optional"
                    className={`w-full bg-transparent focus:outline-none placeholder-gray-400 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block font-medium mb-1">Message *</label>
                <div
                  className={`flex items-start gap-3 p-3 rounded-xl border ${
                    darkMode ? "border-gray-600" : "border-gray-300"
                  } focus-within:ring-2 focus-within:ring-green-500`}
                >
                  <MessageCircle size={18} className="mt-1" />
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    className={`w-full bg-transparent focus:outline-none resize-none placeholder-gray-400 ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  ></textarea>
                </div>
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition duration-300"
            >
              Send Message
            </button>
          </form>

          {/* Address Section */}
          <div
            className={`rounded-2xl shadow-xl p-6 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
              Our Office
            </h3>
            <p className="mb-2">
              <strong>Address:</strong> 123 Health Street, Lucknow, UP
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> +91 12345 67890
            </p>
            <p className="mb-4">
              <strong>Email:</strong> contact@healthcareexample.com
            </p>
            <h4 className="text-md font-semibold mb-2">Connect with us</h4>
            <div className="flex gap-4 text-green-600 dark:text-green-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <Linkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <Twitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <Instagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                className="hover:scale-110 transition-transform"
              >
                <Youtube />
              </a>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.123456789!2d80.9462!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2c123456789%3A0xabcdef123456789!2sLucknow%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sin!4v1610000000000!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
