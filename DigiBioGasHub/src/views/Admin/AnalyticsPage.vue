<template>
    <ion-page>
        <ion-content>
            <NavBarComponent />
            <ion-row>
                <ion-col size="3">
                <QueryBuilder :cubeApi="cubejsApi" :query="userQuery">
                    <template v-slot="{ loading, resultSet }">
                        <div v-if="resultSet">
                            <Chart
                                title="Users"
                                type="bar"
                                :loading="loading"
                                :resultSet="resultSet"
                            />
                        </div>
                    </template>   
                </QueryBuilder>
            </ion-col>
            <ion-col size="3">
                <QueryBuilder :cubeApi="cubejsApi" :query="offersQuery">
                    <template v-slot="{ loading, resultSet }">
                        <div v-if="resultSet">
                            <Chart
                                title="Offers"
                                type="bar"
                                :loading="loading"
                                :resultSet="resultSet"
                            />
                        </div>
                    </template>   
                </QueryBuilder>
            </ion-col>
            <ion-col size="3">
                <QueryBuilder :cubeApi="cubejsApi" :query="companiesQuery">
                    <template v-slot="{ loading, resultSet }">
                        <div v-if="resultSet">
                            <Chart
                                title="Companies"
                                type="bar"
                                :loading="loading"
                                :resultSet="resultSet"
                            />
                        </div>
                    </template>   
                </QueryBuilder>
            </ion-col>
            <ion-col size="3">
                <QueryBuilder :cubeApi="cubejsApi" :query="contractsQuery">
                    <template v-slot="{ loading, resultSet }">
                        <div v-if="resultSet">
                            <Chart
                                title="Contracts"
                                type="line"
                                :loading="loading"
                                :resultSet="resultSet"
                            />
                        </div>
                    </template>   
                </QueryBuilder>
            </ion-col>
        </ion-row>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue';
import { IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/vue';
import cubejs from '@cubejs-client/core';
import { QueryBuilder } from "@cubejs-client/vue3";
import Chart from '@/components/Charts/Chart.vue';
import FooterComponent from '../../components/FooterComponent.vue';
import NavBarComponent from '../../components/NavBarComponent.vue';
export default defineComponent({
    name: 'AnalyticsPage',
    components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        FooterComponent,
        NavBarComponent,
        QueryBuilder,
        Chart,
        IonRow,
        IonCol
    },
    data() {
        const cubejsApi = cubejs(localStorage.getItem("token"),{ apiUrl: this.$cube_add+ '/cubejs-api/v1' });
        return {
            cubejsApi,
            userQuery:{
                "timeDimensions": 
                [
                    {
                        "dimension": "users.createdat",
                        "granularity": "month"
                    }
                ],
                "dimensions": [],
                "filters": [],
                "measures": [
                    "users.count"
                ],
                "order": {}
            },
            offersQuery:{
                "timeDimensions": [
                    {
                    "dimension": "offers.createdat",
                    "granularity": "month"
                    }
                ],
                "dimensions": [],
                "filters": [],
                "measures": [
                    "offers.count"
                ],
                "order": {}
            },
            companiesQuery:{
                "timeDimensions": [
                    {
                    "dimension": "companies.createdat",
                    "granularity": "month"
                    }
                ],
                "dimensions": [],
                "filters": [],
                "measures": [
                    "companies.count"
                ],
                "order": {}
            },
            contractsQuery:{
                "timeDimensions": [
                    {
                    "dimension": "contracts.createdat",
                    "granularity": "month"
                    }
                ],
                "dimensions": [],
                "filters": [],
                "measures": [
                    "contracts.count"
                ],
                "order": {}
            }
        };
    },
    mounted() {
        
        
    },
    methods: {
        
    }
});

</script>