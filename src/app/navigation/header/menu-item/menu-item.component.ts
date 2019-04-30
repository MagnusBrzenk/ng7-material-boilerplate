import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { INav, NavActions } from '@app/navigation/navigation.models';

@Component({
  selector: 'app-menu-item',
  styleUrls: ['./menu-item.component.scss'],
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements OnChanges {
  //

  NavActions = NavActions;
  _InvisibleButtonOverlayStyles = {};

  @Output()
  emitMenuInteraction = new EventEmitter<NavActions>();

  @Input()
  menuItems: INav[] | undefined;

  @Input()
  parentButtonRef: ElementRef | undefined;

  @ViewChild('childMenu')
  childMenu: any;

  constructor() {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.setButtonDimensions(true);
  }

  /**
   * Once the parentButton is rendered, we can access the div that wraps it
   * to get the width and height, and use those numbers to set the size of
   * the invisible button overlay. This allows enter/leave mouse events to
   * appear as though they're happening over the trigger button.
   */
  setButtonDimensions(bPrint: boolean = false) {
    let w = '0px';
    let h1 = '0px';
    let h2 = '0px';

    if (
      !!this.parentButtonRef &&
      this.parentButtonRef.nativeElement &&
      this.parentButtonRef.nativeElement.offsetWidth
    ) {
      w = this.parentButtonRef.nativeElement.offsetWidth + 'px';
      h1 = this.parentButtonRef.nativeElement.offsetHeight + 'px';
      h2 = this.parentButtonRef.nativeElement.offsetHeight + 10 + 'px';
    }

    this._InvisibleButtonOverlayStyles = {
      'background-color': !!this.parentButtonRef ? 'rgba(255, 0, 0, 0.0)' : 'rgba(0, 0, 255, 0.3)',
      border: 'solid red 0px',
      position: 'absolute',
      left: '0px',
      width: `${w}`,
      top: `-${h1}`,
      height: `${h2}`
    };
  }

  onMenuInteraction(action: NavActions) {
    this.emitMenuInteraction.emit(action);
  }
}
