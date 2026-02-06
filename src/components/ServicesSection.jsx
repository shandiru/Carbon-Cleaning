import React, { useState } from "react";

const services = [
  {
    title: "Diagnostic",
    desc: "Full engine diagnostic check",
    price: "£30",
    note: "FREE with any clean or service",
  },
  {
    title: "Carbon Clean",
    desc: "Removes carbon build-up to restore performance",
    price: "£80",
  },
  {
    title: "360 Clean",
    desc: "Carbon Clean + Fuel Treatment",
    price: "£100",
  },
  {
    title: "EGR Clean",
    desc: "Carbon Clean + Industrial EGR Cleaning",
    price: "£100",
  },
  {
    title: "Complete Engine Detox",
    desc: "360 Clean + EGR Clean",
    price: "£130",
    highlight: true,
  },
  {
    title: "Forced Regen",
    desc: "Standalone or add-on service",
    price: "£60",
    note: "+£50 when added to Carbon or EGR Clean",
  },
  {
    title: "DPF Chemical Clean",
    desc: "Deep chemical DPF cleaning process",
    price: "£300",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="services"
      className="bg-black text-white py-28 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-widest">
            Service <span className="text-[#B62025] ">Breakdown</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Fully mobile engine carbon cleaning within 20 miles of NG5 5TD.
          </p>

          {/* ADDED IMAGE HERE */}
          <div className="mt-8 flex justify-center">
            <img 
              src="/serviceimage.jpeg" // Replace with your actual path
              alt="Engine Service" 
              className="w-full max-w-3xl rounded-lg border border-gray-800 shadow-2xl shadow-red-900/20"
            />
          </div>
        </div>

        {/* SPLIT LAYOUT */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* LEFT RAIL */}
          <div className="space-y-4">
            {services.map((service, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-full text-left uppercase tracking-wide text-xl sm:text-2xl font-semibold py-4 border-l-4 pl-4 transition-all
                  ${
                    active === i
                      ? "border-[#B62025]  text-white bg-[#B62025]/10 "
                      : "border-gray-700 text-gray-500 hover:text-white"
                  }
                `}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* RIGHT DETAIL PANEL */}
          <div className="relative">
            <div className="border border-gray-700 p-8 min-h-[260px] flex flex-col justify-between bg-black/60">
              <div>
                <h3 className="text-3xl uppercase font-bold tracking-wide">
                  {services[active].title}
                </h3>

                <p className="text-gray-400 mt-4 text-lg leading-relaxed">
                  {services[active].desc}
                </p>

                {services[active].note && (
                  <p className="mt-4 text-[#B62025]  font-semibold uppercase">
                    {services[active].note}
                  </p>
                )}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm uppercase tracking-widest text-gray-400">
                  Price
                </span>
                <span className="text-4xl font-bold text-[#B62025] ">
                  {services[active].price}
                </span>
              </div>
            </div>

            {/* SILVER STRIPE */}
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
        </div>

        {/* BUNDLES */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl uppercase tracking-widest font-bold mb-8">
            Service <span className="text-[#B62025] ">Bundles</span>
          </h3>

          <div className="max-w-4xl mx-auto divide-y divide-gray-700 text-left">
            {[
              ["Carbon Clean + Forced Regen", "£130"],
              ["360 Clean + Forced Regen", "£150"],
              ["DPF Clean + Carbon Clean", "£350"],
              ["DPF Clean + Carbon Clean + Fuel Treatment", "£360"],
            ].map(([name, price], i) => (
              <div
                key={i}
                className="flex items-center justify-between py-5 uppercase tracking-wide"
              >
                <span>{name}</span>
                <span className="font-bold text-[#B62025] ">{price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ADD-ONS */}
        <div className="mt-20 text-center">
          <p className="uppercase tracking-widest text-gray-400">
            Fuel Treatments
          </p>
          <p className="text-xl mt-2">Petrol • Diesel • AdBlue</p>
          <p className="text-4xl font-bold mt-4">
            £20 <span className="text-gray-400 text-lg">each</span>
          </p>
        </div>

      </div>
    </section>
  );
}