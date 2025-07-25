<template>
    <ion-page>
        <div v-if="isLoggedIn">
            <NavBarComponent />
            <div class="notfound-container">
                <h1 class="big-404">404</h1>
                <p class="notfound-message">{{ $t('notfound.message') }}</p>
                <ion-button color="primary" router-link="/home" class="go-home-btn">
                    {{ $t('notfound.goHome') }}
                </ion-button>
            </div>
        </div>
        <div v-else>
            <ion-header>
                <ion-toolbar>
                    <div class="header-container">
                        <div class="funder-logo">
                            <img :src="$t('menu.logoPath')" :alt="$t('notfound.funderLogoAlt')" class="logo">
                        </div>

                        <div class="center-logo">
                            <img src="@/assets/DBH-logo.png" :alt="$t('notfound.centerLogoAlt')" class="logo">
                        </div>

                        <div class="localecomponent">
                            <LocaleComponent />
                        </div>
                    </div>
                </ion-toolbar>
            </ion-header>
            <div class="grid-container">
                <div class="notfound-container">
                    <h1 class="big-404">404</h1>
                    <p class="notfound-message">{{ $t('notfound.message') }}</p>
                </div>
                <LoginComponent />
            </div>
        </div>
        <FooterComponent />
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/vue'
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { defineComponent } from 'vue';
import LoginComponent from '../components/LoginComponent.vue';
import LocaleComponent from '../components/LocaleComponent.vue';

export default defineComponent({
    name: 'NotFoundPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButton,
        IonIcon,
        NavBarComponent,
        FooterComponent,
        LoginComponent,
        LocaleComponent
    },
    data() {
        return {
            isLoggedIn: !!localStorage.getItem('token')
        };
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

.grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
    padding: 2rem;
}

.notfound-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Segoe UI', sans-serif;
    text-align: center;
    padding: 2rem;
}

.big-404 {
    font-size: 10rem;
    font-weight: 900;
    color: var(--color);
    margin: 0;
    user-select: none;
}

.notfound-message {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--color);
    margin-top: 1rem;
}

.go-home-btn {
    margin-top: 1rem;
}

ion-icon {
    font-size: 3rem;
    color: #e63946;
    margin-bottom: 1rem;
}
</style>
