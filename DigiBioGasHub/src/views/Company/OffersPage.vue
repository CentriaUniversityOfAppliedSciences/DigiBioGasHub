<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col v-for="product in products" :key="product.id" size="12" size-sm="6" size-md="4" size-lg="3">
                            <ListingComponent v-if="product" :product="product" :isMarketplace="false" :isCompanyParent="true"/>
                        </ion-col>
                </ion-row>
            </ion-grid>
            <FooterComponent />
        </ion-content>
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue';
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
} from '@ionic/vue';
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import axios from 'axios';
import ListingComponent from '../../components/ListingComponent.vue';
import {useRoute} from 'vue-router';

export default defineComponent({
    name: 'CompanyOffersPage',
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
        IonCol, 
        FooterComponent,
        ListingComponent
    },
    data() {
        return {
            products: [],
        }
    },
    setup() {
        const route = useRoute();
        const companyID = route.params.id;
        return{
            companyID
        }
    },
    mounted() {
       this.getCompanyOffers();
    },
    methods: {
        getCompanyOffers(){
            var url = this.$api_add + "/companyoffers";
            axios.post(url,{"companyID":this.companyID},{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    this.products = response.data.message;
                    //this.currentProducts = response.data.message;
                }
            });
        }
    }
});
</script>