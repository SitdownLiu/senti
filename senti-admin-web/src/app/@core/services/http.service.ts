import { DialogService, ToastService } from 'ng-devui';
import { catchError, finalize } from 'rxjs/operators';
import { isEmpty } from 'class-validator';
import { Observable, of } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperUtils } from 'ng-devui';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly baseUrl: string = environment.baseUrl;
  private readonly token: string = localStorage.getItem('token');
  private readonly timeOutBackUrl: string = environment.timeOutBackUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: '' }),
    withCredentials: true,
  };

  constructor(private http: HttpClient, private dialogService: DialogService, private toastService: ToastService) {
    // this.httpOptions.headers.set('Authorization', this.token);
  }

  private errorStatus = {
    0: { code: '0', title: '未知异常', content: '无法识别的系统异常,请联系管理员.' },
    400: { code: '400', title: '请求失败', content: '请求参数错误, 请核对并修改.' },
    404: { code: '404', title: '请求失败', content: '当前请求的资源不存在, 有可能是路径错误.' },
    415: { code: '415', title: '请求失败', content: '请求方式错误, 当前请求方式并不是服务器所需要的格式.' },
    401: { code: '401', title: '非法用户', content: '未登录的用户, 或登录已超时.' },
    403: { code: '403', title: '无访问权限', content: '用户未通过身份验证, 拒绝访问.' },
    500: { code: '500', title: '服务端异常', content: '服务端处理失败, 有可能正在维护, 请稍后再试.' },
    501: { code: '501', title: '服务端异常', content: '服务端不支持当前请求所需要的某个功能, 请稍后再试.' },
    502: { code: '502', title: '服务端异常', content: '服务端的网关异常, 有可能当前访问人数过多, 请稍后再试.' },
    503: { code: '503', title: '服务端异常', content: '服务器正在维护中, 请稍后再试.' },
    504: { code: '504', title: '服务端异常', content: '代理服务器超时, 上游服务器或微服务有可能正在维护, 请稍后再试.' },
  };

  /**
   * TODO: 异常消息提示
   * @param operation
   * @param error
   */
  public errorMessage(operation: string, error: any) {
    let type: string = 'info',
      dialogtype: string = 'info';
    const { status, statusText, msg } = error;

    // 401: 跳转到 "超时回调地址"
    if (status === 401) {
      return this.dialogService.open({
        dialogtype,
        title: `[401] 身份验证未通过`,
        content: `'系统提示: 有可能未获取系统授权或授权已过有效期, 请返回登录页面重新获取授权`,
        width: '400px',
        maxHeight: '600px',
        buttons: [
          {
            cssClass: 'primary',
            text: '重新登录',
            handler: ($event: Event) => {
              // location.replace(`${this.baseUrl}${this.timeOutBackUrl}`);
              location.replace(msg);
            },
          },
        ],
      });
    }

    if (status < 100 || status >= 500) (type = 'error'), (dialogtype = 'failed');
    else if (status >= 100 && status <= 201) (type = 'info'), (dialogtype = 'info');
    else if (status >= 400 && status < 500) (type = 'warn'), (dialogtype = 'warning');

    //未知状态码
    if (isEmpty(this.errorStatus[status])) {
      const message = this.errorStatus[0];
      const { code, title, content } = message;
      return this.toastService.open({
        value: [{ severity: type, summary: `[${code}] ${title}`, content: `${statusText ? statusText : '系统提示'}: ${msg}\n${content}` }],
      });
    }

    //post请求
    if (operation === 'post') {
      const message = this.errorStatus[status];
      const { code, title, content } = message;
      const dialog = this.dialogService.open({
        dialogtype,
        title: `[${code}] ${title}`,
        content: `${statusText ? statusText : '系统提示'}: ${msg}\n ${content}`,
        width: '400px',
        maxHeight: '600px',
        buttons: [{ cssClass: 'primary', text: '我知道了', handler: ($event: Event) => dialog.modalInstance.hide() }],
      });

      return;
    }

    //get请求和其他异常
    const message = this.errorStatus[status];
    const { code, title, content } = message;
    return this.toastService.open({
      value: [{ severity: type, summary: `[${code}] ${title}`, content: `${statusText ? statusText : '系统提示'}: ${msg}\n${content}` }],
    });
  }

  /**
   * TODO: http异常处理
   * @param operation
   * @param result
   * @returns {Observable}
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.warn(`${operation} 操作失败: ${error.message}`);
      console.warn(error);
      this.errorMessage(operation, error);
      return of(result as T);
    };
  }

  /**
   * TODO: get请求
   * @param url
   * @param params
   * @returns {Observable}
   */
  private getMethod(url: string, params?: Object): Observable<{}> {
    let httpParams = new HttpParams();
    if (!isEmpty(params)) {
      for (const key in params) {
        if (params[key] === false || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.get(`${this.baseUrl}${url}`, { ...this.httpOptions, params: httpParams }).pipe(catchError(this.handleError('get')));
  }

  /**
   * TODO: post请求
   * @param url
   * @param body
   * @param params
   * @returns {Observable}
   */
  private postMethod(url: string, body: any = null, params?: Object): Observable<{}> {
    let httpParams = new HttpParams();
    if (!isEmpty(params)) {
      for (const key in params) {
        if (params[key] === false || params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http
      .post(`${this.baseUrl}${url}`, body, { ...this.httpOptions, params: httpParams })
      .pipe(catchError(this.handleError('post')));
  }

  private handleResponse(operation: string, url: string, res: any, resolve: Function, reject?: Function) {
    const { code, data, msg } = res;
    if (code !== 200) {
      console.warn(url, msg);
      return this.errorMessage(operation, { status: code, msg });
    }
    return resolve(data);
  }

  public async get(url: string, params?: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getMethod(url, params).subscribe((res: any) => {
        return this.handleResponse('get', url, res, resolve);
      });
    });
  }

  public async post(url: string, body: any = null, params?: Object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.postMethod(url, body, params).subscribe((res: any) => {
        return this.handleResponse('post', url, res, resolve);
      });
    });
  }

  public downloadFile(url, params?) {
    HelperUtils.downloadFileByHttpClient(
      this.http,
      `${this.baseUrl}${url}`,
      {
        method: 'POST',
        params,
        header: { 'Content-Type': 'x-www-form-urlencoded', Authorization: this.token },
        withCredentials: true,
      },
      this.handleError('post')
    );
  }
}
