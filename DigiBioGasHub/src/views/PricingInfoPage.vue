<template>
    <ion-page>
        <NavBarComponent />
        <ion-content class="ion-padding" :fullscreen="true" >

            <div class="title">
                {{ $t('pricing.choosePlan') }}
            </div>

            <div class="subscription-container">
                <ion-card class="subscription-card free">
                    <ion-card-header>
                        <ion-card-title>{{ $t('pricing.free') }}</ion-card-title>
                        <ion-card-subtitle>{{ $t('pricing.freePrice') }}</ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <ul>
                            <li>{{ $t('pricing.basicFeatures') }}</li>
                            <li>{{ $t('pricing.limitedSupport') }}</li>
                            <li>{{ $t('pricing.communityAccess') }}</li>
                        </ul>
                        <ion-button expand="block" v-if="!isLoggedIn" @click="joinForFree">{{ $t('pricing.joinFree')
                        }}</ion-button>
                    </ion-card-content>
                </ion-card>

                <ion-card class="subscription-card premium">
                    <ion-card-header>
                        <ion-card-title>{{ $t('pricing.premium3Title') }}</ion-card-title>
                        <ion-card-subtitle>{{ $t('pricing.premium3Price') }}</ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <ul>
                            <li>{{ $t('pricing.allFreeFeatures') }}</li>
                            <li>{{ $t('pricing.prioritySupport') }}</li>
                            <li>{{ $t('pricing.advancedAnalytics') }}</li>
                            <li>{{ $t('pricing.earlyAccess') }}</li>
                        </ul>
                        <ion-button expand="block" color="success" @click="subscribe(3)">
                            {{ $t('pricing.choose3Months') }}
                        </ion-button>
                    </ion-card-content>
                </ion-card>

                <ion-card class="subscription-card premium">
                    <ion-card-header>
                        <ion-card-title>{{ $t('pricing.premium6Title') }}</ion-card-title>
                        <ion-card-subtitle>{{ $t('pricing.premium6Price') }}</ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                        <ul>
                            <li>{{ $t('pricing.allFreeFeatures') }}</li>
                            <li>{{ $t('pricing.prioritySupport') }}</li>
                            <li>{{ $t('pricing.advancedAnalytics') }}</li>
                            <li>{{ $t('pricing.earlyAccess') }}</li>
                            <li class="save-badge">{{ $t('pricing.saveUpTo', { percent: 15 }) }}</li>
                        </ul>
                        <ion-button expand="block" color="success" @click="subscribe(6)">
                            {{ $t('pricing.choose6Months') }}
                        </ion-button>
                    </ion-card-content>
                </ion-card>

                <div class="premium-container-recommended">
                    <div class="recommended-badge">{{ $t('pricing.recommended') }}</div>
                    <ion-card class="subscription-card premium">
                        <ion-card-header>
                            <ion-card-title>{{ $t('pricing.premium12Title') }}</ion-card-title>
                            <ion-card-subtitle>{{ $t('pricing.premium12Price') }}</ion-card-subtitle>

                        </ion-card-header>
                        <ion-card-content>
                            <ul>
                                <li>{{ $t('pricing.allFreeFeatures') }}</li>
                                <li>{{ $t('pricing.prioritySupport') }}</li>
                                <li>{{ $t('pricing.advancedAnalytics') }}</li>
                                <li>{{ $t('pricing.earlyAccess') }}</li>
                                <li class="save-badge">{{ $t('pricing.saveUpTo', { percent: 40 }) }}</li>
                            </ul>
                            <ion-button expand="block" color="success" @click="subscribe(12)">
                                {{ $t('pricing.choose12Months') }}
                            </ion-button>
                        </ion-card-content>
                    </ion-card>
                </div>

            </div>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { defineComponent } from 'vue';
import axios from 'axios';
export default defineComponent({
    name: 'PriceInfoPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonButton,
        NavBarComponent,
        FooterComponent
    },
    data() {
        return {
            token: localStorage.getItem('token'),
            isLoggedIn: !!localStorage.getItem('token'),
            plans: [
                { months: 3, price: 9.99 },
                { months: 6, price: 16.99 },
                { months: 12, price: 23.99 }
            ]
        };
    },
    methods: {
        joinForFree() {
            this.$router.push({ name: 'Login' });
        },

        async subscribe(months) {
            if (!this.token) {
                this.$router.push({
                    name: 'Login',
                    query: { redirect: '/pricing' }
                });
                return;
            }
            try {
                const response = await axios.post(this.$api_add + '/payment/create-checkout-session', { months }, { headers: { 'authorization': this.token } });
                if (response.data?.url) {
                    window.location.href = response.data.url;
                }
            } catch (error) {
                console.error('Checkout error:', error);
                this.$toast?.('Something went wrong, please try again.');
            }
        }
    },
});
</script>

<style scoped>
.title {
    font-size: 2.5rem;
    font-weight: bold;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
}

.subscription-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 5rem;
}

.subscription-card {
    width: 320px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    border-radius: 18px;
    transition: transform 0.2s;
}

.subscription-card.free {
    border: 2px solid #3880ff;
}

.premium-container-recommended {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
    border-radius: 18px;
    transition: transform 0.2s;
    background-color: #0cc74a;
    margin-top: -27px;
}

.subscription-card.premium {
    border: 2px solid #10dc60;
}

.recommended-badge {
    color: #fff;
    font-size: 0.9rem;
    font-weight: 700;
    padding-top: 0.5em;
    border-radius: 18px;
    text-align: center;
    z-index: 10;
    text-transform: uppercase;
}

ion-card-title {
    font-size: 1.6rem;
    font-weight: 700;
}

ion-card-subtitle {
    font-size: 1.1rem;
    color: var(--ion-color-dark);
}

ul {
    padding-left: 1.2rem;
    margin-bottom: 1.2rem;
}

li {
    margin-bottom: 0.5rem;
    font-size: 1rem;
}

.save-badge {
    background: #ffd600;
    color: #222;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 0.3em 0.8em;
    border-radius: 12px;
    display: inline-block;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}
</style>
