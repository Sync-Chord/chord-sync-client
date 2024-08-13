import { Avatar, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ChatApi from "../../../apis/chat"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

// Define a type for the message object
interface Message {
  text: string
  sender: string
}

const ChatBox = (props: any) => {
  const { openChat } = props
  const { token, user } = useSelector((state: any) => state.auth)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (openChat) {
      setLoading(true)
      ChatApi.get_messages(
        { chat_id: openChat._id, limit: 10, offset: messages.length },
        { token, user: user.id }
      )
        .then((res: any) => {
          setLoading(false)
          if (res.status !== 200) {
            throw new Error(res.data.message)
          } else {
            console.log(res.data.data)
            setMessages(res?.data?.data || [])
          }
        })
        .catch((err: any) => {
          setLoading(false)
          toast.error(err.message)
        })
    }
  }, [openChat])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = { text: newMessage, sender: "Harsh" }
      setMessages((prevMessages) => [...prevMessages, userMessage])
      setNewMessage("")
    }
  }

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
          <Avatar>H</Avatar>
          <Typography>{openChat.group_name}</Typography>
        </Box>
        <Box>
          <Button
            size="small"
            sx={{ backgroundColor: "white", color: "#27AE60" }}
            variant="contained"
          >
            Connect Music
          </Button>
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
                alignSelf:
                  message.sender === "Harsh" ? "flex-end" : "flex-start",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {message.sender}
              </Typography>
              <Typography>{message.text}</Typography>
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
            if (e.key === "Enter") handleSendMessage()
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
  )
}

export default ChatBox;
