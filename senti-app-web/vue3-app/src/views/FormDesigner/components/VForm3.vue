<template>
  <v-form-designer ref="designer" :designer-config="designerConfig"></v-form-designer>
</template>

<script setup name="VForm3">
import { onMounted, defineEmits, defineExpose, defineProps, ref } from 'vue';

// 参数
const props = defineProps({
  schema: {
    type: Object,
    default: {},
  },
});
// 事件
const emit = defineEmits(['']);

// 表单设计器配置
const designerConfig = {
  externalLink: false,
  resetFormJson: true,
};

const designer = ref();

onMounted(() => {
  setFormSchema();
});

// 加载表单设计模型
const setFormSchema = () => {
  designer.value.setFormJson(props.schema);
};

// 获取表单设计模型
const getFormSchema = () => {
  return designer.value.getFormJson();
};

defineExpose({ setFormSchema, getFormSchema });
</script>

<style lang="scss" scoped></style>
