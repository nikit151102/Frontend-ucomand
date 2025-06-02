import { TestBed } from '@angular/core/testing';

import { NewApplicationService } from './new-application.service';

describe('NewApplicationService', () => {
  let service: NewApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewApplicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
