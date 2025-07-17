<template>
    <ion-modal trigger="addOffer">
        <ion-header>
            <ion-toolbar>

                <ion-buttons slot="end">
                    <ion-button @click="modalController.dismiss()">{{ $t('general.close') }}</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-card style="height: 100%;">
            <ion-content>
                <ion-card-content>

                    <p class="required-note">
                        {{ $t('validation.requiredField') }}
                    </p>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('menu.company') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-select required v-model="companyID" :placeholder="$t('product.chooseCompany')">
                            <ion-select-option v-for="comp in companies" :key="comp.name" :value="comp.id">{{ comp.name
                                }}</ion-select-option>
                            <p v-if="hasError('companyID')" class="error">{{ errors.companyID }}</p>
                        </ion-select>
                    </ion-item>

                    <ion-item>
                        <img :src="image64" />
                        <ion-label position="stacked" class="label">
                            {{ $t('product.image') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-input type="file" @IonChange="processImg"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('product.material') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-select required v-model="material" :placeholder="$t('product.chooseMaterial')"
                            @ionChange="materialSelected">
                            <ion-select-option v-for="mater in materials" :key="mater.name" :value="mater.id">{{
                                mater.name }}</ion-select-option>
                            <p v-if="hasError('material')" class="error">{{ errors.material }}</p>
                        </ion-select>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('product.name') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-input required v-model="selectedMaterialName" :placeholder="$t('product.chooseMaterial')"
                            :disabled="true"></ion-input>
                        <p v-if="hasError('selectedMaterialName')" class="error">{{ errors.selectedMaterialName }}</p>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('product.offerTypes') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-select required v-model="type" :placeholder="$t('product.chooseType')">
                            <ion-select-option value="1">{{ $t('product.type.offer') }}</ion-select-option>
                            <ion-select-option value="2">{{ $t('product.type.demand') }}</ion-select-option>
                            <ion-select-option value="3">{{ $t('product.type.auction') }}</ion-select-option>
                        </ion-select>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('product.desc') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-textarea v-model="description"></ion-textarea>
                        <p v-if="hasError('description')" class="error">{{ errors.description }}</p>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('general.address') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-input required v-model="address"></ion-input>
                        <p v-if="hasError('address')" class="error">{{ errors.address }}</p>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('general.postalCode') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-input required v-model="zipcode"></ion-input>
                        <p v-if="hasError('zipcode')" class="error">{{ errors.zipcode }}</p>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('general.city') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-input required v-model="city">
                        </ion-input>
                        <p v-if="hasError('city')" class="error">{{ errors.city }}</p>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('product.price.offer') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-input required type="number" v-model="price" min="0"></ion-input>
                        <p v-if="hasError('price')" class="error">{{ errors.price }}</p>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('product.quantity') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-input type="number" v-model="quantity" min="0"></ion-input>
                        <p v-if="hasError('quantity')" class="error">{{ errors.quantity }}</p>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('product.unit') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-select v-model="unit">
                            <ion-select-option value="1">{{ $t('unit.amount.1') }}</ion-select-option>
                            <ion-select-option value="2">{{ $t('unit.amount.2') }}</ion-select-option>
                        </ion-select>
                        <p v-if="hasError('unit')" class="error">{{ errors.unit }}</p>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('product.logistic.type') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-select v-model="logisticType">
                            <ion-select-option value="1">{{ $t('product.logistic.includedInPrice')
                                }}</ion-select-option>
                            <ion-select-option value="2">{{ $t('product.logistic.freeToPickup') }}</ion-select-option>
                            <ion-select-option value="3">{{ $t('product.logistic.agreedupon') }}</ion-select-option>

                        </ion-select>
                        <p v-if="hasError('logisticType')" class="error">{{ errors.logisticType }}</p>
                    </ion-item>

                    <ion-item>
                        <ion-datetime :locale="getLocale()" :first-day-of-week="1" hour-cycle="h23" v-model="startDate">
                            <span slot="title">{{ $t('product.productDetails.offerValidFrom') }}</span>
                            <span slot="time-label">{{ $t('product.time') }}</span>
                        </ion-datetime>
                        <p v-if="hasError('startDate')" class="error">{{ errors.startDate }}</p>
                    </ion-item>

                    <ion-item>
                        <ion-datetime :locale="getLocale()" :first-day-of-week="1" hour-cycle="h23" v-model="endDate">
                            <span slot="title">{{ $t('product.endTime') }}</span>
                            <span slot="time-label">{{ $t('product.time') }}</span>
                        </ion-datetime>
                        <p v-if="hasError('endDate')" class="error">{{ errors.endDate }}</p>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('product.visibility.info') }} <span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-select required v-model="visibility"
                            :placeholder="$t('product.visibility.chooseVisibility')">
                            <ion-select-option value="1">{{ $t('product.visibility.public') }}</ion-select-option>
                            <ion-select-option value="2">{{ $t('product.visibility.private') }}</ion-select-option>
                        </ion-select>
                        <p v-if="hasError('visibility')" class="error">{{ errors.visibility }}</p>
                    </ion-item>

                    <ion-button expand="full" @click="addProduct">{{ $t('product.submit') }}</ion-button>
                </ion-card-content>
            </ion-content>
        </ion-card>

        <ToastComponent ref="toast" />

    </ion-modal>
