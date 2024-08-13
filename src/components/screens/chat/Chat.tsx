import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Tab,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import React, { lazy } from "react"
import AddGroupModal from "./AddGroupModal"

const ChatBox = lazy(() => import("./ChatBox"))

const Chat = () => {
  const [value, setValue] = React.useState("1")
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddGroupModal type={value} />
      </Modal>
      <Box sx={{ label: "main", display: "flex", height: "100%" }}>
        <Box
          sx={{
            label: "list",
            display: "flex",
            flexDirection: "column",
            width: "30%",
          }}
        >
          <TabContext value={value}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                borderBottom: 1,
                borderColor: "divider",
                alignItems: "center",
                position: "relative",
              }}
            >
              <TabList
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#1f8f4e",
                  },
                  alignItems: "center",
                  width: "100%",
                }}
                onChange={handleChange}
              >
                <Tab
                  sx={{
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                    "&.Mui-selected": {
                      color: "white",
                      backgroundColor: "#27ae60",
                      width: "50%",
                    },
                  }}
                  label="Chats"
                  value="1"
                />
                <Tab
                  sx={{
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                    "&.Mui-selected": {
                      color: "white",
                      backgroundColor: "#27ae60",
                      width: "50%",
                    },
                  }}
                  label="Groups"
                  value="2"
                />
              </TabList>
              {/* <GroupAddOutlinedIcon
                sx={{ cursor: "pointer" }}
                fontSize="large"
                onClick={handleOpen}
              /> */}
            </Box>
            <TabPanel sx={{ padding: 0 }} value="1" aria-label="chat">
              <List
                sx={{ padding: 0, width: "100%", bgcolor: "background.paper" }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Abhishek"
                    secondary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {"Chai pine chal bhai...."}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Abhishek"
                    secondary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {"Chai pine chal bhai...."}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </List>
              <Button
                variant="contained"
                sx={{
                  cursor: "pointer",
                  position: "absolute",
                  bottom: "1%",
                  left: "20%",
                }}
                value="single"
                onClick={handleOpen}
              >
                Create Chat
              </Button>
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} aria-label="chat" value="2">
              <List
                sx={{ padding: 0, width: "100%", bgcolor: "background.paper" }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/1.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Abhishek"
                    secondary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {"Chai pine chal bhai...."}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </List>
              <Button
                variant="contained"
                sx={{
                  cursor: "pointer",
                  position: "absolute",
                  bottom: "1%",
                  left: "20%",
                }}
                value="group"
                onClick={handleOpen}
              >
                Create Group
              </Button>
            </TabPanel>
          </TabContext>
        </Box>
        <Box sx={{ label: "chat", display: "flex", width: "70%" }}>
          <ChatBox />
        </Box>
      </Box>
    </>
  )
}

export default Chat;
