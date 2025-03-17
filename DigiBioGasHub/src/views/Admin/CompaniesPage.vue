<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Company Management</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-segment v-model="selectedSegment">
                <ion-segment-button value="verified">Verified</ion-segment-button>
                <ion-segment-button value="unverified">Unverified</ion-segment-button>
                <ion-segment-button value="disabled">Disabled</ion-segment-button>
            </ion-segment>

            <ion-list>
                <ion-item v-for="company in filteredCompanies" :key="company.id" @click="openCompanyModal(company)" style="cursor: pointer;">
                    <ion-label>
                        <h2>{{ company.name }}</h2>
                        <p>{{ company.city }}</p>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>

        <ion-modal :is-open="isReviewOpen" @didDismiss="isReviewOpen = false">
            <ion-header>
                <ion-toolbar>
                    <ion-title>Company Details</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="isReviewOpen = false">Close</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <div v-if="selectedCompany">
                    <h2>{{ selectedCompany.name }}</h2>
                    <ion-grid>
                        <ion-row>
                            <ion-col size="4"><strong>Address:</strong></ion-col>
                            <ion-col size="8">{{ selectedCompany.address }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>City:</strong></ion-col>
                            <ion-col size="8">{{ selectedCompany.city }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>Zipcode:</strong></ion-col>
                            <ion-col size="8">{{ selectedCompany.zipcode }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>Email:</strong></ion-col>
                            <ion-col size="8">{{ selectedCompany.email }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>Phone:</strong></ion-col>
                            <ion-col size="8">{{ selectedCompany.phone }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>Website:</strong></ion-col>
                            <ion-col size="8">
                                <a :href="selectedCompany.web" target="_blank">{{ selectedCompany.web }}</a>
                            </ion-col>
                        </ion-row>
                    </ion-grid>

                    <ion-buttons>
                        <ion-button v-if="selectedCompany.companyStatus === 0" @click="confirmAction('Verify', selectedCompany.id, 1)">Verify</ion-button>
                        <ion-button v-if="selectedCompany.companyStatus === 1" @click="confirmAction('Unverify', selectedCompany.id, 0)">Unverify</ion-button>
                        <ion-button v-if="selectedCompany.companyStatus !== 2" @click="confirmAction('Disable', selectedCompany.id, 2)">Disable</ion-button>
                        <ion-button expand="block" v-if="selectedCompany.companyStatus === 2" @click="confirmAction('Verify', selectedCompany.id, 1)">Verify</ion-button>
                        <ion-button @click="editCompany(selectedCompany)">Edit</ion-button>
                        <ion-button color="danger" @click="confirmAction('Delete', selectedCompany.id, null, true)">Delete</ion-button>
                    </ion-buttons>
                </div>
            </ion-content>
        </ion-modal>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonList, IonItem, IonLabel, IonButtons, IonButton, IonModal, alertController, IonText, IonGrid, IonRow, IonCol } from '@ionic/vue';
import axios from 'axios';

export default {
    components: { 
        IonPage, 
        IonHeader, 
        IonToolbar, 
        IonTitle, 
        IonContent,
        IonSegment, 
        IonSegmentButton, 
        IonList, 
        IonItem, 
        IonLabel, 
        IonButtons, 
        IonButton, 
        IonModal, 
        IonGrid, 
        IonRow, 
        IonCol 
    },

    data() {
        return {
            companies: [],
            selectedSegment: 'verified',
            isReviewOpen: false,
            selectedCompany: null
        };
    },
    computed: {
        filteredCompanies() {
            return this.companies.filter(c =>
                (this.selectedSegment === 'verified' && c.companyStatus === 1) ||
                (this.selectedSegment === 'unverified' && c.companyStatus === 0) ||
                (this.selectedSegment === 'disabled' && c.companyStatus === 2)
            );
        }
    },

    methods: {
        async fetchCompanies() {
            try {
                const response = await axios.post('http://localhost:28765/admin/getallcompanies');
                this.companies = response.data.message;
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        },

        async updateCompanyStatus(id, status) {
           //logic to update company
        },

        async deleteCompany() {
            //logic to delete company
        },

        async confirmAction(action, id, status = null, isDelete = false) {
            const alert = await alertController.create({
                header: 'Confirm Action',
                message: `Are you sure you want to ${action.toLowerCase()} this company?`,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                    },
                    {
                        text: 'Confirm',
                        handler: () => {
                            if (isDelete) {
                                this.deleteCompany(id);
                                this.isReviewOpen = false;
                            } else {
                                this.updateCompanyStatus(id, status);
                                if (action === 'Verify' || action === 'Unverify' || action === 'Disable') {
                                    this.isReviewOpen = false;
                                }
                            }
                        },
                    },
                ],
            });
            await alert.present();
        },

        editCompany(company) {
            console.log('Edit company', company);
            //logic to edit company
            
        },

        openCompanyModal(company) {
            this.selectedCompany = company;
            this.isReviewOpen = true;
        }
    },

    mounted() {
        this.fetchCompanies();
    }
};
</script>
