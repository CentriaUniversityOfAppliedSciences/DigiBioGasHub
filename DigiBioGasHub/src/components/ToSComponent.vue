<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('terms.title') }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>{{$t('terms.title')}}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <p style="white-space: pre-line">{{ $t("terms.updatedDate") }}</p>
                    <p style="white-space: pre-line">{{$t('terms.content0')}}</p>
                    <p style="white-space: pre-line">{{$t('terms.content1')}}</p>
                    <p style="white-space: pre-line">{{$t('terms.content2')}}</p>
                    <p style="white-space: pre-line">{{$t('terms.content3')}}</p>
                    <p style="white-space: pre-line">{{$t('terms.content4')}}</p>
                    <p style="white-space: pre-line">{{$t('terms.content5')}}</p>
                    <p style="white-space: pre-line">{{$t('terms.content6')}}</p>                       
                    
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';

export default {
    name: 'ToSComponent',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent
    }
}
</script>

<style scoped>
/* Add any custom styles here */
</style>