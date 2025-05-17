import { TestBed } from '@angular/core/testing';

import { NewCommandService } from './new-command.service';

describe('NewCommandService', () => {
  let service: NewCommandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
