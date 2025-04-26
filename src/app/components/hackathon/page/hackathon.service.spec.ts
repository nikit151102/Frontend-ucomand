import { TestBed } from '@angular/core/testing';

import { HackathonService } from './hackathon.service';

describe('HackathonService', () => {
  let service: HackathonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HackathonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
