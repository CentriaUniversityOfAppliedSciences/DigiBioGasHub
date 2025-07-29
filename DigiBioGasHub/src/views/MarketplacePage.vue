<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <div class="page-container">
                <div class="top-parts">
                    <p v-if="filter" class="filter-note">
                        {{ $t('settings.filterNote') }}&nbsp;<a href="/settings"> {{ $t('settings.filterSettings')
                            }}</a>.
                        <ion-icon name="close-circle-outline" class="close-icon" @click="filter = false"></ion-icon>
                    </p>

                    <ion-button class="advanced-filter-btn" color="primary" @click="showAdvancedFilter = true">
                        {{ $t('filter.advanced') }}
                    </ion-button>
                </div>
                <ion-modal :is-open="showAdvancedFilter" @didDismiss="showAdvancedFilter = false">
                    <div class="advanced-filter-modal">
                        <h3>{{ $t('filter.sortBy') }}</h3>
                        <ion-radio-group v-model="selectedSort">
                            <ion-item>
                                <ion-label>{{ $t('filter.priceHighLow') }}</ion-label>
                                <ion-radio slot="start" value="priceDesc"></ion-radio>
                            </ion-item>
                            <ion-item>
                                <ion-label>{{ $t('filter.priceLowHigh') }}</ion-label>
                                <ion-radio slot="start" value="priceAsc"></ion-radio>
                            </ion-item>
                            <ion-item>
                                <ion-label>{{ $t('filter.amountHighLow') }}</ion-label>
                                <ion-radio slot="start" value="amountDesc"></ion-radio>
                            </ion-item>
                            <ion-item>
                                <ion-label>{{ $t('filter.amountLowHigh') }}</ion-label>
                                <ion-radio slot="start" value="amountAsc"></ion-radio>
                            </ion-item>
                        </ion-radio-group>
                        <ion-button expand="block" color="success" @click="applySort">{{ $t('filter.apply')
                            }}</ion-button>
                        <ion-button expand="block" fill="clear" color="medium" @click="showAdvancedFilter = false">{{
                            $t('filter.cancel') }}</ion-button>
                    </div>
                </ion-modal>
                <ion-grid class="main-grid">
                    <ion-row>
                        <ion-col size="12" size-lg="3">
                            <ion-button color="success" id="addOffer">
                                {{ $t('offers.addOffer') }}
                            </ion-button>
                        </ion-col>
                        <ion-col size="12" size-lg="9"></ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col size="12" size-lg="3">
                            <FilterComponent :filtersData="filtersData" :dataToFilter="products"
                                @filtered-data="updateData" />
                        </ion-col>

                        <ion-col size="12" size-lg="9" class="listing-col">
                            <ion-row>
                                <ion-col v-for="product in currentProducts" :key="product.id" size="12" size-sm="6"
                                    size-md="4" size-lg="4">
                                    <ListingComponent v-if="product" :product="product" :isMarketplace="true"
                                        @updateOffers="getOffers" />
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
import { IonPage, IonContent, IonCol, IonGrid, IonRow, IonButton, IonModal, IonNote, IonIcon, IonRadioGroup, IonItem, IonLabel, IonRadio } from '@ionic/vue'
import axios from 'axios'
import { addIcons } from 'ionicons'
import { closeCircleOutline } from 'ionicons/icons'
addIcons({
    closeCircleOutline
})
export default defineComponent({
    name: 'MarketplacePage',
    components: {
        NavBarComponent,
        FooterComponent,
        IonPage,
        IonContent,
        IonNote,
        IonIcon,
        IonCol,
        IonGrid,
        IonRow,
        IonRadioGroup,
        IonItem,
        IonLabel,
        IonRadio,
        ListingComponent,
        FilterComponent,
        IonButton,
        IonModal,
        AddOfferComponent
    },
    setup() {
        return {
        }
    },
    data() {
        return {
            products: [

            ],
            currentProducts: [],
            filtersData: [],
            filter: false,
            appliedFilter: {},
            showAdvancedFilter: false,
            selectedSort: ''
        }
    },
    methods: {
        updateData(data) {
            this.currentProducts = data;
        },
        applySort() {
            let sorted = [...this.currentProducts];
            switch (this.selectedSort) {
                case 'priceDesc':
                    sorted.sort((a, b) => b.price - a.price);
                    break;
                case 'priceAsc':
                    sorted.sort((a, b) => a.price - b.price);
                    break;
                case 'amountDesc':
                    sorted.sort((a, b) => b.amount - a.amount);
                    break;
                case 'amountAsc':
                    sorted.sort((a, b) => a.amount - b.amount);
                    break;
            }
            this.currentProducts = sorted;
            this.showAdvancedFilter = false;
        },
        getProducts() {
            var url = this.$api_add + "/getoffers";
            axios.post(url, [], { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                if (response.data.type = "result" && response.data.result == "ok" && response.data.message.length > 0) {
                    this.products = response.data.message;
                    this.currentProducts = response.data.message;
                    this.appliedFilter = response.data.appliedFilter || {};
                    this.filter = response.data.filtered === true;

                    this.refreshFilters();
                }
            });
        },
        getOffers() {
            this.getProducts();
        },
        refreshFilters() {
            this.filtersData = [];
            let locale = this.i18n.global.locale.value
            //const materialTypes = this.$i18n.messages[this.$i18n.locale].material.type;
            const materialTypes = this.i18n.global.messages.value[locale].material.type

            if (typeof materialTypes === 'object' && !Array.isArray(materialTypes)) {
                Object.entries(materialTypes).forEach(([key, value]) => {
                    const normalized = value.toLowerCase().replace(/\s+/g, '');
                    const isSelected = !!this.appliedFilter[normalized];
                    this.filtersData.push({ label: value, value: key, checked: isSelected });
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

.top-parts {
    display: flex;
    align-items: center;
    gap: 4.5rem;
    flex-wrap: wrap;
    margin-top: 16px;
}

#addOffer {
    width: 100%;
}

ion-button {
    --border-radius: 10px;
}

.filter-note {
    background: rgba(255, 255, 0, 0.2);
    border: 1px solid #f1c40f;
    padding: 1rem 1rem;
    border-radius: 5px;
    font-size: 1rem;
    color: var(--color);
    display: flex;
    align-items: center;
    margin: auto;
    margin-bottom: 5px;
}

.close-icon {
    font-size: 1.5rem;
    color: var(--color);
    cursor: pointer;
    margin-left: 10px;
    justify-content: center;
}

.advanced-filter-modal {
    padding: 2rem;
    background: #ffffff;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 250px;
    align-items: stretch;
    color: black;
}

.advanced-filter-btn {
    margin-left: auto;
}
</style>
