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
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{ padding: 2, height: "80vh", overflowY: "auto", scrollbarWidth: "none" }}
          >
            <Typography component="div" sx={{ textAlign: "center" }}>
              My Friends
            </Typography>
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
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{ padding: 2, height: "80vh", overflowY: "auto", scrollbarWidth: "none" }}
          >
            <Typography component="div" sx={{ textAlign: "center" }}>
              Requests
            </Typography>
            {friends.map((request, index) => (
              <FriendsCard
                key={index}
                profilePhoto={request.profilePhoto}
                userName={request.userName}
                joinedSince={request.joinedSince}
                onAddFriend={handleAddFriend}
                type="user"
              />
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{ padding: 2, height: "80vh", display: "flex", flexDirection: "column" }}
          >
            <TextField
              placeholder="Search Friends"
              label="Search Friends"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "15px",
                },
                marginBottom: 2,
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

            <Container
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {/* Display search results here */}
            </Container>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FriendsList;
