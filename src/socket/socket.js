// src/socket/socket.js

import { io } from "socket.io-client";

export const socket = io(

    "http://localhost:5000",

    {

        autoConnect: false,

        withCredentials: true,

    }
);
export default socket;

