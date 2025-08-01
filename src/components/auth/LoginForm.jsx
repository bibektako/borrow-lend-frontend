import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useLoginUser } from "../../hooks/useLoginUser";

import facebook from "../../assets/images/facebook.png";
import google from "../../assets/images/google.png";

const LoginForm = ({ onToggleView }) => {
const [showPassword, setShowPassword] = useState(false);
const { mutate, isPending } = useLoginUser();

const validationSchema = Yup.object({
email: Yup.string().email("Invalid email address").required("Required"),
password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
});

const formik = useFormik({
initialValues: { email: "", password: "", remember: false },
validationSchema: validationSchema,
onSubmit: (values) => {
mutate(values);
},
});

return (
<div className="w-full">
<ToastContainer />
<div className="flex justify-center mb-6">
</div>
<h2 className="text-3xl font-bold text-gray-900">
Welcome Back!
</h2>
<p className="mt-2 text-gray-600">
Sign in to continue your journey.
</p>

<form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
    <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="you@example.com"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        {formik.touched.email && formik.errors.email ? <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div> : null}
    </div>
    <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                {/* SVG icons here */}
            </button>
        </div>
        {formik.touched.password && formik.errors.password ? <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div> : null}
        <div className="text-right mt-2">
           <Link to="/forgot-password" className="text-sm font-semibold text-blue-600 hover:underline">
             Forgot password?
           </Link>
        </div>
    </div>
    <button
      type="submit"
      disabled={isPending}
      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
    >
      {isPending ? "Signing in..." : "Sign In"}
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
    Don’t have an account?{" "}
    <button onClick={onToggleView} className="font-semibold text-blue-600 hover:underline">
      Register here
    </button>
  </p>
</div>
);
};

export default LoginForm;