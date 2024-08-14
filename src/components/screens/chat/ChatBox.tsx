import { Avatar, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import ChatApi from "../../../apis/chat";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import socket from "../../../utils/socket";
import { room_id_reducer } from "../../../redux/authReducer";

interface Message {
  message: string;
  sender: string;
}

const ChatBox = (props: any) => {
  const dispatch = useDispatch();
  const { openChat } = props;
  const { token, user, roomId } = useSelector((state: any) => state.auth);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openChat) {
      setLoading(true);
      ChatApi.get_messages(
        { chat_id: openChat._id, limit: 10, offset: messages.length },
        { token, user: user.id }
      )
        .then((res: any) => {
          setLoading(false);
          if (res.status !== 200) {
            throw new Error(res.data.message);
          } else {
            const sortedMessages = res.data.data.sort(
              (a: any, b: any) => a.createdAt - b.createdAt
            );
            setMessages(sortedMessages || []);
          }
        })
        .catch((err: any) => {
          setLoading(false);
          toast.error(err.message);
        });
    }
  }, [openChat]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("send_message", {
        chat_id: openChat._id,
        message: newMessage,
        user: user,
      });
      setNewMessage("");
    }
  };

  const getUserName = (userId: number): string => {
    const user = openChat.ids.find((el: any) => el.id === userId);
    return user ? user.name : "Other";
  };

  // Create a room and invite users
  const handleConnectMusic = () => {
    const roomId = openChat._id;
    const requestedUserIds: any = [];
    openChat.ids.forEach((el: any) => {
      if (el.id !== user.id) {
        requestedUserIds.push(el.id);
      }
    });

    socket.emit("create_room", { roomId, requestedUserIds });
    dispatch(room_id_reducer(roomId));
  };

  return openChat?._id ? (
    <Box
      sx={{
        width: "99%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Topbar */}
      <Box
        sx={{
          display: "flex",
          height: "6%",
          label: "Topbar",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#27AE60",
          borderRadius: "5px",
          padding: "5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <Avatar>
            {openChat.type === "single" ? openChat.ids[0].name[0] : openChat.group_name[0]}
          </Avatar>
          <Typography sx={{ color: "white" }}>
            {openChat.type === "single" ? openChat.ids[0].name : openChat.group_name}
          </Typography>
        </Box>
        <Box>
          {roomId === openChat._id ? (
            <Button
              size="small"
              sx={{ backgroundColor: "gray", color: "white" }}
              variant="contained"
              disabled
            >
              Connected
            </Button>
          ) : (
            <Button
              size="small"
              sx={{ backgroundColor: "white", color: "#27AE60" }}
              variant="contained"
              onClick={handleConnectMusic}
            >
              Connect Music
            </Button>
          )}
        </Box>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          label: "Messages",
          height: "86%",
          backgroundColor: "#c0eaca",
          padding: "10px",
          overflowY: "auto",
          scrollbarWidth: "none",
          postion: "relative",
        }}
      >
        {messages.length === 0 ? (
          <Typography
            sx={{
              position: "absolute",
              top: "50%",
              left: "42%",
              color: "gray",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            No messages yet. Start the conversation!
          </Typography>
        ) : (
          messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                marginBottom: "10px",
                backgroundColor: "#fff",
                padding: "10px",
                borderRadius: "5px",
                alignSelf: message?.sender === user.id ? "flex-end" : "flex-start",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {message?.sender === user.id ? user.name : getUserName(message.sender)}
              </Typography>
              <Typography>{message?.message}</Typography>
              {/* <div ref={messagesEndRef} /> */}
            </Box>
          ))
        )}
      </Box>

      {/* Write box */}
      <Box
        sx={{
          display: "flex",
          label: "Write box",
          height: "8%",
          backgroundColor: "#c0eaca",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "#27AE60", color: "white" }}
          onClick={handleSendMessage}
        >
          Send
        </Button>
        {/* <EmojiPicker /> */}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        width: "99%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          color: "lightgray",
          fontWeight: "600",
          fontSize: "18px",
        }}
      >
        Click on chat to start conversation
      </Typography>
    </Box>
  );
};

export default ChatBox;
