import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  CssBaseline,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FriendsCard from "../../common/FriendsCard";

const FriendsList = () => {
  const nav = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // const FriendsList = () => {
  //   const nav = useNavigate();
  //   const [searchTerm, setSearchTerm] = useState("");
  //   // const [friends, setFriends] = useState([]);
  //   // const [suggestions, setSuggestions] = useState([]);

  //   const handleAddFriend = () => {
  //     nav("/friend");
  //   };

  // useEffect(() => {
  //   // Mock fetch data from backend
  //   const fetchFriends = async () => {
  //     const data = Array(10).fill({
  //       profilePhoto: "https://via.placeholder.com/50",
  //       userName: "John Doe",
  //       joinedSince: "January 2020",
  //     });
  //     setFriends(data);
  //     setSuggestions(data);
  //   };

  //   fetchFriends();
  // }, []);

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
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Charlie Brown",
      joinedSince: "August 2021",
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
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Bob Smith",
      joinedSince: "June 2020",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Charlie Brown",
      joinedSince: "August 2021",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "David Williams",
      joinedSince: "December 2022",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Bob Smith",
      joinedSince: "June 2020",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Charlie Brown",
      joinedSince: "August 2021",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "David Williams",
      joinedSince: "December 2022",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Bob Smith",
      joinedSince: "June 2020",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Charlie Brown",
      joinedSince: "August 2021",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "David Williams",
      joinedSince: "December 2022",
    },
  ];

  const suggestions = [
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Frank Miller",
      joinedSince: "February 2018",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Bob Smith",
      joinedSince: "June 2020",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Charlie Brown",
      joinedSince: "August 2021",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "David Williams",
      joinedSince: "December 2022",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Bob Smith",
      joinedSince: "June 2020",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Charlie Brown",
      joinedSince: "August 2021",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "David Williams",
      joinedSince: "December 2022",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Bob Smith",
      joinedSince: "June 2020",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Charlie Brown",
      joinedSince: "August 2021",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "David Williams",
      joinedSince: "December 2022",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Grace Lee",
      joinedSince: "April 2019",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Hannah White",
      joinedSince: "May 2020",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Ian Scott",
      joinedSince: "July 2021",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Jack Turner",
      joinedSince: "September 2022",
    },
  ];

  const Requests = [
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Frank Miller",
      joinedSince: "February 2018",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Bob Smith",
      joinedSince: "June 2020",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Charlie Brown",
      joinedSince: "August 2021",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "David Williams",
      joinedSince: "December 2022",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Bob Smith",
      joinedSince: "June 2020",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Charlie Brown",
      joinedSince: "August 2021",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "David Williams",
      joinedSince: "December 2022",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Bob Smith",
      joinedSince: "June 2020",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Charlie Brown",
      joinedSince: "August 2021",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "David Williams",
      joinedSince: "December 2022",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Grace Lee",
      joinedSince: "April 2019",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Hannah White",
      joinedSince: "May 2020",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Ian Scott",
      joinedSince: "July 2021",
    },
    {
      profilePhoto: "https://via.placeholder.com/50",
      userName: "Jack Turner",
      joinedSince: "September 2022",
    },
  ];

  const handleAddFriend = () => {
    nav("/friend");
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#fffff", minHeight: "100vh" }}>
      <Grid container direction="row" spacing={2}>
        {/* Suggestions */}
        <Grid
          item
          xs={4}
          sx={{ height: "80vh", display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            Friends List
          </Typography>
          <Container
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Opera
              },
            }}
          >
            {suggestions.map((suggestion, index) => (
              <FriendsCard
                key={index}
                profilePhoto={suggestion.profilePhoto}
                userName={suggestion.userName}
                joinedSince={suggestion.joinedSince}
                onAddFriend={handleAddFriend}
              />
            ))}
          </Container>
        </Grid>

        {/* Requests */}
        <Grid
          item
          xs={4}
          sx={{ height: "80vh", display: "flex", flexDirection: "column" }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            Requests
          </Typography>
          <Container
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Opera
              },
            }}
          >
            {Requests.map((Requests, index) => (
              <FriendsCard
                key={index}
                profilePhoto={Requests.profilePhoto}
                userName={Requests.userName}
                joinedSince={Requests.joinedSince}
                onAddFriend={handleAddFriend}
              />
            ))}
          </Container>
        </Grid>
        {/* search */}
        <Grid
          item
          xs={4}
          sx={{ height: "80vh", display: "flex", flexDirection: "column" }}
        >
          <TextField
            placeholder="Search Friends"
            label="Search"
            variant="outlined"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px", // This will round only the edges
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

          <Container
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              scrollbarWidth: "none", // Firefox
              "&::-webkit-scrollbar": {
                display: "none", // Chrome, Safari, Opera
              },
            }}
          ></Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FriendsList;
