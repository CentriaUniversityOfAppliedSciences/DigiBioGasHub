<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ $t('admin.materials') }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-button id="addMaterialButton">{{ $t('admin.material.addMaterial') }}</ion-button>
            <ion-list>
                <ion-item v-for="material in materials" :key="material.id">
                    <ion-label>{{material.name}}</ion-label>
                    <ion-button @click="openEditModal(material)">{{ $t('menu.edit') }}</ion-button>
                    <ion-button @click="deleteMaterial(material.id)">{{ $t('menu.delete') }}</ion-button>
                </ion-item>
            </ion-list>
            
        </ion-card-content>
    </ion-card>
    <EditMaterialComponent :material="selectedMaterial" :is-open="isEditModalOpen" @close="closeEditModal" @getMaterials="getMaterials" />
    <AddMaterialComponent @getMaterials="getMaterials"/>
</template>
<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonButton, alertController  } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import EditMaterialComponent from './EditMaterialComponent.vue';
import AddMaterialComponent from './AddMaterialComponent.vue';
import axios from 'axios';
export default defineComponent({
    name: 'MaterialsComponent',
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonButton, EditMaterialComponent, AddMaterialComponent, alertController  },
    props: {
        materials: Array
    },
    data() {
        return {
        }
    },
    emits: ['getMaterials'],
    setup() {
        const selectedMaterial = ref(null);
        const isEditModalOpen = ref(false);
        const openEditModal = (material) => {
            selectedMaterial.value = material; 
            isEditModalOpen.value = true;
        };
        const closeEditModal = () => {
            isEditModalOpen.value = false;
        }
        return {
            selectedMaterial, openEditModal, closeEditModal, isEditModalOpen
        }
    },
    methods: {
        async deleteMaterial(id){
            const alert = await alertController.create({
                header: 'Confirm Deletion',
                subHeader: 'Are you sure?',
                message: this.$t('menu.are_you_sure'),
                buttons: [
                    {
                        text: this.$t('menu.cancel'),
                        role: 'cancel'
                    },
                    {
                        text: this.$t('menu.yes'),
                        handler: () => {
                            this.sendDelete(id);
                        }
                    }
                ]

            });
            

            await alert.present();
        },
        sendDelete(id){
                axios.post('http://localhost:28765/admin/deletematerial',{ "id" : id }, { headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false} )
                .then(response => {
                    this.$emit('getMaterials');
                })
                .catch(error => {
                    console.error(error);
                });
            },
            getMaterials(){
                this.$emit('getMaterials');
            }
        
    }
});
</script>