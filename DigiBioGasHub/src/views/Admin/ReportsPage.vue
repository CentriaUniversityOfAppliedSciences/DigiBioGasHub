<template>

</template>
<script>
import { defineComponent } from 'vue'
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonModal,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/vue'
import NavBarComponent from '../../components/NavBarComponent.vue';
export default defineComponent({
    name: 'ReportsPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        NavBarComponent,
        IonButton,
        IonModal,
        IonGrid,
        IonRow,
        IonCol
    },
    data() {
        return {
        }
    },
    methods: {
    }
});
</script>