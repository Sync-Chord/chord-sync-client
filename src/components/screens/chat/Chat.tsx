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
} from "@mui/material";
import { Box } from "@mui/system";
import React, { lazy, useEffect, useState } from "react";
import AddGroupModal from "./AddGroupModal";
import ChatApis from "../../../apis/chat";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ButtonLoader from "../../common/ButtonLoader";

import ChatBox from "./ChatBox";
import moment from "moment";

const Chat = () => {
  const { token, user } = useSelector((state: any) => state.auth);
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [openChat, setOpenChat] = useState<any>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(true);
    ChatApis.get_chat({ type: value === "1" ? "single" : "group" }, { token, user: user.id })
      .then((res: any) => {
        setLoading(false);
        if (res.status !== 200) {
          throw new Error(res.data.message);
        } else {
          console.log(res.data.data);
          setChats(res?.data?.data || []);
        }
      })
      .catch((err: any) => {
        setLoading(false);
        toast.error(err.message);
      });
  }, [value]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddGroupModal type={value} setChats={setChats} setOpen={setOpen} />
      </Modal>
      <Box sx={{ display: "flex", height: "98%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "30%",
            height: "100%",
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
                  display: "flex",
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#1f8f4e",
                  },
                  alignItems: "center",
                  "& .css-heg063-MuiTabs-flexContainer": {
                    justifyContent: "space-between",
                  },
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
                    },
                  }}
                  label="Groups"
                  value="2"
                />
              </TabList>
            </Box>
            <TabPanel
              sx={{ padding: 0, height: "100%", overflow: "hidden" }}
              value="1"
              aria-label="chat"
            >
              {loading ? (
                <Box
                  sx={{
                    marginTop: "50%",
                    marginLeft: "20%",
                  }}
                >
                  <ButtonLoader />
                </Box>
              ) : chats.length <= 0 ? (
                <Typography
                  sx={{
                    marginTop: "50%",
                    marginLeft: "20%",
                    color: "lightgray",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  No Chats
                </Typography>
              ) : (
                <List
                  sx={{
                    padding: 0,
                    width: "100%",
                    bgcolor: "background.paper",
                    height: "100%",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                  }}
                >
                  {chats.map((chat: any) => (
                    <React.Fragment key={chat._id}>
                      <ListItem onClick={() => setOpenChat(chat)}>
                        <ListItemAvatar>
                          <Avatar
                            alt={chat?.ids[0]?.name}
                            src={chat.avatar || "/static/images/avatar/1.jpg"}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={chat?.ids[0]?.name}
                          secondary={
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {moment(chat.createdAt).format("MMM YYYY")}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              )}
              <Button
                variant="contained"
                sx={{
                  cursor: "pointer",
                  position: "absolute",
                  bottom: "1%",
                  left: "20%",
                }}
                onClick={handleOpen}
              >
                Create Chat
              </Button>
            </TabPanel>
            <TabPanel
              sx={{ padding: 0, height: "100%", overflow: "hidden" }}
              aria-label="chat"
              value="2"
            >
              {loading ? (
                <Box
                  sx={{
                    marginTop: "50%",
                    marginLeft: "20%",
                  }}
                >
                  <ButtonLoader />
                </Box>
              ) : chats.length <= 0 ? (
                <Typography
                  sx={{
                    marginTop: "50%",
                    marginLeft: "20%",
                    color: "lightgray",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  No Groups found
                </Typography>
              ) : (
                <List
                  sx={{
                    padding: 0,
                    width: "100%",
                    bgcolor: "background.paper",
                    height: "100%",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                  }}
                >
                  {/* Render group items similarly */}
                  {chats.map((chat: any) => (
                    <React.Fragment key={chat.id}>
                      <ListItem onClick={() => setOpenChat(chat)}>
                        <ListItemAvatar>
                          <Avatar
                            alt={chat.name}
                            src={chat.avatar || "/static/images/avatar/1.jpg"}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={chat.group_name}
                          secondary={
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {moment(chat.createdAt).format("MMM YYYY")}
                            </Typography>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              )}
              <Button
                variant="contained"
                sx={{
                  cursor: "pointer",
                  position: "absolute",
                  bottom: "1%",
                  left: "20%",
                }}
                onClick={handleOpen}
              >
                Create Group
              </Button>
            </TabPanel>
          </TabContext>
        </Box>
        <Box sx={{ display: "flex", width: "70%" }}>
          <ChatBox openChat={openChat} />
        </Box>
      </Box>
    </>
  )
};

export default Chat;
