import React, { useContext, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AppContext } from "@/Context/AppContext";
import { useLocation } from "react-router-dom";
import AboutPageLoader from "@/components/loaders/AboutLoader";

const whyUsData = [
  {
    img: "https://cdn-icons-png.flaticon.com/512/3209/3209033.png",
    title: "Certified Medications",
    desc: "All our products are 100% authentic, sourced from licensed manufacturers and thoroughly vetted by professionals.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
    title: "24/7 Support",
    desc: "Whether it's late-night queries or dosage doubts, our support team is here to assist you anytime, anywhere.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/1048/1048941.png",
    title: "Fast & Discreet Shipping",
    desc: "We ensure quick delivery in discreet packaging to protect your privacy and save your time.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/3050/3050525.png",
    title: "Affordable Pricing",
    desc: "Get premium medications at competitive prices with regular discounts and loyalty rewards.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/2630/2630646.png",
    title: "Wide Product Range",
    desc: "From anxiety to weight loss, our extensive product catalog covers all essential health categories.",
  },
  {
    img: "https://cdn-icons-png.flaticon.com/512/609/609803.png",
    title: "Easy Online Ordering",
    desc: "A user-friendly interface ensures a smooth and hassle-free ordering process from start to finish.",
  },
];

const AboutPage = () => {

  const faqs = [
    {
      question: "How long does shipping take?",
      answers: [
        "Standard shipping takes 3-7 business days.",
        "Expedited shipping options are available at checkout.",
        "Shipping times may vary based on location and product availability.",
      ],
    },
    {
      question: "Is my personal information secure?",
      answers: [
        "Yes, we use industry-grade SSL encryption.",
        "We never share or sell customer data.",
        "Your payment details are processed via trusted gateways.",
      ],
    },
    {
      question: "What is your return policy?",
      answers: [
        "Returns are accepted within 14 days of delivery.",
        "Items must be unused and in original packaging.",
        "Refunds are processed within 5-7 working days.",
      ],
    },
    {
      question: "Do I need a prescription for all products?",
      answers: [
        "Some medications do require a valid prescription.",
        "Over-the-counter products are available without prescriptions.",
        "You will be notified at checkout if a prescription is needed.",
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const { darkMode } = useContext(AppContext);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const cardsRef = useRef([]);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              if (!prev.includes(index)) return [...prev, index];
              return prev;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    cardsRef.current.forEach((ref) => ref && observer.observe(ref));

    return () => {
      cardsRef.current.forEach((ref) => ref && observer.unobserve(ref));
    };
  }, []);

  const {pathname}=useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    },[pathname]);

  const [aboutLoading, setAboutLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAboutLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (aboutLoading) return <AboutPageLoader darkMode={darkMode} />;

  return (
    <div className={`font-sans ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Section 1 - About Us */}
      <section
        className={`relative py-20 px-6 md:px-12 transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-r from-blue-50 to-teal-100 text-gray-800"
        }`}
      >
        <div className="max-w-7xl pt-10 mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-5xl font-extrabold leading-tight">Empowering Better Health</h2>
            <p className="text-lg">
              At <strong>MediCare</strong>, we’re driven by one mission — making healthcare accessible, affordable, and
              authentic.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="p-2 bg-blue-600 text-white rounded-full">🧪</span>
                <span>Advanced research-backed formulations tailored to modern lifestyles.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-2 bg-green-600 text-white rounded-full">🚚</span>
                <span>Rapid and discreet delivery across all serviceable regions.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-2 bg-purple-600 text-white rounded-full">🛡️</span>
                <span>Strict compliance with international pharmaceutical quality standards.</span>
              </li>
            </ul>
            <a
              href="/shop"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
              Explore Our Products
            </a>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://plus.unsplash.com/premium_photo-1672759455907-bdaef741cd88?q=80&w=2016&auto=format&fit=crop"
              alt="Pharmacy Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2 - Why Us */}
      <section
        className={`py-20 px-6 md:px-12 transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-blue-50 to-teal-100 text-gray-800"
        }`}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">Why Choose Us?</h2>
          <p className="max-w-2xl mx-auto text-base">Trusted healthcare solutions built around your well-being.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {whyUsData.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => (cardsRef.current[idx] = el)}
              data-index={idx}
              className={`transform transition-all duration-700 ease-out ${
                visibleCards.includes(idx) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              } ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} 
              rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700`}
            >
              <div className="flex justify-center mb-5">
                <img src={item.img} alt={item.title} className="w-12 h-12 object-contain" />
              </div>
              <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 - FAQ */}
      <section className={`py-16 px-4 ${darkMode ? "bg-gray-900 text-white" : "bg-indigo-50 text-gray-900"}`}>
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-3">Frequently Asked Questions</h2>
          <p>Clear answers to your most common queries</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-lg shadow-sm border transition-all ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {activeIndex === i ? <ChevronUp className="w-5 h-5 text-indigo-500" /> : <ChevronDown className="w-5 h-5 text-indigo-500" />}
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                    activeIndex === i ? "max-h-96 py-4" : "max-h-0"
                  }`}
                >
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    {faq.answers.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <img
              src="https://img.freepik.com/premium-vector/faq-icon-line-art-logo-set_1223784-17794.jpg"
              alt="FAQ illustration"
              className="w-full max-w-sm object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
