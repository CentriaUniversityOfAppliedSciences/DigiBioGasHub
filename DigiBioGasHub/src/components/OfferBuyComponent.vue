<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ offer.Material.name }}</ion-card-title>
            <ion-card-subtitle> {{ getMaterialTypeTranslation(offer.Material.type) }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <ion-item>
                <ion-select v-model="buy.companyID">
                    <ion-select-option v-for="company in companies" :key="company.id" :value="company.id">
                        {{ company.name }}
                    </ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-input type="number" v-model="buy.amount" :max="offer.amount"></ion-input>
                    <ion-label slot="end">{{ getUnitTypeTranslation(offer.unit) }}</ion-label>
                    <ion-label slot="start">{{ $t('product.productDetails.amount')}}</ion-label>
                
                    
            </ion-item>
            <ion-item>
                <ion-label>{{ $t('product.productDetails.price') }}</ion-label>
              
                <ion-label type="number" v-model="buy.price">{{ offer.price }}</ion-label>
            </ion-item>
            <ion-item>
                <ion-button expand="full" @click="buyOffer">{{ $t('product.buy') }}</ion-button>
            </ion-item>
                    
                        
               
                
           
        </ion-card-content>
    </ion-card>
</template>
<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonButton, IonInput, IonLabel, IonItem, modalController, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineComponent } from 'vue';
import ToastComponent from './ToastComponent.vue';
import axios from 'axios';
import { get } from 'ol/proj';
export default defineComponent({
    name: 'OfferBuyComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonImg,
        IonButton,
        IonInput,
        IonItem,
        IonLabel,
        IonSelect,
        IonSelectOption

    },
    props:{
        offer: {
            type: Object,
            required: true,
            
        },
    },
    data() {
        var buy = {
            amount: 0,
            price: this.offer.price,
            unit: this.offer.unit,
            offerId: this.offer.id,
            companyID:this.companyID
            
        };
        return {
            buy: buy,
            modalController: modalController,
            companies: [],
            companyID: null,
        }
    },
    mounted(){
        this.getUserCompanies();
    },
    setup() {
        return {
            ToastComponent
        }
    },
    methods:{
        getUnitTypeTranslation(type) {
            return this.$t(`unit.amount.${type}`);
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
        buyOffer(){
            if (this.buy.amount > 0 && this.offer.amount < this.buy.amount){
                this.ToastComponent.methods.showToast(this.$t('product.error.product_buy_over_amount'), 2000, 'danger');
                return;
            }
            else{
                var url = this.$api_add + "/buyoffer";
                axios.post(url, this.buy, {headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                    if (response.data.type="result" && response.data.result == "ok"){
                        this.$router.push({ name: 'Marketplace' });
                        modalController.dismiss();
                    }
                });
            }
            
        },
        getUserCompanies(){
            var url = this.$api_add + "/getusercompanies";
            axios.post(url,[],{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    this.companies = response.data.message;
                    if (this.companies != null && this.companies.length > 0){
                        this.buy.companyID = this.companies[0].id;
                    }
                }
            });
        }
    }

});

</script>