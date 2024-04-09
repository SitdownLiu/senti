<template>
  <v-form-render ref="render"></v-form-render>
</template>

<script setup name="VForm3Render">
import { onMounted, ref } from 'vue';

// 参数
const props = defineProps({
  schema: {
    type: Object,
    default: {},
  },
});
// 事件
const emit = defineEmits(['onPrepared', 'onFormData']);

const render = ref(null);

onMounted(() => {
  setFormSchema();
});

// 加载表单设计模型
const setFormSchema = async () => {
  await render.value.setFormJson(props.schema);
  await emit('onPrepared');
};

// 加载表单数据
const setFormData = async (data) => {
  render.value.setFormData(data);
};

// 获取表单数据
const getFormData = () => {
  render.value.getFormData().then((ret) => {
    emit('onFormData', JSON.parse(JSON.stringify(ret)));
  });
};

// 进入预览模式
const previewMode = () => {
  render.value.setReadMode(true);
};

defineExpose({ setFormData, getFormData, previewMode });
</script>

<style lang="scss" scoped></style>
