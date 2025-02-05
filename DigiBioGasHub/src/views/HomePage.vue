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
          <ion-col v-for="product in products" :key="product.id">
            <ListingComponent :product="product" />
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
import axios from 'axios';
export default defineComponent ({
  name: 'HomePage',
  components: { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, NavBarComponent, IonGrid, IonCol, IonRow, FooterComponent, BlogListingComponent, ListingComponent },
  data() {
    return {
      products: [
                
            ],
            currentProducts: [],
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
  },
  methods:{
    getProducts(){
            
            var url = "http://localhost:28765/getoffers";
            axios.post(url,[],{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                console.log(response);
                if (response.data.type="result" && response.data.result.length > 0){
                    this.products = response.data.result;
                    this.currentProducts = response.data.result;
                    
                }
            });
        }
    
  },
  mounted() {
        this.currentProducts = this.products;
        this.getProducts();
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
