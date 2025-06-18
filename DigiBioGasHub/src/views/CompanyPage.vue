<template>
    <ion-page>
        <NavBarComponent />
        <ion-toolbar>
            <ion-row style="align-items: center; justify-content: space-between; padding: 16px;">
                <ion-col size="auto">
                    <h2>{{ $t("general.companies") }}</h2>
                </ion-col>
                <ion-col size="auto">
                    <ion-button @click="toggleAddCompany(true)">{{ $t("general.add_company") }}</ion-button>
                </ion-col>
            </ion-row>
        </ion-toolbar>
        <ion-content>
            <ion-grid class="main-grid">
                <ion-row v-for="comp in companies">
                    <ion-col>
                        <CompanyComponent :company="comp.Company" @companyDeleted="handleCompDeleted" :companyData="comp"  />
                    </ion-col>
                </ion-row>
            </ion-grid>
             <AddCompanyComponent @companyAdded="refreshList" v-model:visible="showAddCompany" />
             
        </ion-content>
        <FooterComponent />
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
            companies: [],
            showAddCompany: false
        }
    },
    methods: {
        getCompanies() {
            var url = this.$api_add + "/getusercompanies";
            axios.post(url,{"userID": this.getUserID() },{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type="result"){
                    this.companies = response.data.message;
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
        refreshList() {
            this.showAddCompany = false;
            this.getCompanies();
        },
        toggleAddCompany(value) {
            this.showAddCompany = value;
        }
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