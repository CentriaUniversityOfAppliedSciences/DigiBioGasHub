<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="3" class="sidebar">
                        <ion-list>
                            <ion-item>
                                <ion-title>{{ $t("general.companies") }}</ion-title>
                            </ion-item>
                            <ion-item>
                                <ion-button expand="block" fill="solid" shape="round" color="primary"
                                    @click="toggleAddCompany(true)">
                                    <ion-icon name="add-outline"></ion-icon>
                                    {{ $t("general.add_company") }}
                                </ion-button>
                            </ion-item>
                            <ion-item button :class="{ active: selectedSegment === 'verified' }"
                                @click="selectedSegment = 'verified'">
                                <ion-icon name="checkmark-circle" slot="start" color="success"></ion-icon>
                                {{ $t("admin.company.verified") }}
                            </ion-item>
                            <ion-item button :class="{ active: selectedSegment === 'unverified' }"
                                @click="selectedSegment = 'unverified'">
                                <ion-icon name="alert-circle-outline" slot="start" color="warning"></ion-icon>
                                {{ $t("admin.company.unverified") }}
                            </ion-item>
                            <ion-item button :class="{ active: selectedSegment === 'not verified' }"
                                @click="selectedSegment = 'not verified'">
                                <ion-icon name="eye-off-outline" slot="start"></ion-icon>
                                {{ $t("admin.company.notVerified") }}
                            </ion-item>
                        </ion-list>
                    </ion-col>

                    <ion-col size="9" class="content-area">
                        <ion-searchbar v-model="searchQuery" :placeholder="$t('general.search')"
                            class="custom-searchbar" show-clear-button="always" />


                        <div v-if="selectedSegment === 'unverified' && filteredCompanies.length > 0"
                            class="approval-note">
                            {{ $t("company.waiting_approval") }}
                        </div>
                        <div v-if="selectedSegment === 'not verified' && filteredCompanies.length > 0"
                            class="approval-note">
                            {{ $t("company.rejected") }}
                        </div>
                        <ion-grid class="main-grid">
                            <ion-row v-if="filteredCompanies.length > 0" v-for="comp in filteredCompanies"
                                :key="comp.Company.id">
                                <ion-col>
                                    <div
                                        :class="['company-card', selectedSegment === 'unverified' ? 'unverified-card' : '']">
                                        <CompanyComponent :company="comp.Company" @companyDeleted="handleCompDeleted"
                                            :companyData="comp" @companyUpdated="updateCompanyInList" />
                                    </div>
                                </ion-col>
                            </ion-row>
                            <ion-row v-else>
                                <ion-col>
                                    <p v-if="selectedSegment === 'unverified' || selectedSegment === 'verified'">{{
                                        $t("company.noCompanies") }}</p>
                                    <p v-else>{{ $t("company.noRejectedCompanies") }}</p>
                                </ion-col>
                            </ion-row>
                        </ion-grid>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <AddCompanyComponent @companyAdded="refreshList" v-model:visible="showAddCompany" />
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
import { addIcons } from 'ionicons'
import { addOutline, alertCircleOutline, checkmarkCircle, eyeOffOutline } from 'ionicons/icons'
addIcons({ addOutline, checkmarkCircle, alertCircleOutline, eyeOffOutline })

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
                (this.selectedSegment === 'verified' && c.Company.companyStatus === 1) ||
                (this.selectedSegment === 'unverified' && c.Company.companyStatus === 0) ||
                (this.selectedSegment === 'not verified' && c.Company.companyStatus === 2)
            );
        },
    },
    methods: {
        getCompanies() {
            var url = this.$api_add + "/getusercompanies";
            axios.post(url, { "userID": this.getUserID() }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                if (response.data.type = "result") {
                    this.companies = response.data.message;
                }
            });
        },
        getUserID() {
            let token = localStorage.getItem('token');
            let decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded.id;
        },
        handleCompDeleted() {
            this.getCompanies();
        },

        updateCompanyInList(updatedCompany) {
            updatedCompany.companyStatus = 0;
            const index = this.companies.findIndex(c => c.id === updatedCompany.id);
            if (index !== -1) {
                this.companies.splice(index, 1, updatedCompany);
            }
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
.sidebar {
    position: sticky;
    top: 0;
    height: calc(100vh - 206px);
    border-right: 1px solid #dddddd;
}

.content-area {
    padding-left: 1em;
}

.sidebar .active {
    font-weight: bold;
    background: #e0e0e0;
    border-radius: 8px;
}

.custom-searchbar {
    max-width: 480px;
    border-radius: 20px;
    --box-shadow: none;
    padding: 2px 6px;
    border: 1px solid #ada6a6;
    margin: 1em 0;
}

.main-grid {
    min-height: 75vh;
    display: grid;
    gap: 16px;
    margin: 1rem;
    grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 1280px) {
    .main-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 780px) {
    .main-grid {
        grid-template-columns: repeat(1, 1fr);
    }
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
