<template>
            <ion-card>
                <ion-img :src="offer.image"></ion-img>
                <ion-card-header>
                    <ion-card-title>{{ offer.description }}</ion-card-title>
                    <ion-card-subtitle>{{ offer.type }} - {{ offer.category }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <p>Logistics: {{ offer.cargoType }}</p>
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
    props:{
        offer: {
            type: Object,
            required: true,
            default: () => {
                return {
                    image: '',
                    description: '',
                    type: '',
                    category: '',
                    cargoType: '1',
                    amount: '300'
                }
            }
        }
    },
    data() {
        return {
            
                
            
        }
    },
    mounted(){
        console.log(this.offer)
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