import { TestBed } from '@angular/core/testing';

import { ManageListParticipantsService } from './manage-list-participants.service';

describe('ManageListParticipantsService', () => {
  let service: ManageListParticipantsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageListParticipantsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
