<template>
            <ion-card>
                <ion-img style="width: 300px;" :src=getImageSource(offer)></ion-img>
                <ion-card-header>
                    <ion-card-title>{{ offer.description }} </ion-card-title>
                    <ion-card-subtitle>{{ getOfferTypeTranslation(offer.type) }} - {{ getOfferCategoryTranslation(offer.category) }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <p>{{ $t('product.logistic.type') }}: {{ offer.cargoType }}</p>
                    <p>{{ $t('product.productDetails.amount') }}: {{ offer.availableAmount }}</p>
                </ion-card-content>
                <ion-button id="buyOffer">Osta</ion-button>
            </ion-card>
            <ion-modal id="buyOfferModal" trigger="buyOffer">
                <ion-header>
                <ion-toolbar>
                    <ion-title>Osta</ion-title>
                    <ion-button id="closeModal" slot="end" @click="modalController.dismiss()">{{ $t('menu.close') }}</ion-button>
                </ion-toolbar>
                <OfferBuyComponent :offer="offer" />
            </ion-header>
            </ion-modal>
</template>

<script>
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle
} from '@ionic/vue'
import { defineComponent } from 'vue'
import OfferBuyComponent from './OfferBuyComponent.vue'

export default defineComponent({
    name: 'OfferComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonImg,
        IonButton,
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        OfferBuyComponent
    },
    props:{
        offer: {
            type: Object,
            required: true,
            
        }
    },
    data() {
        return {
            
                
            
        }
    },
    mounted(){
    },
    methods: {
        getOfferTypeTranslation(type) {
            return this.$t(`product.typenum.${type}`);
        },  
        getMaterialTypeTranslation(material) {
            if (material != null && material.Material != null) {
                var mat = material.Material;
                var type = mat.type;
                return this.$t(`material.type.${type}`);
            }
            else{
                return "";
            }
        },
        getOfferCategoryTranslation(category) {
            return this.$t(`material.type.${category}`);
        },
        getImageSource(o){
            if (o != null) {
                
                return o.fileLink;
            }
            else{
                return "";
            }
        },
        
    },
    
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