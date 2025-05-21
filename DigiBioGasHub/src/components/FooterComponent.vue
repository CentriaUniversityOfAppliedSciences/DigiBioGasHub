<template>
   <ion-footer>
        <ion-grid class="dark-footer" >
            <ion-row>
                <ion-col size="12" size-sm="3">
                    <ul>
                        <li class="menu-item"><a href="/terms-of-service">{{ $t('general.TermsAndConditions') }}</a></li>
                    
                        <li class="menu-item"><a href="/privacy-policy">{{ $t('general.PrivacyPolicy') }}</a></li>

                        <li class="menu-item"><a href="https://link.webropolsurveys.com/S/941E350F901601ED" target="_blank">{{ $t('general.feedback') }}</a></li>

                    </ul>
                </ion-col>
                <ion-col size="12" size-sm="3">
                    <ion-item class="logo">
                        <img :src="$t('footer.KP')" :alt="$t('footer.KP-logo')" class="logo">
                    </ion-item>
                </ion-col size="12" size-sm="3">
                <ion-col>
                    <ion-item class="logo">
                        <img :src="$t('footer.EP')" :alt="$t('footer.EP-logo')" class="logo">
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
                        <img :src="$t('footer.seAMK')" :alt="$t('footer.seAMK-logo')" class="logo">
                    </ion-item>
                </ion-col>

                <ion-col size="12" size-sm="3">
                    <ion-item class="logo">
                        <img :src="$t('footer.vaasanYliopisto')" :alt="$t('footer.vaasanYliopisto-logo')" class="logo">
                    </ion-item>
                </ion-col>
            </ion-row>
            
        </ion-grid>
   </ion-footer>

</template>

<script>
import { IonGrid, IonRow, IonCol, IonItem, IonFooter } from '@ionic/vue';

export default {
    name: 'FooterComponent',
    components: {
        
        IonGrid,
        IonRow,
        IonCol,
        IonItem,
        IonFooter
        

        
    }
};
</script>

<style scoped>
.dark-footer {
  background-color: #333333;
  color: #fff;
  bottom: 0;
  width: 100%;
  padding: 2rem;
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