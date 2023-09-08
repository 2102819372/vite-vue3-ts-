<template>
  <div
    ref="chartRef"
    style="height: 500px; width: 500px"
    class="first-container"
  ></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref, Ref, onBeforeUnmount } from 'vue';
const option = {
  tooltip: {},
  legend: {},
  xAxis: {
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {},
  series: [
    {
      name: 'Sale',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20, 4],
    },
  ],
};
const chartRef: Ref = ref(null);
onMounted(() => {
  window.addEventListener('resize', () => {
    chart.resize();
  });
  const mycharts = echarts.init(chartRef.value);
  option && mycharts.setOption(option);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    chart.resize();
    console.log('remove');
  });
});
</script>
<style scoped></style>
