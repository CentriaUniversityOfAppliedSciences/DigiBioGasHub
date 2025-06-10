<template>
    <div>
        <ion-content class="main-content">
            <OfferComponent :offer="offers" @updateOffers="updateOffers" />
        </ion-content>
        <ion-button expand="full" @click="$emit('close')">{{ $t('menu.close') }}</ion-button>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { IonPage, IonContent, IonButton } from '@ionic/vue'
import OfferComponent from '../components/OfferComponent.vue';
import axios from 'axios';

export default defineComponent({
    name: 'OfferPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, OfferComponent, IonButton },
    props: {
        productId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            offers: {}
        }

    },
    methods: {
        getOffer() {
            axios.post(this.$api_add + '/getoffersbyid', { id: this.productId }).then(response => {
                this.offers = response.data.message;
            });
        },
        updateOffers() {
            this.getOffer();
            this.$emit('updateOffers');
        }
    },
    mounted() {
        this.getOffer();
    }
})
</script>
<style scoped>
.main-content {
    min-height: 75vh;
}
</style>
