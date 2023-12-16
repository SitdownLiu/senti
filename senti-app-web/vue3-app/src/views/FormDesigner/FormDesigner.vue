<template>
  <v-form3 ref="vForm3"></v-form3>
</template>

<script setup name="FormDesigner">
import { ref, onMounted } from 'vue';
import VForm3 from './components/VForm3.vue';
import axios from 'axios';

const vForm3 = ref(null);

onMounted(() => {
  // window.microApp.dispatch({ type: 'vue3-渲染完成' });
  // window.microApp.addDataListener((data) => {
  //   console.log('vue3-app收到：', data);
  // });
  // window.postMessage('vue3-渲染完成')

});
</script>

<style lang="scss" scoped></style>
