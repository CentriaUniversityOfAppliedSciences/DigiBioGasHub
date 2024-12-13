<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>User Profile</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-header>
                    <ion-card-title>{{ user.name }}</ion-card-title>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item>
                            <ion-label>{{$t('account.email')}}</ion-label>
                            <ion-text>{{ user.email }}</ion-text>
                        </ion-item>
                        <ion-item>
                            <ion-label>Phone</ion-label>
                            <ion-text>{{ user.phone }}</ion-text>
                        </ion-item>
                        <ion-item>
                            <ion-label>Address</ion-label>
                            <ion-text>{{ user.address }}</ion-text>
                        </ion-item>
                    </ion-list>
                </ion-card-content>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText } from '@ionic/vue';

export default defineComponent({
    name: 'ProfileComponent',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonList,
        IonItem,
        IonLabel,
        IonText
    },
    data() {
        return {
            user: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                phone: '123-456-7890',
                address: '123 Main St, Anytown, USA'
            }
        };
    }
});
</script>

<style scoped>
ion-card {
    margin: 20px;
}
</style>