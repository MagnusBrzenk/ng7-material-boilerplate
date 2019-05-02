import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '@app/core/local-storage/local-storage.service';
import { permittedThemes, ILocalStorageState } from '@app/core/local-storage/local-storage.models';
import { MatSelectChange } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  routeAnimationsElements = {};

  themes = permittedThemes;

  localStorageState$: Observable<ILocalStorageState>;

  constructor(private localStorageService: LocalStorageService) {
    this.localStorageState$ = this.localStorageService.getLocalStorageStream();
  }

  ngOnInit() {}

  onThemeSelect(event: MatSelectChange) {
    this.localStorageService.setItem('SiteTheme', event.value);
  }

  onAutoNightModeToggle() {
    //
  }
}
