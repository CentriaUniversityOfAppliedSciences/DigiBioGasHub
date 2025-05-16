<template>
  <ion-page>
    <NavBarComponent />
    <ion-content class="ion-padding main-content">

      <ion-grid>
        <ion-row class="ion-justify-content-center" style="gap: 3rem; margin-bottom: 1rem;">
          <ion-col size="auto" class="ion-text-center">
            <div @click="selectedChat = 'group'" class="chat-option" :class="{ selected: selectedChat === 'group' }">
              <ion-icon name="people-outline" class="chat-icon"></ion-icon>
              <div class="chat-label">{{ $t('chat.groupChat') }}</div>
            </div>
          </ion-col>

          <ion-col size="auto" class="ion-text-center">
            <div @click="goToPrivateChat" class="chat-option" :class="{ selected: false }" >
              <ion-icon name="person-outline" class="chat-icon"></ion-icon>
              <div class="chat-label">{{ $t('chat.privateChat') }}</div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ChatRoomComponent />
    
    </ion-content>
    <FooterComponent />
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol, IonIcon } from "@ionic/vue";
import ChatRoomComponent from "../components/ChatRoomComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import NavBarComponent from "../components/NavBarComponent.vue";
import { defineComponent } from "vue";
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import { addIcons } from "ionicons";

addIcons({
    "people-outline": peopleCircleOutline,
    "person-outline": personCircleOutline,
});

export default defineComponent({
  name: "ChatPageView",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonButton,
    ChatRoomComponent,
    FooterComponent,
    NavBarComponent
  },
  data() {
    return {
      selectedChat: 'group',
    }
  },
  methods: {
    goToPrivateChat() {
      this.$router.push("/privatechat");
    },
  },
});
</script>

<style scoped>
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
.main-content {
  min-height: 75vh;
}
</style>
