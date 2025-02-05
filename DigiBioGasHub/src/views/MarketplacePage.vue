<template>
    <ion-page>
        <NavBarComponent />
        <div class="marketplace-page">
            
            <ion-grid>
                <ion-row class="ion-align-items-start">
                <ion-col size="2">
                    <FilterComponent :filtersData="filtersData" :dataToFilter="products" @filtered-data="updateData" />
                    <ion-button @click="addOffer">Add offer</ion-button>
                </ion-col>
                <ion-col>
                    <ion-row>
                        <ion-col v-for="product in currentProducts" :key="product.id">
                            <ListingComponent :product="product" />
                        </ion-col>
                    </ion-row>
                </ion-col>  
            </ion-row>
           
            </ion-grid>
        </div>
        <FooterComponent />
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FilterComponent from '../components/FilterComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ListingComponent from '../components/ListingComponent.vue'
import {IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton} from '@ionic/vue'
import axios from 'axios'
export default defineComponent ({
    name: 'MarketplacePage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, IonCol, IonGrid, IonRow, ListingComponent, FilterComponent, IonButton},
    setup() {
        return {
        }
    },
    data(){
        return {
            products: [
                
            ],
            currentProducts: [],
            filtersData: [
                
                        { label: 'Category 1', value: '1' },
                        { label: 'Category 2', value: '2' },
                        { label: 'Category 3', value: '3' },
                        { label: 'Category 4', value: '4' },
                        { label: 'Category 5', value: '5' },
                        { label: 'Category 6', value: '6' }
            ]
        }
    },
    methods: {
        updateData(data){
            console.log('Filtered data:', data);
            this.currentProducts = data;
        },
        getProducts(){
            
            var url = "http://localhost:28765/getoffers";
            axios.post(url,[],{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                console.log(response);
                if (response.data.type="result" && response.data.result.length > 0){
                    this.products = response.data.result;
                    this.currentProducts = response.data.result;
                    
                }
            });
        },
        addOffer(){

        }
    },
    mounted() {
        this.currentProducts = this.products;
        this.getProducts();
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
</style>