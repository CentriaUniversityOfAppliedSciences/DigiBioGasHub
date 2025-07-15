<template>
  <ion-page>
    <NavBarComponent />
    <ion-content class="ion-padding content-center">
      <div class="cancel-box">
        <ion-icon :icon="closeCircle" class="cancel-icon"></ion-icon>
        <h2>{{$t('premium.payment.paymentCancelled')}}</h2>
        <p>{{$t('premium.payment.paymentCancelInfo')}}</p>
        <ion-button expand="block" color="danger" @click="goBack">{{$t('premium.payment.tryAgain')}}</ion-button>
      </div>
    </ion-content>
    <FooterComponent />
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/vue';
import { closeCircle } from 'ionicons/icons';
import { defineComponent } from 'vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default defineComponent({
  name: 'PaymentCancelled',
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
      closeCircle
    };
  },
  methods: {
    goBack() {
      this.$router.push('/subscription');
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
  background: #fff5f5;
}

.cancel-box {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

.cancel-icon {
  color: #eb445a;
  font-size: 5rem;
  margin-bottom: 1rem;
}

h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #c0392b;
}

p {
  font-size: 1rem;
  color: #7f8c8d;
  margin: 1rem 0;
}
</style>
