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
                    <ion-title>{{ $t('chat.chatRoom') }}: {{ roomTitle }}</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="showLeaveAlert = true">{{ $t('chat.leave') }}</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>

            <ion-modal v-if="showTermsModal" :is-open="true" :can-dismiss="false">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>{{ $t('chat.chatTerms.termsModalTitle') }}</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="closeTermsModal">{{ $t('general.close') }}</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    <div class="terms-content">
                        <h2>{{ $t('chat.chatTerms.termsTitle') }}</h2>
                        <p>{{ $t('chat.chatTerms.termsDescription') }}</p>
                        <h2>{{ $t('chat.chatTerms.privacyTitle') }}</h2>
                        <p>{{ $t('chat.chatTerms.privacyDescription') }}</p>
                        <h2>{{ $t('chat.chatTerms.guidelinesTitle') }}</h2>
                        <ul>
                            <li>{{ $t('chat.chatTerms.guidelineRespect') }}</li>
                            <li>{{ $t('chat.chatTerms.guidelineNoSpam') }}</li>
                            <li>{{ $t('chat.chatTerms.guidelineNoHate') }}</li>
                        </ul>
                    </div>
                </ion-content>
            </ion-modal>

            <div id="chatContainer">
                <div v-if="pinnedMessages.length > 0" id="pinnedMessagesContainer">
                    <div class="pinned-header" @click="showPinned = !showPinned">
                        📌 {{ $t('chat.pinnedMessages') }}
                        <span class="toggle-icon">{{ showPinned ? '▲' : '▼' }}</span>
                    </div>

                    <transition name="fade">
                        <div v-show="showPinned" class="pinned-messages-list">
                            <div v-for="(message, index) in pinnedMessages" :key="message._id" class="pinned-message">
                                <div class="avatar">{{ message.name.charAt(0).toUpperCase() }}</div>
                                <div class="message-content">
                                    <b>{{ message.name }}</b>
                                    <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
                                    <span v-if="message.isEdited" class="edited-marker">({{ $t('chat.edited') }})</span>
                                    <div style="white-space:pre-wrap;">{{ message.message }}</div>
                                    <div class="message-actions">
                                        <button v-if="isAdmin()" @click="togglePin(message)">
                                            {{ $t('chat.admin.unpinMessage') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <div class="pinned-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40"
                            color="#000000" fill="#ef233c">
                            <path d="M3 21L8 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path
                                d="M13.2585 18.8714C9.51516 18.0215 5.97844 14.4848 5.12853 10.7415C4.99399 10.1489 4.92672 9.85266 5.12161 9.37197C5.3165 8.89129 5.55457 8.74255 6.03071 8.44509C7.10705 7.77265 8.27254 7.55888 9.48209 7.66586C11.1793 7.81598 12.0279 7.89104 12.4512 7.67048C12.8746 7.44991 13.1622 6.93417 13.7376 5.90269L14.4664 4.59604C14.9465 3.73528 15.1866 3.3049 15.7513 3.10202C16.316 2.89913 16.6558 3.02199 17.3355 3.26771C18.9249 3.84236 20.1576 5.07505 20.7323 6.66449C20.978 7.34417 21.1009 7.68401 20.898 8.2487C20.6951 8.8134 20.2647 9.05346 19.4039 9.53358L18.0672 10.2792C17.0376 10.8534 16.5229 11.1406 16.3024 11.568C16.0819 11.9955 16.162 12.8256 16.3221 14.4859C16.4399 15.7068 16.2369 16.88 15.5555 17.9697C15.2577 18.4458 15.1088 18.6839 14.6283 18.8786C14.1477 19.0733 13.8513 19.006 13.2585 18.8714Z"
                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>

                <div id="chatBox" ref="messagesContainer">
                    <div v-if="messages.length === 0" class="nomessage">
                        {{ $t('chat.noMessages') }}
                    </div>
                    <div v-for="message in messages" :key="message.timestamp" class="message">
                        <div class="avatar">{{ message.name.charAt(0).toUpperCase() }}</div>
                        <div class="message-content">
                            <div class="message-content-header">
                                <b>{{ message.name }}</b>
                                <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
                                <span v-if="message.isEdited" class="edited-marker">({{ $t('chat.edited') }})</span>
                            </div>
                            <div v-if="editingMessageId === message._id">
                                <textarea v-model="editedMessage" @keyup.enter.exact="saveEdit(message)"
                                    @keyup.enter.shift.prevent rows="4" class="edit-textarea"></textarea>
                                <button @click="cancelEdit">{{ $t('general.cancel') }}</button>
                            </div>
                            <div v-else class="message-content-body">
                                <div style="white-space:pre-wrap;">{{ message.message }}</div>
                                <div v-if="isOwnMessage(message) || isAdmin()">
                                    <ion-icon name="ellipsis-vertical-sharp" class="message-options-icon"
                                        :id="'dropdown-trigger-' + message._id"></ion-icon>

                                    <ion-popover :trigger="'dropdown-trigger-' + message._id" trigger-action="click"
                                        side="bottom" alignment="end" size="auto">
                                        <ion-list lines="none">
                                            <ion-item v-if="isOwnMessage(message)" button @click="startEdit(message)">
                                                {{ $t('general.edit') }}
                                            </ion-item>

                                            <ion-item v-if="isOwnMessage(message) || isAdmin()" button
                                                @click="confirmDelete(message)">
                                                {{ $t('general.delete') }}
                                            </ion-item>

                                            <ion-item v-if="isAdmin()" button @click="togglePin(message)">
                                                {{
                                                    message.pinned
                                                        ? $t('chat.admin.unpinMessage')
                                                        : $t('chat.admin.pinMessage')
                                                }}
                                            </ion-item>
                                        </ion-list>
                                    </ion-popover>

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
                        " ref="messageInput" :disabled="showTermsModal"></textarea>
                    <button id="sendBtn" @click="sendMessage">{{ $t('chat.send') }}</button>
                </div>
            </div>

            <ion-alert :is-open="showLeaveAlert" :header="$t('chat.confirmLeave')"
                :message="$t('chat.leaveRoomConfirmation')" :buttons="[
                    {
                        text: $t('general.cancel'),
                        role: 'cancel',
                        handler: () => {
                            showLeaveAlert = false;
                        }
                    },
                    {
                        text: $t('chat.leave'),
                        handler: () => {
                            leaveRoom();
                            showLeaveAlert = false;
                        }
                    }
                ]"></ion-alert>

            <ion-alert :is-open="showDeleteAlert" :header="$t('chat.confirmDelete')" :message="$t('chat.deleteMessage')"
                :buttons="[
                    {
                        text: $t('general.cancel'),
                        role: 'cancel',
                        handler: () => {
                            showDeleteAlert = false;
                            popoverController.dismiss();
                        }
                    },
                    {
                        text: $t('general.delete'),
                        handler: () => {
                            this.deleteMessage(this.messageToDelete);
                            showDeleteAlert = false;
                        }
                    }
                ]"></ion-alert>

        </ion-content>
    </IonPage>
    <IonPage v-else>
        <ion-content>
            <div>
                {{ $t('chat.errorMessage') }}
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
    IonItem,
    IonInput,
    IonAlert,
    IonIcon,
    IonModal,
    IonPopover,
    IonList,
    popoverController
} from "@ionic/vue";
import axios from "axios";
import getSocket from "../socket";
import { jwtDecode } from "../router";
import { Buffer } from "buffer";
import NavBarComponent from "./NavBarComponent.vue";
import { defineComponent } from "vue";
import { addIcons } from "ionicons";
import { arrowBack, ellipsisVerticalSharp } from "ionicons/icons";

