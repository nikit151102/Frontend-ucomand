import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteComponent } from './popup-delete.component';

describe('PopupDeleteComponent', () => {
  let component: PopupDeleteComponent;
  let fixture: ComponentFixture<PopupDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
