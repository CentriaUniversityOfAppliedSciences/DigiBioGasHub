<template>
    <div class="card-container">
    <ion-card v-for="article in limitedArticles" :key="article.postID">
        <ion-card-header>
            <ion-card-title>{{ article.title }}</ion-card-title>
            <ion-card-subtitle>{{ article.date }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
            <img :src="article.picture" alt="article picture" />
            <p>{{ article.abstract }}</p>
            <ion-item>
                <ion-button @click="openArticle(article.link)">{{ $t('blog.openArticle') }}</ion-button>
            </ion-item>
        </ion-card-content>
    </ion-card>
</div>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'BlogListingComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonItem,
        IonButton
    },
    props: {
        limit: {
            type: Number,
            default: null
        }
    },
    computed: {
        limitedArticles() {
            if (this.limit) {
                return this.articles.slice(-this.limit).reverse();
            }
            return this.articles;
        }
    },
    data() {
        return {
            articles: []
        };
    },
    methods: {
        async fetchArticles() {
            try {
                var url = "http://localhost:28765/getallblogposts";
                const response = await axios.post(url, {}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                console.log(response);
                if (response.data.result === 'ok' && Array.isArray(response.data.message)) {
                    this.articles = response.data.message.map(post => ({
                        postID: post.postID,
                        title: post.title,
                        abstract: this.extractAbstract(post.content),
                        picture: post.image,
                        link: `/article/${post.postID}`,
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
        },
        openArticle(link) {
            window.open(link, '_blank');
        }
    },
    beforeMount() {
        this.fetchArticles();
    }
});

</script>

<style scoped>
.card-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
   
}
ion-card {
    margin: 20px;
}
</style>