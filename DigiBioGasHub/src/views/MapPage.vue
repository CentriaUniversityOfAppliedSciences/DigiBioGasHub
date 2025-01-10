<template>
    <IonPage>
        <NavBarComponent />
        <IonContent>
            <div style="display: flex; width: 100%; height: 100%;">
                <div style="width: 300px; border-right: 1px solid #ccc; padding: 1rem;">
                    <h2>Filters</h2>
                    <h3>Location</h3>
                    
                        <ion-checkbox v-for="(loc,index) in location" :key="loc" @IonChange="filterLocationData(loc)" >{{loc}}</ion-checkbox>
                    
                    
                    <h3>Type</h3>
                    
                        <ion-checkbox v-for="(typ,index) in type" :key="typ" @IonChange="filterTypeData(typ)" >{{typ}}</ion-checkbox>
                    
                    
                </div>
                <div style="flex: 1;">
                    <MapComponent :propA="markerData" />
                </div>
            </div>
        </IonContent>
        <FooterComponent />
    </IonPage>
</template>

<script>
import { IonPage, IonContent, IonCheckbox,  } from '@ionic/vue'
import MapComponent from '../components/MapComponent.vue'
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MapPage',
    components: {
        IonPage,
        IonContent,
        MapComponent,
        NavBarComponent,
        FooterComponent,
        IonCheckbox,
        
    },
    data() {
        return {
            markerData: [],
            originalData: [],
            location: [],
            type: [],
            
        }
    },
    methods:{
        getMarkers(){
            // Fetch markers from the server
            this.markerData = [
                {coords:[22.846,62.792],color:'red', name: 'Test 1', location: 'Seinäjoki', type: 'Farm', info: 'Testing functionality'},
                {coords:[22.846,62.992],color:'green', name: 'Test 2', location: 'Seinäjoki', type: 'Offer', info: 'Testing functionality'}
            ];
            this.originalData = this.markerData;
        },
        filterLocationData(location){
            if(!location){
                return this.originalData;
            }
            this.markerData = this.markerData.filter((m) => {
               return m.location === location
            })
        },
        filterTypeData(type){
            console.log(type);
            if (!type){
                return this.originalData;
            }
            this.markerData = this.markerData.filter((m) => {
                return m.type === type
            })
        },
        getUniqueLocations() {
        if (!this.markerData) return []
        return [...new Set(this.markerData.map(marker => marker.location))]
  },
    getUniqueTypes() {
        if (!this.markerData) return []
        return [...new Set(this.markerData.map(marker => marker.type))]
    },  
    },
    mounted(){
        this.getMarkers();
        this.location = this.getUniqueLocations();
        this.type = this.getUniqueTypes();
    }
    
});
</script>

<style scoped>
/* Optional styling */
</style>