<template>
  <ion-page>
    <NavBarComponent />
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title style="display: flex; justify-content: space-between; align-items: center;">
            <span>My API Key</span>
            <ApiKeysComponent ref="userApiKeys" mode="user" @refresh="fetchMyApiKey();" />
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
              {{ copiedMyApiKey ? ' ✔ Copied' : 'Copy' }}
            </ion-button>
            <ion-button size="small" fill="clear" color="warning" @click="updateMyApiKey">
              Update
            </ion-button>
            <ion-button size="small" fill="clear" color="danger" @click="deleteMyApiKey">
              Delete
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title style="display: flex; justify-content: space-between; align-items: center;">
            <span>API Keys of Companies I am Associated With</span>
            <ApiKeysComponent ref="companyApiKeys" mode="company" @refresh="fetchCompanyApiKeys()" />
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
            <ion-button size="small" fill="clear" @click="copyToClipboard(company.apikey, idx)">
              {{ company.copied ? ' ✔ Copied' : 'Copy' }}
            </ion-button>
            <ion-button size="small" fill="clear" color="warning" @click="updateCompanyApiKey(company.companyID)">
              Update
            </ion-button>
            <ion-button size="small" fill="clear" color="danger" @click="deleteCompanyApiKey(company.companyID)">
              Delete
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
    <FooterComponent />
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonText } from '@ionic/vue';
import axios from 'axios';
import ApiKeysComponent from '../components/ApiKeysComponent.vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

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
    ApiKeysComponent,
    NavBarComponent,
    FooterComponent
  },
  data() {
    return {
      myApiKey: '',
      showMyApiKey: false,
      companyApiKeys: [],
      copiedMyApiKey: false,
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
          show: false,
          copied: false
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

    async copyToClipboard(text, index = null) {
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

      if (index === null) {
        this.copiedMyApiKey = true;
        setTimeout(() => {
          this.copiedMyApiKey = false;
        }, 3000);
      } else {
        this.companyApiKeys[index].copied = true;
        setTimeout(() => {
          this.companyApiKeys[index].copied = false;
        }, 3000);
      }
    },

    updateMyApiKey() {
      this.$refs.userApiKeys.updateMyApiKey();
    },

    deleteMyApiKey() {
      this.$refs.userApiKeys.deleteMyApiKey();
    },

    updateCompanyApiKey(companyID) {
      this.$refs.companyApiKeys.updateCompanyApiKey(companyID);
    },

    deleteCompanyApiKey(companyID) {
      this.$refs.companyApiKeys.deleteCompanyApiKey(companyID);
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
  word-break: break-word;
  font-family: monospace;
  font-size: 1.1em;
  margin: 8px 0;
  background: rgba(99, 82, 82, 0.233);
  color: var(--ion-color-dark);
  padding: 20px 20px;
  border-radius: 10px;
}

.company-label {
  min-width: 120px;
  font-weight: bold;
}
</style>
