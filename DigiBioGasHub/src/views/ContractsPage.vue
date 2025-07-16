<template>
    <ion-page>
        <ion-content>
            <NavBarComponent />
            <ion-grid class="main-grid">
                <ion-row class="ion-align-items-start">
                    <ion-col>
                        <div v-for="(contracts, key) in groupedContracts" :key="key">
                            <h2 class="month-heading">{{ formatMonthYear(key) }}</h2>
                            <ion-row>
                                <ion-col v-for="contract in contracts" :key="contract.id" size="12" size-sm="6" size-md="4" size-lg="3">
                                    <ContractListing v-if="contract" :contract="contract" :isSeller="false" />
                                </ion-col>
                            </ion-row>
                        </div>
                    </ion-col>  
                </ion-row>
            </ion-grid>
            
        </ion-content>
        <FooterComponent />
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
            contracts: [],
            groupedContracts: {},
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
                        this.groupContractsByMonth();
                    } 
                });
        },
        groupContractsByMonth() {
            // Group contracts by "YYYY-MM"
            const groups = {};
            this.contracts.forEach(contract => {
                // Assume contract.date is ISO string, e.g. "2025-07-16"
                const date = new Date(contract.timestamp);
                const year = date.getFullYear();
                const month = date.getMonth(); // 0-based
                const key = `${year}-${String(month+1).padStart(2, '0')}`;
                if (!groups[key]) groups[key] = [];
                groups[key].push(contract);
            });
            // Sort keys descending (current month first)
            this.groupedContracts = Object.fromEntries(
                Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
            );
        },
        formatMonthYear(key) {
            var lang = this.$i18n.locale;
            if (lang === 'fi') {
                const [year, month] = key.split('-');
                const date = new Date(year, month - 1);
                return date.toLocaleString('fi-FI', { month: 'long', year: 'numeric' });
            }
            else if (lang === 'en') {
                // English format: "Month Year"
                const [year, month] = key.split('-');
                const date = new Date(year, month - 1);
                return date.toLocaleString('en-EN', { month: 'long', year: 'numeric' });
            }
            else if (lang === 'sv') {
                // Swedish format: "Month Year"
                const [year, month] = key.split('-');
                const date = new Date(year, month - 1);
                return date.toLocaleString('sv-SV', { month: 'long', year: 'numeric' });
            }
            else{
                const [year, month] = key.split('-');
                const date = new Date(year, month - 1);
                return date.toLocaleString('default', { month: 'long', year: 'numeric' });
            }
        }
    }
});

</script>
<style scoped>
.month-heading {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
}
</style>