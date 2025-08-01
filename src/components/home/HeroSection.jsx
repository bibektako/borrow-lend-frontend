import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import heroAnimation from '../../assets/animation/animation.json'; 

const HeroSection = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center px-6 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center lg:text-left"
        >
          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter">
            Don't Buy It.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent animate-background-pan bg-[200%_auto]">
              Just Borrow It.
            </span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-lg mx-auto lg:mx-0">
            Access thousands of items from your neighbors and local community. Save money, reduce waste, and connect with people around you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/browse" className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all">
              Start Browsing
            </Link>
            <Link to="/start-lending" className="bg-white text-slate-700 font-semibold py-3 px-8 rounded-lg border border-slate-300 hover:bg-slate-100 transform hover:scale-105 transition-all">
              Become a Lender
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <Lottie animationData={heroAnimation} loop={true} className="w-full max-w-md mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;