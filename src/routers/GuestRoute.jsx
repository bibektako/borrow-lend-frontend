import React, { useContext } from "react";
import { AuthContext } from "../auth/Authprovider";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoute() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/categories" />;
    }
    return <Navigate to="/browse" />;
  }

  return <Outlet />;
}
