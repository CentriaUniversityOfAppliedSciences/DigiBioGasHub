import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

import fi from './locale/fi.json';
import en from './locale/en.json';
import sv from './locale/sv.json';
import OpenLayersMap from 'vue3-openlayers';
const options = {
  debug: true,
};
import VueApexCharts from "vue3-apexcharts";
/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import "vue3-openlayers/dist/vue3-openlayers.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import axios from 'axios';

import {createI18n} from 'vue-i18n';

axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
const messages = {
  fi: fi,
  en: en,
  sv: sv,
};
const i18n = createI18n({
  locales: ['fi', 'en', 'sv'],
  fallbackLocale: 'fi',
  locale: 'fi',
  messages,
});
let api_add = import.meta.env.VITE_BACKEND_ADDRESS;
let chat_server_add = import.meta.env.VITE_CHATSERVER; 
let cube_add = import.meta.env.VITE_CUBE_ADDRESS;
const app = createApp(App)
  .use(IonicVue)

  .use(i18n)
  .use(router)
  .use(OpenLayersMap,options)
  .use(VueApexCharts);

  app.config.globalProperties.$api_add = api_add;
  app.provide('$api_add', api_add);

  app.config.globalProperties.$chat_server_add = chat_server_add;
  app.provide('$chat_server_add', chat_server_add);

  app.config.globalProperties.$cube_add = cube_add;
  app.provide('$cube_add', cube_add);

router.isReady().then(() => {
  app.mount('#app');
});
