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
            <ToastComponent v-if="errorMessage" :is-open="true" :message="errorMessage" :duration="5000" :color="'danger'" />
            <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
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
        ToastComponent
    },
    
    setup() {
        
        return{modalController}
    },
    methods: {
        login(){
            this.errorMessage = '';
            if (!this.validateEmail(this.username)) {
                this.errorMessage = 'Invalid email address';
                return;
            }
            if (this.password.length < 6) {
                this.errorMessage = 'Password must be at least 6 characters long';
                return;
            }
            axios.post('http://localhost:28765/login', {
                username: this.username,
                password: this.password
            }).then(response => {
                if (response.data.result === 'ok') {
                    localStorage.setItem('token', response.data.token);
                    this.$router.push('/home');
                } else {
                    console.log('error')
                }
            }).catch(error => {
                this.errorMessage = error;
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
ion-modal {
    --width: 300px;
    --height: 400px;
    --border-radius: 10px;
}
</style>

