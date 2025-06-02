<template>
    <ion-page>
        <NavBarComponent />
        <ion-content :fullscreen="true">
            <div class="page-wrapper">
                <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                </div>
                <BlogPostComponent v-else :content="content" />
                
            </div>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import BlogPostComponent from '../components/BlogPostComponent.vue'
import { IonPage, IonContent } from '@ionic/vue'
import axios from 'axios'

export default defineComponent({
    name: 'BlogPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, BlogPostComponent },
    data() {
        return {
            content: '',
            errorMessage: '',
            postID: this.$route.params.postID
        }
    },
    methods: {
        async fetchBlogPost() {
            try {
                const url = this.$api_add + "/getblogpost";
                const response = await axios.post(url, { "postID": this.postID }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                this.content = response.data.message.content;
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.errorMessage = error.response.data.message || 'Blog post not found';
                    this.content = '';
                } else {
                    this.errorMessage = 'An unexpected error occurred.';
                    console.error(error);
                }
            }
        }
    },
    mounted() {
        this.fetchBlogPost();
    }
})
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.page-wrapper > *:last-child {
  margin-top: auto;
}

</style>