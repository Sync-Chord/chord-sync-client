import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import SearchIcon from "@mui/icons-material/Search";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Grid, IconButton, InputAdornment, Tab, TextField } from "@mui/material";

import User from "../../../apis/user";
import FriendsCard from "../../common/FriendsCard";
import SkeletonLoading from "../../common/Skeleton";
import FriendRequestCard from "../../common/FriendRequestCard";

const FriendsList = () => {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [userData, setUserData] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [type, setType] = useState("friends");
  const [suggestions, setSuggestions] = useState([]);
  const [hasMoreUserData, setHasMoreUserData] = useState(true);
  const [hasMoreSuggestions, setHasMoreSuggestions] = useState(true);

  const { user, token } = useSelector((state: any) => state.auth);

  const head = {
    token: token,
    user: user.id,
  };

  const fetchUserData = async () => {
    if (!hasMoreUserData) return;

    setLoading1(true);
    try {
      const limit = 8;
      const res: any = await User.get_user_data(
        {
          type: type,
          limit: limit,
          offset: userData.length,
        },
        head
      );

      if (!res || res.status !== 200) {
        throw new Error(res.data.message);
      } else {
        const fetchedData = res?.data?.data;
        setUserData((prev) => prev.concat(fetchedData));

        if (fetchedData.length < limit) {
          setHasMoreUserData(false);
        }
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading1(false);
    }
  };

  const fetchSuggestions = async () => {
    if (!hasMoreSuggestions) return;

    setLoading2(true);
    try {
      const limit = 7;
      const res: any = await User.user_list(
        {
          limit: limit,
          offset: suggestions.length,
          keyword: searchTerm,
        },
        head
      );

      if (!res || res.status !== 200) {
        throw new Error(res.data.message);
      } else {
        const fetchedData = res?.data?.data;
        setSuggestions((prev) => (searchTerm ? fetchedData : prev.concat(fetchedData)));

        if (fetchedData.length < limit) {
          setHasMoreSuggestions(false);
        }
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    setUserData([]);
    setHasMoreUserData(true);
    fetchUserData();
  }, [type]);

  useEffect(() => {
    setSuggestions([]);
    setHasMoreSuggestions(true);
    const debouncedFetch = debounce(fetchSuggestions, 1000);
    debouncedFetch();
  }, [searchTerm]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setType(newValue);
  };

  const handleScroll = useCallback(
    (event: any, type: string) => {
      const { scrollTop, clientHeight, scrollHeight } = event.target;

      if (scrollHeight - scrollTop <= clientHeight + 50) {
        if (type === "userData") {
          fetchUserData();
        } else if (type === "suggestions") {
          fetchSuggestions();
        }
      }
    },
    [userData, suggestions]
  );

  const debounce = (func: (...args: any) => void, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  function handleAddFriend(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "87vh",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={2} sx={{ padding: 4 }}>
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
              overflow: "hidden",
            }}
          >
            <TabContext value={type}>
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
                    label={`Friends ${type === "friends" ? "(" + userData.length + ")" : ""}`}
                    value="friends"
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
                    label={`Sent ${type === "sent" ? "(" + userData.length + ")" : ""}`}
                    value="sent"
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
                    label={`Received ${type === "requests" ? "(" + userData.length + ")" : ""}`}
                    value="requests"
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
                onScroll={(event) => handleScroll(event, "userData")}
              >
                <TabPanel value="friends" sx={{ height: "100%" }}>
                  {loading1 ? (
                    <>
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                    </>
                  ) : (
                    userData.map((user: any, index) => (
                      <FriendsCard
                        key={index}
                        profilePhoto={user?.profile_photo}
                        userName={user?.name}
                        joinedSince={user?.created_at}
                        onAddFriend={handleAddFriend}
                        type="friends"
                      />
                    ))
                  )}
                </TabPanel>
                <TabPanel value="sent" sx={{ height: "100%" }}>
                  {loading1 ? (
                    <>
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                    </>
                  ) : (
                    userData.map((request: any, index) => (
                      <FriendsCard
                        key={index}
                        profilePhoto={request?.user?.profile_photo}
                        userName={request?.user?.name}
                        joinedSince={request?.user?.created_at}
                        onAddFriend={handleAddFriend}
                        type="sent"
                      />
                    ))
                  )}
                </TabPanel>
                <TabPanel value="requests" sx={{ height: "100%" }}>
                  {loading1 ? (
                    <>
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                      <SkeletonLoading />
                    </>
                  ) : (
                    userData.map((request: any, index) => (
                      <FriendRequestCard request={request} key={index} />
                    ))
                  )}
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
              onChange={(event) => setSearchTerm(event.target.value)}
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
            onScroll={(event) => handleScroll(event, "suggestions")}
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
