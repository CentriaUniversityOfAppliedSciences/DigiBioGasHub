<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Logistics Register</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row >
                    <ion-col size="12">
                        <ion-item>
                            <ion-label position="floating">{{ $t('general.name') }}</ion-label>
                            <ion-input v-model="form.companyName" type="text" readonly></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col size="12">
                        <ion-item>
                            <ion-label position="floating">{{ $t('general.address') }}</ion-label>
                            <ion-input v-model="form.address" type="text"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col size="12">
                        <ion-item>
                            <ion-label position="floating">{{ $t('general.city') }}</ion-label>
                            <ion-input v-model="form.city" type="text"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col size="12">
                        <ion-item>
                            <ion-label position="floating">{{ $t('general.postalCode') }}</ion-label>
                            <ion-input v-model="form.zipcode" type="text"></ion-input>
                        </ion-item>
                    </ion-col>
                    <ion-col size="12">
                        <ion-item>
                            <ion-label position="floating">Haul Type</ion-label>
                            <ion-select v-model="form.haulType">
                                <ion-select-option v-for="(value, key) in materialTypes" :key="key" :value="value">
                                    {{ value }}
                                </ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <ion-button expand="block" @click="submitForm">Submit</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ToastComponent ref="toastComponent" />

        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import ToastComponent from './ToastComponent.vue';

export default defineComponent({
    name: 'LogisticsRegisterComponent',
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
        ToastComponent
    },
    data() {
        return {
            form: {
                companyID: this.$route.query.companyID || '',
                companyName: '',
                address: '',
                city: '',
                zipcode: '',
                haulType: '',
            },
            materialTypes: {}, 
        };
    },
    methods: {
        async submitForm() {

            if (!this.form.companyName || !this.form.address || !this.form.city || !this.form.zipcode || !this.form.haulType) {
                this.$refs.toastComponent.showToast(this.$t('validation.fillAllFields'), 2000, 'danger');
                return;
            }

            try {
                const response = await axios.post(this.$api_add + '/logistics/register', this.form);
                if (response.status === 200) {
                    this.$refs.toastComponent.showToast(this.$t('logistics.registerSuccess'), 2000, 'success');
                    this.resetForm();
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                this.$refs.toastComponent.showToast(this.$t('logistics.registerFail'), 2000, 'danger');
            }
        },
        resetForm() {
            this.form = {
                CompanyID: this.$route.query.companyID || '',
                companyName: '',
                address: '',
                city: '',
                zipcode: '',
                haulType: '',
            };
        },
    },
    mounted() {
        const { companyName } = this.$route.query;

        if (companyName) {
            this.form.companyName = companyName;
        }

        const materialTypes = this.$i18n.messages[this.$i18n.locale]?.material?.type;
        if (typeof materialTypes === 'object' && !Array.isArray(materialTypes)) {
            this.materialTypes = materialTypes;
        } else {
            console.error('Invalid material.type format in i18n configuration');
        }
    },
});
</script>
