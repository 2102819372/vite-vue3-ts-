<template>
  <div class="app">
    <First v-if="show" />
    <button @click="isShow">展示</button>
  </div>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue';
import First from './components/First.vue';
const show: Ref = ref(true);
const isShow = () => {
  show.value = !show.value;
};
</script>
<style scoped></style>
