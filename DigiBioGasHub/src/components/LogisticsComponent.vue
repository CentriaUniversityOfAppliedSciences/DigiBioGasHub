<template>
            <ion-card class="terminal-card">
                
                <ion-card-header>

                        <ion-item>
                            <ion-card-title>{{ terminal.companyName }}</ion-card-title>
                        </ion-item>
                </ion-card-header>
                <ion-card-content>
                    <ion-list>
                        <ion-item>
                            <ion-input v-model="terminal.address" type="text" readonly></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input v-model="terminal.city" type="text" readonly></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-input v-model="terminal.zipcode" type="text" readonly></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label style="margin-right: 12px;">{{ $t('company.logistics.haulType') }}:</ion-label>
                            <ion-input type="text" v-model="haulTypes" readonly></ion-input>
                        </ion-item>
                        <ion-item>
                            <ion-label style="margin-right: 12px;">{{ $t('product.visibility.info') }}</ion-label>
                            <ion-input type="text" v-model="visibility" readonly></ion-input>
                           
                        </ion-item>
                        <ion-item>
                            <ion-button v-if="companyData.userLevel === 23 || userLevel === 99" @click="confirmDelete()" id="deleteCompany" color="danger" >{{$t('menu.delete')}}</ion-button>
                        </ion-item>
                
                </ion-list>
                </ion-card-content>
                
            </ion-card>


</template>

<script>
import { IonPage, IonContent, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonList, alertController } from '@ionic/vue';
import { terminal } from 'ionicons/icons';
import { defineComponent } from 'vue';
import axios from 'axios';
import { jwtDecode } from "../router";

export default defineComponent({
    name: 'LogisticsComponent',
    components: {
        IonPage,
        IonContent,
        IonToolbar,
        IonTitle,
        IonItem,
        IonLabel,
        IonInput,
        IonSelect,
        IonSelectOption,
        IonButton,
        IonCard,
        IonCardContent,
        IonCardHeader,
        IonCardTitle,
        IonList,
        alertController
        
    },
    setup() {
        const token = localStorage.getItem('token');
        const decodedToken = token ? jwtDecode(token) : null;
        const userLevel = decodedToken?.userlevel || null;
        return {
            userLevel
        };
    },
    props: {
        terminal: {
            type: Object,
            required: true
        },
        companyData: {
            type: Object,
            required: true
        }
    },
    emits: ['terminalDeleted'],
    data() {
        return {
            haulTypes: "",
            visibility:"",
            
            alertButtons: [
                {
                    text: this.$t('general.cancel'),
                    role: 'cancel',
                    cssClass: 'secondary',
                },
                {
                    text: this.$t('general.yes'),
                    handler: () => {
                        this.deleteTerminal();
                    },
                },
            ],
            alertController: alertController
        };
    },
    methods: {
        getHaulTypes() {
            var ans = "";
            var types = this.terminal.haulType;
            for (var i = 0; i < types.length; i++) {
                ans += this.$t(`material.type.${types[i]}`) + " ";
            }
            this.haulTypes = ans;
        },
        getVisibility() {
            if (this.terminal.visibility === 0) {
                this.visibility = this.$t('product.visibility.private');
            } else if (this.terminal.visibility === 1) {
                this.visibility = this.$t('product.visibility.public');
            } 
        },
         confirmDelete() {
            this.alertController
            .create({
                header: this.$t('company.logistics.confirmDeleteTerminal'),
                buttons: [
                    {
                        text: this.$t('general.cancel'),
                        role: 'cancel',
                        cssClass: 'secondary',
                    },
                    {
                        text: this.$t('general.yes'),
                        handler: () => {
                            this.deleteTerminal();
                        },
                    },
                ],
            })
            .then(alert => alert.present());
        },
        deleteTerminal(){
            var url = this.$api_add + "/company/deleteterminal";
            axios.post(url,
            {
                terminalID: this.terminal.id,
                companyID: this.terminal.companyID,
            },{
                headers: { 'authorization': localStorage.getItem('token') },
                withCredentials: false
            }).then((response) => {
                if (response.data.type == "result" && response.data.result == "ok") {
                    this.$emit('terminalDeleted', this.terminal.id);
                }
            });
        },
    },
    mounted() {
        this.getHaulTypes();
        this.getVisibility();
    }
});

</script>
<style scoped>
.terminal-card {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}
</style>