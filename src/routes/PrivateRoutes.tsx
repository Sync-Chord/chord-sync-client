import { Box } from "@mui/system";
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
//components imports
import Sidebar from "../components/common/SideBar"
import TopBar from "../components/common/TopBar"

const Home = lazy(() => import("../components/screens/home/Home"))
const Chat = lazy(() => import("../components/screens/chat/Chat"))
const FriendsList = lazy(
  () => import("../components/screens/friends/FriendsList")
)
const FriendsSuggestionsPage = lazy(
  () => import("../components/screens/friends/Friendtemp")
)
const PrivateRoutes = () => {
  return (
    <Box sx={{ display: "flex", flexFlow: "row nowrap" }}>
      <BrowserRouter>
        <Box
          sx={{
            width: "15%",
            height: "100vh",
            backgroundColor: "white",
          }}
        >
          <Sidebar />
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box>
            <TopBar />
          </Box>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="chat" element={<Chat />} />
            <Route path="friend" element={<FriendsList />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  )
}

export default PrivateRoutes;
