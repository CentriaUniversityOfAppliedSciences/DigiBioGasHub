<template>
    <IonPage>
        <NavBarComponent />
        <IonContent>
            <IonGrid style="height:80%;">
            <IonRow style="height: 100%;">
                <IonCol size="auto">
                    <FilterComponent :filtersData=fData :dataToFilter=originalData @filtered-data="updateData"/>
                    
                </IonCol>
                <IonCol >
                    <MapComponent :propA="markerData" />

                </IonCol>
            </IonRow>
        </IonGrid>
        <FooterComponent />
        </IonContent>
        
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
import { terminal } from 'ionicons/icons';

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
            terminals: [],
            
        }
    },
    methods:{
        fillFilters(){
            this.fData = [ {label: this.$t('filter.farm'), value: 'Farm'}, {label: this.$t('filter.offer'), value: 'Offer'}, {label: this.$t('filter.plant'), value: 'Plant'}, { label: this.$t('filter.company'), value: 'Company' },{ label: this.$t('company.logistics.terminalsMenuButton'), value:'Terminal'} ];
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
        getTerminals(){
            var url = this.$api_add + "/logistics/getterminals";
            axios.post(url,[],{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    this.terminals = response.data.message;
                    if (this.terminals.length > 0){
                        const newMarkers = this.terminals.map((term) => {
                            var infoText = this.$t('company.logistics.haulType') + ": ";
                            var haulTypes = term.haulType;
                            for (var i = 0; i < haulTypes.length; i++) {
                                var type = haulTypes[i];
                                var typeText = this.$t('material.type.' + type);
                                infoText += typeText  + " ";
                                
                            }
                            return {
                                coords: [term.longitude, term.latitude],
                                location: term.city,
                                name: term.companyName,
                                color: 'blue',
                                category: 'Terminal',
                                type: 'Terminal',
                                info: infoText,
                                terminalID: term.id,
                            };
                        });
                        this.markerData = [...this.markerData, ...newMarkers]; // Reassign the array
                        this.originalData = [...this.markerData]; // Update the original data as well
                    }
                    
                    
                }
            });
        },
        getCompanyLocations(){
            var url = this.$api_add + "/company/getAllLocations";
            axios.post(url,[],{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    const newMarkers = response.data.message.map((loc) => {
                        return {
                            coords: [loc.longitude, loc.latitude],
                            location: loc.city,
                            name: loc.companyName,
                            icon:'building',
                            category: 'Company',
                            type: 'Company',
                            info: loc.address + ", " + loc.zipcode + " " + loc.city,
                            companyID: loc.companyID,
                        };
                    });
                    this.markerData = [...this.markerData, ...newMarkers];
                    this.originalData = [...this.markerData]; 
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
            this.markerData = data;

        },
        getOffers(){
            var url = this.$api_add + "/getoffers";
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
                                info: off.description,
                                offerID: off.id,
                            };
                        }
                        return null;
                    }).filter(marker => marker !== null);
                    this.markerData = [...this.markerData, ...newMarkers]; // Reassign the array
                    this.originalData = [...this.markerData]; // Update the original data as well
                }
                this.getTerminals();
                this.getCompanyLocations();
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
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.getMarkers();
            vm.getOffers();
            vm.fillFilters();
        });
    },
    
});
</script>

<style scoped>
/* Optional styling */
</style>