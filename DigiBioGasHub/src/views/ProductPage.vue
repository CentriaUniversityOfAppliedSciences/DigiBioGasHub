<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <ion-button id="addOffer">{{ $t('productPage.offerButton') }}
            </ion-button>
            <OfferComponent />
        </ion-content>
        <FooterComponent />
        <ion-modal id="addOfferModal" trigger="addOffer">
            <ion-header>
                <ion-toolbar>
                    <ion-title>{{ $t('productPage.addOffer') }}</ion-title>
                    <ion-button id="closeModal" slot="end" @click="modalController.dismiss()">{{ $t('menu.close') }}</ion-button>
                </ion-toolbar>
            </ion-header>
            <AddOfferComponent />
        </ion-modal>
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import OfferComponent from '../components/OfferComponent.vue'
import AddOfferComponent from '../components/AddOfferComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import {IonPage, IonContent, IonButton, IonModal, modalController, IonHeader, IonToolbar, IonTitle} from '@ionic/vue'

export default defineComponent ({
    name: 'ProductPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, OfferComponent, IonButton, IonModal, AddOfferComponent, IonHeader, IonToolbar, IonTitle},
    setup() {
        return { modalController
        }
    }
})
</script>