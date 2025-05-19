<template>
    <ion-page>
        <NavBarComponent />
        
        <ion-button id="addCompany">Add company</ion-button>
        
        <ion-content >
            <ion-grid class="main-grid">
                <ion-row v-for="comp in companies">
                    <ion-col>
                        <CompanyComponent :company="comp" @companyDeleted="handleCompDeleted"  />
                    </ion-col>
                </ion-row>
                <!--
                <ion-row>
                    <ion-col size="12">
                        <agreement-component />
                    </ion-col>
                </ion-row>
                -->
            </ion-grid>
        
            
            <FooterComponent />
             <AddCompanyComponent />
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
            var url = this.$api_add + "/getusercompanies";
            axios.post(url,{"userID": this.getUserID() },{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                
                if (response.data.type="result"){
                    this.companies = response.data.message;
                    //TODO make current_company actually set according to user input
                    localStorage.setItem('current_company', response.data.result[0].id);
                }
            });
        },
        getUserID(){
            let token = localStorage.getItem('token');
            let decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded.id;
        },
        handleCompDeleted(){
            this.getCompanies();
        },
        
    },
    mounted() {
        this.getCompanies()
    },
})
</script>

<style scoped>
/* Optional styling */
.main-grid {
    min-height: 75vh;
}
</style>