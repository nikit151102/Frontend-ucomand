import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicLendingComponent } from './public-lending.component';

describe('PublicLendingComponent', () => {
  let component: PublicLendingComponent;
  let fixture: ComponentFixture<PublicLendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicLendingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicLendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
