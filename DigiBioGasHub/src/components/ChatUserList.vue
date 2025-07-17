<template>
    <ion-page style="overflow-y: auto;">
        <NavBarComponent />
        <ion-content class="main-content">
            <ion-grid>
                <ion-row class="ion-justify-content-center" style="gap: 3rem; margin-bottom: 1rem;">
                    <ion-col size="auto" class="ion-text-center">
                        <div @click="goToGroupChat" class="chat-option" :class="{ selected: false }">
                            <ion-icon name="people-outline" class="chat-icon"></ion-icon>
                            <div class="chat-label">{{ $t('chat.groupChat') }}</div>
                        </div>
                    </ion-col>

                    <ion-col size="auto" class="ion-text-center">
                        <div @click="selectedChat = 'private'" class="chat-option"
                            :class="{ selected: selectedChat === 'private' }">
                            <ion-icon name="person-outline" class="chat-icon"></ion-icon>
                            <div class="chat-label">{{ $t('chat.privateChat') }}</div>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <ion-header>
                <ion-toolbar>
                    <ion-title>{{ $t('chat.chatUsers') }}</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-list>
                <ion-item v-for="user in users" :key="user.id" button @click="navigateToChat(user.id, user.name)"
                    style="margin-bottom: 1rem;">
                    <ion-label class="ion-text-wrap">
                        <h2>{{ user.name }}</h2>
                        <p style="font-size: 1.1rem; padding: 0.3rem 0;" v-if="user.latestMessage">{{ user.latestMessage
                        }} <small style="margin-left: 10px;" v-if="user.timestamp">{{ formatTime(user.timestamp)
                            }}</small></p>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "../router";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonGrid, IonRow, IonCol, IonIcon } from "@ionic/vue";
import FooterComponent from "./FooterComponent.vue";
import NavBarComponent from "./NavBarComponent.vue";
import { defineComponent } from "vue";
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import { addIcons } from "ionicons";

addIcons({
    "people-outline": peopleCircleOutline,
    "person-outline": personCircleOutline,
});

export default defineComponent({
    name: "ChatUserList",
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonGrid,
        IonRow,
        IonCol,
        IonIcon,
        NavBarComponent,
        FooterComponent
    },
    data() {
        return {
            users: [],
            decodedToken: null,
            selectedChat: 'private'
        };
    },
    methods: {

        goToGroupChat() {
            this.$router.push("/chat");
        },

        async fetchUsers() {
            try {

                const response = await axios.post(this.$chat_server_add + "/userlists", {
                    currentUserId: this.decodedToken.id,
                });
                this.users = response.data;

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },

        navigateToChat(recipientId, recipientName) {
            window.location.href = `/privatechat/${recipientId}/${recipientName}`;
        },

        formatTime(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    },
    mounted() {
        const token = localStorage.getItem("token");

        if (token) {
            const decoded = jwtDecode(token);
            this.decodedToken = decoded;
        }

        this.fetchUsers();
    },
});
</script>

<style scoped>
ion-item {
    --padding-start: 16px;
    --inner-padding-end: 16px;
}

ion-list {
    margin-top: 0.5rem;
}

.main-content {
    min-height: 75vh;
}

.chat-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.chat-option:hover {
    transform: scale(1.05);
}

.chat-icon {
    font-size: 50px;
    color: #888;
    margin-bottom: 8px;
}

.chat-label {
    font-size: 16px;
    font-weight: 500;
    color: #888;
}

.chat-option.selected .chat-icon,
.chat-option.selected .chat-label {
    color: #1877f2;
}
</style>
