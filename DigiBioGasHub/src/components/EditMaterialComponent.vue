<template>
    <ion-modal :is-open="isOpen" @didDismiss="$emit('close')">
        <ion-header>
            <ion-toolbar>
                <ion-title>Edit Material</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="$emit('close')">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card>
                <ion-card-content>
                    <ion-item>
                        <ion-label>{{ $t('admin.material.name') }}</ion-label>
                        <ion-input v-model="materialRef.name"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label>{{ $t('admin.material.description') }}</ion-label>
                        <ion-input v-model="materialRef.description"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label>{{ $t('admin.material.type') }}</ion-label>
                        
                        <ion-select v-model="materialRef.type">
                            <ion-select-option 
                                v-for="(value, key) in materialTypes" 
                                :key="key" 
                                :value="key">
                                {{ value }}
                            </ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-item>
                        <ion-label>{{ $t('admin.material.quality') }}</ion-label>
                        <ion-input v-model="materialRef.quality"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label>Other</ion-label>
                        <ion-input v-model="materialRef.other"></ion-input>
                    </ion-item>
                    <ion-item>
                        <ion-label>{{ $t('admin.material.locality') }}</ion-label>
                        
                        <ion-select v-model="materialRef.locality">
                            <ion-select-option value="fi">FI</ion-select-option>
                            <ion-select-option value="en">EN</ion-select-option>
                            <ion-select-option value="sv">SV</ion-select-option>
                        </ion-select>
                    </ion-item>
                    <ion-button @click="editMaterial()">{{ $t('menu.save')}}</ion-button>
                </ion-card-content>
            </ion-card>
        </ion-content>

    </ion-modal>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';
import axios from 'axios';

import { IonLabel, IonContent, IonHeader, IonCard, IonCardContent, IonButton, IonModal, IonToolbar, IonTitle, IonButtons, IonItem, IonInput, IonSelect, IonSelectOption } from '@ionic/vue';


export default defineComponent({
    name: 'EditMaterialComponent',
    components: { IonLabel, IonContent, IonHeader, IonCard, IonCardContent, IonButton, IonModal, IonToolbar, IonTitle, IonButtons, IonItem, IonInput, IonSelect, IonSelectOption },
    props: {
        isOpen: Boolean,
        material: Object
    },
    emits: ['getMaterials'],
    setup(props){
        var materialRef = ref({ ...props.material });
        watch(() => props.material, 
        (newVal) => {
                materialRef.value = { ...newVal };
                if (newVal != undefined && newVal != null){
                    materialRef.value.type = newVal.type.toString();
                }
                
        }, 
        { immediate: true   }
        );
        return {
            materialRef
        }
    },
    data(){
        return {
        }
    },
    methods:{
        editMaterial(){
            console.log('Edit material:', this.materialRef);
            var url = "http://localhost:28765/admin/editmaterial";
            axios.post(url, this.materialRef, {headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type="result" && response.data.result == "ok"){
                    this.$emit('close');
                    this.$emit('getMaterials');
                }
            });
        }
    },
    mounted(){
        const materialTypes = this.$i18n.messages[this.$i18n.locale]?.material?.type;
        if (typeof materialTypes === 'object' && !Array.isArray(materialTypes)) {
            this.materialTypes = materialTypes;
        } else {
            console.error('Invalid material.type format in i18n configuration');
        }
    },

});


</script>