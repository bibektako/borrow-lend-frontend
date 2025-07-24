import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logoImage from '../assets/images/logo.png'; // Make sure this path is correct

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here
    alert('Thank you for subscribing!');
    e.target.reset();
  };

  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Branding and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoImage} alt="Logo" className="w-9 h-9" />
              <span className="text-xl font-bold text-white">BorrowLend</span>
            </Link>
            <p className="text-sm text-slate-400">
              The easiest way to lend and borrow items in your community. Reduce waste, save money, and meet your neighbors.
            </p>
          </div>

          {/* Column 2: Company Links */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/about" className="text-sm hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-sm hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-sm hover:text-blue-400 transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Support Links */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/help" className="text-sm hover:text-blue-400 transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="text-sm hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter and Social */}
          <div className="mt-8 md:mt-0">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Stay Connected</h3>
            <p className="mt-4 text-sm text-slate-400">Get the latest updates and offers.</p>
            <form className="mt-2 flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-grow w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-6 flex space-x-5">
              <a href="#" className="text-slate-400 hover:text-white"><span className="sr-only">Facebook</span><Facebook /></a>
              <a href="#" className="text-slate-400 hover:text-white"><span className="sr-only">Instagram</span><Instagram /></a>
              <a href="#" className="text-slate-400 hover:text-white"><span className="sr-only">Twitter</span><Twitter /></a>
              <a href="#" className="text-slate-400 hover:text-white"><span className="sr-only">LinkedIn</span><Linkedin /></a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright Notice */}
        <div className="mt-12 pt-8 border-t border-slate-700 text-center">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} BorrowLend, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;