// FriendsList.js
import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FriendsCard from "../../common/FriendsCard";

const FriendsList = () => {
  //const nav = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const friends = [
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Alice Johnson",
      joinedSince: "March 2019",
      status: "accepted",
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
    <Box>
      <Grid container direction="row" spacing={2} sx={{ padding: 4 }}>
        {/* Suggestions */}
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
                fontWeight: "800",
                fontSize: "25px",
                color: "#27AE60",
              }}
            >
              My Friends
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
        {/* search */}
        <Grid
          item
          xs={6}
          sx={{ height: "80vh", display: "flex", flexDirection: "column" }}
        >
          <Grid>
            <TextField
              placeholder="Search Friends"
              label="Search"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid sx={{ overflow: "auto", scrollbarWidth: "none" }}>
            {/* serached item here */}
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
      </Grid>
    </Box>
  );
};

export default FriendsList;
