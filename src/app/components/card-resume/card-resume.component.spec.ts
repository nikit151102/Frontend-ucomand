import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardResumeComponent } from './card-resume.component';

describe('CardResumeComponent', () => {
  let component: CardResumeComponent;
  let fixture: ComponentFixture<CardResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
