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

        <ion-content>

            <div v-if="subscriptions.length === 0" style="max-width: 90rem; margin: auto;">
                <ion-button @click="manageSubscription"> {{ $t('premium.manageSubscription') }} </ion-button>
                <ion-card>
                    <ion-card-content>
                        <p>{{ $t('premium.noActiveSubscription') }}</p>
                    </ion-card-content>
                </ion-card>
            </div>

            <div v-else style="max-width: 90rem; margin: auto;">
                <ion-button @click="manageSubscription"> {{ $t('premium.manageSubscription') }} </ion-button>
                <ion-card v-for="(sub, idx) in subscriptions" :key="sub.id">
                    <ion-card-content>
                        <ion-card-title>
                            {{ $t('premium.currentPlan') }}<span v-if="subscriptions.length > 1"> #{{ idx + 1
                                }}</span>
                        </ion-card-title>
                        <p>{{ $t('premium.startDate') }}: {{ sub.subscriptionDate }}</p>
                        <p>{{ $t('premium.status') }}: {{ sub.status }}</p>
                        <p>{{ $t('premium.endDate') }}: {{ sub.expirationDate }}</p>
                        <ion-button color="danger" @click="confirmCancelSubscription(sub.id)">
                            {{ $t('premium.cancelSubscription') }}
                        </ion-button>
                    </ion-card-content>
                </ion-card>
            </div>

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

            <ToastComponent ref="toastComponent" />
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
import ToastComponent from '../components/ToastComponent.vue';
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
        ToastComponent,
        FooterComponent
    },
    data() {
        return {
            subscriptions: [],
            showSubscriptionCancelAlert: false,
            subscriptionToCancel: null,
        };
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
        manageSubscription() {
            this.$router.push({ name: 'ManageSubscription' });
        },
        confirmCancelSubscription(id) {
            this.subscriptionToCancel = id;
            this.showSubscriptionCancelAlert = true;
        },

        async cancelSubscription() {
            if (!this.subscriptionToCancel) return;
            try {
                const response = await axios.post(this.$api_add + '/subscription/cancel', { subscriptionID: this.subscriptionToCancel }, { headers: { authorization: localStorage.getItem('token') }, withCredentials: false },);
                if (response.data.result === 'ok') {
                    this.subscriptions = this.subscriptions.filter(sub => sub.id !== this.subscriptionToCancel);
                     this.$refs.toastComponent.showToast(this.$t('premium.cancelSubscriptionSuccess'), 2000, 'success');
                } else {
                    this.$refs.toastComponent.showToast(this.$t('premium.cancelSubscriptionFail'), 2000, 'danger');
                }
            } catch (error) {
                this.$refs.toastComponent.showToast(this.$t('premium.cancelSubscriptionFail'), 2000, 'danger');
            } finally {
                this.showSubscriptionCancelAlert = false;
                this.subscriptionToCancel = null;
            }
        },
    },
    async mounted() {
        try {
            const response = await axios.get(this.$api_add + '/subscription/me', { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
            if (response.data.result === 'ok') {
                this.subscriptions = response.data.message;
            }
        } catch (error) {
            console.error('Error fetching current plan:', error);
        }
    }
});
</script>

<style scoped>
ion-button{
    --margin:auto;
    --display: block;
    --max-width: 90rem;
}
</style>
