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
                <ion-item v-for="company in filteredCompanies" :key="company.id" @click="openCompanyModal(company)"
                    style="cursor: pointer;">
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
                        <ion-button v-if="selectedCompany.companyStatus === 0"
                            @click="confirmAction('Verify', selectedCompany.id, 1)">Verify</ion-button>
                        <ion-button v-if="selectedCompany.companyStatus === 1"
                            @click="confirmAction('Unverify', selectedCompany.id, 0)">Unverify</ion-button>
                        <ion-button v-if="selectedCompany.companyStatus !== 2"
                            @click="confirmAction('Disable', selectedCompany.id, 2)">Disable</ion-button>
                        <ion-button expand="block" v-if="selectedCompany.companyStatus === 2"
                            @click="confirmAction('Verify', selectedCompany.id, 1)">Verify</ion-button>
                        <ion-button @click="editCompany(selectedCompany)">Edit</ion-button>
                        <ion-button color="danger"
                            @click="confirmAction('Delete', selectedCompany.id, null, true)">Delete</ion-button>
                    </ion-buttons>
                </div>
            </ion-content>
        </ion-modal>

        <ion-modal :is-open="isEditOpen" @didDismiss="isEditOpen = false">
            <ion-header>
                <ion-toolbar>
                    <ion-title>Edit Company</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="isEditOpen = false">Close</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-list>
                    <ion-item>
                        <ion-label position="stacked">Name</ion-label>
                        <ion-input v-model="editCompanyData.name"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Address</ion-label>
                        <ion-input v-model="editCompanyData.address"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">City</ion-label>
                        <ion-input v-model="editCompanyData.city"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Zipcode</ion-label>
                        <ion-input v-model="editCompanyData.zipcode"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Email</ion-label>
                        <ion-input v-model="editCompanyData.email"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Phone</ion-label>
                        <ion-input v-model="editCompanyData.phone"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">Website</ion-label>
                        <ion-input v-model="editCompanyData.web"></ion-input>
                    </ion-item>
                </ion-list>
                <ion-button expand="block" @click="saveCompanyChanges">Save Changes</ion-button>
            </ion-content>
        </ion-modal>

        <ToastComponent ref="toastComponent" />
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonList, IonItem, IonLabel, IonButtons, IonButton, IonModal, alertController, IonGrid, IonRow, IonCol, IonInput } from '@ionic/vue';
import axios from 'axios';
import ToastComponent from '../../components/ToastComponent.vue';

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
        IonInput,
        IonModal,
        IonGrid,
        IonRow,
        IonCol,
        ToastComponent
    },

    data() {
        return {
            companies: [],
            selectedSegment: 'verified',
            isReviewOpen: false,
            isEditOpen: false,
            selectedCompany: null,
            editCompanyData: {}
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
                const response = await axios.post("http://localhost:28765/admin/getallcompanies");
                this.companies = response.data.message;
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
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
                            } else {
                                this.updateCompanyStatus(id, status);
                            }
                        },
                    },
                ],
            });
            await alert.present();
        },

        async updateCompanyStatus(id, status) {
            try {
                const url = "http://localhost:28765/admin/updatecompanystatus";
                const response = await axios.post(url, { id, status }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                console.log(response);
                if (response.data.type = "result" && response.data.result == "ok") {
                    this.$refs.toastComponent.showToast('Company status updated successfully', 2000, 'success');
                    const companyIndex = this.companies.findIndex(c => c.id === id);

                    if (companyIndex !== -1) {
                        this.companies[companyIndex].companyStatus = status;
                    }

                    this.isReviewOpen = false;
                }
            } catch (error) {
                console.error('Error updating company status:', error);
            }
        },

        async deleteCompany(id) {
            try {
                const url = "http://localhost:28765/deletecompany";

                const response = await axios.delete(url, { data: { id: id }, headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                if (response.data.type = "result" && response.data.result == "ok") {
                    this.$refs.toastComponent.showToast('Company deleted successfully', 2000, 'success');
                    this.companies = this.companies.filter(company => company.id !== id);
                    this.isReviewOpen = false;
                }
            } catch (error) {
                console.error(error);
            }
        },

        editCompany(company) {
            this.editCompanyData = { ...company };
            this.isEditOpen = true;
        },

        async saveCompanyChanges() {
            try {
                const url = "http://localhost:28765/updatecompany";
                const response = await axios.post(url, this.editCompanyData, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                if (response.data.result === 'ok') {
                    this.$refs.toastComponent.showToast('Company updated successfully', 2000, 'success');
                    const index = this.companies.findIndex(c => c.id === this.editCompanyData.id);
                    if (index !== -1) {
                        this.companies[index] = { ...this.editCompanyData };
                    }
                    this.isEditOpen = false;
                    this.isReviewOpen = false;
                }
            } catch (error) {
                console.error('Error updating company:', error);
            }
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
