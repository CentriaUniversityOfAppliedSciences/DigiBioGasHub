<template>
  <ion-card class="article-card">
    <ion-img class="article-thumbnail" :src="article.picture" alt="Article Image" />

    <ion-card-content class="article-content">
      <ion-text class="article-title">
        <h2>{{ article.title }}</h2>
      </ion-text>

      <ion-text class="article-date">
        <small>{{ article.date }}</small>
      </ion-text>

      <ion-text class="article-description">
        <p>{{ article.abstract }}</p>
      </ion-text>
      <div>
        <slot name="actions">
          <ion-button fill="clear" size="small" @click="openArticle(article.link)">
            {{ $t('general.read_more') }}
          </ion-button>
        </slot>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonButton, IonText, IonImg } from '@ionic/vue';
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
    IonText,
    IonImg,
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
.article-card {
  max-width: 310px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  transition: max-width 0.3s ease;
}

.article-thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background-color: #f1f1f1;
}

.article-content {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.article-title h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: var(--ion-color-light-contrast);
  max-height: 2.4em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-date small {
  font-size: 1rem;
  color: var(--ion-color-medium-tint);
}

.article-description p {
  font-size: 0.95rem;
  color: var(--ion-color-medium-tint);
  line-height: 1.4;
  max-height: 2.8em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

@media (max-width: 480px) {
  .offer-card {
    max-width: 260px;
  }
}

@media (min-width: 1280px) {
  .article-card {
    max-width: 340px;
  }
}

@media (min-width: 1536px) {
  .article-card {
    max-width: 650px;
  }
}
</style>
