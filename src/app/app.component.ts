/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectorRef } from '@angular/core';

import { DbService } from './services/db/db.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppComponent';

  window = window;

  theme = 'dark';
  last_page = '';
  all_pages: any = [];

  mobileMode = false;

  constructor(
    public db: DbService,
    public router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    console.log(`[${this.title}#constructor]`);

    this.all_pages = this.router.config.map((route) => route.path);
    console.log(`[${this.title}#constructor] all_pages`, this.all_pages);

    this.last_page = this.db.get('last_page') || '';
    console.log(`[${this.title}#constructor] last_page`, this.last_page);
    this.redirectTo(this.last_page, this.title);

    this.theme = this.db.get('theme') || 'dark';
    console.log(`[${this.title}#constructor] theme`, this.theme);
    this.toggleTheme(this.theme);

    this.toggleMobileMode();

    this.window.onresize = () => {
      console.log(`[${this.title}#window.onresize]`);

      this.toggleMobileMode();
    };

    this.window.onload = () => {
      console.log(`[${this.title}#window.onload]`);
    };
  }

  defaultOrder() {
    return 0;
  }

  updateView(from: string) {
    console.log(`[${this.title}#updateView] from`, from);
    this.cdr.detectChanges;
  }

  redirectTo(url: any, from: any) {
    console.log(`[${this.title}#redirectTo] ${from} | url`, url);

    this.router.navigateByUrl(`/${url}`);
    console.log(`[${this.title}#redirectTo] router.url`, this.router.url);

    this.last_page = url;
    this.db.set('last_page', url);
    console.log(`[${this.title}#redirectTo] last_page`, this.last_page);

    this.updateView(this.title);
  }

  toggleTheme(theme: any) {
    console.log(`[${this.title}#toggleTheme] theme`, theme);

    this.theme = theme;
    this.db.set('theme', theme);

    document.documentElement.setAttribute('theme', theme);
    document.documentElement.style.setProperty('--theme', theme);

    this.updateView(this.title);
  }

  toggleMobileMode() {
    const width = window.innerWidth;
    const condition = width < 900;
    console.log(`[${this.title}#toggleMobileMode] width`, width, condition);

    if (condition) {
      this.mobileMode = true;
    } else {
      this.mobileMode = false;
    }

    this.updateView(this.title);
  }
}
