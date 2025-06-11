<template>
    <ion-card>
        <ion-card-header>
            <ion-img :src="checkFileLink()" alt="Material Image"
                style="width: 100%; height: 200px; object-fit: fit-content;"></ion-img>
            <ion-card-title>{{ product.Material.name }}</ion-card-title>
            <ion-card-subtitle> {{ getMaterialTypeTranslation(product.Material.type) }}</ion-card-subtitle>

        </ion-card-header>
        <ion-card-content>
            <p>{{ product.Material.description }}</p>
            <p>{{ product.description }}</p>
            <ion-item>
                <ion-label>{{ $t('product.productDetails.price') }}: {{ product.price }} €</ion-label>
            </ion-item>
            <ion-item>
                <ion-label>{{ $t('product.productDetails.amount') }}: {{ product.availableAmount }} {{
                    getUnitAmountTranslation(product.unit) }}</ion-label>
            </ion-item>
            <ion-item>
                <ion-button v-if="isMarketplace" expand="full" @click="openModal">{{
                    $t('product.openlink') }}</ion-button>
                <ion-button v-if="isCompanyParent" expand="full" @click="openEdit(product.id)">{{ $t('menu.edit')
                    }}</ion-button>
                <ion-button v-if="isCompanyParent" expand="full" color="danger" @click="deleteOffer(product.id)">{{
                    $t('menu.delete') }}</ion-button>
                <ion-button v-if="isCompanyParent" expand="full" color="success" @click="contractHistory(product.id)">{{
                    $t('product.contract_history') }}</ion-button>
            </ion-item>
        </ion-card-content>
    </ion-card>

    <ion-modal :is-open="isModalOpen" @didDismiss="closeModal">
        <OfferPage :productId="product.id" @close="closeModal" />
    </ion-modal>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, IonButton, IonImg, IonAlert, alertController, IonModal } from '@ionic/vue';
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
ion-card {
    margin: 20px;
}
</style>
