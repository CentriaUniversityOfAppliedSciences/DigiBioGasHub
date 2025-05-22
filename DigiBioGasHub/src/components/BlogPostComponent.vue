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
    margin-left:3rem;
    max-width: 80%;
}
</style>