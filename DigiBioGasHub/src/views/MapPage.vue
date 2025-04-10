<template>
    <IonPage>
        <NavBarComponent />
        <IonContent>
            <IonGrid style="height:100%;">
            <IonRow style="height: 100%;">
                <IonCol size="auto">
                    <FilterComponent :filtersData=fData :dataToFilter=originalData @filtered-data="updateData"/>
                    
                </IonCol>
                <IonCol >
                    <MapComponent :propA="markerData" />

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
            originalData: [],
            fData: [],
            location: [],
            type: [],
            
        }
    },
    methods:{
        fillFilters(){
            this.fData = [ {label: this.$t('filter.farm'), value: 'Farm'}, {label: this.$t('filter.offer'), value: 'Offer'}, {label: this.$t('filter.plant'), value: 'Plant'}, { label: this.$t('filter.company'), value: 'Company' } ];
        },
        resetFilters(){
            this.markerData = this.originalData;
        },
        getMarkers(){
            // Fetch markers from the server
            this.markerData = [
                {coords:[22.846,62.792],color:'red', name: 'Test 1', location: 'Seinäjoki', type: 'Farm', info: 'Testing functionality', category: 'Farm',id:1},
                //{coords:[22.846,62.992],color:'green', name: 'Test 2', location: 'Seinäjoki', type: 'Offer', info: 'Testing functionality', category: 'Offer'},
                {coords:[25.336759,63.741336],color:'orange', name: 'Haapajärven ammattiopisto biokaasulaitos', location: 'Haapajärvi', type: 'Plant', info: 'https://www.youtube.com/watch?v=TM48FjCIvZ8',address:"Erkkiläntie 1, 85800 Haapajärvi", category: 'Plant', id:1},
                {coords:[21.763391742,63.133012353],color:'orange', name: 'Ab Stormossen Oy', location: 'Kokkola', type: 'Plant', info: 'http://www.stormossen.fi/Etusivu',address:"Stormossenintie 56, 66530 Koivulahti", category: 'Plant', id:2},
                {coords:[22.607776, 63.420134], color:'orange', name: 'Jepuan Biokaasu Oy', location: 'Jepua', type: 'Plant', info: 'http://www.jeppobiogas.fi/kotisivu/',address:"Läntinen Jepuantie 288, 66850 JEPUA", category: 'Plant', id:3},
                {coords:[23.067012, 63.868811], color:'orange', name: 'Pohjanmaan Biokaasu Oy', location: 'Kokkola', type: 'Plant', info: 'https://www.ekorosk.fi/fi/yritykset/tietoa/pohjanmaan-biokaasu/',address:"Hopeakivenlahdentie 50 B, 67900 KOKKOLA", category: 'Plant', id:4},
                
                
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
            this.markerData = data;

        },
        getOffers(){
            var url = "http://localhost:28765/getoffers";
            axios.post(url,[],{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    const newMarkers = response.data.message.map((off) => {
                        if (off.Locations.length > 0) {
                            return {
                                coords: [off.Locations[0].longitude, off.Locations[0].latitude],
                                location: off.Company.city,
                                name: off.description,
                                color: 'green',
                                category: 'Offer',
                                type: 'Offer',
                                info: off.description
                            };
                        }
                        return null;
                    }).filter(marker => marker !== null);
                    this.markerData = [...this.markerData, ...newMarkers]; // Reassign the array
                    this.originalData = [...this.markerData]; // Update the original data as well
                }
            });
        }
    },
    mounted(){
        
        this.getMarkers();
        this.getOffers();
        this.fillFilters();
        this.location = this.getUniqueLocations();
        this.type = this.getUniqueTypes();
        
        this.resetFilters();
    }
    
});
</script>

<style scoped>
/* Optional styling */
</style>