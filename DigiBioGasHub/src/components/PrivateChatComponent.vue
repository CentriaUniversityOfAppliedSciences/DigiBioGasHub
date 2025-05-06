<template>
    <IonPage>
        <NavBarComponent />
        <ion-content>
            <ion-header>
                <ion-toolbar>
                    <ion-title>{{ $t('chat.privateChatWith') }}: {{ recipientName }}</ion-title>
                </ion-toolbar>
            </ion-header>
            <div id="chatContainer">
                <div id="chatBox" ref="messagesContainer">
                    <div v-if="messages.length === 0" class="message">
                        {{ $t('chat.noMessages') }}
                    </div>
                    <div v-for="message in messages" :key="message.timestamp" class="message">
                        <div class="avatar">{{ message.senderName.charAt(0).toUpperCase() }}</div>
                        <div class="message-content">
                            <b>{{ message.senderName }}</b>
                            <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
                            <span v-if="message.isEdited" class="edited-marker">({{ $t('chat.edited') }})</span>
                            <div v-if="editingMessageId === message._id">
                                <textarea v-model="editedMessage" @keyup.enter="saveEdit(message)" rows="4"
                                    style="max-width: 70%;"></textarea>
                                <button @click="cancelEdit">{{ $t('general.cancel') }}</button>
                            </div>
                            <div v-else>
                                <div>{{ message.message }}</div>
                                <div v-if="isOwnMessage(message)" class="message-actions">
                                    <button @click="startEdit(message)">{{ $t('general.edit') }}</button>
                                    <button @click="confirmDelete(message)">{{ $t('general.delete') }}</button>
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
    IonInput,
    IonAlert
} from "@ionic/vue";
import axios from "axios";
import socket from "../socket";
import { jwtDecode } from "../router";
import { Buffer } from "buffer";
import NavBarComponent from "./NavBarComponent.vue";

export default {
    name: "PrivateChatComponent",
    components: {
        IonPage,
        NavBarComponent,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonInput,
        IonAlert
    },
    data() {
        return {
            privateRoomId: null,
            recipientId: null,
            recipientName: "",
            recipientUsername: "",
            messages: [],
            newMessage: "",
            decodedToken: null,
            editingMessageId: null,
            editedMessage: "",
            showDeleteAlert: false,
            messageToDelete: null
           
        };
    },
    async mounted() {
        this.initializeChat();
    },
    watch: {
        $route: "initializeChat",
    },
    methods: {
        async initializeChat() {
            this.recipientId = this.$route.params.recipientId;
            this.recipientName = this.$route.params.recipientName;
            this.recipientUsername = history.state?.recipientUsername || '';

            const token = localStorage.getItem("token");
            this.decodedToken = jwtDecode(token);

            const senderId = this.decodedToken.id;
            const privateRoomId = [senderId, this.recipientId].sort().join("_");
            this.privateRoomId = privateRoomId;

            try {
                const response = await axios.get(`http://localhost:3005/privateChat/${privateRoomId}`);
                this.messages = response.data;

                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            } catch (error) {
                console.error("Failed to fetch private chat messages:", error);
            }

            this.setupSocketListeners();
           
            socket.emit("joinPrivateChat", {
                senderId,
                recipientId: this.recipientId,
            });

            console.log(`Joined private chat room: ${privateRoomId}`);
        },
        setupSocketListeners() {
            socket.on("receivePrivateMessage", (message) => {
                this.messages.push(message);
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            });

            socket.on("privateMessageEdited", (updatedMessage) => {
                const index = this.messages.findIndex((msg) => msg._id === updatedMessage.id);
                if (index !== -1) {
                    this.messages[index].message = updatedMessage.message;
                    this.messages[index].isEdited = true;
                }
            });

            socket.on("privateMessageDeleted", (messageData) => {
                const messageId = messageData.id;
                this.messages = this.messages.filter((msg) => msg._id !== messageId);
            });
        },
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
        sendMessage() {
            if (!this.newMessage.trim()) return;

            const senderId = this.decodedToken.id;
            const senderName = Buffer.from(this.decodedToken.name, 'latin1').toString("utf-8");
            const privateRoomId = this.privateRoomId;

            const messageData = {
                senderId,
                recipientId: this.recipientId,
                recipientName: this.recipientName,
                recipientUsername: this.recipientUsername,
                senderUsername: this.decodedToken.username,
                senderName,
                message: this.newMessage,
                privateRoomId,
            };

            socket.emit("sendPrivateMessage", messageData);
            this.newMessage = "";
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        },
        startEdit(message) {
            this.editingMessageId = message._id;
            this.editedMessage = message.message;
        },
        cancelEdit() {
            this.editingMessageId = null;
            this.editedMessage = "";
        },
        saveEdit(message) {
            if (!this.editedMessage.trim()) return;

            const updatedMessage = {
                _id: message._id,
                privateRoomId: this.privateRoomId,
                message: this.editedMessage,
            };

            socket.emit("editPrivateMessage", updatedMessage);
            this.cancelEdit();
        },
        confirmDelete(message) {
            this.messageToDelete = message;
            this.showDeleteAlert = true;
        },
        deleteMessage(message) {
            const messageData = {
                id: message._id,
                privateRoomId: this.privateRoomId,
            };

            socket.emit("deletePrivateMessage", messageData);
        },
        isOwnMessage(message) {
            return message.senderUsername === this.decodedToken.username;
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
