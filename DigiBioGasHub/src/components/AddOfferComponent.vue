<template>
            <ion-item>
                <ion-label position="floating">{{ $t('product.image') }}</ion-label>
                <img :src="image64" :alt="$t('product.image')" />
                <ion-input type="file" @IonChange="processImg"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">{{ $t('product.name') }}</ion-label>
                <ion-input v-model="productName"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">{{ $t('product.desc') }}</ion-label>
                <ion-textarea v-model="description"></ion-textarea>
            </ion-item>
            <ion-item>
                <ion-label position="floating">{{ $t('product.price') }}</ion-label>
                <ion-input type="number" v-model="price"></ion-input>
            </ion-item>
            <ion-button expand="full" @click="addProduct">{{ $t('product.submit') }}</ion-button>
</template>

<script>
import {  IonItem, IonLabel, IonInput, IonTextarea, IonButton } from '@ionic/vue';

export default {
    name: 'AddOfferComponent',
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonTextarea,
        IonButton
    },
    data() {
        return {
            productName: '',
            description: '',
            price: null,
            productImage: null,
            image64: ''
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