addIcons({
    "arrow-back": arrowBack,
    "ellipsis-vertical-sharp": ellipsisVerticalSharp
});


export default defineComponent({
    name: "ChatComponent",
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
        IonItem,
        IonInput,
        IonAlert,
        IonModal,
        IonPopover,
        IonList
    },
    data() {
        return {
            roomId: null,
            roomTitle: "",
            messages: [],
            newMessage: "",
            editingMessageId: null,
            editedMessage: "",
            showLeaveAlert: false,
            showDeleteAlert: false,
            messageToDelete: null,
            decodedToken: null,
            socket: null,
            loadingOlderMessages: false,
            hasMoreMessages: true,
            hasError: false,
            pinnedMessages: [],
            showTermsModal: false,
            showPinned: true
        };
    },
    async mounted() {

        const modalShown = localStorage.getItem("chatTermsModalShown");
        if (!modalShown) {
            this.showTermsModal = true;
        }

        this.socket = getSocket();
        this.roomId = this.$route.params.roomId;
        this.roomTitle = this.$route.params.roomTitle;

        const token = localStorage.getItem("token");
        if (token) {
            this.decodedToken = jwtDecode(token);
        }

        this.socket.emit("joinRoom", { roomId: this.roomId, roomName: this.roomTitle}, (response) => {
            if (response.status !== "success") {
                this.hasError = true;
                console.error("Failed to join room:", response.message);
            }
        });

        try {
            const response = await axios.post(this.$chat_server_add + `/chat/${this.roomId}`, { limit: 50 });
            this.messages = response.data;

            this.$nextTick(() => {
                this.scrollToBottom();
                this.$refs.messagesContainer.addEventListener("scroll", this.handleScroll);
            });
        } catch (error) {
            console.error("Failed to fetch chat messages:", error);
        }

        this.fetchPinnedMessages();

        this.socket.on("receiveMessage", (message) => {
            this.messages.push(message);
            this.$nextTick(() => {
                this.scrollToBottom();
            });
        });

        this.socket.on("messageDeleted", (messageData) => {
            const messageId = messageData.id;
            this.messages = this.messages.filter((msg) => msg._id !== messageId);
        });

        this.socket.on("messageEdited", (updatedMessage) => {
            const index = this.messages.findIndex((msg) => msg._id === updatedMessage._id);
            if (index !== -1) {
                this.messages[index].message = updatedMessage.message;
                this.messages[index].isEdited = true;
            }
        });
        this.socket.on("messagePinned", (updatedMessage) => {
            const index = this.messages.findIndex((msg) => msg._id === updatedMessage.id);
            if (index !== -1) {
                this.messages[index].pinned = true;
            }

            const pinnedIndex = this.pinnedMessages.findIndex((msg) => msg._id === updatedMessage.id);
            if (pinnedIndex === -1) {
                this.pinnedMessages.push(this.messages[index]);
            }
        });

        this.socket.on("messageUnpinned", (updatedMessage) => {
            this.pinnedMessages = this.pinnedMessages.filter((msg) => msg._id !== updatedMessage.id);
        });
    },
    beforeUnmount() {
        const container = this.$refs.messagesContainer;
        if (container) {
            container.removeEventListener("scroll", this.handleScroll);
        }

        if (this.socket) {
            this.socket.off("receiveMessage");
            this.socket.off("messageDeleted");
            this.socket.off("messageEdited");
            this.socket.disconnect();
        }
    },

    methods: {
        closeTermsModal() {
            this.showTermsModal = false;
            localStorage.setItem("chatTermsModalShown", "true");
        },

        async loadOlderMessages() {

            if (this.loadingOlderMessages || !this.hasMoreMessages) return;
            this.loadingOlderMessages = true;
            const oldestTimestamp = this.messages[0].timestamp;
            try {
                const response = await axios.post(this.$chat_server_add + `/chat/${this.roomId}`, { limit: 50, oldestTimestamp }, {headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false});
                const newMessages = response.data;
                if (newMessages.length === 0) {
                    this.hasMoreMessages = false;
                } else {
                    this.messages.unshift(...newMessages);
                }
            } catch (error) {
                console.error("Failed to fetch older chat messages:", error);
            } finally {
                this.loadingOlderMessages = false;
            }
        },

        async fetchPinnedMessages() {
            try {
                const response = await axios.get(`${this.$chat_server_add}/pinnedMessages/${this.roomId}`, {}, { headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false});
                this.pinnedMessages = response.data;
            } catch (error) {
                console.error("Failed to fetch pinned messages:", error);
            }
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
        leaveRoom() {
            if (this.socket) {
                this.socket.emit("leaveRoom", {
                    roomId: this.roomId,
                    roomName: this.roomTitle,
                    userId: this.decodedToken.id
                });
                this.socket.disconnect();
            }
            this.$router.push({ name: "ChatPageView" });
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
            this.socket.emit("sendMessage", messageData);
            this.newMessage = "";
            this.$nextTick(() => {
                const textarea = this.$refs.messageInput;
                if (textarea) {
                    textarea.style.height = 'auto';
                }
                this.scrollToBottom();
            });
        },
        togglePin(message) {
            const event = message.pinned ? "unpinMessage" : "pinMessage";
            this.socket.emit(event, { _id: message._id, roomId: this.roomId });

            const index = this.messages.findIndex((msg) => msg._id === message._id);
            if (index !== -1) {
                this.messages[index].pinned = !message.pinned;
            }

            popoverController.dismiss().catch(() => {});
        },
        isOwnMessage(message) {
            return message.userId === this.decodedToken.id;
        },
        isAdmin() {
            return this.decodedToken.userlevel == 99;
        },
        async startEdit(message) {

            if (message.userId === this.decodedToken.id) {
                this.editingMessageId = message._id;
                this.editedMessage = message.message;
                await popoverController.dismiss();
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

            this.socket.emit("editMessage", updatedMessage);
            this.editingMessageId = null;
            this.editedMessage = "";
        },
        confirmDelete(message) {
            this.showDeleteAlert = true;
            this.messageToDelete = message;
        },
        deleteMessage(message) {
            this.socket.emit("deleteMessage", { id: message._id, roomId: message.roomId });
        },
        scrollToBottom() {
            const container = this.$refs.messagesContainer;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        },
        handleScroll() {
            const container = this.$refs.messagesContainer;
            if (container && container.scrollTop < 50) {
                this.loadOlderMessages();
            }
        }

    },
});
</script>

<style scoped>
#chatContainer {
    display: flex;
    flex-direction: column;
    height: 90vh;
    align-items: center;
    background-color: #2c2f33;
}

