import React from 'react'
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import AITools from '../Components/AITools';
import Testimonials from '../Components/Testimonials';
import Plan from '../Components/Plan';

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <AITools/>
    <Testimonials/>
    <Plan/>
    </>
  )
}

export default Home