import { TestBed } from '@angular/core/testing';

import { TabTeamService } from './tab-team.service';

describe('TabTeamService', () => {
  let service: TabTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
