 

import React, { useEffect } from "react";


export default function VehicleSearch() {


  const handleClick = () => {
    window.location.href = "https://viezu.com/dealer?id=eaa32c96f620053cf442ad32258076b9";
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-black px-6">
      <div className="text-center space-y-8 max-w-lg" data-aos="fade-up">
        {/* Logo */}
        <img src="/logo.png" alt="Logo" loading="lazy" className="mx-auto w-48 md:w-64 opacity-90" />

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-300">
          Broadway Remapping
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
          Discover your vehicle’s performance potential and receive a personalised quote instantly.
        </p>

        {/* Call-to-action Button */}
        <button
          onClick={handleClick}
          className="
            bg-red-700 hover:bg-red-800 text-silver font-bold
            px-10 py-4 rounded-full text-lg md:text-xl
            shadow-xl transition-transform transform hover:scale-105
            border-2 border-gray-500
          "
        >
          →   View tuning options
        </button>
      </div>

      <style jsx>{`
        .text-silver {
          color: #C0C0C0; /* Silver */
        }
      `}</style>
    </section>
  );
}
