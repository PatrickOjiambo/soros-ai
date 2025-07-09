/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
    const [email, setEmail] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the email to your backend
        console.log('Submitted email:', email);
        setIsDialogOpen(false);
        setEmail('');
    };

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
        <section ref={ref} className="relative overflow-hidden">
           

            <motion.div
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
                className="container mx-auto px-6 py-24 md:py-32 flex flex-col md:flex-row items-center relative z-10"
            >
                {/* Left content */}
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

                    <motion.div variants={itemVariants} className="flex gap-4">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button 
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Join Waitlist
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-gray-800 border-gray-700">
                                <DialogHeader>
                                    <DialogTitle className="text-white">Join Our Waitlist</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                                    <div className="grid items-center gap-2">
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Your email address"
                                            className="bg-gray-700 border-gray-600 text-white"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="bg-green-500 hover:bg-green-600">
                                        Submit
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>

                       
                    </motion.div>
                </div>

                {/* Right content - Chart */}
                <motion.div
                    variants={chartVariants}
                    className="md:w-1/2 relative mt-12 md:mt-0"
                >
                    <motion.div
                        initial="initial"
                        animate="pulse"
                        variants={pulseVariants}
                        className="relative h-80 md:h-96 bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 backdrop-blur-sm shadow-2xl"
                    >
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

                    {/* Animated trading indicator */}
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