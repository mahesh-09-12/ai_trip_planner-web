import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!user) {
      toast.error("Please Sign in first!");
      setTimeout(() => setRedirect(true), 500);
    }
  }, []);
  if (redirect) {
    return <Navigate to="/" replace />;
  }
  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
