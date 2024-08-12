// FriendsCard.js
import { Card, Avatar, Typography, Grid } from "@mui/material";
import { Chat } from "@mui/icons-material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import moment from "moment";

interface CardProps {
  profilePhoto: string;
  userName: string;
  joinedSince: string;
  onAddFriend: () => void;
  type: string;
}

const FriendsCard = (props: CardProps) => {
  const { profilePhoto, userName, joinedSince, onAddFriend, type } = props;
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        marginBottom: 2,
      }}
    >
      <Avatar src={profilePhoto} alt="Profile" sx={{ width: 50, height: 50, marginRight: 2 }} />
      <Grid container direction="column" sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: "bold" }}>
          {userName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Joined: {moment(joinedSince).format("MMM YYYY")}
        </Typography>
      </Grid>

      {type === "friend" ? (
        <Chat sx={{ color: "#27AE60", cursor: "pointer" }} />
      ) : (
        <PersonAddAlt1Icon
          onClick={() => {
            onAddFriend();
          }}
          sx={{ color: "#27AE60", cursor: "pointer" }}
        />
      )}
    </Card>
  );
};

export default FriendsCard;
