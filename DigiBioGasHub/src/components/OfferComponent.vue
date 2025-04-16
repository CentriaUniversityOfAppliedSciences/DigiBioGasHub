<template>
            <ion-card>
                <ion-img :src="offer.image"></ion-img>
                <ion-card-header>
                    <ion-card-title>{{ offer.description }} </ion-card-title>
                    <ion-card-subtitle>{{ getOfferTypeTranslation(offer.type) }} - {{ offer.category }}</ion-card-subtitle>
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
                console.log("material", material);
                console.log(material);
                var mat = material.Material;
                console.log("type", mat.type);
                var type = mat.type;
                //console.log(typeof material.Material);
                //console.log(Object.keys(material.Material));
                //return material;
                return this.$t(`material.type.${type}`);
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