import { Chat, HomeMaxOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const navigations = [
    {
      name: "Home",
      path: "/home",
      icon: <HomeMaxOutlined />,
    },

    {
      name: "Chat",
      path: "/chat",
      icon: <Chat />,
    },
  ];

  return (
    <Box>
      {navigations.map((el) => {
        return (
          <Box
            onClick={() => {
              navigate(el.path);
            }}
          >
            {el.icon}
            <Typography>{el.name}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default SideBar;
