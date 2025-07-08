<template>
    <IonModal :is-open="isOpen" @didDismiss="close">
        <ion-content class="ion-padding" scroll-y="true">
            <h2>{{ $t('premium.giftUser') }}</h2>

            <IonItem>
                <IonLabel position="floating">{{ $t('premium.name') }}</IonLabel>
                <IonInput v-model="formData.name" disabled></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">{{ $t('general.email') }}</IonLabel>
                <IonInput v-model="formData.email" disabled></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>{{ $t('premium.duration') }}</IonLabel>
                <IonSelect v-model="formData.duration" interface="popover">
                    <IonSelectOption value="3">{{ $t('premium.3months') }}</IonSelectOption>
                    <IonSelectOption value="6">{{ $t('premium.6months') }}</IonSelectOption>
                    <IonSelectOption value="12">{{ $t('premium.12months') }}</IonSelectOption>
                    <IonSelectOption value="custom">{{ $t('premium.custom') }}</IonSelectOption>
                </IonSelect>
            </IonItem>

            <IonItem v-if="formData.duration === 'custom'">
                <IonLabel>{{ $t('premium.expirationDate') }}</IonLabel>
                <IonDatetime v-model="formData.customDate" presentation="date"></IonDatetime>
            </IonItem>

            <IonButton @click="submitGift" expand="full" color="primary">{{ $t('premium.giftNow') }}</IonButton>
            <IonButton expand="full" color="light" @click="close">{{ $t('general.cancel') }}</IonButton>
        </ion-content>

        <ToastComponent ref="toastComponent" />
    </IonModal>
</template>

<script>
import { IonModal, IonItem, IonInput, IonLabel, IonSelect, IonSelectOption, IonDatetime, IonButton, IonContent } from '@ionic/vue';
import axios from 'axios';
import { defineComponent } from 'vue';
import ToastComponent from './ToastComponent.vue';

export default defineComponent({
    name: 'GiftPremiumComponent',
    components: {
        IonModal,
        IonContent,
        IonItem,
        IonInput,
        IonLabel,
        IonSelect,
        IonSelectOption,
        IonDatetime,
        IonButton,
        ToastComponent
    },
    props: {
        isOpen: Boolean,
        user: Object
    },
    emits: ['close', 'gifted'],
    data() {
        return {
            formData: {
                name: '',
                email: '',
                duration: '3',
                customDate: ''
            }
        };
    },
    watch: {
        user: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.formData.name = val.name;
                    this.formData.email = val.email;
                }
            }
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        async submitGift() {
            try {
                let expirationDate;

                if (this.formData.duration === 'custom') {
                    expirationDate = this.formData.customDate;
                } else {
                    const now = new Date();
                    now.setMonth(now.getMonth() + parseInt(this.formData.duration));
                    expirationDate = now.toISOString();
                }

                const payload = {
                    userID: this.user.id,                        
                    subscriptionDate: new Date().toISOString(),   
                    expirationDate: expirationDate
                };

                const response = await axios.post(this.$api_add + '/admin/giftsubscription', payload, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false });
                if (response.data.type === 'result' && response.data.result === 'ok') {
                    this.$emit('gifted');
                    this.close();
                    this.$refs.toastComponent.showToast(this.$t('premium.giftSuccess'), 2000, 'success');
                }
            } catch (error) {
                console.error(error);
                this.$refs.toastComponent.showToast(this.$t('premium.giftFail'), 2000, 'danger');
            }
        }

    }
});
</script>
