<template>
            <ion-card>
                <ion-img style="width: 300px;" :src=getImageSource(offer)></ion-img>
                <ion-card-header>
                    <ion-card-title>{{ offer.description }}</ion-card-title>
                    <ion-card-subtitle>{{ getOfferTypeTranslation(offer.type) }} - {{ getOfferCategoryTranslation(offer.category) }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <p>{{ $t('product.logistic.type') }}: {{ getCargoTypeTranslation(offer.cargoType) }}</p>
                    <p>{{ $t('product.productDetails.location') }}: {{ parseLocation(offer.Locations) }}</p>
                    <p>{{ $t('product.productDetails.amount') }}: {{ offer.availableAmount }} {{ getUnitAmountTranslation(offer.unit)}}</p>
                    <p>{{ $t('product.productDetails.price') }}: {{ offer.price }} €</p>

                </ion-card-content>
                <ion-button id="buyOffer">{{ $t('product.buy') }}</ion-button>
            </ion-card>
            <ion-modal id="buyOfferModal" trigger="buyOffer">
                <ion-header>
                <ion-toolbar>
                    <ion-title>{{ $t('product.buy') }}</ion-title>
                    <ion-button id="closeModal" slot="end" @click="modalController.dismiss()">{{ $t('menu.close') }}</ion-button>
                </ion-toolbar>
                <OfferBuyComponent :offer="offer" @updateOffers="updateOffers" />
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
    IonTitle,
    modalController
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
        OfferBuyComponent,
        modalController
    },
    props:{
        offer: {
            type: Object,
            required: true,
            
        }
    },
    data() {
        return {
            modalController: modalController,
                
            
        }
    },
    emits: ['updateOffers'],
    mounted(){
    },
    methods: {
        getOfferTypeTranslation(type) {
            if (type == null || type == undefined) {
                return "";
            }
            else{
                return this.$t(`product.typenum.${type}`);
            }
            
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
            if (category == null || category == undefined) {
                return "";
            }
            else{
                return this.$t(`material.type.${category}`);
            }
            
        },
        getImageSource(o){
            if (o != null) {
                
                return o.fileLink;
            }
            else{
                return "";
            }
        },
        getCargoTypeTranslation(cargoType) {
            if (cargoType == null || cargoType == undefined) {
                return "";
            }
            else{
                return this.$t(`product.logisticType.${cargoType}`);
            }
            
        },
        getUnitAmountTranslation(type) {
            if (type == null || type == undefined) {
                return "";
            }
            else{
                return this.$t(`unit.amount.${type}`);
            }
        },
        parseLocation(locations) {
            if (locations && locations.length > 0) {
                return locations.map(location => `${location.address}, ${location.city}, ${location.zipcode}`).join(', ');
            }
            return '';
        },
        updateOffers() {
            
            this.$emit('updateOffers');
            
        }

        
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