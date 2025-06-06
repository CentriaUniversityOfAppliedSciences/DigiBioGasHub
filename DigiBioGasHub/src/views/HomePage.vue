<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <NavBarComponent />
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid class="main-grid">
       
        <h2 style="margin: 20px ;">{{ $t("general.latestOffers") }}</h2>
        <ion-row>
          <ion-col v-for="product in products" :key="product.id" size="12" size-sm="6" size-md="4" size-lg="3">
            <ListingComponent :product="product" :isMarketplace="true" />
          </ion-col>
        </ion-row>
        <h2 style="margin: 20px ;">{{ $t("general.latestArticles") }}</h2>
        <ion-row>
          <ion-col style="padding: 10px;" size="12" size-sm="12" size-md="6" v-for="article in articles"
            :key="article.title">
            <BlogListingComponent class="blog-card" :article="article" />
          </ion-col>
        </ion-row>
      </ion-grid>
      <FooterComponent />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonFooter } from '@ionic/vue';
import { defineComponent } from 'vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import BlogListingComponent from '../components/BlogListingComponent.vue';
import ListingComponent from '../components/ListingComponent.vue';
import axios from 'axios';
import slugify from 'slugify';

export default defineComponent({
  name: 'HomePage',
  components: { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, NavBarComponent, IonGrid, IonCol, IonRow, FooterComponent, BlogListingComponent, ListingComponent, IonFooter },
  data() {
    return {
      products: [

      ],
      currentProducts: [],
      articles: [

      ]
    }
  },
  methods: {
    getProducts() {

      var url = this.$api_add + "/getoffers";
      axios.post(url, [], { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
        if (response.data.type = "result" && response.data.result == "ok" && response.data.message.length > 0) {
          this.products = response.data.message;
          this.currentProducts = response.data.message;

        }
      });
    },
    getCompanies() {
      if (localStorage.getItem('token') != null) {
        var url = this.$api_add + "/getusercompanies";
        axios.post(url, [], { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
          if (response.data.type = "result" && response.data.result == "ok" && response.data.message.length > 0) {

            localStorage.setItem('current_company', response.data.message[0].id);
          }
        });
      }
    },

    getArticles() {
      var url = this.$api_add + "/getlatest4blogposts";
      axios.post(url, [], { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
        if (response.data.result === 'ok' && Array.isArray(response.data.message) && response.data.message.length > 0) {
          this.articles = response.data.message.map(post => ({
            title: post.title,
            abstract: this.extractAbstract(post.content),
            picture: post.image,
            link: `/blog/${post.postID}/${slugify(post.title, { lower: true, strict: true })}`,
            date: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown Date'
          }));
        }
      });
    },

    extractAbstract(htmlContent) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            const firstParagraph = doc.querySelector('p');
            return firstParagraph ? firstParagraph.textContent.substring(0, 200) + '...' : '';
        }

  },
  mounted() {
    this.currentProducts = this.products;
    this.getCompanies();
    this.getProducts();
    this.getArticles();
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
.main-grid {
  min-height: 75vh;
}
</style>
