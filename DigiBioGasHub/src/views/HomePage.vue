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
      <div v-if="KllComponent && chatboxVisible" :style="chatboxStyle">
        <button @click="toggleChatboxSize" style="position: absolute; top: 5px; right: 70px; width: 3vw; max-width:20px ; z-index: 1001;">
          {{ chatboxLarge ? '🗗' : '🗖' }}
        </button>
        <button @click="toggleChatbox" style="position: absolute; top: 5px; right: 45px; width: 3vw; max-width:20px ; z-index: 1001;">
          {{ chatboxMinimized ? '▲' : '▼' }}
        </button>
        <button @click="closeChatbox" style="position: absolute; top: 5px; right: 20px; width: 3vw; max-width:20px ; z-index: 1001;">
          ✖
        </button>
        <div v-if="chatboxMinimized" style="padding: 10px; text-align: center;">
          <!-- Static header shown when minimized -->
          <strong>Biokaasuklinikka</strong>
        </div>
        <component v-else :is="KllComponent" style="width: 100%; height: 100%;" />
      </div>
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
      KllComponent: null,
      chatboxMinimized: false,
      chatboxVisible: true,
      chatboxLarge: false,
      products: [

      ],
      currentProducts: [],
      articles: [

      ]
    }
  },
  computed: {
    chatboxStyle() {
      return {
        position: 'fixed',
        bottom: '2%',
        right: '2%',
        width: this.chatboxLarge ? '90vw' : '50vw',
        height: this.chatboxMinimized ? '40px' : (this.chatboxLarge ? '80vh' : '50%'),
        zIndex: 1000,
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '8px 8px 0 0',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        maxWidth: this.chatboxLarge ? '900px' : '400px',
      }
    }
  },
  async created() {
    if (import.meta.env.VITE_ENABLE_BIOKAASUKLINIKKA === 'true') {
      try{
        const module = await import("../components/BKKlinikkaComponent.vue");
        this.KllComponent = module.default;
      }
      catch (error) {
        console.error("Error during component creation:", error);
      }
    }
  },
  methods: {
    toggleChatbox() {
      this.chatboxMinimized = !this.chatboxMinimized;
    },
    toggleChatboxSize() {
      this.chatboxLarge = !this.chatboxLarge;
    },
    closeChatbox() {
      this.chatboxVisible = false;
    },
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

            localStorage.setItem('current_company', response.data.message[0].Company.id);
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
