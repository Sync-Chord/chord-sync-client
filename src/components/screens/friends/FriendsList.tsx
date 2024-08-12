// FriendsList.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SearchIcon from "@mui/icons-material/Search";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  TextField,
} from "@mui/material";

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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

  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "86vh",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={2} sx={{ padding: 4, height: "100vh" }}>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              typography: "body1",
              height: "100vh",
              overflow: "hidden",
            }}
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="friend list"
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#1f8f4e",
                    },
                  }}
                >
                  <Tab
                    label={`Friends (${suggestions.length || ""})`}
                    value="1"
                    sx={{
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
                      "&.Mui-selected": {
                        color: "white",
                        backgroundColor: "#27ae60",
                      },
                    }}
                  />

                  <Tab
                    label={`Sent (${suggestions.length || ""})`}
                    value="2"
                    sx={{
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
                      "&.Mui-selected": {
                        color: "white",
                        backgroundColor: "#27ae60",
                      },
                    }}
                  />
                  <Tab
                    label={`Received (${suggestions.length || ""})`}
                    value="3"
                    sx={{
                      borderTopLeftRadius: "5px",
                      borderTopRightRadius: "5px",
                      "&.Mui-selected": {
                        color: "white",
                        backgroundColor: "#27ae60",
                      },
                    }}
                  />
                </TabList>
              </Box>
              <Box
                sx={{
                  height: "100vh",
                  overflow: "auto",
                  scrollbarWidth: "none",
                }}
              >
                <TabPanel value="1" sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      padding: "6px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      overflowY: "auto",
                      scrollbarWidth: "none",
                    }}
                  >
                    {loading2 ? (
                      <>
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                      </>
                    ) : (
                      suggestions.map((suggestion: any, index) => (
                        <FriendsCard
                          key={index}
                          profilePhoto={suggestion.profile_photo}
                          userName={suggestion.name}
                          joinedSince={suggestion.created_at}
                          onAddFriend={handleAddFriend}
                          type="suggestion"
                        />
                      ))
                    )}
                  </Box>
                </TabPanel>
                <TabPanel value="2" sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      padding: "6px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      overflowY: "auto",
                      scrollbarWidth: "none",
                    }}
                  >
                    {loading2 ? (
                      <>
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                      </>
                    ) : (
                      suggestions.map((suggestion: any, index) => (
                        <FriendsCard
                          key={index}
                          profilePhoto={suggestion.profile_photo}
                          userName={suggestion.name}
                          joinedSince={suggestion.created_at}
                          onAddFriend={handleAddFriend}
                          type="suggestion"
                        />
                      ))
                    )}
                  </Box>
                </TabPanel>
                <TabPanel value="3" sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      padding: "6px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      overflowY: "auto",
                      scrollbarWidth: "none",
                    }}
                  >
                    {loading2 ? (
                      <>
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                        <SkeletonLoading />
                      </>
                    ) : (
                      suggestions.map((suggestion: any, index) => (
                        <FriendsCard
                          key={index}
                          profilePhoto={suggestion.profile_photo}
                          userName={suggestion.name}
                          joinedSince={suggestion.created_at}
                          onAddFriend={handleAddFriend}
                          type="suggestion"
                        />
                      ))
                    )}
                  </Box>
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </Grid>

        {/* Search */}
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Grid>
            <TextField
              placeholder="Search Friends"
              label="Search"
              variant="outlined"
              fullWidth
              onChange={handleSearch}
              value={searchTerm}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </Grid>
          <Grid
            sx={{
              marginTop: "1rem",
              overflowY: "auto",
              scrollbarWidth: "none",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,

                padding: "6px",
              }}
            >
              {loading2 ? (
                <>
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                  <SkeletonLoading />
                </>
              ) : (
                suggestions.map((suggestion: any, index) => (
                  <FriendsCard
                    key={index}
                    profilePhoto={suggestion.profile_photo}
                    userName={suggestion.name}
                    joinedSince={suggestion.created_at}
                    onAddFriend={handleAddFriend}
                    type="suggestion"
                  />
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FriendsList;
