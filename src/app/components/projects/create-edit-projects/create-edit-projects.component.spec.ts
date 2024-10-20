import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProjectsComponent } from './create-edit-projects.component';

describe('CreateEditProjectsComponent', () => {
  let component: CreateEditProjectsComponent;
  let fixture: ComponentFixture<CreateEditProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditProjectsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
