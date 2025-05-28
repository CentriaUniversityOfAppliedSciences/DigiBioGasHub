<template>
    <ion-content>
      <ion-spinner v-if="loading" />
      
      <div v-else>
        <ion-card v-if="isLoggedIn && isValid">
          <ion-card-header>
            <ion-card-title>You're invited!</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-button @click="acceptInvitation">Accept</ion-button>
          </ion-card-content>
        </ion-card>

        <div v-else-if="!isLoggedIn">
          <ion-text>You're not logged in. Please login or register to continue.</ion-text>
          <ion-button @click="redirectToRegister">Register</ion-button>
          <LoginComponent @login-success="handleLoginSuccess" />
        </div>
  
        <ion-text v-if="errorMessage" color="danger">{{ errorMessage }}</ion-text>
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
      this.invitationId = this.$route.params.id;
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
            invitationId: this.invitationId,
          }, {
            headers: { authorization: localStorage.getItem('token') },
          });
  
          this.isValid = response.data.success;
          if (!this.isValid) {
            this.errorMessage = 'Invalid or expired invitation.';
          } else {
            this.errorMessage = '';
          }
        } catch (error) {
          this.errorMessage = 'Validation failed.';
          this.isValid = false;
        } finally {
          this.loading = false;
        }
      },
  
      async acceptInvitation() {
        try {
          const response = await axios.post(this.$api_add + '/api/invitations/accept', {
            invitationId: this.invitationId,
          }, {
            headers: { authorization: localStorage.getItem('token') },
          });
  
          if (response.data.success) {
            this.$router.push({ name: 'Dashboard' });
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
  
      handleLoginSuccess() {
        this.isLoggedIn = true;
        this.showLogin = false;
        this.validateInvitation();
      }
    }
  });
  </script>
  