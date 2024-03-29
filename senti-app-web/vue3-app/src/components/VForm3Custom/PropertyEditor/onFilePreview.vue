<template>
  <el-form-item label="onFilePreview" label-width="150px">
    <el-button
      type="info"
      icon="el-icon-edit"
      plain
      round
      :class="[eventHandled ? 'button-text-highlight' : '']"
      @click="editEventHandler('onFilePreview', eventParams)"
    >
      {{ i18nt('extension.setting.addEventHandler') }}</el-button
    >
  </el-form-item>
</template>

<script>
import VForm3 from '@/assets/v-form3-pro/designer.umd';
const { i18n, eventMixin } = VForm3.VFormSDK;

export default {
  name: 'onFilePreview-editor',
  mixins: [i18n, eventMixin],
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
    eventHandled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      eventParams: ['file'],
    };
  },
};
</script>

<style scoped></style>
