import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";

import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../assests/images/symbol.jpg";
import { Avatar, Divider, Grid, ListItemIcon, MenuItem } from "@mui/material";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import FriendsCard from "./FriendsCard";

// Styled components
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#c0eaca",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "70ch", // Adjust the width as needed
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: 0,
  bottom: 0,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

const TopBar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useSelector((state: any) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState("");

  const friends = [
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Alice Johnson",
      joinedSince: "March 2019",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Bob Smith",
      joinedSince: "June 2020",
      status: "accepted",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Charlie Brown",
      joinedSince: "August 2021",
      status: "accepted",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "David Williams",
      joinedSince: "December 2022",
      status: "accepted",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Eve Davis",
      joinedSince: "January 2021",
      status: "accepted",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "David Williams",
      joinedSince: "December 2022",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Eve Davis",
      joinedSince: "January 2021",
    },
  ];

  const handleAddFriend = () => {
    console.log("heyyy");
    //nav("/friend");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", boxShadow: "none", border: "none" }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon
                  sx={{ color: "black", "&:hover": { color: "#27AE60" } }}
                />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search Music…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex", gap: 4, alignItems: "center" },
            }}
          >
            <IconButton
              onClick={handleClick}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{
                color: "black",
              }}
            >
              <Badge badgeContent={17} color="error">
                <PeopleIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              onClick={() => {
                navigate("/profile");
              }}
              edge="end"
              aria-label="account of current user"
              color="inherit"
              sx={{
                color: "black",
              }}
            >
              <Avatar sx={{ bgcolor: "#27AE60" }}>{user.name[0]}</Avatar>
            </IconButton>
            <Typography sx={{ color: "black", alignItems: "center" }}>
              {user.name}
            </Typography>
          </Box>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Grid
            item
            xs={6}
            sx={{
              height: "80vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid sx={{ height: "5rem" }}>
              <Typography
                component="div"
                sx={{
                  textAlign: "center",
                  fontWeight: "600",

                  fontSize: "20px",
                  color: "black",
                }}
              >
                Friend Requests
              </Typography>
            </Grid>
            <Grid sx={{ overflow: "auto", scrollbarWidth: "none" }}>
              {friends.map((friend, index) => (
                <FriendsCard
                  key={index}
                  profilePhoto={friend.profilePhoto}
                  userName={friend.userName}
                  joinedSince={friend.joinedSince}
                  onAddFriend={handleAddFriend}
                  type="friend"
                />
              ))}
            </Grid>
          </Grid>
        </Menu>
      </AppBar>
    </Box>
  );
};

export default TopBar;
