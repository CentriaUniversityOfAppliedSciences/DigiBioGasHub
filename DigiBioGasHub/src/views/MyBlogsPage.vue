<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <div class="layout">
                <div class="sidebar">
                    <ion-button expand="block" color="primary" @click="addPost">
                        {{ $t('posts.addPost') }}
                    </ion-button>
                    <ion-button expand="block" fill="outline" color="medium" @click="addFromFile">
                        {{ $t('posts.uploadPdf') }}
                    </ion-button>

                    <div class="menu">
                        <ion-item button :class="{ active: selectedType === 1 }" @click="changeType(1)">
                            <ion-icon name="checkmark-circle" slot="start" color="success"></ion-icon>
                            {{ $t('posts.published') }}
                        </ion-item>
                        <ion-item button :class="{ active: selectedType === 0 }" @click="changeType(0)">
                            <ion-icon name="time-outline" slot="start" color="warning"></ion-icon>
                            {{ $t('posts.unpublished') }}
                        </ion-item>
                        <ion-item button :class="{ active: selectedType === 2 }" @click="changeType(2)">
                            <ion-icon name="create" slot="start" color="warning"></ion-icon>
                            {{ $t('posts.draft') }}
                        </ion-item>
                        <ion-item button :class="{ active: selectedType === 3 }" @click="changeType(3)">
                            <ion-icon name="document" slot="start" color="primary"></ion-icon>
                            {{ $t('posts.file') }}
                        </ion-item>
                        <ion-item button :class="{ active: selectedType === 4 }" @click="changeType(4)">
                            <ion-icon name="close-circle" slot="start" color="danger"></ion-icon>
                            {{ $t('posts.rejected') }}
                        </ion-item>
                    </div>
                </div>

                <div class="content-area">
                    <ion-header>
                        <ion-toolbar>
                            <ion-title size="large">{{ typeLabel(selectedType) }} {{ $t('posts.posts') }}</ion-title>
                        </ion-toolbar>
                    </ion-header>

                    <div v-if="loading" class="loading-state">
                        <ion-spinner name="crescent"></ion-spinner>
                    </div>

                    <div v-else-if="posts.length === 0" class="empty-state">
                        {{ $t('posts.noPosts') }}
                    </div>

                    <div v-else class="cards">
                        <BlogListingComponent v-for="post in posts" :key="post.id" :article="post">
                            <template #actions>
                                <!-- Published posts -->
                                <template v-if="selectedType === 1">
                                    <ion-button size="small" color="primary" @click="viewPost(post)">
                                        {{ $t('general.view') }}
                                    </ion-button>
                                    <ion-button size="small" color="warning" @click="confirmUnpublish(post)">
                                        {{ $t('posts.unpublish') }}
                                    </ion-button>
                                    <ion-button size="small" color="tertiary"
                                        @click="editPost(post.postID, post.title)">
                                        {{ $t('general.edit') }}
                                    </ion-button>
                                    <ion-button size="small" color="danger" @click="confirmDelete(post)">
                                        {{ $t('general.delete') }}
                                    </ion-button>
                                </template>

                                <!-- Pending -->
                                <template v-else-if="selectedType === 0">
                                    <ion-button size="small" color="primary" @click="viewPost(post)">
                                        {{ $t('general.view') }}
                                    </ion-button>
                                    <ion-button size="small" color="tertiary"
                                        @click="editPost(post.postID, post.title)">
                                        {{ $t('general.edit') }}
                                    </ion-button>
                                    <ion-button size="small" color="danger" @click="confirmDelete(post)">
                                        {{ $t('general.delete') }}
                                    </ion-button>
                                </template>

                                <!-- Draft posts -->
                                <template v-else-if="selectedType === 2">
                                    <ion-button size="small" color="tertiary"
                                        @click="editPost(post.postID, post.title)">
                                        {{ $t('general.edit') }}
                                    </ion-button>
                                    <ion-button size="small" color="success" @click="confirmSendForReview(post)">
                                        {{ $t('posts.sendForReview') }}
                                    </ion-button>
                                    <ion-button size="small" color="danger" @click="confirmDelete(post)">
                                        {{ $t('general.delete') }}
                                    </ion-button>
                                </template>

                                <!-- File posts -->
                                <template v-else-if="selectedType === 3">
                                    <ion-button size="small" color="primary" @click="viewPost(post)">
                                        {{ $t('general.view') }}
                                    </ion-button>
                                    <ion-button size="small" color="danger" @click="confirmDelete(post)">
                                        {{ $t('general.delete') }}
                                    </ion-button>
                                </template>

                                <!-- Rejected-->
                                <template v-else-if="selectedType === 4">
                                    <ion-button size="small" color="primary" @click="viewPost(post)">
                                        {{ $t('general.view') }}
                                    </ion-button>
                                    <ion-button size="small" color="tertiary"
                                        @click="editPost(post.postID, post.title)">
                                        {{ $t('general.edit') }}
                                    </ion-button>
                                    <ion-button size="small" color="danger" @click="confirmDelete(post)">
                                        {{ $t('general.delete') }}
                                    </ion-button>
                                </template>
                            </template>
                        </BlogListingComponent>
                    </div>
                </div>
            </div>
        </ion-content>

        <!-- Send For Review Alert -->
        <ion-alert :is-open="showSendForReviewAlert" :header="$t('posts.confirmSendForReview')"
            :message="$t('posts.cconfirmSendForReviewMessage')" :buttons="[
                {
                    text: $t('general.cancel'),
                    role: 'cancel',
                    handler: () => {
                        this.showSendForReviewAlert = false;
                    }
                },
                {
                    text: $t('posts.send'),
                    handler: () => {
                        sendForReview(postIdToSendForReview);
                        this.showSendForReviewAlert = false;
                    }
                }
            ]"></ion-alert>

        <!-- Delete Confirmation Alert -->
        <ion-alert :is-open="showDeleteAlert" :header="$t('posts.confirmDelete')"
            :message="$t('posts.confirmDeleteMessage')" :buttons="[
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

        <ion-alert :is-open="showUnpublishAlert" :header="$t('posts.confirmUnpublish')"
            :message="$t('posts.confirmUnpublishMessage')" :buttons="[
                {
                    text: $t('general.cancel'),
                    role: 'cancel',
                    handler: () => {
                        this.showUnpublishAlert = false;
                    }
                },
                {
                    text: $t('posts.unpublish'),
                    handler: () => {
                        unpublishPost(postIdToUnpublish);
                        this.showUnpublishAlert = false;
                    }
                }
            ]"></ion-alert>

        <ion-alert :is-open="showAddFromFileAlert" :buttons="addfilebuttons" :inputs="addfileinputs"></ion-alert>

        <ToastComponent ref="toastComponent" />
    </ion-page>
