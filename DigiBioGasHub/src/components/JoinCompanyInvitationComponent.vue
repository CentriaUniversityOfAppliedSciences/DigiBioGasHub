<template>
  <ion-content>
    <ion-spinner v-if="loading" />

    <div v-else class="center-container">
      <ion-card class="centered-card" v-if="isLoggedIn && isValid">
        <ion-card-header>
          <ion-card-title>{{ $t('invitations.title') }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-button expand="block" @click="acceptInvitation">{{ $t('invitations.acceptButton') }}</ion-button>
        </ion-card-content>
      </ion-card>

      <div v-else-if="!isLoggedIn" class="centered-card">
        <ion-text>
          <h2>{{ $t('invitations.loginPrompt') }}</h2>
        </ion-text>
        <ion-button expand="block" color="primary" @click="redirectToLogin">
          {{ $t('invitations.loginButton') }}
        </ion-button>
        <ion-button expand="block" fill="outline" color="medium" @click="redirectToRegister">
          {{ $t('invitations.registerButton') }}
        </ion-button>
      </div>

      <ion-text v-if="errorMessage" color="danger" class="error-message">
        {{ errorMessage }}
      </ion-text>
    </div>
    <ToastComponent ref="toastComponent" />
  </ion-content>
</template>

  
  <script>
  import LoginComponent from './LoginComponent.vue';
  import {
    IonContent,
    IonSpinner,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  } from '@ionic/vue';
import axios from 'axios';
import { defineComponent } from 'vue';
import ToastComponent from './ToastComponent.vue';
  
  export default defineComponent( {
    name: 'JoinCompanyInvitationComponent',
    components: { 
      LoginComponent,
      IonContent,
      IonSpinner,
      IonText,
      IonCard,
      IonCardHeader,
      IonCardTitle,
      IonCardContent,
      IonButton,
      ToastComponent
    },
    data() {
      return {
        loading: true,
        isValid: false,
        isLoggedIn: false,
        invitationId: null,
        errorMessage: ''
      };
    },
    mounted() {
      this.companyId = this.$route.params.companyId;
      this.invitationId = this.$route.params.invitationId;
      const token = localStorage.getItem('token');
  
      if (token) {
        this.isLoggedIn = true;
        this.validateInvitation();
      } else {
        this.isLoggedIn = false;
        this.loading = false;
      }
    },
    methods: {

      async validateInvitation() {
        this.loading = true;
        try {
          const response = await axios.post(this.$api_add + '/invitations/validate', {
            companyId: this.companyId,
            invitationId: this.invitationId
          }, {
            headers: { authorization: localStorage.getItem('token') },
          });

          const result = response.data.result;

          if (result === 'ok') {
            this.isValid = true;
            this.errorMessage = '';
          } else if (result === 'alreadyMember') {
            this.$router.push({ name: 'Company' });
          } else {
            this.isValid = false;
            this.errorMessage = this.$t('invitations.invalidOrExpired');
          }
        } catch (error) {
          this.isValid = false;
          this.errorMessage = this.$t('invitations.invalidOrExpired');
        } finally {
          this.loading = false;
        }
      },

      async acceptInvitation() {
        try {
          const response = await axios.post(this.$api_add + '/invitations/accept', {
            companyId: this.companyId,
            invitationId: this.invitationId
          }, {
            headers: { authorization: localStorage.getItem('token') },
          });
  
          if (response.data.result === 'ok') {
            this.$refs.toastComponent.showToast(this.$t('invitations.accepted'), 2000, 'success');
            this.$router.push({ name: 'Company' });
          } else {
            this.errorMessage = response.data.message || this.$t('invitations.acceptErrorMessage');
          }
        } catch {
          this.errorMessage = this.$t('invitations.acceptErrorMessage');
        }
      },
  
      redirectToRegister() {
        this.$router.push({
          name: 'Register',
          query: { redirect: this.$route.fullPath },
        });
      },
      
      redirectToLogin() {
        this.$router.push({
          name: 'Login',
          query: { redirect: this.$route.fullPath },
        });
      }
    }
  });
  </script>

<style scoped>
.center-container {
  display: flex;
  justify-content: flex-start;
  align-items: center; 
  min-height: 100vh;
  padding: 16px;
  box-sizing: border-box;
  flex-direction: column;
  background: var(--ion-background-color);
}

.centered-card {
  max-width: 400px;
  width: 100%;
  padding: 24px;
  border-radius: 16px;
  background-color: var(--ion-card-background);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  color: var(--ion-text-color);
  text-align: center;
}

.centered-card h2 {
  margin-bottom: 24px;
  font-weight: 500;
}

ion-button {
  margin-top: 12px;
}

.error-message {
  margin-top: 20px;
  text-align: center;
  color: var(--ion-color-danger);
}
</style>
