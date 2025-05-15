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
                <ion-button v-if="isAdmin" color="primary" @click="openUpdateModal(room)" class="ion-margin">
                  {{ $t('chat.admin.updateRoom') }}
                </ion-button>
                <ion-button v-if="isAdmin" color="danger" @click="confirmDelete(room.roomId)" class="ion-margin">
                  {{ $t('chat.admin.deleteRoom') }}
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-modal :is-open="showModal" @didDismiss="showModal = false">
        <ion-content class="ion-padding">
          <ion-header>
            <ion-toolbar>
              <ion-title>{{ $t('chat.admin.createRoomTitle') }}</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="showModal = false">
                  <ion-icon name="close-outline"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-item>
            <ion-label position="stacked">{{ $t('chat.admin.roomName') }}</ion-label>
            <ion-input v-model="newRoom.name" :placeholder="$t('chat.placeholders.enterRoomName')"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">{{ $t('chat.admin.roomDescription') }}</ion-label>
            <ion-textarea v-model="newRoom.description"
              :placeholder="$t('chat.placeholders.enterRoomDescription')"></ion-textarea>
          </ion-item>
          <ion-button expand="block" @click="createRoom">{{ $t('chat.admin.create') }}</ion-button>
        </ion-content>
      </ion-modal>

      <ion-modal :is-open="showUpdateModal" @didDismiss="showUpdateModal = false">
        <ion-content class="ion-padding">
          <ion-header>
            <ion-toolbar>
              <ion-title>{{ $t('chat.admin.updateRoomTitle') }}</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="showUpdateModal = false">
                  <ion-icon name="close-outline"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-item>
            <ion-label position="stacked">{{ $t('chat.admin.roomName') }}</ion-label>
            <ion-input v-model="editRoom.name" :placeholder="$t('chat.placeholders.enterRoomName')"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">{{ $t('chat.admin.roomDescription') }}</ion-label>
            <ion-textarea v-model="editRoom.description"
              :placeholder="$t('chat.placeholders.enterRoomDescription')"></ion-textarea>
          </ion-item>
          <ion-button expand="block" @click="updateRoom(roomId)" :disabled="!isRoomModified">{{ $t('chat.admin.saveChanges') }}</ion-button>
        </ion-content>
      </ion-modal>


      <ToastComponent ref="toastComponent" />
    </ion-content>

    <ion-alert :is-open="showDeleteAlert" :header="$t('chat.admin.deleteRoom')"
      :message="$t('chat.admin.deleteRoomConfirmation')" :buttons="[
        {
          text: $t('general.cancel'),
          role: 'cancel',
          handler: () => {
            showDeleteAlert = false;
          }
        },
        {
          text: $t('general.delete'),
          handler: () => {
            deleteRoom(roomId);
            showDeleteAlert = false;
          }
        }
        ]"></ion-alert>
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
  IonButtons,
  IonAlert,
  IonIcon,
} from "@ionic/vue";
import axios from "axios";
import { jwtDecode } from "../router";
import NavBarComponent from "./NavBarComponent.vue";
import ToastComponent from "./ToastComponent.vue";
import { disable } from "ol/rotationconstraint";

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
    IonButtons,
    IonButton,
    IonModal,
    IonAlert,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonImg,
    IonIcon,
    ToastComponent
  },
  data() {
    return {
      rooms: [],
      isAdmin: false,
      showModal: false,
      showUpdateModal: false,
      showDeleteAlert: false,
      newRoom: {
        name: "",
        description: "",
      },
      editRoom: {
        name: "",
        description: ""
      },
      originalRoom: {
        name: "",
        description: ""
      },
    };
  },

  computed: {
    isRoomModified() {
      return (
        this.editRoom.name !== this.originalRoom.name ||
        this.editRoom.description !== this.originalRoom.description
      );
    },
  },

  async mounted() {

    try {
      const token = localStorage.getItem("token");
      if (token) {
        this.isAdmin = jwtDecode(token).userlevel >= 22;
      }

      const response = await axios.get(this.$chat_server_add + "/rooms");
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
        const response = await axios.post(this.$chat_server_add + "/rooms", {
          name: this.newRoom.name,
          description: this.newRoom.description
        });
        if (response.status === 201) {
          this.rooms.push(response.data);
          this.showModal = false;
          this.newRoom = { name: '', description: '' };
          this.$refs.toastComponent.showToast(this.$t('chat.admin.roomCreated'), 2000, 'success');
        }
      } catch (error) {
        console.error("Failed to create room:", error);
        this.$refs.toastComponent.showToast(this.$t('chat.admin.roomCreationFailed'), 2000, 'danger');
      }
    },

    openUpdateModal(room) {
      this.editRoom = { name: room.name, description: room.description };
      this.originalRoom = { name: room.name, description: room.description };
      this.roomId = room.roomId;
      this.showUpdateModal = true;
    },

    // update room name and description
    async updateRoom(roomId) {
      try {
        const response = await axios.put(this.$chat_server_add + `/room/${roomId}`, {
          name: this.editRoom.name,
          description: this.editRoom.description
        });
        if (response.status === 200) {
          const index = this.rooms.findIndex(r => r.roomId === roomId);
          if (index !== -1) {
            this.rooms[index].name = this.editRoom.name;
            this.rooms[index].description = this.editRoom.description;
          }
          this.showUpdateModal = false;
          this.$refs.toastComponent.showToast(this.$t('chat.admin.roomUpdated'), 2000, 'success');
        }
      } catch (error) {
        console.error("Failed to update room:", error);
        this.$refs.toastComponent.showToast(this.$t('chat.admin.roomUpdateFailed'), 2000, 'danger');
      }
    },


    confirmDelete(roomId) {
      this.showDeleteAlert = true;
      this.roomId = roomId;
    },

    async deleteRoom(roomId) {
      try {
        console.log("Deleting room with ID:", roomId);
        const response = await axios.delete(this.$chat_server_add + `/room/${roomId}`);
        if (response.status === 200) {
          this.rooms = this.rooms.filter(room => room.roomId !== roomId);
          this.$refs.toastComponent.showToast(this.$t('chat.admin.roomDeleted'), 2000, 'success');
        }
      } catch (error) {
        console.error("Failed to delete room:", error);
        this.$refs.toastComponent.showToast(this.$t('chat.admin.roomDeletionFailed'), 2000, 'danger');
      }
    }
  }
};
</script>

<style scoped></style>
