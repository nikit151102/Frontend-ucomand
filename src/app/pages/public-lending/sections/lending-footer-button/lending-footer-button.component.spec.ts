import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendingFooterButtonComponent } from './lending-footer-button.component';

describe('LendingFooterButtonComponent', () => {
  let component: LendingFooterButtonComponent;
  let fixture: ComponentFixture<LendingFooterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LendingFooterButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendingFooterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
