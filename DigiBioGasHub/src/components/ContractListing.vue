<template>
    <ion-card>
        <ion-card-content>
            <ion-card-header>
                <ion-card-title>{{ $t("contract.contract") }}</ion-card-title>
            </ion-card-header>
            <ion-list>
                <ion-item>
                    <ion-label>{{ $t("contract.seller") }}: {{ contract.Offer.Company.name }}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>{{ $t("contract.buyer") }}: {{ contract.User.name }}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>{{ $t("contract.buyerCompany") }}: {{ contract.Company.name }}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>{{ $t("product.quantity") }}: {{ contract.amount }} {{ getUnitTranslation(contract.unit) }}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>{{ $t("contract.price") }}: {{ contract.price }} €</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>{{ $t("contract.buyDate") }}: {{ new Date(contract.timestamp).toLocaleDateString() }} {{ new Date(contract.timestamp).toLocaleTimeString() }}</ion-label>
                </ion-item>
            </ion-list>
            <ion-button @click="contactUser">{{ $t("chat.privateChat") }}</ion-button>
        </ion-card-content>
    </ion-card>

</template>
<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonList, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import { get } from 'ol/proj';
export default {
    
    name: 'ContractListing',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonItem,
        IonLabel,
        IonButton,
        IonInput,
        IonList
    },
    props: {
        contract: {
            type: Object,
            required: true
        },
        isFinite: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        }
    },
    methods:{
        getUnitTranslation(type) {
            return this.$t(`unit.amount.${type}`);
        },
        contactUser() {
            if (this.isSeller) {
                this.$router.push("/privatechat/" + this.contract.User.id + "/" + this.contract.User.name);
            } else {
                this.$router.push("/privatechat/" + this.contract.Offer.User.id + "/" + this.contract.Offer.User.name);
            }
        },
    }
}
</script>