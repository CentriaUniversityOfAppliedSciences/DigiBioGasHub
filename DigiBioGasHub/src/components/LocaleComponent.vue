<template>

        <ion-item>
            
            <ion-select v-model="selectedLanguage" @ionChange="changeLanguage($event)" >
                <ion-select-option value="en">English</ion-select-option>
                <ion-select-option value="fi">Suomi</ion-select-option>
                <ion-select-option value="sv">Svenska</ion-select-option>
            </ion-select>
        </ion-item>

</template>

<script>
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { IonItem, IonSelect, IonSelectOption } from '@ionic/vue';

export default defineComponent({
    name: 'LocaleComponent',
    components: {
        IonItem,
        IonSelect,
        IonSelectOption,
    },
    setup() {
        

        return {
          
        };
    },
    data() {
        return {
            selectedLanguage: '',
        };
    },
    methods: {
        changeLanguage(event) {
            this.selectedLanguage = event.detail.value;
            localStorage.setItem('selectedLanguage', this.selectedLanguage);
            this.$i18n.locale = this.selectedLanguage;
        },
        checkLanguage() {
            if (localStorage.getItem('selectedLanguage')) {
                this.selectedLanguage = localStorage.getItem('selectedLanguage');
                this.$i18n.locale = this.selectedLanguage;
            } 
        },

    },
    mounted() {
        this.checkLanguage();
    },
});
</script>

<style scoped>
/* Add any styles you need here */
</style>
