<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <ToSComponent />
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import {IonPage, IonContent} from '@ionic/vue'
import ToSComponent from '../components/ToSComponent.vue'
export default defineComponent ({
    name: 'ToSPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, ToSComponent },
    setup() {
        return {
        }
    }
})
</script>