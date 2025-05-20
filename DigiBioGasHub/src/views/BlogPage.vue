<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <BlogPostComponent :content="content" />
            <FooterComponent />
        </ion-content>
        
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
                console.error(error);
            }
        }
    },
    mounted() {
        this.fetchBlogPost();
    }
})
</script>