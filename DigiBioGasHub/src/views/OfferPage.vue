<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>

        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import {IonPage, IonContent} from '@ionic/vue'
export default defineComponent ({
    name: 'OfferPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent},
    setup() {
        return {
        }
    }
})
</script>