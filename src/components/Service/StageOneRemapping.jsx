"use client";

import React, { useState, useEffect } from "react";
import { Zap, TrendingUp, Gauge, Leaf, DollarSign } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function StageOneRemapping() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      easing: "ease-out-quart",
    });

    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = (index) => {
    if (isMobile) setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#050505]"
      id="services"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <span
            className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 
              text-xs font-medium bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/40 mb-4
              shadow-[0_0_8px_#EF4444]/40"
          >
            ECU Optimisation – Stage 1
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#C0C0C0] mb-4">
            Stage 1 ECU Remapping
          </h2>

          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto">
            Safe software optimisation designed to improve engine performance or fuel
            efficiency with no hardware modifications.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* PERFORMANCE CARD */}
          <Card
            index={0}
            activeIndex={activeIndex}
            isMobile={isMobile}
            handleClick={handleClick}
            icon={<Zap />}
            title="Performance Optimisation"
            description="A Stage 1 ECU remap focused on increasing power and torque while maintaining factory safety limits and engine reliability."
            benefits={[
              { icon: <TrendingUp />, text: "Increased horsepower and torque" },
              { icon: <Zap />, text: "Improved throttle response" },
              { icon: <Gauge />, text: "Stronger mid-range acceleration" },
              { icon: <Zap />, text: "Smooth and controlled power delivery" },
            ]}
            perfectFor={[
              "Drivers wanting improved performance",
              "Vehicles with standard hardware",
              "Safe ECU tuning without mechanical changes",
            ]}
          />

          {/* ECONOMY CARD */}
          <Card
            index={1}
            activeIndex={activeIndex}
            isMobile={isMobile}
            handleClick={handleClick}
            icon={<Leaf />}
            title="Economy Optimisation"
            description="A fuel-efficiency focused Stage 1 remap that optimises engine mapping to reduce fuel consumption while keeping smooth drivability."
            benefits={[
              { icon: <DollarSign />, text: "Improved fuel economy" },
              { icon: <Leaf />, text: "Reduced fuel consumption" },
              { icon: <Gauge />, text: "Smoother low RPM driving" },
              { icon: <DollarSign />, text: "Lower running costs" },
            ]}
            perfectFor={[
              "Daily commuting vehicles",
              "High mileage drivers",
              "Customers focused on fuel savings",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

/* REUSABLE CARD */
function Card({
  index,
  activeIndex,
  isMobile,
  handleClick,
  icon,
  title,
  description,
  benefits,
  perfectFor,
}) {
  const isActive = activeIndex === index;

  return (
    <div
      onClick={() => handleClick(index)}
      data-aos="fade-up"
      data-aos-delay={index * 150}
      className={`group flex flex-col gap-6 rounded-xl border py-6 
        bg-[#111111] transition-all duration-300 cursor-pointer relative overflow-hidden
        ${
          isMobile
            ? isActive
              ? "border-[#EF4444]/80 shadow-[0_0_25px_#EF4444]/60"
              : "border-[#3F3F46]"
            : "border-[#3F3F46] hover:border-[#EF4444]/70 hover:shadow-[0_0_25px_#EF4444]/40"
        }`}
    >
      {/* Red Glow Background */}
      <div
        className={`absolute inset-0 -z-10 bg-gradient-to-br from-[#3F3F46] to-[#EF4444]/20
          transition-opacity duration-300
          ${
            isMobile
              ? isActive
                ? "opacity-100"
                : "opacity-0"
              : "opacity-0 group-hover:opacity-100"
          }`}
      ></div>

      <div className="p-8 lg:p-10">
        {/* Icon + Header */}
        <div className="mb-6">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors
              ${
                isMobile
                  ? isActive
                    ? "bg-[#EF4444]/25"
                    : "bg-[#1F2933]"
                  : "bg-[#1F2933] group-hover:bg-[#EF4444]/25"
              }`}
          >
            {React.cloneElement(icon, {
              className: "w-7 h-7 text-[#EF4444] drop-shadow-[0_0_6px_#EF4444]",
            })}
          </div>

          <h3
            className={`text-3xl font-bold mb-2 transition-colors duration-300
              ${
                isMobile
                  ? isActive
                    ? "text-[#EF4444]"
                    : "text-[#E5E7EB]"
                  : "text-[#E5E7EB] group-hover:text-[#EF4444]"
              }`}
          >
            {title}
          </h3>

          <p className="text-lg leading-relaxed text-[#9CA3AF]">
            {description}
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">
            Benefits
          </h4>
          <div className="grid gap-3">
            {benefits.map((b, i) => (
              <BenefitItem key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        </div>

        {/* Perfect For */}
        <div>
          <h4 className="text-sm font-semibold text-[#9CA3AF] uppercase tracking-wider mb-4">
            Perfect For
          </h4>
          <div className="grid gap-3">
            {perfectFor.map((p, i) => (
              <PerfectForItem key={i} text={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Benefit Item */
function BenefitItem({ icon, text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0 bg-[#1F2933]">
        {React.cloneElement(icon, {
          className: "w-3 h-3 text-[#EF4444]",
        })}
      </div>
      <span className="text-[#E5E7EB]">{text}</span>
    </div>
  );
}

/* Perfect For Item */
function PerfectForItem({ text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 shrink-0"></div>
      <span className="text-[#9CA3AF]">{text}</span>
    </div>
  );
}
