import React from 'react';

const MapSection = () => {
  return (
    <section className="bg-black font-sans py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Side: Text Details */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-[#B62025] dark:text-[#FF4B4B] text-4xl font-bold tracking-tight">
            Visit Us
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Located at Wendling Gardens, our facility is nestled in the heart of Nottingham. 
            Whether you are visiting for the first time or are a regular, we look forward to seeing you.
          </p>
          
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-white font-semibold mb-2">Location Address</h3>
            <p className="text-gray-500">
              Wendling Gardens, Nottingham<br />
              NG5 5TD, United Kingdom
            </p>
          </div>

          <button className="inline-block bg-[#B62025] hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg transition-all shadow-lg shadow-red-900/30">
            Get Directions
          </button>
        </div>

        {/* Right Side: Map Container */}
        <div className="w-full lg:w-1/2 h-[450px] relative">
          {/* Decorative frame accent */}
          <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-[#B62025] rounded-tr-2xl"></div>
          
          <div className="w-full h-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2172.702841895239!2d-1.1526552999999997!3d53.00391639999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879c1b0450d0975%3A0x2b2aab3feebcf3b1!2sNottingham%20Carbon%20Cleaning%20Solutions!5e1!3m2!1sen!2slk!4v1769797410042!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wendling Gardens Map"
              className="grayscale-[30%] contrast-[1.1] brightness-[0.9]"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MapSection;