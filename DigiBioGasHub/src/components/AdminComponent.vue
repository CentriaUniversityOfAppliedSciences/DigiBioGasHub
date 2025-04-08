<template>

            <ion-select placeholder="Select an option" @ionChange="handleSelectChange">
                <ion-select-option value="materials">{{ $t('admin.materials') }}</ion-select-option>
                <ion-select-option value="users">{{ $t('admin.manage_users') }}</ion-select-option>
                <ion-select-option value="blog">{{ $t('admin.blog') }}</ion-select-option>
                <ion-select-option value="settings">{{ $t('admin.settings') }}</ion-select-option>
                <ion-select-option value="reports">{{ $t('admin.reports') }}</ion-select-option>
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
    },
    methods: {
        handleSelectChange(event) {
            const selectedValue = event.target.value
            if (selectedValue === "materials") {
                this.$router.push('/admin/materials');
            } else if (selectedValue === "users") {
                this.$router.push('/admin/manage-users');
                console.log('Users')
            } else if (selectedValue === "settings") {
                this.$router.push('/admin/settings');
                console.log('Settings')
            } else if (selectedValue === "reports") {
                this.$router.push('/admin/reports');
                console.log('Reports')
            }
            else if (selectedValue === "blog") {
                this.$router.push('/admin/manage-blog-post');
                console.log('Blog')
            }
        }
    }
})
</script>