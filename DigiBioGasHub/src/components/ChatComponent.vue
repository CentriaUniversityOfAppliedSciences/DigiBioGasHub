<template>
    <IonPage>
        <NavBarComponent />
        <ion-content>
            <ion-header>
                <ion-toolbar>
                    <ion-title>{{ $t('chat.chatRoom') }}: {{ roomTitle }}</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="leaveRoom">{{ $t('chat.leave') }}</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <div id="chatContainer">
                <div id="chatBox" ref="messagesContainer">
                    <div v-if="messages.length === 0" class="message">
                        {{ $t('chat.noMessages') }}
                    </div>
                    <div v-for="message in messages" :key="message.timestamp" class="message">
                        <div class="avatar">{{ message.name.charAt(0).toUpperCase() }}</div>
                        <div class="message-content">
                            <b>{{ message.name }}</b>
                            <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
                            <span v-if="message.isEdited" class="edited-marker">({{ $t('chat.edited') }})</span>
                            <div v-if="editingMessageId === message._id">
                                <textarea v-model="editedMessage" @keyup.enter="saveEdit(message)" rows="4"
                                   class="edit-textarea"></textarea>
                                <button @click="cancelEdit">{{ $t('general.cancel') }}</button>
                            </div>
                            <div v-else>
                                <div>{{ message.message }}</div>
                                <div v-if="isOwnMessage(message) || isAdmin" class="message-actions">
                                    <button v-if="isOwnMessage(message)" @click="startEdit(message)">{{
                                        $t('general.edit') }}</button>
                                    <button v-if="isOwnMessage(message) || isAdmin()" @click="confirmDelete(message)">{{
                                        $t('general.delete') }}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="messageInputContainer">
                    <input id="message" v-model="newMessage" :placeholder="$t('chat.placeholders.enterMessage')"
                        @keyup.enter="sendMessage" />
                    <button id="sendBtn" @click="sendMessage">{{ $t('chat.send') }}</button>
                </div>
            </div>

            <ion-alert :is-open="showDeleteAlert" :header="$t('chat.confirmDelete')" :message="$t('chat.deleteMessage')"
                :buttons="[
                    {
                        text: $t('general.cancel'),
                        role: 'cancel',
                        handler: () => {
                            this.showDeleteAlert = false;
                        }
                    },
                    {
                        text: $t('general.delete'),
                        handler: () => {
                            this.deleteMessage(this.messageToDelete);
                            this.showDeleteAlert = false;
                        }
                    }
                ]"></ion-alert>

        </ion-content>
    </IonPage>
</template>

<script>
import {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
    IonAlert
} from "@ionic/vue";
import axios from "axios";
import socket from "../socket";
import { jwtDecode } from "../router";
import { Buffer } from "buffer";
import NavBarComponent from "./NavBarComponent.vue";

export default {
    name: "ChatComponent",
    components: {
        IonPage,
        NavBarComponent,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonItem,
        IonInput,
        IonAlert
    },
    data() {
        return {
            roomId: null,
            roomTitle: "",
            messages: [],
            newMessage: "",
            editingMessageId: null,
            editedMessage: "",
            showDeleteAlert: false,
            messageToDelete: null,
            decodedToken: null,
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

        socket.on("receiveMessage", (message) => {
            this.messages.push(message);
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        });

        socket.emit("joinRoom", { roomId: this.roomId, roomName: this.roomTitle });

        socket.on("messageDeleted", (messageData) => {
            const messageId = messageData.id;
            this.messages = this.messages.filter((msg) => msg._id !== messageId);
        });

        socket.on("messageEdited", (updatedMessage) => {
            const index = this.messages.findIndex((msg) => msg._id === updatedMessage._id);
            if (index !== -1) {
                this.messages[index].message = updatedMessage.message;
                this.messages[index].isEdited = true;
            }
        });

        const token = localStorage.getItem("token");
        if (token) {
            this.decodedToken = jwtDecode(token);
        }
    },
    methods: {
        formatTimestamp(timestamp) {
            const now = new Date();
            const messageDate = new Date(timestamp);

            if (now.toDateString() === messageDate.toDateString()) {
                return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            }

            const yesterday = new Date();
            yesterday.setDate(now.getDate() - 1);
            if (yesterday.toDateString() === messageDate.toDateString()) {
                return `Yesterday at ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;
            }

            return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }) +
                ' at ' +
                messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
        },
        leaveRoom() {
            if (socket) {
                console.log("Leaving room:", this.roomId, this.roomTitle);
                socket.emit("leaveRoom", {
                    roomId: this.roomId,
                    roomName: this.roomTitle,
                });
                socket.disconnect();
            }
            this.$router.push({ name: "ChatRooms" });
        },
        sendMessage() {
            if (!this.newMessage.trim()) return;

            const name = Buffer.from(this.decodedToken.name, 'latin1').toString("utf-8");
            const messageData = {
                roomId: this.roomId,
                roomName: this.roomTitle,
                userId: this.decodedToken.id,
                name: name,
                message: this.newMessage,
            };

            socket.emit("sendMessage", messageData);
            this.newMessage = "";
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
        isOwnMessage(message) {
            console.log("message:", message);
            return message.userId === this.decodedToken.id;
        },
        isAdmin(message) {
            return this.decodedToken.userlevel >= 22;
        },
        startEdit(message) {

            if (message.userId === this.decodedToken.id) {
                this.editingMessageId = message._id;
                console.log("Editing message:", message);
                this.editedMessage = message.message;
                console.log("Edited message:", this.editedMessage);
            } else {
                console.error("Unauthorized: You can only edit your own messages.");
            }
        },
        cancelEdit() {
            this.editingMessageId = null;
            this.editedMessage = "";
        },
        saveEdit(message) {
            if (!this.editedMessage.trim()) return;

            const updatedMessage = {
                ...message,
                message: this.editedMessage
            };

            socket.emit("editMessage", updatedMessage);
            this.editingMessageId = null;
            this.editedMessage = "";
        },
        confirmDelete(message) {
            this.showDeleteAlert = true;
            this.messageToDelete = message;
        },
        deleteMessage(message) {
            socket.emit("deleteMessage", { id: message._id, roomId: message.roomId });
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

.message-actions {
    display: flex;
    gap: 5px;
    margin-top: 5px;
}

button {
    background: none;
    color: gainsboro;
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
    padding: 10px;
    background-color: #2f3136;
    border-top: 1px solid #202225;
    position: sticky;
    bottom: 0;
    z-index: 10;
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

.edit-textarea {
  background-color: white;
  color: black;
  max-width: 70%;
}

@media (prefers-color-scheme: dark) {
  .edit-textarea {
    background-color: #40444b;
    color: white;
  }
}

.edited-marker {
    font-size: 0.8em;
    color: #b9bbbe;
    margin-left: 5px;
    font-style: italic;
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
