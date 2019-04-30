import {
  //
  Component,
  ViewEncapsulation,
  ViewChildren,
  ElementRef,
  QueryList,
  AfterViewInit,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import browser from 'browser-detect';

import { INav, NavActions } from '../navigation.models';
import { NavService } from '../navigation.service';
import { AppComponent as app } from '../../app.component';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, AfterViewInit, OnChanges {
  //
  // Controls Menu Behavior
  private _IsHoveringEnabled = false;

  // Debug Params
  private tempCounter = 0;
  private timeoutId: any;
  private isDebugging = false;

  // Misc
  navItems: INav[] = [];
  NavActions: typeof NavActions = NavActions;

  // business-Logic Params
  private menusEntered = 0;
  private isHoverLaunchable = true;
  private isMouseOverButton = false;
  private isMouseOverOverlay = false;

  hoverMenuSubscription: Subscription | undefined;

  @Input()
  isHoverMenuEnabled: boolean | undefined;
  // hoverMenu$: Observable<boolean>;

  @ViewChildren('mainbutton')
  mainbuttons: QueryList<ElementRef> | undefined;
  _mainbuttons: ElementRef[] | undefined;

  constructor(private navService: NavService) {
    this.navItems = navService.getNavLinks();
  }

  ngOnInit() {
    // this._isHoveringEnabled
    // this.hoverMenuSubscription = this.hoverMenu$.subscribe(val => {
    //   this._isHoveringEnabled = !!val;
    //   console.log('!!!', val);
    // });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    // console.log('CHANGE!!!');
    // this.isHoverMenuEnabled = simpleChanges.isHoverMenuEnabled.currentValue;
  }

  ngAfterViewInit() {
    // Extract array of primary buttons in menu
    // setTimeout is needed here because children components depend on this._mainbuttons
    setTimeout(() => {
      if (!!this.mainbuttons) this._mainbuttons = this.mainbuttons.toArray();
    });
  }

  getButtonId(i: number) {
    return `button_wrapper_id_` + i;
  }

  blurAllButtons() {
    // Loop through nav items to get index from 0 to total-number-of-buttons:
    this.navItems.forEach((el, ind) => {
      const buttonId = this.getButtonId(ind);
      const elementsMatchedById = document.getElementById(buttonId);
      if (!!elementsMatchedById) {
        elementsMatchedById.blur();
      }
    });
  }

  /**
   * Function to handle the flags/logic to control menu opening/closing for
   * the mouse/touchscreen events. See README for more info.
   */
  handleInteraction(trigger: any, action: NavActions, event?: Event, childNumber?: number) {
    if (!this.isHoverMenuEnabled) return;

    const leaveEventDelay = 50;

    // Debugging
    const isClosingEnabled = !!true;
    this.tempCounter++;
    if (this.isDebugging) {
      console.log('--------- ', this.tempCounter);
      console.log(NavActions[action], ` ${childNumber} `);
      this.printFlags();
    }

    /////////////
    // BUTTON  //
    /////////////
    switch (action) {
      case NavActions.ENTER_BUTTON:
        this.isMouseOverButton = true;
        setTimeout(() => {
          if (!trigger.menuOpen && !!this.isHoverLaunchable) {
            this.isHoverLaunchable = false;
            trigger.openMenu();
          }
        });
        break;
      case NavActions.LEAVE_BUTTON:
        this.isMouseOverButton = false;
        setTimeout(() => {
          if (!!this.isHoverLaunchable) {
            if (!!isClosingEnabled) trigger.closeMenu();
            else console.log('CLOSING MENU 1 !!!');
            this.blurAllButtons();
            if (!(this.isMouseOverButton || this.isMouseOverOverlay)) this.isHoverLaunchable = true;
          }
        }, leaveEventDelay);
        if (!trigger.menuOpen && !this.isHoverLaunchable) this.isHoverLaunchable = true;
        break;
      case NavActions.CLICK_BUTTON:
        this.isHoverLaunchable = false;
        setTimeout(() => null);
        break;
      case NavActions.TOUCHSTART_BUTTON:
        // console.log('Touch start!');
        break;
      case NavActions.TOUCHEND_BUTTON:
        // console.log('Touch start!');
        break;
      ///////////////
      // MAT MENU  //
      ///////////////
      case NavActions.ENTER_MENU:
        this.menusEntered++;
        setTimeout(() => null);
        break;
      case NavActions.LEAVE_MENU:
        this.menusEntered--;
        setTimeout(() => {
          if (this.menusEntered <= 0 && !this.isMouseOverOverlay) {
            if (!!isClosingEnabled) trigger.closeMenu();
            else console.log('CLOSING MENU 2 !!!');
            this.menusEntered = 0;
            this.isHoverLaunchable = true;
            setTimeout(() => {
              this.blurAllButtons();
            });
          }
        }, leaveEventDelay);
        break;
      case NavActions.CLICK_MENU:
        this.isHoverLaunchable = false;
        setTimeout(() => null);
        break;
      /////////////
      // OVERLAY //
      /////////////
      case NavActions.ENTER_OVERLAY:
        this.isMouseOverOverlay = true;
        this.isHoverLaunchable = false;
        break;
      case NavActions.LEAVE_OVERLAY:
        this.isMouseOverOverlay = false;
        setTimeout(() => {
          if (this.menusEntered <= 0) {
            if (!!isClosingEnabled) trigger.closeMenu();
            else console.log('CLOSING MENU 3 !!!');
            this.menusEntered = 0;
            if (!(this.isMouseOverButton || this.isMouseOverOverlay)) {
              this.isHoverLaunchable = true;
            }
            setTimeout(() => {
              this.blurAllButtons();
            });
          }
        }, leaveEventDelay);
        break;
      case NavActions.CLICK_OVERLAY:
        this.isHoverLaunchable = false;
        break;
      default:
    }

    if (this.isDebugging) this.printFlags();

    /**
     * Whatever events may come to pass, if the mouse is not over the trigger
     * button or the menu launched from that button after 1s, then close it.
     */
    const countMarker = this.tempCounter;
    if (!!this.timeoutId) clearTimeout(this.timeoutId);
    if (!this.isIEorEdgeOrSafari()) {
      this.timeoutId = setTimeout(() => {
        if (this.isDebugging)
          console.log(
            //
            `WILL BE NUKED? (${countMarker})`,
            this.isMouseOverButton,
            this.isMouseOverOverlay,
            this.menusEntered > 0
          );

        if (!(this.isMouseOverButton || this.isMouseOverOverlay || this.menusEntered > 0)) {
          // console.log(`NUKE IT (${countMarker})`, this.isMouseOverButton, this.isMouseOverOverlay, this.menusEntered > 0);
          trigger.closeMenu();
          this.blurAllButtons();
          this.isHoverLaunchable = true;
        }
      }, 500);
    }
  }

  printFlags() {
    // Print flags for debugging
    console.log('isMouseOverButton : ', this.isMouseOverButton);
    console.log('isMouseOverOverlay: ', this.isMouseOverOverlay);
    console.log('isHoverLaunchable : ', this.isHoverLaunchable);
  }

  isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name || 'xxx');
  }
}
