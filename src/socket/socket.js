// src/socket/socket.js

import { io } from "socket.io-client";

export const socket = io(

    "https://server-ko7u.onrender.com",

    {

        autoConnect: false,

        withCredentials: true,

    }
);
export default socket;

