import { Component, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { NavService } from '../navigation.service';
import { INav } from '../navigation.models';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {
  ////////////////////////////

  navItems: INav[];

  logo = 'assets/icons/icon-72x72.png';

  constructor(private navService: NavService) {
    this.navItems = navService.getNavLinks();
  }

  @Output()
  openSidenav: EventEmitter<any> = new EventEmitter();

  _openSideNav() {
    this.openSidenav.emit();
  }
}
