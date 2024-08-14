// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "https://chord-sync-server.onrender.com";
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
