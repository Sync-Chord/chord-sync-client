import { Chat } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assests/images/logo.png";
import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from "@mui/icons-material/Home";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout_reducer } from "../../redux/authReducer";
import { useDispatch } from "react-redux";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  const handleLogout = () => {
    dispatch(logout_reducer());
    navigate("/auth/login");
  };

  const navigations = [
    {
      id: 1,
      name: "Home",
      path: "/home",
      icon: <HomeIcon />,
    },
    {
      id: 2,
      name: "Chat",
      path: "/chat",
      icon: <Chat />,
    },
    {
      id: 3,
      name: "Friends",
      path: "/friend",
      icon: <PeopleIcon />,
    },
  ];

  return (
    <Box sx={{ position: "relative", height: "100vh", padding: "0.5rem" }}>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ maxHeight: "2rem", padding: "1rem", cursor: "pointer" }}
            onClick={() => {
              setSelectedIndex(navigations[0].id);
              navigate(navigations[0].path);
            }}
          />
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              color: "#27AE60",
              fontWeight: "700",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedIndex(navigations[0].id);
              navigate(navigations[0].path);
            }}
          >
            SYNC
          </Typography> */}
        </Box>
        <List sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {navigations.map((el) => (
            <ListItem
              key={el.id}
              onClick={() => {
                setSelectedIndex(el.id);
                navigate(el.path);
              }}
              sx={{
                borderRadius: "0.5rem",
                cursor: "pointer",
                backgroundColor:
                  selectedIndex === el.id ? "#27AE60" : "inherit",
                "&:hover": {
                  backgroundColor: selectedIndex !== el.id ? "lightgrey" : "",
                },
              }}
            >
              <ListItemIcon
                sx={{ color: selectedIndex === el.id ? "white" : "inherit" }}
              >
                {el.icon}
              </ListItemIcon>
              <ListItemText
                primary={el.name}
                sx={{ color: selectedIndex === el.id ? "white" : "inherit" }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "3%",
          width: "86.5%",
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
