<template>
  <div class="form-render">
    <v-form3
      v-if="formEngineName === 'vform3'"
      ref="vform3"
      :schema="formSchema"
      @onPrepared="sendPrepared"
      @onFormData="sendFormData"
    ></v-form3>
    <form-create
      v-if="formEngineName === 'formcreate'"
      ref="formcreate"
      :schema="formSchema"
      @onPrepared="sendPrepared"
      @onFormData="sendFormData"
    ></form-create>
  </div>
</template>

<script setup name="FormRender">
import { ref, onMounted, onUnmounted } from 'vue';
import VForm3 from './components/VForm3.vue';
import FormCreate from './components/FormCreate.vue';

const formEngineName = ref(''); // 设计器名称
const formSchema = ref({}); // 表单设计模型
const formData = ref({}); //表单数据
const businessId = ref('');

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
  console.log('[vue3-form-render]main-app: ', data);
  const { type, name } = data;
  // 处理事件：event
  if (type === 'event') {
    // 提交表单
    if (name === 'submit') getFormData();
    // 预览模式
    if (name === 'preview') previewMode();
  }

  // 处理消息:message
  if (type === 'message') {
    const { value } = data;
    // 加载表单模型
    if (name === 'formSchema') loadFormSchema(value);
    // 加载表单数据
    if (name === 'formData') setFormData(value);
  }
};

// 加载表单设计器
const loadFormSchema = async ({ engineName, schema }) => {
  formEngineName.value = engineName;
  formSchema.value = schema;
};
// 加载表单数据
const setFormData = async (data) => {
  if (data.businessId) businessId.value = data.businessId;
  if (data.formData) formData.value = data.formData;

  if (formEngineName.value === 'vform3') vform3.value.setFormData(data.formData);
  if (formEngineName.value === 'formcreate') formcreate.value.setFormData(data.formData);
};

// 提交数据
const getFormData = () => {
  if (formEngineName.value === 'vform3') vform3.value.getFormData();
  if (formEngineName.value === 'formcreate') formcreate.value.getFormData();
};

// 进入预览模式
const previewMode = () => {
  if (formEngineName.value === 'vform3') vform3.value.previewMode();
  if (formEngineName.value === 'formcreate') formcreate.value.previewMode();
};

// 发送：表单准备完成
const sendPrepared = () => {
  window.microApp.dispatch({ type: 'event', name: 'prepared' });
};
// 发送：表单数据
const sendFormData = (data) => {
  window.microApp.dispatch({ type: 'message', name: 'formData', value: data });
};
</script>

<style lang="scss" scoped>
.form-render {
  width: 100%;
}
</style>
