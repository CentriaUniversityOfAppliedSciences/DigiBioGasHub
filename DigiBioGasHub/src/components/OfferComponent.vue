<template>
            <ion-card>
                <ion-img :src="offers.image"></ion-img>
                <ion-card-header>
                    <ion-card-title>{{ offers.details }}</ion-card-title>
                    <ion-card-subtitle>{{ offers.type }} - {{ offers.category }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <p>Logistics: {{ offers.logistics }}</p>
                    <p>Amount: {{ offers.amount }}</p>
                </ion-card-content>
            </ion-card>
</template>

<script>
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg
} from '@ionic/vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'OfferComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonImg
    },
    props:{
        offer: Object
    },
    data() {
        return {
            offers: this.offer
                
            
        }
    }
});
</script>

<style scoped>
ion-card {
    margin: 1rem;
}
ion-img {
    width: 100%;
    height: auto;
}
</style>