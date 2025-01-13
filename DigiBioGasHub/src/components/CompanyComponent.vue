<template>
            <ion-card class="company-card">
                <ion-card-header>
                    <ion-card-title>{{ company.name }}</ion-card-title>
                    <ion-card-subtitle>{{ company.industry }}</ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                    <p>{{ company.description }}</p>
                    <ion-list>
                        <ion-item v-if="!companyEdit">
                            <ion-icon :icon="icons.location" slot="start" />
                            <ion-input :disabled="companyEdit" v-model="company.name">{{ $t('general.name') }}</ion-input>
                        </ion-item>
                        <ion-item v-if="!companyEdit">
                            <ion-icon :icon="icons.location" slot="start" />
                            <ion-input :disabled="companyEdit" v-model="company.industry">{{ $t('general.industry') }}</ion-input>
                        </ion-item>
                        <ion-item v-if="!companyEdit">
                            <ion-icon :icon="icons.location" slot="start" />
                            <ion-input :disabled="companyEdit" v-model="company.description">{{ $t('general.description') }}</ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="icons.location" slot="start" />
                            <ion-input :disabled="companyEdit" v-model="company.address">{{ $t('general.address') }}</ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="icons.phone" slot="start" />
                            <ion-input :disabled="companyEdit" v-model="company.phone">{{ $t('general.phone') }}</ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="icons.email" slot="start" />
                            <ion-input :disabled="companyEdit" v-model="company.email">{{ $t('general.email') }}</ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-icon :icon="icons.website" slot="start" />
                            <ion-input :disabled="companyEdit" v-model="company.website">{{ $t('general.website') }}</ion-input>
                        </ion-item>
                    </ion-list>
                    <ion-button @click="toggleCompanyEdit" color="warning" >{{$t('menu.edit')}}</ion-button>
                    <ion-button id="deleteCompany" color="danger" >{{$t('menu.delete')}}</ion-button>
                    <ion-button @click="saveCompany" color="success" >{{$t('menu.save')}}</ion-button>
                </ion-card-content>
            </ion-card>
</template>

<script>
import { defineComponent } from 'vue';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonButton,
    IonInput,
} from '@ionic/vue';
import { locationOutline, callOutline, mailOutline, globeOutline } from 'ionicons/icons';

export default defineComponent({
    name: 'CompanyComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonList,
        IonItem,
        IonIcon,
        IonLabel,
        IonButton,
        IonInput,
    },
    props: {
        company: Object,
        
    },
    setup() {
    

        const icons = {
            location: locationOutline,
            phone: callOutline,
            email: mailOutline,
            website: globeOutline,
        };

        return {
            
            icons,
        };
    },
    data() {
        return {
            company: {
            name: 'Your Company Name',
            industry: 'Industry Type',
            description: 'A brief description of the company.',
            address: '1234 Main St, City, Country',
            phone: '+1 (555) 123-4567',
            email: 'info@company.com',
            website: 'www.company.com',
        },
        companyEdit: true,
        };
    },
    methods: {
        toggleCompanyEdit(){
            this.companyEdit = !this.companyEdit;
        }
    }
});
</script>

<style scoped>
.company-card {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}
</style>