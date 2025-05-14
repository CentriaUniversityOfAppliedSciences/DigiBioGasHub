import { io } from "socket.io-client";

let socket;

export default function getSocket() {
    if (!socket) {
        console.log("Connecting to socket...");
        socket = io("http://localhost:3005");
    }
    return socket;
}
