<template>
    <ion-page>
        <NavBarComponent />
        <div class="marketplace-page">
            <FilterComponent :filtersData="filtersData" :dataToFilter="products" @filtered-data="updateData" />
            <ion-grid>
                <ion-row>
                    <ion-col size="12" size-sm="6" size-md="4" v-for="product in currentProducts" :key="product.id">
                        <ListingComponent :product="product" />
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
                }
            ],
            currentProducts: [],
            filtersData: [
                
                        { label: 'Category 1', value: 'Category 1' },
                        { label: 'Category 2', value: 'Category 2' },
                        { label: 'Category 3', value: 'Category 3' }
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