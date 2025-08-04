<template>
    <ion-page>
        <ion-content>
            <NavBarComponent />

            <ion-button @click="showAdvanced = true" style="z-index: 20004;">
                Advanced Search
            </ion-button>

            <ion-grid class="main-grid">
                <ion-row class="ion-align-items-start">
                    <ion-col>
                        <div v-if="Object.keys(groupedFilteredContracts).length === 0" class="no-results">
                            <p>No contracts in selected date range.</p>
                        </div>
                        <div v-for="(contracts, key) in groupedFilteredContracts" :key="key">
                            <h2 class="month-heading">{{ formatMonthYear(key) }}</h2>
                            <ion-row>
                                <ion-col v-for="contract in contracts" :key="contract.id" size="12" size-sm="6"
                                    size-md="4" size-lg="3">
                                    <ContractListing v-if="contract" :contract="contract" :isSeller="false" />
                                </ion-col>
                            </ion-row>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-modal :is-open="showAdvanced" @did-dismiss="onModalClose">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>Advanced Search</ion-title>
                        <ion-buttons slot="end">
                            <ion-button @click="closeModal">Close</ion-button>
                        </ion-buttons>
                    </ion-toolbar>
                </ion-header>
                <ion-content>
                    <ion-item class="ion-padding">
                        <ion-label>Start Date</ion-label>
                        <ion-datetime :value="startDate" @ionChange="e => (startDate = e.detail.value)"
                            display-format="DD/MM/YYYY HH:mm" picker-format="DD MM YYYY HH mm"
                            show-default-timezone></ion-datetime>
                    </ion-item>
                    <ion-item class="ion-padding">
                        <ion-label>End Date</ion-label>
                        <ion-datetime :value="endDate" @ionChange="e => (endDate = e.detail.value)"
                            display-format="DD/MM/YYYY HH:mm" picker-format="DD MM YYYY HH mm"
                            show-default-timezone></ion-datetime>
                    </ion-item>
                    <div style="display:flex; gap:0.5rem;" class="ion-padding">
                        <ion-button expand="block" @click="applyFilter">Apply</ion-button>
                        <ion-button expand="block" fill="outline" @click="clearFilter">Clear</ion-button>
                    </div>
                </ion-content>
            </ion-modal>

        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonGrid, IonRow, IonCol, IonModal, IonButtons, IonDatetime, } from '@ionic/vue';
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
        IonModal,
        IonRow,
        IonButtons,
        IonDatetime,
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
            startDate: null,
            endDate: null,
            showAdvanced: false,
            activeFilter: { start: null, end: null },
        };
    },
    computed: {
        filteredContracts() {
            if (!this.activeFilter.start && !this.activeFilter.end) {
                return this.contracts;
            }
            const start = this.activeFilter.start ? new Date(this.activeFilter.start) : null;
            const end = this.activeFilter.end ? new Date(this.activeFilter.end) : null;
            return this.contracts.filter(c => {
                const tsp = new Date(c.timestamp);
                if (start && tsp < start) return false;
                if (end && tsp > end) return false;
                return true;
            });
        },
        groupedFilteredContracts() {
            const groups = {};
            this.filteredContracts.forEach(contract => {
                const date = new Date(contract.timestamp);
                const year = date.getFullYear();
                const month = date.getMonth(); // zero-based
                const key = `${year}-${String(month + 1).padStart(2, '0')}`;
                if (!groups[key]) groups[key] = [];
                groups[key].push(contract);
            });
            return Object.fromEntries(
                Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
            );
        },
    },
    mounted() {
        this.getContracts();
    },

    methods: {
        getContracts() {
            let url = this.$api_add + "/contracts";

            axios.post(url, {}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                if (response.data.type = "result" && response.data.result == "ok") {
                    this.contracts = response.data.message;
                }
            });
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
            else {
                const [year, month] = key.split('-');
                const date = new Date(year, month - 1);
                return date.toLocaleString('default', { month: 'long', year: 'numeric' });
            }
        },
        applyFilter() {
            this.activeFilter.start = this.startDate;
            this.activeFilter.end = this.endDate;
            this.showAdvanced = false;
        },
        clearFilter() {
            this.startDate = null;
            this.endDate = null;
            this.activeFilter = { start: null, end: null };
            this.showAdvanced = false;
        },
        closeModal() {
            this.showAdvanced = false;
        },
        onModalClose() {
            this.showAdvanced = false;
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

.no-results {
    text-align: center;
    padding: 1rem;
    font-style: italic;
}
</style>
