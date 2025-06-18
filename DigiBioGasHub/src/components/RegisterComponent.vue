<template>
    <ion-content>
        <ion-grid>
            <ion-row class="ion-justify-content-center ion-padding-horizontal">
                <ion-col size="12" size-md="8">
                    <ion-item>
                        <ion-label position="floating">{{$t('account.firstName')}}</ion-label>
                        <ion-input ref="firstName" @ionInput="validateFirstName" @ionBlur="markTouched" :helper-text="$t('forms.helper.firstName')" :error-text="$t('forms.error.firstName')" v-model="firstName" type="text"></ion-input>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-center ion-padding-horizontal">
                <ion-col size="12" size-md="8">
                    <ion-item>
                        <ion-label position="floating">{{$t('account.lastName')}}</ion-label>
                        <ion-input ref="lastName" @ionInput="validateLastName" @ionBlur="markTouched" :helper-text="$t('forms.helper.lastName')" :error-text="$t('forms.error.lastName')" v-model="lastName" type="text"></ion-input>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-center ion-padding-horizontal">
                <ion-col size="12" size-md="8">
                    <ion-item>
                        <ion-label position="floating">{{$t('account.phone')}}</ion-label>
                        <ion-input ref="phone" @ionInput="validatePhoneNumber" @ionBlur="markTouched" :helper-text="$t('forms.helper.phone')" :error-text="$t('forms.error.phone')" v-model="phoneNumber" type="tel"></ion-input>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-center ion-padding-horizontal">
                <ion-col size="12" size-md="8">
                    <ion-item>
                        <ion-label position="floating">{{$t('account.email')}}</ion-label>
                        <ion-input ref="email" @ionInput="validateEmail" @ionBlur="markTouched" :helper-text="$t('forms.helper.email')" :error-text="$t('forms.error.email')" v-model="email" type="email"></ion-input>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-center ion-padding-horizontal">
                <ion-col size="12" size-md="8">
                    <ion-item>
                        <ion-label position="floating">{{$t('account.password')}}</ion-label>
                        <ion-input ref="password1"  @ionBlur="markTouched" :helper-text="$t('forms.helper.password')" :error-text="$t('forms.error.password')" v-model="password1" type="password"></ion-input>
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-center ion-padding-horizontal">
                <ion-col size="12" size-md="8">
                    <ion-item>
                        <ion-label position="floating">{{$t('account.confirmPassword')}}</ion-label>
                        <ion-input ref="password2" @ionInput="validatePassword" @ionBlur="markTouched" :helper-text="$t('forms.helper.confirmPassword')" :error-text="$t('forms.error.confirmPassword')" v-model="password2" type="password"></ion-input>
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
</template>

<script>
import {  IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton, IonCheckbox } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
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
        IonCheckbox

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
        };
    },
    methods: {
        register() {
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
                    const redirectPath = this.$route.query.redirect || '/home';

                    window.location.href = redirectPath;
                }
            }).catch(error => {
                console.error(error);
            });
        },
        validateFirstName(ev) {
            if (ev.target.value === '') {
                this.$refs.firstName.$el.classList.remove('ion-valid');
                this.$refs.firstName.$el.classList.add('ion-invalid');
            } else {
                this.$refs.firstName.$el.classList.add('ion-valid');
                this.$refs.firstName.$el.classList.remove('ion-invalid');
            }
            
        },
        validateLastName(ev) {
            if (ev.target.value === '') {
                this.$refs.lastName.$el.classList.remove('ion-valid');
                this.$refs.lastName.$el.classList.add('ion-invalid');
            } else {
                this.$refs.lastName.$el.classList.add('ion-valid');
                this.$refs.lastName.$el.classList.remove('ion-invalid');
            }
        },
        validatePhoneNumber(ev) {
            if (ev.target.value.length > 5 && ev.target.value.length < 15) {
                this.$refs.phoneNumber.$el.classList.remove('ion-valid');
                this.$refs.phoneNumber.$el.classList.add('ion-invalid');
            } else {
                this.$refs.phoneNumber.$el.classList.add('ion-valid');
                this.$refs.phoneNumber.$el.classList.remove('ion-invalid');
            }
        },
        validateStreetAddress(ev) {
            if (ev.target.value === '') {
                this.$refs.streetAddress.$el.classList.remove('ion-valid');
                this.$refs.streetAddress.$el.classList.add('ion-invalid');
            } else {
                this.$refs.streetAddress.$el.classList.add('ion-valid');
                this.$refs.streetAddress.$el.classList.remove('ion-invalid');
            }
        },
        validateCity(ev) {
            if (ev.target.value === '') {
                this.$refs.city.$el.classList.remove('ion-valid');
                this.$refs.city.$el.classList.add('ion-invalid');
            } else {
                this.$refs.city.$el.classList.add('ion-valid');
                this.$refs.city.$el.classList.remove('ion-invalid');
            }
        },
        validatePostal(ev) {
            if (ev.target.value.length === 5) {
                this.$refs.postal.$el.classList.remove('ion-valid');
                this.$refs.postal.$el.classList.add('ion-invalid');
            } else {
                this.$refs.postal.$el.classList.add('ion-valid');
                this.$refs.postal.$el.classList.remove('ion-invalid');
            }
        },
        validateEmail(ev) {
            if (ev.target.value.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)) {
                this.$refs.email.$el.classList.add('ion-valid');
                this.$refs.email.$el.classList.remove('ion-invalid');
            } else {
                this.$refs.email.$el.classList.remove('ion-valid');
                this.$refs.email.$el.classList.add('ion-invalid');
            }
        },
        validatePassword(ev) {
            if (ev.target.value.length < 8) {
                this.$refs.password1.$el.classList.remove('ion-valid');
                this.$refs.password1.$el.classList.add('ion-invalid');
            } else {
                this.$refs.password1.$el.classList.add('ion-valid');
                this.$refs.password1.$el.classList.remove('ion-invalid');
            }
            if(this.password1 === this.password2){
                this.$refs.password2.$el.classList.add('ion-valid');
                this.$refs.password2.$el.classList.remove('ion-invalid');
            }else{
                this.$refs.password2.$el.classList.remove('ion-valid');
                this.$refs.password2.$el.classList.add('ion-invalid');
            }
        },
        markTouched(){
            Object.values(this.$refs).forEach(ref => {
                ref.$el.classList.add('ion-touched');
            });
        }

    }
});
</script>

<style scoped>
/* Add any custom styles here */
</style>
