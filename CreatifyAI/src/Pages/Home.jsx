import React from 'react'
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import AITools from '../Components/AITools';
import Testimonials from '../Components/Testimonials';
import Plan from '../Components/Plan';
import Footer from '../Components/Footer';
import AboutUs from '../Components/About';

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <AITools/>
    <Testimonials/>
    <AboutUs/>
    <Plan/>
            <Footer/>
    </>
  )
}

export default Home