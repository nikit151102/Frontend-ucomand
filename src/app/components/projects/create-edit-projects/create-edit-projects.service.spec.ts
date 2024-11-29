import { TestBed } from '@angular/core/testing';

import { CreateEditProjectsService } from './create-edit-projects.service';

describe('CreateEditProjectsService', () => {
  let service: CreateEditProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEditProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
