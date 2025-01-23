<template>
    <nav class="navbar">
        <div class="navbar-left">
            <img :src="$t('menu.logoPath')" alt="Funder Logo" class="logo">
        </div>
        <div class="navbar-center">
            <img src="@/assets/DBH-logo.png" alt="DigiBioGasHubs Logo" class="logo">
        </div>
        <div class="navbar-right">
            <ul class="menu">
                <li class="menu-item"><a href="/home">{{$t('menu.home')}}</a></li>
                <li class="menu-item"><a href="/offers">{{ $t('menu.offers') }}</a></li>
                <li class="menu-item"><a href="/articles">{{ $t('menu.articles') }}</a></li>
                <li v-if="!LoggedIn" class="menu-item" ><LoginComponent /></li>
                <li v-if="LoggedIn" class="menu-item"><a href="/profile">{{ $t('menu.profile') }}</a></li>
                <li v-if="LoggedIn" class="menu-item"><LogoutComponent /></li>
                <li v-if="Admin" class="menu-item"><AdminComponent /></li>
                <li class="menu-item"><LocaleComponent /></li>
            </ul>
        </div>
    </nav>
</template>

<script>
import {defineComponent} from 'vue';
import AdminComponent from './AdminComponent.vue';
import LocaleComponent from './LocaleComponent.vue';
import LoginComponent from './LoginComponent.vue';
import LogoutComponent from './LogoutComponent.vue';
export default defineComponent ({
    name: 'NavBarComponent',
    components: { LocaleComponent, LoginComponent, AdminComponent, LogoutComponent },
    setup() {
        return {};
    },
    methods: {
        handleLoginModal(){
            this.showModal = true;
        },
        closeModal(){
            this.showModal = false;
        }
    },
    data() {
        return {
            showModal: false,
            LoggedIn: false,
            Admin: false
        }
    },
    mounted() {
        if (localStorage.getItem('token')) {
            this.LoggedIn = true;
        }
        if (localStorage.getItem('admin')) {
            this.Admin = true;
        }
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
}

.navbar-left, .navbar-center, .navbar-right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
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
}

.menu-item a {
    color: #fff;
    text-decoration: none;
}

.menu-item a:hover {
    text-decoration: underline;
}
</style>