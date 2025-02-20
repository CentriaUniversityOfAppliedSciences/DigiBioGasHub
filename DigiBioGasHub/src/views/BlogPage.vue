<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
            <BlogPostComponent :content="content" />
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import BlogPostComponent from '../components/BlogPostComponent.vue'
import { IonPage, IonContent } from '@ionic/vue'
import axios from 'axios'

export default defineComponent({
    name: 'ToSPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, BlogPostComponent },
    setup() {

        const content = ref(null)
        const route = useRoute()
        const postID = route.params.postID

        async function fetchBlogPost() {
            try {
                var url = "http://localhost:28765/getblogpost";
                const response = await axios.post(url, { "postID": postID }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                content.value = response.data.message.content;
            } catch (error) {
                console.error(error)
            }
        }
        onMounted(() => {
            fetchBlogPost()
        })

        return {
            content
        }
    }
})
</script>