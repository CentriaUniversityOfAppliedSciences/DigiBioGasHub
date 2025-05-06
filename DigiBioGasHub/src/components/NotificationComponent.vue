<template>
    <div>
        <ion-button fill="clear" @click="openNotifications">
            <ion-icon name="notifications-outline"></ion-icon>
            <div v-if="notificationCount > 0" class="notification-badge">
                {{ notificationCount }}
            </div>
        </ion-button>

        <ion-modal :is-open="isModalOpen" @didDismiss="closeNotifications">
            <ion-header>
                <ion-toolbar>
                    <ion-title>Notifications</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="closeNotifications">Close</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-list>
                    <ion-item v-for="(notification, index) in notifications" :key="index">
                        <a :href="generateLink(notification)" class="notification-link">
                            <div>
                                <strong>{{ notification.senderName }}</strong>
                                <p>{{ notification.message }}</p>
                                <small>{{ formatTimestamp(notification.timestamp) }}</small>
                            </div>
                        </a>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-modal>
    </div>
</template>

<script>
import { defineComponent } from "vue";
import socket from "../socket";
import { jwtDecode } from "../router";
import {
    IonButton,
    IonIcon,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonContent,
    IonList,
    IonItem,
} from "@ionic/vue";
import { notificationsOutline } from "ionicons/icons";
import { addIcons } from "ionicons";

addIcons({
    "notifications-outline": notificationsOutline,
});

export default defineComponent({
    name: "NotificationComponent",
    components: {
        IonButton,
        IonIcon,
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonContent,
        IonList,
        IonItem,
    },
    data() {
        return {
            notifications: [],
            notificationCount: 0,
            isModalOpen: false,
            socket: null,
        };
    },
    methods: {
        openNotifications() {
            this.isModalOpen = true;
            this.notificationCount = 0;
        },
        closeNotifications() {
            this.isModalOpen = false;
        },
        connectSocket() {
            const token = localStorage.getItem("token");

            if (!token) {
                console.warn("User is not logged in!!");
                return;
            }
            this.decodedToken = jwtDecode(token);

            const senderId = this.decodedToken.id;

            socket.emit("register", senderId);
            socket.on("privateNotification", (notification) => {
                this.notifications.unshift(notification);
                if (this.notifications.length > 50) {
                    this.notifications = this.notifications.slice(0, 50);
                }
                this.notificationCount++;
            });
        },
        generateLink(notification) {
            return `/privatechat/${notification.senderId}/${encodeURIComponent(
                notification.senderName
            )}`;
        },
        formatTimestamp(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleString();
        },
    },
    mounted() {
        console.log("NotificationComponent mounted");
        this.connectSocket();
    },
});
</script>

<style scoped>
.notification-badge {
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}

.notification-link {
    text-decoration: none;
    color: inherit;
    display: block;
    width: 100%;
}

.notification-link div {
    display: flex;
    flex-direction: column;
    padding: 5px 0;
}

.notification-link strong {
    font-size: 14px;
    padding: 5px 0;
}

.notification-link p {
    margin: 0;
    font-size: 20px;
    padding: 5px 0;
}

.notification-link small {
    font-size: 10px;
    padding: 5px 0;
}
</style>
