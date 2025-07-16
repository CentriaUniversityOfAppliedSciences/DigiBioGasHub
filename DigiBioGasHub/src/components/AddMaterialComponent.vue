<template>
    <ion-modal trigger="addMaterialButton">
        <ion-header>
            <ion-toolbar>
                <ion-title>{{ $t('admin.material.addMaterial') }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="modalController.dismiss()">{{ $t('general.close') }}</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-content>

                    <p class="required-note">
                        {{ $t('validation.requiredField') }}
                    </p>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('admin.material.name') }}<span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-input v-model="name"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">{{ $t('admin.material.description') }}</ion-label>
                        <ion-input v-model="description"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">
                            {{ $t('admin.material.type') }}<span class="required-asterisk">*</span>
                        </ion-label>
                        <ion-select v-model="type">
                            <ion-select-option v-for="(value, key) in materialTypes" :key="key" :value="key">
                                {{ value }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">{{ $t('admin.material.quality') }}</ion-label>
                        <ion-input v-model="quality"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">Other</ion-label>
                        <ion-input v-model="other"></ion-input>
                    </ion-item>

                    <ion-item>
                        <ion-label position="stacked" class="label">{{ $t('admin.material.locality') }}</ion-label>
                        <ion-select v-model="locality">
                            <ion-select-option value="fi">FI</ion-select-option>
                            <ion-select-option value="en">EN</ion-select-option>
                            <ion-select-option value="sv">SV</ion-select-option>
                        </ion-select>
                    </ion-item>

                    <ion-button @click="addMaterial()">{{ $t('menu.save') }}</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>

        <ToastComponent ref="toastComponent" />

    </ion-modal>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg, IonButton, IonItem, IonLabel, IonInput, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, modalController, IonSelect, IonSelectOption } from '@ionic/vue';
import ToastComponent from './ToastComponent.vue';
export default defineComponent({
    name: 'AddMaterialComponent',
    components: {
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonImg,
        IonButton,
        IonItem,
        IonLabel,
        IonInput,
        IonModal,
        IonHeader,
        IonToolbar,
        IonButtons,
        IonTitle,
        IonSelect,
        IonSelectOption,
        ToastComponent
    },
    data() {
        return {
            name: '',
            description: '',
            type: '',
            quality: '',
            other: '',
            locality: '',
            materialTypes: {}
        }
    },
    emits: ['getMaterials'],
    setup() {
        return {
            modalController
        }
    },
    mounted() {
        const materialTypes = this.$i18n.messages[this.$i18n.locale]?.material?.type;
        if (typeof materialTypes === 'object' && !Array.isArray(materialTypes)) {
            this.materialTypes = materialTypes;
        } else {
            console.error('Invalid material.type format in i18n configuration');
        }
    },
    methods: {
        addMaterial() {

            const trimmedName = this.name.trim();

            if (!trimmedName || !this.type) {
                this.$refs.toastComponent.showToast(this.$t('validation.fillAllRequiredFields'), 2000, 'danger');
                return;
            }

            axios.post(this.$api_add + '/admin/addmaterial', {
                name: this.name,
                description: this.description,
                type: this.type,
                quality: this.quality,
                other: this.other,
                locality: this.locality
            }, { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then(response => {
                if (response.data.type = "result" && response.data.result == "ok") {
                    this.$emit('getMaterials');
                    this.modalController.dismiss();
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
});


</script>

<style scoped>

.required-note {
    padding: 0.5rem;
    border-radius: 10px;
    color: var(--color);
    background-color: transparent;
    text-align: center;
    border: 2px solid var(--ion-color-warning);
    max-width: 18rem;
    margin: auto;
    margin-bottom: 1.5rem;
}

ion-item {
    --background: none;
    margin-bottom: 3px;
}

.label {
    font-size: 1.5rem;
    margin-bottom: 5px;
}

ion-input {
    --border-color: none;
}

.required-asterisk {
    color: red;
    margin-left: 3px;
    font-size: 20PX;
}
</style>
