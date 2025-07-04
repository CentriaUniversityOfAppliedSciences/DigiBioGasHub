<template>
  <ion-page>
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title style="display: flex; justify-content: space-between; align-items: center;">
            <span>My API Key</span>
            <ApiKeysComponent mode="user" @refresh="fetchMyApiKey();" />
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div v-if="myApiKey === ''">
            <ion-text>No API key found. Please generate one.</ion-text>
          </div>
          <div v-else class="api-key-row">
            <ion-text color="primary" class="api-key">
              {{ showMyApiKey ? myApiKey : maskedApiKey(myApiKey) }}
            </ion-text>
            <ion-button size="small" fill="clear" @click="showMyApiKey = !showMyApiKey">
              {{ showMyApiKey ? 'Hide' : 'Show' }}
            </ion-button>
            <ion-button size="small" fill="clear" @click="copyToClipboard(myApiKey)">
              Copy
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title style="display: flex; justify-content: space-between; align-items: center;">
            <span>API Keys of Companies I am Associated With</span>
            <ApiKeysComponent mode="company" @refresh="fetchCompanyApiKeys()" />
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div v-if="companyApiKeys.length === 0">
            <ion-text>No associated companies found.</ion-text>
          </div>
          <div v-for="(company, idx) in companyApiKeys" :key="company.companyId" class="company-api-key-row">
            <div class="company-label">{{ company.companyName }}</div>
            <ion-text color="primary" class="api-key">
              {{ company.show ? company.apikey : maskedApiKey(company.apikey) }}
            </ion-text>
            <ion-button size="small" fill="clear" @click="toggleCompanyKey(idx)">
              {{ company.show ? 'Hide' : 'Show' }}
            </ion-button>
            <ion-button size="small" fill="clear" @click="copyToClipboard(company.apikey)">
              Copy
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonText } from '@ionic/vue';
import axios from 'axios';
import ApiKeysComponent from '../components/ApiKeysComponent.vue';

export default {
  name: 'ApiKeysPage',
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonText,
    ApiKeysComponent
  },
  data() {
    return {
      myApiKey: '',
      showMyApiKey: false,
      companyApiKeys: [],
      userId: '',
    };
  },
  mounted() {
    this.fetchMyApiKey();
    this.fetchCompanyApiKeys();
  },
  methods: {
    async fetchMyApiKey() {
      try {
        const response = await axios.get(this.$api_add + '/apikey/user', { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
        this.myApiKey = response.data.apikey || '';
      } catch {
        this.myApiKey = '';
      }
    },
    async fetchCompanyApiKeys() {
      try {
        const response = await axios.get(this.$api_add + '/apikey/company', { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
        this.companyApiKeys = (response.data.companies || []).map(c => ({
          ...c,
          show: false
        }));
      } catch {
        this.companyApiKeys = [];
      }
    },
    maskedApiKey(key) {
      const prefix = 'digibio';
      const maskedLength = key.length - prefix.length;
      return prefix + '*'.repeat(maskedLength);
    },
    toggleCompanyKey(idx) {
      this.companyApiKeys[idx].show = !this.companyApiKeys[idx].show;
    },
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    }
  }
};
</script>

<style scoped>
.api-key-row,
.company-api-key-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.api-key {
  word-break: break-all;
  font-family: monospace;
  font-size: 1.1em;
  margin: 8px 0;
}

.company-label {
  min-width: 120px;
  font-weight: bold;
}
</style>
