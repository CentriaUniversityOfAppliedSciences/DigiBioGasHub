<template>
    <ion-page>
        <NavBarComponent />

        <ion-toolbar>
            <ion-title>{{ $t('company.users') }}</ion-title>
        </ion-toolbar>

        <ion-content>
            <ion-grid>
                <ion-row v-for="user in users">
                    <ion-col>
                        <CompanyUserComponent @userUpdated="refreshList" @userRemoved="refreshList" :user="user.User"
                            :userData="user" />
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>

<script>
import { defineComponent } from 'vue';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonGrid, IonRow, IonCol } from '@ionic/vue';
import NavBarComponent from '../../components/NavBarComponent.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import axios from 'axios';
import CompanyUserComponent from '../../components/CompanyUserComponent.vue';


export default defineComponent({
    name: 'CompanyUsersPage',
    components: {
        IonPage,
        IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        NavBarComponent,
        FooterComponent,
        IonGrid,
        IonRow,
        IonCol,
        CompanyUserComponent
    },
    data() {
        return {
            companyID: null,
            users: []
        };
    },
    methods: {
        getCompanyUsers() {
            axios.post(this.$api_add + '/company/getusers', { id: this.companyID }).then(response => {
                this.users = response.data.message;
            });
        },
        refreshList() {
            this.getCompanyUsers();
        }
    },
    mounted() {
        this.companyID = this.$route.params.id;
        this.getCompanyUsers();
    }
});

</script>
