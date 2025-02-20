<template>
       <ion-card>
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
</style>