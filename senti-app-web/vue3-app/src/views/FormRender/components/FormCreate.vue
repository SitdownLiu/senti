<template>
  <form-create
    ref="render"
    :rule="props.schema.rules"
    :option="props.schema.options"
    v-model="formData"
  ></form-create>
</template>

<script setup name="FormCreateRender">
import { onMounted, defineEmits, defineExpose, defineProps, ref } from 'vue';

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

const formData = ref({});

onMounted(() => {
  setFormSchema();
});

// 加载表单设计模型
const setFormSchema = async () => {
  await emit('onPrepared');
};

// 加载表单数据
const setFormData = async (data) => {
  formData.value = data;
};

// 获取表单数据
const getFormData = () => {
  emit('onFormData', JSON.parse(JSON.stringify(formData.value)));
};

// 进入预览模式
const previewMode = () => {};

defineExpose({ setFormData, getFormData, previewMode });
</script>

<style lang="scss" scoped></style>
