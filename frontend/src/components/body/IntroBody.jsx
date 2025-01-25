import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, ShieldCheck, Hotel } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

const IntroBody = () => {

    useEffect(() => {
    
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // For smooth scrolling
            });
        }
        scrollToTop()
    },[])
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    };

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

 

    return (
        <main className="flex-1 " >
            <div className="container mx-auto px-4 py-16 bg-white ">
                {/* Animated Header */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={container}
                    className="max-w-4xl mx-auto text-center mb-16 space-y-4"
                >
                    <motion.div
                        variants={fadeIn}
                        className="flex items-center justify-center mb-6 space-x-4"
                    >
                        <Hotel className="w-12 h-12 text-black-500"  />
                        <Hotel className="w-12 h-12 text-black-500" />
                        <Hotel className="w-12 h-12 text-black-500" />

                    </motion.div>
                    <motion.h1
                        variants={fadeIn}
                        className="text-5xl md:text-6xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"

                        
                    >
                        Welcome to HostelMate
                    </motion.h1>
                    <motion.p
                        variants={fadeIn}
                        className="text-xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Experience seamless access to our system with enhanced security and
                        user-friendly interface.
                    </motion.p>
                </motion.div>

                {/* Animated Cards */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4"
                >
                    {/* User Portal Card */}
                    <motion.div
                        variants={fadeIn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardContent className="p-8 relative">
                                <div className="text-center space-y-6">
                                    <div className="relative">
                                        <motion.div
                                            className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors duration-500 "
                                            initial={{ rotate: 0 }}
                                            whileHover={{ rotate: 360 }}
                                        >
                                            <Users className="w-10 h-10 text-blue-500 group-hover:text-white transition-colors duration-500" />
                                        </motion.div>
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">
                                        User Portal
                                    </h2>
                                    <p className="text-gray-500 text-lg pb-10">For Hostellers</p>
                                    <Link to="/login/user">
                                        <Button className="w-full text-lg h-12 bg-blue-500 hover:bg-blue-600 transform transition-all duration-300 hover:scale-105">
                                            Access User Portal
                                            <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Admin Portal Card */}
                    <motion.div
                        variants={fadeIn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <CardContent className="p-8 relative">
                                <div className="text-center space-y-6">
                                    <div className="relative">
                                        <motion.div
                                            className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-900 transition-colors duration-500 transform rotate-45 group-hover:rotate-[225deg]"
                                            initial={{ rotate: 0 }}
                                            whileHover={{ rotate: 360 }}
                                        >
                                            <ShieldCheck className="w-10 h-10 text-gray-600 group-hover:text-white transition-colors duration-500" />
                                        </motion.div>
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900">
                                        Admin Portal
                                    </h2>
                                    <p className="text-gray-500 text-lg pb-10">
                                        For Hostel Authority
                                    </p>
                                    <Link to="/login/admin">
                                        <Button
                                            variant="secondary"
                                            className="w-full text-lg h-12 hover:bg-gray-900 hover:text-white transform transition-all duration-300 hover:scale-105"
                                        >
                                            Access Admin Portal
                                            <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </motion.div>

            </div>
        </main>
    );
};

export default IntroBody;
