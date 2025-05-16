<template>
    <ion-button id="login">{{ $t('menu.login') }}</ion-button>
    <ion-modal trigger="login">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('general.login') }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="modalController.dismiss()">{{ $t('general.close') }}</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label position="floating">{{$t('general.username')}}</ion-label>
                    <ion-input v-model="username" type="text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">{{ $t('general.password') }}</ion-label>
                    <ion-input v-model="password" type="password"></ion-input>
                </ion-item>
            </ion-list>
            <ion-button expand="full" @click="login">{{ $t('general.loginButton') }}</ion-button>
            <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
            <ion-button class="button-spacing" expand="full" @click="register">{{ $t('general.registerButton') }}</ion-button>
        </ion-content>
       
    </ion-modal>
</template>

<script>
import { defineComponent } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonList, IonItem, IonLabel, IonInput, modalController } from '@ionic/vue';
import ToastComponent from './ToastComponent.vue';
import axios from 'axios';

export default defineComponent({
    name: 'LoginComponent',
    components: {
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonInput,
        
    },
    
    setup() {
        
        return{modalController, ToastComponent}
    },
    methods: {
        login(){
            this.errorMessage = '';
            if (!this.validateEmail(this.username)) {
                this.errorMessage = this.$t('account.loginEmailFail');
                this.ToastComponent.methods.showToast($t('account.loginEmailFail'), 2000, 'danger');
                return;
            }
            if (this.password.length < 6) {
                this.errorMessage = this.$t('account.loginPasswordFail');
                this.ToastComponent.methods.showToast(this.$t('account.loginPasswordFail'), 2000, 'danger');
                return;
            }
            axios.post(this.$api_add + '/login', {
                username: this.username,
                password: this.password
            }).then(response => {
                if (response.data.result === 'ok') {
                    this.ToastComponent.methods.showToast(this.$t('account.loginSuccess'), 2000, 'success');
                    
                    localStorage.setItem('token', response.data.token);
                    this.modalController.dismiss();
                    window.location.href = '/home';
                } else {
                    this.ToastComponent.methods.showToast(this.$t('account.loginFail'), 2000, 'danger');
                }
            }).catch(error => {
                this.ToastComponent.methods.showToast(this.$t('account.loginFail'), 2000, 'danger');
                this.errorMessage = error;
            });
        },
        register(){
            this.modalController.dismiss();
            window.location.href = '/register';
        },
        
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        
    },
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            
        }
    }
});
</script>

<style scoped>
ion-modal {
    --width: 300px;
    --height: 400px;
    --border-radius: 10px;
}
.button-spacing {
    margin-top: 15px;
}
</style>

