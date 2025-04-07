import { TestBed } from '@angular/core/testing';

import { TypeProjectService } from './type-project.service';

describe('TypeProjectService', () => {
  let service: TypeProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
