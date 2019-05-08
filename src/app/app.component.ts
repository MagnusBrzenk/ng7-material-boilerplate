import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorageService } from './core/local-storage/local-storage.service';
import { ILocalStorageState } from './core/local-storage/local-storage.models';
import { routeChangeTrigger } from './core/animations/route-change.animations';
import { appLoadingTrigger } from './core/animations/app-loading.animations';
import { AnimationsService } from './core/animations/animations.service';
import { IAnimEvent } from './core/animations/animations.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeChangeTrigger, appLoadingTrigger]
})
export class AppComponent implements OnInit {
  ///////////////////////////////////////////

  logo = require('../assets/icons/icon-72x72.png');
  localStorageState$: Observable<ILocalStorageState>;
  theme$: Observable<string>;

  constructor(private route: Router, private localStorageService: LocalStorageService) {
    //
    // Stream changes to localStorage and pipe to theme$ observable
    this.localStorageState$ = this.localStorageService.getLocalStorageStream();
    this.theme$ = this.localStorageState$.pipe(
      map((s: ILocalStorageState) => s.SiteTheme.toLowerCase())
    );
    setTimeout(() => this.localStorageService.refreshStateStream(), 0);
  }

  ngOnInit(): void {}

  routeChangeState(outletEvent: RouterOutlet) {
    const result =
      !!outletEvent &&
      !!outletEvent.isActivated &&
      !!outletEvent.activatedRoute &&
      !!outletEvent.activatedRoute.routeConfig &&
      outletEvent.activatedRoute.routeConfig.path;
    return result;
  }

  appLoadingNotifier(animEvent: IAnimEvent) {
    // When appLoading animation is finished, declare site loaded
    if (animEvent.phaseName === 'done') AnimationsService.setSiteLoaded(true);
  }
}
