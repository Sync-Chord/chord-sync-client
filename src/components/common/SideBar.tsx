import { Chat, Logout } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import symbol from "../../assests/images/symbol.jpg";
import styled from "@emotion/styled";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout_reducer } from "../../redux/authReducer";
import { useDispatch } from "react-redux";
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState<string>("");

  const handleLogout = () => {
    // Clear the local storage
    dispatch(logout_reducer());
    // to navigate to login
    navigate("/auth/login");
  };
  const handleListItemClick = (path: string) => {
    setSelectedIndex(path);
    navigate(path);
  };

  const DrawerHeader = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const navigations = [
    {
      name: "Home",
      path: "/home",
      icon: <HomeIcon />,
    },
    {
      name: "Chat",
      path: "/chat",
      icon: <Chat />,
    },
    {
      name: "Friends",
      path: "/friend",
      icon: <PeopleIcon />,
    },
  ];

  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      <Box>
        <DrawerHeader>
          <img
            src={symbol}
            alt="Logo"
            style={{ maxHeight: "2rem", padding: "1rem" }}
          />
        </DrawerHeader>
        <List>
          {navigations.map((el) => (
            <ListItem
              key={el.path}
              onClick={() => handleListItemClick(el.path)}
              sx={{
                backgroundColor:
                  selectedIndex === el.path ? "#27AE60" : "inherit",
                "&:hover": {
                  backgroundColor: "lightgrey",
                },
              }}
            >
              <ListItemIcon
                sx={{ color: selectedIndex === el.path ? "white" : "inherit" }}
              >
                {el.icon}
              </ListItemIcon>
              <ListItemText
                primary={el.name}
                sx={{ color: selectedIndex === el.path ? "white" : "inherit" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "1%",
          width: "100%",
          display: "flex",
          backgroundColor: "#27AE60",
          borderRadius: "0.5rem",
          padding: "0.5rem",
          alignItems: "center",
          gap: "0.8rem",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={handleLogout}
      >
        <LogoutIcon />
        <Typography
          sx={{
            fontWeight: "600",
          }}
        >
          Logout
        </Typography>
      </Box>
    </Box>
  );
};

export default SideBar;
