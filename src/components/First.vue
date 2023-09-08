<template>
  <div
    id="chart-box"
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
    formatter: ' {b}<br/>{c}占比：{d}%',
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
  legend: {
    orient: 'vertical',
    left: 30,
    top: 0,
    bottom: 'center',
    textStyle: {
      fontSize: 12,
    },
    icon: 'circle',
    itemStyle: {
      borderWidth: 0,
    },
  },
  series: [
    {
      name: '系列',
      type: 'pie',
      data: [
        {
          name: 'M1',
          value: 250 * 40,
        },
        {
          name: 'M2',
          value: 231 * 20,
        },
        {
          name: 'M3',
          value: 160 * 21,
        },
        {
          name: 'M4',
          value: 40 * 24,
        },
        {
          name: 'M5',
          value: 63 * 25,
        },
        {
          name: 'M6',
          value: 85 * 21,
        },
        {
          name: 'M7',
          value: 26 * 27,
        },
        {
          name: 'M8',
          value: 154 * 29,
        },
      ].sort((pre, nxt) => {
        return nxt.value - pre.value;
      }),
      radius: ['25%', '40%'],
      center: ['30%', '20%'],
      label: {
        show: false,
        position: 'inner',
      },
      itemStyle: {
        borderWidth: 10,
        borderColor: '#2b4acb',
      },
    },
    {
      type: 'gauge',
      radius: '50%',
      center: ['30%', '80%'],
      max: 1000,
      progress: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        offsetCenter: [0, '75%'],
        // color: "rgba(255, 255, 255, 0.9)",
        fontSize: 20,
        formatter: function (value) {
          return `${value.toFixed(1)}`;
        },
      },
      axisLine: {
        lineStyle: {
          width: 16,
          color: [
            [0.31, '#FF8223'],
            [0.72, '#306FFF'],
            [1, '#f40'],
          ],
        },
        roundCap: false,
      },
      data: [
        {
          value: 350,
          name: '实时负荷 KW',
          title: {
            offsetCenter: [0, '50%'],
            // color: "rgba(255, 255, 255, 0.7)",
          },
        },
      ],
      anchor: {
        show: true,
        showAbove: true,
        size: 25,
        itemStyle: {
          borderColor: '#f54e4e',
          borderWidth: 8,
        },
      },
      pointer: {
        icon: 'roundRect',
        length: '50%',
        width: 5,
        itemStyle: {
          color: '#f54e4e',
        },
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
