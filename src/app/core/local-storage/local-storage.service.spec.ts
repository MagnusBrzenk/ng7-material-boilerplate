import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { CoreModule } from '../core.module';

describe('LocalStorageService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [CoreModule]
    })
  );

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });
});
