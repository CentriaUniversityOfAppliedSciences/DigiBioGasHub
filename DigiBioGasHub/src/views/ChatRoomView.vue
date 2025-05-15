<template>
    <ion-page>
        <NavBarComponent />
      <ion-content>
        <ChatRoomComponent />
        <FooterComponent />
      </ion-content>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";
  import ChatRoomComponent from "../components/ChatRoomComponent.vue";
  import FooterComponent from "../components/FooterComponent.vue";
  import NavBarComponent from "../components/NavBarComponent.vue";
  export default {
    name: "ChatRoomView",
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      ChatRoomComponent,
      FooterComponent,
      NavBarComponent
    },
  };
  </script>
  
  <style scoped>
 
  </style>