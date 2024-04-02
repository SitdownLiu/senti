import zhCustomLang from './lang/zh-CN_custom';
import enCustomLang from './lang/en-US_custom';

import CustomOptionItemSetting from './PropertyEditor/CustomOptionItemSetting.vue';
import OnFilePreview from './PropertyEditor/onFilePreview.vue';
import FileUploadClickWidget from './FieldWidget/FileUploadClickWidget.vue';
import CascaderLeafWidget from './FieldWidget/CascaderLeafWidget.vue';
import { CascaderLeafSchema, FileUploadClickSchema } from './CustomWidgetSchema';

import VForm3 from '@/assets/v-form3-pro/designer.umd';

const { addCustomWidgetSchema, addZHExtensionLang, addENExtensionLang, PERegister } = VForm3.VFormSDK;

export const loadCustomWidgets = (app) => {
  //加载语言文件
  addZHExtensionLang(zhCustomLang);
  addENExtensionLang(enCustomLang);

  //加载自定义容器组件

  /** 自定义字段组件：文件(点击) */
  // 加入组件库
  addCustomWidgetSchema(FileUploadClickSchema);
  // 注册事件：文件预览
  PERegister.registerEPEditor(app, 'onFilePreview', 'onFilePreview-editor', OnFilePreview);

  /** 自定义字段组件：级联(叶) */
  // 加入组件库
  addCustomWidgetSchema(CascaderLeafSchema);
  // 注册高级属性：选项配置
  // PERegister.registerCPEditor(
  //   app,
  //   'cascader-leaf-optionItems',
  //   'cascader-leaf-option-item-setting',
  //   CustomOptionItemSetting
  // );

  //在Vue中注册组件
  app.component(FileUploadClickWidget.name, FileUploadClickWidget);
  app.component(CascaderLeafWidget.name, CascaderLeafWidget);
};
