import { CookieService } from 'ngx-cookie-service';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
import { DialogService } from 'ng-devui';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { throwError, of, Observable } from 'rxjs';
import { User } from 'src/app/@shared/models/user';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isEmpty } from 'class-validator';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private readonly baseUrl = environment.baseUrl;
  private readonly timeOutBackUrl = environment.timeOutBackUrl;

  constructor(
    private http: HttpClient,
    private dialogService: DialogService,
    public jwtHelper: JwtHelperService,
    private router: Router,
    private httpService: HttpService,
    private cookieService: CookieService
  ) {}

  login(account: string, password: string) {
    this.http
      .post(`${this.baseUrl}/auth/passwordLogin`, { account, password })
      .pipe(catchError(this.handleError('loginError', '')))
      .subscribe({
        next: (res: any) => {
          if (res && res.statusCode === 200) {
            const { user, accessToken } = res.data;
            this.setSession(user, accessToken);
            this.router.navigate(['/pages/schemas/form-schema']);
          }
        },
        error: (err) => {
          throwError(err);
        },
      });
  }

  logout() {
    // this.cookieService.deleteAll('/');
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('menu');
    // location.replace(`${this.baseUrl}/user/logout`);
  }

  setSession(userInfo: object, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  //是否登录
  isUserLoggedIn() {
    const token = localStorage.getItem('token');
    if (!isEmpty(token)) {
      return true;
    } else {
      return false;
    }
  }

  //接入失败弹框
  public failedDialog(title, content = '接入失败, 请返回到登录入口页重新获取授权.') {
    this.dialogService.open({
      title,
      content,
      width: '400px',
      maxHeight: '600px',
      dialogtype: 'failed',
      buttons: [
        {
          cssClass: 'primary',
          text: '我知道了',
          handler: ($event: Event) => {
            location.replace(this.timeOutBackUrl);
          },
        },
      ],
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.failedDialog('获取[UserToken]失败');
      console.warn(error);
      console.warn(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //`TODO:`跳转后自动登录
  // connectLogin() {
  //   let token: string, userInfo: User;

  //   this.http
  //     .post(`${this.baseUrl}/user/token`, {})
  //     .pipe(catchError(this.handleError('loginError', '')))
  //     .subscribe(async (res: any) => {
  //       if (res.code !== 200) return this.failedDialog('获取[UserToken]失败');

  //       token = res.data;
  //       userInfo = await this.jwtHelper.decodeToken(token);

  //       console.log('1. 获取token, Success!');
  //       //`TODO:` 获取用户类型
  //       this.httpService.post('/user/allUserTypes').then(async (res: any) => {
  //         const { userType } = userInfo;
  //         await res.forEach(({ type, note }) => {
  //           if (userType === type) userInfo.userTypeName = note;
  //         });

  //         await this.setSession(userInfo, token);

  //         console.log('2. 获取用户类型, Success!');

  //         //`TODO:` 获取用户菜单
  //         await this.httpService.post('/user/getMenus').then(async (res) => {
  //           try {
  //             localStorage.setItem('menu', JSON.stringify(res));
  //             const redirectUrl = res.length > 0 ? res[0].children[0].link : '/forbidden';
  //             console.log('3. 获取菜单, Success!', redirectUrl, redirectUrl.split('/'));
  //             setTimeout(() => this.router.navigate(redirectUrl.split('/')), 500);
  //           } catch (error) {
  //             console.warn(`Get 'menus' error: `, error);
  //             const menu = await JSON.parse(localStorage.getItem('meun'));
  //             const redirectUrl = menu.length > 0 ? menu[0].children[0].link : '/forbidden';
  //             console.log('3. 获取菜单, Error!', redirectUrl, redirectUrl.split('/'));
  //             setTimeout(() => this.router.navigate(redirectUrl.split('/')), 500);
  //           }
  //         });

  //         //`TODO:` 获取用户隶属机构
  //         // this.httpService.post('/baseOrga/listAll').then(async (res: any) => {
  //         //   const { orgId } = userInfo;
  //         //   await res.forEach(({ sid, orgaName }) => {
  //         //     if (orgId === sid) userInfo.orgName = orgaName;
  //         //   });
  //         // });
  //       });
  //     });
  // }

  //`TODO:`跳转后自动登录 -调试
  // connectLoginTest(userName) {
  //   let token: string, userInfo: User;

  //   this.http
  //     .post(`${this.baseUrl}/user/tokenByUserName`, { userName })
  //     .pipe(catchError(this.handleError('loginError', '')))
  //     .subscribe(async (res: any) => {
  //       if (res.code !== 200) return this.failedDialog('获取[UserToken]失败');

  //       token = res.data;
  //       userInfo = await this.jwtHelper.decodeToken(token);

  //       //`TODO:` 获取用户类型
  //       this.httpService.post('/user/allUserTypes').then(async (res: any) => {
  //         const { userType } = userInfo;
  //         await res.forEach(({ type, note }) => {
  //           if (userType === type) userInfo.userTypeName = note;
  //         });

  //         //`TODO:` 获取用户隶属机构
  //         this.httpService.post('/baseOrga/listAll').then(async (res: any) => {
  //           const { orgId } = userInfo;
  //           await res.forEach(({ sid, orgaName }) => {
  //             if (orgId === sid) userInfo.orgName = orgaName;
  //           });
  //           await this.setSession(userInfo, token);

  //           //`TODO:` 获取用户菜单
  //           this.httpService.post('/user/getMenus').then((res: any) => {
  //             localStorage.setItem('menu', JSON.stringify(res));
  //             const redirectUrl = res.length > 0 ? res[0].children[0].link : '/forbidden';
  //             setTimeout(() => this.router.navigate([redirectUrl]), 500);
  //           });
  //         });
  //       });
  //     });
  // }
}
