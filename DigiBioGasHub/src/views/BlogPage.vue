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
import { defineComponent } from 'vue'
import NavBarComponent from '../components/NavBarComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'
import BlogPostComponent from '../components/BlogPostComponent.vue'
import {IonPage, IonContent} from '@ionic/vue'
export default defineComponent ({
    name: 'ToSPage',
    components: { NavBarComponent, FooterComponent, IonPage, IonContent, BlogPostComponent},
    setup() {
        let content = '';
        let title = $route.params.title;
        axios.post('http://localhost:3000/api/blog', {
            title: title
        }).then((response) => {
            content = response.data.content;
        });
        return {content
        }
    }
})
</script>