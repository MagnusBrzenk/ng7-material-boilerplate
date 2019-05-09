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
import {
  trigger,
  query,
  style,
  animate,
  transition,
  state,
  sequence,
  group
} from '@angular/animations';

export function blah() {
  return true;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeChangeTrigger,
    appLoadingTrigger,
    trigger('testSafari', [
      // state('start', style({ backgroundColor: 'blue', marginTop: 60 })),
      // state('finish', style({ backgroundColor: 'red', marginTop: 0 })),
      // transition('start <=> finish', animate('500ms ease-in-out')),
      transition('* <=> *', [
        //////////////////////////////////
        sequence([
          query(
            '.footer-wrapper',
            [
              style({
                backgroundColor: 'blue'
                // position: 'absolute'
              })
            ],
            {
              optional: true
            }
          ),
          query(
            '.footer-wrapper',
            [
              style({
                // backgroundColor: 'blue'
              }),
              animate(
                '500ms ease-in-out',
                style({
                  //
                  // marginTop: 60
                  minHeight: 0,
                  maxHeight: 0,
                  height: 0
                  // position: 'absolute'
                })
              )
            ],
            {
              optional: true
            }
          ),
          group([
            query(
              '.footer-wrapper',
              [
                style({
                  //
                  // marginTop: 60
                  // minHeight: 0,
                  // height: 0,
                  // position: 'absolute'
                }),
                animate(
                  '.5s ease-in-out',
                  style({
                    height: 60,
                    minHeight: 60,
                    maxHeight: 60
                    // marginTop: 0
                  })
                )
              ],
              {
                optional: true
              }
            ),
            query(
              '.footer-wrapper',
              [
                style({
                  //
                  // marginTop: 60
                  // minHeight: 0,
                  // height: 0,
                  // position: 'absolute'
                }),
                animate(
                  '.5s ease-in-out',
                  style({
                    backgroundColor: 'green'
                  })
                )
              ],
              {
                optional: true
              }
            )
          ])
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  ///////////////////////////////////////////

  logo = require('../assets/icons/icon-72x72.png');
  localStorageState$: Observable<ILocalStorageState>;
  theme$: Observable<string>;

  isCLicked = false;

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

  testClick() {
    this.isCLicked = !this.isCLicked;

    console.log('CLICKED ', this.isCLicked);
  }

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
