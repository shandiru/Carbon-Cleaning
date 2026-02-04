import React from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

        {/* LEFT — CONTACT INFO */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest">
            Get In{" "}
            <span className="text-[#B62025] ">Touch</span>
          </h2>

          <div className="w-24 h-[3px] bg-[#B62025]  mt-4 mb-8" />

          <p className="text-[#C0C0C0] max-w-md leading-relaxed mb-10">
            Speak directly with Nottingham Carbon Cleaning Solutions. No call
            centres, no delays — just honest advice and professional service.
          </p>

          {/* INFO BLOCKS */}
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <FaMapMarkerAlt className="text-[#B62025]  mt-1" />
              <p className="text-[#C0C0C0]">
                Wendling Gardens <br />
                Nottingham NG5 5TD, United Kingdom
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <FaPhoneAlt className="text-[#B62025] " />
              <a
                href="tel:+447752549740"
                className="hover:text-[#B62025]  transition"
              >
                07752 549740
              </a>
            </div>

            <div className="flex gap-4 items-start">
              <FaClock className="text-[#B62025] mt-1" />
              <ul className="text-[#C0C0C0] text-sm space-y-1">
                <li>Mon – Fri: 9:00 AM – 5:00 PM</li>
                <li>Saturday: 9:00 AM – 2:00 PM</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-6 mt-10 text-2xl">
            <a
              href="https://web.facebook.com/NottinghamCarbonCleaningSolutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B62025]  transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.tiktok.com/@nottingham.carbon?_r=1&_t=ZN-93QdshQYjsU"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#B62025]  transition"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* RIGHT — GOOGLE MAP */}
        <div className="border border-white/10 bg-[#0E0E0E] rounded-md shadow-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2172.702841895239!2d-1.1526552999999997!3d53.00391639999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879c1b0450d0975%3A0x2b2aab3feebcf3b1!2sNottingham%20Carbon%20Cleaning%20Solutions!5e1!3m2!1sen!2slk!4v1769797410042!5m2!1sen!2slk"
            className="w-full h-[450px] grayscale hover:grayscale-0 transition duration-500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </div>
    </section>
  );
}
