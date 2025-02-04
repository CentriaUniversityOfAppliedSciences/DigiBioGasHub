<template>
            <ion-item>
                
                <img :src="image64"  />
                <ion-input :label="$t('product.image')" labelPlacement="floating" type="file" @IonChange="processImg"></ion-input>
            </ion-item>
            <ion-item>
                <ion-select required v-model="material" :label="$t('product.material')" :placeholder="$t('product.chooseMaterial')">
                    <ion-select-option v-for="material in materials" :key="material.name" :value="material.name">{{ material.locality[$i18n.locale] }}</ion-select-option>
                    
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-input required :label="$t('product.name')" labelPlacement="floating" v-model="productName"></ion-input>
            </ion-item>
            <ion-item>
                <ion-select required v-model="type" labelPlacement="floating" :label="$t('product.offerTypes')" :placeholder="$t('product.chooseType')">
                    <ion-select-option value="1">{{ $t('product.type.offer') }}</ion-select-option>
                    <ion-select-option value="2">{{ $t('product.type.demand') }}</ion-select-option>
                    <ion-select-option value="3">{{ $t('product.type.auction') }}</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-textarea :label="$t('product.desc')" labelPlacement="floating" v-model="description"></ion-textarea>
            </ion-item>
            <ion-item v-if="type === 'offer'">
                <ion-input required :label="$t('product.price.offer')" labelPlacement="floating" type="number" v-model="price"></ion-input>
            </ion-item>
            <ion-item v-if="type === 'demand'">
                <ion-input required :label="$t('product.price.demand')" labelPlacement="floating" type="number" v-model="price"></ion-input>
            </ion-item>
            <ion-item v-if="type === 'auction'">
                <ion-input required :label="$t('product.price.auction')" labelPlacement="floating" type="number" v-model="price"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input :label="$t('product.quantity')" labelPlacement="floating" type="number" v-model="quantity"></ion-input>
            </ion-item>
            <ion-item>
                <ion-input :label="$t('product.unit')" labelPlacement="floating" v-model="unit"></ion-input>
            </ion-item>
            <ion-item>
                <ion-select v-model="logisticType" :label="$t('product.logistic.type')">
                    <ion-select-option value="1">{{ $t('product.logistic.includedInPrice') }}</ion-select-option>
                    <ion-select-option value="2">{{ $t('product.logistic.freeToPickup') }}</ion-select-option>
                    <ion-select-option value="3">{{ $t('product.logistic.agreedupon') }}</ion-select-option>
                    
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-datetime :locale="getLocale()" :first-day-of-week="1" hour-cycle="h24" >
                    <span slot="title">{{ $t('product.endTime') }}</span>
                    <span slot="time-label">{{ $t('product.time') }}</span>
                </ion-datetime>
            </ion-item>
            <ion-item>
                <ion-select required v-model="visibility" :label="$t('product.visibility.info')" :placeholder="$t('product.visibility.chooseVisibility')">
                    <ion-select-option value="1">{{ $t('product.visibility.public') }}</ion-select-option>
                    <ion-select-option value="2">{{ $t('product.visibility.private') }}</ion-select-option>
                </ion-select>
            </ion-item>
            <ion-button expand="full" @click="addProduct">{{ $t('product.submit') }}</ion-button>
</template>

<script>
import {  IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonSelectOption, IonSelect, IonDatetime } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'AddOfferComponent',
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonTextarea,
        IonButton,
        IonSelectOption,
        IonSelect,
        IonDatetime
    },
    data() {
        return {
            productName: '',
            description: '',
            price: null,
            productImage: null,
            image64: '',
            type: null,
            quantity: null,
            unit: '',
            logisticType: null,
            visibility: null,

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
            
        },
        getLocale(){
            
            if(this.$i18n.locale === 'en'){
                return 'en-GB';
            } else if(this.$i18n.locale === 'fi'){
                return 'fi-FI';
            } else if(this.$i18n.locale === 'sv'){
                return 'sv-SE';
            
        }
    }
}
});
</script>

<style scoped>
/* Add your styles here */
</style>