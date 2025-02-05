<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <OfferComponent :offer="offer"/>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import {IonPage, IonContent} from '@ionic/vue'
import OfferComponent from '../components/OfferComponent.vue';
import axios from 'axios';


export default defineComponent ({
    name: 'OfferPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, OfferComponent},
    setup() {
        const productId = this.$route.params.id;
        let offer = {};
        axios.post('http://localhost:28765/getoffersbyid',{id: productId}).then(response => {
            if(response.headers.status === 200){
                offer = response.data.results;
            }
            else{
                this.$router.push('/');
            }
        });
        return { offer
        }
    }
})
</script>