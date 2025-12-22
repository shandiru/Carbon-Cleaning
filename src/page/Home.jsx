import React from 'react'
import Hero from "../components/Hero";
import Service from "../components/ServicesSection";
import About from "../components/About";
import Review from "../components/Review";
import Contact from "../components/Contact";
import WhyChooseUs from "../components/WhyChooseUs";
import Gallery from "../components/Photo"

const Home = () => {
    return (
        <div>
            <Hero />
            <Service />
               
            <About />
            <WhyChooseUs />
            <Review />
            < Gallery />
          
           
            <Contact />
        </div>
    )
}

export default Home
