<template>
    <ion-page>
        <NavBarComponent />
        <div class="marketplace-page">
            
            <ion-grid>
                <ion-row class="ion-align-items-start">
                <ion-col size="2">
                    <FilterComponent :filtersData="filtersData" :dataToFilter="products" @filtered-data="updateData" />
                </ion-col>
                <ion-row>
                    <ion-col v-for="product in currentProducts" :key="product.id">
                        <ListingComponent :product="product" />
                    </ion-col>
                </ion-row>
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
import {IonPage, IonContent, IonCol, IonGrid, IonRow} from '@ionic/vue'
export default defineComponent ({
    name: 'MarketplacePage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, IonCol, IonGrid, IonRow, ListingComponent, FilterComponent},
    setup() {
        return {
        }
    },
    data(){
        return {
            products: [
                {
                    id: 1,
                    name: 'Product 1',
                    category: 'Category 1',
                    description: 'This is the first product.',
                    price: 100
                },
                {
                    id: 2,
                    name: 'Product 2',
                    category: 'Category 2',
                    description: 'This is the second product.',
                    price: 200
                },
                {
                    id: 3,
                    name: 'Product 3',
                    category: 'Category 3',
                    description: 'This is the third product.',
                    price: 300
                },
                {
                    id: 4,
                    name: 'Product 4',
                    category: 'Category 4',
                    description: 'This is the first product.',
                    price: 400
                },
                {
                    id: 5,
                    name: 'Product 5',
                    category: 'Category 5',
                    description: 'This is the second product.',
                    price: 500
                },
                {
                    id: 6,
                    name: 'Product 6',
                    category: 'Category 6',
                    description: 'This is the third product.',
                    price: 600
                }
            ],
            currentProducts: [],
            filtersData: [
                
                        { label: 'Category 1', value: 'Category 1' },
                        { label: 'Category 2', value: 'Category 2' },
                        { label: 'Category 3', value: 'Category 3' },
                        { label: 'Category 4', value: 'Category 4' },
                        { label: 'Category 5', value: 'Category 5' },
                        { label: 'Category 6', value: 'Category 6' }
            ]
        }
    },
    methods: {
        updateData(data){
            console.log('Filtered data:', data);
            this.currentProducts = data;
        }
    },
    mounted() {
        this.currentProducts = this.products;
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