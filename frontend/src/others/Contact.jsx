import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import image from '../../public/self.jpg'
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

const ContactPage = () => {
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
          Contact Us
        </motion.h1>
        
        <motion.div variants={itemVariants} className="mb-16">
          <div className="overflow-hidden shadow-md h-screen rounded-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/3 flex justify-center p-4">
                <img
                  className="h-50 w-50 object-cover  rounded-full"
                  src={image}
                  alt="Vivek Patil"
                />
              </div>
              <div className="w-full md:w-2/3 p-8">
                <h2 className="text-3xl font-bold mb-4 text-purple-600 dark:text-purple-400">Vivek Patil</h2>
                <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-4">
                  Welcome to the Hostel Grievance Manager contact page. We're here to assist you with any questions or concerns you may have about our platform.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                    <a href="mailto:vivekjpatil1357@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">vivekjpatil1357@gmail.com</a>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">+91 7249099856</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">R.N. 422, Shivneri Boys Hostel, Ambegaon, Pune</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        
      </div>
    </motion.div>
  );
};

export default ContactPage;
