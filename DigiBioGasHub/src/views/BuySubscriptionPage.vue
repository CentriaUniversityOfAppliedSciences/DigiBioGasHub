<template>
    <ion-page>
        <NavBarComponent />
        <ion-toolbar color="primary">
            <ion-title style="text-align: center;">{{ $t('premium.buy.buySubscription') }}</ion-title>
        </ion-toolbar>
        <ion-content :fullscreen="true" class="ion-padding">
            <div class="card-container">
            <ion-grid>
                <ion-row class="ion-justify-content-center" :gutter="true">
                    <ion-col size="12" size-sm="6" size-md="4" v-for="(plan, index) in plans" :key="index">
                        <ion-card class="subscription-card">
                            <div class="card-content-wrapper">
                                <ion-card-header>
                                    <ion-card-title>
                                        {{ $t('premium.buy.months', { months: plan.months }) }}
                                    </ion-card-title>
                                    <ion-card-subtitle>
                                        {{ $t('premium.buy.price', { price: plan.price }) }}
                                    </ion-card-subtitle>
                                </ion-card-header>

                                <ion-card-content>
                                    <ion-list lines="none">
                                        <ion-item>
                                            <ion-icon :icon="checkmarkOutline" slot="start" color="success"></ion-icon>
                                            <ion-label>{{ $t('premium.buy.accessFutureOffers') }}</ion-label>
                                        </ion-item>
                                    </ion-list>
                                </ion-card-content>
                            </div>
                            <ion-card-content>
                                <ion-button expand="block" color="primary" @click="subscribe(plan)">
                                    {{ $t('premium.buy.buy') }} {{ $t('premium.buy.months', { months: plan.months }) }}
                                </ion-button>
                            </ion-card-content>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
            </div>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/vue';
import { checkmarkOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import axios from 'axios';

export default defineComponent({
    name: 'BuySubscription',
    components: {
        IonPage,
        NavBarComponent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonList,
        IonItem,
        IonIcon,
        IonLabel,
        IonButton,
        FooterComponent
    },
    data() {
        return {
            checkmarkOutline,
            plans: [
                { months: 3, price: 9.99 },
                { months: 6, price: 16.99 },
                { months: 12, price: 23.99 }
            ]
        };
    },
    methods: {
        async subscribe(plan) {
            try {
                const response = await axios.post(this.$api_add +'/payment/create-checkout-session', { months: plan.months }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });

                if (response.data?.url) {
                    window.location.href = response.data.url;
                }
            } catch (error) {
                console.error('Checkout error:', error);
                this.$toast?.('Something went wrong, please try again.');
            }
        }
    }
});
</script>

<style scoped>

.card-container {
    max-width: 90rem;
    margin: auto;
}

.subscription-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 220px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.subscription-card:hover {
  transform: scale(1.02);
}

.card-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

ion-card-title {
  font-size: 1.4rem;
}

ion-card-subtitle {
  font-size: 1.2rem;
  color: var(--ion-color-medium);
}

</style>
