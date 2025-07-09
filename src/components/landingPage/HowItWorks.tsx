/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client"
import React from 'react';
import { FiEdit, FiCpu, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HowItWorks = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const steps = [
    {
      icon: <FiEdit className="w-6 h-6" />,
      title: "Describe Your Strategy",
      description: "Explain your trading rules in plain English",
      accent: "from-green-400 to-emerald-500"
    },
    {
      icon: <FiCpu className="w-6 h-6" />,
      title: "AI Builds Your Agent",
      description: "Our system translates your words into precise trading logic",
      accent: "from-blue-400 to-cyan-500"
    },
    {
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: "Execute with Confidence",
      description: "Receive real-time alerts for optimal entries",
      accent: "from-purple-400 to-indigo-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const stepConnector = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section ref={ref} className="relative  pt-24 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-green-500 filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-blue-500 filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
              How It Works
            </span>
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Three simple steps to automate your trading strategy
          </motion.p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative flex flex-col md:flex-row gap-4 md:gap-8 justify-center items-stretch"
        >
          {/* Animated connector line */}
          <motion.div
            variants={stepConnector}
            className="hidden md:block absolute top-[72px] left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20"
          />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="flex-1 flex flex-col items-center"
            >
              {/* Step number */}
              <div className="relative z-10 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-full blur-sm"></div>
                <div className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${step.accent}/20 to-gray-800/50 border border-gray-700/50 backdrop-blur-sm`}>
                  <div className={`bg-gradient-to-br ${step.accent} bg-clip-text text-transparent`}>
                    {React.cloneElement(step.icon, { className: "w-8 h-8" })}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gray-900 border border-gray-700 rounded-full w-6 h-6 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{index + 1}</span>
                  </div>
                </div>
              </div>

              {/* Step card */}
              <div className={`bg-gradient-to-b from-gray-800/40 to-gray-900/30 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm w-full h-full transition-all duration-300 hover:border-${step.accent.split(' ')[0]}/30`}>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                <div className="mt-6 pt-6 border-t border-gray-700/30">
                  <span className={`text-xs font-mono tracking-wider bg-gradient-to-r ${step.accent} bg-clip-text text-transparent`}>
                    STEP {index + 1}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;