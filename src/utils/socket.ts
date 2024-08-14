// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3001";
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export default socket;
