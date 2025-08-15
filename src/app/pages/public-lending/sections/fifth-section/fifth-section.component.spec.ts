import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifthSectionComponent } from './fifth-section.component';

describe('FifthSectionComponent', () => {
  let component: FifthSectionComponent;
  let fixture: ComponentFixture<FifthSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FifthSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifthSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
