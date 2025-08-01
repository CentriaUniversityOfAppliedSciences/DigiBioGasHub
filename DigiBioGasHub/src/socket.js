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
            const code = err && err.data && err.data.code;
            const message = err && err.message;

            if (code === "INVALID_TOKEN" || code === "NO_TOKEN" ||
                (typeof message === "string" && (message.includes("Invalid token") || message.includes("No token")))) {
                console.warn("Auth failure from chat socket:", code || message);
                localStorage.removeItem("token");
                router.push("/welcome");
                return;
            }
        });

    }
    return socket;
}
