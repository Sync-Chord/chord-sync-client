import { Routes, Route, BrowserRouter } from "react-router-dom"
import React, { lazy } from "react"
import SideBar from "../components/common/SideBar"
import { Box } from "@mui/system"
import { Grid } from "@mui/material"
import NavBar from "../components/common/NavBar"
import Sidebar from "../components/common/SideBar"

const Home = lazy(() => import("../components/screens/home/Home"))

const PrivateRoutes = () => {
  return (
    <Grid container>
      <Grid item>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Grid>
    </Grid>
  )
}

export default PrivateRoutes
