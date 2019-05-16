import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NavigationModule } from './navigation/navigation.module';
import { SettingsModule } from './settings/settings.module';
import { CoreModule } from './core/core.module';
import { LocalStorageService } from './core/local-storage/local-storage.service';
import { StaticPagesModule } from './static-pages/static-pages.module';
import { HttpClientModule } from '@angular/common/http';
import { DynamicPagesModule } from './dynamic-pages/dynamic-pages.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    SettingsModule,
    SharedModule,
    NavigationModule,
    CoreModule,
    StaticPagesModule,
    DynamicPagesModule
  ],
  providers: [LocalStorageService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
