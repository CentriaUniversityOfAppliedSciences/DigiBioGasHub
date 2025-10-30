<template>
  <ion-page>
    <NavBarComponent />
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="3" class="sidebar">
            <ion-list>
              <ion-item button @click="activeTab = 'published'" :class="{ active: activeTab === 'published' }">
                <ion-icon name="checkmark-circle" slot="start" color="success"></ion-icon>
                {{ $t('admin.blogpost.published') }}
              </ion-item>
              <ion-item button @click="activeTab = 'unpublished'" :class="{ active: activeTab === 'unpublished' }">
                <ion-icon name="hourglass-outline" slot="start"></ion-icon>
                {{ $t('admin.blogpost.unpublished') }}
              </ion-item>
              <ion-item button @click="activeTab = 'files'" :class="{ active: activeTab === 'files' }">
                <ion-icon name="document" slot="start" color="primary"></ion-icon>
                {{ $t('admin.blogpost.filePosts') }}
              </ion-item>
              <ion-item button @click="activeTab = 'rejected'" :class="{ active: activeTab === 'rejected' }">
                <ion-icon name="close-circle" slot="start" color="danger"></ion-icon>
                {{ $t('admin.blogpost.rejected') }}
              </ion-item>
            </ion-list>
          </ion-col>

          <ion-col size="9">

            <h2>{{ sectionTitle }}</h2>

            <ion-list>
              <ion-item v-for="post in filteredPosts" :key="post.postID" lines="full">
                <ion-label>
                  <h3>{{ post.title }}</h3>
                  <p>{{ post.author }} • {{ new Date(post.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit", year: "numeric"
                  }) }}</p>
                </ion-label>

                <!-- Action Buttons -->
                <div class="action-buttons">

                  <ion-button @click="preview(post)">
                    {{ $t('general.preview') }}
                  </ion-button>

                  <ion-button v-if="activeTab === 'published'" @click="confirmUnpublish(post.postID)">
                    {{ $t('admin.blogpost.unpublish') }}
                  </ion-button>

                  <ion-button v-if="activeTab === 'unpublished'" @click="confirmPublish(post.postID)">
                    {{ $t('admin.blogpost.publish') }}
                  </ion-button>

                  <ion-button v-if="activeTab === 'unpublished'" color="warning" @click="confirmReject(post.postID)">
                    {{ $t('admin.blogpost.rejectPost') }}
                  </ion-button>

                  <ion-button color="danger" @click="confirmDelete(post.postID)">
                    {{ $t('general.delete') }}
                  </ion-button>
                </div>
              </ion-item>
            </ion-list>
            <div v-if="filteredPosts.length === 0" class="no-posts-message">
              {{ $t('admin.blogpost.noPostsAvailable') }}
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- Delete Confirmation Alert -->
      <ion-alert :is-open="showDeleteAlert" :header="$t('admin.blogpost.confirmDelete')"
        :message="$t('admin.blogpost.confirmDeleteMessage')" :buttons="[
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
      <ion-alert :is-open="showPublishAlert" :header="$t('admin.blogpost.confirmPublish')"
        :message="$t('admin.blogpost.confirmPublishMessage')" :buttons="[
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
      <ion-alert :is-open="showUnpublishAlert" :header="$t('admin.blogpost.confirmUnpublish')"
        :message="$t('admin.blogpost.confirmUnpublishMessage')" :buttons="[
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

      <!-- Reject Confirmation Alert -->
      <ion-alert :is-open="showRejectAlert" :header="$t('admin.blogpost.confirmReject')"
        :message="$t('admin.blogpost.confirmRejectMessage')" :buttons="[
          {
            text: $t('general.cancel'),
            role: 'cancel',
            handler: () => {
              this.showRejectAlert = false;
            }
          },
          {
            text: $t('admin.blogpost.rejectPost'),
            handler: () => {
              rejectPost(postIdToReject);
              this.showRejectAlert = false;
            }
          }
        ]"></ion-alert>

      <ToastComponent ref="toastComponent" />
      <FooterComponent />

    </ion-content>

  </ion-page>
</template>

<script>

