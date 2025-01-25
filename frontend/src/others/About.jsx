'use client';

// import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Lock, Clock, Bell, Users, ArrowRight } from 'lucide-react';
// import Image from 'next/image';
import { Button } from '@/components/ui/button';
import image from "../../public/image.png"
import { Link } from 'react-router-dom';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
        },
    },
};

export default function About() {
    return (
        <motion.div
            className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="container mx-auto px-4 py-16">
                <motion.h1
                    className="text-5xl md:text-6xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"
                    variants={itemVariants}
                >
                    About Hostel Grievance Manager
                </motion.h1>

                <motion.div variants={itemVariants} className="mb-16">
                    <Card className="overflow-hidden bg-gray-50 shadow-md">
                        <div className="flex flex-col md:flex-row items-center">
                            <div className="w-full md:w-1/3 flex justify-center p-4">
                                <img
                                    className="h-48 w-48 object-cover rounded-full"
                                    src={image}
                                    alt="Hostel Grievance Manager"
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <CardContent className="w-full md:w-2/3 p-8">
                                <p className="text-xl leading-relaxed text-muted-foreground">
                                    Hostel Grievance Manager is a MERN stack web app that streamlines issue reporting and tracking in
                                    hostels. It enables residents to report problems and provides wardens with tools for efficient
                                    grievance management.
                                </p>
                            </CardContent>
                        </div>
                    </Card>
                </motion.div>

                <motion.h2
                    className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200"
                    variants={itemVariants}
                >
                    Key Features
                </motion.h2>
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                    variants={containerVariants}
                >
                    {[
                        { icon: Zap, title: 'Real-time Updates', description: 'Get instant notifications on the status of your reported issues.' },
                        { icon: Lock, title: 'Secure Authentication', description: 'Firebase-powered authentication ensures your data remains safe and private.' },
                        { icon: Clock, title: 'Efficient Tracking', description: 'Easily monitor the progress of your reported grievances from start to resolution.' },
                        { icon: Bell, title: 'Smart Notifications', description: 'Receive timely alerts about updates to your reported issues.' },
                        { icon: CheckCircle, title: 'Intuitive Interface', description: 'User-friendly design makes reporting and managing issues a breeze.' },
                        { icon: Users, title: 'Multi-user Support', description: 'Tailored interfaces for both hostellers and wardens to manage grievances effectively.' },
                    ].map((feature, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full transform transition-all hover:scale-105 duration-300 hover:shadow-2xl bg-background">
                                <CardHeader className="flex flex-col items-center space-y-2 pb-2">
                                    <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3">
                                        <feature.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <CardTitle className="text-xl font-semibold text-center">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-center text-muted-foreground">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.h2
                    className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200"
                    variants={itemVariants}
                >
                    Benefits
                </motion.h2>
                <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants}>
                    {[
                        {
                            title: 'For Hostellers',
                            benefits: [
                                'Quick and easy issue reporting',
                                'Real-time status updates',
                                'Improved communication with hostel management',
                                'Historical record of reported issues',
                            ],
                        },
                        {
                            title: 'For Wardens',
                            benefits: [
                                'Centralized grievance management system',
                                'Efficient issue prioritization and assignment',
                                'Analytics for identifying recurring problems',
                                'Improved resident satisfaction through quicker resolutions',
                            ],
                        },
                    ].map((section, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <Card className="h-full transform transition-all hover:scale-105 duration-300 hover:shadow-2xl bg-background">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                        {section.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {section.benefits.map((benefit, idx) => (
                                            <motion.li
                                                key={idx}
                                                className="flex items-start"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <ArrowRight className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                                                <span className="text-muted-foreground">{benefit}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div className="mt-16 text-center" variants={itemVariants}>
                    <Link to="/login">
                        <Button variant="default" size="lg" className="hover:scale-105">
                            Get Started Now
                        </Button>
                    </Link>

                </motion.div>
            </div>
        </motion.div>
    );
}
