<template>
  <canvas ref="webglRef" id="webgl" style="height: 50vh; width: 100vw"></canvas>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import * as THREE from 'three';
const webglRef: Ref = ref(null);
function init(callback) {
  //搭建场景
  const scene = new THREE.Scene();
  //创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    webglRef.value.clientWidth / webglRef.value.clientHeight,
    0.1,
    1000
  );
  //建立渲染器|
  const renderer = new THREE.WebGLRenderer({
    canvas: webglRef.value,
  });
  //创建方块
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
  camera.position.z = 5;
  //回调请求下一帧
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
  animate();
  window.onResize(() => {
    // renderer.resize()
  });
}

onMounted(() => {
  init();
});
</script>
<style scoped></style>
