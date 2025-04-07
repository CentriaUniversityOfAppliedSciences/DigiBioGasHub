<template>
    <ion-content>
      <ion-header>
        <ion-toolbar>
          <ion-title>Chat Rooms</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-grid>
        <ion-row>
          <ion-col
            size="12"
            size-md="6"
            size-lg="4"
            v-for="room in rooms"
            :key="room._id"
          >
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ room.name }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <p>{{ room.description }}</p>
                <ion-button expand="block" @click="joinRoom(room.roomId, room.name)">
                  Join
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </template>
  
  <script>
  import {
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
  } from "@ionic/vue";
  import axios from "axios";
  
  export default {
    name: "ChatRoomComponent",
    components: {
      IonContent,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonGrid,
      IonRow,
      IonCol,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent,
      IonButton,
    },
    data() {
      return {
        rooms: [],
      };
    },
    async created() {
      try {
        const response = await axios.get("http://localhost:3005/rooms");
        this.rooms = response.data;
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    },
    methods: {
      joinRoom(roomId, roomTitle) {
        window.location.href = `/chat/${roomId}/${roomTitle}`;
      },
    },
  };
  </script>
  
  <style scoped>

  </style>
