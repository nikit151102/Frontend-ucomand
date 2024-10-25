import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveResumesComponent } from './active-resumes.component';

describe('ActiveResumesComponent', () => {
  let component: ActiveResumesComponent;
  let fixture: ComponentFixture<ActiveResumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveResumesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
