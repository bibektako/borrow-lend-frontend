import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { AuthContext } from "../auth/Authprovider";

function Loginpage() {
  const { user } = useContext(AuthContext);

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default Loginpage;
