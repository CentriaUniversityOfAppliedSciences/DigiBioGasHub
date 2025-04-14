<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ $t('logisticQuotation.title') }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-item>
                <ion-label position="floating">{{ $t('logisticQuotation.pickupAddress') }}</ion-label>
                <ion-input v-model="form.pickupAddress"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">{{ $t('logisticQuotation.deliveryAddress') }}</ion-label>
                <ion-input v-model="form.deliveryAddress"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">{{ $t('logisticQuotation.pickupDate') }}</ion-label>
                <ion-datetime v-model="form.pickupDate"></ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label position="floating">{{ $t('logisticQuotation.deliveryDate') }}</ion-label>
                <ion-datetime v-model="form.deliveryDate"></ion-datetime>
            </ion-item>
            <ion-item>
                <ion-label>{{ $t('logisticQuotation.recurring') }}</ion-label>
                <ion-select v-model="form.recurring">
                    <ion-select-option value="weekly">{{ $t('logisticQuotation.weekly') }}</ion-select-option>
                    <ion-select-option value="biweekly">{{ $t('logisticQuotation.biweekly') }}</ion-select-option>
                    <ion-select-option value="monthly">{{ $t('logisticQuotation.monthly') }}</ion-select-option>
                    <ion-select-option value="userInput">{{ $t('logisticQuotation.userInput') }}</ion-select-option>
                </ion-select>
                <ion-label v-if="form.recurring === 'userInput'">{{ $t('logisticQuotation.recurringUserInput') }}</ion-label>
                <ion-input v-if="form.recurring === 'userInput'" v-model="form.recurringUserInput"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label position="floating">{{ $t('logisticQuotation.endDate') }}</ion-label>
                <ion-datetime v-model="form.endDate"></ion-datetime>
            </ion-item>
            <ion-button expand="full" @click="submitForm">{{ $t('logisticQuotation.submit') }}</ion-button>
        </ion-card-content>
    </ion-card>
</template>

<script>
import { defineComponent } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonDatetime, IonSelect, IonSelectOption, IonButton } from '@ionic/vue';

export default defineComponent({
    name: 'LogisticQuotationComponent',
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardContent,
        IonItem,
        IonLabel,
        IonInput,
        IonDatetime,
        IonSelect,
        IonSelectOption,
        IonButton
    },
    data() {
        return {
            form: {
                pickupAddress: '',
                deliveryAddress: '',
                pickupDate: '',
                deliveryDate: '',
                recurring: '',
                endDate: '',
                recurringUserInput: ''
            }
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await fetch('https://api.example.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.form)
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    }
});
</script>



<style scoped>
ion-card {
    margin: 20px;
}
</style>