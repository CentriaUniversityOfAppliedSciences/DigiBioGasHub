<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <ion-toolbar>
                <ion-title>{{ $t('chat.chatUsers') }}</ion-title>
            </ion-toolbar>
            <ion-list>
                <ion-item v-for="user in users" :key="user.id" button @click="navigateToChat(user.id, user.name)" style="margin-bottom: 1rem;">
                    <ion-label class="ion-text-wrap">
                        <h2>{{ user.name }}</h2>
                        <p style="font-size: 1.1rem; padding: 0.3rem 0;" v-if="user.latestMessage">{{ user.latestMessage }} <small style="margin-left: 10px;" v-if="user.timestamp">{{ formatTime(user.timestamp) }}</small></p>
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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from "@ionic/vue";
import FooterComponent from "./FooterComponent.vue";
import NavBarComponent from "./NavBarComponent.vue";

export default {
    name: "ChatUserList",
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        NavBarComponent,
        FooterComponent
    },
    data() {
        return {
            users: [],
            decodedToken: null,
        };
    },
    methods: {
        async fetchUsers() {
            try {

               // const response = await axios.post(this.$chat_server_add + "/userlists" , {
                const response = await axios.post("http://localhost:3005/userlists" , {
                    currentUserId: this.decodedToken.id,
                });
                console.log("Users fetched:", response.data);
                this.users = response.data;

            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
        navigateToChat(recipientId, recipientName) {
            this.$router.push({
                name: "PrivateChat",
                params: { recipientId, recipientName }
            });
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
};
</script>

<style scoped>
ion-item {
    --padding-start: 16px;
    --inner-padding-end: 16px;
}
</style>
