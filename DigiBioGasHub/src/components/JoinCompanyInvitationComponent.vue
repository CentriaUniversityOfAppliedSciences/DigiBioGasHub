<template>
  <ion-content>
    <ion-spinner v-if="loading" />

    <div v-else class="center-container">
      <ion-card class="centered-card" v-if="isLoggedIn && isValid">
        <ion-card-header>
          <ion-card-title>You're invited!</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-button expand="block" @click="acceptInvitation">Accept</ion-button>
        </ion-card-content>
      </ion-card>

      <div v-else-if="!isLoggedIn" class="centered-card">
        <ion-text>
          <h2>Please login or register to continue.</h2>
        </ion-text>
        <ion-button expand="block" color="primary" @click="redirectToLogin">
          Login
        </ion-button>
        <ion-button expand="block" fill="outline" color="medium" @click="redirectToRegister">
          Register
        </ion-button>
      </div>

      <ion-text v-if="errorMessage" color="danger" class="error-message">
        {{ errorMessage }}
      </ion-text>
    </div>
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
      IonButton
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
            this.errorMessage = 'Invalid or expired invitation.';
          }
        } catch (error) {
          this.isValid = false;
          this.errorMessage = 'Invalid or expired invitation.';
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
            this.$router.push({ name: 'Company' });
          } else {
            this.errorMessage = response.data.message || 'Failed to accept invitation.';
          }
        } catch {
          this.errorMessage = 'Failed to accept invitation.';
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
  justify-content: center;
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
