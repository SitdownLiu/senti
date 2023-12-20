<template>
  <fc-designer ref="designer" height="99.6vh" />
</template>

<script setup name="FormCreateDesigner">
import { onMounted, defineEmits, defineExpose, defineProps, ref } from 'vue';

// 参数
const props = defineProps({
  schema: {
    type: Object,
    default: {},
  },
});
// 事件
const emit = defineEmits(['onFormSchema']);

// 表单设计器配置
const designerConfig = {};

const designer = ref();

onMounted(() => {
  setFormSchema();
});

// 加载表单设计模型
const setFormSchema = () => {
  try {
    const { rules, options } = props.schema;
    if (rules) designer.value.setRule(rules);
    if (options) designer.value.setOption(options);
  } catch (error) {}
};

// 获取表单设计模型
const getFormSchema = async () => {
  const rules = await designer.value.getRule();
  const options = await designer.value.getOption();
  await emit('onFormSchema', JSON.parse(JSON.stringify({ rules, options })));
};

defineExpose({ setFormSchema, getFormSchema });
</script>

<style lang="scss" scoped></style>
