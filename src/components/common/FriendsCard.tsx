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
        maxWidth: 500,
        margin: "10px auto",
        boxShadow: 10,
        borderRadius: "20px",
      }}
    >
      <Avatar
        src={profilePhoto}
        alt="Profile"
        sx={{ width: 46, height: 46, marginRight: 2 }}
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
      <CardActions>
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
            sx={{ textAlign: "center", fontSize: "10px" }}
          >
            Add Friend
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default FriendsCard;
