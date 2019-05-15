import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageComponent } from './settings-page.component';
import { SharedModule } from '@src/app/shared/shared.module';
import { CoreModule } from '@src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsPageComponent],
      imports: [CoreModule, SharedModule, BrowserAnimationsModule]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
