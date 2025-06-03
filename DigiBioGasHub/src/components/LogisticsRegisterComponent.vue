<template>
    <ion-page>
        <ion-header>
            <NavBarComponent />
        </ion-header>
        <ion-content class="ion-padding">
            <ion-grid class="form-grid">
                <ion-toolbar>
                    <ion-title style="text-align: center;">{{ $t('company.logisticsRegistration.title') }}</ion-title>
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
                            <ion-label position="floating">{{ $t('company.logisticsRegistration.haulType')
                                }}</ion-label>
                            <ion-select multiple="true" v-model="form.haulType">
                                <ion-select-option v-for="(value, key) in materialTypes" :key="key" :value="value">
                                    {{ value }}
                                </ion-select-option>
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
