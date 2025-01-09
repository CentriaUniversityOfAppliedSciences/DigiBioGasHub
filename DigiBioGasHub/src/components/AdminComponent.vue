<template>

            <ion-select placeholder="Select an option">
                <ion-select-option value="users">Manage Users</ion-select-option>
                <ion-select-option value="settings">Settings</ion-select-option>
                <ion-select-option value="reports">Reports</ion-select-option>
            </ion-select>
 
</template>

<script>
import { defineComponent } from 'vue'
import {
  
   
    IonSelect,
    IonSelectOption
} from '@ionic/vue'

export default defineComponent({
    name: 'AdminComponent',
    components: {
       
        IonSelect,
        IonSelectOption
    }
})
</script>