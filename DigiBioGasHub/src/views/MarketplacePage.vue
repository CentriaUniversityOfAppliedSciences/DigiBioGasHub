<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <div class="page-container">
                <div class="add-offer-top-container">
                    <ion-button color="success" id="addOffer">
                        {{ $t('offers.addOffer') }}
                    </ion-button>
                </div>
                <ion-grid class="main-grid">
                    <ion-row class="responsive-row">
                        <ion-col size="12" size-lg="3">
                            <FilterComponent :filtersData="filtersData" :dataToFilter="products"
                                @filtered-data="updateData" />
                        </ion-col>
                        <ion-col size="12" size-lg="9" class="listing-col">
                            <ion-row>
                                <ion-col v-for="product in currentProducts" :key="product.id" size="12" size-sm="6"
                                    size-md="4" size-lg="4">
                                    <ListingComponent v-if="product" :product="product" :isMarketplace="true" />
                                </ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>

            <AddOfferComponent @getOffers="getOffers" />
            <FooterComponent />
        </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FilterComponent from '../components/FilterComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ListingComponent from '../components/ListingComponent.vue'
import AddOfferComponent from '../components/AddOfferComponent.vue'
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton, IonModal } from '@ionic/vue'
import axios from 'axios'
export default defineComponent({
    name: 'MarketplacePage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, IonCol, IonGrid, IonRow, ListingComponent, FilterComponent, IonButton, IonModal, AddOfferComponent },
    setup() {
        return {
        }
    },
    data() {
        return {
            products: [

            ],
            currentProducts: [],
            filtersData: []
        }
    },
    methods: {
        updateData(data) {
            this.currentProducts = data;
        },
        getProducts() {
            var url = this.$api_add + "/getoffers";
            axios.post(url, [], { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                if (response.data.type = "result" && response.data.result == "ok" && response.data.message.length > 0) {
                    this.products = response.data.message;
                    this.currentProducts = response.data.message;
                }
            });
        },
        getOffers() {
            this.getProducts();
        },
        refreshFilters() {
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
        updateOffers(choice) {
            if (choice) {
                this.getOffers();
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getProducts();
        });
    },
    mounted() {
        this.currentProducts = this.products;
        this.getProducts();
        this.refreshFilters();
    }

})
</script>
<style scoped>
.page-container {
    max-width: 90rem;
    margin: 0 auto;
    padding: 0 16px;
}

.main-grid {
    min-height: 75vh;
}

.add-offer-top-container {
    max-width: 280px;
    margin: 16px;
}

#addOffer {
    width: 100%;
}

ion-button{
    --border-radius: 10px;
}
</style>
