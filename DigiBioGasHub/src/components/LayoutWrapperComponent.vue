<template>
    <ion-page>
      <div class="page-container">
        <NavBarComponent />
  
        <ion-content class="content-area">
          <slot />
        </ion-content>
  
        <FooterComponent />
      </div>
    </ion-page>
  </template>
  
  <script>
  import { IonPage, IonContent } from '@ionic/vue';
  import NavBarComponent from './NavBarComponent.vue';
  import FooterComponent from './FooterComponent.vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'LayoutWrapperComponent',
    components: {
      IonPage,
      IonContent,
      NavBarComponent,
      FooterComponent,
    },
  });
  </script>
  
  <style scoped>

.ion-page {
  position: relative !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important; /* prevent space-between */
  min-height: 100vh !important;
}

  .page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .content-area {
    flex: 1 1 auto;
    overflow-y: auto;
    /* Optional padding */
    padding: 16px;
  }
  </style>
  