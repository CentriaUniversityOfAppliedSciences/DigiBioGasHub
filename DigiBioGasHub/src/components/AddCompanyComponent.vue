<template>
    <ion-modal :is-open="editModalOpen" @didDismiss="onDismiss">
            <ion-header>
                <ion-toolbar>
                    <ion-title>{{ $t('company.addCompany') }}</ion-title>
                    <ion-button slot="end" @click="closeModal()">{{ $t('general.close') }}</ion-button>
                </ion-toolbar>
            </ion-header>
            <ion-content>
            <ion-card>
                <ion-card-content>
                        <ion-list>
                            <ion-item >
                                <ion-icon :icon="icons.location" slot="start" />
                                <ion-input required v-model="company.name" :label="$t('general.name')" labelPlacement="floating"></ion-input>
                                <p v-if="hasError('name')" class="error">{{ errors.name }}</p>
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
                                <p v-if="hasError('companyType')" class="error">{{ errors.companyType }}</p>
                            </ion-item>
                            
                            <ion-item>
                                <ion-icon :icon="icons.location" slot="start" />
                                <ion-input required v-model="company.address" :label="$t('general.address')" labelPlacement="floating"></ion-input>
                                <p v-if="hasError('address')" class="error">{{ errors.address }}</p>
                            </ion-item>
                            <ion-item>
                                <ion-icon :icon="icons.location" slot="start" />
                                <ion-input required v-model="company.city" :label="$t('general.city')" labelPlacement="floating"></ion-input>
                                <p v-if="hasError('city')" class="error">{{ errors.city }}</p>
                            </ion-item>
                            <ion-item>
                                <ion-icon :icon="icons.location" slot="start" />
                                <ion-input required v-model="company.zipcode" :label="$t('general.postalCode')" labelPlacement="floating"></ion-input>
                                <p v-if="hasError('zipcode')" class="error">{{ errors.zipcode }}</p>
                            </ion-item>
                            <ion-item>
                                <ion-icon :icon="icons.phone" slot="start" />
                                <ion-input required type="tel" v-model="company.phone" :label="$t('general.phone')" labelPlacement="floating"></ion-input>
                                <p v-if="hasError('phone')" class="error">{{ errors.phone }}</p>
                            </ion-item>
                            <ion-item>
                                <ion-icon :icon="icons.email" slot="start" />
                                <ion-input required v-model="company.email" :label="$t('general.email')" labelPlacement="floating"></ion-input>
                                <p v-if="hasError('email')" class="error">{{ errors.email }}</p>
                            </ion-item>
                            <ion-item>
                                <ion-icon :icon="icons.website" slot="start" />
                                <ion-input v-model="company.web" :label="$t('general.website')" labelPlacement="floating"></ion-input>
                            </ion-item>
                        </ion-list>
                    </ion-card-content>
                <ion-button expand="full" @click="addCompany">{{ $t('product.submit') }}</ion-button>
            </ion-card>
        </ion-content>
    </ion-modal>
    <ToastComponent ref="toastComponent" />
</template>

<script>
import {  IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonSelectOption, IonSelect, IonDatetime, IonCard, IonContent, IonIcon, IonList, IonCardContent, modalController, IonModal, IonHeader, IonToolbar, IonTitle } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import { locationOutline, callOutline, mailOutline, globeOutline } from 'ionicons/icons';
import ToastComponent from './ToastComponent.vue';
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
        IonIcon,
        IonList, 
        IonCardContent, 
        IonModal, 
        IonHeader, 
        IonToolbar, 
        IonTitle, 
        ToastComponent
    },
    
    data() {
        const icons = {
            location: locationOutline,
            phone: callOutline,
            email: mailOutline,
            website: globeOutline,
        };
        return {
            modalController,
            icons,
            company: {  name: '', address: '', city: '', zipcode: '', phone: '', email:'', companyType: null, web:'' },
            isAdmin: false,
            userID: null,
            errors:{},
            editModalOpen: false,
        };
    },
    props: {
        visible: Boolean,
    },
    watch: {
        visible(newVal) {
            console.log("Modal visibility changed to: ", newVal);
            this.editModalOpen = newVal;
        }
    },
    emits: ['companyAdded'],
    methods: {
        validateForm() {
            this.errors = {};

            if (!this.company.name) this.errors.name = this.$t('validation.companyNameRequired');
            if (!this.company.companyType) this.errors.companyType = this.$t('validation.companyTypeRequired');
            if (!this.company.address) this.errors.address = this.$t('validation.addressRequired');
            if (!this.company.city) this.errors.city = this.$t('validation.cityRequired');
            if (!this.company.zipcode) this.errors.zipcode = this.$t('validation.zipcodeRequired');
            if (!this.company.phone) this.errors.phone = this.$t('validation.companyPhoneRequired');
            if (!this.company.email) this.errors.email = this.$t('validation.companyEmailRequired');
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.company.email)) this.errors.email = this.$t('validation.invalidEmail');
            
            return Object.keys(this.errors).length === 0; 
        },
        hasError(field) {
            return this.errors[field];
        },
        addCompany(){
            if (!this.validateForm()) {
                this.$refs.toastComponent.showToast(this.$t('validation.fillAllRequiredFields'), 2000, 'danger');
                return;
            }
            var url = this.$api_add + "/createcompany";
            axios.post(url,{ "userID": this.userID, "name": this.company.name, "address": this.company.address, "city": this.company.city, "zipcode": this.company.zipcode, "phone": this.company.phone, "email":this.company.email, "companyType": this.company.companyType, "web":this.company.web },{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type==="result" && response.data.result ==="ok" && response.data.message.length > 0){
                    this.materials = response.data.message; 
                }
                this.$emit('companyAdded');
                this.editModalOpen = false;

            });
        },
        onDismiss() {
            this.editModalOpen = false;
            this.$emit('companyAdded');
        },
        closeModal() {
            this.editModalOpen = false;
            this.$emit('companyAdded');
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
.error {
    color: red;
    font-size: 0.9em;
    margin-top: 4px;
}
</style>
