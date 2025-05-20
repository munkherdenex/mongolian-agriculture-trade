import { io } from "socket.io-client";

const socket = io("https://agromongol-backend.onrender.com");

export default socket;
