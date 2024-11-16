import { TestBed } from '@angular/core/testing';

import { CombattantsService } from './combattants.service';

describe('CombattantsService', () => {
  let service: CombattantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombattantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
