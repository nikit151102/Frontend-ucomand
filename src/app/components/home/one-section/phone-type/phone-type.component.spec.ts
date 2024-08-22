import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneTypeComponent } from './phone-type.component';

describe('PhoneTypeComponent', () => {
  let component: PhoneTypeComponent;
  let fixture: ComponentFixture<PhoneTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
