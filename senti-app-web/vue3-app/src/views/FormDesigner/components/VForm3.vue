<template>
  <v-form-designer ref="designer" :designer-config="designerConfig"></v-form-designer>
</template>

<script setup name="VForm3Designer">
import { onMounted, ref } from 'vue';

// 参数
const props = defineProps({
  schema: {
    type: Object,
    default: {},
  },
});
// 事件
const emit = defineEmits(['onFormSchema', 'onFormOtherConfig']);

// 表单设计器配置
const designerConfig = {
  logoHeader: false, // 是否显示Logo栏
  externalLink: false, // 显示github连接
  resetFormJson: true, // 初始化自动清空内容：如设置为true，则刷新页面时也会清空设计器画布区域，慎用！
  languageMenu: false, //是否显示语言切换菜单
  clearDesignerButton: false, //是否显示清空设计器按钮
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
const getFormSchema = async () => {
  // 设计模型
  const schema = await designer.value.getFormJson();
  await emit('onFormSchema', JSON.parse(JSON.stringify(schema)));
  // 字段配置
  const fields = await designer.value.getFieldWidgets();
  // 字段结构
  const fieldBuild = await designer.value.buildFormDataSchema();
  await emit('onFormOtherConfig', { fields, fieldBuild });
};

defineExpose({ setFormSchema, getFormSchema });
</script>

<style lang="scss" scoped></style>
