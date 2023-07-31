<script setup>
defineProps({
  chartType: {
    type: String,
    required: true
  },
  chartOptions: {
    type: Object,
    required: true
  },
  chartSeries: {
    type: Array,
    required: true
  },
});
</script>

<template>
  <apexchart :type=chartType :options=chartOptions :series=chartSeries></apexchart>
</template>

<style lang="scss" scoped>

</style>
