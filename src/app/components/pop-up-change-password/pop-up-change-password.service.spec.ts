import { TestBed } from '@angular/core/testing';

import { PopUpChangePasswordService } from './pop-up-change-password.service';

describe('PopUpChangePasswordService', () => {
  let service: PopUpChangePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopUpChangePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
