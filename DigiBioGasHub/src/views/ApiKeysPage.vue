<template>
  <ion-page>
    <NavBarComponent />
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <ion-card-title style="display: flex; justify-content: space-between; align-items: center;">
            <span>{{ $t('apiKeys.myApiKey') }}</span>
            <ApiKeysComponent ref="userApiKeys" mode="user" @refresh="fetchMyApiKey();" />
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div v-if="myApiKey === ''">
            <ion-text>{{ $t('apiKeys.noApiKeyFound') }}</ion-text>
          </div>
          <div v-else class="api-key-row">
            <ion-text color="primary" class="api-key">
              {{ showMyApiKey ? myApiKey : maskedApiKey(myApiKey) }}
            </ion-text>
            <ion-button size="small" fill="clear" @click="showMyApiKey = !showMyApiKey">
              {{ showMyApiKey ? $t('apiKeys.hide') : $t('apiKeys.show') }}
            </ion-button>
            <ion-button size="small" fill="clear" @click="copyToClipboard(myApiKey)">
              {{ copiedMyApiKey ? $t('apiKeys.copied') : $t('apiKeys.copy') }}
            </ion-button>
            <ion-button size="small" fill="clear" color="warning" @click="updateMyApiKey">
              {{ $t('apiKeys.update') }}
            </ion-button>
            <ion-button size="small" fill="clear" color="danger" @click="confirmDeleteMyApiKey">
              {{ $t('apiKeys.delete') }}
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title style="display: flex; justify-content: space-between; align-items: center;">
            <span>{{ $t('apiKeys.companyKeysTitle') }}</span>
            <ApiKeysComponent ref="companyApiKeys" mode="company" @refresh="fetchCompanyApiKeys()" />
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div v-if="companyApiKeys.length === 0">
            <ion-text>{{ $t('apiKeys.noCompaniesFound') }}</ion-text>
          </div>
          <div v-for="(company, idx) in companyApiKeys" :key="company.companyId" class="company-api-key-row">
            <div class="company-label">{{ company.companyName }}</div>
            <ion-text color="primary" class="api-key">
              {{ company.show ? company.apikey : maskedApiKey(company.apikey) }}
            </ion-text>
            <ion-button size="small" fill="clear" @click="toggleCompanyKey(idx)">
              {{ company.show ? $t('apiKeys.hide') : $t('apiKeys.show') }}
            </ion-button>
            <ion-button size="small" fill="clear" @click="copyToClipboard(company.apikey, idx)">
              {{ company.copied ? $t('apiKeys.copied') : $t('apiKeys.copy') }}
            </ion-button>
            <ion-button size="small" fill="clear" color="warning" @click="updateCompanyApiKey(company.companyID)">
              {{ $t('apiKeys.update') }}
            </ion-button>
            <ion-button size="small" fill="clear" color="danger" @click="confirmDeleteCompanyApiKey(company.companyID)">
              {{ $t('apiKeys.delete') }}
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <ion-alert :is-open="showDeleteAlert" :header="$t('apiKeys.deleteConfirmTitle')"
        :message="$t('apiKeys.deleteConfirmMsg')" :buttons="[
          {
            text: $t('apiKeys.cancel'),
            role: 'cancel',
            handler: () => {
              showDeleteAlert = false;
            }
          },
          {
            text: $t('apiKeys.delete'),
            role: 'destructive',
            handler: onDeleteConfirmed
          }
        ]" @didDismiss="showDeleteAlert = false" />

    </ion-content>
    <FooterComponent />
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonText, IonAlert } from '@ionic/vue';
import axios from 'axios';
import ApiKeysComponent from '../components/ApiKeysComponent.vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
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
    IonAlert,
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
      showDeleteAlert: false,
      deleteTarget: null
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

    confirmDeleteMyApiKey() {
      this.deleteTarget = { type: 'user' };
      this.showDeleteAlert = true;
    },

    confirmDeleteCompanyApiKey(companyID) {
      this.deleteTarget = { type: 'company', companyID };
      this.showDeleteAlert = true;
    },

    onDeleteConfirmed() {
      if (this.deleteTarget?.type === 'user') {
        this.deleteMyApiKey();
      } else if (this.deleteTarget?.type === 'company') {
        this.deleteCompanyApiKey(this.deleteTarget.companyID);
      }
      this.showDeleteAlert = false;
      this.deleteTarget = null;
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
});
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
