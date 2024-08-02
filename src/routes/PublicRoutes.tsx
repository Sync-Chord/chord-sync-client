import React from 'react'
import { Routes,Route,BrowserRouter } from "react-router-dom";
import { lazy } from 'react';


const Login= lazy(()=> import ("../components/screens/auth/Login"))
const PublicRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path="/" element={<Login />}>
        <Route path='login' element={<Login />} />
        {/* <Route path="Signup" element={<SignUp />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
        <Route path="otp" element={<Otp />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default PublicRoutes