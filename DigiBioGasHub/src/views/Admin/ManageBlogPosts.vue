<template>
  <ion-page>
    <NavBarComponent />
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button @click="addPost">{{ $t('admin.blogpost.addPost') }}</ion-button>
          </ion-col>
        </ion-row>
        <!-- Published Section -->
        <ion-row>
          <ion-col>
            <h2>{{ $t('admin.blogpost.published') }}</h2>
            <ion-row>
              <ion-col size="12" size-sm="6" size-md="4" size-lg="3" v-for="post in publishedPosts" :key="post.postID">
                <ion-card class="blog-card">
                  <ion-img class="blog-card-img" :src="post.image" alt="Post Image"></ion-img>
                  <ion-card-header>
                    <ion-card-title>{{ post.title }}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    <div class="button-group">
                      <ion-button @click="editPost(post.postID, post.title)" expand="block">{{ $t('admin.blogpost.reviewEdit') }}</ion-button>
                      <ion-button @click="confirmUnpublish(post.postID)" expand="block">{{ $t('admin.blogpost.unpublish') }}</ion-button>
                      <ion-button @click="confirmDelete(post.postID)" color="danger" expand="block">{{ $t('general.delete') }}</ion-button>
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
            <h2>{{ $t('admin.blogpost.unpublished') }}</h2>
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
                      <ion-button @click="confirmPublish(post.postID)" expand="block">{{ $t('admin.blogpost.publish') }}</ion-button>
                      <ion-button @click="editPost(post.postID, post.title)" expand="block">{{ $t('admin.blogpost.reviewEdit') }}</ion-button>
                      <ion-button @click="confirmDelete(post.postID)" color="danger" expand="block">{{ $t('general.delete') }}</ion-button>
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
            <h2>{{ $t('admin.blogpost.drafts') }}</h2>
            <ion-row>
              <ion-col size="12" size-sm="6" size-md="4" size-lg="3" v-for="post in draftPosts" :key="post.postID">
                <ion-card class="blog-card">
                  <ion-img class="blog-card-img" :src="post.image" alt="Post Image"></ion-img>
                  <ion-card-header>
                    <ion-card-title>{{ post.title }}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    <div class="button-group">
                      <ion-button @click="confirmPublish(post.postID)" expand="block">{{ $t('admin.blogpost.publish') }}</ion-button>
                      <ion-button @click="confirmUnpublish(post.postID)" expand="block">{{ $t('admin.blogpost.unpublish') }}</ion-button>
                      <ion-button @click="editPost(post.postID, post.title)" expand="block">{{ $t('admin.blogpost.reviewEdit') }}</ion-button>
                      <ion-button @click="confirmDelete(post.postID)" color="danger" expand="block">{{ $t('general.delete') }}</ion-button>
                    </div>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- Delete Confirmation Alert -->
      <ion-alert :is-open="showDeleteAlert" :header= "$t('admin.blogpost.confirmDelete')" :message="$t('admin.blogpost.cofirmDeleteMessage')"
        :buttons="[
          {
            text: $t('general.cancel'),
            role: 'cancel',
            handler: () => {
              this.showDeleteAlert = false;
            }
          },
          {
            text: $t('general.delete'),
            handler: () => {
              deletePost(postIdToDelete);
              this.showDeleteAlert = false;
            }
          }
        ]"></ion-alert>

      <!-- Publish Confirmation Alert -->
      <ion-alert :is-open="showPublishAlert" :header= "$t('admin.blogpost.confirmPublish')" :message="$t('admin.blogpost.confirmPublishMessage')"
         :buttons="[
          {
            text: $t('general.cancel'),
            role: 'cancel',
            handler: () => {
              this.showPublishAlert = false;
            }
          },
          {
            text: $t('admin.blogpost.publish'),
            handler: () => {
              publishPost(postIdToPublish);
              this.showPublishAlert = false;
            }
          }
        ]"></ion-alert>

      <!-- Unpublish Confirmation Alert -->
      <ion-alert :is-open="showUnpublishAlert" :header= "$t('admin.blogpost.confirmUnpublish')" :message="$t('admin.blogpost.confirmUnpublsihMessage')"
       :buttons="[
          {
            text: $t('general.cancel'),
            role: 'cancel',
            handler: () => {
              this.showUnpublishAlert = false;
            }
          },
          {
            text: $t('admin.blogpost.unpublish'),
            handler: () => {
              unpublishPost(postIdToUnpublish);
              this.showUnpublishAlert = false;
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
import EditBlogPostPage from './EditBlogPostPage.vue';
import slugify from 'slugify';

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
    EditBlogPostPage,
    NavBarComponent,
    FooterComponent
  },
  data() {
    return {
      publishedPosts: [],
      unpublishedPosts: [],
      draftPosts: [],
      showDeleteAlert: false,
      showPublishAlert: false,
      showUnpublishAlert: false,
      postIdToDelete: null
    };
  },
  methods: {
    editPost(postId, title) {
      window.location.href = `/admin/edit-blog-post/${postId}/${slugify(title, { lower: true, strict: true })}`;
    },

    confirmPublish(postId) {
      this.postIdToPublish = postId;
      this.showPublishAlert = true;
    },
    addPost() {
      window.location.href = '/admin/add-blog-post';
    },
    publishPost(postId) {
      try {
        const url = this.$api_add + `/admin/publishblogpost`;
        axios.post(url, { "postID": postId }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false })
          .then(response => {
            if (response.data.result === 'ok') {
              this.fetchPosts();
              this.$refs.toastComponent.showToast(this.$t('admin.blogpost.publishSuccess'), 2000, 'success');
            }
          })
          .catch(error => {
            console.error('Error publishing post:', error);
            this.$refs.toastComponent.showToast(this.$t('admin.blogpost.publishFail'), 2000, 'danger');
          });
      } catch (error) {
        console.error('Error publishing post:', error);
      }
    },

    confirmUnpublish(postId) {
      this.postIdToUnpublish = postId;
      this.showUnpublishAlert = true;
    },

    unpublishPost(postId) {
      try {
        const url = this.$api_add + `/admin/unpublishblogpost`;
        axios.post(url, { "postID": postId }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false })
          .then(response => {
            if (response.data.result === 'ok') {
              this.fetchPosts();
              this.$refs.toastComponent.showToast(this.$t('admin.blogpost.unpublishSuccess'), 2000, 'success');
            }
          })
          .catch(error => {
            console.error('Error unpublishing post:', error);
            this.$refs.toastComponent.showToast(this.$t('admin.blogpost.unpublishFail'), 2000, 'danger');
          });
      } catch (error) {
        console.error('Error unpublishing post:', error);
      }
    },

    confirmDelete(postId) {
      this.postIdToDelete = postId;
      this.showDeleteAlert = true;
    },

    deletePost(postId) {

      console.log('Deleting post:', postId);

      try {
        const url = this.$api_add + `/admin/deleteblogpost`;
        axios.post(url, { "postID": postId }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false })
          .then(response => {
            if (response.data.result === 'ok') {
              this.fetchPosts();
              this.$refs.toastComponent.showToast(this.$t('admin.blogpost.deleteSuccess'), 2000, 'success');
            }
          })
          .catch(error => {
            console.error('Error deleting post:', error);
            this.$refs.toastComponent.showToast(this.$t('admin.blogpost.deleteFail'), 2000, 'danger');
          });
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    },

    async fetchPosts() {
      try {
        const url = this.$api_add + "/admin/getallblogposts";
        const response = await axios.post(url, {}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
        if (response.data.result === 'ok' && Array.isArray(response.data.message)) {
          const posts = response.data.message;
          this.publishedPosts = posts.filter(post => post.blogPostType === 1);
          this.unpublishedPosts = posts.filter(post => post.blogPostType === 0);
          this.draftPosts = posts.filter(post => post.blogPostType === 2);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        this.$refs.toastComponent.showToast(this.$t('admin.blogpost.fetchingPostFailed'), 2000, 'danger');
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
