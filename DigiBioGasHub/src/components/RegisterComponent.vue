<template>

        
        <ion-content>
            <ion-grid>
                <ion-row class="ion-justify-content-center ion-padding-horizontal">
                    <ion-col size="12" size-md="8">
                        <ion-item>
                            <ion-label position="floating">{{$t('account.firstName')}}</ion-label>
                            <ion-input ref="firstName" @ionInput="validateFirstName" @ionBlur="markTouched" :helper-text="$t('forms.helper.firstName')" :error-text="$t('forms.error.firstName')" v-model="firstName" type="text"></ion-input>
                            <p v-if="hasError('firstName')" class="error">{{ errors.firstName }}</p>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center ion-padding-horizontal">
                    <ion-col size="12" size-md="8">
                        <ion-item>
                            <ion-label position="floating">{{$t('account.lastName')}}</ion-label>
                            <ion-input ref="lastName" @ionInput="validateLastName" @ionBlur="markTouched" :helper-text="$t('forms.helper.lastName')" :error-text="$t('forms.error.lastName')" v-model="lastName" type="text"></ion-input>
                            <p v-if="hasError('lastName')" class="error">{{ errors.lastName }}</p>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center ion-padding-horizontal">
                    <ion-col size="12" size-md="8">
                        <ion-item>
                            <ion-label position="floating">{{$t('account.phone')}}</ion-label>
                            <ion-input ref="phone" @ionInput="validatePhoneNumber" @ionBlur="markTouched" :helper-text="$t('forms.helper.phone')" :error-text="$t('forms.error.phone')" v-model="phoneNumber" type="tel"  @input="phoneNumber = phoneNumber.replace(/\D/g, '')"></ion-input>
                            <p v-if="hasError('phoneNumber')" class="error">{{ errors.phoneNumber }}</p>
                        </ion-item>
                    </ion-col>
                </ion-row>
               
                <ion-row class="ion-justify-content-center ion-padding-horizontal">
                    <ion-col size="12" size-md="8">
                        <ion-item>
                            <ion-label position="floating">{{$t('account.email')}}</ion-label>
                            <ion-input ref="email" @ionInput="validateEmail" @ionBlur="markTouched" :helper-text="$t('forms.helper.email')" :error-text="$t('forms.error.email')" v-model="email" type="email"></ion-input>
                            <p v-if="hasError('email')" class="error">{{ errors.email }}</p>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center ion-padding-horizontal">
                    <ion-col size="12" size-md="8">
                        <ion-item>
                            <ion-label position="floating">{{$t('account.password')}}</ion-label>
                            <ion-input ref="password1"  @ionBlur="markTouched" :helper-text="$t('forms.helper.password')" :error-text="$t('forms.error.password')" v-model="password1" type="password"></ion-input>
                            <p v-if="hasError('password1')" class="error">{{ errors.password1 }}</p>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center ion-padding-horizontal">
                    <ion-col size="12" size-md="8">
                        <ion-item>
                            <ion-label position="floating">{{$t('account.confirmPassword')}}</ion-label>
                            <ion-input ref="password2" @ionInput="validatePassword" @ionBlur="markTouched" :helper-text="$t('forms.helper.confirmPassword')" :error-text="$t('forms.error.confirmPassword')" v-model="password2" type="password"></ion-input>
                            <p v-if="hasError('password2')" class="error">{{ errors.password2 }}</p>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center ion-padding-horizontal">
                    <ion-col size="12" size-md="8">
                        <ion-item>
                            <ion-label position="stacked">
                            <div style="margin-bottom:50px;margin-top:0px;">
                                <i18n-t keypath="account.terms" tag="span">
                                    <template #termsLink>
                                        <a href="/terms-of-service" target="_blank">{{ $t('account.termsLink') }}</a>
                                    </template>
                                    <template #gdpr>
                                        <a href="/privacy-policy" target="_blank">{{ $t('account.gdpr') }}</a>
                                    </template>
                                </i18n-t>
                            </div>
                        </ion-label>
                        <ion-checkbox v-model="disabled"></ion-checkbox>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center ion-padding-horizontal">
                    <ion-col size="12" size-md="8">
                        <ion-button :disabled="!disabled" expand="full" @click="register">{{ $t('forms.register') }}</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <ToastComponent ref="toastComponent" />
</template>

