<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <OfferComponent :offer="offers"/>
            <FooterComponent />
        </ion-content>
        
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import {IonPage, IonContent} from '@ionic/vue'
import OfferComponent from '../components/OfferComponent.vue';
import axios from 'axios';
import {useRoute} from 'vue-router';

export default defineComponent ({
    name: 'OfferPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, OfferComponent},
    setup() {
        const route = useRoute();
        const productId = route.params.id;
        
        return { productId
        }
    },
    data(){
        return{
            offers: {}
        }
        
    },
    methods: {
        getOffer(){
            axios.post('http://localhost:28765/getoffersbyid',{id: this.productId}).then(response => {
                this.offers = response.data.message;
                console.log("offers",this.offers);
            });
        }
    },
    mounted(){
        this.getOffer();
    }
})
</script>