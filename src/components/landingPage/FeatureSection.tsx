/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client"
import React from 'react';
import { FiZap, FiCode, FiBell, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FeaturesSection = () => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const features = [
        {
            icon: <FiZap className="w-6 h-6" />,
            title: "200+ Built-In Indicators",
            description: "From Bollinger Bands to Ichimoku Clouds, we support them all."
        },
        {
            icon: <FiCode className="w-6 h-6" />,
            title: "No-Code Strategy Builder",
            description: "Describe your rules in plain English. No programming needed."
        },
        {
            icon: <FiBell className="w-6 h-6" />,
            title: "Smart Notifications",
            description: "Get alerts only when your exact criteria are met."
        },
        {
            icon: <FiTrendingUp className="w-6 h-6" />,
            title: "Backtested Results",
            description: "Verify your strategy's performance before going live."
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1]
            }
        }
    };

    const featureCardHover = {
        scale: 1.03,
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderColor: "rgba(74, 222, 128, 0.5)"
    };

    return (
        <section ref={ref} className="relative  pb-4 pt-24 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute top-1/4 left-1/4 w-60 h-60 rounded-full bg-green-500 filter blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500 filter blur-3xl"></div>
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
                            Why Traders Love Our Platform
                        </span>
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
                    >
                        Stop wasting hours analyzing charts—let AI scan the markets for you.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={featureCardHover}
                            className="bg-gray-800/40 p-8 rounded-xl border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-gray-800/60"
                        >
                            <div className="mb-6">
                                <div className="relative inline-flex">
                                    <div className="absolute inset-0 bg-green-500/10 rounded-full blur-sm"></div>
                                    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/20">
                                        {React.cloneElement(feature.icon, { className: "w-6 h-6 text-green-400" })}
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            <div className="mt-6 pt-6 border-t border-gray-700/50">
                                <span className="text-xs font-mono tracking-wider text-green-400/80">FEATURE 0{index + 1}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturesSection;