import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { useCallback, useEffect, useState } from "react"
import FriendsCard from "../../common/FriendsCard"
import SkeletonLoading from "../../common/Skeleton"
import { useSelector } from "react-redux"
import User from "../../../apis/user"
import SearchIcon from "@mui/icons-material/Search"

const AddGroupModal = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [userData, setUserData] = useState([])
  const [loading1, setLoading1] = useState(false)

  const [type, setType] = useState("friends")

  const [hasMoreUserData, setHasMoreUserData] = useState(true)

  const { user, token } = useSelector((state: any) => state.auth)

  const head = {
    token: token,
    user: user.id,
  }
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 630,
    width: 600,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    gap: 3,
    overflow: "hidden",
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
  useEffect(() => {
    setUserData([])
    setHasMoreUserData(true)
    fetchUserData()
  }, [type])

  return (
    <Box sx={style}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px",
        }}
      >
        <TextField sx={{ width: "70%" }} placeholder="Write Group Name...." />{" "}
        <Button variant="contained"> Create Group</Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box>
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
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            padding: "6px",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
        >
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
              <FriendsCard key={index} user_details={user} type="friends" />
            ))
          )}
        </Box>
      </Box>
      <Box></Box>
    </Box>
  )
}

export default AddGroupModal
