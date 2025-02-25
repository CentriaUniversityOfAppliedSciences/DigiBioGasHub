<template>
  <ion-page>
    <NavBarComponent />
    <ion-content>
      <ion-grid>
        <!-- Published Section -->
        <ion-row>
          <ion-col>
            <h2>Published</h2>
            <ion-row>
              <ion-col size="12" size-sm="6" size-md="4" size-lg="3" v-for="post in publishedPosts" :key="post.postID">
                <ion-card class="blog-card">
                  <ion-img class="blog-card-img" :src="post.image" alt="Post Image"></ion-img>
                  <ion-card-header>
                    <ion-card-title>{{ post.title }}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    <div class="button-group">
                      <ion-button @click="editPost(post.postID)" expand="block">Edit</ion-button>
                      <ion-button @click="unpublishPost(post.postID)" expand="block">Unpublish</ion-button>
                      <ion-button @click="confirmDelete(post.postID)" color="danger" expand="block">Delete</ion-button>
                    </div>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>

        <!-- Unpublished Section -->
        <ion-row>
          <ion-col>
            <h2>Unpublished</h2>
            <ion-row>
              <ion-col size="12" size-sm="6" size-md="4" size-lg="3" v-for="post in unpublishedPosts"
                :key="post.postID">
                <ion-card class="blog-card">
                  <ion-img class="blog-card-img" :src="post.image" alt="Post Image"></ion-img>
                  <ion-card-header>
                    <ion-card-title>{{ post.title }}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    <div class="button-group">
                      <ion-button @click="publishPost(post.postID)" expand="block">Publish</ion-button>
                      <ion-button @click="editPost(post.postID)" expand="block">Edit</ion-button>
                      <ion-button @click="confirmDelete(post.postID)" color="danger" expand="block">Delete</ion-button>
                    </div>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>

        <!-- Draft Section -->
        <ion-row>
          <ion-col>
            <h2>Drafts</h2>
            <ion-row>
              <ion-col size="12" size-sm="6" size-md="4" size-lg="3" v-for="post in draftPosts" :key="post.postID">
                <ion-card class="blog-card">
                  <ion-img class="blog-card-img" :src="post.image" alt="Post Image"></ion-img>
                  <ion-card-header>
                    <ion-card-title>{{ post.title }}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    <div class="button-group">
                      <ion-button @click="publishPost(post.postID)" expand="block">Publish</ion-button>
                      <ion-button @click="editPost(post.postID)" expand="block">Edit</ion-button>
                      <ion-button @click="confirmDelete(post.postID)" color="danger" expand="block">Delete</ion-button>
                    </div>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-alert :is-open="showDeleteAlert" header="Confirm Delete" message="Are you sure you want to delete this post?"
        :buttons="[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.showDeleteAlert = false;
            }
          },
          {
            text: 'Delete',
            handler: () => {
              deletePost(postIdToDelete);
              this.showDeleteAlert = false;
            }
          }
        ]"></ion-alert>

      <ToastComponent ref="toastComponent" />

    </ion-content>
    <FooterComponent />
  </ion-page>
</template>

<script>

import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonImg, IonAlert } from '@ionic/vue';
import axios from 'axios';
import { defineComponent } from 'vue';
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import ToastComponent from '../../components/ToastComponent.vue';

export default defineComponent({
  name: 'ManageBlogPosts',
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonImg,
    IonAlert,
    ToastComponent,
    NavBarComponent,
    FooterComponent
  },
  data() {
    return {
      publishedPosts: [],
      unpublishedPosts: [],
      draftPosts: [],
      showDeleteAlert: false,
      postIdToDelete: null
    };
  },
  methods: {
    editPost(postId) {
      // Logic to edit the post
    },
    publishPost(postId) {
      // Logic to publish the post
    },
    unpublishPost(postId) {
      // Logic to unpublish the post
    },
    confirmDelete(postId) {
      this.postIdToDelete = postId;
      this.showDeleteAlert = true;
    },

    deletePost(postId) {

      console.log('Deleting post:', postId);

      try {
        const url = `http://localhost:28765/deleteblogpost`;
        axios.post(url, { "postID": postId }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false })
          .then(response => {
            if (response.data.result === 'ok') {
              this.fetchPosts();
              this.$refs.toastComponent.showToast('Post deleted successfully', 2000, 'success');
            }
          })
          .catch(error => {
            console.error('Error deleting post:', error);
          });
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    },

    async fetchPosts() {
      try {
        const url = "http://localhost:28765/getallblogposts";
        const response = await axios.post(url, {}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
        if (response.data.result === 'ok' && Array.isArray(response.data.message)) {
          const posts = response.data.message;
          this.publishedPosts = posts.filter(post => post.blogPostType === 1);
          this.unpublishedPosts = posts.filter(post => post.blogPostType === 0);
          this.draftPosts = posts.filter(post => post.blogPostType === 2);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  },
  mounted() {
    this.fetchPosts();
  }
});
</script>

<style scoped>
.blog-card {
  margin: 10px;
}


.blog-card-img {
  margin: auto;
  width: 300px;
  height: 300px;
  object-fit: cover;
}

ion-card-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-group {
  display: flex;
  margin-top: 2rem;
  justify-content: space-between;
  gap: 5px;
}

ion-button {
  flex: 1;
}
</style>
