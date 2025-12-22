"use client";

import React from "react";
import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white font-['Oswald']">

      {/* ================= TOP BRAND STRIP ================= */}
      <div className="border-b border-[#1C1C1C] py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest uppercase">
            Carbon  <span className="text-[#D70C09]">Cleaning</span>
          </h2>
          <p className="text-[#868386] mt-3 max-w-xl mx-auto">
            Performance tuning, emissions solutions & professional ECU services
          </p>
        </div>
      </div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-12 md:grid-cols-3">

        {/* SERVICES */}
        <div>
          <h3 className="uppercase tracking-wide text-lg mb-5 text-[#C0C0C0]">
            Services
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              "ECU Remapping",
              "AdBlue, DPF & EGR Solutions",
              "TCU Remapping",
              "ECU Cloning",
            ].map((service, i) => (
              <li key={i}>
                <a
                  href="#services"
                  className="text-[#868386] hover:text-[#D70C09] transition"
                >
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="uppercase tracking-wide text-lg mb-5 text-[#C0C0C0]">
            Contact
          </h3>

          <div className="space-y-4 text-sm text-[#868386]">

            <div className="flex gap-3 items-start">
              <MapPin size={16} className="text-[#D70C09] mt-1" />
              <p>
                Que Sera, Pentre Hill<br />
                Flint Mountain, Flint<br />
                United Kingdom
              </p>
            </div>

            <div className="flex gap-3 items-center">
              <Phone size={16} className="text-[#D70C09]" />
              <a href="tel:+447392791919" className="hover:text-[#D70C09]">
                +44 7392 791919
              </a>
            </div>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="uppercase tracking-wide text-lg mb-5 text-[#C0C0C0]">
            Follow Us
          </h3>

          <div className="flex gap-4">
            <a
              href="https://web.facebook.com/profile.php?id=100037206957303"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-10 h-10 rounded-full
                border border-[#1C1C1C]
                flex items-center justify-center
                text-[#868386]
                hover:text-white hover:border-[#D70C09]
                transition
              "
            >
              <Facebook size={18} />
            </a>

            <a
              href="https://www.instagram.com/broadway_remapping_/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                w-10 h-10 rounded-full
                border border-[#1C1C1C]
                flex items-center justify-center
                text-[#868386]
                hover:text-white hover:border-[#D70C09]
                transition
              "
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-[#1C1C1C] py-6 text-center text-sm text-[#868386]">

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-2">
          <Link to="/privacy-policy" className="hover:text-[#D70C09]">
            Privacy Policy
          </Link>
          <span className="hidden sm:inline">|</span>
          <Link to="/terms-conditions" className="hover:text-[#D70C09]">
            Terms & Conditions
          </Link>
        </div>

        <p>&copy; 2025 Broadway Remapping. All rights reserved.</p>

        <p className="mt-1">
          Powered by{" "}
          <a
            href="https://www.ansely.co.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D70C09] hover:underline"
          >
            Ansely
          </a>
        </p>
      </div>
    </footer>
  );
}
