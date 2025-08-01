import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield, Recycle, Handshake, Quote } from 'lucide-react';

// Sub-components for a cleaner main component
const ValueCard = ({ icon, title, delay, children }) => (
  <div className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center animate-fade-in-up ${delay}`}>
    <div className="flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-5">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{children}</p>
  </div>
);

const TeamMemberCard = ({ avatarUrl, name, role, delay }) => (
    <div className={`text-center animate-fade-in-up ${delay}`}>
        <img src={avatarUrl} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg object-cover" />
        <h4 className="font-bold text-lg text-gray-800">{name}</h4>
        <p className="text-blue-600">{role}</p>
    </div>
);

const AboutUsPage = () => {
  return (
    <div className="bg-slate-50">
      {/* --- Hero Section --- */}
      <section className="relative bg-white pt-24 pb-16 text-center">
        <div className="container mx-auto px-6">
          <p className="text-blue-600 font-semibold uppercase tracking-wider animate-fade-in-up">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mt-2 animate-fade-in-up animation-delay-200">
            We believe in access over ownership.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 animate-fade-in-up animation-delay-400">
            BorrowLend started with a simple question: why buy something you'll only use once? We're building a future where communities share more and waste less.
          </p>
        </div>
      </section>

      {/* --- Our Mission --- */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission: Less Waste, More Connection</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our mission is to empower people to live more sustainably and affordably. We're creating a trusted platform where you can easily borrow items from your neighbors or earn money from the things you already own.
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-6">
              "The most sustainable product is the one that already exists. We're here to help you use it."
            </blockquote>
            <p className="text-gray-700 leading-relaxed">
              Every loan on our platform reduces clutter, saves money, and builds a small connection between two people. That's a win for your wallet, your community, and our planet.
            </p>
          </div>
          <div className="flex justify-center animate-fade-in-up animation-delay-200">
            <Handshake size={200} className="text-blue-200" strokeWidth={0.5} />
          </div>
        </div>
      </section>

      {/* --- Our Values --- */}
      <section className="bg-white py-20 lg:py-28 border-y">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">The Principles That Guide Us</h2>
            <p className="mt-3 text-lg text-gray-600">These values are the foundation of our community and our platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard icon={<Shield size={28} />} title="Unwavering Trust" delay="animation-delay-200">
              Your safety is non-negotiable. We build trust into every feature, from user verification to secure messaging.
            </ValueCard>
            <ValueCard icon={<Users size={28} />} title="Community Powered" delay="animation-delay-400">
              We're a platform built for and by our users. We listen, adapt, and grow with our community of sharers.
            </ValueCard>
            <ValueCard icon={<Recycle size={28} />} title="Sustainable Living" delay="animation-delay-200">
              We champion a circular economy. By making sharing easy, we actively combat over-consumption and waste.
            </ValueCard>
          </div>
        </div>
      </section>

      {/* --- Join Us CTA --- */}
      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-4xl font-bold">Join a Community of Smart Sharers</h2>
            <p className="mt-3 text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Ready to start saving money and reducing waste? Your community is waiting.
            </p>
            <Link to="/browse" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-transform">
                Start Exploring
            </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;