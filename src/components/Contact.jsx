"use client";

import React, { useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaFacebookF } from "react-icons/fa";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    vehicle: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Updated WhatsApp number for Nottingham Carbon Cleaning Solutions
    const number = "447752549740";
    const text = `Name: ${form.name}%0APhone: ${form.phone}%0AVehicle: ${form.vehicle}%0AMessage: ${form.message}`;

    window.open(`https://wa.me/${number}?text=${text}`, "_blank");
  };

  return (
    <section
      id="contact"
      className="bg-black text-white  py-24 px-6"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* LEFT — CONTACT INFO */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">
            Get In <span className="text-[#D70C09]">Touch</span>
          </h2>

          <div className="w-24 h-[3px] bg-[#D70C09] mt-4 mb-8" />

          <p className="text-[#C0C0C0] max-w-md leading-relaxed mb-10">
            Speak directly with Nottingham Carbon Cleaning Solutions. No call centres, 
            no delays — just honest advice and professional service.
          </p>

          {/* INFO BLOCKS */}
          <div className="space-y-6">

            <div className="flex gap-4 items-start">
              <FaMapMarkerAlt className="text-[#D70C09] mt-1" />
              <p className="text-[#C0C0C0]">
                Wendling Gardens<br />
                Nottingham NG5 5TD, United Kingdom
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <FaPhoneAlt className="text-[#D70C09]" />
              <a
                href="tel:+447752549740"
                className="hover:text-[#D70C09] transition"
              >
                07752 549740
              </a>
            </div>

            <div className="flex gap-4 items-start">
              <FaClock className="text-[#D70C09] mt-1" />
              <ul className="text-[#C0C0C0] text-sm space-y-1">
                <li>Mon – Fri: 9:00 AM – 5:00 PM</li>
                <li>Saturday: 9:00 AM – 2:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-5 mt-10 text-xl">
            <a
              href="https://web.facebook.com/NottinghamCarbonCleaningSolutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D70C09] transition"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* RIGHT — WHATSAPP FORM */}
        <div className="border border-white/10 bg-[#0E0E0E] p-10 rounded-md shadow-lg">

          <h3 className="text-2xl font-bold uppercase mb-2">
            WhatsApp Enquiry
          </h3>
          <p className="text-[#868386] text-sm mb-8">
            Send us a message and we’ll respond quickly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              onChange={handleChange}
              className="w-full bg-black border border-[#868386] px-4 py-3 text-sm focus:outline-none focus:border-[#D70C09]"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              required
              onChange={handleChange}
              className="w-full bg-black border border-[#868386] px-4 py-3 text-sm focus:outline-none focus:border-[#D70C09]"
            />

            <input
              type="text"
              name="vehicle"
              placeholder="Vehicle registration"
              onChange={handleChange}
              className="w-full bg-black border border-[#868386] px-4 py-3 text-sm focus:outline-none focus:border-[#D70C09]"
            />

            <textarea
              name="message"
              rows="4"
              placeholder="How can we help?"
              required
              onChange={handleChange}
              className="w-full bg-black border border-[#868386] px-4 py-3 text-sm focus:outline-none focus:border-[#D70C09]"
            />

            <button
              type="submit"
              className="
                w-full py-3
                bg-[#D70C09]
                hover:bg-[#b50a07]
                transition
                uppercase tracking-wide font-semibold
              "
            >
              Send via WhatsApp
            </button>

            <p className="text-xs text-[#868386] text-center">
              Your details are used only to respond to your enquiry.
            </p>
             <p className="text-xs text-[#868386] text-center">
            By submitting this form, you agree to us processing your details to respond to your enquiry. Your information is handled securely and in line with our Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}