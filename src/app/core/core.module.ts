import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage/local-storage.service';
import { AnimationsService } from './animations/animations.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LocalStorageService, AnimationsService]
})
export class CoreModule {}
