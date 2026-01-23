 

import React, { useEffect } from "react";
import { FaMapMarkerAlt, FaClock, FaTools } from "react-icons/fa";


export default function AboutSection() {
 
  return (
    <section
      id="about"
      className="bg-black text-white  py-24 px-6 md:px-12 font-sans"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">
            About <span className="text-red-600">Nottingham Carbon Cleaning</span>
          </h2>
          <div className="w-24 h-[2px] bg-[#C0C0C0] mt-6"></div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT BLOCK */}
          <div data-aos="fade-right">
            <p className="text-[#C0C0C0] leading-relaxed mb-6">
              Welcome to Nottingham Carbon Cleaning – your mobile engine care
              specialists. We provide professional engine carbon cleaning
              services delivered directly to your door.
            </p>

            <p className="text-[#868386] leading-relaxed mb-6">
              We operate within a 20-mile radius of NG5 5TD and are fully mobile,
              meaning there’s no need to visit a garage. If you’re located
              slightly outside this area, just give us a call to discuss options
              and any additional travel costs.
            </p>

            <p className="text-[#868386] leading-relaxed">
              From carbon cleaning and EGR cleaning to forced regeneration and
              complete engine detox packages, all work is carried out with care,
              transparency, and attention to detail.
            </p>
          </div>

          {/* RIGHT BLOCK */}
          <div data-aos="fade-left" className="space-y-6">

            <div className="border border-[#2A2A2A] p-6">
              <p className="uppercase tracking-wide font-semibold mb-2">
                Mobile Service
              </p>
              <p className="text-[#868386] text-sm">
                We come to your home or workplace for maximum convenience.
              </p>
            </div>

            <div className="border border-[#2A2A2A] p-6">
              <p className="uppercase tracking-wide font-semibold mb-2">
                Coverage Area
              </p>
              <p className="text-[#868386] text-sm">
                20-mile radius of NG5 5TD. Additional travel available on request.
              </p>
            </div>

            <div className="border border-[#2A2A2A] p-6">
              <p className="uppercase tracking-wide font-semibold mb-2">
                Opening Hours
              </p>
              <p className="text-[#868386] text-sm">
                Monday–Friday: 9am–5pm<br />
                Saturday: 9am–2pm<br />
                Sunday: Booking only (deposit required)
              </p>
            </div>

          </div>
        </div>

        {/* FACT STRIP */}
        <div
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
          data-aos="fade-up"
        >
          <div className="border border-[#2A2A2A] py-6">
            <FaTools className="mx-auto text-red-600 text-3xl mb-3" />
            <p className="uppercase tracking-wide font-semibold">
              Engine Specialists
            </p>
          </div>

          <div className="border border-[#2A2A2A] py-6">
            <FaMapMarkerAlt className="mx-auto text-red-600 text-3xl mb-3" />
            <p className="uppercase tracking-wide font-semibold">
              Nottingham Based
            </p>
          </div>

          <div className="border border-[#2A2A2A] py-6">
            <FaClock className="mx-auto text-red-600 text-3xl mb-3" />
            <p className="uppercase tracking-wide font-semibold">
              Flexible Booking
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center" data-aos="fade-up">
          <a
            href="tel:07752549740"
            className="inline-block bg-red-600 hover:bg-red-700 px-12 py-3 uppercase tracking-wide font-semibold transition"
          >
            Call Us Today
          </a>
        </div>

      </div>
    </section>
  );
}
