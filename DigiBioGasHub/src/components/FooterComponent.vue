<template>
    <ion-footer>
        <ion-grid>
            <ion-row>
                <ion-col size="12" size-sm="3">
                    <ul>
                        <li class="menu-item"><a href="/terms-of-service">{{$t('general.TermsAndConditions') }}</a></li>
                    
                        <li class="menu-item"><a href="/privacy-policy">{{ $t('general.PrivacyPolicy') }}</a></li>
                    </ul>
                </ion-col>
                <ion-col size="12" size-sm="3">
                    <ion-item class="logo">
                        <img :src="$t('footer.EP')" :alt="$t('footer.EP-logo')" class="logo">
                    </ion-item>
                </ion-col size="12" size-sm="3">
                <ion-col>
                    <ion-item class="logo">
                        <img :src="$t('footer.KP')" :alt="$t('footer.KP-logo')" class="logo">
                    </ion-item>
                </ion-col>

                <ion-col size="12" size-sm="3">
                    <ion-item class="logo">
                        <img :src="$t('footer.P')" :alt="$t('footer.P-logo')" class="logo">
                    </ion-item>
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col size="12" size-sm="3">

                </ion-col>
                <ion-col size="12" size-sm="3">
                    <ion-item class="logo">
                        <img :src="$t('footer.Centria')" :alt="$t('footer.Centria-logo')" class="logo">
                    </ion-item>
                </ion-col>
                <ion-col size="12" size-sm="3">
                    <ion-item class="logo">
                        <img src="@/assets/DBH-logo.png" alt="DigiBioGasHubs Logo" class="logo">
                    </ion-item>
                </ion-col>

                <ion-col size="12" size-sm="3">
                    <ion-item class="logo">
                        <img src="@/assets/DBH-logo.png" alt="DigiBioGasHubs Logo" class="logo">
                    </ion-item>
                </ion-col>
            </ion-row>
            
        </ion-grid>

    </ion-footer>
</template>

<script>
import { IonFooter, IonGrid, IonRow, IonCol, IonItem } from '@ionic/vue';

export default {
    name: 'FooterComponent',
    components: {
        IonFooter,
        IonGrid,
        IonRow,
        IonCol,
        IonItem,
        

        
    }
};
</script>

<style scoped>
ion-footer {
    background-color: #333;
    color: #fff;
}
.menu-item a {
    color: #fff;
    text-decoration: none;
}
.logo {
    width: 400px;
    height: 100px;
    margin: 0 auto;
    display: block;
}
</style>