"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Activity } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function EngineSystemSolutions() {
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

  const solutions = [
    {
      title: "ECU Optimisation",
      icon: (
        <Cpu className="w-7 h-7 text-[#EF4444] drop-shadow-[0_0_6px_#EF4444]" />
      ),
      items: [
        "Improved engine performance",
        "Better fuel efficiency",
        "Optimised throttle response",
      ],
    },
    {
      title: "AdBlue, EGR & DPF Solutions",
      icon: (
        <Activity className="w-7 h-7 text-[#EF4444] drop-shadow-[0_0_6px_#EF4444]" />
      ),
      items: [
        "Resolve warning lights & system faults",
        "Prevent limp mode issues",
        "Restore smooth engine operation",
      ],
    },
  ];

  const handleClick = (index) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };

  return (
    <section className="py-24 px-4 bg-[#050505]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-[#C0C0C0] mb-4">
            Engine & Emission Services
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Specialist ECU optimisation and emission system solutions for modern vehicles.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((sol, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`group relative rounded-lg p-8 cursor-pointer transition-all duration-300
                  bg-[#111111]
                  border border-[#3F3F46]
                  ${
                    isMobile
                      ? isActive
                        ? "border-[#EF4444]/70 shadow-[0_0_20px_#EF4444]/60"
                        : ""
                      : "hover:border-[#EF4444]/60 hover:shadow-[0_0_20px_#EF4444]/40"
                  }`}
                data-aos="fade-up"
                data-aos-delay={index * 120}
              >
                {/* Top Glow Line */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 rounded-t-lg transition-opacity duration-300
                    ${
                      isMobile
                        ? isActive
                          ? "opacity-100 bg-gradient-to-r from-[#3F3F46] to-[#EF4444]"
                          : "opacity-0"
                        : "opacity-0 group-hover:opacity-100 bg-gradient-to-r from-[#3F3F46] to-[#EF4444]"
                    }`}
                ></div>

                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center transition-colors duration-300
                      ${
                        isMobile
                          ? isActive
                            ? "bg-[#EF4444]/10"
                            : "bg-[#1F2933]"
                          : "bg-[#1F2933] group-hover:bg-[#EF4444]/10"
                      }`}
                  >
                    {sol.icon}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-2xl font-bold mb-4 transition-colors duration-300
                    ${
                      isMobile
                        ? isActive
                          ? "text-[#EF4444]"
                          : "text-[#E5E7EB]"
                        : "text-[#E5E7EB] group-hover:text-[#EF4444]"
                    }`}
                >
                  {sol.title}
                </h3>

                {/* Bullet List */}
                <ul className="space-y-3">
                  {sol.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 shrink-0"></div>
                      <span className="text-[#9CA3AF] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
