import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import facebook from '../../assets/images/facebook.png';
import google from '../../assets/images/google.png';
import { registerUserApi } from '/src/api/authAPI.js';


const SignupForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    email: "",
    phoneNo: "",
    password: "",
    terms: false,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phoneNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[0-9]/, "Password must contain a number")
      .matches(/[!@#$%^&*]/, "Password must contain a special character")
      .required("Password is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and privacy policy"
    ),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await registerUserApi({
        username: values.fullName,
        email: values.email,
        phone: values.phoneNo,
        password: values.password,
      });

      toast.success("Account created successfully!");
      resetForm();

      setTimeout(() => {
        navigate("/signin"); // Redirect after signup
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <ToastContainer />
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Create an account
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Join our community to start lending and borrowing
        </p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Field
                  name="fullName"
                  placeholder="Enter your full name"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Field
                  name="phoneNo"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="phoneNo"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long with a number and
                  a special character.
                </p>
              </div>

              <div className="flex items-center">
                <Field type="checkbox" name="terms" className="mr-2" />
                <label className="text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
              <ErrorMessage
                name="terms"
                component="div"
                className="text-sm text-red-500 mt-1"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-2 text-sm text-gray-500">OR REGISTER WITH</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        <div className="flex space-x-4">
          <button className="w-1/2 border py-2 rounded-lg flex items-center justify-center hover:bg-gray-100">
            <img src={google} alt="Google" className="w-5 h-5 mr-2" />
            Google
          </button>
          <button className="w-1/2 border py-2 rounded-lg flex items-center justify-center hover:bg-gray-100">
            <img
              src={facebook}
              alt="Facebook"
              className="w-5 h-5 mr-2"
            />
            Facebook
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
