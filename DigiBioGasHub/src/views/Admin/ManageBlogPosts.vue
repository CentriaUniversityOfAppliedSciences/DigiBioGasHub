<template>
  <ion-page>
    <NavBarComponent />
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-button @click="addPost">{{ $t('admin.blogpost.addPost') }}</ion-button>
            <ion-button @click="addFromFile">{{ $t('admin.blogpost.addFromFile') }}</ion-button>
            
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
                      <ion-button @click="editPost(post.postID, post.title)" expand="block">{{
                        $t('admin.blogpost.reviewEdit') }}</ion-button>
                      <ion-button @click="confirmUnpublish(post.postID)" expand="block">{{
                        $t('admin.blogpost.unpublish') }}</ion-button>
                      <ion-button @click="preview(post)">
                        {{ $t('general.preview') }}
                      </ion-button>
                      <ion-button @click="confirmDelete(post.postID)" color="danger" expand="block">{{
                        $t('general.delete') }}</ion-button>
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
                      <ion-button @click="confirmPublish(post.postID)" expand="block">{{ $t('admin.blogpost.publish')
                        }}</ion-button>
                      <ion-button @click="editPost(post.postID, post.title)" expand="block">{{
                        $t('admin.blogpost.reviewEdit') }}</ion-button>
                      <ion-button @click="preview(post)">
                        {{ $t('general.preview') }}
                      </ion-button>
                      <ion-button @click="confirmDelete(post.postID)" color="danger" expand="block">{{
                        $t('general.delete') }}</ion-button>
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
                    <ion-button :id="'manage-btn-' + post.postID" expand="block">
                      {{ $t('general.manage') }}
                    </ion-button>

                    <ion-popover :key="post.postID" :trigger="'manage-btn-' + post.postID" triggerAction="click"
                      size="auto" :dismiss-on-select="true" :show-backdrop="false">
                      <ion-content class="ion-padding">
                        <ion-list>
                          <ion-item button @click="confirmPublish(post.postID)">
                            {{ $t('admin.blogpost.publish') }}
                          </ion-item>
                          <ion-item button @click="confirmUnpublish(post.postID)">
                            {{ $t('admin.blogpost.unpublish') }}
                          </ion-item>
                          <ion-item button @click="editPost(post.postID, post.title)">
                            {{ $t('admin.blogpost.reviewEdit') }}
                          </ion-item>
                          <ion-item button @click="preview(post)">
                            {{ $t('general.preview') }}
                          </ion-item>
                          <ion-item button @click="confirmDelete(post.postID)">
                            {{ $t('general.delete') }}
                          </ion-item>
                        </ion-list>
                      </ion-content>
                    </ion-popover>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
        <!-- File Posts Section -->
        <ion-row>
          <ion-col>
            <h2>{{ $t('admin.blogpost.filePosts') }}</h2>
            <ion-row>
              <ion-col size="12" size-sm="6" size-md="4" size-lg="3" v-for="post in filePosts" :key="post.postID">
                <ion-card class="blog-card">
                  <ion-img class="blog-card-img" :src="post.image" alt="Post Image"></ion-img>
                  <ion-card-header>
                    <ion-card-title>{{ post.title }}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    <div class="button-group">
                      <ion-button @click="preview(post)">
                        {{ $t('general.preview') }}
                      </ion-button>
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
      <ion-alert :is-open="showAddFromFileAlert" :buttons="addfilebuttons" :inputs="addfileinputs"></ion-alert>
      <ToastComponent ref="toastComponent" />
      <FooterComponent />

    </ion-content>

  </ion-page>
</template>

<script>

import { IonContent, IonPage, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonImg, IonAlert, IonPopover, IonList, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue';
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
    IonList,
    IonItem,
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
      publishedPosts: [],
      unpublishedPosts: [],
      draftPosts: [],
      filePosts: [],
      pdfFileImage64: '',
      showDeleteAlert: false,
      showPublishAlert: false,
      showUnpublishAlert: false,
      showAddFromFileAlert: false,
      addfilebuttons: [
        {
          text: this.$t('general.cancel'),
          role: 'cancel',
          handler: () => {
            this.showAddFromFileAlert = false;
          }
        },
        {
          text: this.$t('general.upload'),
          handler: () => {
            const titleInput = document.getElementById('titlePdfInput');
            const fileInput = document.getElementById('filePdfInput');
            const imageInput = document.getElementById('imagePdfInput');

            if (fileInput && fileInput.files.length > 0) {
              this.processImg(imageInput.files[0]).then((ans) => {
                console.log("ans", ans);
                console.log("pdfFileImage64", this.pdfFileImage64);
                this.handleFileUpload({ title: titleInput.value, target: fileInput, image: this.pdfFileImage64 });
              });
              //this.handleFileUpload({ title: titleInput.value, target: fileInput, image: imageInput });
            }
            this.showAddFromFileAlert = false;
          }
        }
      ],
      addfileinputs: [
        {
          name:"title",
          type: 'text',
          id: 'titlePdfInput',
          placeholder: this.$t('admin.blogpost.title'),
          value: ''
        },
        {
          name: 'image',
          type: 'file',
          id: 'imagePdfInput',
          accept: 'image/*',
          placeholder: this.$t('general.image'),
          value: ''
        },
        {
          name: 'file',
          type: 'file',
          id: 'filePdfInput',
          accept: '.pdf',
          placeholder: this.$t('admin.blogpost.addFromFile')
        }
      ],
      postIdToDelete: null
    };
  },
  methods: {
    addFromFile() {
      this.showAddFromFileAlert = true;
      
    },
    handleFileUpload(event) {
      const fileInput = event.target;
      const imageInput = event.image;
      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const title = event.title;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('image', imageInput);

        this.uploadFile(formData);
      } else {
        this.$refs.toastComponent.showToast(this.$t('admin.blogpost.noFileSelected'), 2000, 'danger');
      }
    },
    uploadFile(fileData){
      const url = this.$api_add + '/admin/createblogpostfile';
      axios.post(url, fileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': localStorage.getItem('token')
        },
        withCredentials: false
      })
        .then(response => {
          if (response.data.result === 'ok') {
            this.$refs.toastComponent.showToast(this.$t('admin.blogpost.uploadSuccess'), 2000, 'success');
            this.fetchPosts();
          } else {
            this.$refs.toastComponent.showToast(this.$t('admin.blogpost.uploadFail'), 2000, 'danger');
          }
        })
        .catch(error => {
          console.error('Error uploading file:', error);
          this.$refs.toastComponent.showToast(this.$t('admin.blogpost.uploadFail'), 2000, 'danger');
        });
    },
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
          this.draftPosts = posts.filter(post => post.blogPostType === 2);
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
