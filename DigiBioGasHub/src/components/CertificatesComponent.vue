<template>
    <ion-card >
        <ion-card-header>
            <ion-card-title>{{ certificate.name }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-item>
                <ion-label>{{ certificate.description }}</ion-label>
            </ion-item>
            <ion-item>
                <ion-button v-if="certificate.fileLink" @click="openCertificateFile">{{ $t('admin.certificate.certificateFile') }}</ion-button>
                <ion-button v-if="!isAdmin" @click="editCertificateButton(certificate)" color="warning">{{ $t('menu.edit') }}</ion-button>
                <ion-button v-if="!isAdmin" @click="confirmDelete(certificate)" color="danger">{{ $t('menu.delete') }}</ion-button>
                <ion-button v-if="isAdmin" @click="adminEditCertificateButton(certificate)" color="warning">{{ $t('menu.edit') }}</ion-button>
                <ion-button v-if="isAdmin" @click="adminConfirmDelete(certificate)" color="danger">{{ $t('menu.delete') }}</ion-button>
            </ion-item>
        </ion-card-content>
    </ion-card>
    <ion-modal :is-open="openEditCertificate" @ionModalDidDismiss="closeEditCertificate" @willDismiss="closeEditCertificate">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('admin.certificate.editCertificate') }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="closeEditCertificate">{{ $t('general.close') }}</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-item>
                        <ion-label>{{ $t('admin.certificate.name') }}</ion-label>
                        <ion-input v-model="name"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-textarea v-model="description" placeholder="Description (optional)" :counter="true" maxlength="1000" :auto-grow="true"></ion-textarea>
                    </ion-item>
                    <ion-item>
                        <ion-label>{{ $t('admin.certificate.type') }}</ion-label>
                        <ion-select v-model="type" :multiple="false">
                            <ion-select-option 
                                v-for="certi in certificateTypes" 
                                :value="certi.key">
                                {{ certi.value }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-input :label="$t('admin.certificate.certificateFile')" labelPlacement="floating" type="file" @IonChange="handleEditFile"></ion-input>
                    </ion-item>
                    <ion-button @click="saveEditCertificate">{{ $t('menu.save') }}</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-modal>
</template>
<script>
import {  alertController, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'CertificatesComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonLabel,
        IonButton,
        IonItem,
        IonModal, IonHeader, IonToolbar,IonSelect, IonSelectOption, IonTextarea, IonInput, IonContent, IonTitle, IonButtons, modalController, alertController
    },
    props: {
        certificate: Object,
        isAdmin: {
            type: Boolean,
            default: false
        },
    },
    emits: ['update'],
    setup() {
        return {};
    },
    data() {
        return {
            modalController,
            name: '',
            description: '',
            type: '',
            selectedFile: null,
            openEditCertificate: false,
            certificateTypes:[],
            file64: null,
            filename: '',
            companyID: '',
            id: '',
            alertController
        };
    },
    methods: {
        openCertificateFile() {
            if (this.certificate && this.certificate.fileLink) {
                window.open(this.certificate.fileLink, '_blank');
            }
        },
        async editCertificateButton(cert){
            this.name = this.certificate.name || '';
            this.description = this.certificate.description || '';
            this.type = this.certificate.type || '';
            this.selectedFile = null; 
            this.id = cert.id;
            this.companyID = cert.companyID;
            this.openEditCertificate = true;
        },
        async adminEditCertificateButton(cert){
            this.name = this.certificate.name || '';
            this.description = this.certificate.description || '';
            this.type = this.certificate.type || '';
            this.selectedFile = null; 
            this.id = cert.id;
            this.openEditCertificate = true;
        },
        closeEditCertificate() {
            this.openEditCertificate = false;
        },
        getCertificateTypes() {
            let locale = this.i18n.global.locale.value
            var types = this.i18n.global.messages.value[locale]?.admin?.certificate?.types;
            var keys = Object.keys(types);
            var values = Object.values(types);
            for (let i = 0; i < keys.length; i++) {
                var obj = { key : keys[i], value: values[i] };
                this.certificateTypes.push(obj);
            }
        },
        saveEditCertificate(){
            if (this.isAdmin){
                var url = this.$api_add + "/admin/editcertificate";
                axios.post(url,{"certificateID":this.id,"name":this.name, "type":this.type, "description":this.description, "file64":this.file64, "filename":this.filename},{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                    if (response.data.type="result" && response.data.result == "ok"){
                        this.$emit('update'); 
                        this.openEditCertificate = false;
                    }
                });
            }
            else{
                var url = this.$api_add + "/company/editcertificate";
                axios.post(url,{"certificateID":this.id, "companyID":this.companyID, "name":this.name, "type":this.type, "description":this.description, "file64":this.file64, "filename":this.filename},{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                    if (response.data.type="result" && response.data.result == "ok"){
                        this.$emit('update'); 
                        this.openEditCertificate = false;
                    }
                });
            }
        },
        handleEditFile(){
            let rawImg;
            const file = document.querySelector('input[type=file]').files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                rawImg = reader.result;
                this.file64 = rawImg;
                this.filename = file.name;
                console.log("File name:", this.filename);
            };
            
            this.file64 = reader.readAsDataURL(file);
        },
        confirmDelete(cert) {
            this.alertController.create({
                header: this.$t('menu.are_you_sure'),
                message: this.$t('admin.certificate.deleteConfirmation'),
                buttons: [
                    {
                        text: this.$t('menu.cancel'),
                        role: 'cancel'
                    },
                    {
                        text: this.$t('menu.delete'),
                        handler: () => {
                            this.removeCertificate(cert);
                        }
                    }
                ]
            }).then(alert => alert.present());
        },
        adminConfirmDelete(cert) {
            this.alertController.create({
                header: this.$t('menu.are_you_sure'),
                message: this.$t('admin.certificate.deleteConfirmation'),
                buttons: [
                    {
                        text: this.$t('menu.cancel'),
                        role: 'cancel'
                    },
                    {
                        text: this.$t('menu.delete'),
                        handler: () => {
                            this.removeCertificate(cert);
                        }
                    }
                ]
            }).then(alert => alert.present());
        },
        removeCertificate(cert){
            if (this.isAdmin){
                var url = this.$api_add + "/admin/removecertificate";
                axios.post(url,{"certificateID":cert.id}, {headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                    if (response.data.type="result" && response.data.result == "ok"){
                        this.$emit('update'); 
                    }
                });
            }
            else{
                var url = this.$api_add + "/company/removecertificate";
                axios.post(url,{"certificateID":cert.id, "companyID":cert.companyID},{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                    if (response.data.type="result" && response.data.result == "ok"){
                        this.$emit('update'); 
                    }
                });
            }
        }
    },
    mounted() {
        this.getCertificateTypes();
    }
});

</script>