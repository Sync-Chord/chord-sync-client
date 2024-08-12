// FriendsCard.js
import { Card, Avatar, Typography, Grid } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, display } from "@mui/system";
import moment from "moment";

interface CardProps {
  profilePhoto: string;
  userName: string;
  joinedSince: string;
  onAddFriend: () => void;
  onRemoveFriend: () => void;
  type: string;
}

const FriendRequestCard = (props: CardProps) => {
  const {
    profilePhoto,
    userName,
    joinedSince,
    onAddFriend,
    type,
    onRemoveFriend,
  } = props;
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Avatar src={profilePhoto} alt="Profile" sx={{ width: 30, height: 30 }} />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          {userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Joined: {moment(joinedSince).format("MMM YYYY")}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        <CheckCircleIcon
          onClick={() => {
            onAddFriend();
          }}
          fontSize="large"
          sx={{ color: "#27AE60", cursor: "pointer" }}
        />
        <CancelIcon
          onClick={() => {
            onRemoveFriend();
          }}
          fontSize="large"
          sx={{ color: "red", cursor: "pointer" }}
        />
      </Box>
    </Card>
  );
};

export default FriendRequestCard;
