"use client";

import React from "react";
import {
  FaCar,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaTools,
  FaHandshake,
} from "react-icons/fa";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <FaCar />,
      title: "Fully Mobile Service",
      desc: "We come to your home or workplace — no garage visit needed.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Local Nottingham Service",
      desc: "Operating within a 20-mile radius of NG5 5TD.",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Clear Pricing",
      desc: "No hidden costs. Diagnostics are free with any clean or service.",
    },
    {
      icon: <FaTools />,
      title: "Specialist Engine Cleaning",
      desc: "Carbon cleaning, EGR cleaning, forced regen and engine detox.",
    },
    {
      icon: <FaClock />,
      title: "Flexible Booking",
      desc: "Weekdays, Saturdays and Sunday bookings by arrangement.",
    },
    {
      icon: <FaHandshake />,
      title: "Honest & Reliable",
      desc: "Every vehicle is treated with care and attention to detail.",
    },
  ];

  return (
    <section
      id="why"
      className="bg-black text-white font-['Oswald'] py-24 px-6 md:px-12"
    >
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-14">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
            Why Choose <span className="text-red-600">Us</span>
          </h2>
          <div className="w-20 h-[2px] bg-[#C0C0C0] mt-4"></div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {reasons.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              {/* ICON */}
              <div className="text-red-600 text-2xl mt-1">
                {item.icon}
              </div>

              {/* TEXT */}
              <div>
                <h3 className="uppercase font-semibold tracking-wide text-lg">
                  {item.title}
                </h3>
                <p className="text-[#C0C0C0] text-sm mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
