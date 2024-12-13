<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Add Product Listing</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-item>
                <ion-label position="floating">Product Name</ion-label>
                <ion-input v-model="productName"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Description</ion-label>
                <ion-textarea v-model="description"></ion-textarea>
            </ion-item>
            <ion-item>
                <ion-label position="floating">Price</ion-label>
                <ion-input type="number" v-model="price"></ion-input>
            </ion-item>
            <ion-button expand="full" @click="addProduct">Add Product</ion-button>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton } from '@ionic/vue';

export default {
    name: 'AddOfferComponent',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
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
            price: null
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
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>