#pinnedMessagesContainer {
    width: 100%;
    max-width: 90rem;
    padding: 10px 0;
    background-color: #2f3136;
    border-bottom: 1px solid #202225;
}

.pinned-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background-color: #202225;
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    border-bottom: 1px solid #2f3136;
}

.toggle-icon {
    margin-left: auto;
    font-size: 0.9rem;
    opacity: 0.6;
}

.pinned-messages-list {
    max-height: 240px;
    overflow-y: auto;
    background-color: #2f3136;
    padding: 10px 0;
}

.pinned-message {
    display: flex;
    gap: 12px;
    padding: 10px 20px;
    background-color: rgba(67, 181, 129, 0.1);
    border-left: 4px solid #43b581;
    border-radius: 4px;
    margin-bottom: 8px;
    position: relative;
}

.pinned-message .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #7289da;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1em;
    color: white;
    font-weight: bold;
    flex-shrink: 0;
}

.pinned-message .message-content {
    color: #dcddde;
    font-size: 0.95rem;
}

.pinned-message .message-content b {
    color: #ffffff;
    font-weight: 600;
}

.pinned-message .timestamp {
    font-size: 0.75rem;
    color: #72767d;
    margin-left: 8px;
}

.pinned-message .edited-marker {
    font-size: 0.75rem;
    color: #72767d;
    font-style: italic;
    margin-left: 8px;
}

