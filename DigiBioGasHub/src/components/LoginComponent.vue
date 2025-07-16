<template>
    <ion-content class="ion-padding">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('general.login') }}</ion-title>
            </ion-toolbar>
        </ion-header>
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
        async login() {
            this.errorMessage = '';

            if (!this.validateEmail(this.username)) {
                this.errorMessage = this.$t('account.loginCredentialsFail');
                this.ToastComponent.methods.showToast(this.$t('account.loginCredentialsFail'), 2000, 'danger');
                return;
            }

            if (this.password.length < 6) {
                this.errorMessage = this.$t('account.loginCredentialsFail');
                this.ToastComponent.methods.showToast(this.$t('account.loginCredentialsFail'), 2000, 'danger');
                return;
            }

            try {
                const response = await axios.post(this.$api_add + '/login', {
                    username: this.username,
                    password: this.password
                });

                if (response.data.result === 'ok') {
                    this.ToastComponent.methods.showToast(this.$t('account.loginSuccess'), 3000, 'success');

                    localStorage.setItem('token', response.data.token);

                    const topModal = await modalController.getTop();
                    if (topModal) {
                        await modalController.dismiss({ dismissed: true });
                    }

                    const redirectPath = this.$route.query.redirect || '/home';
                    this.$router.push(redirectPath);
                } else {
                    this.ToastComponent.methods.showToast(this.$t('account.loginCredentialsFail'), 3000, 'danger');
                }
            } catch (error) {
                this.ToastComponent.methods.showToast(this.$t('account.loginFail'), 3000, 'danger');
            }
        },
        async register() {
            const topModal = await modalController.getTop();
            if (topModal) {
                await modalController.dismiss();
            }
            this.$router.push({
                name: 'Register',
                query: {
                    redirect: this.$route.fullPath,
                }
            });
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
.button-spacing {
    margin-top: 15px;
}
</style>

