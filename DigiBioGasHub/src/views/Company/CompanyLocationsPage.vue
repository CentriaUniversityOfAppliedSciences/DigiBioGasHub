<template>
    <ion-page>
        <NavBarComponent />
        <ion-toolbar>
            <ion-row style="align-items: center; justify-content: space-between; padding: 16px;">
                <ion-col size="auto">
                    <h2>Locations</h2>
                </ion-col>
                <ion-col size="auto">
                    <ion-button @click="add_location">Add Location</ion-button>
                </ion-col>
            </ion-row>
        </ion-toolbar>

        <ion-content>
            <ion-grid class="main-grid">
                <ion-row v-for="loc in locations">
                    <ion-col>
                        <CompanyLocationComponent :companyData="companyData" :location="loc"
                            @locationDeleted="updateLocations" />
                    </ion-col>
                </ion-row>
            </ion-grid>
            <FooterComponent />
        </ion-content>

    </ion-page>
</template>
<script>
import { defineComponent } from 'vue'
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonModal,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/vue'
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import axios from 'axios';
import CompanyLocationComponent from '../../components/CompanyLocationComponent.vue';

export default defineComponent({
    name: 'CompanyLocationsPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButton,
        IonModal,
        IonGrid,
        IonRow,
        IonCol,
        NavBarComponent,
        FooterComponent,
        CompanyLocationComponent
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getLocations();
        });
    },
    data() {
        return {
            locations: [],
            thisCompany: this.$route.query.companyID,
            companyName: this.$route.query.companyName,
            companyData: {},
        }
    },
    methods: {
        getLocations() {
            var url = this.$api_add + "/company/getlocations/by-company";
            axios.post(url, { "companyID": this.thisCompany }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                if (response.data.type = "result" && response.data.result == "ok" && response.data.message.length > 0) {
                    this.locations = response.data.message;

                }
            });
        },
        getUserCompData() {
            var url = this.$api_add + "/company/getusercompanydata";
            axios.post(url, { "companyID": this.thisCompany }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                if (response.data.type = "result" && response.data.result == "ok") {
                    this.companyData = response.data.message;
                }
            });
        },
        add_location() {
            this.$router.push({
                path: '/companylocationregister',
                query: {
                    companyID: this.thisCompany,
                    companyName: this.companyName,
                },
            });
        },
        updateLocations() {
            this.getLocations();
        }

    },
    mounted() {
        this.getLocations();
        this.getUserCompData();
    }

});
</script>
<style scoped>
.main-grid {
    min-height: 75vh;
    display: grid;
    gap: 16px;
    margin: 1rem;
    grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 480px) {
    .main-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 768px) {
    .main-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 1024px) {
    .main-grid {
        grid-template-columns: repeat(5, 1fr);
    }
}
</style>
