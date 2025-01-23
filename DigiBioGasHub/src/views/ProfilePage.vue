<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <ProfileComponent :user="myUser"/>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ProfileComponent from '../components/ProfileComponent.vue'
import {IonPage, IonContent} from '@ionic/vue'
export default defineComponent ({
    name: 'ToSPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, ProfileComponent },
    setup() {
        return {
        }
    },
    data() {
        return {
            myUser: {
                name: 'Jyri Mäkelä',
                email: 'jyri.makela@centria.fi',
                company: 'Centria',
                role: 'Admin',
                phone: '040 123 4567',
                address: 'Kiviharjuntie 4, 40740 Jyväskylä'
            }
        }
    }
})
</script>