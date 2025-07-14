import React from 'react';
import { motion } from 'framer-motion';
import dashboardImage from '../../assets/image.png';

const DashboardView: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="p-8 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl font-extrabold text-gray-800 mb-4 text-center"
        variants={itemVariants}
      >
        Welcome to xFILE Console
      </motion.h1>
      <motion.p
        className="text-lg text-gray-600 mb-12 text-center max-w-prose"
        variants={itemVariants}
      >
        Your comprehensive solution for secure file management and seamless data transmission.
      </motion.p>
      <motion.div
        className="flex justify-center items-center w-full"
        variants={itemVariants}
      >
        <img src={dashboardImage} alt="Dashboard Illustration" className="max-w-3xl h-auto" />
      </motion.div>
    </motion.div>
  );
};

export default DashboardView;