<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <div class="header-container">
                    <div class="funder-logo">
                        <img :src="$t('menu.logoPath')" alt="Funder Logo" class="logo">
                    </div>

                    <div class="center-logo">
                        <img src="@/assets/DBH-logo.png" alt="DigiBioGasHubs Logo" class="logo">
                    </div>

                    <div class="localecomponent">
                        <LocaleComponent />
                    </div>
                </div>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div class="login-page">
                <div class="login-container">
                    <LoginComponent />
                </div>
            </div>
            <FooterComponent />
        </ion-content>
    </ion-page>
</template>

<script>
import LoginComponent from '../components/LoginComponent.vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { IonContent, IonHeader, IonPage, IonTab, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import LocaleComponent from '../components/LocaleComponent.vue';

export default defineComponent( {
    name: 'LoginPage',
    components: {
        LoginComponent,
        NavBarComponent,
        FooterComponent,
        IonPage,
        IonHeader,
        IonToolbar,
        IonContent,
        LocaleComponent
    }
});
</script>

<style scoped>
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    flex-wrap: wrap;
    background-color: #333;
    z-index: 1000;
}

.funder-logo,
.center-logo,
.localecomponent {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100px;
}

.logo {
    width: 70%;
}

@media screen and (max-width: 600px) {
    .logo {
        width: 90%;
    }
}

@media (min-width:1240px) {
    .logo {
        width: 30%;
    }
}

.login-page {
    display: flex;
    justify-content: center;
    height: 100vh;
}

.login-container {
    max-width: 600px;
    width: 100%;
    padding: 20px;
    border-radius: 8px;
}
</style>
