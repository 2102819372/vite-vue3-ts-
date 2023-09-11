<template>
  <div
    id="konva"
    ref="konvaRef"
    style="transition: 0.3s; height: 50vh; width: 100vw"
  ></div>
</template>
<script lang="ts" setup>
// const appDiv: HTMLDivElement = document.querySelector('#id');
import Konva from 'konva';
import { ref, Ref, onMounted } from 'vue';
const konvaRef: Ref = ref(null);
function iframe() {
  const div = document.createElement('div');
  div.classList.add('model');
  const iframe = document.createElement('iframe');
  const url = document.location.href;
  iframe.src = url + '/api';
  // div.appendChild(iframe);
  div.draggable = true;
  document.body.appendChild(div);
  let l,
    t,
    move = false;
  div.addEventListener('mousedown', (e) => {
    e.preventDefault();
    console.log('开启');
    move = true;
    const subX = e.offsetX;
    const subY = e.offsetY;
    const addX = e.target.clientWidth / 2;
    const addY = e.target.clientHeight / 2;
    document.addEventListener('mousemove', (e) => {
      l = e.clientX - subX + addX;
      t = e.clientY - subY + addY;
      l < 0 ? (l = 0 + addX) : l;
      t < 0 ? (t = 0 + addY) : t;
      if (move) {
        div.style.left = l + 'px';
        div.style.top = t + 'px';
        console.log(div.style.left, div.style.top);
      }
    });
    document.addEventListener('mouseup', (e) => {
      move = false;
    });
  });
  div.addEventListener('mouseup', (e) => {
    move = false;
  });
}
/**
 * 初始化konva
 * @param {htmlDom|canvasDom} 传入dom以初始化
 */
function init(appDiv) {
  const { clientWidth, clientHeight } = appDiv;
  let stage: Konva.Stage = new Konva.Stage({
    container: appDiv,
    width: clientWidth,
    height: clientHeight,
    draggable: true,
  });
  const scaleBy = 1.1;
  stage.addEventListener('wheel', (e) => {
    e.preventDefault();
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition() as Konva.Vector2d;
    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };
    const direction = e.wheelDelta > 0 ? 1 : -1;
    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    stage.scale({ x: newScale, y: newScale });
    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
  });
  const layerbg: Konva.Layer = new Konva.Layer();
  const layerMark: Konva.Layer = new Konva.Layer();
  //添加圆形
  var rect = new Konva.Circle({
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    fill: 'red',
    draggable: true,
  });
  //添加点击事件
  rect.on('click', () => {
    iframe();
  });
  //注册到layer
  layerMark.add(rect);
  //绘制图片
  const originImg = new Image();
  originImg.src = 'http://shanhe.kim/api/wz/bing.php?rand=true';
  originImg.onload = () => {
    // 绘制图片
    const img = new Konva.Image({
      x: 0,
      y: 0,
      image: originImg,
    });
    const w = img.width();
    const h = img.height();
    const sw = stage.width();
    const sh = stage.height();
    const wr = sw / w;
    const hr = sh / h;
    const s = Math.min(wr, hr);
    img.scale({ x: s, y: s });
    img.position({
      x: sw / 2 - (w * s) / 2,
      y: sh / 2 - (h * s) / 2,
    });
    layerbg.add(img);
  };

  stage.add(layerbg);
  stage.add(layerMark);
}
function timer(callback) {
  let timer;
  return function (e) {
    if (timer) timer = null;
    timer = setTimeout(() => {
      callback(e);
    }, 100);
  };
}
onMounted(() => {
  init(konvaRef.value);
});
</script>
<style scoped></style>
