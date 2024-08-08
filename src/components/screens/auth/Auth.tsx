//module imports
import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//component imports
import Otp from "./Otp";
const Login = lazy(() => import("./Login"));
const Signup = lazy(() => import("./SignUp"));

const Auth = () => {
  return (
    <>
      <ToastContainer
        pauseOnFocusLoss={false}
        position="top-center"
        pauseOnHover={false}
        autoClose={2000}
      />

      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
        <Route path="login-by-otp" element={<Otp type="login" />} />
        <Route path="verify-otp/:token" element={<Otp type="verifyotp" />} />
        <Route path="forget-password" element={<Otp type="forgetpassword" />} />
      </Routes>
    </>
  );
};

export default Auth;
