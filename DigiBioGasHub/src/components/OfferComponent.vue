<template>
            <ion-card>
                <ion-img :src="offer.image"></ion-img>
                <ion-card-header>
                    <ion-card-title>{{ offer.details }}</ion-card-title>
                    <ion-card-subtitle>{{ offer.type }} - {{ offer.category }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <p>Logistics: {{ offer.logistics }}</p>
                    <p>Amount: {{ offer.amount }}</p>
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
    data() {
        return {
            offer: {
                image: 'https://example.com/sample.jpg',
                details: 'Product details go here',
                type: 'Sample Type',
                category: 'Sample Category',
                logistics: 'Pickup',
                amount: '100'
            }
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