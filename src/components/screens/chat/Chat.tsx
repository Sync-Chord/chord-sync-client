import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, inputMessage]);
      setInputMessage(""); // Clear input field
    }
  };

  const playlist = [
    { title: "Song 1", artist: "Artist A" },
    { title: "Song 2", artist: "Artist B" },
    { title: "Song 3", artist: "Artist C" },
    { title: "Song 4", artist: "Artist D" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Chat Room */}
      <Box sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column" }}>
        <Typography variant="h5" gutterBottom>
          Chat Room
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            mb: 2,
            border: "1px solid #ccc",
            borderRadius: 2,
            padding: 2,
            backgroundColor: "#f9f9f9",
            maxHeight: "70vh", // Set a max height for the chat box
          }}
        >
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <Typography key={index} sx={{ mb: 1 }}>
                {message}
              </Typography>
            ))
          ) : (
            <Typography color="textSecondary">No messages yet</Typography>
          )}
          <Box sx={{ display: "flex" }}>
            <TextField
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              variant="outlined"
              sx={{ mr: 1 }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: "#27AE70" }}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Song Playlist */}
      <Box sx={{ width: "25%", p: 3, borderLeft: "1px solid #ccc" }}>
        <Typography variant="h6" gutterBottom>
          Playlist
        </Typography>
        <List>
          {playlist.map((song, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={song.title} secondary={song.artist} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Chat;
