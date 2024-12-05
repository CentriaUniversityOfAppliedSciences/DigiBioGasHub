<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ product.name }}</ion-card-title>
            <ion-card-subtitle>{{ product.category }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <p>{{ product.description }}</p>
            <ion-item>
                <ion-label>Price: {{ product.price }}</ion-label>
            </ion-item>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel } from '@ionic/vue';
export default {
    name: 'ListingComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonItem,
        IonLabel
    },
    props: {
        product: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
ion-card {
    margin: 20px;
}
</style>