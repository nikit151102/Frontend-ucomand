import { TestBed } from '@angular/core/testing';

import { PopUpResponseTeamService } from './pop-up-response-team.service';

describe('PopUpResponseTeamService', () => {
  let service: PopUpResponseTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpResponseTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
