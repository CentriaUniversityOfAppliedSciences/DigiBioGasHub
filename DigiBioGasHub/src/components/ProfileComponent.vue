<template>
    <ion-page>
        <ion-content>
            <ion-card class="profile-card">
                <ion-card-header>
                    <ion-card-title>{{ $t('menu.profile')}}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item>
                            <ion-input :label="$t('account.name')" :disabled="EditUser" v-model="user.name"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input :label="$t('account.email')" :disabled="EditUser" v-model="user.email"></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input :label="$t('account.phone')" :disabled="EditUser" v-model="user.phone"></ion-input>
                        </ion-item>
                    </ion-list>
                    <ion-button @click="toggleEditUser" color="warning">{{ $t('menu.edit') }}</ion-button>
                    <ion-button @click="saveUser" color="success">{{ $t('menu.save') }}</ion-button>
                    <ion-button id="deleteUser" color="danger">{{ $t('menu.deleteAccount') }}</ion-button>
                    <ion-button id="changePassword">{{ $t('menu.changePassword') }}</ion-button>
                    <ion-button @click="settings_button">{{ $t("general.settings") }}</ion-button>
                    <ion-button @click="goToApiKey">{{ $t("apiKeys.title") }}</ion-button>
                    <ion-button v-if="use_payment == 'true'" @click="goToSubscriptionPage">{{ $t('premium.manage_subscriptions') }}</ion-button>
                </ion-card-content>
            </ion-card>
            
        </ion-content>
        <ion-modal trigger="changePassword">
            <ion-header>
                <ion-toolbar>
                    <ion-title>{{ $t('menu.changePassword') }}</ion-title>
                        <ion-button slot="end" color="danger" @click="modalController.dismiss()">{{ $t('general.close') }}</ion-button>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-input :label="$t('account.oldPassword')" type="password"></ion-input>
                <ion-input :label="$t('account.newPassword')" type="password"></ion-input>
                <ion-input :label="$t('account.newPasswordRepeat')" type="password"></ion-input>
                <ion-button @click="changePassword()">{{ $t('menu.save') }}</ion-button>
            </ion-content>
        </ion-modal>
        <ion-alert
        trigger="deleteUser"
        :header="$t('menu.delete')"
        :message="$t('account.deleteUser')"
        :buttons="[{text: $t('general.cancel'), role: 'cancel'}, {text: $t('general.ok'), handler: deleteUser}]"
        ></ion-alert>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonModal, modalController, IonAlert } from '@ionic/vue';
import AddOfferComponent from './AddOfferComponent.vue';
import AddCompanyComponent from './AddCompanyComponent.vue';
import axios from 'axios';


export default defineComponent({
    name: 'ProfileComponent',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonList,
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        AddOfferComponent,
        IonModal,
        AddCompanyComponent,
        IonAlert
    },
    setup() {
        return { modalController };
    },
    props: {
        user: {
            name: String,
            email: String,
            phone: String,
            address: String,
            company: String,
            role: String
        },
        offers: {
            type: Array,
            required: true
        },
        company:{
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isInCompany: false,
            currPassword: '',
            newPassword: '',
            repeatPassword: '',
            EditUser: true,
            use_payment: this.$use_payment
        };
    },
    methods: {
        toggleEditUser() {
            this.EditUser = !this.EditUser;
        },
        saveUser() {
            axios.post(this.$api_add + '/updateuser', {
                name: this.user.name,
                email: this.user.email,
                phone: this.user.phone,
            }).then(response => {
                if (response.data.result === 'ok') {
                    this.ToastComponent.methods.showToast(this.$t('account.saveSuccess'), 2000, 'success');
                } else {
                    this.ToastComponent.methods.showToast(this.$t('account.saveFail'), 2000, 'danger');
                }
            }).catch(error => {
                this.ToastComponent.methods.showToast(this.$t('account.saveFail'), 2000, 'danger');
            });
        },
        deleteUser() {
            axios.post(this.$api_add + '/deleteuser',{id: this.getUserID()}).then(response =>{
                if (response.data.result === 'ok') {
                    this.ToastComponent.methods.showToast(this.$t('account.deleteSuccess'), 2000, 'success');
                    localStorage.removeItem('token');
                    this.$router.push({ name: 'Login' });
                } else {
                    this.ToastComponent.methods.showToast(this.$t('account.deleteFail'), 2000, 'danger');
                }
            }).catch(error => {
                this.ToastComponent.methods.showToast(this.$t('account.deleteFail'), 2000, 'danger');
            })
        },
        getUserID(){
            let token = localStorage.getItem('token');
            let decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded.id;
        },
        changePassword(){
            axios.post(this.$api_add + '/changepassword', {
                id: this.getUserID(),
                currPassword: this.currPassword,
                newPassword: this.newPassword,
                repeatPassword: this.repeatPassword
            }).then(response => {
                if (response.data.result === 'ok') {
                    this.ToastComponent.methods.showToast(this.$t('account.passwordChangeSuccess'), 2000, 'success');
                    this.modalController.dismiss();
                } else {
                    this.ToastComponent.methods.showToast(this.$t('account.passwordChangeFail'), 2000, 'danger');
                }
            }).catch(error => {
                this.ToastComponent.methods.showToast(this.$t('account.passwordChangeFail'), 2000, 'danger');
            });
        },
        settings_button() {
            this.$router.push({ name: 'Settings' });
        },
        goToApiKey() {
            this.$router.push({ name: 'ApiKeysPage' });
        },
        goToSubscriptionPage() {
            this.$router.push({ name: 'SubscriptionPage' });
        }
    },
    mounted(){
        if(this.company){
            this.isInCompany = false;
        }
    }
    
});
</script>

<style scoped>
ion-card {
    margin: 20px;
}
.profile-card {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 15px;
}
</style>
