import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss'],
})
export class ServerErrorComponent implements OnInit {
  themeService: any;
  darkMode = '';
  isDark: boolean;
  backUrl: string[] = ['/', 'pages'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.themeService = (window as { [key: string]: any })['devuiThemeService'];
    if (this.themeService) {
      this.themeChange();
    }
    if (this.themeService && this.themeService.eventBus) {
      this.themeService.eventBus.add('themeChanged', this.themeChange);
    }
  }

  getDarkModeStatus() {
    return this.themeService && this.themeService.currentTheme.isDark;
  }

  themeChange = () => {
    this.isDark = this.getDarkModeStatus();
    if (this.isDark) {
      this.darkMode = '-dark';
    } else {
      this.darkMode = '';
    }
  };

  ngOnDestroy() {
    if (this.themeService && this.themeService.eventBus) {
      this.themeService.eventBus.remove('themeChanged', this.themeChange);
    }
  }

  hrefBack() {
    // this.router.navigate(this.backUrl);
    window.history.back();
  }
}
