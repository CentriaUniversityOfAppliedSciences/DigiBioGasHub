<template>
    <ion-page>
        <ion-content>
            <ion-card class="profile-card">
                <ion-card-header>
                    <ion-card-title>{{ $t('menu.profile')}}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item>
                            <ion-label>{{$t('account.name')}}</ion-label>
                            <ion-text>{{ user.name }}</ion-text>
                        </ion-item>
                        <ion-item>
                            <ion-label>{{$t('account.email')}}</ion-label>
                            <ion-text>{{ user.email }}</ion-text>
                        </ion-item>
                        <ion-item>
                            <ion-label>{{$t('account.phone')}}</ion-label>
                            <ion-text>{{ user.phone }}</ion-text>
                        </ion-item>
                        <ion-item>
                            <ion-label>{{ $t('account.address') }}</ion-label>
                            <ion-text>{{ user.address }}</ion-text>
                        </ion-item>
                        <ion-item>
                            <ion-label>{{$t('account.company')}}</ion-label>
                            <ion-text>{{ user.company }}</ion-text>
                        </ion-item>
                        <ion-item>
                            <ion-label>{{$t('account.role')}}</ion-label>
                            <ion-text>{{ user.role }}</ion-text>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
            <ion-card class="profile-card">
                <ion-card-header>
                    <ion-card-title>{{ $t('menu.offers')}}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item v-for="offer in offers" :key="offer.id">
                            <ion-label>{{ offer.name }}</ion-label>
                        </ion-item>
                    </ion-list>
                    <ion-button id="addOffer">{{ $t('offers.addOffer') }}</ion-button>
                </ion-card-content>
            </ion-card>
            <ion-card class="profile-card">
                <ion-card-header>
                    <ion-card-title>{{ $t('menu.company')}}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item v-for="company in companies" :key="company.id">
                            <ion-label>{{ company.name }}</ion-label>
                        </ion-item>
                    </ion-list>
                    <ion-button id="addCompany">{{ $t('company.addCompany') }}</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>
        <ion-modal trigger="addOffer">
            <ion-header>
                <ion-toolbar>
                    <ion-title>{{ $t('offers.addOffer') }}</ion-title>

                        <ion-button slot="end" @click="modalController.dismiss()">{{ $t('general.close') }}</ion-button>

                </ion-toolbar>
                </ion-header>   
            <AddOfferComponent />
        </ion-modal>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText, IonButton, IonModal, modalController } from '@ionic/vue';
import AddOfferComponent from './AddOfferComponent.vue';

export default defineComponent({
    name: 'ProfileComponent',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonList,
        IonItem,
        IonLabel,
        IonText,
        IonButton,
        AddOfferComponent,
        IonModal
    },
    setup() {
        return { modalController };
    },
    props: {
        user: {
            name: String,
            email: String,
            phone: String,
            address: String,
            company: String,
            role: String,
            
            
        },
        offers: {
            type: Array,
            required: true
        },
        company:{
            type: Array,
            required: true
        }
    },
    data() {
        return {
            
        };
    }
});
</script>

<style scoped>
ion-card {
    margin: 20px;
}
.profile-card {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 15px;
}
</style>