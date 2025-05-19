<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <KnowledgeBaseComponent />
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue'
import {
    IonPage,
    IonContent
} from '@ionic/vue'
import NavBarComponent from '../components/NavBarComponent.vue';
import KnowledgeBaseComponent from '../components/KnowledgeBaseComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default defineComponent({
    name: 'KnowledgeBasePage',
    components: {
        IonPage,
        IonContent,
        KnowledgeBaseComponent,
        FooterComponent,
        NavBarComponent
    }
})
</script>