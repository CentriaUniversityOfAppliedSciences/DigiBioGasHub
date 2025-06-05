<template>
    <ion-page>
        <ion-content fullscreen class="ion-no-padding">

            <div class="top-nav">
                <div class="nav-left">
                    <img src="../assets/funder-logo-en.png" alt="funder-logo"
                        style="height: 30px; margin-right: 10px;" />
                    <h2 class="app-name">DigiBiogasHubs</h2>
                </div>
                <div class="nav-center">
                    <img src="../assets/DBH-logo.png" style="height: 50px;" alt="center-logo" class="center-logo" />
                </div>
                <div class="nav-right">
                    <ion-button fill="clear" size="small" @click="goToLogin">Login</ion-button>
                    <ion-button fill="solid" size="small" color="primary" @click="goToSignup">Sign Up</ion-button>
                </div>
            </div>

            <section class="hero">
                <ion-grid class="container">
                    <ion-row class="ion-align-items-center">
                        <ion-col size="12" size-md="6" class="hero-text">
                            <h1 class="hero-title">Welcome to DigiBiogasHubs</h1>
                            <p class="hero-subtitle">
                                The digital meeting place for the biogas business
                            </p>
                            <ion-button size="large" class="join-btn" @click="goToLogin">
                                Join <ion-icon name="arrow-forward-sharp"></ion-icon>
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
                            <p>
                                <strong>DigiBiogasHubs</strong> is a new digital marketplace that brings together
                                <strong>biogas producers and users</strong>, <strong>biomass owners</strong>, and
                                <strong>logistics operators</strong>.
                            </p>
                            <p>
                                Our goal is to <strong>develop a sustainable energy economy</strong>, support the
                                <strong>wider adoption of biogas</strong>, and address challenges related to the
                                <strong>fragmentation of the sector</strong>.
                            </p>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </section>

            <section class="features-section">
                <ion-grid class="container">
                    <ion-row class="ion-justify-content-center">
                        <ion-col size="12">
                            <h2 class="section-title">With our service, you can:</h2>
                        </ion-col>
                    </ion-row>
                    <ion-row class="ion-justify-content-center">
                        <ion-col size="12" size-md="4" class="feature-box">
                            <ion-icon name="people-outline" class="feature-icon"></ion-icon>
                            <h3 class="feature-title">Find Partners</h3>
                            <p class="feature-desc">
                                Connect with biogas producers, consumers, and logistics operators.
                            </p>
                        </ion-col>

                        <ion-col size="12" size-md="4" class="feature-box">
                            <ion-icon name="list-outline" class="feature-icon"></ion-icon>
                            <h3 class="feature-title">Create & Browse Listings</h3>
                            <p class="feature-desc">
                                Post or discover biomass and biogas resources to trade or collaborate.
                            </p>
                        </ion-col>

                        <ion-col size="12" size-md="4" class="feature-box">
                            <ion-icon name="construct-outline" class="feature-icon"></ion-icon>
                            <h3 class="feature-title">Use Smart Tools</h3>
                            <p class="feature-desc">
                                Boost development and operations with digital collaboration tools.
                            </p>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </section>

            <section class="research-section">
                <ion-grid class="container">
                    <ion-row class="ion-align-items-center">
                        <ion-col size="12" size-md="6" class="research-text">
                            <p>
                                <strong>DigiBiogasHubs</strong> is part of a joint research project by the
                                <strong>University of Vaasa</strong>, <strong>Centria University of Applied
                                    Sciences</strong>, and
                                <strong>Seinäjoki University of Applied Sciences</strong>, aimed at fostering
                                cooperation among biogas actors.
                            </p>
                            <p>
                                Our platform offers <strong>concrete solutions</strong> to help you grow your business
                                and be part of building a
                                <strong>carbon-neutral future</strong>.
                            </p>
                            <ion-button color="success" size="large" class="cta-btn" @click="goToLogin">
                                Join Now
                            </ion-button>
                        </ion-col>

                        <ion-col size="12" size-md="6" class="research-image">
                            <img src="../assets/biokaasulaitos.jpeg" alt="Research Illustration" />
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
import { peopleOutline, listOutline, constructOutline, arrowForwardSharp } from 'ionicons/icons';
import { defineComponent } from 'vue';
addIcons({
    "people-outline": peopleOutline,
    "list-outline": listOutline,
    "construct-outline": constructOutline,
    "arrow-forward-sharp": arrowForwardSharp
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
        FooterComponent,
    },
    data() {
        return {};
    },
    methods: {
        goToLogin() {
            this.$router.push('/login');
        },
        goToSignup() {
            this.$router.push('/register');
        },
    },
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

.nav-right ion-button {
    margin-left: 0.5rem;
}

.container {
    max-width: 960px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

.hero {
    background: linear-gradient(150deg, #3DA35D, #F79D65);
    color: white;
    padding: 5rem 1rem;
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
    padding: 4rem 1rem;
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

.cta-btn {
    margin-top: 1rem;
    --background: #009688;
    --color: white;
    font-weight: bold;
}
</style>
