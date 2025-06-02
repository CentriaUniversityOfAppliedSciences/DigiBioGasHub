<template>
    <ion-page>
        <ion-content>
        <NavBarComponent />
        
            
            <ion-grid class="main-grid">
                <ion-row class="ion-align-items-start">
                <ion-col size="2">
                    <FilterComponent :filtersData="filtersData" :dataToFilter="products" @filtered-data="updateData" />
                    <ion-button id="addOffer">{{ $t('offers.addOffer') }}</ion-button>
                </ion-col>
                <ion-col>
                    <ion-row>
                        <ion-col v-for="product in currentProducts" :key="product.id" size="12" size-sm="6" size-md="4" size-lg="3">
                            <ListingComponent v-if="product" :product="product" :isMarketplace="true" />
                        </ion-col>
                    </ion-row>
                </ion-col>  
            </ion-row>
           
            </ion-grid>
            
                <AddOfferComponent @getOffers="getOffers"/>
            
       
                
    </ion-content>
    <FooterComponent />
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FilterComponent from '../components/FilterComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ListingComponent from '../components/ListingComponent.vue'
import AddOfferComponent from '../components/AddOfferComponent.vue'
import {IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton, IonModal} from '@ionic/vue'
import axios from 'axios'
export default defineComponent ({
    name: 'MarketplacePage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, IonCol, IonGrid, IonRow, ListingComponent, FilterComponent, IonButton, IonModal, AddOfferComponent},
    setup() {
        return {
        }
    },
    data(){
        return {
            products: [
                
            ],
            currentProducts: [],
            filtersData: []
        }
    },
    methods: {
        updateData(data){
            this.currentProducts = data;
        },
        getProducts(){
            var url = this.$api_add + "/getoffers";
            axios.post(url,[],{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    this.products = response.data.message;
                    this.currentProducts = response.data.message;
                }
            });
        },
        getOffers(){
            this.getProducts();
        },
        refreshFilters(){
            this.filtersData = [];
            const materialTypes = this.$i18n.messages[this.$i18n.locale].material.type;
            if (typeof materialTypes === 'object' && !Array.isArray(materialTypes)) {
                Object.entries(materialTypes).forEach(([key, value]) => {
                    if (!this.filtersData.find(f => f.value === key)) {
                        this.filtersData.push({ label: value, value: key });
                    }
                });
            } else {
                console.error('Invalid material.type format in i18n configuration');
            }
        },
    },
    mounted() {
        this.currentProducts = this.products;
        this.getProducts();
        this.refreshFilters();
    }

})
</script>
<style scoped>
.marketplace-page {
    height: 100%;
    width: 100%;
}
ion-grid {
    --ion-grid-width: 50%;

    --ion-grid-width-xs: 50%;
    --ion-grid-width-sm: 288px;
    --ion-grid-width-md: 384px;
    --ion-grid-width-lg: 480px;
    --ion-grid-width-xl: 570px;
  }
  .main-grid{
    min-height: 75vh;
  }
</style>