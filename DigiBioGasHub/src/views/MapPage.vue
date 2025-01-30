<template>
    <IonPage>
        <NavBarComponent />
        <IonContent>
            <IonGrid style="height:100%;">
            <IonRow style="height: 100%;">
                <IonCol size="auto">
                    <FilterComponent :filtersData=fData :dataToFilter=originalData @filtered-data="updateData"/>
                    <FilterComponent :filtersData=sData :dataToFilter=oStationData @filtered-data="updateStationData"/>
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
import FilterComponent from '../components/FilterComponent.vue';
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
        FilterComponent,
        IonCheckbox,IonRow, IonCol, IonGrid
        
    },
    data() {
        return {
            markerData: [],
            stationData: [],
            originalData: [],
            oStationData: [],
            fData: [],
            sData: [],
            location: [],
            type: [],
            
        }
    },
    methods:{
        fillFilters(){
            this.fData = [ {label: 'Farm', value: 'Farm'}, {label: 'Offer', value: 'Offer'}, {label: 'Plant', value: 'Plant'}];
            this.sData = [ {label: 'Piilota', value: 'Station'} ];
        },
        resetFilters(){
            this.markerData = this.originalData;
            this.stationData = this.oStationData;
        },
        getMarkers(){
            // Fetch markers from the server
            this.markerData = [
                {coords:[22.846,62.792],color:'red', name: 'Test 1', location: 'Seinäjoki', type: 'Farm', info: 'Testing functionality', category: 'Farm'},
                {coords:[22.846,62.992],color:'green', name: 'Test 2', location: 'Seinäjoki', type: 'Offer', info: 'Testing functionality', category: 'Offer'},
                {coords:[25.336759,63.741336],color:'orange', name: 'Haapajärven ammattiopisto biokaasulaitos', location: 'Haapajärvi', type: 'Plant', info: 'https://www.youtube.com/watch?v=TM48FjCIvZ8',address:"Erkkiläntie 1, 85800 Haapajärvi", category: 'Plant'},
                {coords:[21.763391742,63.133012353],color:'orange', name: 'Ab Stormossen Oy', location: 'Kokkola', type: 'Plant', info: 'http://www.stormossen.fi/Etusivu',address:"Stormossenintie 56, 66530 Koivulahti", category: 'Plant'},
                
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
        updateData(data){
            console.log(data);
            this.markerData = data;

        },
        updateStationData(data){
            console.log(data);
            this.stationData = data;
        }
    },
    mounted(){
        
        this.getMarkers();
        this.getStations();
        this.fillFilters();
        this.location = this.getUniqueLocations();
        this.type = this.getUniqueTypes();
    }
    
});
</script>

<style scoped>
/* Optional styling */
</style>