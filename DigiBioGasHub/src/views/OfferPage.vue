<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>{{ $t('filter.offer') }}</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="$emit('close')">
                    <ion-icon name="close"></ion-icon>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <OfferComponent :offer="offers" :certificates="companyCertificates" @updateOffers="updateOffers"
            @close="$emit('close')" />
    </ion-content>
</template>
<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { IonContent, IonButton, IonHeader, IonToolbar, IonButtons, IonIcon, IonTitle } from '@ionic/vue'
import OfferComponent from '../components/OfferComponent.vue';
import axios from 'axios';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
addIcons({ close });

export default defineComponent({
    name: 'OfferPage',
    components: {
        NavBarComponent,
        FooterComponent,
        IonContent,
        OfferComponent,
        IonButton,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonIcon
    },
    props: {
        productId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            offers: {},
            companyCertificates: [],
        }

    },
    emits: ['updateOffers', 'close'],
    methods: {
        getOffer() {
            axios.post(this.$api_add + '/getoffersbyid', { id: this.productId }).then(response => {
                this.offers = response.data.message;
            });
        },
        getCertificates() {
            axios.post(this.$api_add + '/getOfferCertificate', { offerID: this.productId }).then(response => {
                this.companyCertificates = response.data.message;
            });
        },
        updateOffers() {
            this.getOffer();
            this.$emit('updateOffers');
        }
    },
    mounted() {
        this.getOffer();
        this.getCertificates();
    }
})
</script>
