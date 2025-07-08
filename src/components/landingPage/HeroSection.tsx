"use client"
import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: false
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

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
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    const chartVariants = {
        hidden: { scale: 0.95, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    const pulseVariants = {
        initial: { scale: 1 },
        pulse: {
            scale: [1, 1.02, 1],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut'
            }
        }
    };

    return (
        <section ref={ref} className="relative  overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-green-500 filter blur-3xl"></div>
                <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-blue-500 filter blur-3xl"></div>
            </div>

            <motion.div
                initial="hidden"
                animate={controls}
                variants={containerVariants}
                className="container mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center relative z-10"
            >
                <div className="md:w-1/2 mb-12 md:mb-0">
                    <motion.div variants={itemVariants} className="inline-block bg-green-500/10 px-4 py-2 rounded-full mb-6">
                        <span className="text-green-400 font-medium tracking-wider">COMING SOON</span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                            AI Trading Assistant
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
                        Automate your trading strategy with AI. Get high-probability alerts without staring at charts all day.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg"
                        >
                            <span className="relative z-10">Join Waitlist</span>
                            <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-teal-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 shadow-lg"
                        >
                            Learn More
                        </motion.button>
                    </motion.div>
                </div>

                <motion.div
                    variants={chartVariants}
                    className="md:w-1/2 relative"
                >
                    <motion.div
                        initial="initial"
                        animate="pulse"
                        variants={pulseVariants}
                        className="relative h-80 md:h-96 bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm shadow-2xl"
                    >
                        {/* Replace with your actual candlestick chart image */}
                        <Image
                            src="/candlestick-chart.png"
                            alt="AI Trading Analysis"
                            fill
                            className="object-cover"
                            priority
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="absolute bottom-4 left-4 bg-black/70 px-3 py-2 rounded-lg backdrop-blur-sm"
                        >
                            <p className="text-green-400 text-sm font-mono tracking-wider">
                                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                200+ Technical Indicators Supported
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Animated trading indicators */}
                    <div className="absolute -top-6 -right-6">
                        <motion.div
                            animate={{
                                rotate: [0, 360],
                                transition: { duration: 20, repeat: Infinity, ease: "linear" }
                            }}
                            className="w-24 h-24 border-2 border-dashed border-green-400/30 rounded-full"
                        ></motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;