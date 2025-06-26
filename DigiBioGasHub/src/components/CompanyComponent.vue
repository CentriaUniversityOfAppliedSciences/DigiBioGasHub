<template>

    <ion-card class="company-card">
        <ion-card-header>
            <ion-card-title>{{ company.name }}</ion-card-title>
            <ion-card-subtitle>{{ getCompanyTypeTranslation(company.companyType) }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <p>{{ company.description }}</p>
            <ion-list>
                <ion-item>
                    <ion-icon :icon="icons.location" slot="start" />
                    <ion-input :disabled="companyEdit" v-model="company.name">{{ $t('general.name') }}</ion-input>
                </ion-item>
                <ion-item>
                    <ion-icon :icon="icons.location" slot="start" />
                    <!--<ion-input :disabled="companyEdit" v-model="company.companyType">{{ $t('company.type.'+company.companyType) }}</ion-input>-->
                    <ion-select disabled v-model="company.companyType">
                        <ion-select-option :value=0>{{ $t('company.type.0') }}</ion-select-option>
                        <ion-select-option :value=1>{{ $t('company.type.1') }}</ion-select-option>
                        <ion-select-option :value=2>{{ $t('company.type.2') }}</ion-select-option>
                        <ion-select-option :value=3>{{ $t('company.type.3') }}</ion-select-option>
                        <ion-select-option :value=4>{{ $t('company.type.4') }}</ion-select-option>
                        <ion-select-option :value=5>{{ $t('company.type.5') }}</ion-select-option>
                        <ion-select-option :value=6>{{ $t('company.type.6') }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <!--<ion-item v-if="!companyEdit">
                            <ion-icon :icon="icons.location" slot="start" />
                            <ion-input :disabled="companyEdit" v-model="company.description">{{ $t('company.description') }}</ion-input>
                        </ion-item>-->

                <ion-item>
                    <ion-icon :icon="icons.location" slot="start" />
                    <ion-input :disabled="companyEdit" v-model="company.address">{{ $t('company.address') }}</ion-input>
                </ion-item>
                <ion-item>
                    <ion-icon :icon="icons.location" slot="start" />
                    <ion-input :disabled="companyEdit" v-model="company.city">{{ $t('company.city') }}</ion-input>
                </ion-item>
                <ion-item>
                    <ion-icon :icon="icons.location" slot="start" />
                    <ion-input :disabled="companyEdit" v-model="company.zipcode">{{ $t('company.postalCode')
                        }}</ion-input>
                </ion-item>
                <ion-item>
                    <ion-icon :icon="icons.phone" slot="start" />
                    <ion-input :disabled="companyEdit" v-model="company.phone">{{ $t('general.phone') }}</ion-input>
                </ion-item>
                <ion-item>
                    <ion-icon :icon="icons.email" slot="start" />
                    <ion-input :disabled="companyEdit" v-model="company.email">{{ $t('general.email') }}</ion-input>
                </ion-item>
                <ion-item>
                    <ion-icon :icon="icons.website" slot="start" />
                    <ion-input :disabled="companyEdit" v-model="company.web">{{ $t('company.website') }}</ion-input>
                </ion-item>
            </ion-list>
            <ion-button v-if="companyData.userlevel === '23' || userLevel === '99'" @click="showEditAlert = true" :disabled="company.companyStatus === 0" color="warning">{{
                $t('menu.edit') }}</ion-button>
            <ion-button v-if="companyData.userlevel === '23' || userLevel === '99'" @click="confirmDelete(company.id)" id="deleteCompany" :disabled="company.companyStatus === 0"
                color="danger">{{ $t('menu.delete') }}</ion-button>
            <ion-button @click="goToOffers(company.id)"
                :disabled="company.companyStatus === 0 || company.companyStatus === 2" color="primary">{{
                $t('company.offers') }}</ion-button>
            <ion-button  v-if="companyData.userlevel === '23' || userLevel === '99'" @click="goToInsertCompanyLocations(company.id, company.name)"
                :disabled="company.companyStatus === 0 || company.companyStatus === 2" color="primary">Insert Locations</ion-button>
            <ion-button v-if="company.companyType === 5" @click="goToLogisticsRegister(company.id, company.name)"
                :disabled="company.companyStatus === 0 || company.companyStatus === 2" color="primary">{{
                $t('company.logistics.terminalsMenuButton') }}</ion-button>
            <ion-button v-if="companyData.userlevel === '23' || userLevel === '99'" @click="openInviteModal"
                :disabled="company.companyStatus === 0 || company.companyStatus === 2" color="primary"> {{
                $t('invitations.inviteMembers') }}</ion-button>
            <ion-button v-if="companyData.userlevel === '23' || userLevel === '99'" @click="showUsers(company.id)" :disabled="company.companyStatus === 0 || company.companyStatus === 2" color="secondary">{{ $t('company.users') }}</ion-button>
        </ion-card-content>
    </ion-card>


    <AddCompanyComponent />



    <ion-modal :is-open="isInviteModalOpen" @didDismiss="closeInviteModal">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('invitations.inviteMembers') }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeInviteModal">{{ $t('general.close') }}</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item>
                <ion-label position="floating">{{ $t('general.email') }}</ion-label>
                <ion-input v-model="inviteEmail" type="email"></ion-input>
            </ion-item>
            <ion-button expand="block" @click="sendInvite">{{ $t('invitations.sendInvitation') }}</ion-button>
        </ion-content>
    </ion-modal>

    <ion-alert :is-open="showEditAlert" :header= "$t('general.warning')" :message="$t('company.editWarning')"
        :buttons="[
            {
                text: $t('general.cancel'),
                role: 'cancel',
                handler: () => {
                    showEditAlert = false;
                }
            },
            {
                text: $t('general.proceed'),
                handler: () => {
                    showEditAlert = false;
                    openEditModal();
                }
            }]" />

    <ion-modal :is-open="isEditModalOpen" @didDismiss="closeEditModal">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('admin.edittitle') }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeEditModal">{{ $t('general.close') }}</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label position="stacked">{{ $t('general.name') }}</ion-label>
                    <ion-input v-model="editableCompany.name"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">{{ $t('company.type') }}</ion-label>
                    <ion-select :value="editableCompany.companyType" disabled>
                        <ion-select-option :value="editableCompany.companyType">
                            {{ getCompanyTypeTranslation(editableCompany.companyType) }}
                        </ion-select-option>
                    </ion-select>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">{{ $t('company.address') }}</ion-label>
                    <ion-input v-model="editableCompany.address"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">{{ $t('company.city') }}</ion-label>
                    <ion-input v-model="editableCompany.city"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">{{ $t('company.postalCode') }}</ion-label>
                    <ion-input v-model="editableCompany.zipcode"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">{{ $t('general.phone') }}</ion-label>
                    <ion-input v-model="editableCompany.phone"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">{{ $t('general.email') }}</ion-label>
                    <ion-input v-model="editableCompany.email"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked">{{ $t('company.website') }}</ion-label>
                    <ion-input v-model="editableCompany.web"></ion-input>
                </ion-item>
            </ion-list>

            <ion-button expand="block" :disabled="!hasChanges" @click="saveCompany" color="success">
                {{ $t('menu.save') }}
            </ion-button>
        </ion-content>
    </ion-modal>


    <ToastComponent ref="toastComponent" />

