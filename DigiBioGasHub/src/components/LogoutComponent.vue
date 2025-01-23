<template>
    
       
            <IonButton @click="logoutUser">Logout</IonButton>
       
</template>

<script>
import {  IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LogoutComponent',
    components: {
        IonButton
    },
    setup() {
        return {
            
        }
    },
    methods: {
        logoutUser(){
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            window.location.href = '/home';
        }
    }
})

</script>