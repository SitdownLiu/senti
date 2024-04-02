<template>
  <div class="option-items-pane">
    <div v-if="selectedWidget.type === 'cascader-leaf'" class="full-width-input">
      <el-cascader
        v-model="optionModel.defaultValue"
        :options="optionModel.optionItems"
        @change="emitDefaultValueChange"
        :placeholder="i18nt('extension.hint.selectPlaceholder')"
      >
      </el-cascader>
    </div>
    <div v-if="selectedWidget.type === 'cascader-leaf'">
      <el-button link type="primary" @click="importCascaderOptions">{{
        i18nt('extension.setting.importOptions')
      }}</el-button>
      <el-button link type="primary" @click="resetDefault">{{
        i18nt('extension.setting.resetDefault')
      }}</el-button>
    </div>

    <div
      v-if="showImportCascaderDialogFlag"
      class=""
      v-drag="['.drag-dialog.el-dialog', '.drag-dialog .el-dialog__header']"
    >
      <el-dialog
        :title="i18nt('extension.setting.importOptions')"
        v-model="showImportCascaderDialogFlag"
        :show-close="true"
        class="drag-dialog small-padding-dialog"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
      >
        <code-editor v-model="cascaderOptions" mode="json" :readonly="false"></code-editor>
        <template #footer>
          <div class="dialog-footer">
            <el-button size="large" type="primary" @click="saveCascaderOptions">{{
              i18nt('extension.hint.confirm')
            }}</el-button>
            <el-button size="large" @click="showImportCascaderDialogFlag = false">{{
              i18nt('extension.hint.cancel')
            }}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import VForm3 from '@/assets/v-form3-pro/designer.umd';
const { FormItemWrapper, emitter, i18n, Utils, fieldMixin } = VForm3.VFormSDK;
import CodeEditor from '../../CodeEditor/index.vue';

export default {
  name: 'CustomOptionItemsSetting',
  mixins: [i18n],
  components: {
    CodeEditor,
  },
  props: {
    designer: Object,
    selectedWidget: Object,
  },
  data() {
    return {
      showImportDialogFlag: false,
      optionLines: '',

      cascaderOptions: '',
      showImportCascaderDialogFlag: false,

      //separator: '||',
      separator: ',',
    };
  },
  computed: {
    optionModel() {
      return this.selectedWidget.options;
    },
  },
  watch: {
    'selectedWidget.options': {
      deep: true,
      handler(val) {
        //console.log('888888', 'Options change!')
      },
    },
  },
  methods: {
    emitDefaultValueChange() {
      if (!!this.designer && !!this.designer.formWidget) {
        let fieldWidget = this.designer.formWidget.getWidgetRef(this.selectedWidget.options.name);
        if (!!fieldWidget && !!fieldWidget.refreshDefaultValue) {
          fieldWidget.refreshDefaultValue();
        }
      }
    },

    resetDefault() {
      if (
        this.selectedWidget.type === 'checkbox' ||
        (this.selectedWidget.type === 'select' && this.selectedWidget.options.multiple)
      ) {
        this.optionModel.defaultValue = [];
      } else {
        this.optionModel.defaultValue = '';
      }

      this.emitDefaultValueChange();
    },

    importCascaderOptions() {
      this.cascaderOptions = JSON.stringify(this.optionModel.optionItems, null, '  ');
      this.showImportCascaderDialogFlag = true;
    },

    saveCascaderOptions() {
      try {
        let newOptions = JSON.parse(this.cascaderOptions);
        this.optionModel.optionItems = newOptions;
        //TODO: 是否需要重置选项默认值？？

        this.showImportCascaderDialogFlag = false;
      } catch (ex) {
        this.$message.error(this.i18nt('extension.hint.invalidOptionsData') + ex.message);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/global.scss'; /* form-item-wrapper已引入，还需要重复引入吗？ */

.option-items-pane {
  width: 100%;

  ul {
    padding-inline-start: 6px;
    padding-left: 6px; /* 重置IE11默认样式 */
  }
}

li.ghost {
  background: #fff;
  border: 2px dotted $--color-primary;
}

.drag-option {
  cursor: move;
}

.small-padding-dialog :deep(.el-dialog__body) {
  padding: 10px 15px;
}

.dialog-footer .el-button {
  width: 100px;
}

.full-width-input {
  width: 100% !important;

  :deep(.el-cascader) {
    width: 100% !important;
  }
}
</style>
