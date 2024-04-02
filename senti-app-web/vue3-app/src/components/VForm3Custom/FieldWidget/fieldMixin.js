import VForm3 from '@/assets/v-form3-pro/designer.umd';
const { fieldMixin, Utils } = VForm3.VFormSDK;
const { deepClone, getDSByName, overwriteObj, runDataSourceRequest, translateOptionItems, evalFn } = Utils;

console.log('fieldMixin:', fieldMixin);


export default {
  mixins: [fieldMixin],
  methods: {
    ...fieldMixin.methods,
    async initOptionItems(keepSelected) {
      if (this.designState) {
        return;
      }

      if (
        this.field.type === 'radio' ||
        this.field.type === 'checkbox' ||
        this.field.type === 'select' ||
        this.field.type === 'cascader' ||
        this.field.type === 'cascader-leaf'
      ) {
        /* 首先处理数据源选项加载 */
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

          return;
        }

        /* 异步更新option-data之后globalOptionData不能获取到最新值，改用provide的getOptionData()方法 */
        const newOptionItems = this.getOptionData();
        if (!!newOptionItems && newOptionItems.hasOwnProperty(this.fieldKeyName)) {
          if (!!keepSelected) {
            this.reloadOptions(newOptionItems[this.fieldKeyName]);
          } else {
            this.loadOptions(newOptionItems[this.fieldKeyName]);
          }

          return;
        }

        //对静态选项的值类型进行转换处理
        if (this.field.type !== 'cascader' || this.field.type !== 'cascader-leaf') {
          this.translateOptionItemsValue();
        }
      }
    },
    loadOptionItemsFromDataSet(dsName) {
      if (this.designState) {
        return;
      }

      if (
        this.field.type !== 'radio' &&
        this.field.type !== 'checkbox' &&
        this.field.type !== 'select' &&
        this.field.type !== 'cascader' &&
        this.field.type !== 'cascader-leaf'
      ) {
        return;
      }

      if (
        !this.field.options.dsEnabled ||
        !this.field.options.dsName ||
        !this.field.options.dataSetName ||
        this.field.options.dsName !== dsName
      ) {
        return;
      }

      const dataCache = this.getDSResultCache();
      const dSetName = this.field.options.dataSetName;
      if (!!dataCache && !!dataCache[dsName] && !!dataCache[dsName][dSetName]) {
        this.field.options.optionItems.splice(0, this.field.options.optionItems.length); // 清空原有选项
        this.loadOptions(dataCache[dsName][dSetName]);
      }
    },
  },
};
