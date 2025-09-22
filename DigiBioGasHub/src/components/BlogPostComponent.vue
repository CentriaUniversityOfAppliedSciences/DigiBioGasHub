<template>
    <div class="ion-padding" id="blogContentDiv">
        <template v-if="iframeSrc != null">
            <div v-for="page in linkPages" :key="page">
                
                <VuePDF :pdf="linkPDF" :page="page" fit-parent :watermark-text="watermarkText" :watermark-options="watermarkOptions"/>
            </div>
            
        </template>
        <template v-else>
            <div v-html="content"></div>
        </template>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { VuePDF, usePDF } from '@tato30/vue-pdf'


export default defineComponent({
    name: 'BlogPostComponent',
    props: {
        content: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            iframeSrc: null,
            linkPDF: null,
            linkPages: null,
            watermarkText: 'DigiBiogasHubs',
            watermarkOptions: {
                columns: 6,
                rows: 6,
                color: 'rgba(245,245,245,0.6)',
                rotation:45,
                fontSize:10
            }

        }
    },
    components: {
       VuePDF
    },
    computed: {
        isUrl() {
            console.log(typeof this.content === 'string' && (this.content.startsWith('http://') || this.content.startsWith('https://')));
            return (
                typeof this.content === 'string' &&
                (this.content.startsWith('http://') || this.content.startsWith('https://'))
            );
        }
        
    },
    mounted() {
        if (this.content) {
        if (this.isUrl) {
            this.iframeSrc = this.content;
        }
        } else {
            // Watch for content to be set if it might be async
            this.$watch('content', (newVal) => {
                if (newVal && this.isUrl) {
                    this.iframeSrc = newVal;
                    const { pdf, pages } = usePDF(newVal);
                    this.linkPDF = pdf;
                    this.linkPages = pages;
                }
            });
        }
    }
})
</script>

<style scoped>
.ion-padding {
    padding: 20px;
    margin-left:3rem;
    max-width: 80%;
}
iframe {
    background: #fff;
    border-radius: 8px;
}
</style>