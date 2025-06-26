<template>
    <ion-card class="location-card">
      <ion-card-header>
        <ion-item>
          <ion-card-title class="center-icon">
            <ion-icon name="location"></ion-icon>
          </ion-card-title>
        </ion-item>
      </ion-card-header>
  
      <ion-card-content>
        <ion-list>
          <ion-item>
            <ion-label style="margin-right: 12px;">{{ $t('general.company') }}:</ion-label>
            <ion-input :value="location.name" type="text" readonly></ion-input>
          </ion-item>
          <ion-item>
            <ion-label style="margin-right: 12px;">{{ $t('general.address') }}:</ion-label>
            <ion-input v-model="editLocation.address" :readonly="!showEdit" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label style="margin-right: 12px;">{{ $t('general.city') }}:</ion-label>
            <ion-input v-model="editLocation.city" :readonly="!showEdit" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label style="margin-right: 12px;">{{ $t('general.postalCode') }}:</ion-label>
            <ion-input v-model="editLocation.zipcode" :readonly="!showEdit" type="text"></ion-input>
          </ion-item>
          <ion-item>
            <template v-if="showEdit">
              <ion-button @click="saveLocation" color="success">{{ $t('general.save') }}</ion-button>
              <ion-button @click="cancelEdit" color="medium">{{ $t('general.cancel') }}</ion-button>
            </template>
            <template v-else>
              <ion-button v-if="companyData.userlevel === '23'" @click="enableEdit" color="primary">
                {{ $t('menu.edit') }}
              </ion-button>
              <ion-button v-if="companyData.userlevel === '23' || companyData.userlevel === '99'"
                @click="confirmDelete" id="deleteCompany" color="danger">
                {{ $t('menu.delete') }}
              </ion-button>
            </template>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  </template>
  

<script>
import { IonPage, IonContent, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, alertController, IonIcon } from '@ionic/vue';
import { location } from 'ionicons/icons';
import { defineComponent } from 'vue';
import axios from 'axios';
import { jwtDecode } from "../router";
import { addIcons } from 'ionicons';
addIcons({
    location
});
export default defineComponent({
    name: 'CompanyLocationComponent',
    components: {
        IonPage,
        IonContent,
        IonToolbar,
        IonTitle,
        IonItem,
        IonLabel,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonButton,
        IonCard,
        IonIcon,
        IonCardContent,
        IonCardHeader,
        IonCardTitle,
        IonList,
        alertController

    },
    setup() {
        const token = localStorage.getItem('token');
        const decodedToken = token ? jwtDecode(token) : null;
        const userLevel = decodedToken?.userlevel || null;
        return {
            userLevel
        };
    },
    props: {
        location: {
            type: Object,
            required: true
        },
        companyData: {
            type: Object,
            required: true
        }
    },
    emits: ['locationDeleted'],
    data() {
        return {
            showEdit: false,
            editLocation: {
                address: this.location.address,
                city: this.location.city,
                zipcode: this.location.zipcode
            },
            alertButtons: [
                {
                    text: this.$t('general.cancel'),
                    role: 'cancel',
                    cssClass: 'secondary',
                },
                {
                    text: this.$t('general.yes'),
                    handler: () => {
                        this.deleteLocation();
                    },
                },
            ],
            alertController: alertController
        };
    },
    methods: {
        enableEdit() {
            this.editLocation = {
                address: this.location.address,
                city: this.location.city,
                zipcode: this.location.zipcode,
            };
            this.showEdit = true;
        },
        cancelEdit() {
            this.showEdit = false;
            this.editLocation = {
                address: this.location.address,
                city: this.location.city,
                zipcode: this.location.zipcode,
            };
        },
        saveLocation() {
            const url = this.$api_add + "/company/updatelocation";
            axios.post(url, {
                locationID: this.location.id,
                companyID: this.location.companyID,
                address: this.editLocation.address,
                city: this.editLocation.city,
                zipcode: this.editLocation.zipcode,
            }, {
                headers: { 'authorization': localStorage.getItem('token') },
            }).then((response) => {
                if (response.data.type === "result" && response.data.result === "ok") {
                    this.location.address = this.editLocation.address;
                    this.location.city = this.editLocation.city;
                    this.location.zipcode = this.editLocation.zipcode;
                    this.showEdit = false;
                }
            });
        },
        confirmDelete() {
            this.alertController
                .create({
                    header: this.$t('company.logistics.confirmDeleteTerminal'),
                    buttons: [
                        {
                            text: this.$t('general.cancel'),
                            role: 'cancel',
                            cssClass: 'secondary',
                        },
                        {
                            text: this.$t('general.yes'),
                            handler: () => {
                                this.deleteLocation();
                            },
                        },
                    ],
                })
                .then(alert => alert.present());
        },
        deleteLocation() {
            var url = this.$api_add + "/company/deletelocation";
            axios.post(url,
                {
                    locationID: this.location.id,
                    companyID: this.location.companyID,
                }, {
                headers: { 'authorization': localStorage.getItem('token') },
                withCredentials: false
            }).then((response) => {
                if (response.data.type == "result" && response.data.result == "ok") {
                    this.$emit('locationDeleted', this.location.id);
                }
            });
        },
    }
});

</script>
<style scoped>
.location-card {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}

.center-icon {
    margin: auto;
    font-size: 30px;
}
</style>
