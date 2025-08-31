import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

const AboutUs = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 10,
      y: (e.clientY - rect.top - rect.height / 2) / 10,
    });
  };

  const skills = [
    "JavaScript", "React", "Node.js","Express js", "MongoDB", 
    "PostgreSQL", "AWS", "WordPress"
  ];

  const projects = [
    { name: "AI-powered Shoe Analyzer", tech: "YOLOv5, React, Node.js" },
    { name: "E-Commerce Platform", tech: "MERN Stack" },
    { name: "Dawlati Recruitment", tech: "Full Stack Development" },
    { name: "Intinere Hub Travel", tech: "React.js, Node.js" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-100 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
            hidden: {}
          }}
          className="max-w-6xl mx-auto"
        >
          {/* Header Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-center mb-16"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-black-600 via-blue-600 to-black-800 bg-clip-text text-transparent mb-6"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              About Me
            </motion.h1>
            <motion.div
              className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"
              animate={{ scaleX: [0, 1], opacity: [0, 1] }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Profile */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 }
              }}
              className="space-y-8"
            >
              {/* Profile Card */}
              <motion.div
                className="relative group"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="bg-white backdrop-blur-lg rounded-3xl p-8 border border-cyan-400/30 shadow-2xl">
                  <div className="relative z-10">
                    {/* Profile Image Placeholder */}
                    <motion.div
                      className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg"
                      animate={{ rotateY: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
SA   </motion.div>
                    
                    <h2 className="text-3xl font-bold text-black text-center mb-2">Syed Ali Akbar</h2>
                    <p className="text-cyan-400 text-center text-lg font-medium mb-4">MERN Stack Developer</p>
                    
                    <motion.div
                      className="text-black-300 text-center leading-relaxed"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <p className="mb-4">Full-stack developer with a BSCS from PAF-KIET (CGPA 3.5)</p>
                      <p>📍 Karachi, Pakistan</p>
                      <p>📧 ali59.aa96@gmail.com</p>
                    </motion.div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full opacity-60"
                    animate={{
                      y: [-10, 10, -10],
                      x: [-5, 5, -5],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-400 rounded-full opacity-60"
                    animate={{
                      y: [10, -10, 10],
                      x: [5, -5, 5],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
              </motion.div>

              {/* Stats Cards */}
              {/* <motion.div
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  { label: "Education", value: "BSCS" },
                  { label: "Projects Completed", value: "10+" },
                  { label: "Technologies", value: "10+" },
                  { label: "Scholarship Awards", value: "5x" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-slate-800/60 to-purple-800/60 backdrop-blur-sm rounded-2xl p-6 border border-cyan-400/20 text-center"
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 10,
                      boxShadow: "0 20px 40px rgba(34, 211, 238, 0.3)"
                    }}
                    animate={{
                      rotateX: [0, 5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                  >
                    <motion.div
                      className="text-3xl font-bold text-cyan-400 mb-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-gray-300 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div> */}
            </motion.div>

            {/* Right Column - Skills & Experience */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 100 },
                visible: { opacity: 1, x: 0 }
              }}
              className="space-y-8"
            >
              {/* Skills Section */}
              <motion.div
                className="bg-white backdrop-blur-lg rounded-3xl p-8 border border-cyan-400/30"
                whileHover={{ scale: 1.02 }}
              >
                <motion.h3
                  className="text-2xl font-bold text-black mb-6 flex items-center"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="mr-3">🚀</span> Technical Skills
                </motion.h3>
                
                <div className="grid grid-cols-2 gap-3 text-black">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      className="text-black bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-cyan-400/30 text-center"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotateZ: 5,
                        boxShadow: "0 10px 20px rgba(34, 211, 238, 0.4)"
                      }}
                    >
                      <span className="text-gray-500 font-medium text-sm">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

        
            </motion.div>
          </div>

          {/* Bottom CTA Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 100 },
              visible: { opacity: 1, y: 0 }
            }}
            className="text-center mt-20"
          >
            <motion.div
              className="inline-flex space-x-6"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.button
  className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg border border-cyan-400/50 cursor-pointer"
  whileHover={{ 
    scale: 1.1,
    boxShadow: "0 20px 40px rgba(34, 211, 238, 0.4)",
    rotateZ: 2
  }}
  whileTap={{ scale: 0.95 }}
                  onClick={()=>window.open("https://portfolio-git-final-s-ali-akbar.vercel.app/","_blank")}

>
  View Portfolio
</motion.button>

              
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg border border-purple-400/50 cursor-pointer"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)",
                  rotateZ: -2
                }}
                whileTap={{ scale: 0.95 }}
               onClick={() => window.open("https://github.com/ali89akbar/", "_blank")}

             >
                Get In Touch
              </motion.button>
            </motion.div>

            <motion.p
              className="text-gray-400 mt-8 text-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              "Building the future, one line of code at a time"
            </motion.p>
          </motion.div>

          {/* Floating Achievement Badges */}
          <div className="absolute top-20 right-10 space-y-4">
            {[
              { icon: "🎓", label: "BSCS Graduate" },
              { icon: "🏆", label: "5x Scholarship" },
              { icon: "💻", label: "MERN Expert" }
            ].map((badge, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-r from-slate-800/80 to-purple-800/80 backdrop-blur-sm rounded-2xl px-4 py-3 border border-cyan-400/30 shadow-lg"
                animate={{
                  y: [0, -15, 0],
                  rotateZ: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
                whileHover={{ scale: 1.1, rotateZ: 10 }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-white text-xs font-medium">{badge.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, cyan 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, purple 0%, transparent 50%)",
            "radial-gradient(circle at 50% 80%, pink 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, cyan 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </div>
  );
};

export default AboutUs;