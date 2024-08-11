// FriendsList.js
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "../../../apis/user";
import FriendsCard from "../../common/FriendsCard";
import SkeletonLoading from "../../common/Skeleton";

const FriendsList = () => {
  //use states
  const [searchTerm, setSearchTerm] = useState("");
  const [friends, setFriends] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const { user, token } = useSelector((state: any) => state.auth);

  const head = {
    token: token,
    user: user.id,
  };

  const payload = { limit: 2, offset: suggestions.length || 0 };

  const handleAddFriend = () => {
    //nav("/friend");
  };

  const handleSearch = (event: React.MouseEvent<HTMLElement>) => {};

  useEffect(() => {
    const fetchData = async () => {
      setLoading1(true);
      try {
        const res: any = await User.friends_list(payload, head);

        if (!res || res.status !== 200) {
          throw new Error(res.data.message);
        } else {
          setFriends((prev) => prev.concat(res?.data?.data));
          setLoading1(false);
        }
      } catch (err: any) {
        setLoading1(false);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading2(true);
      try {
        const res: any = await User.user_list(payload, head);

        if (!res || res.status !== 200) {
          throw new Error(res.data.message);
        } else {
          setSuggestions((prev) => prev.concat(res?.data?.data));
          setLoading2(false);
        }
      } catch (err: any) {
        setLoading2(false);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  console.log(suggestions);

  return (
    <Box>
      <Grid container direction="row" spacing={2} sx={{ padding: 4 }}>
        {/* Suggestions */}
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid sx={{ height: "3.70rem" }}>
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
            {loading1 ? (
              <>
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
              </>
            ) : (
              friends.map((friend: any, index) => (
                <FriendsCard
                  key={index}
                  profilePhoto={friend.profile_photo}
                  userName={friend.name}
                  joinedSince={friend.created_at}
                  onAddFriend={handleAddFriend}
                  type="friend"
                />
              ))
            )}
          </Grid>
        </Grid>
        {/* search */}
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
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
              // onChange={handleSearch}
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
            {loading2 ? (
              <>
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
                <SkeletonLoading />
              </>
            ) : (
              suggestions.map((suggestions: any, index) => (
                <FriendsCard
                  key={index}
                  profilePhoto={suggestions.profile_photo}
                  userName={suggestions.name}
                  joinedSince={suggestions.created_at}
                  onAddFriend={handleAddFriend}
                  type="suggestion"
                />
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FriendsList;
