import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);

  if (!user) {
    return <Navigate to={"/login"} replace={true} />;
  }
  if (user && user?.role !== "admin") {
    return <Navigate to={"/"} replace={true} />;
  }
  return children;
};

export default ProtectedAdmin;
