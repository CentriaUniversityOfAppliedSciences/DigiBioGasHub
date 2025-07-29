<template>
    <ion-page>
        <ion-content fullscreen class="ion-no-padding">

            <div class="top-nav">
                <div class="nav-left">
                    <img src="../assets/funder-logo-en.png" alt="funder-logo"
                        style="height: 30px; margin-right: 10px;" />
                    <h2 class="app-name" v-if="!isMobile">{{ $t('landingPage.appName') }}</h2>
                </div>
                <div class="nav-center">
                    <img src="../assets/DBH-logo.png" style="height: 50px;" alt="center-logo" class="center-logo" />
                </div>
                <div class="nav-right">
                    <ion-button fill="clear" style="color: white;" size="small" @click="goToPricing">{{ $t('general.pricing') }}</ion-button>
                    <ion-button fill="clear" style="color: white;" size="small" @click="goToLogin">{{ $t('general.login') }}</ion-button>
                    <ion-button fill="solid" size="small" color="primary" @click="goToSignup">{{
                        $t('landingPage.signupButton') }}</ion-button>
                    <LocaleComponent />
                </div>

                <div class="hamburger-menu" v-if="isMobile">
                    <ion-button fill="clear" @click="toggleMenu">
                        <ion-icon name="menu-outline"></ion-icon>
                    </ion-button>
                </div>
            </div>

            <div v-if="showMenu && isMobile" class="mobile-menu">
                <h2 class="app-name">{{ $t('landingPage.appName') }}</h2>
                <ion-button fill="clear" size="small" @click="goToLogin">{{ $t('general.login') }}</ion-button>
                <ion-button fill="solid" size="small" color="primary" @click="goToSignup">{{
                    $t('landingPage.signupButton') }}</ion-button>
                <LocaleComponent />
            </div>

            <section class="hero">
                <ion-grid class="container">
                    <ion-row class="ion-align-items-center">
                        <ion-col size="12" size-md="6" class="hero-text">
                            <h1 class="hero-title">{{ $t('landingPage.heroTitle') }}</h1>
                            <p class="hero-subtitle">
                                {{ $t('landingPage.heroSubtitle') }}
                            </p>
                            <ion-button size="large" class="join-btn" @click="goToLogin">
                                {{ $t('landingPage.joinButton') }} <ion-icon name="arrow-forward-sharp"></ion-icon>
                            </ion-button>
                        </ion-col>
                        <ion-col size="12" size-md="6" class="hero-image">
                            <img src="../assets/biokaasulaitos.jpeg" alt="Biogas Illustration" />
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </section>

            <section class="intro-section">
                <ion-grid class="container">
                    <ion-row class="ion-align-items-center">
                        <ion-col size="12" size-md="6" class="intro-image">
                            <img src="../assets/DBH-logo-cc.png" alt="Marketplace Illustration" />
                        </ion-col>
                        <ion-col size="12" size-md="6" class="intro-text">
                            <!--<p v-html="$t('landingPage.introSection.introText1')"></p>-->
                            <p>
                                <i18n-t keypath="landingPage.introSection.introText1" tag="span">
                                    <template #digibiogashubs>
                                        <b>{{ $t('landingPage.introSection.digibiogashubs') }}</b>
                                    </template>
                                    <template #producer_user>
                                        <b>{{ $t('landingPage.introSection.producer_user') }}</b>
                                    </template>
                                    <template #owners>
                                        <b>{{ $t('landingPage.introSection.owners') }}</b>
                                    </template>
                                    <template #logistics_operators>
                                        <b>{{ $t('landingPage.introSection.logistics_operators') }}</b>
                                    </template>
                                </i18n-t>
                            </p>
                            <p>
                            
                                <i18n-t keypath="landingPage.introSection.introText2" tag="span">
                                    <template #support>
                                        <b>{{ $t('landingPage.introSection.support') }}</b>
                                    </template>
                                    <template #diversity>
                                        <b>{{ $t('landingPage.introSection.diversity') }}</b>
                                    </template>
                                    <template #develop>
                                        <b>{{ $t('landingPage.introSection.develop') }}</b>
                                    </template>
                                </i18n-t>
                            </p>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </section>

            <section class="features-section">
                <ion-grid class="container">
                    <ion-row class="ion-justify-content-center">
                        <ion-col size="12">
                            <h2 class="section-title">{{ $t('landingPage.featuresSection.sectionTitle') }}</h2>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-justify-content-center">
                        <ion-col size="12" size-md="4" class="feature-box">
                            <ion-icon name="peoples-outline" class="feature-icon"></ion-icon>
                            <h3 class="feature-title">{{ $t('landingPage.featuresSection.feature1.title') }}</h3>
                            <p class="feature-desc">
                                {{ $t('landingPage.featuresSection.feature1.description') }}
                            </p>
                        </ion-col>

                        <ion-col size="12" size-md="4" class="feature-box">
                            <ion-icon name="list-outline" class="feature-icon"></ion-icon>
                            <h3 class="feature-title">{{ $t('landingPage.featuresSection.feature2.title') }}</h3>
                            <p class="feature-desc">
                                {{ $t('landingPage.featuresSection.feature2.description') }}
                            </p>
                        </ion-col>

                        <ion-col size="12" size-md="4" class="feature-box">
                            <ion-icon name="construct-outline" class="feature-icon"></ion-icon>
                            <h3 class="feature-title">{{ $t('landingPage.featuresSection.feature3.title') }}</h3>
                            <p class="feature-desc">
                                {{ $t('landingPage.featuresSection.feature3.description') }}
                            </p>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </section>

            <section class="research-section">
                <ion-grid class="container">
                    <ion-row class="ion-align-items-center">
                        <ion-col size="12" size-md="6" class="research-text">
                            <!--<p v-html="$t('landingPage.researchSection.researchText1')"></p>-->
                            <p>
                            
                                <i18n-t keypath="landingPage.researchSection.researchText1" tag="span">
                                    <template #digibiogashubs>
                                        <b>{{ $t('landingPage.researchSection.digibiogashubs') }}</b>
                                    </template>
                                    <template #vaasanUniversity>
                                        <b>{{ $t('landingPage.researchSection.vaasanUniversity') }}</b>
                                    </template>
                                    <template #centriaUniversity>
                                        <b>{{ $t('landingPage.researchSection.centriaUniversity') }}</b>
                                    </template>
                                    <template #seamkUniversity>
                                        <b>{{ $t('landingPage.researchSection.seamkUniversity') }}</b>
                                    </template>
                                </i18n-t>
                            </p>
                            <!--<p v-html="$t('landingPage.researchSection.researchText2')"></p>-->
                            <p>
                            
                                <i18n-t keypath="landingPage.researchSection.researchText2" tag="span">
                                    <template #congreteSolutions>
                                        <b>{{ $t('landingPage.researchSection.congreteSolutions') }}</b>
                                    </template>
                                    <template #carbonNeutralFuture>
                                        <b>{{ $t('landingPage.researchSection.carbonNeutralFuture') }}</b>
                                    </template>
                                    
                                </i18n-t>
                            </p>
                        </ion-col>

                        <ion-col size="12" size-md="6" class="research-image">
                            <img src="../assets/biokaasulaitos.jpeg" alt="Research Illustration" />
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </section>

            <section class="join-now-section">
                <ion-grid class="container">
                    <ion-row class="ion-align-items-center">
                        <ion-col size="12" class="join-now-content">
                            <ion-button class="join-now-btn" @click="goToLogin">
                                {{ $t('landingPage.joinNowSection.joinNowText') }}
                            </ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </section>

            <FooterComponent />

        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
} from '@ionic/vue';
import FooterComponent from '../components/FooterComponent.vue';
import { addIcons } from 'ionicons';
import { peopleOutline, listOutline, constructOutline, arrowForwardSharp, menuOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';
import LocaleComponent from '../components/LocaleComponent.vue';
addIcons({
    "peoples-outline": peopleOutline,
    "list-outline": listOutline,
    "construct-outline": constructOutline,
    "arrow-forward-sharp": arrowForwardSharp,
    "menu-outline": menuOutline
});

export default defineComponent({
    name: 'Home',
    components: {
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonButton,
        IonIcon,
        LocaleComponent,
        FooterComponent,
    },
    data() {
        return {
            isMobile: false,
            showMenu: false
        };
    },
    methods: {
        goToPricing() {
            this.$router.push('/pricing');
        },
        goToLogin() {
            this.$router.push('/login');
        },
        goToSignup() {
            this.$router.push('/register');
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        checkMobile() {
            this.isMobile = window.innerWidth <= 768;
        },
    },
    mounted() {
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkMobile);
    }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

p {
    font-family: "Roboto", sans-serif;
    font-size: 1.3rem;
    line-height: 1.6;
    font-weight: 400;
}

.top-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    background-color: rgb(26, 24, 24);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-left {
    display: flex;
    align-items: center;
}

.app-name {
    font-size: 1.4rem;
    font-weight: bold;
    color: #ffffff;
    margin: 0;
}

.nav-right {
    display: flex;
    align-items: center;
    gap: 0.6rem;
}

.hamburger-menu {
    display: none;
}

.mobile-menu {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    background-color: rgb(255, 255, 255);
    padding: 1rem;
    position: fixed;
    top: 70px;
    right: 10px;
    z-index: 101;
    border-radius: 8px;
    width: 200px;
}

.mobile-menu ion-button {
    color: rgb(0, 0, 0);
}

.mobile-menu h2 {
    font-family: "Roboto", sans-serif;
    color: black;
    font-size: 1.4rem;
    margin: 0 0 1rem 0;
}

.container {
    max-width: 960px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.hero {
    position: relative;
    overflow: hidden;
    color: white;
    padding: 3rem 1rem;
    background: linear-gradient(150deg, #3DA35D, #F79D65);
}

.hero::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(135deg,
            rgba(72, 172, 89, 0.356),
            rgba(0, 200, 255, 0.274),
            rgba(255, 255, 0, 0.226),
            rgba(255, 0, 149, 0.144));
    background-size: 300% 300%;
    animation: smoothColorFlow 100s ease-in-out infinite;
    pointer-events: none;
    filter: blur(12px);
}

.hero>* {
    position: relative;
    z-index: 1;
}

@keyframes smoothColorFlow {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.hero-text {
    text-align: left;
    padding-right: 1rem;
}

.hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.hero-image img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 12px;
}

.join-btn {
    --background: #021cff;
    --color: white;
    font-weight: bold;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.join-btn:hover {
    --background: #2E8B57;
    transform: scale(1.05);
}

.intro-section {
    background-color: #f4f4f4;
    color: #333;
    padding: 3rem 1rem;
}

.intro-text {
    font-size: 1.1rem;
    line-height: 1.6;
    padding-left: 1rem;
}

.intro-text p {
    margin-bottom: 1rem;
}

.intro-image img {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 12px;
}

.features-section {
    background-color: #ffffff;
    text-align: center;
    padding: 4rem 1rem;
}

.section-title {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    font-weight: bold;
    color: #004d40;
}

.feature-box {
    padding: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-box:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 77, 64, 0.12);
}

.feature-icon {
    font-size: 3rem;
    color: #009688;
    margin-bottom: 1rem;
}

.feature-title {
    color: #000000;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.feature-desc {
    margin-top: 1rem;
    color: #555555;
    font-family: "Roboto", sans-serif;
    font-size: 1.3rem;
    line-height: 1.3;
    font-weight: 450;
}

.research-section {
    background-color: #e0f2f1;
    color: #004d40;
    padding: 4rem 1rem;
}

.research-text {
    font-size: 1.1rem;
    line-height: 1.6;
    padding-right: 1rem;
}

.research-text p {
    margin-bottom: 1rem;
}

.research-image img {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 12px;
}

.join-now-section {
    background-color: #1f1d7a;
    text-align: center;
}

.join-now-btn {
    --background: none;
    --color: white;
    --box-shadow: none;
    text-decoration: underline;
}

.join-now-btn:hover {
    transform: scale(1.01);
}

@media (max-width: 768px) {
    .nav-right {
        display: none;
    }

    .hamburger-menu {
        display: block;
    }

    .hero-title {
        font-size: 2.5rem;
    }

    .join-btn {
        margin-bottom: 1rem;
    }

    .cta-btn {
        margin-bottom: 1rem;
    }
}
</style>
