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
import Overlay from 'ol/Overlay'

export default defineComponent( {
    name: 'MapComponent',
    components: { IonPage, IonContent },
    props: {
        propA: [Object]
    },
    setup() {
        const mapElement = ref(null)
        useGeographic();
        return { mapElement }
            
    },
    data() {
        return {
            map: null,
            markers: this.propA,
            hoverOverlay: null
        }
    },
    methods:{
        addMarkers(){
            const features = this.markers.map((m) => {
                const feature = new Feature({
                    geometry: new Point(m.coords),
                    name: m.name,
                    type: m.type,
                    location: m.location,
                    info: m.info
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
            this.map.render();
        }
    },
    mounted(){
        
        this.addMarkers();
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
                    this.addMarkers()
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