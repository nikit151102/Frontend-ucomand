import { TestBed } from '@angular/core/testing';

import { NewPeopleService } from './new-people.service';

describe('NewPeopleService', () => {
  let service: NewPeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
