import React from 'react';
import { motion } from 'framer-motion';

const Help = () => {
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

  const inputVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: '#7F56D9', transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <div className='w-full p-10 bg-white'>
      <motion.h2
        className="text-2xl md:text-3xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"

        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        Send Us a Message
      </motion.h2>

      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-2xl mx-auto overflow-hidden shadow-xl rounded-lg">
          <div className="p-6">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <motion.input
                  id="name"
                  placeholder="Your Name"
                  className="w-full p-2 border rounded-md"
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <motion.input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full p-2 border rounded-md"
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <motion.textarea
                  id="message"
                  placeholder="Your message here..."
                  className="w-full p-2 border rounded-md min-h-[150px]"
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Help;
