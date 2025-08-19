<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <div class="layout">
                <div class="sidebar">
                    <ion-button expand="block" color="primary" @click="addPost">
                        {{ $t('posts.addPost') }}
                    </ion-button>
                    <ion-button expand="block" fill="outline" color="medium" @click="uploadPdf">
                        {{ $t('posts.uploadPdf') }}
                    </ion-button>

                    <div class="menu">
                        <ion-item button :class="{ active: selectedType === 1 }" @click="changeType(1)">
                            <ion-icon name="checkmark-circle" slot="start" color="success"></ion-icon>
                            {{ $t('posts.published') }}
                        </ion-item>
                        <ion-item button :class="{ active: selectedType === 0 }" @click="changeType(0)">
                            <ion-icon name="close-circle" slot="start" color="danger"></ion-icon>
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
                            <ion-icon name="document" slot="start" color="primary"></ion-icon>
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
                                    <ion-button size="small" color="warning" @click="unpublishPost(post)">
                                        {{ $t('posts.unpublish') }}
                                    </ion-button>
                                    <ion-button size="small" color="tertiary"
                                        @click="editPost(post.postID, post.title)">
                                        {{ $t('general.edit') }}
                                    </ion-button>
                                    <ion-button size="small" color="danger" @click="deletePost(post)">
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
                                    <ion-button size="small" color="danger" @click="deletePost(post)">
                                        {{ $t('general.delete') }}
                                    </ion-button>
                                </template>

                                <!-- Draft posts -->
                                <template v-else-if="selectedType === 2">
                                    <ion-button size="small" color="tertiary"
                                        @click="editPost(post.postID, post.title)">
                                        {{ $t('general.edit') }}
                                    </ion-button>
                                    <ion-button size="small" color="success" @click="sendForReview(post)">
                                        {{ $t('general.send') }}
                                    </ion-button>
                                    <ion-button size="small" color="danger" @click="deletePost(post)">
                                        {{ $t('general.delete') }}
                                    </ion-button>
                                </template>

                                <!-- File posts -->
                                <template v-else-if="selectedType === 3">
                                    <ion-button size="small" color="primary" @click="viewPost(post)">
                                        {{ $t('general.view') }}
                                    </ion-button>
                                    <ion-button size="small" color="danger" @click="deletePost(post)">
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
                                    <ion-button size="small" color="danger" @click="deletePost(post)">
                                        {{ $t('general.delete') }}
                                    </ion-button>
                                </template>
                            </template>
                        </BlogListingComponent>
                    </div>
                </div>
            </div>
        </ion-content>
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
    IonSpinner
} from '@ionic/vue'
import { defineComponent } from 'vue'
import axios from 'axios'
import slugify from 'slugify'
import BlogListingComponent from '../components/BlogListingComponent.vue'
import NavBarComponent from '../components/NavBarComponent.vue'

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
        IonCardContent,
        IonSpinner,
        BlogListingComponent,
        NavBarComponent
    },
    data() {
        return {
            selectedType: 1,
            posts: [],
            loading: false
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
                    console.log("this posts: ", this.posts)
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
        uploadPdf() {

        },
        viewPost(post) {
            const link = `/blog/${post.postID}/${slugify(post.title, { lower: true, strict: true })}`;
            this.$router.push(link);
        },
        async sendForReview(post) {
            const response = await axios.post(this.$api_add + "/blog/sendforreview", { postID: post.postID }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
            if (response.data.type === "result" && response.data.result === "ok") {
                console.log("Success review send")
                this.fetchPosts(2)
            }
        },
        editPost(postId, title) {
            window.location.href = `/blog/edit-blog-post/${postId}/${slugify(title, { lower: true, strict: true })}`;
        },
        async unpublishPost(post) {
            const response = await axios.post(this.$api_add + "/blog/unpublishreq", { postID: post.postID }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
            if (response.data.type === "result" && response.data.result === "ok") {
                this.fetchPosts(1)
            }
        },
        async deletePost(post) {
            const response = await axios.post(this.$api_add + "/blog/deleteblogpost", { postID: post.postID }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
            if (response.data.type === "result" && response.data.result === "ok") {
                this.fetchPosts(1)
            }
        }
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
