<template>

    <ion-page>
        <ion-content>
            <NavBarComponent />

            <MaterialsComponent :materials="myMaterials" @getMaterials="getMaterials" />
            
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import MaterialsComponent from '../../components/MaterialsComponent.vue';
import {IonPage, IonContent} from '@ionic/vue';
import axios from 'axios';

export default defineComponent({
    name: 'MaterialsPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, MaterialsComponent },
    setup() {
        return {
        }
    },
    data(){
        return {
            myMaterials: []
        }
    },
    methods:{
        getMaterials(){
            var url = this.$api_add + "/admin/getmaterials";
            axios.post(url,[],{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    this.myMaterials = response.data.message;
                    
                }
            });
        }
    },
    mounted(){
        this.getMaterials();
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