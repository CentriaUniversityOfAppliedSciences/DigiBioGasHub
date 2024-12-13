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
                            <ion-label position="floating">{{$t('account.address')}}</ion-label>
                            <ion-input ref="street" @ionInput="validateStreetAddress" @ionBlur="markTouched" :helper-text="$t('forms.helper.address')" :error-text="$t('forms.error.street')" v-model="streetAddress" type="text"></ion-input>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center ion-padding-horizontal">
                    <ion-col size="12" size-md="8">
                        <ion-item>
                            <ion-label position="floating">{{$t('account.postal')}}</ion-label>
                            <ion-input ref="postal" @ionInput="validatePostal" @ionBlur="markTouched" :helper-text="$t('forms.helper.postal')" :error-text="$t('forms.error.postal')" v-model="zipCode" type="text"></ion-input>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row class="ion-justify-content-center ion-padding-horizontal">
                    <ion-col size="12" size-md="8">
                        <ion-item>
                            <ion-label position="floating">{{$t('account.city')}}</ion-label>
                            <ion-input ref="city" @ionInput="validateCity" @ionBlur="markTouched" :helper-text="$t('forms.helper.city')" :error-text="$t('forms.error.city')" v-model="city" type="text"></ion-input>
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
                            <ion-label position="stacked">{{$t('account.terms')}}</ion-label>
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


export default {
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
            disabled: true
        };
    },
    methods: {
        register() {
            // Handle registration logic here
            console.log('Email:', this.email);
            console.log('Password:', this.password);
            console.log('Address:', this.address);
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
                this.$refs.email.$el.classList.remove('ion-valid');
                this.$refs.email.$el.classList.add('ion-invalid');
            } else {
                this.$refs.email.$el.classList.add('ion-valid');
                this.$refs.email.$el.classList.remove('ion-invalid');
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
            this.refs.forEach(ref => {
                ref.$el.classList.add('ion-touched');
            });
        }

    }
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
