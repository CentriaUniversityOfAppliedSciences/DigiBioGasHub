<template>
    <ion-page>
        <NavBarComponent/>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('chat.chatUsers') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item v-for="user in users" :key="user.id" button @click="navigateToChat(user.id, user.name)">
                    {{ user.name }}
                </ion-item>
            </ion-list>
        </ion-content>
        <FooterComponent/>
    </ion-page>
</template>

<script>
import axios from "axios";
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
        };
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.post("http://localhost:28765/getAllUsers");
                this.users = response.data.message;
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
    },
    created() {
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
