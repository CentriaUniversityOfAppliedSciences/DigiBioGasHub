<template>
            <ion-item>
                
                <img :src="image64"  />
                <ion-input :label="$t('product.image')" labelPlacement="floating" type="file" @IonChange="processImg"></ion-input>
            </ion-item>
            <ion-item>
                <ion-select v-model="material" :label="$t('product.material')" :placeholder="$t('product.chooseMaterial')">
                    <ion-select-option v-for="material in materials" :key="material.name" :value="material.name">{{ material.locality[$i18n.locale] }}</ion-select-option>
                    
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-input :label="$t('product.name')" labelPlacement="floating" v-model="productName"></ion-input>
            </ion-item>
            <ion-item>
                <ion-select v-model="type" labelPlacement="floating" :label="$t('product.offerTypes')" :placeholder="$t('product.chooseType')">
                    <ion-select-option value="offer">{{ $t('product.type.offer') }}</ion-select-option>
                    <ion-select-option value="demand">{{ $t('product.type.demand') }}</ion-select-option>
                    <ion-select-option value="auction">{{ $t('product.type.auction') }}</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-textarea :label="$t('product.desc')" labelPlacement="floating" v-model="description"></ion-textarea>
            </ion-item>
            <ion-item v-if="type === 'offer'">
                <ion-input :label="$t('product.price.offer')" labelPlacement="floating" type="number" v-model="price"></ion-input>
            </ion-item>
            <ion-item v-if="type === 'demand'">
                <ion-input :label="$t('product.price.demand')" labelPlacement="floating" type="number" v-model="price"></ion-input>
            </ion-item>
            <ion-item v-if="type === 'auction'">
                <ion-input :label="$t('product.price.auction')" labelPlacement="floating" type="number" v-model="price"></ion-input>
            </ion-item>
            <ion-item>
                <ion-select v-model="logisticType" :label="$t('product.logistic.type')">
                    <ion-select-option value="included">{{ $t('product.logistic.includedInPrice') }}</ion-select-option>
                    <ion-select-option value="freetopickup">{{ $t('product.logistic.freeToPickup') }}</ion-select-option>
                    <ion-select-option value="agreedupon">{{ $t('product.logistic.agreedupon') }}</ion-select-option>
                    
                </ion-select>
            </ion-item>
            <ion-button expand="full" @click="addProduct">{{ $t('product.submit') }}</ion-button>
</template>

<script>
import {  IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonSelectOption, IonSelect } from '@ionic/vue';

export default {
    name: 'AddOfferComponent',
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonTextarea,
        IonButton,
        IonSelectOption,
        IonSelect,
    },
    data() {
        return {
            productName: '',
            description: '',
            price: null,
            productImage: null,
            image64: '',
            type: null
        };
    },
    methods: {
        addProduct() {
            // Logic to add the product
            console.log('Product added:', {
                name: this.productName,
                description: this.description,
                price: this.price
            });
        },
        processImg(img) {
            let rawImg;
            const file = document.querySelector('input[type=file]').files[0];
            let reader = new FileReader();
            
            reader.onloadend = () => {
                rawImg = reader.result;
                console.log('Image:', rawImg);
                this.image64 = rawImg;
            };
            this.image64 = reader.readAsDataURL(file);
            
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>