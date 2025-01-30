<template>

    <ion-page>
        <NavBarComponent />
        <ion-content>
        <MaterialsComponent :materials="myMaterials"/>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import MaterialsComponent from '../components/MaterialsComponent.vue';
import {IonPage, IonContent} from '@ionic/vue';

export default defineComponent({
    name: 'MaterialsPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, MaterialsComponent },
    setup() {
        return {
        }
    },
    data(){
        return {

        }
    },
    methods:{
    },
    mounted(){

    }
        
    
});
</script>
<style scoped>
.materials-page {
    height: 100%;
    width: 100%;
}
ion-grid {
    --ion-grid-width: 50%;

    --ion-grid-width-xs: 50%;
    --ion-grid-width-sm: 288px;
    --ion-grid-width-md: 384px;
    --ion-grid-width-lg: 480px;
    --ion-grid-width-xl: 570px;
  }
</style>