import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  Link } from "react-router-dom";


import { useLoginUser } from "../../hooks/useLoginUser"; 

import facebook from "../../assets/images/facebook.png";
import google from "../../assets/images/google.png";
import logo from "../../assets/images/logo.png";

const LoginForm = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLoginUser();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  });

 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <ToastContainer />
        <div className="flex justify-center mb-4">
          <img src={logo} alt="logo" className="w-12 h-12" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Welcome back
        </h2>
        <p className="text-center text-gray-600">
          Sign in to your account to continue
        </p>

        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
           <div className="relative">
              <input
                id="password"
                name="password"
                
                type={showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
              
              <button
                type="button" // Important to prevent form submission
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-sm text-red-500 mt-1">
                {formik.errors.password}
              </div>
            ) : null}
            
            {/* --- 2. THE CHANGE IS HERE --- */}
            {/* We replace the <a> tag with a <Link> component */}
            <div className="text-right mt-1">
               <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                 Forgot password?
               </Link>
             </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              onChange={formik.handleChange}
              checked={formik.values.remember}
              className="mr-2"
            />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-2 text-sm text-gray-500">OR CONTINUE WITH</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>
        
        <div className="flex space-x-4">
          <button className="w-1/2 border py-2 rounded-lg flex items-center justify-center hover:bg-gray-100">
            <img src={google} alt="Google" className="w-5 h-5 mr-2" />
            Google
          </button>
          <button className="w-1/2 border py-2 rounded-lg flex items-center justify-center hover:bg-gray-100">
            <img src={facebook} alt="Facebook" className="w-5 h-5 mr-2" />
            Facebook
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signUp"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;