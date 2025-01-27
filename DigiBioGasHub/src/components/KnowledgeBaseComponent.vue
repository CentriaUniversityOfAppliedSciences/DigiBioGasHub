<template>
    
        <IonContent>
            <IonGrid>
                <IonRow>
                    <IonCol size="3">
                        <IonList>
                            <IonItem
                                v-for="(article, idx) in articles"
                                :key="idx"
                                button
                                @click="selectArticle(article)"
                            >
                                {{ article.title }}
                            </IonItem>
                        </IonList>
                    </IonCol>
                    <IonCol>
                        <div v-html="selectedArticleContent"></div>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    
</template>

<script>
import { defineComponent } from 'vue'
import {
   
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonItem
} from '@ionic/vue'



export default defineComponent({
    name: 'KnowledgeBaseComponent',
    components: {
        
        IonContent,
        IonGrid,
        IonRow,
        IonCol,
        IonList,
        IonItem
    },
    data() {
        return {
            articles: [],
            selectedArticleContent: '',
            dummyData: [
                {
                    title: 'Article 1',
                    content: 'Content of article 1'
                },
                {
                    title: 'Article 2',
                    content: 'Content of article 2'
                },
                {
                    title: 'Article 3',
                    content: 'Content of article 3'
                }
            ]
        }
    },
    mounted() {
        // Example of fetching articles
        // fetch('YOUR_API_ENDPOINT').then(res => res.json()).then(data => {
        //   this.articles = data
        //   if (this.articles.length) {
        //     this.selectedArticleContent = this.articles[0].content
        //   }
        // })
        this.articles = this.dummyData
    },
    methods: {
        selectArticle(article) {
            this.selectedArticleContent = article.content
        }
    }
})
</script>

<style scoped>
IonGrid,
IonRow,
IonCol {
    height: 100%;
}
IonList {
    border-right: 1px solid #ccc;
}
</style>