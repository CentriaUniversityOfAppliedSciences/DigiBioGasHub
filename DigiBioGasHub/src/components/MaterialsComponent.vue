<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>Materials</ion-card-title>
        </ion-card-header>
        <ion-card-content>
            <ion-list>
                <ion-item v-for="material in materials" :key="material.id">
                    <ion-label>{{material.name}}</ion-label>
                    <ion-button @click="editMaterial(material.id)">Edit</ion-button>
                    <ion-button @click="deleteMaterial(material.id)">Delete</ion-button>
                </ion-item>
            </ion-list>
        </ion-card-content>
    </ion-card>
</template>
<script>
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'MaterialsComponent',
    components: { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel, IonButton },
    props: {
        materials: Array
    },
    setup() {
        return {
        }
    },
    methods: {
        editMaterial(id){
            console.log('Edit material with id: ' + id);
        },
        deleteMaterial(id){
            console.log('Delete material with id: ' + id);
        }
    }
});
</script>