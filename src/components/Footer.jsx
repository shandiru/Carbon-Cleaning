"use client";

import React from "react";
import { Facebook, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    "Diagnostic",
    "Carbon Clean",
    "360 Clean",
    "EGR Clean",
    "Complete Engine Detox",
    "Forced Regen",
    "DPF Chemical Clean",
  ];

  return (
    <footer className="bg-black text-white font-['Oswald'] border-t border-[#1C1C1C]">
      {/* ================= TOP BRAND STRIP ================= */}
      <div className="border-b border-[#1C1C1C] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase mb-4">
            Nottingham Carbon <span className="text-[#D70C09]">Cleaning</span>
          </h2>
          <div className="h-1 w-24 bg-[#D70C09] mx-auto mb-6"></div>
          <p className="text-[#C0C0C0] text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
            Performance tuning, emissions solutions & professional carbon cleaning services.
          </p>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        
        {/* 1. SERVICES COLUMN */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="tracking-wide text-xl font-semibold mb-8 text-white">
            Our Services
          </h3>
          <ul className="w-full space-y-4">
            {services.map((service, index) => (
              <li key={index} className="group">
                <a 
                  href="#services" 
                  className="flex items-center gap-2 text-[#868386] hover:text-white transition-colors text-base md:text-lg"
                >
                  <ChevronRight size={16} className="text-[#D70C09] group-hover:translate-x-1 transition-transform" />
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. CONTACT DETAILS & SOCIALS */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="tracking-wide text-xl font-semibold mb-8 text-white">
             Contact Details
          </h3>
          <div className="space-y-6 text-base md:text-lg text-[#868386] mb-10">
            <div className="flex gap-4 items-start group">
              <MapPin size={22} className="text-[#D70C09] mt-1 shrink-0 group-hover:scale-110 transition-transform" />
              <p className="leading-relaxed group-hover:text-white transition-colors text-left">
                Wendling Gardens, Nottingham <br />
                NG5 5TD, United Kingdom
              </p>
            </div>

            <div className="flex gap-4 items-center group">
              <Phone size={22} className="text-[#D70C09] shrink-0 group-hover:scale-110 transition-transform" />
              <a href="tel:+447752549740" className="hover:text-white transition-colors">
                +44 7752 549740
              </a>
            </div>

            <div className="flex gap-4 items-center group">
              <Mail size={22} className="text-[#D70C09] shrink-0 group-hover:scale-110 transition-transform" />
              <a href="mailto:na@gmail.com" className="hover:text-white transition-colors">
                na@gmail.com
              </a>
            </div>
          </div>

          {/* Facebook Icon directly under Contact */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-[#C0C0C0] mb-4 uppercase tracking-widest">Follow Us</p>
            <a
              href="https://web.facebook.com/NottinghamCarbonCleaningSolutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-[#D70C09] flex items-center justify-center text-white hover:bg-[#D70C09] transition-all duration-300 shadow-[0_0_15px_rgba(215,12,9,0.2)]"
            >
              <Facebook size={22} fill="currentColor" className="text-white" />
            </a>
          </div>
        </div>

        {/* 3. LEGAL INFORMATION */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="tracking-wide text-xl font-semibold mb-8 text-white">
            Legal Information
          </h3>
          <div className="flex flex-col gap-4 text-base text-[#868386]">
            <Link to="/privacy-policy" className="hover:text-[#D70C09] transition-colors flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#D70C09] rounded-full"></span> 
              Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-[#D70C09] transition-colors flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#D70C09] rounded-full"></span> 
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="bg-[#0A0A0A] py-8 text-center border-t border-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#868386] text-sm md:text-base tracking-wide">
            &copy; {currentYear} <span className="text-white font-medium">Nottingham Carbon Cleaning</span>. All rights reserved.
          </p>
          
          <p className="text-[#868386] text-sm md:text-base tracking-wide">
            Powered by{" "}
            <a
              href="https://www.ansely.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D70C09] hover:text-white font-bold transition-colors ml-1 uppercase"
            >
              Ansely
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}