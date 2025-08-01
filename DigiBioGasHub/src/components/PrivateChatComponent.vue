<template>
    <IonPage v-if="!hasError">
        <NavBarComponent />
        <ion-content>
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="start">
                        <ion-button @click="$router.go(-1)" style="margin-left: 10px;">
                            <ion-icon name="arrow-back"></ion-icon>
                        </ion-button>
                    </ion-buttons>
                    <ion-title>{{ $t('chat.privateChatWith') }}: {{ recipientName }}</ion-title>
                </ion-toolbar>
            </ion-header>
            <div id="chatContainer">
                <div id="chatBox" ref="messagesContainer">
                    <div v-if="messages.length === 0" class="nomessage">
                        {{ $t('chat.noMessages') }}
                    </div>
                    <div v-for="message in messages" :key="message._id"
                        :class="isOwnMessage(message) ? 'own-message' : 'received-message'">
                        <div class="avatar">{{ message.senderName.charAt(0).toUpperCase() }}</div>
                        <div class="message-bubble">
                            <div class="sender-time-wrapper">
                                <span class="sender-items">{{ isOwnMessage(message) ? "" : message.senderName }}</span>
                                <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
                            </div>
                            <div class="message-content-wrapper">
                                <div class="message-content">
                                    <span v-if="message.isEdited" class="edited-marker">({{ $t('chat.edited') }})</span>
                                    <div v-if="editingMessageId === message._id">
                                        <textarea v-model="editedMessage" @keyup.enter="saveEdit(message)" rows="4"
                                            class="edit-textarea"></textarea>
                                        <button @click="cancelEdit">{{ $t('general.cancel') }}</button>
                                    </div>
                                    <div v-else>
                                        <div style="white-space:pre-wrap;">{{ message.message }}</div>
                                        <div v-if="isOwnMessage(message)">
                                            <ion-icon :id="'dropdown-trigger-' + message._id"
                                                name="ellipsis-vertical-sharp" class="message-options-icon"></ion-icon>

                                            <ion-popover :trigger="'dropdown-trigger-' + message._id"
                                                trigger-action="click" side="bottom" alignment="end" size="auto">
                                                <ion-list lines="none">
                                                    <ion-item v-if="isOwnMessage(message)" button
                                                        @click="startEdit(message)">
                                                        {{ $t('general.edit') }}
                                                    </ion-item>
                                                    <ion-item v-if="isOwnMessage(message)" button
                                                        @click="confirmDelete(message)">
                                                        {{ $t('general.delete') }}
                                                    </ion-item>
                                                </ion-list>
                                            </ion-popover>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="messageInputContainer">
                    <textarea id="message" v-model="newMessage" :placeholder="$t('chat.placeholders.enterMessage')"
                        rows="1" style="overflow:hidden; resize:none; height:auto"
                        @keydown.enter.exact.prevent="sendMessage" @keydown.enter.shift @input="
                            $event.target.style.height = 'auto';
                        $event.target.style.height = $event.target.scrollHeight + 'px';
                        " ref="messageInput"></textarea>
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
    <IonPage v-else>
        <ion-content>
            <ion-toolbar>
                <LocaleComponent />
            </ion-toolbar>
            <div>
                {{ errorMessage }}
                <br />
                <a v-if="errorMessage === $t('chat.chatDisabledMessage')" href="/settings">{{ $t('chat.goToSettings')
                    }}</a>
            </div>
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
    IonAlert,
    IonIcon,
    IonList,
    IonItem,
    IonPopover,
    popoverController
} from "@ionic/vue";
import axios from "axios";
import getsocket from "../socket";
import { jwtDecode } from "../router";
import NavBarComponent from "./NavBarComponent.vue";
import { defineComponent } from "vue";
import { addIcons } from "ionicons";
import { arrowBack, ellipsisVerticalCircleSharp } from "ionicons/icons";
import LocaleComponent from "./LocaleComponent.vue";

addIcons({
    "arrow-back": arrowBack,
    "ellipsis-vertical-sharp2": ellipsisVerticalCircleSharp
});


