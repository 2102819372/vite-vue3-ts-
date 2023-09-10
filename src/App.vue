<template>
  <div class="app" style="position: relative">
    <button @click="decrease">-</button>
    {{ counter }}
    <button @click="add">+</button>
    {{ doublecounter }}
    <First v-if="show" />
    <button
      style="display: block; position: absolute; top: 0; left: 50%"
      @click="isShow"
    >
      {{ show ? '收起' : '展示' }}
    </button>
    <Three />
    <Konva />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useDataStore } from './store/index.ts';
import { ref, Ref } from 'vue';
import First from './components/First.vue';
import Three from './components/Three.vue';
import Konva from './components/Konva.vue';
const show: Ref = ref(true);
const store = useDataStore();
const { counter, doublecounter } = storeToRefs(store);
const { add, decrease } = store;
const isShow = () => {
  show.value = !show.value;
};
</script>
<style scoped></style>
