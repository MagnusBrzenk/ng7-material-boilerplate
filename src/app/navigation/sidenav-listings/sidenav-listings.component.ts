import { Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { NavService } from '../navigation.service';
import { INav } from '../navigation.models';

@Component({
  selector: 'app-sidenav-listings',
  templateUrl: './sidenav-listings.component.html',
  styleUrls: ['./sidenav-listings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavListingsComponent implements OnInit {
  //

  @Output()
  closeSidenav = new EventEmitter<void>();

  menuItems: INav[] | undefined;

  constructor(private navService: NavService) {}

  ngOnInit() {
    this.menuItems = this.navService.getNavLinks();
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
  }
}
