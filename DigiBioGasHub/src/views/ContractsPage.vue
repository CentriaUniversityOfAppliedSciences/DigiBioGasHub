<template>
    <ion-page>
        <ion-content>
            <NavBarComponent />
            <ion-grid class="main-grid">
                <ion-row class="ion-align-items-start">
                    
                    <ion-col>
                        <ion-row>
                            <ion-col v-for="contract in contracts" :key="contract.id" size="12" size-sm="6" size-md="4" size-lg="3">
                                <ContractListing v-if="contract" :contract="contract" :isSeller="false" />
                            </ion-col>
                        </ion-row>
                    </ion-col>  
                </ion-row>
            </ion-grid>
            <FooterComponent />
        </ion-content>
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonGrid, IonRow, IonCol, } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import ContractListing from '../components/ContractListing.vue';

export default defineComponent({
    name: 'ContractsPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        NavBarComponent,
        FooterComponent,
        ContractListing,
        IonGrid,
        IonRow,
        IonCol
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
        getContracts() {
            let url = this.$api_add + "/contracts";
            
                axios.post(url, {}, {headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                    if (response.data.type="result" && response.data.result == "ok"){
                        this.contracts = response.data.message;
                    } 
                });
        }
    }
});

</script>