import { TestBed } from '@angular/core/testing';

import { TapeService } from './tape.service';

describe('TapeService', () => {
  let service: TapeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TapeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
