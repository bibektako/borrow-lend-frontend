import React from "react";
import Header from "../layouts/Header";
import Categories from "../components/home/Categories";
import HeroSection from "../components/home/HeroSection";

const HomePage = () => {
  return (
    <div className="bg-[#f9fbfd] min-h-screen">
      <Header />
      <HeroSection />
      <Categories />
    </div>
  );
};

export default HomePage;
