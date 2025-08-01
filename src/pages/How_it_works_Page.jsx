import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Send, CheckCircle, List, UserCheck, Repeat, HelpCircle, ChevronDown } from 'lucide-react';

const Step = ({ icon, number, title, children, reverse = false }) => (
  <div className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? 'md:flex-row-reverse' : ''} animate-fade-in-up`}>
    <div className="flex-1 text-center md:text-left">
      <p className="text-lg font-semibold text-blue-600 mb-2">STEP {number}</p>
      <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{children}</p>
    </div>
    <div className="flex-1 flex items-center justify-center p-8 bg-slate-100 rounded-2xl">
      {icon}
    </div>
  </div>
);

const HowItWorksPage = () => {
  return (
    <div className="bg-white">
      <section className="text-center pt-24 pb-16 bg-slate-50 border-b">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight animate-fade-in-up">
            Borrowing & Lending, Simplified.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 animate-fade-in-up animation-delay-200">
            Follow our simple, secure process to start sharing in minutes. Here’s everything you need to know.
          </p>
        </div>
      </section>

      {/* --- Process Section --- */}
      <section className="container mx-auto px-6 py-20 lg:py-28 space-y-20">
        <Step number="01" title="Find What You Need" icon={<Search size={100} className="text-blue-500" strokeWidth={1}/>}>
          As a **Borrower**, your journey starts with a search. Browse thousands of items listed by your neighbors. From power tools for a weekend project to a camera for your vacation, find it all without the cost of buying.
        </Step>
        
        <Step number="02" title="List What You Have" icon={<List size={100} className="text-blue-500" strokeWidth={1}/>} reverse={true}>
          As a **Lender**, your journey begins by sharing. Take a few photos of an item you don't use often, write a quick description, and set your price. It's free to list and a great way to earn extra cash.
        </Step>

        <Step number="03" title="Request & Approve" icon={<UserCheck size={100} className="text-blue-500" strokeWidth={1}/>}>
          **Borrowers** send a request. **Lenders** receive it, review the borrower's profile, and can approve with a single click. Our secure platform keeps everyone informed and ensures a smooth process.
        </Step>

        <Step number="04" title="Coordinate & Exchange" icon={<Repeat size={100} className="text-blue-500" strokeWidth={1}/>} reverse={true}>
          Once approved, use our secure messaging to arrange a safe pickup. The item is exchanged, and the rental period begins. All payments are handled securely through our system for peace of mind.
        </Step>
      </section>

      <section className="bg-slate-50 py-20 lg:py-28 border-y">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <HelpCircle className="mx-auto text-blue-600 mb-4" size={40} />
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-3 text-lg text-gray-600">Have questions? We have answers.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-6 bg-white border rounded-lg">
              <h4 className="font-semibold text-gray-800 flex justify-between items-center">Is my item protected? <ChevronDown/></h4>
              <p className="text-gray-600 mt-2">Yes! We offer an optional Lender Guarantee for peace of mind, and our community is built on a foundation of user reviews and trust.</p>
            </div>
            <div className="p-6 bg-white border rounded-lg">
              <h4 className="font-semibold text-gray-800 flex justify-between items-center">How do payments work? <ChevronDown/></h4>
              <p className="text-gray-600 mt-2">All payments are processed securely through Stripe. Lenders receive their payout directly to their bank account after a rental is completed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white">
        <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-4xl font-bold">Ready to Join?</h2>
            <p className="mt-3 text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Start your sharing journey today and become part of a smarter, more sustainable community.
            </p>
            <Link to="/signUp" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transform hover:scale-105 transition-transform">
                Sign Up for Free
            </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;