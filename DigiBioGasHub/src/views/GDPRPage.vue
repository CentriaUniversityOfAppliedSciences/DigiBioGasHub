<template>
<ion-page>
    <ion-content>
        <NavBarComponent />
        <GDPRComponent />
        
    </ion-content>
    <FooterComponent />
</ion-page>
</template>
<script>
import { defineComponent } from 'vue';
import { IonContent, IonPage } from '@ionic/vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import GDPRComponent from '../components/GDPRComponent.vue';
export default defineComponent({ 
    name: 'GDPRPage',
    components: {
        IonPage,
        NavBarComponent,
        FooterComponent,
        GDPRComponent,
        IonContent
    },
    setup() {
        return {};
    }
});

</script>