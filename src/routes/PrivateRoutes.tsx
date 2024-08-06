import { Routes, Route, BrowserRouter } from "react-router-dom"
import React, { lazy } from "react"

const Home = lazy(() => import("../components/screens/home/Home"))

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={<Home />} />
        {/* <Route path="Signup" element={<SignUp />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />
        <Route path="otp" element={<Otp />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default PrivateRoutes
