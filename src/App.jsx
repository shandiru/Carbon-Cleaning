 

import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import GDPRBanner from "./components/GDPRBanner";

import Home from "./page/Home";
import TermsConditions from "./components/Term";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Chatbot from "./components/Chatbot";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-quart",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Chatbot />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />
      <GDPRBanner />
    </Router>
  );
}

export default App;
