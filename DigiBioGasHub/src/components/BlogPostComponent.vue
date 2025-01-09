<template>
    
       
            <div v-html="content"></div>
        
</template>

<script>
import { defineComponent } from 'vue'


export default defineComponent({
    name: 'BlogPostComponent',
    props: {
        content: {
            type: String,
            required: true
        }
    },
    components: {
       
       
    }
})
</script>