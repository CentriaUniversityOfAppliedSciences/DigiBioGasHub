<template>
    <ion-page>
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