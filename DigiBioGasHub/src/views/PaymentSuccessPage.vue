<template>
  <ion-page>
    <NavBarComponent />
    <ion-content class="ion-padding content-center">
      <div class="success-box">
        <ion-icon :icon="checkmarkCircle" class="success-icon"></ion-icon>
        <h2>Payment Successful</h2>
        <p>Thank you for your payment. Your transaction has been completed.</p>
        <ion-button expand="block" color="success" @click="goHome">Back to Home</ion-button>
      </div>
    </ion-content>
     <FooterComponent />
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { checkmarkCircle } from 'ionicons/icons';
import { defineComponent } from 'vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default defineComponent({
  name: 'PaymentSuccess',
  components: {
    IonPage,
    IonContent,
    IonButton,
    IonIcon,
    NavBarComponent,
    FooterComponent
  },
  data() {
    return {
      checkmarkCircle
    };
  },
  methods: {
    goHome() {
      this.$router.push('/home');
    }
  }
});
</script>

<style scoped>
.content-center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: #f0f4f8;
}

.success-box {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.success-icon {
  color: #2dd36f;
  font-size: 5rem;
  margin-bottom: 1rem;
}

h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #2d3436;
}

p {
  font-size: 1rem;
  color: #636e72;
  margin: 1rem 0;
}
</style>
