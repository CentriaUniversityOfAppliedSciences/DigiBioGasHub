<template>
    <ion-page>
        <NavBarComponent />
        <ion-toolbar>
            <ion-row style=" display: flex; align-items: center; justify-content: space-between; padding: 16px;">
                <ion-col size="auto">
                    <h2>{{ $t("general.companies") }}</h2>
                </ion-col>
                <ion-col size="auto">
                    <ion-button fill="solid" shape="round" color="primary" @click="showAddCompany = true">
                        {{ $t("general.add_company") }}
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-toolbar>

        <ion-content>
            <ion-segment v-model="selectedSegment" class="custom-segment">
                <ion-segment-button value="verified">
                    {{ $t("admin.company.verified") }}
                </ion-segment-button>
                <ion-segment-button value="unverified">
                    {{ $t("admin.company.unverified") }}
                </ion-segment-button>
                <ion-segment-button value="not verified">
                    {{ $t("admin.company.notVerified") }}
                </ion-segment-button>
            </ion-segment>
            <div v-if="selectedSegment === 'unverified' && filteredCompanies.length > 0 " class="approval-note">
                {{ $t("company.waiting_approval") }}
            </div>
            <div v-if="selectedSegment === 'not verified' && filteredCompanies.length > 0 " class="approval-note">
                {{ $t("company.rejected") }}
            </div>

            <ion-grid class="main-grid">
                <ion-row v-if="filteredCompanies.length > 0" v-for="comp in filteredCompanies" :key="comp.id">
                    <ion-col>
                        <div :class="['company-card', selectedSegment === 'unverified' ? 'unverified-card' : '']">
                            <CompanyComponent :company="comp" @companyDeleted="handleCompDeleted" />
                        </div>
                    </ion-col>
                </ion-row>
                <ion-row v-else>
                    <ion-col>
                        <p v-if="selectedSegment === 'unverified' || selectedSegment === 'verified'">{{ $t("company.noCompanies") }}</p>
                        <p v-else>{{ $t("company.noRejectedCompanies") }}</p>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <AddCompanyComponent v-model:visible="showAddCompany" />
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
    IonCol,
    IonSegment,
    IonSegmentButton
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
        IonCol,
        IonSegment,
        IonSegmentButton
    },
    data() {
        return {
            companies: [],
            showAddCompany: false,
            selectedSegment: 'verified',
            selectedCompany: null
        }
    },
    computed: {
        filteredCompanies() {
            return this.companies.filter(c =>
                (this.selectedSegment === 'verified' && c.companyStatus === 1) ||
                (this.selectedSegment === 'unverified' && c.companyStatus === 0) ||
                (this.selectedSegment === 'not verified' && c.companyStatus === 2)
            );
        },
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

.custom-segment {
  margin: 16px;
  --background: var(--ion-color-light);
  --indicator-color: var(--ion-color-primary);
  border-radius: 12px;
}

.company-card {
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 16px;
  transition: transform 0.2s ease;
}

.company-card:hover {
  transform: translateY(-2px);
}

.unverified-card {
  border-left: 4px solid #ffc107;
}

.approval-note {
  margin: 1rem auto;
  margin-bottom: 2rem;
  max-width: 35rem;
  padding: 1rem;
  border-radius: 12px;
  color: var(--color);
  background-color: transparent;
  text-align: center;
  border: 2px solid var(--ion-color-warning);
}
</style>
