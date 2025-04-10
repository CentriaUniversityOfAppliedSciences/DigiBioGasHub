<template>
    <ion-page>
        <ion-content>
        <NavBarComponent />
        <ion-content>
            <ProfileComponent :user="myUser" :offers="myOffers" :company="myCompanies"/>
        </ion-content>
        <FooterComponent />
    </ion-content>
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
            axios.post('http://localhost:28765/getuser', {id: this.getUserID()}).then(response => {
                
                    this.myUser = response.data.message;
                
                
            });
            console.log(this.myUser);
        },
        getMyCompanies(){
            axios.post('http://localhost:28765/getusercompanies', {id: this.getUserID()}).then(response => {
                this.myCompanies = response.data.message;
            });
        },
        getOffers(){
            axios.post('http://localhost:28765/getuseroffers', {id: this.getUserID()}).then(response => {
                this.myOffers = response.data.message;
            });
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