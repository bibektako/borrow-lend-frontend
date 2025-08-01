import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../layouts/Header';

import ItemDetailsForm from '../components/lending/itemDetailsForm';
import LendingTips from '../components/lending/LendingTips';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../auth/Authprovider'; 

const StartLendingPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      toast.error("You need to log in to list an item.");
      const timer = setTimeout(() => {
        navigate('/signin');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-600 animate-pulse">Checking authentication...</p>
        </main>
        
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center">
          <Link to="/" className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">List Your Item</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <ItemDetailsForm />
          </div>
          <div className="lg:col-span-1">
            <LendingTips />
          </div>
        </div>
      </main>

      
    </div>
  );
};




export default StartLendingPage;
