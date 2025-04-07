<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Chat Rooms</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ChatRoomComponent />
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";
  import ChatRoomComponent from "../components/ChatRoomComponent.vue";
  
  export default {
    name: "ChatRoomView",
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      ChatRoomComponent,
    },
  };
  </script>
  
  <style scoped>
 
  </style>