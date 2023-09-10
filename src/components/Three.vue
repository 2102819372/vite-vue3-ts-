<template>
  <canvas ref="webglRef" id="webgl" style="height: 50vh; width: 100vw"></canvas>
</template>
<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import * as THREE from 'three';
const webglRef: Ref = ref(null);
function init(callback) {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfff0ff);
  var camera = new THREE.PerspectiveCamera(75, 45, 10);
  camera.position.set(0, 0, 4);
  scene.add(camera);
  var cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1, 1),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
    })
  );
  cube.position.set(0, 0, 0);
  camera.lookAt(cube.position);

  scene.add(cube);
  callback(scene, camera);
}
onMounted(() => {
  var renderer = new THREE.WebGLRenderer({
    canvas: webglRef.value,
  });
  init((scene, camera) => {
    renderer.render(scene, camera);
  });
});
</script>
<style scoped></style>
