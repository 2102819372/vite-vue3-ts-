<template>
  <div
    ref="chartRef"
    style="height: 500px; width: 100vw; background-color: #ddd"
    class="first-container"
  ></div>
</template>
<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, ref, Ref, onBeforeUnmount } from 'vue';
const option = {
  tooltip: {
    formatter: ' {c}<br/>  占比：{d}%',
  },
  legend: {},
  xAxis: {
    axisLine: {
      show: false, // 这行将隐藏x轴
    },
    axisTick: {
      show: false, // 这行将隐藏x轴刻度线
    },
  },
  yAxis: {
    axisLine: {
      show: false, // 这行将隐藏Y轴
    },
    axisTick: {
      show: false, // 这行将隐藏Y轴刻度线
    },
  },
  series: [
    {
      name: '系列',
      type: 'pie',
      data: [5, 20, 36, 10, 10, 20, 4].sort((pre, nxt) => {
        return nxt - pre;
      }),
      radius: ['55%', '80%'],
      label: {
        show: false,
        position: 'inner',
      },
      itemStyle: {
        borderWidth: 10,
        borderColor: '#2b4acb',
      },
    },
  ],
};
const chartRef: Ref = ref(null);

const resize = onMounted(() => {
  const mycharts = echarts.init(chartRef.value);
  option && mycharts.setOption(option);
  window.addEventListener('resize', () => {
    mycharts?.resize();
  });
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    mycharts?.resize();
  });
});
</script>
<style scoped></style>
