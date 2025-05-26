<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <ion-grid>
                <ion-row class="ion-align-items-start">
                    <ion-col v-for="contract in contracts" :key="contract.id" size="12">
                        <ContractListing v-if="contract" :contract="contract" :isSeller="true" />
                    </ion-col>
                </ion-row>
            </ion-grid>
            
        </ion-content>
        <FooterComponent />
    </ion-page>
    
</template>
<script>
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonList, IonInput, IonAlert, IonCol, IonGrid, IonRow } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import ContractListing from '../../components/ContractListing.vue';
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';

export default defineComponent({
    name: 'ContractHistoryPage',
    components: {
        IonContent,
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonButton,
        IonMenuButton,
        IonLabel,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonItem,
        IonList,
        IonInput,
        IonAlert,
        IonCol,
        IonGrid,
        IonRow,
        ContractListing,
        NavBarComponent,
        FooterComponent
    },
    setup() {
        const route = useRoute();
        const offerID = route.params.id;
        return {
            offerID
        };
    },
    
    data() {
        return {
            contracts: []
        };
    },
    mounted() {
        this.getContracts();
    },
    methods: {
        getContracts(){
            let url = this.$api_add + "/offercontracts";
            
                axios.post(url, {"id":this.offerID}, {headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                    if (response.data.type="result" && response.data.result == "ok"){
                        this.contracts = response.data.message;
                    } 
                });
        }
    }
});
</script>