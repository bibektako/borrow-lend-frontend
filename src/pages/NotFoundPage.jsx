import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import Lottie from "lottie-react";

// Make sure this path is correct for your project structure
import notFoundAnimation from "../assets/animation/Page Not Found 404.json"; 

const NotFoundPage = () => {
  return (
    // 1. Main container: Set to full screen height and make it a relative container
    //    for positioning the buttons.
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      
      {/* 2. Lottie Animation: Positioned to cover the entire screen */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Lottie 
          animationData={notFoundAnimation} 
          loop={true} 
          // The animation will fill its container, which is the full screen
          className="w-full h-full object-cover" 
        />
      </div>

      {/* 3. Button Container: Positioned on top of the animation */}
      {/*    We use z-10 to ensure it's layered above the animation (z-0). */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-8 z-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Home size={16} />
            <span>Go to Homepage</span>
          </Link>
          <Link
            to="/browse"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-sm font-semibold text-blue-700 bg-white rounded-lg shadow-lg hover:bg-blue-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Search size={16} />
            <span>Browse Items</span>
          </Link>
        </div>
      </div>
        
    </div>
  );
};

export default NotFoundPage;