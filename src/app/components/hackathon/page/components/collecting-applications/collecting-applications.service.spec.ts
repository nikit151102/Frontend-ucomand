import { TestBed } from '@angular/core/testing';

import { CollectingApplicationsService } from './collecting-applications.service';

describe('CollectingApplicationsService', () => {
  let service: CollectingApplicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectingApplicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
