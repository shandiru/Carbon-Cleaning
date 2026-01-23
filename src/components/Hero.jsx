 
import React, { useEffect } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaTools,
  FaClock,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HeroSection() {


  return (
    <section
      id="home"
      className="relative min-h-screen py-30 bg-black text-white  flex items-center"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/hero-engine.jpg"
          alt="Carbon Cleaning"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-6">

          {/* Heading */}
          <h1
            data-aos="fade-up"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wide uppercase"
          >
            Nottingham{" "}
            <span className="text-red-600">Carbon Cleaning</span>
          </h1>

          {/* Subheading */}
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-xl sm:text-2xl text-gray-300 uppercase tracking-wide"
          >
            Mobile Engine Carbon Cleaning Specialists
          </p>

          {/* Description */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Professional mobile engine carbon cleaning delivered to your door.
            Improve performance, fuel efficiency, and engine reliability across
            Nottingham and surrounding areas.
          </p>

          {/* Service Area Badge */}
          <div
            data-aos="zoom-in"
            data-aos-delay="300"
            className="inline-flex items-center gap-2 border border-gray-400/40 text-gray-300 px-5 py-2 rounded-full uppercase tracking-wide"
          >
            <FaMapMarkerAlt className="text-red-600" />
            20-mile radius of NG5 5TD
          </div>

          {/* CTA Buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
          >
            <a
              href="tel:07752549740"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-md text-lg font-semibold uppercase tracking-wide transition"
            >
              <FaPhoneAlt />
              Call Now
            </a>

            <a
              href="https://wa.me/447752549740"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-black px-8 py-3 rounded-md text-lg font-semibold uppercase tracking-wide transition"
            >
              <FaWhatsapp />
              WhatsApp
            </a>
          </div>

          {/* Feature Strip */}
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            <div className="bg-black/60 border border-gray-600/40 rounded-lg p-6">
              <FaTools className="text-red-600 text-3xl mb-2 mx-auto" />
              <p className="uppercase tracking-wide font-semibold">
                Fully Mobile
              </p>
              <p className="text-sm text-gray-400">
                We come to you
              </p>
            </div>

            <div className="bg-black/60 border border-gray-600/40 rounded-lg p-6">
              <FaClock className="text-red-600 text-3xl mb-2 mx-auto" />
              <p className="uppercase tracking-wide font-semibold">
                Fast Service
              </p>
              <p className="text-sm text-gray-400">
                Same-day available
              </p>
            </div>

            <div className="bg-black/60 border border-gray-600/40 rounded-lg p-6">
              <FaMapMarkerAlt className="text-red-600 text-3xl mb-2 mx-auto" />
              <p className="uppercase tracking-wide font-semibold">
                Local Experts
              </p>
              <p className="text-sm text-gray-400">
                Nottingham area
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