export default defineComponent({
    name: "PrivateChatComponent",
    components: {
        IonPage,
        NavBarComponent,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonIcon,
        IonButton,
        IonInput,
        IonAlert,
        IonPopover,
        IonList,
        IonItem,
        LocaleComponent
    },
    data() {
        return {
            recipientId: null,
            recipientName: "",
            messages: [],
            newMessage: "",
            decodedToken: null,
            editingMessageId: null,
            editedMessage: "",
            showDeleteAlert: false,
            messageToDelete: null,
            limit: 50,
            before: null,
            socket: null,
            allLoaded: false,
            loadingMore: false,
            hasError: false,
            errorMessageKey: null
        };
    },
    computed: {
        errorMessage() {
            if (this.errorMessageKey) {
                return this.$t(this.errorMessageKey);
            }
            return "";
        },
    },
    async mounted() {
        this.initializeChat();
        const container = this.$refs.messagesContainer;
        if (container) {
            container.addEventListener("scroll", this.handleScroll);
        }
    },
    beforeUnmount() {
        const container = this.$refs.messagesContainer;
        if (container) {
            container.removeEventListener("scroll", this.handleScroll);
        }
    },
    watch: {
        $route: "initializeChat",
    },
    methods: {
        async initializeChat() {

            this.socket = getsocket();
            this.recipientId = this.$route.params.recipientId;
            this.recipientName = this.$route.params.recipientName;

            const token = localStorage.getItem("token");
            this.decodedToken = jwtDecode(token);

            const response = await axios.post(this.$chat_server_add + '/getchatusers', {}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
            const currentUser = response.data.find(user => user.id === this.decodedToken.id);

            if (!currentUser) {
                this.errorMessageKey = 'chat.chatDisabledMessage';
                this.hasError = true;
                return;
            }

            const senderId = this.decodedToken.id;

            this.setupsocketListeners();

            this.socket.emit("joinPrivateChat", { recipientId: this.recipientId }, async (response) => {
                if (response.status === "success") {
                    await this.loadMessages(true);
                } else {
                    this.hasError = true;
                    this.errorMessageKey = 'chat.invalidUrlMessage';
                }
            });

            const unreadMessageIds = this.messages
                .filter(msg => msg.recipientId === this.decodedToken.id && !msg.read)
                .map(msg => msg._id);

            if (unreadMessageIds.length > 0) {
                this.socket.emit("markMessagesAsRead", { messageIds: unreadMessageIds });
            }
        },

        async loadMessages(initial = false) {
            if (this.loadingMore || this.allLoaded) return;

            this.loadingMore = true;

            try {
                const response = await axios.post(this.$chat_server_add + `/privateChat`, { recipientId: this.recipientId, before: this.before, limit: this.limit }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });

                const newMessages = response.data;

                if (newMessages.length < this.limit) {
                    this.allLoaded = true;
                }

                if (newMessages.length > 0) {
                    this.before = newMessages[0].timestamp;
                    this.messages.unshift(...newMessages);
                }
                this.$nextTick(() => {
                    if (initial) {
                        this.scrollToBottom();
                    } else {
                        const container = this.$refs.messagesContainer;
                        if (container) {
                            container.scrollTop = container.scrollHeight / 2;
                        }
                    }
                });
            } catch (error) {
                console.error("Failed to load more messages:", error);
            } finally {
                this.loadingMore = false;
            }
        },

        setupsocketListeners() {

            this.socket.off("receivePrivateMessage");
            this.socket.off("privateMessageEdited");
            this.socket.off("privateMessageDeleted");

            this.socket.on("receivePrivateMessage", (message) => {
                this.messages.push(message);

                if (message.recipientId === this.decodedToken.id && !message.read) {
                    this.socket.emit("markMessagesAsRead", { messageIds: [message._id] });
                }

                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            });

            this.socket.on("privateMessageEdited", (updatedMessage) => {
                const index = this.messages.findIndex((msg) => msg._id === updatedMessage.id);
                if (index !== -1) {
                    this.messages[index].message = updatedMessage.message;
                    this.messages[index].isEdited = true;
                }
            });

            this.socket.on("privateMessageDeleted", (messageData) => {
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

            const messageData = {
                recipientId: this.recipientId,
                recipientName: this.recipientName,
                message: this.newMessage,
            };

            this.socket.emit("sendPrivateMessage", messageData);
            this.newMessage = "";
            this.$nextTick(() => {
                const textarea = this.$refs.messageInput;
                if (textarea) {
                    textarea.style.height = 'auto';
                }
                this.scrollToBottom();
            });
        },
        async startEdit(message) {
            this.editingMessageId = message._id;
            this.editedMessage = message.message;
            await popoverController.dismiss();
        },
        cancelEdit() {
            this.editingMessageId = null;
            this.editedMessage = "";
        },
        saveEdit(message) {
            if (!this.editedMessage.trim()) return;

            const updatedMessage = {
                _id: message._id,
                recipientId: this.recipientId,
                message: this.editedMessage,
            };

            this.socket.emit("editPrivateMessage", updatedMessage);
            this.cancelEdit();
        },
        confirmDelete(message) {
            this.messageToDelete = message;
            this.showDeleteAlert = true;
        },
        async deleteMessage(message) {
            const messageData = {
                id: message._id,
                recipientId: this.recipientId,
            };

            this.socket.emit("deletePrivateMessage", messageData);
            await popoverController.dismiss();
        },
        isOwnMessage(message) {
            return message.senderId === this.decodedToken.id;
        },
        scrollToBottom() {
            const container = this.$refs.messagesContainer;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        },
        handleScroll() {
            const container = this.$refs.messagesContainer;
            if (container && container.scrollTop <= 50) {
                this.loadMessages();
            }
        },
    },
});
</script>

<style scoped>
#chatContainer {
    display: flex;
    flex-direction: column;
    height: 95vh;
    align-items: center;
    background-color: #2d3036;
}

#chatBox {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    background-color: #2f3136;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 90rem;
}

