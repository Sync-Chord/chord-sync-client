// src/routes/PrivateRoutes.js
import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import socket from "../utils/socket";
// components imports
import Sidebar from "../components/common/SideBar";
import TopBar from "../components/common/TopBar";
import MusicPlayer from "../components/common/MusicPlayer";
import { MusicPlayerProvider } from "../components/common/MusicPlayerProvider";
import { useSelector } from "react-redux";

const Home = lazy(() => import("../components/screens/home/Home"));
const Profile = lazy(() => import("../components/screens/profile/Profile"));
const Chat = lazy(() => import("../components/screens/chat/Chat"));
const FriendsList = lazy(() => import("../components/screens/friends/FriendsList"));

const PrivateRoutes = () => {
  const { user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    socket.connect();

    // Emit the user ID to the backend
    socket.emit("user_connected", user.id);

    return () => {
      socket.disconnect();
    };
  }, [user.id]);

  return (
    <MusicPlayerProvider>
      <BrowserRouter>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            overflow: "hidden",
            width: "100%",
            gap: "0.5rem",
          }}
        >
          <Box
            sx={{
              width: "15%",
              height: "100%",
            }}
          >
            <Sidebar />
          </Box>
          <Box
            sx={{
              width: "85%",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "8vh",
              }}
            >
              <TopBar />
            </Box>
            <Box
              sx={{
                width: "100%",
                overflow: "hidden",
                display: "flex",
              }}
            >
              <Box
                sx={{
                  width: "70%",
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
              <Box
                sx={{
                  width: "27%",
                }}
              >
                <MusicPlayer />
              </Box>
            </Box>
          </Box>
        </Box>
      </BrowserRouter>
    </MusicPlayerProvider>
  );
};

export default PrivateRoutes;
