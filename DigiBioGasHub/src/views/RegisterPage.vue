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
            <div class="register-page">
                <RegisterComponent />
            </div>
            <FooterComponent />
        </ion-content>
    </ion-page>
</template>

<script>
import RegisterComponent from '../components/RegisterComponent.vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/vue';
import LocaleComponent from '../components/LocaleComponent.vue';

export default {
    name: 'RegisterPage',
    components: {
        RegisterComponent,
        NavBarComponent,
        FooterComponent,
        IonPage,
        IonContent,
        IonHeader,
        IonToolbar,
        LocaleComponent
    }
};
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

.register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>