import { TestBed } from '@angular/core/testing';

import { MenuNavService } from './menu-nav.service';

describe('MenuNavService', () => {
  let service: MenuNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
