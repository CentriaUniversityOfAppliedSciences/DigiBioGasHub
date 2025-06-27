 <template>
  <apexchart width="500" type="bar" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
import moment from "moment";
import VueApexCharts from "vue3-apexcharts";
export default {
  name: "BarChart",
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
          type:'bar',
          height: 350,
          zoom: {
            enabled: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            borderRadiusApplication: 'end',
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