<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('general.auction') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="auction-container">
                <h2>{{ product.name }}</h2>
                <p>{{$t('forms.auction.currentBid')+ ": "+ currentBid }}</p>
                <ion-input ref="bid" :helper-text="$t('forms.helper.auctionBid')" :error-text="$t('forms.error.auctionBid')" @ionTouched="markTouched" @ionInput="validateBid" v-model="newBid" :placeholder="$t('forms.auction.bidPlaceholder')"></ion-input>
                <ion-button @click="placeBid">{{ $t('forms.auction.placeBid') }}</ion-button>
                <ion-list>
                    <ion-item v-for="bid in bids" :key="bid.id">
                        {{ bid.amount }} by {{ bid.user }}
                    </ion-item>
                </ion-list>
            </div>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonList, IonItem } from '@ionic/vue';

export default {
    name: 'AuctionComponent',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonInput,
        IonButton,
        IonList,
        IonItem
    },
    data() {
        return {
            product: {
                name: 'Sample Product'
            },
            currentBid: 100,
            newBid: '',
            bids: [
                { id: 1, amount: 100, user: 'User1' }
            ]
        };
    },
    methods: {
        placeBid() {
            if (this.newBid > this.currentBid) {
                this.currentBid = this.newBid;
                this.bids.push({ id: this.bids.length + 1, amount: this.newBid, user: 'You' });
                this.newBid = '';
            } else {
                alert('Bid must be higher than the current bid');
            }
        },
        validateBid(ev){
            if (ev.target.value > 0 && ev.target.value > this.currentBid) {
                this.$refs.bid.$el.classList.remove('ion-invalid');
                this.$refs.bid.$el.classList.add('ion-valid');
            } else {
                this.$refs.bid.$el.classList.remove('ion-valid');
                this.$refs.bid.$el.classList.add('ion-invalid');
            }
        },
        markTouched(){
            this.$refs.bid.$el.classList.add('ion-touched');
        }
    }
};
</script>

<style scoped>
.auction-container {
    padding: 16px;
}
</style>