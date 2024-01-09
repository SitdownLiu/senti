import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { isEmpty } from 'class-validator';

import { ToastService, DialogService } from 'ng-devui';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('sentitoken');
    if (isEmpty(token)) {
      this.dialogService.open({
        title: '[401]未授权的用户',
        content: '系统未授权或授权已过期, 请返回到登录入口页重新获取授权.',
        width: '400px',
        maxHeight: '600px',
        dialogtype: 'failed',
        buttons: [
          {
            cssClass: 'primary',
            text: '我知道了',
            handler: ($event: Event) => {
              this.router.navigate(['/login']);
            },
          },
        ],
      });

      return false;
    } else {
      return true;
    }
  }
}
