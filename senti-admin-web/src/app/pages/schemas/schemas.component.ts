import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-schemas',
  templateUrl: './schemas.component.html',
  styleUrls: ['./schemas.component.scss'],
})
export class SchemasComponent {
  routerName = {
    '/pages/schemas/form-schema': 'startUsing.breadcrumb.formSchema',
  };

  breadcrumbName: '行程申报';

  constructor(protected router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.breadcrumbName = this.routerName[this.router.url];
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      // 获取页面数据的地方，调用你页面获取数据的方法
      this.breadcrumbName = this.routerName[this.router.url];
    });
  }
}
