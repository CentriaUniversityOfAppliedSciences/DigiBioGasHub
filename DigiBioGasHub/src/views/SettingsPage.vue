<template>
  <ion-page>
    <ion-content>
      <NavBarComponent />

      <ion-grid style="max-width: 90rem;">
        <ion-row>
          <ion-col size="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ $t("settings.filter") }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item @click="settings.filter.feedstock = !settings.filter.feedstock" button>
                    <ion-label>{{ $t("settings.feedstock") }}</ion-label>
                    <ion-checkbox slot="end" :checked="settings.filter.feedstock" />
                  </ion-item>
                  <ion-item @click="settings.filter.biogas = !settings.filter.biogas" button>
                    <ion-label>{{ $t("settings.biogas") }}</ion-label>
                    <ion-checkbox slot="end" :checked ="settings.filter.biogas" />
                  </ion-item>
                  <ion-item @click="settings.filter.logistics = !settings.filter.logistics" button>
                    <ion-label>{{ $t("settings.logistics") }}</ion-label>
                    <ion-checkbox slot="end" :checked="settings.filter.logistics" />
                  </ion-item>
                  <ion-item @click="settings.filter.digestate = !settings.filter.digestate" button>
                    <ion-label>{{ $t("settings.digestate") }}</ion-label>
                    <ion-checkbox slot="end" :checked="settings.filter.digestate" />
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ $t("settings.chat") }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item @click="settings.chat.chatVisibility = !settings.chat.chatVisibility" button>
                    <ion-label>{{ $t("settings.chatVisibility") }}</ion-label>
                    <ion-checkbox slot="end" :checked="settings.chat.chatVisibility" />
                  </ion-item>
                </ion-list>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

        <ion-row class="ion-padding-top">
          <ion-col size="12" class="ion-text-center">
            <ion-button @click="saveSettings" expand="block">
              {{ $t("menu.save") }}
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <FooterComponent />
  </ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue'
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import axios from 'axios';

export default defineComponent({
  name: 'SettingsPage',
  components: { IonPage, IonContent, NavBarComponent, FooterComponent, IonList, IonItem, IonLabel, IonCheckbox, IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent },
  data() {
    return {
      settings: {
        filter: {
          feedstock: false,
          biogas: false,
          logistics: false,
          digestate: false,
        },
        chat: {
          chatVisibility: false
        }
      }
    }
  },
  mounted() {
    this.getSettings();
  },
  methods: {
    getSettings() {
      var url = this.$api_add + "/getsettings";
      axios.post(url, {}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
        if (response.data.result == "ok" && response.data.message != null && response.data.message != undefined) {
          var data = response.data.message;

          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              var key = data[i].key;
              var value = data[i].value;
              this.settings[key] = value;
            }
          }
        }
      });
    },
    saveSettings() {
      var url = this.$api_add + "/updatesettings";
      axios.post(url, { "settings": this.settings }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
        if (response.data.result == "ok" && response.data.message != null && response.data.message != undefined) {

          var data = response.data.message;
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              var key = data[i].key;
              var value = data[i].value;
              this.settings[key] = value;
            }
          }
        }
      });
    }
  }
});

</script>
