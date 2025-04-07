<template>
    <ion-content>
        <ion-header>
            <ion-toolbar>
                <ion-title>Chat Room: {{ roomTitle }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="leaveRoom">Leave</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <div id="chatContainer">
            <div id="chatBox" ref="messagesContainer">
                <div v-if="messages.length === 0" class="message">
                    No messages yet. Be the first to send a message!
                </div>
                <div v-for="message in messages" :key="message.timestamp" class="message">
                    <div class="avatar">{{ message.username.charAt(0).toUpperCase() }}</div>
                    <div class="message-content">
                        <b>{{ message.username }}</b>
                        <span class="timestamp">{{ message.timestamp }}</span>
                        <div>{{ message.message }}</div>
                    </div>
                </div>
            </div>

            <div id="messageInputContainer">
                <input id="message" v-model="newMessage" placeholder="Type your message..."
                    @keyup.enter="sendMessage" />
                <button id="sendBtn" @click="sendMessage">Send</button>
            </div>
        </div>
    </ion-content>
</template>

<script>
import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
} from "@ionic/vue";
import axios from "axios";
import io from "socket.io-client";
import { jwtDecode } from "../router";

export default {
    name: "ChatComponent",
    components: {
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonItem,
        IonInput,
    },
    data() {
        return {
            roomId: null,
            roomTitle: "",
            messages: [],
            newMessage: "",
            socket: null,
        };
    },
    async mounted() {
        this.roomId = this.$route.params.roomId;
        this.roomTitle = this.$route.params.roomTitle;

        console.log("Joining room:", this.roomId, this.roomTitle);

        try {
            const response = await axios.get(`http://localhost:3005/chat/${this.roomId}`);
            this.messages = response.data;

            this.$nextTick(() => {
                this.scrollToBottom();
            });
        } catch (error) {
            console.error("Failed to fetch chat messages:", error);
        }

        this.socket = io("http://localhost:3005");
        this.socket.on("receiveMessage", (message) => {
            this.messages.push(message);
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        });

        this.socket.emit("joinRoom", { roomId: this.roomId, roomName: this.roomTitle });
    },
    methods: {
        leaveRoom() {
            if (this.socket) {
                console.log("Leaving room:", this.roomId, this.roomTitle);
                this.socket.emit("leaveRoom", {
                    roomId: this.roomId,
                    roomName: this.roomTitle,
                });
                this.socket.disconnect();
            }
            this.$router.push({ name: "ChatRooms" });
        },
        sendMessage() {
            if (!this.newMessage.trim()) return;

            const token = localStorage.getItem("token");
            const messageData = {
                roomId: this.roomId,
                roomName: this.roomTitle,
                username: jwtDecode(token).name,
                message: this.newMessage,
            };

            console.log("Sending message:", messageData);

            this.socket.emit("sendMessage", messageData);
            this.newMessage = "";
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
        scrollToBottom() {
            const container = this.$refs.messagesContainer;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        },
    },
};
</script>

<style scoped>
#chatContainer {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

#chatBox {
    flex: 1;
    padding: 10px;
    padding-bottom: 60px;
    overflow-y: auto;
    background-color: #2f3136;
    border-top: 1px solid #202225;
    border-bottom: 1px solid #202225;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.message {
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #7289da;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    color: #ffffff;
    font-weight: bold;
}

.message-content {
    background-color: #40444b;
    padding: 10px;
    border-radius: 8px;
    color: #ffffff;
    max-width: 70%;
}

.message-content b {
    color: #7289da;
}

.timestamp {
    font-size: 0.8em;
    color: #b9bbbe;
    margin-left: 5px;
}

#messageInputContainer {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #2f3136;
    border-top: 1px solid #202225;
    position: sticky;
    bottom: 0;
}

#message {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-right: 10px;
    background-color: #40444b;
    color: #ffffff;
}

#message:focus {
    outline: none;
    border: 1px solid #7289da;
}

#sendBtn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #7289da;
    color: #ffffff;
    cursor: pointer;
}

#sendBtn:hover {
    background-color: #5b6eae;
}

#chatBox::-webkit-scrollbar {
    width: 8px;
}

#chatBox::-webkit-scrollbar-thumb {
    background-color: #202225;
    border-radius: 4px;
}
</style>
