<template>
    <ion-card class="location-card">
        <ion-card-header>
            <ion-item>
                <ion-card-title class="center-icon"><ion-icon name="location"></ion-icon></ion-card-title>
            </ion-item>
        </ion-card-header>
        <ion-card-content>
            <ion-list>
                <ion-item>
                    <ion-label style="margin-right: 12px;">{{ $t('general.company') }}:</ion-label>
                    <ion-input v-model="location.name" type="text" readonly></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label style="margin-right: 12px;">{{ $t('general.address') }}:</ion-label>
                    <ion-input v-model="location.address" type="text" readonly></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label style="margin-right: 12px;">{{ $t('general.city') }}:</ion-label>
                    <ion-input v-model="location.city" type="text" readonly></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label style="margin-right: 12px;">{{ $t('general.postalCode') }}:</ion-label>
                    <ion-input v-model="location.zipcode" type="text" readonly></ion-input>
                </ion-item>
                <ion-item>
                    <ion-button v-if="companyData.userlevel === '23' || companyData.userlevel === '99'"
                        @click="confirmDelete()" id="deleteCompany" color="danger">{{ $t('menu.delete') }}</ion-button>
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
