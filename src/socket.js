// user/src/socket.js
import { io } from "socket.io-client";
const socket = io("https://api.ourmicrolife.com"); // change to your backend URL
export default socket;