.nomessage {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    color: #ffffff;
}

.own-message {
    align-self: flex-end;
    display: flex;
    flex-direction: row-reverse;
    max-width: 80%;
    margin-bottom: 0.8rem;
}

.received-message {
    align-self: flex-start;
    display: flex;
    max-width: 80%;
    margin-bottom: 0.8rem;
}

.message-bubble {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
}

.sender-time-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    font-size: 0.85rem;
    color: #b9bbbe;
    margin-bottom: 4px;
    align-items: center;
}

.message-content-wrapper {
    display: inline-block;
    max-width: 100%;
}

.message-bubble .sender-time {
    display: flex;
    justify-content: flex-start;
    font-size: 0.85rem;
    color: #b9bbbe;
    margin-bottom: 4px;
    gap: 8px;
}

.own-message .sender-time {
    justify-content: flex-end;
}

.own-message .message-bubble {
    align-items: flex-end;
}

.avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #7289da;
    color: white;
    font-weight: bold;
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 8px;
    flex-shrink: 0;
}

.message-content {
    display: inline-block;
    padding: 12px 20px;
    border-radius: 18px;
    font-size: 0.95rem;
    line-height: 1.4;
    word-break: break-word;
    position: relative;
    background-color: #40444b;
    color: white;
    border-top-left-radius: 4px;
}

.own-message .message-content {
    background-color: #5865f2;
    color: white;
    border-top-right-radius: 4px;
    border-top-left-radius: 18px;
}

.received-message .message-content {
    background-color: #40444b;
    color: white;
    border-top-left-radius: 4px;
}

.sender-items {
    color: #f8f9fa;
    font-size: 1rem;
}

.timestamp {
   font-size: 0.75rem;
   color: #72767d;
}

.edited-marker {
    font-size: 0.75rem;
    color: #b9bbbe;
    margin: 0 5px 0 0;
    align-self: flex-end;
}

.message-options-icon {
    position: absolute;
    left: -20px;
    top: 0.4px;
    font-size: 1.4rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    cursor: pointer;
    color: #b9bbbe;
    padding: 6px;
    margin-top: 7px;
    margin-left: -10px;
    background: transparent;
}

.message-options-icon:hover {
    color: #ffffff;
}

.own-message:hover .message-options-icon {
  opacity: 1;
  pointer-events: auto;
}

button {
    background: none;
    color: gainsboro;
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
}

.edit-textarea {
    background-color: #40444b;
    color: white;
    border-radius: 10px;
    border: 1px solid #7289da;
    padding: 8px;
    max-width: 100%;
}

#messageInputContainer {
    display: flex;
    padding: 10px;
    background-color: #2f3136;
    position: sticky;
    bottom: 0;
    z-index: 10;
    width: 100%;
    max-width: 90rem;
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
