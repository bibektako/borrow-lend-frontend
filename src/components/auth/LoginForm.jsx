import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import facebook from "../../assets/images/facebook.png";
import google from "../../assets/images/google.png";
import logo from "../../assets/images/logo.png";
import { loginUserApi } from "../../api/authAPI";

const LoginForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    remember: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await loginUserApi({
        email: values.email,
        password: values.password,
      });

      const token = response.data?.token;
      const user = response.data?.data;

      if (!token || !user) {
        toast.error("Invalid login response from the server.");
        setSubmitting(false);
        return;
      }

      // Save token (localStorage or sessionStorage based on "remember" checkbox)
      if (values.remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("Welcome back!");
      resetForm();

      setTimeout(() => {
        setSubmitting(false);

        if (user.role === "admin") {
          navigate("/admin/categories");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setSubmitting(false);
    }
  };

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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500 mt-1"
                />
                <div className="text-right mt-1">
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <Field type="checkbox" name="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

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
          <a
            href="#"
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/signUp")}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
