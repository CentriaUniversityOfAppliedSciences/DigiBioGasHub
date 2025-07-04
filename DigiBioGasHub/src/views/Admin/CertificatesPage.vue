<template>
    <ion-page>
        <ion-content>
            <NavBarComponent />
            <ion-button id="addCertificateButton">{{ $t('admin.certificate.addCertificate') }}</ion-button>
            <ion-grid>
                <h2>{{ $t('admin.certificate.certificates') }}</h2>
                <ion-row >
                    
                    <ion-col size="3" v-for="certificate in certificates">
                        <CertificatesComponent v-if="certificate" :certificate="certificate" @update="updateCertificates" />
                    </ion-col>
                    
                </ion-row>
                <h2>{{ $t('admin.certificate.companyCertificates') }}</h2>
                <ion-row>
                    
                    <ion-col size="3" v-for="companyCertificate in companyCertificates">
                        <CertificatesComponent v-if="companyCertificate" :certificate="companyCertificate" @update="updateCertificates" />
                    </ion-col>
                </ion-row>
            </ion-grid>
            <AddCertificateComponent @update="updateCertificates" />
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>

<script>
import { IonCol, IonContent, IonPage, IonRow, IonGrid, IonButton } from '@ionic/vue';
import FooterComponent from '../../components/FooterComponent.vue';
import NavBarComponent from '../../components/NavBarComponent.vue';
import CertificatesComponent from '../../components/CertificatesComponent.vue';
import axios from 'axios';
import AddCertificateComponent from '../../components/AddCertificateComponent.vue';
export default {
    name: 'CertificatesPage',
    components: {
        IonPage,
        IonContent,
        NavBarComponent,
        FooterComponent,
        CertificatesComponent,
        IonGrid,
        IonRow,
        IonCol,
        IonButton,
        AddCertificateComponent
    },
    data() {
        return {
            certificates: [],
            companyCertificates: []
        };
    },
    methods: {
        getCertificates() {
            var url = this.$api_add + "/admin/getcertificates";
            axios.post(url,[],{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    this.certificates = response.data.message;
                    
                }
            });
        },
        getCompanyCertificates() {
            var url = this.$api_add + "/admin/getcompanycertificates";
            axios.post(url,[],{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    this.companyCertificates = response.data.message;
                    
                }
            });
        },
        updateCertificates() {
            console.log("Updating certificates");
            this.getCertificates();
        }
    },
    mounted() {
        this.getCertificates();
        this.getCompanyCertificates();

    }
};

</script>