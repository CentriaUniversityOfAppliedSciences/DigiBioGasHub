<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ product.Material.name }}</ion-card-title>
            <ion-card-subtitle> {{ getMaterialTypeTranslation(product.Material.type) }}</ion-card-subtitle>
            
        </ion-card-header>
        <ion-card-content>
            <p>{{ product.Material.description }}</p>
            <p>{{ product.description }}</p>
            <ion-item>
                <ion-label>{{ $t('product.productDetails.price') }}: {{ product.price }} €</ion-label>
            </ion-item>
            <ion-item>
                <ion-label>{{ $t('product.productDetails.amount') }}: {{ product.amount }} {{  getUnitAmountTranslation(product.unit) }}</ion-label>
            </ion-item>
            <ion-item>
                <ion-button expand="full" @click="openDetails(product.id)">{{ $t('product.openLink') }}</ion-button>
            </ion-item>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonButton } from '@ionic/vue';
export default {
    name: 'ListingComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonItem,
        IonLabel,
        IonButton
    },
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods:{
        getMaterialTypeTranslation(type) {
            console.log(type);
            return this.$t(`material.type.${type}`);
        },
        getUnitAmountTranslation(type) {
            return this.$t(`unit.amount.${type}`);
        },
        openDetails(id) {
            this.$router.push({ name: 'Product Offer', params: { id: id } });
        }
    }
}
</script>

<style scoped>
ion-card {
    margin: 20px;
}
</style>