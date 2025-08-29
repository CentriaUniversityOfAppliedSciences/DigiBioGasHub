<template>
  <ion-app>
    <!-- Global Side Menu -->
    <ion-menu content-id="main-content" menu-id="main-menu" side="start">
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ $t('menu.title') }}</ion-title>
             <ion-buttons slot="end">
            <ion-button @click="closeMenu">
              <ion-icon :icon="close" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <ion-item router-link="/home" @click="closeMenu">{{ $t('menu.home') }}</ion-item>
          <ion-item router-link="/marketplace" @click="closeMenu">{{ $t('menu.marketplace')
            }}</ion-item>
          <ion-item router-link="/map" @click="closeMenu">{{ $t('menu.map') }}</ion-item>
          <ion-item router-link="/articles" @click="closeMenu">{{ $t('menu.articles')
            }}</ion-item>
          <ion-item router-link="/chat" @click="closeMenu">{{ $t('menu.chat') }}</ion-item>
          <ion-item v-if="!LoggedIn" router-link="/login" @click="closeMenu">{{ $t('menu.login')
            }}</ion-item>
          <ion-item v-if="LoggedIn && inCompany" router-link="/contracts" @click="closeMenu">{{
            $t('menu.mycontracts') }}</ion-item>
          <ion-item v-if="LoggedIn" router-link="/company" @click="closeMenu">{{
            $t('menu.mycompany') }}</ion-item>
          <ion-item v-if="LoggedIn && inCompany" router-link="/companyanalytics" @click="closeMenu">{{
            $t('company.reports') }}</ion-item>
          <ion-item v-if="LoggedIn" router-link="/profile" @click="closeMenu">{{
            $t('menu.profile') }}</ion-item>
          <ion-item v-if="LoggedIn">
            <LogoutComponent />
          </ion-item>
          <ion-item v-if="Admin">
            <AdminComponent />
          </ion-item>
          <ion-item>
            <LocaleComponent />
          </ion-item>
          <ion-item>
            <ion-button color="success" shape="round" fill="outline" size="small" @click="openFeedback">
              <span>{{ $t('menu.giveFeedback') }}</span>
              <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

<script>
import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenu, IonRouterOutlet, IonTitle, IonToolbar, menuController } from '@ionic/vue';
import { defineComponent } from 'vue';
import LogoutComponent from './components/LogoutComponent.vue';
import AdminComponent from './components/AdminComponent.vue';
import LocaleComponent from './components/LocaleComponent.vue';
import { close, chevronForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons({ close, chevronForwardOutline });
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonButton,
    IonButtons,
    IonIcon,
    LogoutComponent,
    AdminComponent,
    LocaleComponent,
    menuController
  },
  data() {
    return {
      LoggedIn: false,
      inCompany: false,
      Admin: false,
      close
    };
  },
  methods: {
    decodeJWT(token) {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    },
    async closeMenu() {
      const isOpen = await menuController.isOpen('main-menu');
      if (isOpen) {
        await menuController.close('main-menu');
      }
    },
    checkCompany() {
      let token = localStorage.getItem('token');
      if (token) {
        let decoded = this.decodeJWT(token);
        if (decoded) {
          if (decoded.userlevel >= 20) {
            this.inCompany = true;
          }
        }
      }
    },
    checkLogin() {
      let token = localStorage.getItem('token');
      if (token) {
        let decoded = this.decodeJWT(token);
        if (decoded) {
          if (decoded.userlevel >= 1) {
            this.LoggedIn = true;
          }
        }
      }
    },
    checkAdmin() {
      let token = localStorage.getItem('token');
      if (token) {
        let decoded = this.decodeJWT(token);
        if (decoded) {
          if (decoded.userlevel >= 99) {
            this.Admin = true;
          }
        }
      }
    },
    checkMenu() {
      if (window.innerWidth >= 768) {
        menuController.enable(false, 'main-menu');
      } else {
        menuController.enable(true, 'main-menu');
      }
    },
    openFeedback() {
      window.open('https://link.webropolsurveys.com/S/941E350F901601ED', '_blank');
    }
  },
  mounted() {
    this.checkLogin();
    this.checkCompany();
    this.checkAdmin();
    this.checkMenu();
    window.addEventListener('resize', this.checkMenu);
  },

  onUnmounted() {
    window.removeEventListener('resize', this.checkMenu);
  }
});

</script>
