import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from './core/local-storage/local-storage.service';
import { ILocalStorageState } from './core/local-storage/local-storage.models';
import { routeAnimations, ROUTE_ANIMATIONS_ELEMENTS } from './core/animations/route.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  ///////////////////////////////////////////

  logo = require('../assets/icons/icon-72x72.png');

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  isAuthenticated$: Observable<boolean> | any;
  stickyHeader$: Observable<boolean> | any;
  language$: Observable<string> | any;
  hoverMenu$: Observable<boolean> | any;

  localStorageState$: Observable<ILocalStorageState>;
  theme$: Observable<string>;

  constructor(private route: Router, private localStorageService: LocalStorageService) {
    // Stream changes to localStorage and pipe to theme$ observable
    this.localStorageState$ = this.localStorageService.getLocalStorageStream();
    this.theme$ = this.localStorageState$.pipe(
      map((s: ILocalStorageState) => s.SiteTheme.toLocaleLowerCase())
    );
    setTimeout(() => this.localStorageService.refreshStateStream(), 0);
  }

  ngOnInit(): void {
    this.isAuthenticated$ = true;
    this.stickyHeader$ = true;
    this.hoverMenu$ = false;
  }
}