</template>

<script>
import { IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonSelectOption, IonSelect, IonDatetime, IonCard, IonContent, IonTitle, IonToolbar, IonButtons, IonHeader, modalController, IonCardContent, IonModal } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import ToastComponent from './ToastComponent.vue';

export default defineComponent({
    name: 'AddOfferComponent',
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
        IonTitle,
        IonToolbar,
        IonButtons,
        IonHeader,
        IonCardContent,
        IonModal,
        ToastComponent
    },
    emits: ['getOffers'],
    setup() {
        return {
            modalController
        };
    },
    data() {
        return {
            productName: '',
            description: '',
            price: 0,
            productImage: null,
            image64: '',
            imageName: '',
            type: "1",
            quantity: 0,
            companies: [],
            companyID: null,
            unit: '1',
            logisticType: "2",
            visibility: "1",
            materials: [],
            material: "",
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            selectedMaterialId: null,
            selectedMaterialName: '',
            address: '',
            zipcode: '',
            city: '',
            errors: {}
        };
    },
    methods: {

        validateForm() {
            this.errors = {};

            if (!this.companyID) this.errors.companyID = this.$t('validation.companyRequired');
            if (!this.material) this.errors.material = this.$t('validation.materialRequired');
            if (!this.selectedMaterialName) this.errors.selectedMaterialName = this.$t('validation.materialNameRequired');
            if (!this.type) this.errors.type = this.$t('validation.typeRequired');
            if (!this.description) this.errors.description = this.$t('validation.descriptionRequired');
            if (!this.address) this.errors.address = this.$t('validation.addressRequired');
            if (!this.zipcode) this.errors.zipcode = this.$t('validation.zipcodeRequired');
            if (!this.city) this.errors.city = this.$t('validation.cityRequired');
            if (!this.price || this.price <= 0) this.errors.price = this.$t('validation.priceRequired');
            if (!this.quantity || this.quantity <= 0) this.errors.quantity = this.$t('validation.quantityRequired');
            if (!this.unit) this.errors.unit = this.$t('validation.unitRequired');
            if (!this.logisticType) this.errors.logisticType = this.$t('validation.logisticTypeRequired');
            if (!this.startDate) this.errors.startDate = this.$t('validation.startDateRequired');
            if (!this.endDate) this.errors.endDate = this.$t('validation.endDateRequired');
            if (!this.visibility) this.errors.visibility = this.$t('validation.visibilityRequired');

            return Object.keys(this.errors).length === 0;
        },
        hasError(field) {
            return this.errors[field];
        },
        updateTimeZoneStart(event) {
            const date = new Date(event.target.value);
            const timezoneOffset = -date.getTimezoneOffset(); // Get the timezone offset in minutes
            const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
            const offsetMinutes = Math.abs(timezoneOffset) % 60;
            const offsetSign = timezoneOffset >= 0 ? '+' : '-';
            const timezoneString = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
            this.startDate = event.target.value + timezoneString;
        },
        getUserCompanies() {
            if (localStorage.getItem('token') != null) {
                var url = this.$api_add + "/getverifiedusercompanies";
                axios.post(url, [], { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                    if (response.data.type = "result" && response.data.result == "ok" && response.data.message.length > 0) {
                        this.companies = response.data.message;
                        if (this.companies.length === 1) {
                            this.companyID = this.companies[0].Company.id;
                            localStorage.setItem('current_company', this.companies[0].Company.id);
                        }
                    }
                });
            }
        },
        updateTimeZoneEnd(event) {
            const date = new Date(event.target.value);
            const timezoneOffset = -date.getTimezoneOffset(); // Get the timezone offset in minutes
            const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
            const offsetMinutes = Math.abs(timezoneOffset) % 60;
            const offsetSign = timezoneOffset >= 0 ? '+' : '-';
            const timezoneString = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
            this.endDate = event.target.value + timezoneString;
        },
        materialSelected(event) {
            const selectedMaterial = this.materials.find(mater => mater.id === event.target.value);
            if (selectedMaterial) {
                this.selectedMaterialName = selectedMaterial.name;
            }
        },
        addProduct() {

            if (!this.validateForm()) {
                this.$refs.toast.showToast(this.$t('validation.fillAllRequiredFields'), 2000, 'danger');
                return;
            }
            // Logic to add the product
            try {

                var url = this.$api_add + "/createoffer";
                axios.post(url, { "image64": this.image64, "imageName": this.imageName, "type": this.type, "materialID": this.material, "companyID": this.companyID, "locationID": "1", "unit": this.unit, "price": this.price, "amount": this.quantity, "startDate": this.startDate, "endDate": this.endDate, "visibility": this.visibility, "cargoType": this.logisticType, "description": this.description, "address": this.address, "city": this.city, "zipcode": this.zipcode }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                    if (response.data.result == "ok" && response.data.message != null && response.data.message != undefined) {
                        this.modalController.dismiss();
                        this.$refs.toast.showToast(this.$t('product.successMessage'), 2000, 'success');
                        this.$emit('getOffers');
                    }
                    if (response.data.result == "fail" && response.data.message === "Invalid Company") {
                        this.$refs.toast.showToast(this.$t('product.invalidCompany'), 2000, 'danger');
                    }
                });
            } catch (error) {
                this.$refs.toast.showToast(this.$t('product.errorMessage'), 2000, 'danger');
            }
        },
        getMaterials() {
            var url = this.$api_add + "/getmaterials";
            axios.post(url, { "locality": this.$i18n.locale }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {

                if (response.data.type = "result" && response.data.result == "ok" && response.data.message.length > 0) {
                    this.materials = response.data.message;

                }
            });
        },
        processImg(img) {
            let rawImg;
            const file = document.querySelector('input[type=file]').files[0];
            let reader = new FileReader();

            reader.onloadend = () => {
                rawImg = reader.result;
                this.image64 = rawImg;
                this.imageName = file.name;
            };
            this.image64 = reader.readAsDataURL(file);

        },
        getLocale() {

            if (this.$i18n.locale === 'en') {
                return 'en-GB';
            } else if (this.$i18n.locale === 'fi') {
                return 'fi-FI';
            } else if (this.$i18n.locale === 'sv') {
                return 'sv-SE';
            }
        }
    },
    mounted() {
        this.getMaterials();
        this.getUserCompanies();
    }
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
    margin-bottom: 1.5rem;
}

.error {
    color: red;
    font-size: 0.9em;
    margin-top: 4px;
}

.label {
    font-size: 1.5rem;
    margin-bottom: 5px;
}

.required-asterisk {
    color: red;
    font-size: 20PX;
}
</style>
