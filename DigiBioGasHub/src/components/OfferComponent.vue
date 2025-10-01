<template>
    <ion-card class="offer-card">
        <ion-img :src="getImageSource(offer)" class="offer-img" />

        <ion-card-header>
            <ion-card-subtitle class="offer-subtitle">
                {{ getOfferTypeTranslation(offer.type) }} - {{ getOfferCategoryTranslation(offer.category) }}
            </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            <div class="offer-detail">
                <p><strong>{{ $t('product.productDetails.description') }}:</strong> {{ offer.description }}</p>
                <p><strong>{{ $t('product.logistic.type') }}:</strong> {{ getCargoTypeTranslation(offer.cargoType) }}
                </p>
                <p><strong>{{ $t('product.productDetails.location') }}:</strong> <span @click="goToMap(offer)"
                        class="location-link clickable">
                        {{ parseLocation(offer.Locations) }}
                    </span>
                </p>
                <p><strong>{{ $t('product.productDetails.amount') }}:</strong> {{ offer.availableAmount }} {{
                    getUnitAmountTranslation(offer.unit) }}</p>
                <p><strong>{{ $t('product.productDetails.price') }}:</strong> {{ offer.price }} €</p>
                <p v-if="certificates.length > 0"><strong>{{ $t('admin.certificate.certificates') }}:</strong></p>
                <ul v-if="certificates.length > 0">
                    <li v-for="(certificate, index) in certificates" :key="index">
                        {{ certificate.CompanyCertificate.name }} - {{ certificate.CompanyCertificate.description }}
                    </li>
                </ul>
            </div>
        </ion-card-content>

        <ion-button id="buyOffer" expand="block" class="buy-button">
            {{ $t('product.buy') }}
        </ion-button>

        <ion-button id="contactSeller" expand="block" class="buy-button">
            {{ $t('product.contactSeller') }}
        </ion-button>
    </ion-card>

    <ion-modal id="buyOfferModal" trigger="buyOffer">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('product.buy') }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button id="closeModal" @click="modalController.dismiss()">
                        <ion-icon name="close"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
            <OfferBuyComponent :offer="offer" @updateOffers="updateOffers" />
        </ion-header>
    </ion-modal>

    <ion-modal id="contactSellerModal" trigger="contactSeller">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('product.contactSeller') }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button id="closeModal" @click="modalController.dismiss()">
                        <ion-icon name="close"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <form @submit.prevent="submitContactForm">
                <ion-item>
                    <ion-label position="stacked">
                        {{ $t('product.user.emailOrPhone') }} <span style="color:red">*</span>
                    </ion-label>
                    <ion-input v-model="contactForm.contact" required
                        :placeholder="$t('product.user.emailOrPhonePlaceholder')" />
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">
                        {{ $t('product.user.message') }} <span style="color:red">*</span>
                    </ion-label>
                    <ion-textarea v-model="contactForm.message" required
                        :placeholder="$t('product.user.messagePlaceholder')" />
                </ion-item>
                <ion-button expand="block" type="submit"
                    :disabled="!contactForm.contact.trim() || !contactForm.message.trim()">
                    {{ $t('chat.send') }}
                </ion-button>
            </form>
        </ion-content>

    </ion-modal>

    <ToastComponent ref="toastComponent" />

</template>

<script>
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    modalController,
    IonIcon,
    IonButtons,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea
} from '@ionic/vue'
import { defineComponent } from 'vue'
import OfferBuyComponent from './OfferBuyComponent.vue'
import axios from 'axios';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import ToastComponent from './ToastComponent.vue';
addIcons({ close });

