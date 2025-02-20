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
import axios from 'axios'
import slugify from 'slugify'

export default defineComponent ({
    name: 'BlogListingPage',
    components: { NavBarComponent, BlogListingComponent, FooterComponent, IonPage, IonContent, IonGrid, IonRow, IonCol},
    data() {
        return {
            articles: []
        }
    },
    mounted() {
        this.fetchArticles()
    },
    methods: {
        async fetchArticles() {
            try {
                var url = "http://localhost:28765/getallblogposts";
                const response = await axios.post(url, {}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                console.log(response);
                if (response.data.result === 'ok' && Array.isArray(response.data.message)) {
                    this.articles = response.data.message.map(post => ({
                        title: post.title,
                        abstract: this.extractAbstract(post.content),
                        picture: post.image,
                        link: `/blog/${post.postID}/${slugify(post.title, { lower: true })}`,
                        date: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown Date'
                    }));
                }
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        },
        extractAbstract(htmlContent) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            const firstParagraph = doc.querySelector('p');
            return firstParagraph ? firstParagraph.textContent.substring(0, 200) + '...' : '';
        }
    }
})
</script>
<style scoped>
.blog-card {
    text-align: center;
    
}

</style>