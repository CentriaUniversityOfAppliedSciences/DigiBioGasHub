<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
  <ion-grid>
    <ion-row>
      <ion-col size="12" size-sm="6" size-md="3" v-for="article in articles" :key="article.title">
        <BlogListingComponent class="blog-card" :article="article" />
      </ion-col>
    </ion-row>
  </ion-grid>
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
            articles: [
                {
                    title: 'Article 1',
                    abstract: 'This is the abstract of article 1',
                    picture: 'https://via.placeholder.com/150',
                    link: 'https://www.google.com',
                    date: '2021-01-01'
                },
                {
                    title: 'Article 2',
                    abstract: 'This is the abstract of article 2',
                    picture: 'https://via.placeholder.com/150',
                    link: 'https://www.google.com',
                    date: '2021-01-02'
                },
                {
                    title: 'Article 3',
                    abstract: 'This is the abstract of article 3',
                    picture: 'https://via.placeholder.com/150',
                    link: 'https://www.google.com',
                    date: '2021-01-03'
                },
                {
                    title: 'Article 4',
                    abstract: 'This is the abstract of article 1',
                    picture: 'https://via.placeholder.com/150',
                    link: 'https://www.google.com',
                    date: '2021-01-01'
                },
                {
                    title: 'Article 5',
                    abstract: 'This is the abstract of article 2',
                    picture: 'https://via.placeholder.com/150',
                    link: 'https://www.google.com',
                    date: '2021-01-02'
                },
                {
                    title: 'Article 6',
                    abstract: 'This is the abstract of article 3',
                    picture: 'https://via.placeholder.com/150',
                    link: 'https://www.google.com',
                    date: '2021-01-03'
                }
            ]
        }
    }
})
</script>
<style scoped>
.blog-card {
    text-align: center;
    
}

</style>