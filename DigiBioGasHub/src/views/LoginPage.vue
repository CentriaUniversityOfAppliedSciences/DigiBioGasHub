<template>
    <ion-page>
        <NavBarComponent />
        <div class="login-page">
            <div class="login-container">
                <LoginComponent />
            </div>
        </div>
        <FooterComponent />
    </ion-page>
</template>

<script>
import LoginComponent from '../components/LoginComponent.vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { IonPage } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent( {
    name: 'LoginPage',
    components: {
        LoginComponent,
        NavBarComponent,
        FooterComponent,
        IonPage
    }
});
</script>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    height: 100vh;
}

.login-container {
    max-width: 600px;
    width: 100%;
    padding: 20px;
    border-radius: 8px;
}
</style>
