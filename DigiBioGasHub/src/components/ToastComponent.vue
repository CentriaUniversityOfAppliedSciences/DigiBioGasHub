<template>
    <IonToast
        :is-open="isOpen"
        :message="messages"
        :duration="duration"
        :color="color"
        @willDismiss="onDismiss"
    />
</template>

<script>
import { defineComponent, ref } from 'vue'
import { IonToast } from '@ionic/vue'
export default defineComponent({
    name: 'ToastComponent',
    components: {
        IonToast
    },
    props:{
        message: {
            type: String,
            default: ''
        },
        duration: {
            type: Number,
            default: 2000
        },
        color: {
            type: String,
            default: 'primary'
        }
    },
    setup() {
        
        return {
            
        }
    },
    data(){
        return {
            isOpen: false,
            messages: this.message
        }
    },
    methods: {
        showToast() {
            this.isOpen = true
        },
        onDismiss(){
            this.isOpen = false
        }
    },
    watch:{
        messages(newVal, oldVal){
            if(newVal !== '' && newVal.length > 0){
                this.showToast()
        } 
    }
}
})
</script>

<style scoped></style>