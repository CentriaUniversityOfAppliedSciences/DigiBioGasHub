<template>
    <ion-page>
        <ion-content>
            <NavBarComponent />
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-header>
                            <ion-toolbar>
                                <ion-title>{{ $t("company.reports") }}</ion-title>
                            </ion-toolbar>
                        </ion-header>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="3">
                        <QueryBuilder :cubeApi="cubejsApi" :query="contractsQuery">
                    
                            <template v-slot="{ loading, resultSet }">
                                <div v-if="resultSet">
                                    <Chart
                                        :title="$t('company.agreements')"
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
                                        :title="$t('company.offers')"
                                        type="bar"
                                        :loading="loading"
                                        :resultSet="resultSet"
                                    />
                                </div>
                            </template>
                            
                        </QueryBuilder>
                    </ion-col>
                    <ion-col size="3">
                        <QueryBuilder :cubeApi="cubejsApi" :query="boughtQuery">
                    
                            <template v-slot="{ loading, resultSet }">
                                <div v-if="resultSet">
                                    <Chart
                                        :title="$t('company.sales')"
                                        type="bar"
                                        :loading="loading"
                                        :resultSet="resultSet"
                                    />
                                </div>
                            </template>
                            
                        </QueryBuilder>
                    </ion-col>
                </ion-row>
            </ion-grid>
            
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue';
import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/vue';
import FooterComponent from '@/components/FooterComponent.vue';
import NavBarComponent from '@/components/NavBarComponent.vue';
import cubejs from '@cubejs-client/core';
import { QueryBuilder } from "@cubejs-client/vue3";
import Chart from '@/components/Charts/Chart.vue';


export default defineComponent({
    name: 'CompanyAnalyticsPage',
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
        IonGrid,
        IonRow,
        IonCol
    },
    data() {
        const cubejsApi = cubejs(localStorage.getItem("token"),{ apiUrl: this.$cube_add + '/cubejs-api/v1' });
        return {
            cubejsApi,
            contractsQuery:{
                "timeDimensions":
                [
                    {
                        "dimension":"contracts.timestamp",
                        "granularity":"month"
                    }
                ],
                "dimensions":
                [
                    "companies.name",
                    "materials.name"
                ],
                "measures":["contracts.count"]
            },
            offersQuery:{
                
                "dimensions": [
                    "companies.name"
                ],
                "measures": [
                    "offers.count"
                ],
                "timeDimensions": [
                    {
                    "dimension": "offers.createdat",
                    "granularity": "month"
                    }
                ],
                "filters": [
                    
                ],
                "order": {}
                
            },
            boughtQuery:{
                
                
                "measures": [
                "contracts.total"
                    ],
                    "dimensions": [
                        "companies.name"
                    ],
                    "timeDimensions": [
                        {
                        "dimension": "contracts.createdat",
                        "granularity": "month"
                        }
                    ]
                
                
            }
        };
    },
    mounted() {

    },
    methods: {
        
    }
});


</script>