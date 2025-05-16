import { io } from "socket.io-client";
let chat_socket_add = import.meta.env.VITE_CHATSOCKET; 
let socket;

export default function getSocket() {
    if (!socket) {
        socket = io(chat_socket_add + "");
    }
    return socket;
}
