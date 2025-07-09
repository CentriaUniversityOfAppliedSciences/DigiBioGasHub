<template>
    <ion-page>
        <NavBarComponent />
        <ion-toolbar>
            <ion-title>{{ $t('premium.title') }}</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="goBack">
                    <ion-icon name="arrow-back"></ion-icon>
                </ion-button>
            </ion-buttons>
        </ion-toolbar>

        <ion-content style="max-width: 90rem; align-self: center;">
            <ion-card>
                <ion-card-content>
                     <ion-card-title>{{ $t('premium.currentPlan') }}</ion-card-title>
                    <div v-if="subscriptionDetails">
                        <p>{{ $t('premium.startDate') }}: {{ subscriptionDetails.subscriptionDate }}</p>
                        <p>{{ $t('premium.status') }}: {{ subscriptionDetails.status }}</p>
                        <p>{{ $t('premium.endDate') }}: {{ subscriptionDetails.expirationDate }}</p>
                    </div>
                    <div v-else>
                        <p>{{ $t('premium.noActiveSubscription') }}</p>
                    </div>
                </ion-card-content>
            </ion-card>

            <ion-button @click="manageSubscription">
                {{ $t('premium.manageSubscription') }}
            </ion-button>
            <ion-button color="danger" @click="confirmCancelSubscription">
                {{ $t('premium.cancelSubscription') }}
            </ion-button>

            <ion-alert :is-open="showSubscriptionCancelAlert" :header="$t('premium.cancelSubscription')"
                :message="$t('premium.cancelSubscriptionConfirm')" :buttons="[
                    {
                        text: $t('general.cancel'),
                        role: 'cancel',
                        handler: () => {
                            this.showSubscriptionCancelAlert = false;
                        }
                    },
                    {
                        text: $t('general.confirm'),
                        handler: () => {
                            this.cancelSubscription();
                        }
                    }
                ]"></ion-alert>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons, IonIcon, IonAlert } from '@ionic/vue';
import FooterComponent from '../components/FooterComponent.vue';
import axios from 'axios';
import NavBarComponent from '../components/NavBarComponent.vue';
export default defineComponent({
    name: 'SubscriptionPage',
    components: {
        NavBarComponent,
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonButton,
        IonButtons,
        IonIcon,
        IonAlert,
        FooterComponent
    },
    data() {
        return {
            subscriptionDetails: null,
            showSubscriptionCancelAlert: false
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        manageSubscription() {
            this.$router.push({ name: 'ManageSubscription' });
        },
        confirmCancelSubscription() {
            this.showSubscriptionCancelAlert = true;
        },

        async cancelSubscription() {
            try {
                const response = await axios.post(this.$api_add + '/subscription/cancel');
                if (response.data.result === 'ok') {
                    this.subscriptionDetails = null;
                    this.$toast.show(this.$t('premium.cancelSuccess'));
                    this.showSubscriptionCancelAlert = false;
                } else {
                    this.$toast.show(this.$t('premium.cancelError'));
                    this.showSubscriptionCancelAlert = false;
                }
            } catch (error) {
                console.error('Error cancelling premium:', error);
                this.$toast.show(this.$t('premium.cancelError'));
            }
        },
    },
    async mounted() {
        try {
            const response = await axios.get(this.$api_add + '/subscription/me');
            if (response.data.result === 'ok') {
                this.subscriptionDetails = response.data.message;
            }
        } catch (error) {
            console.error('Error fetching current plan:', error);
        }
    }
});
</script>

<style scoped>
.subscriptionPage {
    max-width: 90rem;
}
</style>
