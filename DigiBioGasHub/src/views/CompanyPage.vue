<template>
    <ion-page>
        <nav-bar-component />
        <ion-content>
            <CompanyComponent />
        </ion-content>
        <footer-component />
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent
} from '@ionic/vue'
import NavBarComponent from '../components/NavBarComponent.vue';
import CompanyComponent from '../components/CompanyComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default defineComponent({
    name: 'CompanyPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        CompanyComponent,
        FooterComponent,
        NavBarComponent
    }
})
</script>

<style scoped>
/* Optional styling */
</style>