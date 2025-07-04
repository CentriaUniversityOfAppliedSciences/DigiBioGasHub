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
            </ion-item>
        </ion-card-content>
    </ion-card>
</template>
<script>
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel } from '@ionic/vue';
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
        IonItem
    },
    props: {
        certificate: Object
    },
    emits: ['update'],
    setup() {
        return {};
    },
    data() {
        return {};
    },
    methods: {
        logThis() {
            console.log("CertificatesComponent mounted with certificate:", this.certificate);
        },
        openCertificateFile() {
            if (this.certificate && this.certificate.fileLink) {
                window.open(this.certificate.fileLink, '_blank');
            } else {
                console.warn('No file link available for this certificate.');
            }
        }
    },
    mounted() {
        this.logThis();
        // Perform any actions when the component is mounted
    }
});

</script>