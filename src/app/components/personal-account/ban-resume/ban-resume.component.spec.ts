import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanResumeComponent } from './ban-resume.component';

describe('BanResumeComponent', () => {
  let component: BanResumeComponent;
  let fixture: ComponentFixture<BanResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
