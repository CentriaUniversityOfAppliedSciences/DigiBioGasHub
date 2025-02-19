<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
        <BlogListingComponent class="blog-card"/>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import BlogListingComponent from '../components/BlogListingComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import {IonPage, IonContent, IonGrid, IonRow, IonCol} from '@ionic/vue'
export default defineComponent ({
    name: 'BlogListingPage',
    components: { NavBarComponent, BlogListingComponent, FooterComponent, IonPage, IonContent, IonGrid, IonRow, IonCol},
    setup() {
        return {
            
        }
    },
    data() {
        return {
            articles: []
        }
    }
})
</script>
<style scoped>
.blog-card {
    text-align: center;
    
}

</style>