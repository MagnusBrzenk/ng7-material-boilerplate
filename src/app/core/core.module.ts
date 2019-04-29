import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from './material-modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [],
  exports: [
    //
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ].concat(materialModules)
})
export class CoreModule {}
