<template>
    <ion-page>
        <NavBarComponent />
        <ion-content class="main-content">
            <OfferComponent :offer="offers" @updateOffers="updateOffers"/>
            
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
            axios.post(this.$api_add + '/getoffersbyid',{id: this.productId}).then(response => {
                this.offers = response.data.message;
            });
        },
        updateOffers(){
            this.getOffer();
            this.$emit('updateOffers');
        }
    },
    mounted(){
        this.getOffer();
    }
})
</script>
<style scoped>
.main-content {
    min-height: 75vh;
}
</style>