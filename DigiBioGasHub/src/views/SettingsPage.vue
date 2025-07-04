<template>
  <ion-page>
    <ion-content>
      <NavBarComponent />

      <ion-grid style="max-width: 90rem;">
        <ion-row>
          <ion-col size="12">
            <ion-card>
              <ion-card-header>
                <ion-card-title>{{ $t("settings.marketplaceFilters.filter") }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item @click="settings.filter.straw = !settings.filter.straw" button>
                    <ion-label>{{ $t("settings.marketplaceFilters.straw") }}</ion-label>
                    <ion-checkbox slot="end" :checked="settings.filter.straw" />
                  </ion-item>
                  <ion-item @click="settings.filter.dungsolid = !settings.filter.dungsolid" button>
                    <ion-label>{{ $t("settings.marketplaceFilters.dungSolid") }}</ion-label>
                    <ion-checkbox slot="end" :checked="settings.filter.dungsolid" />
                  </ion-item>
                  <ion-item @click="settings.filter.dungliquid = !settings.filter.dungliquid" button>
                    <ion-label>{{ $t("settings.marketplaceFilters.dungLiquid") }}</ion-label>
                    <ion-checkbox slot="end" :checked="settings.filter.dungliquid" />
                  </ion-item>
                  <ion-item @click="settings.filter.compressedbiogas = !settings.filter.compressedbiogas" button>
                    <ion-label>{{ $t("settings.marketplaceFilters.compressedBiogas") }}</ion-label>
                    <ion-checkbox slot="end" :checked="settings.filter.compressedbiogas" />
                  </ion-item>
                  <ion-item @click="settings.filter.liquidbiogas = !settings.filter.liquidbiogas" button>
                    <ion-label>{{ $t("settings.marketplaceFilters.liquidBiogas") }}</ion-label>
                    <ion-checkbox slot="end" :checked="settings.filter.liquidbiogas" />
                  </ion-item>
                  <ion-item @click="settings.filter.feedstock = !settings.filter.feedstock" button>
                    <ion-label>{{ $t("settings.marketplaceFilters.feedstock") }}</ion-label>
                    <ion-checkbox slot="end" :checked="settings.filter.feedstock" />
                  </ion-item>
                  <ion-item @click="settings.filter.digestate = !settings.filter.digestate" button>
                    <ion-label>{{ $t("settings.marketplaceFilters.digestate") }}</ion-label>
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
                <ion-card-title>{{ $t("settings.mapFilters.map") }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item @click="settings.map.company = !settings.map.company" button>
                    <ion-label>{{ $t("settings.mapFilters.company") }}</ion-label>
                    <ion-checkbox slot="end" :checked="settings.map.company" />
                  </ion-item>
                  <ion-item @click="settings.map.terminals = !settings.map.terminals" button>
                    <ion-label>{{ $t("settings.mapFilters.terminals") }}</ion-label>
                    <ion-checkbox slot="end" :checked="settings.map.terminals" />
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
                <ion-card-title>{{ $t("settings.chatSettings.chatTitle") }}</ion-card-title>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item @click="settings.chat.chatVisibility = !settings.chat.chatVisibility" button>
                    <ion-label>{{ $t("settings.chatSettings.chatVisibility") }}</ion-label>
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
      <FooterComponent />
    </ion-content>
    
    <ToastComponent ref="toastComponent" />

  </ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue'
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import axios from 'axios';
import ToastComponent from '../components/ToastComponent.vue';

export default defineComponent({
  name: 'SettingsPage',
  components: { IonPage, IonContent, NavBarComponent, FooterComponent, IonList, IonItem, IonLabel, IonCheckbox, IonGrid, IonRow, IonCol, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, ToastComponent },
  data() {
    return {
      settings: {
        filter: {
          straw: false,
          dungsolid: false,
          dungliquid: false,
          compressedbiogas: false,
          liquidbiogas: false,
          feedstock: false,
          biogas: false,
          logistics: false,
          digestate: false,
        },
        map: {
          company: false,
          terminals: false,
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
          this.$refs.toastComponent.showToast(this.$t("settings.settingsSaved"), 2000, 'success');
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
