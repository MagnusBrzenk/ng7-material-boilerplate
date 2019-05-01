import { Component, Input, ViewChild } from '@angular/core';
import { INav } from '@app/navigation/navigation.models';

@Component({
  selector: 'app-menu-item',
  styleUrls: ['./menu-item.component.scss'],
  templateUrl: './menu-item.component.html'
})
export class MenuItemComponent {
  @Input()
  menuItems: INav[] | undefined;

  // Seems to be needed to make nested menu loop work:
  @ViewChild('childMenu')
  childMenu: any;

  constructor() {}
}
