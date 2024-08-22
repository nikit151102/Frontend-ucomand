import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopTypeComponent } from './desktop-type.component';

describe('DesktopTypeComponent', () => {
  let component: DesktopTypeComponent;
  let fixture: ComponentFixture<DesktopTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesktopTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
