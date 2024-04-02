<template>
  <form-item-wrapper
    :designer="designer"
    :field="field"
    :rules="rules"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
  >
    <div class="full-width-input" :class="{ 'readonly-mode-cascader': isReadMode }">
      <el-cascader
        ref="fieldEditor"
        :options="cascaderOptions"
        v-model="fieldModel"
        :disabled="field.options.disabled || isReadMode"
        :clearable="field.options.clearable"
        :filterable="field.options.filterable"
        :placeholder="field.options.placeholder || i18nt('render.hint.selectPlaceholder')"
        :show-all-levels="showFullPath"
        :props="{
          emitPath: false,
          checkStrictly: field.options.checkStrictly,
          multiple: field.options.multiple,
          expandTrigger: 'hover',
          value: valueKey,
          label: labelKey,
          children: childrenKey,
        }"
        @visible-change="hideDropDownOnClick"
        @expand-change="hideDropDownOnClick"
        @focus="handleFocusCustomEvent"
        @blur="handleBlurCustomEvent"
        @change="handleChangeEvent"
      >
      </el-cascader>
      <template v-if="isReadMode">
        <span class="readonly-mode-field">{{ contentForReadMode }}</span>
      </template>
    </div>
  </form-item-wrapper>
</template>

<script>
import VForm3 from '@/assets/v-form3-pro/designer.umd';
const { FormItemWrapper, emitter, i18n, Utils, fieldMixin } = VForm3.VFormSDK;
import { pcTextArr, pcaTextArr } from 'element-china-area-data';
const { deepClone, getDSByName, overwriteObj, runDataSourceRequest, translateOptionItems, evalFn } = Utils;

export default {
  name: 'cascader-leaf-widget',
  componentName: 'FieldWidget', //必须固定为FieldWidget，用于接收父级组件的broadcast事件
  mixins: [emitter, fieldMixin, i18n],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,

    designState: {
      type: Boolean,
      default: false,
    },

    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */ type: Number,
      default: -1,
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */ type: Number,
      default: -1,
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */ type: String,
      default: '',
    },
  },
  components: {
    FormItemWrapper,
  },
  data() {
    return {
      oldFieldValue: null, //field组件change之前的值
      fieldModel: null,
      rules: [],
    };
  },
  computed: {
    labelKey() {
      return this.field.options.labelKey || 'label';
    },

    valueKey() {
      return this.field.options.valueKey || 'value';
    },

    childrenKey() {
      return this.field.options.childrenKey || 'children';
    },

    showFullPath() {
      return this.field.options.showAllLevels === undefined || !!this.field.options.showAllLevels;
    },

    contentForReadMode() {
      let onlyLeafFlag = !this.field.options.checkStrictly;
      let checkedNodes = this.$refs.fieldEditor.getCheckedNodes(onlyLeafFlag);
      if (!checkedNodes || checkedNodes.length <= 0) {
        return '--';
      } else {
        return checkedNodes.map((nodeItem) => nodeItem.text).join(', ');
      }
    },

    cascaderOptions() {
      if (this.field.options.areaDataEnabled && this.field.options.areaDataType === 1) {
        return pcTextArr;
      } else if (this.field.options.areaDataEnabled && this.field.options.areaDataType === 2) {
        return pcaTextArr;
      }

      return this.field.options.optionItems;
    },
  },
  beforeCreate() {
    /* 这里不能访问方法和属性！！ */
  },

  created() {
    /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
    this.registerToRefList();
    this.initOptionItems();
    this.initFieldModel();
    this.initEventHandler();
    this.buildFieldRules();

    this.handleOnCreated();
  },

  mounted() {
    this.handleOnMounted();
  },

  beforeUnmount() {
    this.unregisterFromRefList();
  },

  methods: {
    /* 开启任意级节点可选后，点击radio隐藏下拉框 */
    hideDropDownOnClick() {
      setTimeout(() => {
        document.querySelectorAll('.el-cascader-panel .el-radio').forEach((el) => {
          el.onclick = () => {
            this.$refs.fieldEditor.popperVisible = false; // 单选框部分点击隐藏下拉框
          };
        });
      }, 100);
    },

    //--------------------- 重写fieldMixin的方法  ------------------//
    // 初始化下拉选项
    async initOptionItems() {
      if (this.designState) return;
      // 使用数据源
      if (!!this.field.options.dsEnabled) {
        this.field.options.optionItems.splice(0, this.field.options.optionItems.length); // 清空原有选项
        let curDSName = this.field.options.dsName;
        let curDSetName = this.field.options.dataSetName;
        let curDS = getDSByName(this.formConfig, curDSName);
        if (!!curDS && !curDSetName) {
          let gDsv = this.getGlobalDsv() || {};
          //console.log('Global DSV is: ', gDsv)
          let localDsv = new Object({});
          overwriteObj(localDsv, gDsv);
          localDsv['widgetName'] = this.field.options.name;
          localDsv['widgetKeyName'] = this.fieldKeyName;
          let dsResult = null;
          try {
            dsResult = await runDataSourceRequest(curDS, localDsv, this.getFormRef(), false, this.$message);
            this.loadOptions(dsResult);
          } catch (err) {
            this.$message.error(err.message);
          }
        } else if (!!curDS && !!curDSetName && !this.dataSetLoadedFlag) {
          this.loadOptionItemsFromDataSet(curDSName);
        }
      }
    },

    /**
     * 加载选项，并清空字段值
     * @param options
     */
    loadOptions(options) {
      this.field.options.optionItems = deepClone(options);
      //this.clearSelectedOptions()  //清空已选选项
    },

    /**
     * 转译选择项数据
     * @param rawData
     * @param widgetType
     * @param labelKey
     * @param valueKey
     * @returns {[]}
     */
    translateOptionItems(rawData, widgetType, labelKey, valueKey) {
      // 级联选择不转译
      return deepClone(rawData);
    },
    //--------------------- 以上为重写fieldMixin的方法 end ------------------//
  },
};
</script>

<style lang="scss" scoped>
@import '../styles/global.scss'; /* form-item-wrapper已引入，还需要重复引入吗？ */

.full-width-input {
  width: 100% !important;

  :deep(.el-cascader) {
    width: 100% !important;
  }
}

.readonly-mode-cascader :deep(.el-cascader) {
  display: none;
}
</style>
