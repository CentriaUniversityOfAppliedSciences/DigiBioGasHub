<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ offer.Material.name }}</ion-card-title>
            <ion-card-subtitle> {{ getMaterialTypeTranslation(offer.Material.type) }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content v-if="companies.length == 0">
            <p class="required-note">
                {{ $t('product.productDetails.noVerifiedCompaniesToBuyOffer') }}
                <a href="/company">{{ $t('product.productDetails.companyManagement') }}</a>
            </p>
        </ion-card-content>
        <ion-card-content v-else>
            <ion-item>
                <ion-select v-model="buy.companyID">
                    <ion-select-option v-for="company in companies" :key="company.Company.id"
                        :value="company.Company.id">
                        {{ company.Company.name }}
                    </ion-select-option>
                </ion-select>
            </ion-item>
            <ion-item>
                <ion-input type="number" v-model="buy.amount" :max="offer.availableAmount"></ion-input>
                <ion-label slot="end">{{ getUnitTypeTranslation(offer.unit) }}</ion-label>
                <ion-label slot="start">{{ $t('product.productDetails.amount') }} <i style="color: gray;"> ({{
                        $t('product.productDetails.available') }}:
                        {{ offer.availableAmount }} {{ getUnitTypeTranslation(offer.unit) }}) </i></ion-label>
            </ion-item>
            <ion-item>
                <ion-label> {{ $t('product.productDetails.pricePerUnit', { unit: getUnitTypeTranslation(offer.unit) })
                    }}</ion-label>
                <ion-label type="number" v-model="buy.price">{{ offer.price }}</ion-label>
            </ion-item>
            <ion-item>
                <ion-label slot="start">{{ $t('product.productDetails.total') }}: </ion-label>
                <ion-label slot="end">{{ totalPrice }} €</ion-label>
            </ion-item>
            <ion-item>
                <ion-button expand="full" @click="buyOffer">{{ $t('product.buy') }}</ion-button>
            </ion-item>
        </ion-card-content>
    </ion-card>
</template>
<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonButton, IonInput, IonLabel, IonItem, modalController, IonSelect, IonSelectOption, IonNote } from '@ionic/vue';
import { defineComponent } from 'vue';
import ToastComponent from './ToastComponent.vue';
import axios from 'axios';
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
        IonNote,
        IonLabel,
        IonSelect,
        IonSelectOption

    },
    props: {
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
            companyID: this.companyID
        };
        return {
            buy: buy,
            modalController: modalController,
            companies: [],
            companyID: null,
        }
    },
    computed: {
        totalPrice() {
            const amount = parseFloat(this.buy.amount) || 0;
            const price = parseFloat(this.offer.price) || 0;
            return (amount * price).toFixed(2);
        }
    },
    mounted() {
        this.getUserCompanies();
    },
    setup() {
        return {
            ToastComponent
        }
    },
    emits: ['updateOffers'],
    methods: {
        getUnitTypeTranslation(type) {
            return this.$t(`unit.amount.${type}`);
        },
        getMaterialTypeTranslation(material) {
            if (material != null && material.Material != null) {
                var mat = material.Material;
                var type = mat.type;
                return this.$t(`material.type.${type}`);
            }
            else {
                return "";
            }
        },
        buyOffer() {
            if (parseFloat(this.buy.amount) == 0) {
                this.ToastComponent.methods.showToast(this.$t('product.error.product_buy_zero_amount'), 2000, 'danger');
                return;
            }
            else if (parseFloat(this.buy.amount) > 0 && parseFloat(this.offer.availableAmount) < parseFloat(this.buy.amount)) {
                this.ToastComponent.methods.showToast(this.$t('product.error.product_buy_over_amount'), 2000, 'danger');
                return;
            }
            else {
                var url = this.$api_add + "/buyoffer";
                axios.post(url, this.buy, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                    if (response.data.type = "result" && response.data.result == "ok") {
                        this.$emit('updateOffers');
                        modalController.dismiss();
                        this.ToastComponent.methods.showToast(this.$t('product.buySuccess'), 2000, 'success');
                        this.$router.push({ name: 'Marketplace' });
                    }
                });
            }
        },
        getUserCompanies() {
            var url = this.$api_add + "/getusercompanies";
            axios.post(url, [], { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                if (response.data.type = "result" && response.data.result == "ok" && response.data.message.length > 0) {
                    this.companies = response.data.message;
                    if (this.companies != null && this.companies.length > 0) {
                        this.buy.companyID = this.companies[0].Company.id;
                    }
                }
            });
        }
    }
});

</script>

<style scoped>
/* .total-label {
  color: gray;
  font-size: 14px;
} */

 .required-note {
    padding: 0.5rem;
    border-radius: 10px;
    color: var(--color);
    background-color: transparent;
    text-align: center;
    border: 2px solid var(--ion-color-warning);
    max-width: 18rem;
    margin: auto;
    margin-bottom: 1.5rem;
}

</style>