.pinned-message .message-content>div {
    margin-top: 2px;
    white-space: pre-wrap;
}

.pinned-message .message-actions button {
    background: none;
    color: #43b581;
    border: none;
    font-size: 0.85rem;
    cursor: pointer;
}

.pinned-message .message-actions button:hover {
    color: #ffffff;
    background-color: #43b58133;
    border-radius: 3px;
}

.pinned-icon {
    position: absolute;
    top: 10px;
    right: 20px;
    pointer-events: none;
    opacity: 0.6;
}


.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}


#chatBox {
    flex: 1;
    overflow-y: auto;
    padding: 20px 0;
    width: 100%;
    max-width: 90rem;
    background-color: #2f3136;
}

.message {
    display: flex;
    gap: 12px;
    padding: 14px 20px;
    position: relative;
}

.message:hover {
    background-color: rgba(255, 255, 255, 0.05);
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
    color: white;
    flex-shrink: 0;
}

.message-content {
    font-size: 0.95rem;
    line-height: 1.4;
}

.message-content-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 2px;
}

.message-content-header b {
    color: #ffffff;
    font-weight: 600;
}

.timestamp {
    font-size: 0.75rem;
    color: #72767d;
}

.edited-marker {
    font-size: 0.75rem;
    color: #72767d;
    font-style: italic;
}

.message-content-body {
    white-space: pre-wrap;
    color: #dcddde;
}

.message-options-icon {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    color: #b9bbbe;
    visibility: hidden;
}

.message:hover .message-options-icon {
    visibility: visible;
}

.edit-textarea {
    background-color: #40444b;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px;
    font-size: 0.95rem;
    width: 100%;
}

#messageInputContainer {
    display: flex;
    padding: 10px 20px;
    background-color: #2f3136;
    position: sticky;
    bottom: 0;
    width: 100%;
    max-width: 90rem;
    border-top: 1px solid #202225;
}

#message {
    flex: 1;
    padding: 10px;
    background-color: #40444b;
    border: none;
    border-radius: 4px;
    color: white;
}

#message:focus {
    outline: none;
    border: 1px solid #7289da;
}

#sendBtn {
    margin-left: 10px;
    padding: 10px 16px;
    background-color: #5865f2;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
}

#sendBtn:hover {
    background-color: #4752c4;
}

.nomessage {
    padding: 10px 20px;
    color: #72767d;
}

#chatBox::-webkit-scrollbar {
    width: 8px;
}

#chatBox::-webkit-scrollbar-thumb {
    background-color: #202225;
    border-radius: 4px;
}
</style>
