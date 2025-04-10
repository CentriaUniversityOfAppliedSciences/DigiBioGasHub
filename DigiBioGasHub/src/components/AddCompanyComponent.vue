<template>

            <ion-card>
                <ion-card-content>
                        <ion-list>
                            <ion-item >
                                <ion-icon :icon="icons.location" slot="start" />
                                <ion-input  v-model="company.name">{{ $t('general.name') }}</ion-input>
                            </ion-item>
                            <ion-item >
                                <ion-icon :icon="icons.location" slot="start" />
                                <ion-select  v-model="company.companyType" :placeholder="$t('general.industry')">
                                    <ion-select-option v-if="isAdmin" value="0">{{ $t('company.type.0') }}</ion-select-option>
                                    <ion-select-option value="1">{{ $t('company.type.1') }}</ion-select-option>
                                    <ion-select-option value="2">{{ $t('company.type.2') }}</ion-select-option>
                                    <ion-select-option value="3">{{ $t('company.type.3') }}</ion-select-option>
                                    <ion-select-option value="4">{{ $t('company.type.4') }}</ion-select-option>
                                    <ion-select-option value="5">{{ $t('company.type.5') }}</ion-select-option>
                                    <ion-select-option value="6">{{ $t('company.type.6') }}</ion-select-option>
                                </ion-select>
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

</template>

<script>
import {  IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonSelectOption, IonSelect, IonDatetime, IonCard, IonContent, IonIcon, IonList, IonCardContent, modalController, IonModal } from '@ionic/vue';
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
        IonIcon, IonList, IonCardContent, IonModal
    },
    setup() {
        const icons = {
            location: locationOutline,
            phone: callOutline,
            email: mailOutline,
            website: globeOutline,
        };

        return {
            modalController,
            icons,
        };
    },
    data() {
        return {
            company: {  name: '', address: '', city: '', zipcode: '', phone: '', email:'', companyType: null, web:'' },
            isAdmin: false,
            userID: null
        };
    },
    methods: {
        addCompany(){
            var url = "http://localhost:28765/createcompany";
            axios.post(url,{ "userID": this.userID, "name": this.company.name, "address": this.company.address, "city": this.company.city, "zipcode": this.company.zipcode, "phone": this.company.phone, "email":this.company.email, "companyType": this.company.companyType, "web":this.company.web },{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
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
        },
        checkToken(){
            if(localStorage.getItem('token') ){
                let token = localStorage.getItem('token');
                let decoded = JSON.parse(atob(token.split('.')[1]));
                if(decoded.userlevel === 99){
                    this.isAdmin = true;
                }
                this.userID = decoded.id;
            }
        }
    },
    mounted(){
        this.checkToken();
    }
});
</script>

<style scoped>
/* Add your styles here */
</style>