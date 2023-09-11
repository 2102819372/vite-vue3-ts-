<template>
  <canvas ref="webglRef" id="webgl" style="height: 50vh; width: 100vw"></canvas>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import * as THREE from 'three';
const webglRef: Ref = ref(null);
function init(dom, callback) {
  //场景
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000);
  //相机
  var camera = new THREE.PerspectiveCamera(
    45,
    dom.value.clientWidth / dom.value.clientHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 4);
  scene.add(camera);
  callback(scene, camera);
  //方块
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1, 1),
    new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    })
  );
  camera.lookAt(cube.position);
  scene.add(cube);
}
onMounted(() => {
  var renderer = new THREE.WebGLRenderer({
    canvas: webglRef.value,
  });
  init(webglRef, (scene, camera) => {
    renderer.render(scene, camera);
  });
});
</script>
<style scoped></style>
