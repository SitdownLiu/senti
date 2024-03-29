export const FileUploadClickSchema = {
  type: 'file-upload-click',
  icon: 'file-upload-field',
  formItemFlag: true,
  options: {
    name: '',
    keyNameEnabled: false,
    keyName: '', //数据键值名称
    label: '',
    labelAlign: '',
    labelWidth: null,
    labelHidden: false,
    columnWidth: '200px',
    disabled: false,
    hidden: false,
    required: false,
    requiredHint: '',
    customRule: '',
    customRuleHint: '',
    //-------------------
    uploadURL: '',
    uploadTip: '',
    withCredentials: false,
    multipleSelect: false,
    showFileList: true,
    limit: 3,
    fileMaxSize: 5, //MB
    fileTypes: ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'ppt', 'pptx'],
    //headers: [],
    //-------------------
    customClass: '', //自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    //-------------------
    onCreated: '',
    onMounted: '',
    onBeforeUpload: '',
    onUploadSuccess: '',
    onUploadError: '',
    onFileRemove: '',
    onValidate: '',
    onFilePreview: '',
  },
};

export const CascaderLeafSchema = {
  type: 'cascader-leaf',
  icon: 'cascader-field',
  formItemFlag: true,
  options: {
    name: '',
    keyNameEnabled: false,
    keyName: '', //数据键值名称
    label: '',
    labelAlign: '',
    defaultValue: '',
    placeholder: '',
    size: '',
    labelWidth: null,
    labelHidden: false,
    columnWidth: '200px',
    disabled: false,
    hidden: false,
    clearable: true,
    filterable: false,
    multiple: false,
    checkStrictly: false, //可选择任意一级选项，默认不开启
    showAllLevels: true, //显示完整路径
    dsEnabled: false, // 是否使用数据源数据
    dsName: '', // 数据源名称
    dataSetName: '', //数据集名称
    labelKey: 'label',
    valueKey: 'value',
    childrenKey: 'children',
    areaDataEnabled: false, //是否加载省市区数据
    areaDataType: 0, //0不开启，1加载省市数据，2加载省市区数据
    optionItems: [
      { label: 'select 1', value: 1, children: [{ label: 'child 1', value: 11 }] },
      { label: 'select 2', value: 2 },
      { label: 'select 3', value: 3 },
    ],
    required: false,
    requiredHint: '',
    customRule: '',
    customRuleHint: '',
    //-------------------
    customClass: '', //自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    //-------------------
    onCreated: '',
    onMounted: '',
    onChange: '',
    onFocus: '',
    onBlur: '',
    onValidate: '',
  },
};
