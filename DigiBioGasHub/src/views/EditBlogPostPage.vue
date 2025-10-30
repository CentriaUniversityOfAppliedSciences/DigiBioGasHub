<template>
    <IonPage>
        <NavBarComponent />
        <ion-content :fullscreen="true">
            <div v-if="loading">loading....</div>
            <div v-if="postNotFound">Blog post not found</div>
            <EditBlogPostComponent v-show="!loading && !postNotFound" :content="content" :postID="postID" />
        </ion-content>
    </IonPage>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue';
import NavBarComponent from './../components/NavBarComponent.vue';
import EditBlogPostComponent from './../components/EditBlogPostComponent.vue';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'EditBlogPostPage',
    components: {
        IonPage,
        IonContent,
        NavBarComponent,
        EditBlogPostComponent
    },
    data() {
        return {

            content: '',
            postID: '',
            postNotFound: false,
            loading: true
        };
    },
    async created() {
        this.postID = this.$route.params.postID;
        await this.fetchPost(this.postID);
    },
    methods: {
        async fetchPost(postID) {
            try {
                var url = this.$api_add + "/getblogpost";
                const response = await axios.post(url, { "postID": postID }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                if (response.status === 404 || !response.data.message) {
                    this.postNotFound = true;
                    return;
                }
                this.content = response.data.message.content;
                this.postID = response.data.message.postID;
            } catch (error) {
                console.error('Error fetching post:', error);
                this.postNotFound = true;
            } finally {
                this.loading = false;
            }
        }
    }
});
</script>
