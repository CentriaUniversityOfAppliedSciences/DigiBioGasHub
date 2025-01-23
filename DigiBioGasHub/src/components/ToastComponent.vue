<template>
    
</template>

<script>
import { defineComponent, ref } from 'vue'
import {  toastController } from '@ionic/vue'
export default defineComponent({
    name: 'ToastComponent',
    
    
    setup() {
        
        return { 
            
        }
    },
    
    methods: {
        async showToast(messages, duration, color){ 
            let toast = await toastController.create({
                message: messages,
                duration: duration,
                color: color
            })
            return toast.present();
        
        
    },
}

})
</script>

<style scoped></style>