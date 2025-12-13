import { io } from "socket.io-client";

export const createSocket = io("http://190.228.131.42:4000", {
    autoConnect: true,
    transports: ["websocket", "polling"]
});