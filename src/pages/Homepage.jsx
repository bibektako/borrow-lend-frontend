import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, DollarSign, Users, ArrowRight } from 'lucide-react';

import HeroSection from '../components/home/HeroSection';
import Categories from '../components/home/Categories';

const TrustBar = () => (
    <div className="bg-slate-50 border-y">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-6 py-8 text-center">
            <div className="flex flex-col items-center">
                <ShieldCheck className="w-10 h-10 text-blue-500 mb-2"/>
                <h3 className="font-semibold text-slate-800">Verified & Trusted</h3>
                <p className="text-sm text-slate-500">A safe community built on user reviews and trust.</p>
            </div>
            <div className="flex flex-col items-center">
                <DollarSign className="w-10 h-10 text-blue-500 mb-2"/>
                <h3 className="font-semibold text-slate-800">Secure Payments</h3>
                <p className="text-sm text-slate-500">All transactions are handled securely through our platform.</p>
            </div>
            <div className="flex flex-col items-center">
                <Users className="w-10 h-10 text-blue-500 mb-2"/>
                <h3 className="font-semibold text-slate-800">Community Powered</h3>
                <p className="text-sm text-slate-500">Join thousands of neighbors sharing and saving.</p>
            </div>
        </div>
    </div>
);

const HowItWorksSection = () => (
    <section className="bg-white py-20 lg:py-28">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">Get started in just three simple steps.</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                <div className="bg-slate-50 p-8 rounded-xl animate-fade-in-up">
                    <span className="font-bold text-5xl text-blue-200">01</span>
                    <h3 className="font-bold text-xl text-slate-800 mt-4">Find & Request</h3>
                    <p className="text-slate-500 mt-2">Browse items nearby and send a borrow request to the owner.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-xl animate-fade-in-up animation-delay-200">
                    <span className="font-bold text-5xl text-blue-200">02</span>
                    <h3 className="font-bold text-xl text-slate-800 mt-4">Coordinate & Pay</h3>
                    <p className="text-slate-500 mt-2">Once approved, arrange a pickup and pay securely.</p>
                </div>
                <div className="bg-slate-50 p-8 rounded-xl animate-fade-in-up animation-delay-400">
                    <span className="font-bold text-5xl text-blue-200">03</span>
                    <h3 className="font-bold text-xl text-slate-800 mt-4">Use & Return</h3>
                    <p className="text-slate-500 mt-2">Enjoy your item! Return it on time and leave a review.</p>
                </div>
            </div>
        </div>
    </section>
);

const CtaSection = () => (
    <section className="bg-blue-600">
        <div className="container mx-auto px-6 py-20 text-center text-white">
            <h2 className="text-4xl font-bold">Join a Smarter Way to Own</h2>
            <p className="mt-3 text-lg text-blue-200 max-w-2xl mx-auto">
                Ready to save money, reduce waste, and meet your neighbors?
            </p>
            <Link to="/signup" className="mt-8 inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-slate-100 transform hover:scale-105 transition-all">
                Sign Up for Free <ArrowRight size={18} />
            </Link>
        </div>
    </section>
);

const HomePage = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <TrustBar />
      <Categories />
      <HowItWorksSection />
      <CtaSection />
    </div>
  );
};

export default HomePage;