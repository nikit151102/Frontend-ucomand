import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumePersonComponent } from './resume-person.component';

describe('ResumePersonComponent', () => {
  let component: ResumePersonComponent;
  let fixture: ComponentFixture<ResumePersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumePersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
