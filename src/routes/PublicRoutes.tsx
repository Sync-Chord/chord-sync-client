import React from 'react'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { lazy } from 'react';

const Auth = lazy(() => import("../components/screens/auth/Auth"))



const PublicRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default PublicRoutes