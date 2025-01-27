<template>
    <IonPage>
        <NavBarComponent />
        <IonContent>
            <IonGrid style="height:100%;">
            <IonRow style="height: 100%;">
                <IonCol size="auto">
                    <div style=" width: 100%; height: 100%;">
                    <div style="width: 300px; border-right: 1px solid #ccc; padding: 1rem;">
                        <h2>Filters</h2>
                        <h3>Location</h3>
                        
                            <ion-checkbox v-for="(loc,index) in location" :key="loc" @IonChange="filterLocationData(loc)" >{{loc}}</ion-checkbox>
                        
                        
                        <h3>Type</h3>
                        
                            <ion-checkbox v-for="(typ,index) in type" :key="typ" @IonChange="filterTypeData(typ)" >{{typ}}</ion-checkbox>
                        
                        
                    </div>
                    </div>
                </IonCol>
                <IonCol >
                    <MapComponent :propA="markerData" :probB="stationData" />

                </IonCol>
            </IonRow>
        </IonGrid>
        </IonContent>
        <FooterComponent />
    </IonPage>
</template>

<script>
import { IonPage, IonContent, IonCheckbox, IonRow, IonCol, IonGrid } from '@ionic/vue'
import MapComponent from '../components/MapComponent.vue'
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'MapPage',
    components: {
        IonPage,
        IonContent,
        MapComponent,
        NavBarComponent,
        FooterComponent,
        IonCheckbox,IonRow, IonCol, IonGrid
        
    },
    data() {
        return {
            markerData: [],
            stationData: [],
            originalData: [],
            oStationData: [],
            location: [],
            type: [],
            
        }
    },
    methods:{
        getMarkers(){
            // Fetch markers from the server
            this.markerData = [
                {coords:[22.846,62.792],color:'red', name: 'Test 1', location: 'Seinäjoki', type: 'Farm', info: 'Testing functionality'},
                {coords:[22.846,62.992],color:'green', name: 'Test 2', location: 'Seinäjoki', type: 'Offer', info: 'Testing functionality'},
                {coords:[25.336759,63.741336],color:'orange', name: 'Haapajärven ammattiopisto biokaasulaitos', location: 'Haapajärvi', type: 'Plant', info: 'https://www.youtube.com/watch?v=TM48FjCIvZ8',address:"Erkkiläntie 1, 85800 Haapajärvi"},
                {coords:[21.763391742,63.133012353],color:'orange', name: 'Ab Stormossen Oy', location: 'Kokkola', type: 'Plant', info: 'http://www.stormossen.fi/Etusivu',address:"Stormossenintie 56, 66530 Koivulahti"},
                
            ];
            this.originalData = this.markerData;
            
        },
        getStations(){
            var url = "http://localhost:28765/stations";
            axios.post(url,{withCredentials: false}).then((response) => {
                if (response.data.type="result" && response.data.result.length > 0){
                    this.stationData = response.data.result;
                    this.oStationData = response.data.result;
                    
                }
            });
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
        this.getStations();
        this.location = this.getUniqueLocations();
        this.type = this.getUniqueTypes();
    }
    
});
</script>

<style scoped>
/* Optional styling */
</style>