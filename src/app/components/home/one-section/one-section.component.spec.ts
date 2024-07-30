import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneSectionComponent } from './one-section.component';

describe('OneSectionComponent', () => {
  let component: OneSectionComponent;
  let fixture: ComponentFixture<OneSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
