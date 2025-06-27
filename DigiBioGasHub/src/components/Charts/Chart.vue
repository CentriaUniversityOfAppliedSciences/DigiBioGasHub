<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <div class="card-text">
        <div class="d-flex justify-content-center text-dark">
          <div class="spinner-border" role="status" v-if="loading">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <h1 v-if="!loading && type === 'number'" height="300">{{ parseFloat(values[0][metrics[0]]).toLocaleString() }}</h1>
        <BarChart v-if="!loading && type === 'bar'" :values="values" :metrics="metrics"/>
        <LineChart v-if="!loading && type === 'line'" :values="values" :metrics="metrics"/>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import LineChart from "./LineChart.vue";
import BarChart from "./BarChart.vue";

export default {
  components: {
    LineChart,
    BarChart
  },
  name: "Chart",
  props: {
    resultSet: Object,
    loading: Boolean,
    title: String,
    type: String
  },
  methods: {
    dateFormatter: function(value) {
      return moment(value).format("MM/YYYY");
    }
  },
  mounted() {
    console.log("Chart loading init", this.loading);
  },
  watch:{
    loading: function(newValue) {
      console.log("Chart loading changed", newValue);
    }
  },
  computed: {
    values: function() {
      if (this.loading) return [];
      var series = [];
        this.resultSet.series().map(a => {
          var y = [];
          var s = a.series;
          for (var i = 0; i < s.length; i++) {
            y.push(s[i].value);
          }
          series.push({
            name: a.title,
            data: y
          });
        });
        return series;
    },
    metrics: function() {
      if (this.loading) return [""];
      var xAxis = [];
        this.resultSet.series().map(a => {
          var x = [];
          var s = a.series;
          for (var i = 0; i < s.length; i++) {
            x.push(this.dateFormatter(s[i].x));
          }
          
          xAxis = x;
        });
        return xAxis;
    }
  },
  data() {
    return {
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