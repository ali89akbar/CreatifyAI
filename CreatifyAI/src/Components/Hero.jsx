import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
// Floating Star Component
const FloatingStar = ({ delay = 0, duration = 4 }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      rotate: [0, 180, 360],
      scale: [0.8, 1.2, 0.8],
      opacity: [0.3, 1, 0.3],
      transition: {
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, [controls, delay, duration]);

  return (
    <motion.div
      animate={controls}
      className='absolute'
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    >
      <div className='w-2 h-2 bg-white rounded-full shadow-white shadow-sm'></div>
    </motion.div>
  );
};

// Floating Sphere Component
const FloatingSphere = ({ delay = 0, color = 'blue' }) => {
  const colors = {
    blue: { bg: 'bg-blue-400', shadow: 'shadow-blue-400/50' },
    purple: { bg: 'bg-purple-400', shadow: 'shadow-purple-400/50' },
    pink: { bg: 'bg-pink-400', shadow: 'shadow-pink-400/50' },
    green: { bg: 'bg-green-400', shadow: 'shadow-green-400/50' },
    orange: { bg: 'bg-orange-400', shadow: 'shadow-orange-400/50' }
  };

  return (
    <motion.div
      className='absolute'
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [-30, 30, -30],
        x: [-20, 20, -20],
        rotateX: [0, 360],
        rotateY: [0, -360],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className={`w-8 h-8 ${colors[color].bg} ${colors[color].shadow} rounded-full opacity-20 shadow-lg`}></div>
    </motion.div>
  );
};

// Geometric Shape Component
const GeometricShape = ({ delay = 0, shapeType = 'square' }) => {
  const shapes = {
    square: 'w-6 h-6 rotate-45 bg-gradient-to-br from-yellow-400 to-orange-500',
    circle: 'w-5 h-5 rounded-full bg-gradient-to-br from-green-400 to-blue-500',
    rectangle: 'w-4 h-8 bg-gradient-to-br from-purple-400 to-pink-500',
    oval: 'w-8 h-4 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-500'
  };

  return (
    <motion.div
      className='absolute'
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        rotateX: [0, 360],
        rotateY: [0, -360],
        rotateZ: [0, 180],
        scale: [0.8, 1.3, 0.8],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 12 + Math.random() * 6,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div className={`${shapes[shapeType]} opacity-15 shadow-lg`}></div>
    </motion.div>
  );
};

// Main Hero Component
function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url(src/assets/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen overflow-hidden'>
      
      {/* Animated 3D Background Elements */}
      <div className='absolute inset-0 pointer-events-none'>
        
        {/* Mouse-following gradient orb */}
        <motion.div
          className='absolute w-96 h-96 rounded-full opacity-10 blur-3xl'
          style={{
            background: 'radial-gradient(circle, rgba(53,136,242,0.3) 0%, transparent 70%)',
          }}
          animate={{
            x: mousePosition.x * 4,
            y: mousePosition.y * 4,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 100 }}
        />

        {/* Floating Stars */}
        {[...Array(25)].map((_, i) => (
          <FloatingStar 
            key={`star-${i}`} 
            delay={Math.random() * 5} 
            duration={3 + Math.random() * 4} 
          />
        ))}
        
        {/* Floating Spheres */}
        {[...Array(15)].map((_, i) => {
          const colors = ['blue', 'purple', 'pink', 'green', 'orange'];
          return (
            <FloatingSphere 
              key={`sphere-${i}`} 
              delay={Math.random() * 8} 
              color={colors[i % colors.length]}
            />
          );
        })}
        
        {/* Geometric Shapes */}
        {[...Array(10)].map((_, i) => {
          const shapes = ['square', 'circle', 'rectangle', 'oval'];
          return (
            <GeometricShape 
              key={`shape-${i}`} 
              delay={Math.random() * 6} 
              shapeType={shapes[i % shapes.length]}
            />
          );
        })}
        
        {/* Floating Particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className='absolute w-1 h-1 bg-white rounded-full opacity-40'
            style={{
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [window.innerHeight, -100],
              x: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              delay: Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Hero Content with Enhanced 3D Effects */}
      <motion.div 
        className='relative z-10'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className='text-center mb-4'>
          <motion.h1 
            className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            Create smarter faster with <br /> 
            <motion.span 
              className='text-primary relative inline-block'
              animate={{
                textShadow: [
                  "0 0 10px rgba(255, 73, 56, 0.5)",
                  "0 0 20px rgba(255, 73, 56, 0.8)",
                  "0 0 10px rgba(255, 73, 56, 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              powerful AI
            </motion.span> 
          </motion.h1>
          
          <motion.p 
            className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
          >
            Boost your productivity and creativity with our AI-powered tools designed to help you write articles, generate images, and more.
          </motion.p>
        </div>        
        
        <motion.div 
          className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <motion.button 
            onClick={() => navigate('/ai')}
            className='bg-primary text-white px-10 py-3 rounded-lg cursor-pointer shadow-lg relative overflow-hidden'
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(255, 73, 56, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className='relative z-10'>Start creating now</span>
            <motion.div 
              className='absolute inset-0 bg-white opacity-0'
              whileHover={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          
          <motion.button 
            className='bg-white px-10 py-3 rounded-lg cursor-pointer shadow-lg border border-gray-200 relative overflow-hidden'
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className='relative z-10'>Watch demo</span>
            <motion.div 
              className='absolute inset-0 bg-gradient-to-r from-transparent via-gray-100 to-transparent opacity-0 -skew-x-12'
              whileHover={{ 
                opacity: 1,
                x: "100%"
              }}
              transition={{ duration: 0.6 }}
              initial={{ x: "-100%" }}
            />
          </motion.button>
        </motion.div>
        
        {/* Centered Trust Section */}
        <motion.div 
          className='flex flex-row justify-center items-center gap-4 mt-8 mx-auto text-gray-600'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.img 
            src={assets.user_group} 
            alt="" 
            className='h-8'
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.span
            className='text-center'
            whileHover={{ 
              color: "#374151",
              scale: 1.02
            }}
          >
            Trusted by over 1000+ users worldwide
          </motion.span>
        </motion.div>
      </motion.div>
      
      {/* Interactive Background Elements */}
      <motion.div 
        className='absolute inset-0 pointer-events-none'
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(53,136,242,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(158,83,238,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(255,73,56,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(53,136,242,0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </div>
  )}
  export default Hero;