import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavListingsComponent } from './sidenav-listings/sidenav-listings.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MenuItemComponent } from './header/menu-item/menu-item.component';
import { ListingsComponent } from './sidenav-listings/listings/listings.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SidenavListingsComponent,
    HeaderComponent,
    MenuItemComponent,
    ListingsComponent,
    FooterComponent
  ],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [SidenavListingsComponent, HeaderComponent, FooterComponent]
})
export class NavigationModule {}
