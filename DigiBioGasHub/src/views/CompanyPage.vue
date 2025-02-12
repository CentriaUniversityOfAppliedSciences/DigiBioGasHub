<template>
    <ion-page>
        <nav-bar-component />
        
            <ion-button id="addCompany">Add company</ion-button>
        
        <ion-content >
            <ion-grid>
                <ion-row v-for="comp in companies">
                    <ion-col>
                        <CompanyComponent :company="comp" />
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <ion-content>
            <agreement-component />
        </ion-content>
        <ion-modal trigger="addCompany">
            <AddCompanyComponent />
        </ion-modal>
        <footer-component />
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
import NavBarComponent from '../components/NavBarComponent.vue';
import CompanyComponent from '../components/CompanyComponent.vue';
import AgreementComponent from '../components/AgreementComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import AddCompanyComponent from '../components/AddCompanyComponent.vue';
import axios from 'axios';

export default defineComponent({
    name: 'CompanyPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        CompanyComponent,
        FooterComponent,
        NavBarComponent,
        AgreementComponent,
        AddCompanyComponent,
        IonButton,
        IonModal,
        IonGrid,
        IonRow,
        IonCol
    },
    data() {
        return {
            companies: []
        }
    },
    methods: {
        getCompanies() {
            var url = "http://localhost:28765/getusercompanies";
            axios.post(url,[],{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                console.log(response);
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    this.companies = response.data.message;
                    //TODO make current_company actually set according to user input
                    localStorage.setItem('current_company', response.data.message[0].id);
                }
            });
        }
    },
    mounted() {
        this.getCompanies()
    },
})
</script>

<style scoped>
/* Optional styling */
</style>