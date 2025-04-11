<template>
  <IonPage>
  <NavBarComponent />
  <ion-content>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('chat.chatRooms') }}</ion-title>
        <ion-button v-if="isAdmin" slot="end" @click="showModal = true">
          {{ $t('chat.admin.createRoom') }}
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-grid>
      <ion-row>
        <ion-col size="12" size-md="6" size-lg="4" v-for="room in rooms" :key="room._id">
          <ion-card class="ion-margin">
            <ion-card-content>
              <ion-img :src="room.image" alt="Room Image"></ion-img>
              <ion-card-title>{{ room.name }}</ion-card-title>
              <p>{{ room.description }}</p>
              <ion-button expand="block" @click="joinRoom(room.roomId, room.name)">
                {{ $t('chat.join') }}
              </ion-button>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-modal :is-open="showModal" @did-dismiss="showModal = false">
      <ion-content class="ion-padding">
        <ion-header>
          <ion-toolbar>
            <ion-title>{{ $t('chat.admin.createRoomTitle') }}</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-item>
          <ion-label position="stacked">{{ $t('chat.admin.roomName') }}</ion-label>
          <ion-input v-model="newRoom.name" :placeholder="$t('chat.placeholders.enterRoomName')"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">{{ $t('chat.admin.roomDescription') }}</ion-label>
          <ion-textarea v-model="newRoom.description" :placeholder="$t('chat.placeholders.enterRoomDescription')"></ion-textarea>
        </ion-item>
        <ion-button expand="block" @click="createRoom">{{ $t('chat.admin.create') }}</ion-button>
      </ion-content>
    </ion-modal>


  </ion-content>
</IonPage>
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
    IonModal,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonImg,
    IonPage,
  } from "@ionic/vue";
  import axios from "axios";
import { jwtDecode } from "../router";
import NavBarComponent from "./NavBarComponent.vue";
  
  export default {
    name: "ChatRoomComponent",
    components: {
      IonPage,
      IonContent,
      NavBarComponent,
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
      IonModal,
      IonItem,
      IonLabel,
      IonInput,
      IonTextarea,
      IonImg,
    },
    data() {
      return {
        rooms: [],
        isAdmin: false,
        showModal: false,
        newRoom: {
          name: "",
          description: "",
        }
      };
    },
    async mounted() {

      try {
        const token = localStorage.getItem("token");
        if(token){
          this.isAdmin = jwtDecode(token).userlevel >= 22;
        }

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

      async createRoom() {
        try {
          const response = await axios.post("http://localhost:3005/rooms", {
            name: this.newRoom.name,
            description: this.newRoom.description
          });

          this.rooms.push(response.data); 
          this.showModal = false; 
          this.newRoom = { name: '', description: '' }; 
        } catch (error) {
          console.error("Failed to create room:", error);
        }
      }
    },
  };
  </script>
  
  <style scoped>

  </style>
