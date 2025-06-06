<template>
    <ion-page>
        <ion-content>
            <NavBarComponent />
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-label>{{ $t("settings.filter") }}</ion-label>
                    </ion-col>
                </ion-row>  
                <ion-row>
                    <ion-col size="3">
                        <ion-checkbox v-model="settings.filter.feedstock">{{ $t("settings.feedstock") }}</ion-checkbox>
                    </ion-col>                        
                    <ion-col size="3">
                        <ion-checkbox v-model="settings.filter.biogas">{{ $t("settings.biogas") }}</ion-checkbox>
                    </ion-col>
                    <ion-col size="3">
                        <ion-checkbox v-model="settings.filter.logistics">{{ $t("settings.logistics") }}</ion-checkbox>
                    </ion-col>
                    <ion-col size="3">
                        <ion-checkbox v-model="settings.filter.digestate">{{ $t("settings.digestate") }}</ion-checkbox>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <ion-label>{{ $t("settings.chat") }}</ion-label>
                    </ion-col>
                
                </ion-row>
                <ion-row>
                    <ion-col size="3">
                        <ion-checkbox v-model="settings.chat.chatVisibility">{{ $t("settings.chatVisibility") }}</ion-checkbox>
                    </ion-col>                        
                    
                </ion-row>
                <ion-row>
                    <ion-col size="12">
                        <ion-button @click="saveSettings">{{ $t("menu.save") }}</ion-button>
                    </ion-col>
                </ion-row>
                
                    
                
            </ion-grid>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue'
import { IonPage, IonContent, IonList, IonItem, IonLabel, IonCheckbox, IonGrid, IonRow, IonCol, IonButton } from '@ionic/vue'
import NavBarComponent from '../components/NavBarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import axios from 'axios';

export default defineComponent({
    name: 'SettingsPage',
    components: { IonPage, IonContent, NavBarComponent, FooterComponent, IonList, IonItem, IonLabel, IonCheckbox, IonGrid, IonRow, IonCol, IonButton },
    data() {
        return {
            settings: {
                filter:{
                    feedstock: false,
                    biogas: false,
                    logistics: false,
                    digestate: false,
                },
                chat:{
                    chatVisibility: false
                }
            }
        }
    },
    mounted() {
        this.getSettings();
    },
    methods: {
        getSettings() {
            var url = this.$api_add + "/getsettings";
            axios.post(url,{}, {headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.result == "ok" && response.data.message != null && response.data.message != undefined){
                    var data = response.data.message;

                    if (data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                            var key = data[i].key;
                            var value = data[i].value;
                            this.settings[key] = value;
                        }
                    }
                }
            });
        },
        saveSettings() {

            
            var url = this.$api_add + "/updatesettings";

            axios.post(url,{"settings":this.settings},{headers:{ 'authorization':localStorage.getItem('token') }, withCredentials: false}).then((response) => {
                if (response.data.result == "ok" && response.data.message != null && response.data.message != undefined){

                    var data = response.data.message;
                    if (data.length > 0) {
                        for (let i = 0; i < data.length; i++) {
                            var key = data[i].key;
                            var value = data[i].value;
                            this.settings[key] = value;
                        }
                    }
                }
            });
        }
    }

});



</script>