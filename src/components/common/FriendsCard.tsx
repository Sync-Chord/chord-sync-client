import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Grid,
} from "@mui/material";

interface CardProps {
  profilePhoto: string;
  userName: string;
  joinedSince: string;
  onAddFriend: () => void;
}

const FriendsCard = (props: CardProps) => {
  const { profilePhoto, userName, joinedSince, onAddFriend } = props;
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        width: 350,
        height: 35,
        margin: "5px auto",
      }}
    >
      <Avatar
        src={profilePhoto}
        alt="Profile"
        sx={{ width: 50, height: 50, marginRight: 1 }}
      />
      <Grid container direction="column" sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" sx={{ textAlign: "left" }}>
          {userName}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left" }}
        >
          Joined since: {joinedSince}
        </Typography>
      </Grid>
      <Grid>
        <Button
          sx={{
            width: 70,
            height: 40,
            borderRadius: "10px",
            boxShadow: "3px",
            backgroundColor: "#27ae60",
          }}
          variant="contained"
          onClick={onAddFriend}
        >
          <Typography
            component="div"
            sx={{ textAlign: "center", fontSize: "12px" }}
          >
            Add Friend
          </Typography>
        </Button>
      </Grid>
    </Card>
  )
};

export default FriendsCard;
