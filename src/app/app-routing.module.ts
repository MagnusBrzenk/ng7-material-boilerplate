import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './static-pages/home/home.component';
import { AboutComponent } from './static-pages/about/about.component';
import { SettingsPageComponent } from './settings/settings-page/settings-page.component';
import { DocumentationComponent } from './static-pages/documentation/documentation.component';
import { ContactComponent } from './static-pages/contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full'
  },
  {
    path: 'contact',
    component: ContactComponent,
    pathMatch: 'full'
  },
  {
    path: 'docs',
    component: DocumentationComponent,
    pathMatch: 'full'
  },
  {
    path: 'settings',
    component: SettingsPageComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
