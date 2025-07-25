<template>
    <ion-page>
        <ion-header>
            <NavBarComponent />
        </ion-header>
        <ion-content class="ion-padding">
            <ion-grid class="form-grid">
                <ion-toolbar>
                    <ion-title style="text-align: center;">{{ $t('company.logistics.terminalRegistration') }}</ion-title>
                </ion-toolbar>
                <ion-row>
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
                            <ion-label position="floating">{{ $t('company.logistics.haulType')
                                }}</ion-label>
                            <ion-select multiple="true" v-model="form.haulType">
                                <ion-select-option v-for="(value, key) in materialTypes" :key="key" :value="key">
                                    {{ value }}
                                </ion-select-option>
                            </ion-select>
                        </ion-item>
                    </ion-col>
                    <ion-col size="12">
                        <ion-item>
                            <ion-label position="floating">{{ $t('product.visibility.chooseVisibility') }}</ion-label>
                            <ion-select v-model="form.visibility">
                                <ion-select-option value="1">{{ $t('product.visibility.public') }}</ion-select-option>
                                <ion-select-option value="0">{{ $t('product.visibility.private') }}</ion-select-option>
                            </ion-select>
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

        </ion-content>
        <FooterComponent />
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
                haulType: [],
                visibility: '0', // Default visibility set to private
            },
            materialTypes: {}, 
        };
    },
    emits: ['refreshLogistics'],
    methods: {
        async submitForm() {

            if (!this.form.companyName || !this.form.address || !this.form.city || !this.form.zipcode || !this.form.haulType) {
                this.$refs.toastComponent.showToast(this.$t('validation.fillAllRequiredFields'), 2000, 'danger');
                return;
            }

            try {
                const response = await axios.post(this.$api_add + '/logistics/register', this.form);
                if (response.status === 200) {
                    this.$refs.toastComponent.showToast(this.$t('company.logistics.registerSuccess'), 2000, 'success');
                    this.resetForm();
                    this.$emit('refreshLogistics');
                    this.$router.push({
                        path: '/logistics',
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
                haulType: '',
            };
        },
    },
    mounted() {
        const { companyName } = this.$route.query;

        if (companyName) {
            this.form.companyName = companyName;
        }
        let locale = this.i18n.global.locale.value;
        const materialTypes = this.i18n.global.messages.value[locale]?.material?.type;
        if (typeof materialTypes === 'object' && !Array.isArray(materialTypes)) {
            this.materialTypes = materialTypes;
        } else {
            console.error('Invalid material.type format in i18n configuration');
        }
    },
});
</script>

<style scoped>

.form-grid {
    max-width: 700px;
    width: 100%; 
    padding: 5px;
    margin: auto;
    border-radius: 8px;
    border: 2px solid gray;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
