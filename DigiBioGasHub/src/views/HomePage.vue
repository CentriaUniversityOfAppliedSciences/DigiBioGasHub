<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <NavBarComponent />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col>
            <div id="container">
              <strong>Welcome to DigiBioGasHub</strong>
              <p>Your hub for all things biogas</p>
            </div>
          </ion-col>
          <ion-col>
            <img src="https://images.placeholders.dev/?width=600&height=400&text=picture here" alt="Placeholder Image" />
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <ul>
              <li><ListingComponent :product="product1" /></li>
              <li><ListingComponent :product="product2" /></li>
              <li><ListingComponent :product="product3" /></li>
            </ul>
          </ion-col>
          <ion-col>
            <ion-row>
              <ion-col size="12" size-sm="12" size-md="6" v-for="article in articles" :key="article.title">
                <BlogListingComponent class="blog-card" :article="article" />
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-grid>
      
    </ion-content>
    <footer-component />
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonCol, IonRow } from '@ionic/vue';
import { defineComponent } from 'vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import BlogListingComponent from '../components/BlogListingComponent.vue';
import ListingComponent from '../components/ListingComponent.vue';
export default defineComponent ({
  name: 'HomePage',
  components: { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, NavBarComponent, IonGrid, IonCol, IonRow, FooterComponent, BlogListingComponent, ListingComponent },
  data() {
    return {
      product1: {
        name: 'Product 1',
        category: 'Category 1',
        description: 'This is the first product.',
        price: 100
      },
      product2: {
        name: 'Product 2',
        category: 'Category 2',
        description: 'This is the second product.',
        price: 200
      },
      product3: {
        name: 'Product 3',
        category: 'Category 3',
        description: 'This is the third product.',
        price: 300
      },
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
            ]
    }
  }
})

</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
.blog-card {
    text-align: center;
    
}
</style>
