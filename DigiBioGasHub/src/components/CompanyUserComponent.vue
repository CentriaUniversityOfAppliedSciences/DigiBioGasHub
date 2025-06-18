<template>
    <ion-card class="user-card">
        <ion-card-content>
            <ion-card-header>
                <ion-card-title>{{ user.name }}</ion-card-title>
                <ion-card-subtitle>{{ user.email }}</ion-card-subtitle>
            </ion-card-header>

            <ion-item>
                <ion-label>{{ $t("admin.users.userlevel") }}: {{ parseUserLevel(userData.userlevel) }}</ion-label>
            </ion-item>
            <div class="button-group">
                <ion-button color="danger" @click="removeUserConfirm(user.id)">{{ $t("company.deleteUserFromCompany") }}</ion-button>
                <ion-button color="secondary" @click="editUserOpen" >{{ $t("company.editUser") }}</ion-button>
            </div>
        </ion-card-content>
    </ion-card>
    <ion-modal :is-open="editModalOpen" @didDismiss="editModalOpen = false">
        <ion-header>
            <ion-toolbar>
            <ion-title>{{ $t("company.editUser") }}</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="editModalOpen = false">{{ $t("general.cancel") }}</ion-button>
            </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item>
            <ion-label>{{ $t("admin.users.userlevel") }}</ion-label>
            <ion-select v-model="editedUserLevel">
                <ion-select-option value="20">{{ $t("company.userlevels.1") }}</ion-select-option>
                <ion-select-option value="23">{{ $t("company.userlevels.2") }}</ion-select-option>
            </ion-select>
            </ion-item>
            <ion-button expand="block" @click="saveUserLevel">{{ $t("general.save") }}</ion-button>
        </ion-content>
    </ion-modal>
    <ToastComponent ref="toastComponent" />
</template>

<script>
import { defineComponent } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonButton, IonInput, IonLabel, IonItem, alertController, IonModal, IonSelect, IonSelectOption, IonHeader, IonContent, IonButtons, IonToolbar, IonTitle } from '@ionic/vue';
import axios from 'axios';
import ToastComponent from './ToastComponent.vue';

export default defineComponent({
    name: 'CompanyUserComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonImg,
        IonButton,
        IonInput,
        IonItem,
        IonLabel,
        alertController,
        IonModal,
        IonSelect,
        IonSelectOption,
        IonHeader,
        IonContent,
        IonButtons,
        IonToolbar,
        IonTitle,
        ToastComponent
    },
    props: {
        user: {
            type: Object,
            required: true
        },
        userData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            alertController,
            editModalOpen: false,
            editedUserLevel: this.userData.userlevel 
        };
    },
    emits: ['userRemoved', 'userUpdated'],
    methods: {
       parseUserLevel(level) {
            switch (level) {
                case "0":
                    return this.$t("company.userlevels.0");
                case "20":
                    return this.$t("company.userlevels.1");
                case "23":
                    return this.$t("company.userlevels.2");
                default:
                    return this.$t("company.userlevels.0");
            }
        },

        removeUserConfirm(userId) {
            this.alertController
            .create({
                header: this.$t('company.deleteUserFromCompany'),
                buttons: [
                    {
                        text: this.$t('general.cancel'),
                        role: 'cancel',
                        cssClass: 'secondary',
                    },
                    {
                        text: this.$t('general.yes'),
                        handler: () => {
                            this.deleteUser(userId);
                        },
                    },
                ],
            })
            .then(alert => alert.present());
        },
        deleteUser(userId) {
            const url = `${this.$api_add}/company/removeuser`;
            axios.post(url, { "userID":userId, "companyID":this.userData.companyID }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false })
                .then(response => {
                    if (response.data.result === 'ok') {
                        this.$emit('userRemoved', userId);
                    } else {
                        this.$toast.show(this.$t('company.removeUserFail'));
                    }
                })
                .catch(error => {
                    console.error("Error removing user:", error);
                    this.$toast.show(this.$t('company.removeUserFail'));
                });
        },
        saveUserLevel() {
            const url = `${this.$api_add}/company/edituser`;
            axios.post(url, { "userID": this.user.id, "userlevel": this.editedUserLevel, "companyID":this.userData.companyID }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false })
                .then(response => {
                    if (response.data.result === 'ok') {
                        this.$refs.toastComponent.showToast(this.$t('company.updateSuccess'), 2000, 'success');
                        this.$emit('userUpdated');
                        this.editModalOpen = false;
                    } else {
                        this.$refs.toastComponent.showToast(this.$t('company.updateFail'), 2000, 'danger');
                    }
                })
                .catch(error => {
                    console.error("Error updating user level:", error);
                    this.$refs.toastComponent.showToast(this.$t('company.updateFail'), 2000, 'danger');
                });
        },
        editUserOpen() {
            
            this.editModalOpen = true;
            this.editedUserLevel = this.userData.userlevel; 
        }
    },
});

</script>

<style scoped>
.user-card {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}
</style>