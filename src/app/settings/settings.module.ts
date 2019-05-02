import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [SharedModule, CoreModule]
})
export class SettingsModule {}
