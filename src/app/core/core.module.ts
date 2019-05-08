import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './local-storage/local-storage.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LocalStorageService]
})
export class CoreModule {}
