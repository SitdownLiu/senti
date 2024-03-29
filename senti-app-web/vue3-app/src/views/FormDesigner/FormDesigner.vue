<template>
  <v-form3
    v-if="formEngineName === 'vform3'"
    ref="vform3"
    :schema="formSchema"
    @onFormSchema="sendFormSchema"
  ></v-form3>
  <form-create
    v-if="formEngineName === 'formcreate'"
    ref="formcreate"
    :schema="formSchema"
    @onFormSchema="sendFormSchema"
  ></form-create>
</template>

<script setup name="FormDesigner">
import { ref, onMounted, onUnmounted } from 'vue';
import VForm3 from './components/VForm3.vue';
import FormCreate from './components/FormCreate.vue';

const formEngineName = ref(''); // 设计器名称
const formSchema = ref({}); // 表单设计模型

//---------------------- 表单设计器组件 ---------------------//
const vform3 = ref();
const formcreate = ref();

onMounted(() => {
  // 通知主应用：渲染完成
  window.microApp.dispatch({ type: 'event', name: 'mounted' });
  // 监听：主应用的消息
  window.microApp.addDataListener((data) => onMainAppData(data));
});

onUnmounted(() => {
  // 清空当前子应用的所有绑定函数(全局数据函数除外)
  window.microApp.clearDataListener();
});

// 监听：主应用的消息
const onMainAppData = (data) => {
  console.log('[vue3-form-designer]main-app：', data);
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
const getFormSchema = () => {
  if (formEngineName.value === 'vform3') vform3.value.getFormSchema();
  if (formEngineName.value === 'formcreate') formcreate.value.getFormSchema();
};

// 发送：表单设计模型
const sendFormSchema = (schema) => {
  window.microApp.dispatch({
    type: 'message',
    name: 'formSchema',
    value: schema,
  });
};
</script>

<style lang="scss" scoped></style>
