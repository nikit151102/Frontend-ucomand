import { TestBed } from '@angular/core/testing';

import { MyTeamService } from './my-team.service';

describe('MyTeamService', () => {
  let service: MyTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
