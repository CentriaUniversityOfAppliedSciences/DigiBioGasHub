<template>
    <IonCard>
        <IonCardHeader>
            <IonCardTitle>{{ $t('feedback.title') }}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
            <IonList>
                <IonItem>
                    <IonLabel>{{ $t('feedback.overallSatisfaction') }}</IonLabel>
                    <div class="rating-container">
                        <IonIcon
                            v-for="starIndex in 5"
                            :key="starIndex"
                            :icon="starIndex <= rating ? star : starOutline"
                            @click="setRating(starIndex)"
                            class="star-icon"
                        />
                    </div>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">{{ $t('feedback.commentPlaceholder') }}</IonLabel>
                    <IonTextarea v-model="feedback" rows="6" />
                </IonItem>
            </IonList>
            <IonButton expand="block" @click="submitFeedback">{{ $t('feedback.submit') }}</IonButton>
        </IonCardContent>
    </IonCard>
</template>

<script>
import { defineComponent } from 'vue'
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonTextarea
} from '@ionic/vue'
import { star, starOutline } from 'ionicons/icons'

export default defineComponent({
    name: 'FeedbackComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonList,
        IonItem,
        IonLabel,
        IonIcon,
        IonButton,
        IonTextarea
    },
    setup() {
        
        return {
            
            star,
            starOutline
        }
    },
    data() {
        return {
            rating: 0,
            feedback: ''
        }
    },
    methods:{
        setRating(rating) {
            this.rating = rating
        },
        submitFeedback() {
            //console.log(this.rating, this.feedback)
        }
    }
})
</script>

<style scoped>
.rating-container {
    display: flex;
    gap: 6px;
    margin-left: auto;
}
.star-icon {
    color: #ffd600;
    font-size: 1.8rem;
    cursor: pointer;
}
</style>