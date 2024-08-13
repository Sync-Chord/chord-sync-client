import SearchIcon from "@mui/icons-material/Search"
import {
  Avatar,
  Button,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material"
import Checkbox from "@mui/material/Checkbox"
import { Box } from "@mui/system"
import { Chat } from "@mui/icons-material"
import moment from "moment"
import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import ChatApi from "../../../apis/chat"
import User from "../../../apis/user"
import ButtonLoader from "../../common/ButtonLoader"
import SkeletonLoading from "../../common/Skeleton"
import { useNavigate } from "react-router-dom"

interface UserData {
  id: number
  name: string
  profile_photo?: string
  created_at: string
}

const AddGroupModal = (props: any) => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [userData, setUserData] = useState<UserData[]>([])
  const [loading1, setLoading1] = useState<boolean>(false)
  const [loading2, setLoading2] = useState<boolean>(false)
  const [arrayObj, setArrayObj] = useState<{ name: string; id: number }[]>([])
  const [groupName, setGroupName] = useState<string>("")
  const [hasMoreUserData, setHasMoreUserData] = useState<boolean>(true)

  const { user, token } = useSelector((state: any) => state.auth)

  const navigate = useNavigate()
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
          type: "friends",
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
  }, [])

  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const { scrollTop, clientHeight, scrollHeight } = event.currentTarget

      if (scrollHeight - scrollTop <= clientHeight + 50) {
        fetchUserData()
      }
    },
    [userData]
  )

  const handleCheckbox = (
    user: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setArrayObj((prev) => [...prev, { name: user.name, id: user.id }])
    } else {
      setArrayObj((prev) => prev.filter((item) => item.id !== user.id))
    }
  }

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupName(event.target.value)
  }

  const handleCreateGroup = () => {
    setLoading2(true)
    const payload = { group_name: groupName, ids: arrayObj, type: "group" }
    ChatApi.create_chat(payload, head)
      .then((res: any) => {
        setLoading2(false)
        if (res.status !== 200) {
          throw new Error(res.data.message)
        } else {
          toast.success("Group Created Enjoy....")
          props.setChats((prev: any) => [...prev, res?.data?.data])
          props.setOpen(false)
        }
      })
      .catch((err) => {
        setLoading2(false)
        toast.error(err.message)
      })
  }

  const isUserInGroup = (userId: number) => {
    return arrayObj.some((el: any) => el.id === userId)
  }

  const handleChat = () => {
    setLoading2(true)
    const payload = { group_name: groupName, ids: arrayObj, type: "1" }
    console.log(head)
    ChatApi.create_chat(payload, head)
      .then((res: any) => {
        setLoading2(false)
        if (res.status !== 200) {
          throw new Error(res.data.message)
        } else {
          toast.success("Chat Created Enjoy....")
        }
      })
      .catch((err) => {
        setLoading2(false)
        toast.error(err.message)
      })
  }

  return (
    <Box sx={style}>
      {props.type === "1" ? (
        <></>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "6px",
          }}
        >
          <TextField
            sx={{ width: "70%" }}
            placeholder="Write Group Name...."
            value={groupName}
            onChange={handleGroupNameChange}
          />
          {loading2 ? (
            <ButtonLoader />
          ) : (
            <Button
              variant="contained"
              onClick={handleCreateGroup}
              disabled={arrayObj.length === 0}
            >
              Create Group
            </Button>
          )}
        </Box>
      )}
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
          />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            padding: "6px",
            overflowY: "auto",
            scrollbarWidth: "none",
          }}
          onScroll={handleScroll}
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
            userData.map((user) => (
              <Card
                key={user.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: 2,
                  marginBottom: 2,
                }}
              >
                <Avatar
                  src={user?.profile_photo}
                  alt="Profile"
                  sx={{ width: 50, height: 50, marginRight: 2 }}
                />
                <Grid container direction="column" sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Joined: {moment(user?.created_at).format("MMM YYYY")}
                  </Typography>
                </Grid>
                {props.type === "1" ? (
                  <Chat sx={{ cursor: "pointer" }} onClick={handleChat} />
                ) : (
                  <Checkbox
                    checked={isUserInGroup(user.id)}
                    onChange={(event) => handleCheckbox(user, event)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                )}
              </Card>
            ))
          )}
        </Box>
      </Box>
      <Box></Box>
    </Box>
  )
}

export default AddGroupModal
