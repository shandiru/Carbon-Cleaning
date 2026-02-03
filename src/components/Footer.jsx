import React from "react";
import { Facebook, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Custom TikTok SVG to ensure brand accuracy and match Lucide styling
const TikTokIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31a8.15 8.15 0 0 1-1.89-1.51c-.01 2.62.01 5.24 0 7.86-.08 2.04-.6 4.12-1.97 5.67a6.91 6.91 0 0 1-5.32 2.37c-1.91.02-3.86-.54-5.32-1.79a6.94 6.94 0 0 1-2.52-5.41c.02-2.33 1.18-4.66 3.17-5.94 1.64-1.05 3.67-1.35 5.57-.96v4.16c-1.05-.36-2.28-.27-3.23.36a3.21 3.21 0 0 0-1.4 3.1c.07 1.1.72 2.14 1.73 2.59 1.05.47 2.32.33 3.22-.36.78-.58 1.19-1.53 1.22-2.51V.02z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    "Diagnostic", "Carbon Clean", "360 Clean", "EGR Clean",
    "Complete Engine Detox", "Forced Regen", "DPF Chemical Clean"
  ];

  return (
    <footer className="bg-black text-white border-t border-[#1C1C1C]">
      {/* ================= TOP BRAND STRIP ================= */}
      <div className="border-b border-[#1C1C1C] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-[0.2em] uppercase mb-4">
            Nottingham Carbon <span className="text-[#B62025] dark:text-[#FF4B4B]">Cleaning</span>
          </h2>
          <div className="h-1 w-24 bg-[#B62025] dark:bg-[#FF4B4B] mx-auto mb-6"></div>
          <p className="text-[#C0C0C0] text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
            Performance tuning, emissions solutions & professional carbon cleaning services.
          </p>
        </div>
      </div>
      {/* ================= DISCOUNT BANNER ================= */}
      <div className="border-b border-[#1C1C1C] bg-[#050505] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Left Side: The Offer */}
            <div className="flex items-center gap-6">
              <div className="hidden md:block w-[2px] h-12 bg-[#B62025] dark:bg-[#FF4B4B]"></div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold tracking-widest uppercase italic">
                  NHS & FIREFIGHTERS <span className="text-[#B62025] dark:text-[#FF4B4B]">SAVE 10%</span>
                </h3>
                <p className="text-[#868386] text-sm uppercase tracking-[0.2em] mt-1">
                  On all carbon cleaning services
                </p>
                <p className="text-white text-sm md:text-base mt-2 font-medium tracking-wide">
                  MENTION WHEN BOOKING
                </p>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="flex justify-center md:justify-end">
              <img
                src="/carlogo.jpg"   // replace with your image path
                alt="Special Offer"
                className="w-28 md:w-36 lg:w-40  object-contain"
              />
            </div>

          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        {/* 1. SERVICES COLUMN */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="tracking-wide text-xl font-semibold mb-8">Our Services</h3>
          <ul className="w-full space-y-4">
            {services.map((service, index) => (
              <li key={index} className="group">
                <a href="#services" className="flex items-center gap-2 text-[#868386] hover:text-white transition-colors text-base md:text-lg">
                  <ChevronRight size={16} className="text-[#B62025] dark:text-[#FF4B4B] group-hover:translate-x-1 transition-transform" />
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 2. CONTACT DETAILS & SOCIALS */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="tracking-wide text-xl font-semibold mb-8">Contact Details</h3>
          <div className="space-y-6 text-base md:text-lg text-[#868386] mb-10">
            <div className="flex gap-4 items-start group">
              <MapPin size={22} className="text-[#B62025] dark:text-[#FF4B4B] mt-1 shrink-0 group-hover:scale-110 transition-transform" />
              <p className="leading-relaxed group-hover:text-white transition-colors text-left">
                Wendling Gardens, Nottingham <br /> NG5 5TD, United Kingdom
              </p>
            </div>
            <div className="flex gap-4 items-center group">
              <Phone size={22} className="text-[#B62025] dark:text-[#FF4B4B] shrink-0 group-hover:scale-110 transition-transform" />
              <a href="tel:+447752549740" className="hover:text-white transition-colors">+44 7752 549740</a>
            </div>
            <div className="flex gap-4 items-center group">
              <Mail size={22} className="text-[#B62025] dark:text-[#FF4B4B] shrink-0 group-hover:scale-110 transition-transform" />
              <a href="mailto:na@gmail.com" className="hover:text-white transition-colors">na@gmail.com</a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-[#C0C0C0] mb-4 uppercase tracking-widest">Follow Us</p>
            <div className="flex gap-4">
              {/* Facebook */}
              <a
                href="https://web.facebook.com/NottinghamCarbonCleaningSolutions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-[#B62025] dark:border-[#FF4B4B] flex items-center justify-center text-white hover:bg-[#B62025] dark:hover:bg-[#FF4B4B] transition-all duration-300 shadow-[0_0_15px_rgba(182,32,37,0.2)]"
              >
                <Facebook size={22} fill="currentColor" />
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@nottingham.carbon?_r=1&_t=ZN-93QdshQYjsU"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-[#B62025] dark:border-[#FF4B4B] flex items-center justify-center text-white hover:bg-[#B62025] dark:hover:bg-[#FF4B4B] transition-all duration-300 shadow-[0_0_15px_rgba(182,32,37,0.2)]"
              >
                <TikTokIcon size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* 3. LEGAL INFORMATION */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="tracking-wide text-xl font-semibold mb-8">Legal Information</h3>
          <div className="flex flex-col gap-4 text-base text-[#868386]">
            <Link to="/privacy-policy" className="hover:text-[#B62025] dark:text-[#FF4B4B] transition-colors flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#B62025] dark:bg-[#FF4B4B] rounded-full"></span> Privacy Policy
            </Link>
            <Link to="/terms-conditions" className="hover:text-[#B62025] dark:text-[#FF4B4B] transition-colors flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#B62025] dark:bg-[#FF4B4B] rounded-full"></span> Terms & Conditions
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
            Powered by <a href="https://www.ansely.co.uk/" target="_blank" rel="noopener noreferrer" className="text-[#B62025] dark:text-[#FF4B4B] hover:text-white font-bold transition-colors ml-1 uppercase">Ansely</a>
          </p>
        </div>
      </div>
    </footer>
  );
}