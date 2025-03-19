<template>
    
            <ion-modal trigger="addOffer">
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
                    <ion-datetime :locale="getLocale()" :first-day-of-week="1" hour-cycle="h24" v-model="startDate" >
                        <span slot="title">{{ $t('product.productDetails.offerValidFrom') }}</span>
                        <span slot="time-label">{{ $t('product.time') }}</span>
                    </ion-datetime>
                </ion-item>
                <ion-item>
                    <ion-datetime :locale="getLocale()" :first-day-of-week="1" hour-cycle="h24" v-model="endDate" >
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
                <ion-button expand="full" @click="addProduct">{{ $t('product.submit') }}</ion-button>
            </ion-card-content>
            </ion-content>
        </ion-card>
    </ion-modal>
</template>

<script>
import {  IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonSelectOption, IonSelect, IonDatetime, IonCard, IonContent, IonTitle, IonToolbar, IonButtons, IonHeader, modalController,IonCardContent, IonModal } from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
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
    setup() {
        return {
            modalController,
        };
    },
    data() {
        return {
            productName: '',
            description: '',
            price: null,
            productImage: null,
            image64: '',
            type: null,
            quantity: null,
            unit: '',
            logisticType: null,
            visibility: null,
            materials: [],
            material:"",
            startDate:null,
            endDate:null,
            selectedMaterialId: null,
            selectedMaterialName: '',
        };
    },
    methods: {
        materialSelected(event) {
            const selectedMaterial = this.materials.find(mater => mater.id === event.target.value);
            if (selectedMaterial) {
                this.selectedMaterialName = selectedMaterial.name;
            }
        },
        addProduct() {
            // Logic to add the product
            console.log('Product added:', {
                name: this.productName,
                description: this.description,
                price: this.price,
                startDate: this.startDate,
                endDate: this.endDate,  
            });
            var url = "http://localhost:28765/createoffer";
            axios.post(url,{"type":this.type, "materialID":this.material,"companyID":localStorage.getItem("current_company"),"locationID":"1", "unit":this.unit, "price":this.price,"amount":this.quantity, "startDate":this.startDate, "endDate": this.endDate, "visibility":this.visibility,"cargoType":this.logisticType,"description":this.description},{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                
                if (response.data.type="result" && response.data.result == "ok" && response.data.message.length > 0){
                    this.materials = response.data.message;
                    this.modalController.dismiss();
                }
            });
        },
        getMaterials(){
            var url = "http://localhost:28765/getmaterials";
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
        }
    },
    mounted(){
        this.getMaterials();
    }
});
</script>

<style scoped>
/* Add your styles here */
</style>