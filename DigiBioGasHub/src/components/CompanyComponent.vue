<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Company Profile</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>{{ company.name }}</ion-card-title>
                    <ion-card-subtitle>{{ company.industry }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <p>{{ company.description }}</p>
                    <ion-list>
                        <ion-item>
                            <ion-icon :icon="icons.location" slot="start" />
                            <ion-label>{{ company.address }}</ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="icons.phone" slot="start" />
                            <ion-label>{{ company.phone }}</ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="icons.email" slot="start" />
                            <ion-label>{{ company.email }}</ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="icons.website" slot="start" />
                            <ion-label>{{ company.website }}</ion-label>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
} from '@ionic/vue';
import { locationOutline, callOutline, mailOutline, globeOutline } from 'ionicons/icons';

export default defineComponent({
    name: 'CompanyComponent',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonList,
        IonItem,
        IonIcon,
        IonLabel,
    },
    setup() {
        const company = {
            name: 'Your Company Name',
            industry: 'Industry Type',
            description: 'A brief description of the company.',
            address: '1234 Main St, City, Country',
            phone: '+1 (555) 123-4567',
            email: 'info@company.com',
            website: 'www.company.com',
        };

        const icons = {
            location: locationOutline,
            phone: callOutline,
            email: mailOutline,
            website: globeOutline,
        };

        return {
            company,
            icons,
        };
    },
});
</script>

<style scoped>
/* Add your styles here */
</style>