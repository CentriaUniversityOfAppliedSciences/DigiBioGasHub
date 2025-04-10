<template>
       <ion-card class="blog-card">
        <ion-card-header>
            <ion-card-title class="blog-card-title">{{ article.title }}</ion-card-title>
            <ion-card-subtitle class="blog-card-date">{{ article.date }}</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content class="blog-card-content">
            <img class="blog-card-img" :src="article.picture" alt="article picture"/>
            <p class="blog-card-abstract">{{ article.abstract }}</p>
            <ion-item>
                <ion-button @click="openArticle(article.link)">{{ $t('general.read_more') }}</ion-button>
            </ion-item>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';

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
        article: {
            title: String,
            abstract: String,
            picture: String,
            link: String,
            date: String,
        }
    },
    methods: {
        openArticle(link) {
            window.open(link, '_blank');
        }
    }
});

</script>

<style scoped>
ion-card {
    margin: 20px;
}

.blog-card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  margin-bottom: 20px;
}

.blog-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.blog-card-img {
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.blog-card-content {
  padding: 20px;
}

.blog-card-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px;
}

.blog-card-abstract {
  font-size: 14px;
  color: #666;
  margin: 0 0 15px;
}

.blog-card-date {
  font-size: 12px;
  color: #999;
}

</style>