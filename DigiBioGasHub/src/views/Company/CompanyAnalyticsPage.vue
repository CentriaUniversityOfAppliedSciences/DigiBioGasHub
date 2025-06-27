<template>
    <ion-page>
        <ion-content>
            <NavBarComponent />
            <div class="col-sm-6">
                <QueryBuilder :cubeApi="cubejsApi" :query="lineQuery">
                    
                    <template v-slot="{ loading, resultSet }">
                        <div v-if="resultSet">
                            <Chart
                                title="Company contracts"
                                type="bar"
                                :loading="loading"
                                :resultSet="resultSet"
                            />
                        </div>
                    </template>
                    
                </QueryBuilder>
            </div>
        </ion-content>
        <FooterComponent />
    </ion-page>
</template>
<script>
import { defineComponent } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
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
        Chart
    },
    data() {
        const cubejsApi = cubejs(localStorage.getItem("token"),{ apiUrl: this.$cube_add + '/cubejs-api/v1' });
        return {
            cubejsApi,
            lineQuery:{
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
            }
        };
    },
    mounted() {

    },
    methods: {
        
    }
});


</script>