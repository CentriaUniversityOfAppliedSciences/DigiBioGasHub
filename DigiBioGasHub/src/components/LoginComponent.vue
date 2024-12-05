<template>
    <ion-modal :is-open="triggerModal" @didDismiss="closeModal">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('general.login') }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeModal">{{ $t('general.close') }}</ion-button>
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
        </ion-content>
    </ion-modal>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonList, IonItem, IonLabel, IonInput } from '@ionic/vue';

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
        IonInput
    },
    props: {
        showModal: Boolean
    },
    setup() {
        
        return{}
    },
    methods: {
        closeModal(){
            this.triggerModal = false;
            this.$emit('closeModal');
        },
        login(){
            if (!validateEmail(username.value)) {
                errorMessage.value = 'Invalid email address';
                return;
            }
            if (password.value.length < 6) {
                errorMessage.value = 'Password must be at least 6 characters long';
                return;
            }
            console.log('Username:', username.value);
            console.log('Password:', password.value);
            closeModal();
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
            triggerModal: this.showModal
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

