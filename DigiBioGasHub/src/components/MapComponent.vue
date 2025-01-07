<template>
    <IonPage>
        <IonContent>
            <div class="map" id="regionmap" style="height: 100%; width: 100%;"></div>
        </IonContent>
    </IonPage>
</template>

<script>
import { IonPage, IonContent } from '@ionic/vue'
import 'ol/ol.css'
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
import { Style, Circle, Fill } from 'ol/style'

export default defineComponent( {
    name: 'MapComponent',
    components: { IonPage, IonContent },
    props: {
        propA: [Object]
    },
    setup() {
        const mapElement = ref(null)
        
        return { mapElement }
            
    },
    data() {
        return {
            map: null,
            markers: this.propA,
            
        }
    },
    methods:{
        addMarkers(){
            const features = this.markers.map((m) => {
                const feature = new Feature({
                    geometry: new Point(m.coords)
                })
                feature.setStyle(
                    new Style({
                        image: new Circle({
                            radius: 8,
                            fill: new Fill({ color: m.color })
                        })
                    })
                )
                return feature
            })

            const vectorSource = new VectorSource({ features })
            const vectorLayer = new VectorLayer({ source: vectorSource })

            this.map = new Map({
                target: 'regionmap',
                
                layers: [
                    new TileLayer({ source: new OSM(), preload: Infinity }),
                    vectorLayer
                ],
                view: new View({
                    center: [22.9999, 62.9999],
                    zoom: 8,
                    constrainResolution: true
                })
            })
            
        }
    },
    mounted(){
        useGeographic();
        this.addMarkers()
    }
});

</script>

<style scoped>
/* Adjust map styling as needed */
</style>