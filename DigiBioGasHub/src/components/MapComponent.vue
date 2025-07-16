<template>
    <IonPage style="height: 100%; width: 100%;">
        <IonContent style="height: 100%; width: 100%;">
            <ol-map ref="regionMap" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true"
                style="height: 100%; width: 100%;">
                <ol-view :center=center :zoom="8" />
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
import { useGeographic } from 'ol/proj'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Style, Circle, Fill, Stroke, Icon } from 'ol/style'
import Overlay from 'ol/Overlay'

export default defineComponent({
    name: 'MapComponent',
    components: {
        IonPage,
        IonContent,
        IonGrid,
        IonRow,
        IonCol
    },
    props: {
        propA: [Object]
    },
    emits: [
        'offer_click'
    ],
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
            plantStyle: new Style({
                image: new Icon({
                    anchor: [0.5, 0.5],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    src: '/assets/plant.svg',
                    color: 'green'

                })
            }),
            vectorSource: null,
            vectorLayer: null,
            product: null
        }
    },
    methods: {

        addMarkers() {
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
                    info: m.info,
                    offerID: m.offerID
                })
                if (m.type === 'Station') {
                    feature.setStyle(this.stationStyle);
                }
                else if (m.type === 'Plant') {
                    feature.setStyle(this.plantStyle);
                } else if (m.type === 'Company') {
                    feature.setStyle(
                        new Style({
                            image: new Icon({
                                anchor: [0.5, 0.5],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'fraction',
                                src: '/assets/company2.svg',
                                scale: 0.05,
                            })
                        })
                    );
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
    mounted() {
        this.map = this.$refs.regionMap.map;

        this.vectorSource = new VectorSource({});
        this.vectorLayer = new VectorLayer({ source: this.vectorSource });
        this.map.addLayer(this.vectorLayer);
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
                container.innerHTML = (feature.get('name') + "<br>" + "<br>" + feature.get('location') + "<br>" + feature.get('info'))
                this.hoverOverlay.setPosition(evt.coordinate)
            } else {
                this.hoverOverlay.setPosition(undefined)
            }
        })
        this.map.on('click', (evt) => {
            const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feat) => feat)
            if (feature && feature.get("type") === 'Offer') {
                /*this.$router.push({
                    name: 'Product Offer',
                    params: {
                        id: feature.get('offerID')
                    }
                })*/
                this.$emit('offer_click', {
                    id: feature.get('offerID'),
                    name: feature.get('name'),
                    location: feature.get('location'),
                    info: feature.get('info')
                });
            }
            else if (feature && feature.get("type") === 'Plant') {
                const url = feature.get('info');
                if (url && typeof url === 'string' && url.startsWith('http')) {
                    window.open(url, '_blank');
                }
            }
        });

    },
    watch: {
        propA: {
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.markers = newVal
                    if (this.map != undefined && this.map != null) {
                        this.addMarkers();
                    }
                }
            },
            immediate: true,
            flush: 'post'
        }
    }
});
</script>