export default defineComponent({
    name: 'OfferComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonImg,
        IonButtons,
        IonButton,
        IonModal,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonItem,
        IonLabel,
        IonInput,
        IonTextarea,
        IonIcon,
        OfferBuyComponent,
        modalController,
        ToastComponent
    },
    props: {
        offer: {
            type: Object,
            required: true,
        },
        certificates: {
            type: Array,
            required: false,
        }
    },
    data() {
        return {
            modalController: modalController,

            contactForm: {
                contact: '',
                message: ''
            }
        }
    },
    emits: ['updateOffers', 'close'],
    mounted() {
    },
    methods: {
        getOfferTypeTranslation(type) {
            if (type == null || type == undefined) {
                return "";
            }
            else {
                return this.$t(`product.typenum.${type}`);
            }
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
        getOfferCategoryTranslation(category) {
            if (category == null || category == undefined) {
                return "";
            }
            else {
                return this.$t(`material.type.${category}`);
            }
        },
        getImageSource(o) {
            if (o != null && o.fileLink != null && o.fileLink != undefined && o.fileLink != "") {
                return o.fileLink;
            }
            else if (o != null && o.Material != null) {
                return this.$t('material.placeholder.' + o.Material.type);
            }
            else {
                return "";
            }
        },
        getCargoTypeTranslation(cargoType) {
            if (cargoType == null || cargoType == undefined) {
                return "";
            }
            else {
                return this.$t(`product.logisticType.${cargoType}`);
            }
        },
        getUnitAmountTranslation(type) {
            if (type == null || type == undefined) {
                return "";
            }
            else {
                return this.$t(`unit.amount.${type}`);
            }
        },
        parseLocation(locations) {
            if (locations && locations.length > 0) {
                return locations.map(location => `${location.address}, ${location.city}, ${location.zipcode}`).join(', ');
            }
            return '';
        },
        updateOffers() {
            this.$emit('updateOffers');
        },
        goToMap(offer) {
            const loc = offer?.Locations?.[0];
            if (loc?.latitude && loc?.longitude) {
                this.$router.push({
                    path: '/map',
                    query: {
                        lat: loc.latitude,
                        lng: loc.longitude,
                        name: offer.description || 'Selected Location',
                        type: 'Offer',
                        info: `${loc.address}, ${loc.city}`,
                    }
                });
                this.$emit('close');
            } else {
                console.warn('Location coordinates not found');
            }
        },
        async submitContactForm() {
            const contact = this.contactForm.contact.trim();
            const message = this.contactForm.message.trim();

            if (!contact || !message) {
                return;
            }

            const payload = {
                toCompanyId: this.offer.Company.id,
                toCompanyName: this.offer.Company.name,
                toEmail: this.offer.Company.email,
                contact: contact,
                message: message,
                offerId: this.offer.id
            };

            try {
                let url = this.$api_add + `/offer/contact-seller`;
                const response = await axios.post(url, { payload }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });

                if (response.data.type == "result" && response.data.result == "ok") {
                    this.$refs.toastComponent.showToast(this.$t('product.messageSent'), 4000, 'success');

                } else {
                    this.$refs.toastComponent.showToast(this.$t('product.messageSendError'), 4000, 'danger');
                    return false;
                }
            } catch (error) {
                this.$refs.toastComponent.showToast(this.$t('product.messageSendError'), 4000, 'danger');
                return false;
            }

            this.contactForm.contact = '';
            this.contactForm.message = '';
            this.modalController.dismiss();
        }
    },
});
</script>

<style scoped>
ion-card {
    margin: 1rem;
}

ion-img {
    width: 100%;
    height: auto;
}

.location-link.clickable {
    color: var(--ion-color-primary);
    cursor: pointer;
    text-decoration: underline;
}

.offer-card {
    margin: 1rem;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.offer-card:hover {
    transform: translateY(-5px);
}

.offer-img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    object-position: center;
}

.offer-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.offer-subtitle {
    font-size: 1rem;
}

.offer-detail p {
    margin: 0.25rem 0;
    font-size: 0.95rem;
}

.buy-button {
    margin: 1rem;
    font-weight: bold;
    --background: #3880ff;
    --color: white;
    border-radius: 0.75rem;
}
</style>
