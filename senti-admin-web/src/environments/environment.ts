// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  // baseUrl: 'http://39.108.54.115:50040/api',
  baseUrl: 'http://localhost:33000',
  timeOutBackUrl: '/login',
  // angular15AppUrl: 'http://localhost:34210/',
  // vue3AppUrl: 'http://localhost:34211/',
  // react18AppUrl: 'http://localhost:34212/',
  angular15AppUrl: 'http://39.108.54.115:50040/app/angular15/',
  vue3AppUrl: 'http://39.108.54.115:50040/app/vue3/',
  react18AppUrl: 'http://39.108.54.115:50040/app/react18/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error'; // Included with Angular CLI.
