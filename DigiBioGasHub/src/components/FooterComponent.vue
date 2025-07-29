<template>
    <ion-footer>
        <ion-grid class="white-footer">
            <ion-row>
                <ion-col size="12" size-md="4">
                    <ul>
                        <li class="menu-item"><a href="/terms-of-service">{{ $t('general.TermsAndConditions') }}</a></li>
                    
                        <li class="menu-item"><a href="/privacy-policy">{{ $t('general.PrivacyPolicy') }}</a></li>

                        <li class="menu-item"><a href="/pricing">{{ $t('general.pricing') }}</a></li>

                        <li class="menu-item"><a href="https://link.webropolsurveys.com/S/941E350F901601ED" target="_blank">{{ $t('general.feedback') }}</a></li>

                    </ul>
                </ion-col>

                <ion-col size="12" size-md="8">
                    <ion-row>
                        <ion-col size="12" size-sm="4" class="logo-col">
                            <img :src="$t('footer.KP')" :alt="$t('footer.KP-logo')" class="logo" />
                        </ion-col>
                        <ion-col size="12" size-sm="4" class="logo-col">
                            <img :src="$t('footer.EP')" :alt="$t('footer.EP-logo')" class="logo" />
                        </ion-col>
                        <ion-col size="12" size-sm="4" class="logo-col">
                            <img :src="$t('footer.P')" :alt="$t('footer.P-logo')" class="logo" />
                        </ion-col>
                    </ion-row>

                    <ion-row>
                        <ion-col size="12" size-sm="4" class="logo-col">
                            <img :src="$t('footer.Centria')" :alt="$t('footer.Centria-logo')" class="logo" />
                        </ion-col>
                        <ion-col size="12" size-sm="4" class="logo-col">
                            <img :src="$t('footer.seAMK')" :alt="$t('footer.seAMK-logo')" class="logo" />
                        </ion-col>
                        <ion-col size="12" size-sm="4" class="logo-col">
                            <img :src="$t('footer.vaasanYliopisto')" :alt="$t('footer.vaasanYliopisto-logo')"
                                class="logo" />
                        </ion-col>
                    </ion-row>
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
.white-footer {
    background-color: #fff;
    color: #000;
    padding: 1.5rem;
}

.menu-item a {
    color: #1b1b1b;
    text-decoration: none;
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.logo-col {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
}

.logo {
    height: 100px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    display: block;
}

</style>