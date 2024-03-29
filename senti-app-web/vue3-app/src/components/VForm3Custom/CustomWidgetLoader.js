import zhCustomLang from './lang/zh-CN_custom';
import enCustomLang from './lang/en-US_custom';

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

  // 加载自定义事件编辑器
  PERegister.registerEPEditor(app, 'onFilePreview', 'onFilePreview-editor', OnFilePreview);

  //加载自定义容器

  //加载自定义字段组件
  addCustomWidgetSchema(FileUploadClickSchema); // 文件(点击)
  addCustomWidgetSchema(CascaderLeafSchema); // 级联(叶)

  //在Vue中注册组件
  app.component(FileUploadClickWidget.name, FileUploadClickWidget);
  app.component(CascaderLeafWidget.name, CascaderLeafWidget);
};
