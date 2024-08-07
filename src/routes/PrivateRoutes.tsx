import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../components/common/SideBar";

const Home = lazy(() => import("../components/screens/home/Home"));
// for css Style
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const PrivateRoutes = () => {
  return (
    <Box sx={{ display: "flex", flexFlow: "row nowrap" }}>
      <Box>
        <Sidebar />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <BrowserRouter>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </Box>
  );
};

export default PrivateRoutes;
