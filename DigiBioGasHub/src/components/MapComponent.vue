<template>
    <IonPage style="width:100%;height:100%;">
        <IonContent style="width:100%;height:100%;">
                    <ol-map ref="regionMap" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="width: 100%;height: 100%;">
                        <ol-view :center=center :zoom="8"  />
                        <ol-tile-layer>
                            <ol-source-osm />
                        </ol-tile-layer>
                    </ol-map>
                
        </IonContent>
    </IonPage>
</template>

<script>
import { IonPage, IonContent, IonGrid, IonRow, IonCol } from '@ionic/vue'

import { ref, defineComponent } from 'vue'
import { Map, View } from 'ol'
import { useGeographic } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Circle, Fill, Stroke, Icon } from 'ol/style'
import Overlay from 'ol/Overlay'



export default defineComponent( {
    name: 'MapComponent',
    components: { IonPage, IonContent, IonGrid, IonRow, IonCol },
    props: {
        propA: [Object],
        probB: [Object]
    },
    setup() {
        const mapElement = ref(null)
        useGeographic();
        return { mapElement }
            
    },
    data() {
        return {
            map: null,
            center: ref([22.9999, 62.9999]),
            stroke: ref("#ffffff"),
            fill: ref("efefef"),
            markers: this.propA,
            stations: this.probB,
            hoverOverlay: null,
            stationStyle: new Style({
                image: new Icon({
                    anchor: [0.5, 0.5],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    src: 'src/assets/station.svg',

                })
            }),
            plantStyle: new Style({
                image: new Icon({
                    anchor: [0.5, 0.5],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    src: 'src/assets/plant.svg',
                    color: 'green'

                })
            }),
            vectorSource: null,
            vectorLayer: null,
            stationSource: null, 
            stationLayer: null,

        }
    },
    methods:{
        addStations(){
            this.plantStyle.getImage().setScale([
                parseFloat(0.25),
                parseFloat(0.25),
            ]);
            this.stationSource.clear();
            var features = this.stations.map((m) => {
                const feature = new Feature({
                    geometry: new Point([m.longitude, m.latitude]),
                    name: m.name,
                    type: "station",
                    location: m.street + ", " + m.city + ", " + m.postalCode,
                    info: "Tiedot peräisin Gasum.com sivuston rajapinnasta"
                })
               
                feature.setStyle(this.stationStyle);
                return feature;
            });
            this.stationSource.addFeatures(features); 
        },
        addMarkers(){
             
            this.stationStyle.getImage().setScale([
                parseFloat(0.25),
                parseFloat(0.25),
            ]);
            this.plantStyle.getImage().setScale([
                parseFloat(0.25),
                parseFloat(0.25),
            ]);
            this.vectorSource.clear();  
            var features = this.markers.map((m) => {
                const feature = new Feature({
                    geometry: new Point(m.coords),
                    name: m.name,
                    type: m.type,
                    location: m.location,
                    info: m.info
                })
                if (m.type === 'Station'){
                    feature.setStyle(this.stationStyle);
                }
                else if (m.type === 'Plant'){
                    feature.setStyle(this.plantStyle);
                }
                else {
                    feature.setStyle(
                        new Style({
                            image: new Circle({
                                radius: 8,
                                fill: new Fill({ color: m.color }),
                                stroke: new Stroke({ color: '#fff', width: 2 })
                            })
                        })
                    )
                }
                return feature
            })
            this.vectorSource.addFeatures(features);
            
        }
    },
    mounted(){
        this.map = this.$refs.regionMap.map;
        this.vectorSource= new VectorSource({ });
        this.vectorLayer= new VectorLayer({ source: this.vectorSource });
        this.stationSource=  new VectorSource({ });
        this.stationLayer= new VectorLayer({ source: this.stationSource });
        this.map.addLayer(this.vectorLayer);
        this.map.addLayer(this.stationLayer);
        this.addMarkers();
        this.addStations();
        // create overlay
    const container = document.createElement('div')

    container.style.backgroundColor = '#fff'
    container.style.padding = '4px'
    container.style.border = '1px solid #333'
    this.hoverOverlay = new Overlay({ element: container, offset: [10, 0] })
    this.map.addOverlay(this.hoverOverlay)

    // handle pointermove
    this.map.on('pointermove', (evt) => {
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feat) => feat)
      if (feature) {
        container.innerHTML = (feature.get('name') + "<br>" + feature.get('type') + "<br>" + feature.get('location') + "<br>" +  feature.get('info'))
        this.hoverOverlay.setPosition(evt.coordinate)
      } else {
        this.hoverOverlay.setPosition(undefined)
      }
    })
    },
    watch: {
        propA: {
            handler(newVal, oldVal) {
                if(newVal !== oldVal) {
                    this.markers = newVal
                    if (this.map != undefined && this.map != null){
                        
                        this.addMarkers();
                    }
                }
                
            },
            immediate: true,
            flush: 'post'
        },
        probB: {
            handler(newVal) {
                this.stations = newVal
                if (this.map != undefined && this.map != null){
                    this.addStations();
                }
                
                
            },
            immediate: true,
            flush: 'post'
        }
    }
    
});

</script>

<style scoped>
/* Adjust map styling as needed */
</style>