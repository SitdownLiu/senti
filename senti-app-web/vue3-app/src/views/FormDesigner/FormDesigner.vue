<template>
  <v-form3 v-if="formEngineName === 'vform3'" ref="vform3" :schema="formSchema"></v-form3>
</template>

<script setup name="FormDesigner">
import { ref, onMounted, reactive } from 'vue';
import VForm3 from './components/VForm3.vue';

const formEngineName = ref(''); // 设计器名称
const formSchema = ref({}); // 表单设计模型

//---------------------- 表单设计器组件 ---------------------//
const vform3 = ref();

onMounted(() => {
  // window.microApp.dispatch({ type: 'vue3-渲染完成' });
  // window.microApp.addDataListener((data) => {
  //   console.log('vue3-app收到：', data);
  // });
  // window.postMessage('vue3-渲染完成')
  // 通知主应用：渲染完成
  window.microApp.dispatch({ type: 'event', name: 'mounted' });
  // 监听：主应用的消息
  window.microApp.addDataListener((data) => onMainAppData(data));
});

// 监听：主应用的消息
const onMainAppData = (data) => {
  console.log(data);
  const { type } = data;
  // 处理事件：event
  if (type === 'event') {
    const { name } = data;
    if (name === 'save') getFormSchema();
  }

  // 处理消息:message
  if (type === 'message') {
    const { name, value } = data;
    // 加载表单设计器
    loadFormDesigner(value);
  }
};

// 加载表单设计器
const loadFormDesigner = async ({ engineName, schema }) => {
  formEngineName.value = engineName;
  formSchema.value = schema;
};

// 获取表设设计模型
const getFormSchema = async () => {
  if (formEngineName.value === 'vform3') formSchema.value = await vform3.value.getFormSchema();

  // 发送formSchema至主应用
  await window.microApp.dispatch({
    type: 'message',
    name: 'formSchema',
    value: JSON.parse(JSON.stringify(formSchema.value)),
  });
};
</script>

<style lang="scss" scoped></style>
