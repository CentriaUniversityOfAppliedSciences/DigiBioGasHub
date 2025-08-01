import { io } from "socket.io-client";
import router from "./router";
let chat_socket_add = import.meta.env.VITE_CHATSOCKET;
let socket;

export default function getSocket() {
    if (!socket) {
        const token = localStorage.getItem("token");
        socket = io(chat_socket_add, {
            auth: {
                token: token,
            }
        });

        // socket.on("connect", () => {
        //     console.log("Connected to chat server:", socket.id);
        // });

        socket.on("unauthorized", (msg) => {
            localStorage.removeItem("token");
            router.push("/welcome");
        });

        socket.on("connect_error", (err) => {
            localStorage.removeItem("token");
            router.push("/welcome");
        });

    }
    return socket;
}
