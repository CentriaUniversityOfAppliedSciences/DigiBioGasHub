<template>
    <ion-page>
        <NavBarComponent />
        <ion-content>
        <ion-card style="height: 75%; width:50%; margin: auto;">
            <ion-content>
                <ion-card-content>
                <ion-item>
                    <ion-select required v-model="companyID" :label="$t('menu.company')" :placeholder="$t('product.chooseCompany')">
                        <ion-select-option v-for="comp in companies" :key="comp.name" :value="comp.id">{{ comp.name }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">{{ $t('product.image') }}</ion-label><br/>
                    <input type="file" accept="image/*" @change="processImg" style="display: block; width: 100%;"/>
                    <!--<ion-input :label="$t('product.image')" labelPlacement="floating" type="file" @IonChange="processImg"></ion-input>-->
                </ion-item>
                <ion-item>
                    <img :src="image64"/>
                </ion-item>
                <ion-item>
                    <ion-select required v-model="material" :label="$t('product.material')" :placeholder="$t('product.chooseMaterial')" @ionChange="materialSelected">
                        <ion-select-option  v-for="mater in materials" :key="mater.name" :value="mater.id">{{ mater.name }}</ion-select-option>
                        
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-input required :label="$t('product.name')" labelPlacement="floating" v-model="selectedMaterialName" :disabled="true"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-select required v-model="type" labelPlacement="floating" :label="$t('product.offerTypes')" :placeholder="$t('product.chooseType')">
                        <ion-select-option value="1">{{ $t('product.type.offer') }}</ion-select-option>
                        <ion-select-option value="2">{{ $t('product.type.demand') }}</ion-select-option>
                        <ion-select-option value="3">{{ $t('product.type.auction') }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-textarea :label="$t('product.desc')" labelPlacement="floating" v-model="description"></ion-textarea>
                </ion-item>
                <ion-item >
                    <ion-input required :label="$t('product.price.offer')" labelPlacement="floating" type="number" v-model="price" min="0"></ion-input>
                </ion-item>
                
                <ion-item>
                    <ion-input :label="$t('product.quantity')" labelPlacement="floating" type="number" v-model="quantity" min="0"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-select v-model="unit" :label="$t('product.unit')">
                        <ion-select-option value="1">{{ $t('unit.amount.1') }}</ion-select-option>
                        <ion-select-option value="2">{{ $t('unit.amount.2') }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-select v-model="logisticType" :label="$t('product.logistic.type')">
                        <ion-select-option value="1">{{ $t('product.logistic.includedInPrice') }}</ion-select-option>
                        <ion-select-option value="2">{{ $t('product.logistic.freeToPickup') }}</ion-select-option>
                        <ion-select-option value="3">{{ $t('product.logistic.agreedupon') }}</ion-select-option>
                        
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-datetime :locale="getLocale()" :first-day-of-week="1" hour-cycle="h23" v-model="startDate" >
                        <span slot="title">{{ $t('product.productDetails.offerValidFrom') }}</span>
                        <span slot="time-label">{{ $t('product.time') }}</span>
                    </ion-datetime>
                </ion-item>
                <ion-item>
                    <ion-datetime :locale="getLocale()" :first-day-of-week="1" hour-cycle="h23" v-model="endDate" >
                        <span slot="title">{{ $t('product.endTime') }}</span>
                        <span slot="time-label">{{ $t('product.time') }}</span>
                    </ion-datetime>
                </ion-item>
                <ion-item>
                    <ion-select required v-model="visibility" :label="$t('product.visibility.info')" :placeholder="$t('product.visibility.chooseVisibility')">
                        <ion-select-option value="1">{{ $t('product.visibility.public') }}</ion-select-option>
                        <ion-select-option value="2">{{ $t('product.visibility.private') }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ol-map ref="regionMap" :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 200px; width: 200px;" >
                        <ol-view :center=center :zoom="8"  />
                        <ol-tile-layer>
                            <ol-source-osm />
                        </ol-tile-layer>
                    </ol-map>
                </ion-item>
                <ion-button expand="full" @click="saveProduct">{{ $t('menu.save') }}</ion-button>
            </ion-card-content>
            </ion-content>
        </ion-card>
        <FooterComponent />
        </ion-content>
        
        </ion-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonModal,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonItem,

    IonSelect,
    IonSelectOption,
    IonInput,
    IonLabel,
    IonTextarea,
    IonDatetime,
    IonImg,
} from '@ionic/vue';
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import axios from 'axios';
import { useGeographic } from 'ol/proj'

import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { useRoute } from 'vue-router';
export default defineComponent({
    name: 'EditOfferPage',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        NavBarComponent,
        IonButton,
        IonModal,
        IonGrid,
        IonRow,
        IonCol, 
        FooterComponent,
        IonCard,
        IonCardContent,
        IonItem,
        IonSelect,
        IonSelectOption,
        IonInput,
        IonLabel,
        IonTextarea,
        IonDatetime,
        IonImg,

    },
    data() {
        return {
            map:null,
            markerLayer: null,
            markerSource: null,
            selectedLocation:{lat:null, lng:null},
            center: [22.9999, 62.9999],
            productName: '',
            description: '',
            price: 0,
            productImage: null,
            image64: '',
            imageName: '',
            type: null,
            quantity: 0,
            companies: [],
            companyID: null,
            unit: null,
            logisticType: null,
            visibility: null,
            materials: [],
            material:"",
            imageChanged: false,
            oldImage: null,
            oldImageId: null,
            locationID: null,
            offerID: null,
            locationChanged: false,
            oldLocation: null,
            startDate:new Date().toISOString(),
            endDate:new Date().toISOString(),
            selectedMaterialId: null,
            selectedMaterialName: '',
            markerStyle: new Style({
                            image: new Circle({
                                radius: 8,
                                fill: new Fill({ color: 'green' }),
                                stroke: new Stroke({ color: '#fff', width: 2 })
                            })
                        })
        }
    },
    setup() {
        const route = useRoute();
        const productID = route.params.id;
        const mapElement = ref(null)
        useGeographic();
        
        return {
            productID,mapElement
        }
    },
    mounted() {
        this.onAddOffer();
        this.getOfferDetails();
        this.getUserCompanies();
        this.getMaterials();
        this.markerSource = new VectorSource();
        this.markerLayer = new VectorLayer({
            source: this.markerSource,
            name: 'markerLayer'
        });
    },
    methods: {
        getOfferDetails(){
            //this.map = this.$refs.regionMap.map;
            axios.post(this.$api_add + '/getoffersbyid',{id: this.productID}).then(response => {
                
                var offer = response.data.message; 
                console.log(offer);
                this.productName = offer.name;
                this.description = offer.description;
                this.price = offer.price;
                this.productImage = offer.image;
                this.imageName = offer.imageName;
                //this.image64 = offer.fileLink;
                this.type = offer.type + "";
                this.quantity = offer.amount;
                this.companyID = offer.companyID;
                this.unit = offer.unit + "";
                this.logisticType = offer.cargoType + "";
                this.visibility = offer.visibility + "";
                this.material = offer.materialID;
                this.startDate = offer.startDate;
                this.endDate = offer.endDate;
                this.offerID = offer.id;
                if (offer.Files != null && offer.Files.length > 0){
                    console.log(offer.fileLink);
                    this.image64 = offer.fileLink;
                    this.oldImage = offer.id + "_" + offer.Files[0].name;//offer.Files[0].data;
                    this.oldImageId = offer.Files[0].id;
                }
                if (offer.Locations != null && offer.Locations.length > 0){
                    this.oldLocation = true;
                    this.selectedLocation = {
                        lat: offer.Locations[0].latitude,
                        lng: offer.Locations[0].longitude
                    };
                    this.locationID = offer.Locations[0].id;
                    if (!this.map.getLayers().getArray().includes(this.markerLayer)) {
                        this.map.addLayer(this.markerLayer);
                }  
                else{
                    this.oldLocation = false;
                }
                this.markerSource.clear();
                const marker = new Feature({
                    geometry: new Point([offer.Locations[0].longitude, offer.Locations[0].latitude]),
                });
                marker.setStyle(this.markerStyle);
                this.markerSource.addFeature(marker);
                }
                
                
            });
        
        },
        updateTimeZoneStart(event) {
        const date = new Date(event.target.value);
        const timezoneOffset = -date.getTimezoneOffset(); // Get the timezone offset in minutes
        const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
        const offsetMinutes = Math.abs(timezoneOffset) % 60;
        const offsetSign = timezoneOffset >= 0 ? '+' : '-';
        const timezoneString = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
        this.startDate = event.target.value+timezoneString;
    },
    getUserCompanies(){
        if (localStorage.getItem('token') != null) {
            var url = this.$api_add + "/getusercompanies";
            axios.post(url, [], { headers: { 'authorization': localStorage.getItem('token') }, withCredentials: false }).then((response) => {
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    this.companies = response.data.message;
                    localStorage.setItem('current_company', response.data.message[0].id);
                }
            });
        }
    },
    updateTimeZoneEnd(event) {
        const date = new Date(event.target.value);
        const timezoneOffset = -date.getTimezoneOffset(); // Get the timezone offset in minutes
        const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
        const offsetMinutes = Math.abs(timezoneOffset) % 60;
        const offsetSign = timezoneOffset >= 0 ? '+' : '-';
        const timezoneString = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
        this.endDate = event.target.value+timezoneString;
    },
        materialSelected(event) {
            const selectedMaterial = this.materials.find(mater => mater.id === event.target.value);
            if (selectedMaterial) {
                this.selectedMaterialName = selectedMaterial.name;
            }
        },
        saveProduct() {
            var url = this.$api_add + "/updateoffer";
            axios.post(url,{"oldLocation":this.oldLocation,"locationChanged":this.locationChanged,"id":this.offerID,"location":this.selectedLocation,"locationID": this.locationID,"image64":this.image64,"imageChanged":this.imageChanged,"oldImage":this.oldImage,"oldImageId":this.oldImageId,"imageName":this.imageName,"type":this.type, "materialID":this.material,"companyID":this.companyID,"locationID":"1", "unit":this.unit, "price":this.price,"amount":this.quantity, "startDate":this.startDate, "endDate": this.endDate, "visibility":this.visibility,"cargoType":this.logisticType,"description":this.description},{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.result == "ok" && response.data.message != null && response.data.message != undefined){
                    this.$router.push('/companyoffers/'+this.companyID, {});
                }
            });
        },
        getMaterials(){
            var url = this.$api_add + "/getmaterials";
            axios.post(url,{"locality":this.$i18n.locale},{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
               
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    this.materials = response.data.message;
                    
                }
            });
        },
        processImg(img) {
            let rawImg;
            const file = document.querySelector('input[type=file]').files[0];
            let reader = new FileReader();
            
            reader.onloadend = () => {
                rawImg = reader.result;
                this.image64 = rawImg;
                this.imageName = file.name;
            };
            this.image64 = reader.readAsDataURL(file);
            this.imageChanged = true;
            
        },
        getLocale(){
            
            if(this.$i18n.locale === 'en'){
                return 'en-GB';
            } else if(this.$i18n.locale === 'fi'){
                return 'fi-FI';
            } else if(this.$i18n.locale === 'sv'){
                return 'sv-SE';
            }
        },
        onAddOffer(){
            this.map = this.$refs.regionMap.map;

            if (this.map) {
                
               this.map.on('singleclick', (event) =>{
                    if (!this.map.getLayers().getArray().includes(this.markerLayer)) {
                        this.map.addLayer(this.markerLayer);
                    }  
                    this.markerSource.clear();

                    const coordinate = event.coordinate; // Get the clicked coordinate
                    if (coordinate){
                        this.selectedLocation = {
                            lat: coordinate[1],
                            lng: coordinate[0]
                        };
                        const marker = new Feature({
                            geometry: new Point(coordinate),
                        });
                        marker.setStyle(this.markerStyle);
                        this.markerSource.addFeature(marker);
                        this.locationChanged = true;
                    }
                    
               });
            } else {
                console.error('Map reference is not available');
            }
            
        }
    }
});
    
</script>