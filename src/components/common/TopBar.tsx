import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { room_id_reducer } from "../../redux/authReducer";
import { Divider, Grid, Button, InputBase } from "@mui/material";
import socket from "../../utils/socket";

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
    width: "70ch",
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
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
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const notificationOpen = Boolean(anchorEl);
  const [notifications, setNotifications] = useState<any[]>([]);

  const handleNotification = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const { user } = useSelector((state: any) => state.auth);

  const handleAcceptInvitation = (roomId: any) => {
    socket.emit("accept_invitation", { roomId, userId: user.id });
    dispatch(room_id_reducer(roomId));
    setNotifications(notifications.filter((n) => n.roomId !== roomId));
    handleNotificationClose();
  };

  useEffect(() => {
    const onRoomInvitation = (data: { roomId: string; inviterId: string }) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { roomId: data.roomId, inviterId: data.inviterId, type: "invitation" },
      ]);
    };

    const onUserJoinedRoom = (data: { roomId: string; userId: string }) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { roomId: data.roomId, userId: data.userId, type: "joined" },
      ]);
    };

    const onInvitationAccepted = (data: { roomId: string; userId: string }) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { roomId: data.roomId, userId: data.userId, type: "accepted" },
      ]);
    };

    socket.on("room_invitation", onRoomInvitation);
    socket.on("user_joined_room", onUserJoinedRoom);
    socket.on("invitation_accepted", onInvitationAccepted);

    return () => {
      socket.off("room_invitation", onRoomInvitation);
      socket.off("user_joined_room", onUserJoinedRoom);
      socket.off("invitation_accepted", onInvitationAccepted);
    };
  }, [notifications, dispatch, user.id]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", boxShadow: "none", border: "none" }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Search sx={{ display: "flex", alignItems: "center" }}>
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
              onClick={handleNotification}
              aria-controls={notificationOpen ? "notification-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={notificationOpen ? "true" : undefined}
              size="large"
              aria-label="show notifications"
              color="inherit"
              sx={{ color: "black" }}
            >
              <Badge badgeContent={notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              onClick={() => navigate("/profile")}
              edge="end"
              aria-label="account of current user"
              color="inherit"
              sx={{ color: "black" }}
            >
              <Avatar
                sx={{ bgcolor: "#27AE60" }}
                src={user.profile_photo ? user.profile_photo : user.name[0]}
              />
            </IconButton>
            <Typography sx={{ color: "black", alignItems: "center" }}>{user.name}</Typography>
          </Box>
        </Toolbar>

        {/* Notification Menu */}
        <Menu
          anchorEl={anchorEl}
          id="notification-menu"
          open={notificationOpen}
          onClose={handleNotificationClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 36,
                height: 36,
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
              maxHeight: "400px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              p: 1,
            }}
          >
            <Typography
              component="div"
              sx={{
                textAlign: "center",
                fontWeight: "600",
                fontSize: "20px",
                color: "black",
                mb: 1,
              }}
            >
              Notifications
            </Typography>
            <Divider />
            {notifications.map((notification, index) => (
              <Box key={index} sx={{ p: 1 }}>
                {notification.type === "invitation" && (
                  <>
                    <Typography variant="h6">You have a new room invitation!</Typography>
                    <Typography sx={{ mb: 1 }}>Inviter ID: {notification.inviterId}</Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleAcceptInvitation(notification.roomId)}
                    >
                      Accept
                    </Button>
                  </>
                )}
                {notification.type === "joined" && (
                  <Typography variant="h6">
                    User {notification.userId} has joined the room!
                  </Typography>
                )}
                {notification.type === "accepted" && (
                  <Typography variant="h6">
                    Invitation accepted by user {notification.userId}.
                  </Typography>
                )}
              </Box>
            ))}
          </Grid>
        </Menu>
      </AppBar>
    </Box>
  );
};

export default TopBar;
