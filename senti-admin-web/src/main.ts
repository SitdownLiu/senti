declare global {
  interface Window {
    microApp: any;
    mount: CallableFunction;
    unmount: CallableFunction;
    __MICRO_APP_ENVIRONMENT__: string;
  }
}

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';

import { NgModuleRef, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ThemeServiceInit, devuiDarkTheme, Theme } from 'ng-devui/theme';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import microApp from '@micro-zoe/micro-app';

import { infinityTheme, sweetTheme, provenceTheme, deepTheme } from 'ng-devui/theme-collection';

const customTheme = new Theme({
  id: `customize-theme`,
  name: 'custom',
  cnName: '自定义主题',
  data: {},
  isDark: false,
});

ThemeServiceInit({
  infinityTheme,
  sweetTheme,
  provenceTheme,
  deepTheme,
  devuiDarkTheme,
  customTheme,
});

if (environment.production) {
  enableProdMode();
}

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));

// -------------------微前端子应用配置-------------------- //
let app: void | NgModuleRef<AppModule>;
// 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
} else {
  // 渲染
  window.mount = () => {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .then((res: NgModuleRef<AppModule>) => {
        app = res;
      })
      .catch((err) => console.error(err));
  };

  // 卸载
  window.unmount = () => {
    app = undefined;
  };
}

// 启动微前端主应用
microApp.start({
  tagName: 'micro-app-senti-app',
});
