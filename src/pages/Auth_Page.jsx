import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

// Import your reusable form components
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

// Import your visual assets
import AuthImage from '../assets/images/auth image.png';
import logo from '../assets/images/logo.png';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState('login');
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const newView = location.pathname === '/signup' ? 'signup' : 'login';
    if (view === 'login' && newView === 'signup') setDirection(1);
    else if (view === 'signup' && newView === 'login') setDirection(-1);
    setView(newView);
  }, [location.pathname, view]);

  const toggleView = () => {
    const newPath = view === 'login' ? '/signup' : '/signin';
    navigate(newPath);
  };

  const formVariants = {
    hidden: (customDirection) => ({
      opacity: 0,
      x: customDirection > 0 ? '100%' : '-100%',
      transition: { duration: 0.2, ease: 'easeInOut' }
    }),
    visible: {
      opacity: 1,
      x: '0%',
      transition: { duration: 0.4, ease: 'easeInOut' }
    },
    exit: (customDirection) => ({
      opacity: 0,
      x: customDirection > 0 ? '-100%' : '100%',
      transition: { duration: 0.2, ease: 'easeInOut' }
    }),
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans">
      
      {/* --- 1. THE VISUAL BRANDING IS NOW ON THE LEFT --- */}
      <div className="hidden lg:block relative overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
          src={AuthImage} 
          alt="People sharing items in a friendly community" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/70 to-transparent" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 text-white p-12"
        >
            <h1 className="text-4xl font-bold leading-tight drop-shadow-lg">
              Share More. <br/> Spend Less.
            </h1>
            <p className="mt-4 text-lg text-blue-200 max-w-sm drop-shadow-md">
              Join a trusted community marketplace built on sustainability and connection.
            </p>
        </motion.div>
      </div>

      {/* --- 2. THE ANIMATED FORMS ARE NOW ON THE RIGHT --- */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <img src={logo} alt="BorrowLend Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-gray-800">BorrowLend</span>
          </motion.div>
          
          <div className="relative overflow-hidden h-[750px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={view}
                custom={direction}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute w-full"
              >
                {view === 'login' ? (
                  <LoginForm onToggleView={toggleView} />
                ) : (
                  <SignupForm onToggleView={toggleView} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AuthPage;