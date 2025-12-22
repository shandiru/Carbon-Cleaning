import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const phone = "07752549740";
  const waNumber = "447752549740"; // WhatsApp needs country code
  const waHref = `https://wa.me/${waNumber}`;

  const scrollWithOffset = (el) => {
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 w-full bg-black z-50 border-b border-red-600/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO / BUSINESS NAME */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Nottingham Carbon Cleaning"
              className="h-12 w-auto"
            />
           
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold uppercase">
            <HashLink to="/#home" scroll={scrollWithOffset} className="text-gray-300 hover:text-white">
              Home
            </HashLink>
            <HashLink to="/#services" scroll={scrollWithOffset} className="text-gray-300 hover:text-white">
              Services
            </HashLink>
            <HashLink to="/#about" scroll={scrollWithOffset} className="text-gray-300 hover:text-white">
              About
            </HashLink>
            <HashLink to="/#gallery" scroll={scrollWithOffset} className="text-gray-300 hover:text-white">
              Gallery
            </HashLink>
            <HashLink to="/#contact" scroll={scrollWithOffset} className="text-gray-300 hover:text-white">
              Contact
            </HashLink>
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-3">

            {/* CALL BUTTON (DESKTOP) */}
            <a
              href={`tel:${phone}`}
              className="hidden lg:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-bold transition"
            >
              <FaPhoneAlt />
              {phone}
            </a>

            {/* WHATSAPP */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-4 py-2 rounded-md text-sm font-bold transition"
            >
              <FaWhatsapp />
              WhatsApp
            </a>

            {/* MOBILE MENU BUTTON */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-red-600/30 py-4 space-y-4">
            {["home", "services", "about", "gallery", "contact"].map((item) => (
              <HashLink
                key={item}
                to={`/#${item}`}
                scroll={scrollWithOffset}
                onClick={() => setIsMenuOpen(false)}
                className="block text-gray-300 hover:text-white uppercase font-semibold"
              >
                {item}
              </HashLink>
            ))}

            {/* MOBILE ACTIONS */}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-md font-bold"
              >
                <FaPhoneAlt />
                Call Now
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-green-500 text-green-500 py-2 rounded-md font-bold"
              >
                <FaWhatsapp />
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
