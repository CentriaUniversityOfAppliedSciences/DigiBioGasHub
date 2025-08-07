<template>
    <ion-card class="offer-card">
        <ion-img class="offer-thumbnail" :src="checkFileLink()" alt="Product Image" />

        <ion-card-content class="offer-content">
            <ion-text class="offer-title">
                <h2>{{ product.Material.name }}</h2>
            </ion-text>

            <ion-text class="offer-subtitle">
                <small>{{ $t('product.productDetails.type') }}: {{ getMaterialTypeTranslation(product.Material.type) }}</small>
            </ion-text>

            <ion-text class="offer-description">
                <p>{{ product.description }}</p>
            </ion-text>

            <ion-text class="offer-meta">
                <ion-label>{{ $t('product.productDetails.price') }}: {{ product.price }} €</ion-label>
                <ion-label>{{ $t('product.productDetails.amount') }}: {{ product.availableAmount }} {{
                    getUnitAmountTranslation(product.unit) }}</ion-label>
            </ion-text>
            <ion-item>
                <ion-button v-if="isMarketplace" fill="clear" size="small" @click="openModal">{{
                    $t('product.openlink') }}</ion-button>
                <ion-button v-if="isCompanyParent" fill="clear" size="small" @click="openEdit(product.id)">{{
                    $t('menu.edit')
                    }}</ion-button>
                <ion-button v-if="isCompanyParent" fill="clear" size="small" color="danger"
                    @click="deleteOffer(product.id)">{{
                        $t('menu.delete') }}</ion-button>
                <ion-button v-if="isCompanyParent" fill="clear" size="small" color="success"
                    @click="contractHistory(product.id)">{{
                        $t('product.contract_history') }}</ion-button>
            </ion-item>
        </ion-card-content>
    </ion-card>

    <ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
        <OfferPage :productId="product.id" @close="closeModal" @updateOffers="updateOffers" />
    </ion-modal>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonButton, IonImg, IonAlert, alertController, IonModal, IonText } from '@ionic/vue';
import axios from 'axios';
import OfferPage from '../views/OfferPage.vue';
export default {
    name: 'ListingComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonItem,
        IonLabel,
        IonText,
        IonButton,
        IonImg,
        IonAlert,
        OfferPage,
        IonModal,
        alertController
    },
    props: {
        product: {
            type: Object,
            required: true
        },
        isMarketplace: {
            type: Boolean,
            default: false
        },
        isCompanyParent: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isModalOpen: false
        };
    },
    emits: ['updateOffers'],
    mounted() {
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
        closeModal() {
            this.isModalOpen = false;
        },
        checkFileLink() {
            if (this.product.fileLink == null || this.product.fileLink == undefined || this.product.fileLink == "") {
                return this.$t('material.placeholder.' + this.product.Material.type);
            } else {
                return this.product.fileLink;
            }
        },
        updateOffers() {
            this.$emit('updateOffers');
        },
        getMaterialTypeTranslation(type) {
            return this.$t(`material.type.${type}`);
        },
        getUnitAmountTranslation(type) {
            return this.$t(`unit.amount.${type}`);
        },
        openEdit(id) {
            this.$router.push({ name: 'CompanyEditOffer', params: { id: id } });
        },
        async deleteOffer(id) {
            const alert = await alertController.create({
                header: this.$t('menu.delete'),
                message: this.$t('menu.are_you_sure'),
                buttons: [
                    {
                        text: this.$t('menu.cancel'),
                        role: 'cancel'
                    },
                    {
                        text: this.$t('menu.yes'),
                        handler: () => {
                            var url = this.$api_add + "/deleteoffer";
                            axios.post(url, { "id": id }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                                if (response.data.type = "result" && response.data.result == "ok") {
                                    this.$router.push('/company/', {});
                                }
                            });
                        }
                    }
                ]
            });
            await alert.present();
        },
        contractHistory(id) {
            this.$router.push({ name: 'ContractHistory', params: { id: id } });
        }
    }
}
</script>

<style scoped>
.offer-card {
    max-width: 310px;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    transition: max-width 0.3s ease;
}

.offer-thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    background-color: #f1f1f1;
}

.offer-content {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.offer-title h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: var(--ion-color-light-contrast);
    max-height: 2.4em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}

.offer-subtitle small {
    font-size: 1rem;
    color: var(--ion-color-medium-tint);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
}

.offer-description p {
    font-size: 0.95rem;
    color: var(--ion-color-medium-tint);
    line-height: 1.4;
    max-height: 2.8em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    text-overflow: ellipsis;
    margin: 0;
}

.offer-meta ion-label {
    font-size: 1rem;
    color: var(--ion-color-light-contrast);
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

ion-item {
    --padding-start: 0;
    --inner-border-width: 0;
}

@media (max-width: 480px) {
  .offer-card {
    max-width: 260px;
  }
}

@media (min-width: 1280px) {
  .offer-card {
    max-width: 340px;
  }
}

@media (min-width: 1536px) {
  .offer-card {
    max-width: 650px;
  }
}

</style>
