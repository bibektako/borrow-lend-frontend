import React from "react";
import Header from "../layouts/Header";
import Categories from "../components/home/Categories";
import HeroSection from "../components/home/HeroSection";
import Footer from "../layouts/Footer";

const HomePage = () => {
  return (
    <div className="bg-[#f9fbfd] min-h-screen">
      
      <HeroSection />
      <Categories />
    
    </div>
  );
};

export default HomePage;
