import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from './material-modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import font-awesome assets into bundle
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import './font-awesome';

@NgModule({
  declarations: [],
  exports: [
    //
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ...[materialModules]
  ]
})
export class SharedModule {}
