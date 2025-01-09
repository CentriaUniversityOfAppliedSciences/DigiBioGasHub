<template>
    <IonPage>
        <NavBarComponent />
        <ion-content>
            <AddBlogPostComponent />
        </ion-content>
        <FooterComponent />
    </IonPage>
</template>
<script>
import { IonPage, IonContent } from '@ionic/vue'
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import AddBlogPostComponent from '../../components/AddBlogPostComponent.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'AddBlogPostPage',
    components: {
        IonPage,
        IonContent,
        NavBarComponent,
        FooterComponent,
        AddBlogPostComponent
    },
    data() {
        return {
            
        }
    }
})
</script>