<template>
    <div>
        <ion-button v-if="mode === 'user'" @click="generateMyApiKey" :disabled="loadingMyKey">
            <ion-spinner v-if="loadingMyKey" name="dots" /> {{ $t('apiKeys.generateMyApiKey') }}
        </ion-button>
        <ion-button v-if="mode === 'company'" @click="openCompanyModal">
             {{ $t('apiKeys.generateCompanyApiKey') }}
        </ion-button>

        <ion-modal :is-open="showCompanyModal" @didDismiss="showCompanyModal = false">
            <ion-content class="ion-padding">
                <ion-item>
                    <ion-label>{{ $t('apiKeys.selectCompany') }}</ion-label>
                    <ion-select v-model="selectedCompanyId" interface="popover">
                        <ion-select-option v-for="company in companies" :key="company.id" :value="company.id">
                            {{ company.name }}
                        </ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-button expand="block" @click="generateCompanyApiKey"
                    :disabled="!selectedCompanyId || loadingCompanyKey">
                    <ion-spinner v-if="loadingCompanyKey" name="dots" /> {{ $t('apiKeys.create') }}
                </ion-button>
                <ion-button expand="block" fill="clear" @click="showCompanyModal = false">{{ $t('apiKeys.cancel') }}</ion-button>
            </ion-content>
        </ion-modal>
    </div>
</template>

<script>
import {
    IonButton,
    IonModal,
    IonContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonSpinner
} from '@ionic/vue';
import axios from 'axios';

export default {
    name: 'ApiKeysComponent',
    components: {
        IonButton,
        IonModal,
        IonContent,
        IonItem,
        IonLabel,
        IonSelect,
        IonSelectOption,
        IonSpinner
    },
    props: {
        mode: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            loadingMyKey: false,
            loadingCompanyKey: false,
            showCompanyModal: false,
            companies: [],
            selectedCompanyId: null
        };
    },
    methods: {
        async generateMyApiKey() {
            this.loadingMyKey = true;
            try {
                const response = await axios.post(this.$api_add + '/apikey/user/generate', {}, { headers: { authorization: localStorage.getItem('token') }});
                if (response.data.type === 'result' && response.data.result === 'ok') {
                    this.$emit('refresh');
                }
            } finally {
                this.loadingMyKey = false;
            }
        },

        async updateMyApiKey() {
            this.loadingMyKey = true;
            try {
                const response = await axios.put(this.$api_add + '/apikey/user/update', {}, { headers: { authorization: localStorage.getItem('token') }});
                if (response.data.type === 'result' && response.data.result === 'ok') {
                    this.$emit('refresh');
                }
            } finally {
                this.loadingMyKey = false;
            }
        },

        async deleteMyApiKey() {
            this.loadingMyKey = true;
            try {
                const response = await axios.delete(this.$api_add + '/apikey/user/delete', { headers: { authorization: localStorage.getItem('token') }});
                if (response.data.type === 'result' && response.data.result === 'ok') {
                    this.$emit('refresh');
                }
            } finally {
                this.loadingMyKey = false;
            }
        },

        openCompanyModal() {
            this.selectedCompanyId = null;
            this.showCompanyModal = true;
            this.fetchCompanies();
        },

        async fetchCompanies() {
            try {
                const res = await axios.post(this.$api_add + '/getverifiedusercompanies', {}, { headers: { authorization: localStorage.getItem('token') }});
                this.companies = res.data.message || [];
            } catch {
                this.companies = [];
            }
        },

        async generateCompanyApiKey() {
            if (!this.selectedCompanyId) return;
            this.loadingCompanyKey = true;
            try {
                const response = await axios.post(this.$api_add + `/apikey/company/generate`, { companyID: this.selectedCompanyId }, { headers: { authorization: localStorage.getItem('token') }});
                if (response.data.type === 'result' && response.data.result === 'ok') {
                    this.$emit('refresh');
                }
                this.showCompanyModal = false;
            } finally {
                this.loadingCompanyKey = false;
            }
        },

        async updateCompanyApiKey(companyID) {
            this.loadingCompanyKey = true;
            try {
                const response = await axios.put(this.$api_add + '/apikey/company/update', { companyID }, { headers: { authorization: localStorage.getItem('token') }});
                if (response.data.type === 'result' && response.data.result === 'ok') {
                    this.$emit('refresh');
                }
            } finally {
                this.loadingCompanyKey = false;
            }
        },

        async deleteCompanyApiKey(companyID) {
            this.loadingCompanyKey = true;
            try {
                const response = await axios.delete(this.$api_add + '/apikey/company/delete', { headers: { authorization: localStorage.getItem('token') }, data: { companyID } });
                if (response.data.type === 'result' && response.data.result === 'ok') {
                    this.$emit('refresh');
                } 
            } finally {
                this.loadingCompanyKey = false;
            }
        }
    }
};
</script>
