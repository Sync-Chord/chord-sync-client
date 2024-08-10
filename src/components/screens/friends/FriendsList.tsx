// FriendsList.js
import { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import User from "../../../apis/user";
import { error_reducer, success_reducer } from "../../../redux/authReducer";
import Loader from "../../common/Loader";

const FriendsList = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  //use states
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const { user } = useSelector((state: any) => state.auth);

  const head = {
    token: user.token,
    user: user.user.id,
  };

  const payload = { limit: 2, offset: suggestions.length || 0 };

  const handleAddFriend = () => {
    //nav("/friend");
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [res1, res2]: any = await Promise.all([
          User.friends_list(payload, head),
          User.user_list(payload, head),
        ]);

        if (!res1 || res1.status !== 200) {
          throw new Error(res1.data.message);
        } else {
          setFriends((prev) => prev.concat(res1?.data?.data));
          setSuggestions((prev) => prev.concat(res2?.data?.data));
          setLoading(false);
        }
      } catch (err: any) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(suggestions);

  return (
    <Box>
      {loading ? (
        <Loader />
      ) : (
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
                  fontWeight: "600",
                  fontSize: "20px",
                  color: "black",
                }}
              >
                My Friends
              </Typography>
            </Grid>
            <Grid sx={{ overflow: "auto", scrollbarWidth: "none" }}>
              {friends.map((friend: any, index) => (
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
              {suggestions.map((suggestions: any, index) => (
                <FriendsCard
                  key={index}
                  profilePhoto={suggestions.profile_photo}
                  userName={suggestions.name}
                  joinedSince={suggestions.created_at}
                  onAddFriend={handleAddFriend}
                  type="friend"
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default FriendsList;
