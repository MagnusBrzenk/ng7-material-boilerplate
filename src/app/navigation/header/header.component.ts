import { Component, ViewEncapsulation } from '@angular/core';
import { NavService } from '../navigation.service';
import { INav } from '../navigation.models';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  navItems: INav[];

  constructor(private navService: NavService) {
    this.navItems = navService.getNavLinks();
  }
}
