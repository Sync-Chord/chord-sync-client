import { Box } from "@mui/system";
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//components imports
import Sidebar from "../components/common/SideBar";
import TopBar from "../components/common/TopBar"

const Home = lazy(() => import("../components/screens/home/Home"))
const Profile = lazy(() => import("../components/screens/profile/Profile"))
const Chat = lazy(() => import("../components/screens/chat/Chat"))
const FriendsList = lazy(
  () => import("../components/screens/friends/FriendsList")
)

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <Box
          sx={{
            width: "15%",
            height: "100vh",
            backgroundColor: "white",
          }}
        >
          <Sidebar />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: "100vh",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "8vh", // TopBar takes up 8% of the height
              backgroundColor: "blue",
            }}
          >
            <TopBar />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              height: "calc(100vh - 18vh)", // Content area takes the remaining height
              overflow: "hidden",
            }}
          >
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="chat" element={<Chat />} />
              <Route path="friend" element={<FriendsList />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Box>
          {/* <Box
            sx={{
              width: "100%",
              paddingLeft: 25,
              paddingBottom: 4,
              height: "8vh", // MusicPlayer takes up 10% of the height
            }}
          >
            <MusicPlayer
              title="SoundHelix Song 1"
              artist="SoundHelix"
              src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
              autoPlay={false}
            />
          </Box> */}
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default PrivateRoutes;
