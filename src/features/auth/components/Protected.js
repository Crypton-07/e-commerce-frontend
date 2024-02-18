import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  return <>{!user ? <Navigate to={"/login"} replace={true} /> : children}</>;
};

export default Protected;
