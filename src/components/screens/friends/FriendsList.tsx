import React, { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"

import SearchIcon from "@mui/icons-material/Search"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  TextField,
  Typography,
} from "@mui/material"

import User from "../../../apis/user"
import FriendRequestCard from "../../common/FriendRequestCard"
import FriendsCard from "../../common/FriendsCard"
import SkeletonLoading from "../../common/Skeleton"

const FriendsList = () => {
  // State
  const [searchTerm, setSearchTerm] = useState("")
  const [userData, setUserData] = useState([])
  const [loading1, setLoading1] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [type, setType] = useState("friends")
  const [suggestions, setSuggestions] = useState([])
  const [hasMoreUserData, setHasMoreUserData] = useState(true)
  const [hasMoreSuggestions, setHasMoreSuggestions] = useState(true)

  const { user, token } = useSelector((state: any) => state.auth)

  const head = {
    token: token,
    user: user.id,
  }

  const fetchUserData = async () => {
    if (!hasMoreUserData) return

    setLoading1(true)
    try {
      const limit = 8
      const res: any = await User.get_user_data(
        {
          type: type,
          limit: limit,
          offset: userData.length,
        },
        head
      )

      if (!res || res.status !== 200) {
        throw new Error(res.data.message)
      } else {
        const fetchedData = res?.data?.data
        setUserData((prev) => prev.concat(fetchedData))

        if (fetchedData.length < limit) {
          setHasMoreUserData(false)
        }
      }
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoading1(false)
    }
  }

  const fetchSuggestions = async () => {
    if (!hasMoreSuggestions) return

    setLoading2(true)
    try {
      const limit = 7
      const res: any = await User.user_list(
        {
          limit: limit,
          offset: suggestions.length,
          keyword: searchTerm,
        },
        head
      )

      if (!res || res.status !== 200) {
        throw new Error(res.data.message)
      } else {
        const fetchedData = res?.data?.data
        setSuggestions((prev) =>
          searchTerm ? fetchedData : prev.concat(fetchedData)
        )

        if (fetchedData.length < limit) {
          setHasMoreSuggestions(false)
        }
      }
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoading2(false)
    }
  }

  useEffect(() => {
    setUserData([])
    setHasMoreUserData(true)
    fetchUserData()
  }, [type])

  useEffect(() => {
    setSuggestions([])
    setHasMoreSuggestions(true)
    const debouncedFetch = debounce(fetchSuggestions, 500)
    debouncedFetch()
  }, [searchTerm])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setHasMoreUserData(true)
    setType(newValue)
  }

  const handleScroll = useCallback(
    (event: any, type: string) => {
      const { scrollTop, clientHeight, scrollHeight } = event.target

      if (scrollHeight - scrollTop <= clientHeight + 50) {
        if (type === "userData") {
          fetchUserData()
        } else if (type === "suggestions") {
          fetchSuggestions()
        }
      }
    },
    [userData, suggestions]
  )

  const debounce = (func: (...args: any) => void, delay: number) => {
    let timeout: NodeJS.Timeout
    return (...args: any) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), delay)
    }
  }

  console.log(suggestions)

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
                    label={`Friends ${
                      type === "friends" ? "(" + userData.length + ")" : ""
                    }`}
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
                    label={`Sent ${
                      type === "sent" ? "(" + userData.length + ")" : ""
                    }`}
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
                    label={`Received ${
                      type === "requests" ? "(" + userData.length + ")" : ""
                    }`}
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
                  ) : userData.length <= 0 ? (
                    <Typography>No Friends Added</Typography>
                  ) : (
                    userData.map((user: any, index) => (
                      <FriendsCard
                        key={index}
                        user_details={user}
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
                  ) : userData.length <= 0 ? (
                    <Typography
                      sx={{
                        marginTop: "50%",
                        marginLeft: "20%",
                        color: "lightgray",
                        fontWeight: "600",
                        fontSize: "18px",
                      }}
                    >
                      No Sent Requests found
                    </Typography>
                  ) : (
                    userData.map((request: any, index) => (
                      <FriendRequestCard
                        request={request}
                        key={index}
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
                  ) : userData.length <= 0 ? (
                    <Typography
                      sx={{
                        marginTop: "50%",
                        marginLeft: "20%",
                        color: "lightgray",
                        fontWeight: "600",
                        fontSize: "18px",
                      }}
                    >
                      No Requests Found
                    </Typography>
                  ) : (
                    userData.map((request: any, index) => (
                      <FriendRequestCard
                        request={request}
                        key={index}
                        type="requests"
                      />
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
              ) : suggestions.length <= 0 ? (
                <Typography
                  sx={{
                    marginTop: "50%",
                    marginLeft: "20%",
                    color: "lightgray",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  No User Found
                </Typography>
              ) : (
                suggestions.map((suggestion: any, index) => (
                  <FriendsCard
                    key={index}
                    user_details={suggestion}
                    type="suggestions"
                  />
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default FriendsList
