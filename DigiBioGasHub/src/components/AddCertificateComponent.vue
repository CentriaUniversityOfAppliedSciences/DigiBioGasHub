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
                        <ion-input :label="$t('admin.certificate.certificateFile')" labelPlacement="floating" type="file" @IonChange="handleFile"></ion-input>
                    </ion-item>
                    <ion-button @click="saveCertificate">{{ $t('menu.save') }}</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>

    </ion-modal>
</template>
<script>
import { IonTitle, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonSelect, IonSelectOption, IonToolbar, modalController, IonTextarea } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'AddCertificateComponent',
    components: { IonTitle, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonCard, IonCardContent, IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, modalController, IonTextarea},
    setup() {
        return {};
    },
    emits: ['update'],
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
        };
    },
    methods: {
        saveCertificate() {
            var url = this.$api_add + "/admin/addcertificate";
            axios.post(url,{"name":this.name, "type":this.type, "description":this.description, "file64":this.file64, "fileName":this.filename},{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type="result" && response.data.result == "ok"){
                    this.$emit('update'); 
                    this.modalController.dismiss();
                    this.resetForm();
                    console.log("Certificate added successfully");
                    
                }
            });
            
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
        }
    },
    mounted() {
        this.getCertificateTypes();
        // Perform any actions when the component is mounted
    }
});

</script>