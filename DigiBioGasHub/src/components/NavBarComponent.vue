<template>
    <nav class="navbar">
        <div class="navbar-left">
            <img :src="$t('menu.logoPath')" alt="Funder Logo" class="logo">

            <button class="feedback-button" v-if="!isMobile" @click="openFeedback">
                <span>{{ $t('menu.giveFeedback') }}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
        </div>

        <div class="navbar-center">
            <img src="@/assets/DBH-logo.png" alt="DigiBioGasHubs Logo" class="logo">
        </div>

        <div class="navbar-right">
            <ion-buttons slot="end">
                <NotificationComponent />
                <ion-button fill="clear" class="hamburger" v-if="isMobile" @click="toggleMenu">
                    <ion-icon :icon="showMenu ? 'close' : 'menu'" size="large"></ion-icon>
                </ion-button>
            </ion-buttons>

            <ul class="menu" v-if="!isMobile">
                <li class="menu-item"><a href="/home">{{ $t('menu.home') }}</a></li>
                <li class="menu-item"><a href="/marketplace">{{ $t('menu.marketplace') }}</a></li>
                <li class="menu-item"><a href="/map">{{ $t('menu.map') }}</a></li>
                <li class="menu-item"><a href="/articles">{{ $t('menu.articles') }}</a></li>
                <li class="menu-item"><a href="/chat">{{ $t('menu.chat') }}</a></li>
                <li v-if="!LoggedIn" class="menu-item" id="loginbtn"><a href="/login">{{ $t('menu.login') }}</a>
                </li>
                <li v-if="LoggedIn" class="menu-item"><a href="/contracts">{{ $t('menu.mycontracts') }}</a></li>
                <li v-if="LoggedIn" class="menu-item"><a href="/company">{{ $t('menu.mycompany') }}</a></li>
                <li v-if="LoggedIn" class="menu-item"><a href="/profile">{{ $t('menu.profile') }}</a></li>
                <li v-if="LoggedIn" class="menu-item">
                    <LogoutComponent />
                </li>
                <li v-if="Admin" class="menu-item">
                    <AdminComponent />
                </li>
                <li class="menu-item">
                    <LocaleComponent />
                </li>
            </ul>
        </div>
    </nav>

    <ul class="menu" :class="{ mobile: isMobile, open: showMenu }" v-if="isMobile && showMenu">
        <li class="menu-item"><a href="/home">{{ $t('menu.home') }}</a></li>
        <li class="menu-item"><a href="/marketplace">{{ $t('menu.marketplace') }}</a></li>
        <li class="menu-item"><a href="/map">{{ $t('menu.map') }}</a></li>
        <li class="menu-item"><a href="/articles">{{ $t('menu.articles') }}</a></li>
        <li class="menu-item"><a href="/chat">{{ $t('menu.chat') }}</a></li>
        <li v-if="!LoggedIn" class="menu-item" id="loginbtn"><a href="/login">{{ $t('menu.login') }}</a></li>
        <li v-if="LoggedIn" class="menu-item"><a href="/contracts">{{ $t('menu.mycontracts') }}</a></li>
        <li v-if="LoggedIn" class="menu-item"><a href="/company">{{ $t('menu.mycompany') }}</a></li>
        <li v-if="LoggedIn" class="menu-item"><a href="/profile">{{ $t('menu.profile') }}</a></li>
        <li v-if="LoggedIn" class="menu-item">
            <LogoutComponent />
        </li>
        <li v-if="Admin" class="menu-item">
            <AdminComponent />
        </li>
        <li class="menu-item">
            <LocaleComponent />
        </li>
        <li v-if="isMobile" class="menu-item">
            <button class="feedback-button" @click="openFeedback">
                <span>{{ $t('menu.giveFeedback') }}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
        </li>
    </ul>
</template>

