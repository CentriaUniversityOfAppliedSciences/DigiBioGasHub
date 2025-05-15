<template>
    <ion-list>
      <ion-item
        v-for="user in users" :key="user.id" button @click="navigateToChat(user.id, user.name)" style="margin-bottom: 1rem;">
        <ion-label class="ion-text-wrap">
          <h2>{{ user.name }}</h2>
          <p style="font-size: 1.3rem; padding: 0.5rem 0;" v-if="user.latestMessage">{{ user.latestMessage }} <small style="margin-left: 10px;" v-if="user.timestamp">{{ formatTime(user.timestamp) }}</small></p>
        </ion-label>
      </ion-item>
    </ion-list>
  </template>

<script>
import axios from "axios";
import { jwtDecode } from "../router";
import {  IonList, IonItem, IonLabel } from "@ionic/vue";

export default {
    name: "ChatUserList",
    components: {
        IonList,
        IonItem,
        IonLabel    
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
