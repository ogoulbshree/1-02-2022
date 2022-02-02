import { TestBed } from '@angular/core/testing';

import { GlobalserviceService } from './globalservice.service';

describe('GlobalserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalserviceService = TestBed.get(GlobalserviceService);
    expect(service).toBeTruthy();
  });
});
