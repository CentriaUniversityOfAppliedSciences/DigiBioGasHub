<template>
    <nav class="navbar">
        <ion-grid>
            <ion-row class="header-row ion-justify-content-center ion-align-items-center">
                <ion-col size="auto" class="mobile-only">
                    <ion-menu-button auto-hide="false"></ion-menu-button>
                </ion-col>

                <ion-col size="auto">
                    <img :src="$t('menu.logoPath')" alt="Funder Logo" class="logo" />
                </ion-col>

                <ion-col size="auto">
                    <img src="@/assets/DBH-logo.png" alt="DigiBioGasHubs Logo" class="logo" />
                </ion-col>

                <ion-col size="auto" class="desktop-only">
                    <ion-button color="success" @click="openFeedback">
                        <span>{{ $t('menu.giveFeedback') }}</span>
                        <ion-icon name="chevron-forward-outline" slot="end"></ion-icon>
                    </ion-button>
                </ion-col>
            </ion-row>
        </ion-grid>

        <!-- Desktop Nav Links -->
        <ion-toolbar class="desktop-only">
            <ion-buttons>
                <ion-button router-link="/home"  :class="{ 'active-menu': isActiveRoute('/home') }">{{ $t('menu.home') }}</ion-button>
                <ion-button router-link="/marketplace"  :class="{ 'active-menu': isActiveRoute('/marketplace') }">{{ $t('menu.marketplace') }}</ion-button>
                <ion-button router-link="/map" :class="{ 'active-menu': isActiveRoute('/map') }">{{ $t('menu.map') }}</ion-button>
                <ion-button router-link="/articles" :class="{ 'active-menu': isActiveRoute('/articles') }">{{ $t('menu.articles') }}</ion-button>
                <ion-button router-link="/chat" :class="{ 'active-menu': isActiveRoute('/chat') }">{{ $t('menu.chat') }}</ion-button>
                <ion-button v-if="!LoggedIn" router-link="/login">{{ $t('menu.login') }}</ion-button>
                <ion-button v-if="LoggedIn && inCompany" router-link="/contracts" :class="{ 'active-menu': isActiveRoute('/contracts') }">{{ $t('menu.mycontracts')
                }}</ion-button>
                <ion-button v-if="LoggedIn" router-link="/company" :class="{ 'active-menu': isActiveRoute('/company') }">{{ $t('menu.mycompany') }}</ion-button>
                <ion-button v-if="LoggedIn && inCompany" router-link="/companyanalytics" :class="{ 'active-menu': isActiveRoute('/companyanalytics') }">{{ $t('company.reports')
                }}</ion-button>
                <ion-button v-if="LoggedIn" router-link="/profile" :class="{ 'active-menu': isActiveRoute('/profile') }">{{ $t('menu.profile') }}</ion-button>
                <LogoutComponent v-if="LoggedIn" />
                <div class="inline-components">
                    <AdminComponent v-if="Admin" />
                    <LocaleComponent />
                </div>
            </ion-buttons>
        </ion-toolbar>
    </nav>
</template>

<script>
import { defineComponent } from 'vue';
import AdminComponent from './AdminComponent.vue';
import LocaleComponent from './LocaleComponent.vue';
import LoginComponent from './LoginComponent.vue';
import LogoutComponent from './LogoutComponent.vue';
import NotificationComponent from './NotificationComponent.vue';
import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonRow, IonTitle, IonToolbar } from '@ionic/vue';
import { close, menu, chevronForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons({ close, menu, chevronForwardOutline });
export default defineComponent({
    name: 'NavBarComponent',
    components: {
        IonHeader,
        IonToolbar,
        IonGrid,
        IonCol,
        IonRow,
        IonMenuButton,
        IonTitle,
        IonMenu,
        IonContent,
        IonList,
        IonItem,
        IonLabel,
        LocaleComponent,
        LoginComponent,
        AdminComponent,
        LogoutComponent,
        NotificationComponent,
        IonButtons,
        IonButton,
        IonIcon
    },
    setup() {
        return {};
    },
    methods: {
        handleLoginModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        decodeJWT(token) {
            try {
                return JSON.parse(atob(token.split('.')[1]));
            } catch (e) {
                return null;
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
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        openFeedback() {
            window.open('https://link.webropolsurveys.com/S/941E350F901601ED', '_blank');
        },
        isActiveRoute(route) {
            return this.$route.path === route;
        }
    },
    data() {
        return {
            showModal: false,
            LoggedIn: false,
            inCompany: false,
            Admin: false,
        }
    },
    mounted() {
        this.checkLogin();
        this.checkCompany();
        this.checkAdmin();
    },

});
</script>

<style scoped>
.navbar {
    background-color: #333;
    color: #fff;
    z-index: 1000;
}

.mobile-only {
    display: none;
}

.desktop-only {
    display: flex;
}

@media (max-width: 768px) {
    .mobile-only {
        display: flex !important;
    }

    .desktop-only {
        display: none !important;
    }
}

@media (min-width: 768px) {
    .header-row {
        gap: 2rem;
    }
}

.logo {
    height: 40px;
    object-fit: contain;
}

.inline-components {
    display: flex;
    align-items: center;
    gap: 10px;
}

.inline-components>* {
    display: inline-flex;
    width: auto;
}

ion-button {
    text-transform: capitalize;
    font-weight: 350;
    font-size: 16px;
    --border-radius: 8px;
    transition: all 0.3s ease;
}

ion-buttons {
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    color:white;
}

ion-toolbar {
    --background: none;
}

.active-menu {
    border-bottom: 3px solid #2196f3;
    font-weight: 500;
}
</style>
