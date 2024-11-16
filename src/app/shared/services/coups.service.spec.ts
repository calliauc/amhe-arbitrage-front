import { TestBed } from '@angular/core/testing';

import { CoupsService } from './coups.service';

describe('CoupsService', () => {
  let service: CoupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