</template>

<script>
import {
    IonBadge,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSpinner,
    IonAlert
} from '@ionic/vue'
import { defineComponent } from 'vue'
import axios from 'axios'
import slugify from 'slugify'
import BlogListingComponent from '../components/BlogListingComponent.vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import { addIcons } from 'ionicons'
import { checkmarkCircle, closeCircle, create, document, timeOutline } from 'ionicons/icons'
addIcons ({checkmarkCircle, timeOutline, closeCircle, create, document})
import ToastComponent from '../components/ToastComponent.vue'

export default defineComponent({
    name: 'MyBlogsPage',
    components: {
        IonPage,
        IonContent,
        IonButton,
        IonItem,
        IonIcon,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonBadge,
        IonAlert,
        IonCardContent,
        IonSpinner,
        BlogListingComponent,
        NavBarComponent,
        ToastComponent
    },
    data() {
        return {
            selectedType: 1,
            posts: [],
            loading: false,
            pdfFileImage64: '',
            showDeleteAlert: false,
            showSendForReviewAlert: false,
            showUnpublishAlert: false,
            postIdToDelete: null,
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
                    name: "title",
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
        }
    },
    mounted() {
        this.fetchPosts(this.selectedType)
    },
    methods: {
        async changeType(type) {
            if (this.selectedType !== type) {
                this.selectedType = type
                await this.fetchPosts(type)
            }
        },
        async fetchPosts(type) {
            try {
                this.loading = true;
                const response = await axios.post(this.$api_add + "/blogs/myblogs", { type: type }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });

                if (response.data.type === "result" && response.data.result === "ok" && response.data.message.length > 0) {
                    this.posts = response.data.message.map(post => ({
                        postID: post.postID,
                        title: post.title,
                        abstract: this.extractAbstract(post.content),
                        picture: post.image,
                        link: `/blog/${post.postID}/${slugify(post.title, { lower: true, strict: true })}`,
                        date: post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Unknown Date'
                    }));
                } else {
                    this.posts = [];
                }

            } catch (err) {
                console.error('Error fetching posts:', err);
                this.posts = [];
            } finally {
                this.loading = false;
            }
        },
        extractAbstract(htmlContent) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');
            const firstParagraph = doc.querySelector('p');
            return firstParagraph ? firstParagraph.textContent.substring(0, 200) + '...' : '';
        },
        typeLabel(type) {
            const map = {
                0: this.$t('posts.unpublished'),
                1: this.$t('posts.published'),
                2: this.$t('posts.draft'),
                3: this.$t('posts.file'),
                4: this.$t('posts.rejected')
            }
            return map[type] || this.$t('posts.unknown')
        },
        getBadgeColor(type) {
            if (type === 1) return 'success'
            if (type === 0) return 'danger'
            if (type === 2) return 'warning'
            if (type === 3) return 'primary'
            if (type === 4) return 'danger'
        },
        addPost() {
            window.location.href = '/blog/add-blog-post';
        },
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
        uploadFile(fileData) {
            const url = this.$api_add + '/blog/createblogpostfile';
            axios.post(url, fileData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': localStorage.getItem('token')
                },
                withCredentials: false
            })
                .then(response => {
                    if (response.data.result === 'ok') {
                        this.$refs.toastComponent.showToast(this.$t('posts.uploadSuccess'), 2000, 'success');
                        this.fetchPosts(1);
                    } else {
                        this.$refs.toastComponent.showToast(this.$t('posts.uploadFail'), 2000, 'danger');
                    }
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                    this.$refs.toastComponent.showToast(this.$t('posts.uploadFail'), 2000, 'danger');
                });
        },
        viewPost(post) {
            const link = `/blog/${post.postID}/${slugify(post.title, { lower: true, strict: true })}`;
            this.$router.push(link);
        },

        confirmSendForReview(post) {
            this.postIdToSendForReview = post.postID;
            this.showSendForReviewAlert = true;
        },

        async sendForReview(postID) {
            const response = await axios.post(this.$api_add + "/blog/sendforreview", { postID: postID }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
            if (response.data.type === "result" && response.data.result === "ok") {
                this.$refs.toastComponent.showToast(this.$t('posts.sendForReviewSuccess'), 2000, 'success');
                this.fetchPosts(2)
            }
        },
        editPost(postId, title) {
            window.location.href = `/blog/edit-blog-post/${postId}/${slugify(title, { lower: true, strict: true })}`;
        },

        confirmUnpublish(post) {
            this.postIdToUnpublish = post.postID;
            this.showUnpublishAlert = true;
        },

        async unpublishPost(postID) {
            const response = await axios.post(this.$api_add + "/blog/unpublishreq", { postID: postID }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
            if (response.data.type === "result" && response.data.result === "ok") {
                this.$refs.toastComponent.showToast(this.$t('posts.unpublishSuccess'), 2000, 'success');
                this.fetchPosts(1)
            }
        },

        confirmDelete(post) {
            this.postIdToDelete = post.postID;
            this.showDeleteAlert = true;
        },

        async deletePost(postID) {
            const response = await axios.post(this.$api_add + "/blog/deleteblogpost", { postID: postID }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
            if (response.data.type === "result" && response.data.result === "ok") {
                this.$refs.toastComponent.showToast(this.$t('posts.deleteSuccess'), 2000, 'success');
                this.fetchPosts(1)
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
    }
})
</script>

<style scoped>
.layout {
    display: flex;
    height: 100%;
}

.sidebar {
    width: 250px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-right: 1px solid #ddd;
}

.menu {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
}

.menu ion-item {
    --background: transparent;
    --border-color: transparent;
}

.menu ion-item.active {
    --background: var(--ion-text-color-step-750);
    border-left: 4px solid var(--ion-color-primary);
}

.content-area {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
}

.loading-state,
.empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
}
</style>
