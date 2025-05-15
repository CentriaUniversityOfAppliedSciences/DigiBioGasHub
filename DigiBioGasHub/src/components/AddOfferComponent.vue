<template>
    
            <ion-modal trigger="addOffer" @willPresent="onAddOffer">
            <ion-header>
                <ion-toolbar>
                    
                    <ion-buttons slot="end">
                        <ion-button @click="modalController.dismiss()">{{ $t('general.close') }}</ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-header>
            <ion-card style="height: 100%;">
            <ion-content>
                <ion-card-content>
                <ion-item>
                    <ion-select required v-model="companyID" :label="$t('menu.company')" :placeholder="$t('product.chooseCompany')">
                        <ion-select-option v-for="comp in companies" :key="comp.name" :value="comp.id">{{ comp.name }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <img :src="image64"/>
                    <ion-input :label="$t('product.image')" labelPlacement="floating" type="file" @IonChange="processImg"></ion-input>
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
                    <ion-input required :label="$t('product.price.offer')" labelPlacement="floating" type="number" v-model="price"></ion-input>
                </ion-item>
                <ion-item v-if="type === 'demand'">
                    <ion-input required :label="$t('product.price.demand')" labelPlacement="floating" type="number" v-model="price"></ion-input>
                </ion-item>
                <ion-item v-if="type === 'auction'">
                    <ion-input required :label="$t('product.price.auction')" labelPlacement="floating" type="number" v-model="price"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input :label="$t('product.quantity')" labelPlacement="floating" type="number" v-model="quantity"></ion-input>
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
                <ion-button expand="full" @click="addProduct">{{ $t('product.submit') }}</ion-button>
            </ion-card-content>
            </ion-content>
        </ion-card>
    </ion-modal>
</template>

<script>
import {  IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonSelectOption, IonSelect, IonDatetime, IonCard, IonContent, IonTitle, IonToolbar, IonButtons, IonHeader, modalController,IonCardContent, IonModal } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { toLonLat } from 'ol/proj';
import { useGeographic } from 'ol/proj'
import Layer from 'ol/layer/Layer';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { colorPalette } from 'ionicons/icons';
export default defineComponent({
    name: 'AddOfferComponent',
    components: {
        IonItem,
        IonLabel,
        IonInput,
        IonTextarea,
        IonButton,
        IonSelectOption,
        IonSelect,
        IonDatetime,
        IonCard,
        IonContent,
        IonTitle,
        IonToolbar,
        IonButtons,
        IonHeader,
        IonCardContent,
        IonModal
    },
    emits: ['getOffers'],
    setup() {
        const mapElement = ref(null)
        useGeographic();
        return {
            modalController, mapElement
        };
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
            price: null,
            productImage: null,
            image64: '',
            imageName: '',
            type: null,
            quantity: null,
            companies: [],
            companyID: null,
            unit: '',
            logisticType: null,
            visibility: 1,
            materials: [],
            material:"",
            startDate:null,
            endDate:null,
            selectedMaterialId: null,
            selectedMaterialName: '',
            markerStyle: new Style({
                            image: new Circle({
                                radius: 8,
                                fill: new Fill({ color: 'green' }),
                                stroke: new Stroke({ color: '#fff', width: 2 })
                            })
                        })
        };
    },
    methods: {
        updateTimeZoneStart(event) {
            console.log("startDate:", event.target.value);
        const date = new Date(event.target.value);
        const timezoneOffset = -date.getTimezoneOffset(); // Get the timezone offset in minutes
        const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
        const offsetMinutes = Math.abs(timezoneOffset) % 60;
        const offsetSign = timezoneOffset >= 0 ? '+' : '-';
        const timezoneString = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
        //this.startDate = `${date.toISOString().split('Z')[0]}${timezoneString}`;
        this.startDate = event.target.value+timezoneString;
        console.log("startDate with timezone:", this.startDate);
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
        console.log("endDate:", event.target.value);
        const date = new Date(event.target.value);
        const timezoneOffset = -date.getTimezoneOffset(); // Get the timezone offset in minutes
        const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
        const offsetMinutes = Math.abs(timezoneOffset) % 60;
        const offsetSign = timezoneOffset >= 0 ? '+' : '-';
        const timezoneString = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutes).padStart(2, '0')}`;
        //this.endDate = `${date.toISOString().split('Z')[0]}${timezoneString}`;
        this.endDate = event.target.value+timezoneString;
        console.log("endDate:", event.target.value+timezoneString);
        //console.log("endDate with timezone:", this.endDate);
    },
        materialSelected(event) {
            const selectedMaterial = this.materials.find(mater => mater.id === event.target.value);
            if (selectedMaterial) {
                this.selectedMaterialName = selectedMaterial.name;
            }
        },
        addProduct() {
            // Logic to add the product
            
            var url = this.$api_add + "/createoffer";
            axios.post(url,{"location":this.selectedLocation,"image64":this.image64,"imageName":this.imageName,"type":this.type, "materialID":this.material,"companyID":this.companyID,"locationID":"1", "unit":this.unit, "price":this.price,"amount":this.quantity, "startDate":this.startDate, "endDate": this.endDate, "visibility":this.visibility,"cargoType":this.logisticType,"description":this.description},{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                console.log(response.data);
                if (response.data.result == "ok" && response.data.message != null && response.data.message != undefined){
                    //this.materials = response.data.message;
                    console.log("should dismiss modal");
                    this.modalController.dismiss();
                    this.$emit('getOffers');
                }
            });
        },
        getMaterials(){
            console.log(this.$api_add);
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
                console.log('Image:', rawImg);
                this.image64 = rawImg;
                this.imageName = file.name;
            };
            this.image64 = reader.readAsDataURL(file);
            
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
                    console.log(this.markerSource.getFeatures());   
                    this.markerSource.clear();
                    console.log(this.markerSource.getFeatures());

                    
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
                        console.log('Selected Location (transformed):', this.selectedLocation);
                    }
                    
               });
            } else {
                console.error('Map reference is not available');
            }
            
        }
    },
    mounted(){
        this.markerSource = new VectorSource();
        this.markerLayer = new VectorLayer({
            source: this.markerSource,
            name: 'markerLayer'
        });
        this.getMaterials();
        this.getUserCompanies();
    }
});
</script>

<style scoped>
/* Add your styles here */
</style>