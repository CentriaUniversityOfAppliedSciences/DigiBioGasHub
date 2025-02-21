<template>


        <div class="ion-padding" v-html="content" ></div>
   
        

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

<style scoped>
.ion-padding {
    padding: 20px;
    margin: auto;
    max-width: 80%;
}
</style>