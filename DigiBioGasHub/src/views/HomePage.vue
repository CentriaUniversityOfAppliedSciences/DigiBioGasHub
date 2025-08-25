<template>
  <ion-page>
    <ion-header :translucent="true">
  
        <NavBarComponent />
    
    </ion-header>

    <ion-content :fullscreen="true">
      <h2 style="margin: 20px ;">{{ $t("general.latestOffers") }}</h2>
      <div style="display: flex; justify-content: flex-end; margin: 0 20px 10px 20px;">
        <ion-button @click="goOffers">{{ $t("general.allOffers") }}</ion-button>
      </div>
      <swiper v-if="products.length > 0"
        style='--swiper-pagination-bullet-size: 15px; --swiper-pagination-bullet-inactive-color: var(--ion-color-light-contrast);'
        :pagination="{ dynamicBullets: true, clickable: true }" :loop="true" :centeredSlides="true" :navigation="true"
        :modules="modules" :autoplay="{ delay: 3000, disableOnInteraction: false }" @swiper="onSwiper"
        @slideChange="onSlideChange" :breakpoints="{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          }
        }" :space-between="10">
        <swiper-slide v-for="product in products" :key="product.id">
          <ListingComponent :product="product" :isMarketplace="true" />
        </swiper-slide>
      </swiper>
      <h2 style="margin: 20px ;">{{ $t("general.latestArticles") }}</h2>
      <div style="display: flex; justify-content: flex-end; margin: 0 20px 10px 20px;">
        <ion-button @click="goArticles">{{ $t("general.allArticles") }}</ion-button>
      </div>
      <swiper v-if="articles.length > 0"
        style='--swiper-pagination-bullet-size: 15px; --swiper-pagination-bullet-inactive-color: var(--ion-color-light-contrast);'
        :pagination="{ dynamicBullets: true, clickable: true }" :loop="true" :centeredSlides="true" :navigation="true"
        :modules="modules" :autoplay="{ delay: 3000, disableOnInteraction: false }" @swiper="onSwiper"
        @slideChange="onSlideChange" :breakpoints="{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          }
        }" :space-between="10">
        <swiper-slide style="padding: 10px;" v-for="article in articles" :key="article.title">
          <BlogListingComponent class="blog-card" :article="article" />
        </swiper-slide>
      </swiper>

      <div>
        <div v-if="!chatboxVisible" @click="chatboxVisible = true" class="chat-box" aria-label="Open chat"
          title="Open chat">
          <!-- <div class="text-bubble">
            Hi! Ask about bio gas
          </div> -->
          <div class="chat-icon">
            <ion-icon name="chatbox-outline" style="font-size: 28px;"></ion-icon>
          </div>
        </div>

        <div v-if="KllComponent && chatboxVisible" :class="['chatcont']" :style="chatboxStyle">
          <button @click="toggleChatboxSize"
            style="position: absolute; top: 5px; right: 70px; width: 3vw; max-width:20px ; z-index: 1001;">
            {{ chatboxLarge ? '🗗' : '🗖' }}
          </button>
          <button @click="toggleChatbox"
            style="position: absolute; top: 5px; right: 45px; width: 3vw; max-width:20px ; z-index: 1001;">
            {{ chatboxMinimized ? '▲' : '▼' }}
          </button>
          <button @click="closeChatbox"
            style="position: absolute; top: 5px; right: 20px; width: 3vw; max-width:20px ; z-index: 1001;">
            ✖
          </button>
          <div v-if="chatboxMinimized" style="padding: 10px; text-align: center; color:var(--background)">
            <!-- Static header shown when minimized -->
            <strong>Biokaasuklinikka</strong>
          </div>
          <component v-else :is="KllComponent" style="width: 100%; height: 100%;" />
        </div>
      </div>
      <FooterComponent />
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonFooter, IonButton, IonIcon } from '@ionic/vue';
import { defineComponent, shallowRef } from 'vue';
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import BlogListingComponent from '../components/BlogListingComponent.vue';
import ListingComponent from '../components/ListingComponent.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { addIcons } from 'ionicons';
import { chatboxOutline } from 'ionicons/icons';
addIcons({ chatboxOutline })
import axios from 'axios';
import slugify from 'slugify';

export default defineComponent({
  name: 'HomePage',
  components: { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, NavBarComponent, IonGrid, IonCol, IonRow, IonIcon, FooterComponent, BlogListingComponent, ListingComponent, IonFooter, Swiper, SwiperSlide },
  data() {
    return {
      KllComponent: null,
      chatboxMinimized: false,
      chatboxVisible: false,
      chatboxLarge: false,
      products: [],
      currentProducts: [],
      articles: []
    }
  },
  setup() {
    const onSwiper = (swiper) => {
    };
    const onSlideChange = () => {
    };
    return { onSwiper, onSlideChange, modules: [Navigation, Pagination, Autoplay] };
  },
  computed: {
    chatboxStyle() {
      return {
        position: 'fixed',
        bottom: '2%',
        right: '2%',
        width: this.chatboxLarge ? '90vw' : '50vw',
        height: this.chatboxMinimized ? '40px !important' : (this.chatboxLarge ? '80vh' : '50%'),
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
      try {
        const module = await import("../components/BKKlinikkaComponent.vue");
        this.KllComponent = shallowRef(module.default);
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
    goOffers() {
      this.$router.push('/marketplace');
    },
    goArticles() {
      this.$router.push('/articles');
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

.chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  gap: 8px;
}

/* .text-bubble {
  background: #007bff;
  color: white;
  padding: 8px 12px;
  border-radius: 16px;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  user-select: none;
} */

.chat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: green;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

@media (min-width: 1200px) {
  .chatcont {
    height: 70% !important;
  }
}
</style>
