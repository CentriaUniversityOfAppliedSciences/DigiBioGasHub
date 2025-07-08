<template>
    <ion-modal trigger="addCertificateButton">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('admin.certificate.addCertificate') }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="modalController.dismiss()">{{ $t('general.close') }}</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-item>
                        <ion-label>{{ $t('admin.certificate.name') }}*</ion-label>
                        <ion-input ref="name" @ionInput="validateName" v-model="name" :error-text="$t('admin.certificate.nameError')" @ionBlur="markTouched"></ion-input>
                        <p v-if="hasError('name')" class="error">{{ errors.name }}</p>
                    </ion-item>
                    <ion-item>
                        <ion-textarea @ionInput="validateDesc" v-model="description" :placeholder="getDescPlaceholder()" :counter="true" maxlength="1000" :auto-grow="true"></ion-textarea>
                    </ion-item>
                    <ion-item>
                        <ion-label>{{ $t('admin.certificate.type') }}</ion-label>
                        <ion-select v-model="type" :multiple="false" @ionInput="validateType">
                            <ion-select-option 
                                v-for="certi in certificateTypes" 
                                :value="certi.key">
                                {{ certi.value }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-input :label="$t('admin.certificate.certificateFile')" labelPlacement="floating" type="file" @IonChange="handleFile"></ion-input>
                    </ion-item>
                    <ion-button @click="save">{{ $t('menu.save') }}</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>

    </ion-modal>
    <ToastComponent ref="toastComponent" />
</template>
<script>
import { IonTitle, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonSelect, IonSelectOption, IonToolbar, modalController, IonTextarea, IonToast } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import { get } from 'ol/proj';
import ToastComponent from './ToastComponent.vue';
import { save } from 'ionicons/icons';

export default defineComponent({
    name: 'AddCertificateComponent',
    components: { ToastComponent, IonTitle, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonCard, IonCardContent, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, modalController, IonTextarea, IonToast},
    setup() {
        return {};
    },
    emits: ['update'],
    props: {
        isAdmin: {
            type: Boolean,
            default: false
        },
        companyID: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            name:'',
            type: '',
            certificateTypes: [],
            companyCertificates: [],
            modalController,
            description: '',
            file64: null,
            filename: '',
            errors:{

            }
        };
    },
    methods: {
        save() {
            if (this.validateForm()) {
                this.saveCertificate();
            } else {
                this.markTouched();
            }
        },
        validateForm() {
            this.errors = {};
            if (!this.name) {
                this.errors.name = this.$t('admin.certificate.nameError');
            }
            if (!this.description) {
                this.errors.description = this.$t('admin.certificate.descriptionError');
            }
            if (!this.type) {
                this.errors.type = this.$t('admin.certificate.typeError');
            }
            return Object.keys(this.errors).length === 0;
        },
        hasError(field) {
            console.log("Checking error for field: " + field);
            console.log("Errors: ", this.errors);
            return this.errors[field];
        },
        saveCertificate() {
            if (this.isAdmin){
                var url = this.$api_add + "/admin/addcertificate";
                axios.post(url,{"name":this.name, "type":this.type, "description":this.description, "file64":this.file64, "filename":this.filename},{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                    if (response.data.type="result" && response.data.result == "ok"){
                        this.$emit('update'); 
                        this.modalController.dismiss();
                        this.resetForm();
                        
                    }
                });
            }
            else{
                var url = this.$api_add + "/company/addcertificate";
                axios.post(url,{"companyID":this.companyID, "name":this.name, "type":this.type, "description":this.description, "file64":this.file64, "filename":this.filename},{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                    if (response.data.type="result" && response.data.result == "ok"){
                        this.$emit('update'); 
                        this.modalController.dismiss();
                        this.resetForm();
                        
                    }
                });
            }
            
        },
        handleFile(){
            let rawImg;
            const file = document.querySelector('input[type=file]').files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                rawImg = reader.result;
                this.file64 = rawImg;
                this.filename = file.name;
            };
            this.file64 = reader.readAsDataURL(file);
        },
        resetForm() {
            this.name = '';
            this.type = '';
        },
        getCertificateTypes() {
            var types = this.$i18n.messages[this.$i18n.locale]?.admin?.certificate?.types;
            var keys = Object.keys(types);
            var values = Object.values(types);
            for (let i = 0; i < keys.length; i++) {
                var obj = { key : keys[i], value: values[i] };
                this.certificateTypes.push(obj);
            }
        },
        validateName(ev) {
            
            if (ev.target.value.length < 3) {
                console.log("Name is too short");
                this.safeClassUpdate('name', 'ion-invalid', 'ion-valid');
            } else {
                console.log("Name is valid");
                this.safeClassUpdate('name', 'ion-valid', 'ion-invalid');
            }
            
        },
        validateDesc(event) {
            this.description = event.target.value;
            if (this.description.length > 5) {
                //this.$refs.toastComponent.showToast(this.$t('admin.certificate.descriptionError'), 2000, 'danger');
            }
        },
        getDescPlaceholder() {
            return this.$t('admin.certificate.description');
        },
        validateType(event) {
            this.type = event.target.value;
            if (!this.type) {
                //this.$refs.toastComponent.showToast(this.$t('admin.certificate.typeError'), 2000, 'danger');
            }
        },
        safeClassUpdate(refName, addClass, removeClass) {
            const ref = this.$refs[refName];
            const el = ref?.$el || ref?.el || ref;
            console.log("Updating class for element:", el);
            console.log("Adding class:", addClass);
            console.log("Removing class:", removeClass);
            console.log("ref:", ref);

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
    },
    mounted() {
        this.getCertificateTypes();
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