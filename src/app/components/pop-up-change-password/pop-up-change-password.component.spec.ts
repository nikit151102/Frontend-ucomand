import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpChangePasswordComponent } from './pop-up-change-password.component';

describe('PopUpChangePasswordComponent', () => {
  let component: PopUpChangePasswordComponent;
  let fixture: ComponentFixture<PopUpChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpChangePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
