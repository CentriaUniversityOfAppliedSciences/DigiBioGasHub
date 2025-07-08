<template>
    <ion-page>
        <ion-content>
            <NavBarComponent />
            <ion-button id="addCertificateButton">{{ $t('admin.certificate.addCertificate') }}</ion-button>
            <ion-grid>
                <h2>{{ $t('admin.certificate.companyCertificates') }}</h2>
                <ion-row>
                    
                    <ion-col size="3" v-for="companyCertificate in companyCertificates">
                        <CertificatesComponent v-if="companyCertificate" :certificate="companyCertificate" @update="updateCertificates" :isAdmin="false" />
                    </ion-col>
                </ion-row>
            </ion-grid>
            <AddCertificateComponent @update="updateCertificates" :isAdmin="false" :companyID="companyID" />
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/vue';
import AddCertificateComponent from '../../components/AddCertificateComponent.vue';
import CertificatesComponent from '../../components/CertificatesComponent.vue';

export default defineComponent({
    name: 'CompanyCertificatesPage',
    components: { NavBarComponent, FooterComponent, IonContent, IonPage, IonButton, IonGrid, IonRow, IonCol, AddCertificateComponent, CertificatesComponent },
    data() {
        return {
            certificates: [],
            companyCertificates: [],
            companyID: ''
        };
    },
    methods: {
        getCompanyCertificates() {
            var url = this.$api_add + "/company/getcertificates";
            axios.post(url, {"companyID":this.companyID}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                if (response.data.type === "result" && response.data.result === "ok" && response.data.message.length > 0) {
                    this.companyCertificates = response.data.message;
                }
            });
        },
        updateCertificates() {
            this.getCompanyCertificates();
        }
    },
    mounted() {
        
        this.companyID = this.$route.params.id;
        this.getCompanyCertificates();
    }
});
</script>