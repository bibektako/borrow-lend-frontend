import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useRegisterUserTan } from "../../hooks/useRegisterUserTan";

import facebook from "../../assets/images/facebook.png";
import google from "../../assets/images/google.png";

// The component now accepts `onToggleView` as a prop
const SignupForm = ({ onToggleView }) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useRegisterUserTan();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    phoneNo: Yup.string().matches(/^[0-9]{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    terms: Yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const formik = useFormik({
    initialValues: { fullName: "", email: "", phoneNo: "", password: "", terms: false },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const apiData = {
        username: values.fullName,
        email: values.email,
        phone: values.phoneNo,
        password: values.password,
      };
      mutate(apiData, {
        onSuccess: () => {
          resetForm();
          setTimeout(() => navigate("/signin"), 1500);
        },
      });
    },
  });

  return (
    <div className="w-full">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-gray-900">
        Create an Account
      </h2>
      <p className="mt-2 text-gray-600 mb-6">
        Join our community to start sharing.
      </p>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* All your input fields (fullName, email, phoneNo, password, terms) go here */}
        {/* They remain exactly the same as your original code */}
        <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName ? <div className="text-sm text-red-500 mt-1">{formik.errors.fullName}</div> : null}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div> : null}
          </div>
          <div>
            <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              id="phoneNo"
              name="phoneNo"
              type="tel"
              placeholder="Enter your phone number"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNo}
            />
            {formik.touched.phoneNo && formik.errors.phoneNo ? <div className="text-sm text-red-500 mt-1">{formik.errors.phoneNo}</div> : null}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                {/* SVG icons here */}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div> : null}
          </div>
           <div className="flex items-center">
            <input id="terms" name="terms" type="checkbox" className="mr-2" onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.terms} />
            <label htmlFor="terms" className="text-sm text-gray-700">I agree to the <a href="#" className="text-blue-600 hover:underline">Terms</a> and <a href="#" className="text-blue-600 hover:underline">Policy</a></label>
          </div>
          {formik.touched.terms && formik.errors.terms ? <div className="text-sm text-red-500 mt-1">{formik.errors.terms}</div> : null}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {isPending ? "Registering..." : "Create Account"}
        </button>
      </form>
      <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-4 text-sm font-medium text-gray-400">OR</span>
          <div className="flex-grow h-px bg-gray-200" />
      </div>
      <div className="flex space-x-4">
        <button className="w-1/2 border py-2 rounded-lg flex items-center justify-center hover:bg-gray-100"><img src={google} alt="Google" className="w-5 h-5 mr-2" />Google</button>
        <button className="w-1/2 border py-2 rounded-lg flex items-center justify-center hover:bg-gray-100"><img src={facebook} alt="Facebook" className="w-5 h-5 mr-2" />Facebook</button>
      </div>
      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button onClick={onToggleView} className="font-semibold text-blue-600 hover:underline">
          Sign in
        </button>
      </p>
    </div>
  );
};

export default SignupForm;