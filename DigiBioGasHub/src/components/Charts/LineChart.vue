 <template>
  <apexchart width="500" type="line" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
import moment from "moment";
import VueApexCharts from "vue3-apexcharts";
export default {
  name: "LineChart",
  components: {
    apexchart: VueApexCharts
  },
  props: {
    values: Array,
    metrics: Array
  },
  methods: {
    dateFormatter: function(value) {
      return moment(value).format("MM.YYYY");
    }
  },
  mounted() {
  },
  data() {
    
    return {
      
      series:this.values,
      chartOptions:{
        chart:{
          type:'line',
          height: 350,
          zoom: {
            enabled: false
          }
        },
        xaxis:{
          categories: this.metrics
        }
      },
      colors: [
        "#7DB3FF",
        "#49457B",
        "#FF7C78",
        "#FED3D0",
        "#6F76D9",
        "#9ADFB4",
        "#2E7987"
      ]
    };
  }
};
</script>

<style scoped>
</style>