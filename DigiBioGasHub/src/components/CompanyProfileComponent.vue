<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ $t('menu.company')}}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-list>
                <ion-item>
                    <ion-label>{{$t('account.company')}}</ion-label>
                    <ion-text>{{ user.company }}</ion-text>
                </ion-item>
                <ion-item>
                    <ion-label>{{$t('account.email')}}</ion-label>
                    <ion-text>{{ user.email }}</ion-text>
                </ion-item>
                <ion-item>
                    <ion-label>{{$t('account.phone')}}</ion-label>
                    <ion-text>{{ user.phone }}</ion-text>
                </ion-item>
                <ion-item>
                    <ion-label>{{ $t('account.address') }}</ion-label>
                    <ion-text>{{ user.address }}</ion-text>
                </ion-item>
                <ion-item>
                    <ion-label>{{$t('account.role')}}</ion-label>
                    <ion-text>{{ user.role }}</ion-text>
                </ion-item>
            </ion-list>
        </ion-card-content>
    </ion-card>
</template>
<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonText } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'CompanyProfileComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonList,
        IonItem,
        IonLabel,
        IonText
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    }
})
</script>