</template>

<script>
import { defineComponent } from 'vue';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonButton,
    IonButtons,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonModal,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    modalController,
    IonAlert,
    alertController,
} from '@ionic/vue';
import { locationOutline, callOutline, mailOutline, globeOutline } from 'ionicons/icons';
import { jwtDecode } from "../router";
import axios from 'axios';
import AddCompanyComponent from './AddCompanyComponent.vue';
import ToastComponent from './ToastComponent.vue';

export default defineComponent({
    name: 'CompanyComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonList,
        IonItem,
        IonIcon,
        IonLabel,
        IonButton,
        IonButtons,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonModal,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonContent,
        AddCompanyComponent,
        IonAlert,
        alertController,
        ToastComponent

    },
    props: {
        company: Object,
        companyData: Object, 
    },
    emits: ['companyDeleted', 'companyUpdated'],
    setup() {
    

        const icons = {
            location: locationOutline,
            phone: callOutline,
            email: mailOutline,
            website: globeOutline,
        };

        const token = localStorage.getItem('token');
        const decodedToken = token ? jwtDecode(token) : null;

        const userLevel = decodedToken?.userlevel || null;

        return {
            alertController,
            icons,
            userLevel,
        };
    },
    data() {
        return {
            showEditAlert: false,
            companyEdit: true,
            isInviteModalOpen: false,
            isEditModalOpen: false,
            editableCompany: {...this.company }, 
            inviteEmail: '',
            alertButtons: [
                {
                    text: this.$t('general.cancel'),
                    role: 'cancel',
                    cssClass: 'secondary',
                },
                {
                    text: this.$t('general.yes'),
                    handler: () => {
                        this.deleteCompany();
                    },
                },
            ]
        };
    },
    computed: {
        hasChanges() {
            return JSON.stringify(this.editableCompany) !== JSON.stringify(this.company);
        }
    },
    methods: {
        openEditModal() {
            this.editableCompany = JSON.parse(JSON.stringify(this.company)); 
            this.isEditModalOpen = true;
        },
        closeEditModal() {
            this.isEditModalOpen = false;
        },
        confirmDelete(compID) {
            this.alertController
            .create({
                header: this.$t('company.deleteCompany'),
                buttons: [
                    {
                        text: this.$t('general.cancel'),
                        role: 'cancel',
                        cssClass: 'secondary',
                    },
                    {
                        text: this.$t('general.yes'),
                        handler: () => {
                            this.deleteCompany(compID);
                        },
                    },
                ],
            })
            .then(alert => alert.present());
        },
        saveCompany(){
            
            Object.assign(this.company, this.editableCompany);
            this.isEditModalOpen = false;
            var url = this.$api_add + "/updatecompany";
            axios.post(url, {
                id: this.company.id,
                name: this.company.name,
                companyType: this.company.companyType,
                description: this.company.description,
                address: this.company.address,
                city: this.company.city,
                zipcode: this.company.zipcode,
                phone: this.company.phone,
                email: this.company.email,
                web: this.company.web
            }).then((response) => {
                if (response.data.type == "result" && response.data.result == "ok") {
                    this.$refs.toastComponent.showToast(this.$t('company.updateSuccess'), 2000, 'success');
                    this.$emit('companyUpdated', this.company);
                } else {
                    this.$refs.toastComponent.showToast(this.$t('company.updateFail'), 2000, 'danger');
                }
            })
        },
        deleteCompany(compID){
            var url = this.$api_add + "/deletecompany";
            axios.post(url,
            {
                id: compID
            },{
                headers: { 'authorization': localStorage.getItem('token') },
                withCredentials: false
            }).then((response) => {
                if (response.data.type == "result" && response.data.result == "ok") {
                    this.$emit('companyDeleted', compID);
                }
            });
        },
        getCompanyTypeTranslation(type) {
             
            return this.$t(`company.type.${type}`);
        },
        goToOffers(companyID) {
            this.$router.push('/companyoffers/'+companyID, {
                
            });
        },
        goToInsertCompanyLocations(companyID, companyName) {
            this.$router.push({
                path: '/companylocations',
                query: {
                    companyID: companyID,
                    companyName: companyName,
                },
            });
        },
        
        goToLogisticsRegister(companyID, companyName) {
            this.$router.push({
                path: '/logistics',
                query: {
                    companyID: companyID,
                    companyName: companyName,
                },
            });
        },
        showUsers(compID){
            this.$router.push('/companyusers/'+compID, {
                
            });
        },
        openInviteModal() {
            this.isInviteModalOpen = true;
        },
        closeInviteModal() {
            this.isInviteModalOpen = false;
            this.inviteEmail = '';
        },
        async sendInvite() {
            const emailPattern = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

            if (!this.inviteEmail || !emailPattern.test(this.inviteEmail)) {
                this.$refs.toastComponent.showToast(this.$t('invitations.invalidEmail'), 2000, 'danger');
                return;
            }

            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const invitedById = decodedToken?.id || null;
            const invitedByName = decodedToken?.name || null;

            try {
                const response = await axios.post(this.$api_add + '/company-admin/invitemembers', { email: this.inviteEmail, companyID: this.company.id, companyName: this.company.name, invitedById, invitedByName }, {
                    headers: { authorization: localStorage.getItem('token') },
                });

                if (response.data.result === 'ok') {
                    this.$refs.toastComponent.showToast(this.$t('invitations.inviteSuccess'), 2000, 'success');
                    this.closeInviteModal();
                } else {
                    this.$refs.toastComponent.showToast(this.$t('invitations.inviteError'), 2000, 'danger');
                }
            } catch (error) {
                this.$refs.toastComponent.showToast(this.$t('invitations.inviteError'), 2000, 'danger');
            }
        }
    }
});
</script>

<style scoped>
.company-card {
    max-width: 400px;
    margin: 0.1rem;
    text-align: center;
}
</style>
