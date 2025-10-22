<template>
    <ion-page>
        <ion-header>
            <NavBarComponent />
        </ion-header>
        <ion-content class="ion-padding">
            <ion-grid class="form-grid">
                <ion-toolbar>
                    <ion-title style="text-align: center;">{{ $t('company.locationRegistration.title') }}</ion-title>
                </ion-toolbar>
                <ion-row>
                    <p class="required-note">
                        {{ $t('validation.requiredField') }}
                    </p>

                    <ion-col size="12">
                        <ion-item>
                            <ion-label position="stacked" class="label">{{ $t('general.company') }} <span
                                    class="required-asterisk">*</span></ion-label>
                            <ion-input v-model="form.companyName" type="text" readonly></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col size="12">
                        <ion-item>
                            <ion-label position="stacked" class="label">{{ $t('general.address') }}<span
                                    class="required-asterisk">*</span></ion-label>
                            <ion-input v-model="form.address" type="text"
                                :placeholder="$t('company.address')"></ion-input>
                            <p v-if="hasError('address')" class="error">{{ errors.address }}</p>
                        </ion-item>
                    </ion-col>
                    <ion-col size="12">
                        <ion-item>
                            <ion-label position="stacked" class="label">{{ $t('general.city') }}<span
                                    class="required-asterisk">*</span></ion-label>
                            <ion-input v-model="form.city" type="text" :placeholder="$t('company.city')"></ion-input>
                            <p v-if="hasError('city')" class="error">{{ errors.city }}</p>
                        </ion-item>
                    </ion-col>
                    <ion-col size="12">
                        <ion-item>
                            <ion-label position="stacked" class="label">{{ $t('general.postalCode') }}<span
                                    class="required-asterisk">*</span></ion-label>
                            <ion-input v-model="form.zipcode" type="text"
                                :placeholder="$t('company.postalCode')"></ion-input>
                            <p v-if="hasError('zipcode')" class="error">{{ errors.zipcode }}</p>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <ion-button expand="block" @click="submitForm">{{ $t('general.submit') }}</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ToastComponent ref="toastComponent" />
            <FooterComponent />
        </ion-content>

    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import ToastComponent from './ToastComponent.vue';
import NavBarComponent from './NavBarComponent.vue';
import FooterComponent from './FooterComponent.vue';

export default defineComponent({
    name: 'CompanyLocationRegisterComponent',
    components: {
        IonPage,
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
        IonTextarea,
        IonButton,
        IonSelect,
        IonSelectOption,
        ToastComponent,
        NavBarComponent,
        FooterComponent
    },
    data() {
        return {
            form: {
                companyID: this.$route.query.companyID || '',
                companyName: '',
                address: '',
                city: '',
                zipcode: '',
            },
            errors: {}
        };
    },
    emits: ['refreshLocations'],
    methods: {

        validateForm() {
            this.errors = {};

            if (!this.form.address || this.form.address.trim() == '') this.errors.address = this.$t('validation.addressRequired');
            if (!this.form.zipcode || this.form.zipcode.trim() == '') this.errors.zipcode = this.$t('validation.zipcodeRequired');
            if (!this.form.city || this.form.city.trim() == '') this.errors.city = this.$t('validation.cityRequired');

            return Object.keys(this.errors).length === 0;
        },
        hasError(field) {
            return this.errors[field];
        },
        async submitForm() {

            if (!this.validateForm()) {
                this.$refs.toastComponent.showToast(this.$t('validation.fillAllRequiredFields'), 2000, 'danger');
                return;
            }

            try {
                const response = await axios.post(this.$api_add + '/company/addlocation', this.form);
                if (response.data.type === 'result' && response.data.result === 'ok') {
                    this.$refs.toastComponent.showToast("Location added successfully!", 2000, 'success');
                    this.resetForm();
                    this.$emit('refreshLocations');
                    this.$router.push({
                        path: '/companylocations',
                        query: {
                            companyID: this.$route.query.companyID,
                            companyName: this.$route.query.companyName,
                        },
                    });
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                this.$refs.toastComponent.showToast(this.$t('company.logistics.registerFail'), 2000, 'danger');
            }
        },
        resetForm() {
            this.form = {
                CompanyID: this.$route.query.companyID || '',
                companyName: '',
                address: '',
                city: '',
                zipcode: '',
            };
        },
    },
    mounted() {
        const { companyName } = this.$route.query;

        if (companyName) {
            this.form.companyName = companyName;
        }
    },
});
</script>

<style scoped>
.required-note {
    padding: 0.5rem;
    border-radius: 10px;
    color: var(--color);
    background-color: transparent;
    text-align: center;
    border: 2px solid var(--ion-color-warning);
    max-width: 18rem;
    margin: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.form-grid {
    max-width: 700px;
    width: 100%;
    padding: 5px;
    margin: auto;
    border-radius: 8px;
    border: 2px solid gray;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 4rem;
}

.label {
    font-size: 1.5rem;
    margin-bottom: 5px;
}

.required-asterisk {
    color: red;
    font-size: 20PX;
}

.error {
    color: red;
    font-size: 0.9em;
    margin-top: 4px;
}
</style>
