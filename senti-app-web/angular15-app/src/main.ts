import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { NgModuleRef, enableProdMode } from '@angular/core';
import microApp from '@micro-zoe/micro-app';
import 'zone.js';

declare global {
  interface Window {
    microApp: any;
    mount: CallableFunction;
    unmount: CallableFunction;
    __MICRO_APP_ENVIRONMENT__: string;
  }
}

if (environment.production) {
  enableProdMode();
}

// -------------------子应用配置-------------------- //
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

// -------------------主应用配置-------------------- //
microApp.start({
  tagName: 'micro-app-senti-child',
});
