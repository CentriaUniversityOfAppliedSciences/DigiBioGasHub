<template>
    <ion-content>
        <ion-card>
            <ion-card-content>
                    <ion-list>
                        <ion-item >
                            <ion-icon :icon="icons.location" slot="start" />
                            <ion-input  v-model="company.name">{{ $t('general.name') }}</ion-input>
                        </ion-item>
                        <ion-item >
                            <ion-icon :icon="icons.location" slot="start" />
                            <ion-input  v-model="company.companyType">{{ $t('general.industry') }}</ion-input>
                        </ion-item>
                        
                        <ion-item>
                            <ion-icon :icon="icons.location" slot="start" />
                            <ion-input  v-model="company.address">{{ $t('general.address') }}</ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="icons.location" slot="start" />
                            <ion-input  v-model="company.city">{{ $t('general.city') }}</ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="icons.location" slot="start" />
                            <ion-input  v-model="company.zipcode">{{ $t('general.postalCode') }}</ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="icons.phone" slot="start" />
                            <ion-input  v-model="company.phone">{{ $t('general.phone') }}</ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="icons.email" slot="start" />
                            <ion-input  v-model="company.email">{{ $t('general.email') }}</ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="icons.website" slot="start" />
                            <ion-input  v-model="company.web">{{ $t('general.website') }}</ion-input>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            <ion-button expand="full" @click="addCompany">{{ $t('product.submit') }}</ion-button>
        </ion-card>
    </ion-content>
</template>

<script>
import {  IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonSelectOption, IonSelect, IonDatetime, IonCard, IonContent, IonIcon, IonList, IonCardContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import { locationOutline, callOutline, mailOutline, globeOutline } from 'ionicons/icons';
export default defineComponent({
    name: 'AddCompanyComponent',
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonTextarea,
        IonButton,
        IonSelectOption,
        IonSelect,
        IonDatetime,
        IonCard,
        IonContent,
        IonIcon, IonList, IonCardContent
    },
    setup() {
        const icons = {
            location: locationOutline,
            phone: callOutline,
            email: mailOutline,
            website: globeOutline,
        };

        return {
            
            icons,
        };
    },
    data() {
        return {
            company: {  name: '', address: '', city: '', zipcode: '', phone: '', email:'', companyType: '', web:'' },
        };
    },
    methods: {
        addCompany(){
            var url = "http://localhost:28765/createcompany";
            axios.post(url,{ "name": this.company.name, "address": this.company.address, "city": this.company.city, "zipcode": this.company.zipcode, "phone": this.company.phone, "email":this.company.email, "companyType": this.company.companyType, "web":this.company.web },{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                console.log(response);
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    this.materials = response.data.message;
                    this.modalController.dismiss();
                }
            });
        },
        getLocale(){
            
            if(this.$i18n.locale === 'en'){
                return 'en-GB';
            } else if(this.$i18n.locale === 'fi'){
                return 'fi-FI';
            } else if(this.$i18n.locale === 'sv'){
                return 'sv-SE';
            }
        }
    },
    mounted(){
    }
});
</script>

<style scoped>
/* Add your styles here */
</style>