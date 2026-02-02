import React from 'react'
import Hero from "../components/Hero";
import Service from "../components/ServicesSection";
import About from "../components/About";
import Review from "../components/Review";
import Contact from "../components/Contact";
import WhyChooseUs from "../components/WhyChooseUs";
import Gallery from "../components/Photo"
import FetchGoogleReviews from "../components/Dymicreview"
import BusinessGallery from "../components/BusinessGallery"
import ReviewsCarousel from "../components/ReviewsCarousel"
import MapSection from '../components/MapSection';
const Home = () => {
    return (
        <div>
            <Hero />
            <Service />
               
            <About />
            <WhyChooseUs />
            {/* <Review /> */}
           
            <ReviewsCarousel />
             

            {/* <FetchGoogleReviews /> */}
            {/* < Gallery /> */}
          
           
            <Contact />
            {/* <MapSection /> */}
        </div>
    )
}

export default Home
