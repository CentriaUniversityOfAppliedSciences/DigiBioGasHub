<template>
    <ion-page>
        <ion-header>
            <NavBarComponent />
            <ion-toolbar>
                <ion-title>{{ $t('admin.company.title') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-segment v-model="selectedSegment">
                <ion-segment-button value="verified">{{ $t('admin.company.verified') }}</ion-segment-button>
                <ion-segment-button value="unverified">{{ $t('admin.company.unverified') }}</ion-segment-button>
                <ion-segment-button value="disabled">{{ $t('admin.company.disabled') }}</ion-segment-button>
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
                    <ion-title>{{ $t('admin.company.detailstitle') }}</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="isReviewOpen = false">{{ $t('general.close') }}</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <div v-if="selectedCompany">
                    <h2>{{ selectedCompany.name }}</h2>
                    <ion-grid>
                        <ion-row>
                            <ion-col size="4"><strong>{{ $t('company.address') }}:</strong></ion-col>
                            <ion-col size="8">{{ selectedCompany.address }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>{{ $t('company.city') }}:</strong></ion-col>
                            <ion-col size="8">{{ selectedCompany.city }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>{{ $t('company.postalCode') }}:</strong></ion-col>
                            <ion-col size="8">{{ selectedCompany.zipcode }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>{{ $t('company.email') }}:</strong></ion-col>
                            <ion-col size="8">{{ selectedCompany.email }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>{{ $t('company.phone') }}:</strong></ion-col>
                            <ion-col size="8">{{ selectedCompany.phone }}</ion-col>
                        </ion-row>
                        <ion-row>
                            <ion-col size="4"><strong>{{ $t('company.website') }}:</strong></ion-col>
                            <ion-col size="8">
                                <a :href="selectedCompany.web" target="_blank">{{ selectedCompany.web }}</a>
                            </ion-col>
                        </ion-row>
                    </ion-grid>

                    <ion-buttons>
                        <ion-button v-if="selectedCompany.companyStatus === 0"
                            @click="confirmAction('Verify', selectedCompany.id, 1)">{{ $t('admin.company.verify')
                            }}</ion-button>
                        <ion-button v-if="selectedCompany.companyStatus === 1"
                            @click="confirmAction('Unverify', selectedCompany.id, 0)">{{ $t('admin.company.unverify')
                            }}</ion-button>
                        <ion-button v-if="selectedCompany.companyStatus !== 2"
                            @click="confirmAction('Disable', selectedCompany.id, 2)">{{ $t('admin.company.disable')
                            }}</ion-button>
                        <ion-button v-if="selectedCompany.companyStatus === 2"
                            @click="confirmAction('Verify', selectedCompany.id, 1)">{{ $t('admin.company.verify')
                            }}</ion-button>
                        <ion-button @click="editCompany(selectedCompany)">{{ $t('general.edit') }}</ion-button>
                        <ion-button color="danger" @click="confirmAction('Delete', selectedCompany.id, null, true)">{{
                            $t('general.delete') }}</ion-button>
                    </ion-buttons>
                </div>
            </ion-content>
        </ion-modal>

        <ion-modal :is-open="isEditOpen" @didDismiss="isEditOpen = false">
            <ion-header>
                <ion-toolbar>
                    <ion-title>{{ $t('admin.edittitle') }}</ion-title>
                    <ion-buttons slot="end">
                        <ion-button @click="isEditOpen = false">{{ $t('general.close') }}</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-list>
                    <ion-item>
                        <ion-label position="stacked">{{ $t('company.name') }}</ion-label>
                        <ion-input v-model="editCompanyData.name"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">{{ $t('company.address') }}</ion-label>
                        <ion-input v-model="editCompanyData.address"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">{{ $t('company.city') }}</ion-label>
                        <ion-input v-model="editCompanyData.city"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">{{ $t('company.postalCode') }}</ion-label>
                        <ion-input v-model="editCompanyData.zipcode"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">{{ $t('company.email') }}</ion-label>
                        <ion-input v-model="editCompanyData.email"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">{{ $t('company.phone') }}</ion-label>
                        <ion-input v-model="editCompanyData.phone"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label position="stacked">{{ $t('company.website') }}</ion-label>
                        <ion-input v-model="editCompanyData.web"></ion-input>
                    </ion-item>
                </ion-list>
                <ion-button expand="block" @click="saveCompanyChanges" :disabled="!isChanged">{{ $t('general.save')
                    }}</ion-button>
            </ion-content>
        </ion-modal>

        <ToastComponent ref="toastComponent" />

        <FooterComponent />

    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonList, IonItem, IonLabel, IonButtons, IonButton, IonModal, alertController, IonGrid, IonRow, IonCol, IonInput } from '@ionic/vue';
import axios from 'axios';
import ToastComponent from '../../components/ToastComponent.vue';
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';

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
        ToastComponent,
        NavBarComponent,
        FooterComponent
    },

    data() {
        return {
            companies: [],
            selectedSegment: 'verified',
            isReviewOpen: false,
            isEditOpen: false,
            selectedCompany: null,
            editCompanyData: {},
            originalCompanyData: {},
        };
    },
    computed: {
        filteredCompanies() {
            return this.companies.filter(c =>
                (this.selectedSegment === 'verified' && c.companyStatus === 1) ||
                (this.selectedSegment === 'unverified' && c.companyStatus === 0) ||
                (this.selectedSegment === 'disabled' && c.companyStatus === 2)
            );
        },

        isChanged() {
            return JSON.stringify(this.editCompanyData) !== JSON.stringify(this.originalCompanyData);
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

            const actionMessageKey = isDelete
                ? 'admin.company.confirmDelete'
                : `admin.company.confirm${action}`;

            const headerTranslation = this.$root.$t('admin.confirmAction');
            const messageTranslation = this.$root.$t(actionMessageKey);
            const cancel = this.$root.$t('general.cancel')
            const confirm = this.$root.$t('general.confirm')

            const alert = await alertController.create({
                header: headerTranslation,
                message: messageTranslation,
                buttons: [
                    {
                        text: cancel,
                        role: 'cancel',
                    },
                    {
                        text: confirm,
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
            alert.present();
        },

        async updateCompanyStatus(id, status) {
            try {
                const url = "http://localhost:28765/admin/updatecompanystatus";
                const response = await axios.post(url, { id, status }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                if (response.data.type = "result" && response.data.result == "ok") {
                    this.$refs.toastComponent.showToast(this.$t('company.updateSuccess'), 2000, 'success');
                    this.isReviewOpen = false;
                    const companyIndex = this.companies.findIndex(c => c.id === id);

                    if (companyIndex !== -1) {
                        this.companies[companyIndex].companyStatus = status;
                    }
                }
            } catch (error) {
                console.error('Error updating company status:', error);
                this.$refs.toastComponent.showToast(this.$t('company.updateFail'), 2000, 'danger');
            }
        },

        async deleteCompany(id) {
            try {
                const url = "http://localhost:28765/deletecompany";

                const response = await axios.delete(url, { data: { id: id }, headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                if (response.data.type = "result" && response.data.result == "ok") {
                    this.$refs.toastComponent.showToast(this.$t('company.deleteCompanySuccess'), 2000, 'success');
                    this.companies = this.companies.filter(company => company.id !== id);
                    this.isReviewOpen = false;
                }
            } catch (error) {
                console.error(error);
                this.$refs.toastComponent.showToast(this.$t('company.deleteCompanyFail'), 2000, 'danger');
            }
        },

        editCompany(company) {
            this.originalCompanyData = { ...company };
            this.editCompanyData = { ...company };
            this.isEditOpen = true;
        },

        async saveCompanyChanges() {
            try {
                const url = "http://localhost:28765/updatecompany";
                const response = await axios.post(url, this.editCompanyData, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                if (response.data.result === 'ok') {
                    this.$refs.toastComponent.showToast(this.$t('company.updateSuccess'), 2000, 'success');
                    const index = this.companies.findIndex(c => c.id === this.editCompanyData.id);
                    if (index !== -1) {
                        this.companies[index] = { ...this.editCompanyData };
                    }
                    this.isEditOpen = false;
                    this.isReviewOpen = false;
                }
            } catch (error) {
                console.error('Error updating company:', error);
                this.$refs.toastComponent.showToast(this.$t('company.updateFail'), 2000, 'danger');

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
