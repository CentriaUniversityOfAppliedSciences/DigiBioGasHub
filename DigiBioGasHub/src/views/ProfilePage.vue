<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <ProfileComponent :user="myUser"/>
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
                role: 'Admin',
                phone: '',
                address: ''
            }
        }
    },
    methods:{
        getMyUser(){
            axios.post('http://localhost:28765/getuser', {id: this.getUserID()}).then(response => {
                
                    this.myUser = response.data.message;
                
                
            });
            console.log(this.myUser);
        },
        getUserID(){
            let token = localStorage.getItem('token');
            let decoded = JSON.parse(atob(token.split('.')[1]));
            return decoded.id;
        }
    },
    mounted(){
        this.getMyUser();
    }   
})
</script>