<script>
import {  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonCheckbox } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import ToastComponent from './ToastComponent.vue';
export default defineComponent ({
    name: 'RegisterComponent',
    components: {
        
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonItem,
        IonLabel,
        IonInput,
        IonButton,
        IonCheckbox,
        ToastComponent

    },
    data() {
        return {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            streetAddress: '',
            city: '',
            zipCode: '',
            email: '',
            password1: '',
            password2: '',
            disabled: true,
            errors:{}
        };
    },
    methods: {
        validateForm() {
            this.errors = {};

            if (!this.firstName || this.firstName.trim() === '') this.errors.firstName = this.$t('validation.registration.firstNameRequired');
            if (!this.lastName || this.lastName.trim() === '') this.errors.lastName = this.$t('validation.registration.lastNameRequired');
            if (!this.phoneNumber || this.phoneNumber.trim() === '') this.errors.phoneNumber = this.$t('validation.registration.phoneRequired');
            else if (this.phoneNumber.length <= 5 || this.phoneNumber.length >= 15) this.errors.phoneNumber = this.$t('validation.registration.invalidPhoneNumber');
            if (!this.email) this.errors.email = this.$t('validation.registration.emailRequired');
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) this.errors.email = this.$t('validation.invalidEmail');
            if(!this.password1) this.errors.password1 = this.$t('validation.registration.passwordRequired')
            else if (this.password1.length <8) this.errors.password1 = this.$t('validation.registration.weakPassword');
            if(this.password1 !== this.password2) this.errors.password2 = this.$t('validation.registration.unmatchedPassword')
            
            return Object.keys(this.errors).length === 0; 
        },
        hasError(field) {
            return this.errors[field];
        },
        register() {

            if (!this.validateForm()) {
                this.$refs.toastComponent.showToast(this.$t('forms.error.formInvalid'), 3000, 'danger');
                return;
            }
            // Handle registration logic here
            axios.post(this.$api_add + '/register', {
                name: this.firstName + ' ' + this.lastName,
                phone: this.phoneNumber,
                username: this.email,
                email: this.email,
                password: this.password1
            }).then(response => {
                if (response.status === 200) {
                    // Registration successful
                    this.$refs.toastComponent.showToast(this.$t('account.registerSuccess'), 2000, 'success');
                    const redirectPath = this.$route.query.redirect || '/login';

                    this.$router.push(redirectPath);
                }
            }).catch(error => {
                this.$refs.toastComponent.showToast(this.$t('account.registerFail'), 2000, 'danger');
            });
        },
        validateFirstName(ev) {
            if (ev.target.value === '') {
                this.safeClassUpdate('firstName', 'ion-invalid', 'ion-valid');
            } else {
                this.safeClassUpdate('firstName', 'ion-valid', 'ion-invalid');
            }
            
        },
        validateLastName(ev) {
            if (ev.target.value === '') {
                this.safeClassUpdate('lastName', 'ion-invalid', 'ion-valid');
                
            } else {
                this.safeClassUpdate('lastName', 'ion-valid', 'ion-invalid');
            }
        },
        validatePhoneNumber(ev) {
            if (ev.target.value.length > 5 && ev.target.value.length < 15) {
                this.safeClassUpdate('phone', 'ion-valid', 'ion-invalid');
            } else {
                this.safeClassUpdate('phone', 'ion-invalid', 'ion-valid');
            }
        },
        validateStreetAddress(ev) {
            if (ev.target.value === '') {
                this.safeClassUpdate('street', 'ion-invalid', 'ion-valid');
            } else {
                this.safeClassUpdate('street', 'ion-valid', 'ion-invalid');
            }
        },
        validateCity(ev) {
            if (ev.target.value === '') {
                this.safeClassUpdate('city', 'ion-invalid', 'ion-valid');
            } else {
                this.safeClassUpdate('city', 'ion-valid', 'ion-invalid');
            }
        },
        validatePostal(ev) {
            if (ev.target.value.length === 5) {
                this.safeClassUpdate('postal', 'ion-invalid', 'ion-valid');
            } else {
                this.safeClassUpdate('postal', 'ion-valid', 'ion-invalid');
            }
        },
        validateEmail(ev) {
            if (ev.target.value.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
                this.safeClassUpdate('email', 'ion-valid', 'ion-invalid');
            } else {
                this.safeClassUpdate('email', 'ion-invalid', 'ion-valid');
            }
        },
        validatePassword(ev) {
            if (ev.target.value.length < 8) {
                this.safeClassUpdate('password1', 'ion-invalid', 'ion-valid');
            } else {
                this.safeClassUpdate('password1', 'ion-valid', 'ion-invalid');
            }
            if(this.password1 === this.password2){
                this.safeClassUpdate('password2', 'ion-valid', 'ion-invalid');
            }else{
                this.safeClassUpdate('password2', 'ion-invalid', 'ion-valid');
            }
        },
        safeClassUpdate(refName, addClass, removeClass) {
            const ref = this.$refs[refName];
            const el = ref?.$el || ref?.el || ref;

            if (el?.classList) {
                if (addClass) el.classList.add(addClass);
                if (removeClass) el.classList.remove(removeClass);
            }
        },
        markTouched() {
            Object.values(this.$refs).forEach(ref => {
                const el = ref?.$el || ref?.el || ref;
                if (el?.classList) {
                    el.classList.add('ion-touched');
                }
            });
        }
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
