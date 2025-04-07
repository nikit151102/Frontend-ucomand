import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreensaverPhoneComponent } from './screensaver-phone.component';

describe('ScreensaverPhoneComponent', () => {
  let component: ScreensaverPhoneComponent;
  let fixture: ComponentFixture<ScreensaverPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreensaverPhoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreensaverPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
