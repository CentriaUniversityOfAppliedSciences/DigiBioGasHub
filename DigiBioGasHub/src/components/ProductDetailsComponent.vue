<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('productDetails.title') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>{{ product.name }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <p>{{ $t('productDetails.type') }}: {{ product.type }}</p>
                    <p>{{ $t('productDetails.price') }}: {{ product.price }}</p>
                    <p>{{ $t('productDetails.location') }}: {{ product.location }}</p>
                    <p>{{ $t('productDetails.offerValidFrom') }}: {{ product.offerValidFrom }}</p>
                    <p>{{ $t('productDetails.pickUpNeeded') }}: {{ product.pickUpNeeded ? $t('productDetails.yes') : $t('productDetails.no') }}</p>
                    <p>{{ $t('productDetails.delivered') }}: {{ product.delivered ? $t('productDetails.yes') : $t('productDetails.no') }}</p>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';

export default defineComponent({
    name: 'ProductDetailsComponent',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent
    },
    data() {
        return {
            product: {
                name: 'Sample Product',
                type: 'Electronics',
                price: '$299',
                location: 'New York',
                offerValidFrom: '2023-01-01',
                pickUpNeeded: true,
                delivered: false
            }
        };
    }
});
</script>

<style scoped>
ion-card {
    margin: 16px;
}
</style>