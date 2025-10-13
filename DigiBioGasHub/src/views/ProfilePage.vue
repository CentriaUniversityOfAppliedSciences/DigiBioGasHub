<template>
    <ion-page style="overflow-y: auto;">
        <NavBarComponent />
        <ion-content class="main-content">
            <ProfileComponent :user="myUser" :offers="myOffers" :company="myCompanies"/>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import ProfileComponent from '../components/ProfileComponent.vue'
import {IonPage, IonContent} from '@ionic/vue'
import axios from 'axios'
export default defineComponent ({
    name: 'ToSPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, ProfileComponent },
    setup() {
        return {
        }
    },
    data() {
        return {
            myUser: {
                name: '',
                email: '',
                company: '',
                role: '',
                phone: '',
                address: ''
            },
            myCompanies: [],
            myOffers: []
        }
    },
    methods:{
        getMyUser(){
            var url = this.$api_add + '/getuser';
            axios.post(url, {id: this.getUserID()}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
            if (response.data.type == "result" && response.data.result == "ok") {
                console.log("if through")
                    this.myUser = response.data.message;
                }
            });
            /*axios.post(this.$api_add + '/getuser', {id: this.getUserID()}).then(response => {
                    this.myUser = response.data.message;
            });*/
        },
        getMyCompanies(){
            var url = this.$api_add + '/getusercompanies';
            axios.post(url, {id: this.getUserID()}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
            if (response.data.type == "result" && response.data.result == "ok" && response.data.message.length > 0) {
                    this.myCompanies = response.data.message;
                }
            });
            /*axios.post(this.$api_add + '/getusercompanies', {id: this.getUserID()}).then(response => {
                this.myCompanies = response.data.message;
            });*/
        },
        getOffers(){
            var url = this.$api_add + '/getuseroffers';
            axios.post(url, {id: this.getUserID()}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
            if (response.data.type == "result" && response.data.result == "ok" && response.data.message.length > 0) {
                    this.myOffers = response.data.message;
                }
            });
            /*axios.post(this.$api_add + '/getuseroffers', {id: this.getUserID()}).then(response => {
                this.myOffers = response.data.message;
            });*/
        },
        getUserID(){
            let token = localStorage.getItem('token');
            let decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded.id;
        }
    },
    mounted(){
        this.getMyUser();
        this.getMyCompanies();
        this.getOffers();
    }   
})
</script>

<style scoped>
.main-content {
    min-height: 75vh;
}
</style>
