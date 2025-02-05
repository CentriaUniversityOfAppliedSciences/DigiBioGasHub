<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ product.Material.name }}</ion-card-title>
            <ion-card-subtitle> {{ getMaterialTypeTranslation(product.type) }}</ion-card-subtitle>
            
        </ion-card-header>
        <ion-card-content>
            <p>{{ product.Material.description }}</p>
            <ion-item>
                <ion-label>{{ $t('product.productDetails.price') }}: {{ product.price }} €</ion-label>
            </ion-item>
            <ion-item>
                <ion-label>{{ $t('product.productDetails.amount') }}: {{ product.amount }} {{  getUnitAmountTranslation(product.unit) }}</ion-label>
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
    },
    methods:{
        getMaterialTypeTranslation(type) {
            return this.$t(`material.type.${type}`);
        },
        getUnitAmountTranslation(type) {
            return this.$t(`unit.amount.${type}`);
        }
    }
}
</script>

<style scoped>
ion-card {
    margin: 20px;
}
</style>