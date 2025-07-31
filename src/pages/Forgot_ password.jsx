import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { forgotPasswordApi } from '../api/authAPI'; // We'll need to create this

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await forgotPasswordApi({ email });
      toast.success("If an account with that email exists, a reset link has been sent.");
      setIsSubmitted(true); // Show a success message
    } catch (error) {
      // For security, show a generic success message even on failure
      toast.success("If an account with that email exists, a reset link has been sent.");
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Check Your Email</h2>
            <p className="mt-4 text-gray-600">
              A password reset link has been sent to your email address. Please follow the instructions in the email to reset your password.
            </p>
            <Link to="/signin" className="inline-block mt-6 text-sm text-blue-600 hover:underline">
              ← Back to Sign In
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">Forgot Your Password?</h2>
            <p className="text-center text-gray-600">
              No problem. Enter your email address below and we'll send you a link to reset it.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
             <div className="text-center">
                <Link to="/signin" className="text-sm text-blue-600 hover:underline">
                    Remembered your password? Sign in.
                </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;