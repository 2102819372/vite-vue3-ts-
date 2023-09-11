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
/**
 * 塞入iframe框架
 */
function iframe() {
  const div = document.createElement('div');
  div.classList.add('model');
  const face = document.createElement('div');
  face.classList.add('face');
  const iframe = document.createElement('iframe');
  const url = document.location.href;
  iframe.src = url + '/api';
  div.appendChild(iframe);
  div.appendChild(face);
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
      const _h = window.innerHeight - div.offsetHeight;
      const _w = window.innerWidth - div.offsetWidth;
      l = e.clientX - subX; //left|top = 鼠标位置 - 鼠标在div内的位置 +div的一半因为居中时的transform(-50%,-50%)
      t = e.clientY - subY;
      l = Math.min(Math.max(0, l), _w);
      t = Math.min(Math.max(0, t), _h);
      if (move) {
        div.style.left = l + 'px';
        div.style.top = t + 'px';
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
