<template>
    <ion-page>
    <NavBarComponent />
    <div class="register-page">
        <RegisterComponent />
    </div>
    <FooterComponent />
</ion-page>
</template>

<script>
import RegisterComponent from '../components/RegisterComponent.vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { IonPage } from '@ionic/vue';

export default {
    name: 'RegisterPage',
    components: {
        RegisterComponent,
        NavBarComponent,
        FooterComponent,
        IonPage
    }
};
</script>

<style scoped>
.register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>