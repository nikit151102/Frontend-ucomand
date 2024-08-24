import { TestBed } from '@angular/core/testing';

import { SortetdFilterService } from './sortetd-filter.service';

describe('SortetdFilterService', () => {
  let service: SortetdFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortetdFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
