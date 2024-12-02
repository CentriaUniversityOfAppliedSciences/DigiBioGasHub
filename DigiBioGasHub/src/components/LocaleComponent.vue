<template>

        <ion-item>
            
            <ion-select v-model="selectedLanguage" @ionChange="changeLanguage" value="fi">
                <ion-select-option value="en">English</ion-select-option>
                <ion-select-option value="fi">Suomi</ion-select-option>
                <ion-select-option value="sv">Svenska</ion-select-option>
            </ion-select>
        </ion-item>

</template>

<script>
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    name: 'LocaleComponent',
    setup() {
        const { locale } = useI18n();
        const selectedLanguage = ref(locale.value);

        const changeLanguage = (event) => {
            locale.value = event.target.value;
        };

        return {
            selectedLanguage,
            changeLanguage,
        };
    },
});
</script>

<style scoped>
/* Add any styles you need here */
</style>
