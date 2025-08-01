<template>
    <ion-item>
        <ion-select v-model="selectedLanguage" @ionChange="changeLanguage($event)">
            <ion-select-option value="en">English</ion-select-option>
            <ion-select-option value="fi">Suomi</ion-select-option>
            <ion-select-option value="sv">Svenska</ion-select-option>
        </ion-select>
    </ion-item>
</template>

<script>
import { defineComponent } from 'vue';
import { IonItem, IonSelect, IonSelectOption } from '@ionic/vue';
import axios from 'axios';

export default defineComponent({
    name: 'LocaleComponent',
    components: {
        IonItem,
        IonSelect,
        IonSelectOption,
    },
    data() {
        return {
            selectedLanguage: 'fi',
        };
    },
    methods: {
        async changeLanguage(event) {
            this.selectedLanguage = event.detail.value;
            localStorage.setItem('selectedLanguage', this.selectedLanguage);
            this.$i18n.locale = this.selectedLanguage;
            try {
                await axios.post(this.$api_add + "/language", { language: this.selectedLanguage }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false })
            } catch (error) {
                console.error('Failed to save language to the database:', error);
            }
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
