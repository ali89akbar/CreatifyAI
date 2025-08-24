import React from 'react'
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import AITools from '../Components/AITools';
import Testimonials from '../Components/Testimonials';
import Plan from '../Components/Plan';
import Footer from '../Components/Footer';

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <AITools/>
    <Testimonials/>
    <Plan/>
            <Footer/>
    </>
  )
}

export default Home