import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonImg, IonAlert, IonPopover, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonIcon } from '@ionic/vue';
import axios from 'axios';
import { defineComponent } from 'vue';
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import ToastComponent from '../../components/ToastComponent.vue';
import EditBlogPostPage from '../EditBlogPostPage.vue';
import slugify from 'slugify';
import { addIcons } from 'ionicons'
import { checkmarkCircle, closeCircle, create, document, hourglassOutline } from 'ionicons/icons'
addIcons({ checkmarkCircle, hourglassOutline, closeCircle, create, document })

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
    IonList,
    IonItem,
    IonIcon,
    IonPopover,
    IonLabel,
    IonSelect,
    IonSelectOption,
    ToastComponent,
    EditBlogPostPage,
    NavBarComponent,
    FooterComponent
  },
  data() {
    return {
      activeTab: 'published',
      publishedPosts: [],
      unpublishedPosts: [],
      rejectedPosts: [],
      filePosts: [],
      pdfFileImage64: '',
      showDeleteAlert: false,
      showPublishAlert: false,
      showUnpublishAlert: false,
      showRejectAlert: false,
      postIdToDelete: null
    };
  },
  computed: {
    filteredPosts() {
      if (this.activeTab === "published") return this.publishedPosts;
      if (this.activeTab === "unpublished") return this.unpublishedPosts;
      if (this.activeTab === "files") return this.filePosts;
      if (this.activeTab === "rejected") return this.rejectedPosts;
      return [];
    },
    sectionTitle() {
      switch (this.activeTab) {
        case "published": return this.$t("admin.blogpost.published");
        case "unpublished": return this.$t("admin.blogpost.unpublished");
        case "files": return this.$t("admin.blogpost.filePosts");
        case "rejected": return this.$t("admin.blogpost.rejected");
        default: return "";
      }
    }
  },
  methods: {

    confirmReject(postId) {
      this.postIdToReject = postId;
      this.showRejectAlert = true;
    },

    rejectPost(postId) {
      try {
        const url = this.$api_add + `/admin/rejectpost`;
        axios.post(url, { "postID": postId }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false })
          .then(response => {
            if (response.data.result === 'ok') {
              this.fetchPosts();
              this.$refs.toastComponent.showToast(this.$t('admin.blogpost.rejectSuccess'), 2000, 'success');
            }
          })
          .catch(error => {
            this.$refs.toastComponent.showToast(this.$t('admin.blogpost.rejectFail'), 2000, 'danger');
          });
      } catch (error) {
        console.error('Error rejecting post:', error);
      }
    },

    confirmPublish(postId) {
      this.postIdToPublish = postId;
      this.showPublishAlert = true;
    },
    addPost() {
      window.location.href = '/blog/add-blog-post';
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

    preview(post) {
      const link = `/admin/blog-preview/${post.postID}/${slugify(post.title, { lower: true, strict: true })}`;
      this.$router.push(link);
    },

    async fetchPosts() {
      try {
        const url = this.$api_add + "/admin/getallblogposts";
        const response = await axios.post(url, {}, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
        if (response.data.result === 'ok' && Array.isArray(response.data.message)) {
          const posts = response.data.message;
          this.publishedPosts = posts.filter(post => post.blogPostType === 1);
          this.unpublishedPosts = posts.filter(post => post.blogPostType === 0);
          this.rejectedPosts = posts.filter(post => post.blogPostType === 4);
          this.filePosts = posts.filter(post => post.blogPostType === 3);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        this.$refs.toastComponent.showToast(this.$t('admin.blogpost.fetchingPostFailed'), 2000, 'danger');
      }
    },
    async processImg(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.pdfFileImage64 = reader.result;
          console.log('Image processed:', this.pdfFileImage64);
          resolve(this.pdfFileImage64);
        };
        reader.onerror = (e) => {
          reject(e);
        };
        reader.readAsDataURL(file);
      });
    },
  },
  mounted() {
    this.fetchPosts();
  }
});
</script>

<style scoped>
.sidebar {
  border-right: 1px solid #ddd;
  min-height: 100vh;
}

.sidebar .active {
  font-weight: bold;
  --background: #2c555ff5;
  border-radius: 6px;
}

.header-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
}

.no-posts-message {
  text-align: center;
  color: #888;
  margin: 2rem 0;
  font-size: 1.1rem;
}

.action-buttons {
  display: flex;
  gap: 8px;
}
</style>
