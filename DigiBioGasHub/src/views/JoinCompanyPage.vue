<template>
    <ion-page>
      <NavBarComponent />
        <div class="join-company-page">
        <JoinCompanyInvitationComponent />
        </div>
      <FooterComponent />
    </ion-page>
  </template>
  
  <script>
import NavBarComponent from "../components/NavBarComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import JoinCompanyInvitationComponent from "../components/JoinCompanyInvitationComponent.vue";
import { defineComponent } from "vue";
import { IonPage } from "@ionic/vue";
  
  export default defineComponent({
    name: "JoinCompanyPage",
    components: {
      IonPage,
      NavBarComponent,
      FooterComponent,
      JoinCompanyInvitationComponent,
    },
  });
  </script>
  
  <style scoped>
.join-company-page {
    height: 100vh;
}

  </style>
