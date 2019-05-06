import { MatSelectChange, MatSlideToggleChange } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@src/app/core/animations/route.animations';
import { LocalStorageService } from '@app/core/local-storage/local-storage.service';
import {
  permittedThemes,
  ILocalStorageState,
  TPermittedTheme
} from '@app/core/local-storage/local-storage.models';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  ////////////////////////////////////////////////////

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  themes: TPermittedTheme[] = permittedThemes;
  localStorageState$: Observable<ILocalStorageState>;

  constructor(private localStorageService: LocalStorageService) {
    this.localStorageState$ = this.localStorageService.getLocalStorageStream();
  }

  ngOnInit() {}

  onThemeSelect(event: MatSelectChange) {
    this.localStorageService.setItem('SiteTheme', event.value);
  }

  onAutoNightModeToggle(event: MatSlideToggleChange) {
    // console.log(event);
  }
}