<script>
import { defineComponent } from 'vue';
import AdminComponent from './AdminComponent.vue';
import LocaleComponent from './LocaleComponent.vue';
import LoginComponent from './LoginComponent.vue';
import LogoutComponent from './LogoutComponent.vue';
import NotificationComponent from './NotificationComponent.vue';
import { IonButton, IonButtons, IonIcon } from '@ionic/vue';
import { close, menu } from 'ionicons/icons';
import { addIcons } from 'ionicons';
addIcons({ close, menu });
export default defineComponent({
    name: 'NavBarComponent',
    components: { LocaleComponent, LoginComponent, AdminComponent, LogoutComponent, NotificationComponent, IonButtons, IonButton, IonIcon },
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
        checkMobile() {
            this.isMobile = window.innerWidth <= 853;
        },
        openFeedback() {
            window.open('https://link.webropolsurveys.com/S/941E350F901601ED', '_blank');
        }
    },
    data() {
        return {
            showModal: false,
            LoggedIn: false,
            inCompany: false,
            Admin: false,
            isMobile: false,
            showMenu: false
        }
    },
    mounted() {
        this.checkLogin();
        this.checkCompany();
        this.checkAdmin();
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkMobile);
    }
});
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    z-index: 1000;
}

.navbar-left,
.navbar-center,
.navbar-right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.feedback-button {
    background-color: green;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-left: 10px;
    transition: all 0.3s ease;
}

.feedback-button span {
    transition: text-decoration 0.3s ease;
}

.feedback-button:hover span {
    text-decoration: underline;
}

.navbar-left {
    justify-content: flex-start;
}

.navbar-right {
    justify-content: flex-end;
}

.logo {
    height: 40px;
}

.menu {
    list-style: none;
    display: flex;
    gap: 20px;
    padding: 0;
    margin: 0;
}

.menu.mobile {
    flex-direction: column;
    background-color: #333;
    width: 100%;
    padding: 10px 0;
}

.menu-item {
    margin: auto;
}

.menu-item a {
    color: #fff;
    text-decoration: none;

}

.menu-item a:hover {
    text-decoration: underline;
}

#loginbtn {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.menu.mobile .menu-item {
    text-align: center;
}

.hamburger {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;
}

@media (min-width: 769px) and (max-width: 1024px) {
    .navbar {
        padding: 0;
    }

    .navbar-left,
    .navbar-center,
    .navbar-right {
        width: 100%;
        margin-bottom: 10px;
    }

    .navbar-left {
        margin-right: 2rem;
    }

    .menu {
        flex-direction: row;
        font-size: 10px;
        gap: 0px;
    }

    #localesty {
        --inner-padding-end: 16px;
    }

    .menu-item {
        width: 100%;
        text-align: left;
        padding-left: 10px;
    }

    .feedback-button {
        justify-content: center;
        margin-left: 0;
        height: 1.2rem;
        padding: 0.8rem;
        font-size: 0.6rem;
    }

    #loginbtn {
        width: 100%;
        text-align: center;
    }

    .hamburger {
        align-self: flex-end;
    }

    ion-button {
        --padding-start: 4px;
        --padding-end: 4px;
        --font-size: 14px;
        min-height: 0.1rem;
        --padding-top: 4px;
        --padding-bottom: 4px;
        font-size: 0.7rem;
    }

    .logo {
        width: 60%;
        height: auto;
    }
}

@media screen and (min-width: 1025px) and (max-width: 1350px) {

    .navbar {
        padding: 0;
    }

    .navbar-left,
    .navbar-center,
    .navbar-right {
        width: 100%;
        margin-bottom: 10px;
    }

    .navbar-left {
        margin-right: 2rem;
    }

    .menu {
        flex-direction: row;
        font-size: 0.9rem;
        gap: 0px;
    }

    #localesty {
        --inner-padding-end: 16px;
    }

    .menu-item {
        width: 100%;
        text-align: left;
        padding-left: 1rem;
    }

    .feedback-button {
        justify-content: center;
        margin-left: 0;
        height: 1.2rem;
        padding: 1rem;
        font-size: 0.7rem;
    }

    #loginbtn {
        width: 100%;
        text-align: center;
    }

    .hamburger {
        align-self: flex-end;
    }

    ion-button {
        --padding-start: 5px;
        --padding-end: 5px;
        --font-size: 14px;
        min-height: 0.1rem;
        --padding-top: 5px;
        --padding-bottom: 5px;
        font-size: 0.7rem;
    }

    .logo {
        width: 72%;
        height: auto;
    }
}

@media (max-width: 768px) {
    .menu:not(.mobile):not(.open) {
        display: none !important;
    }

    .menu.mobile .feedback-button {
        width: 100%;
        justify-content: center;
    }
}
</style>
