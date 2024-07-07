import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundImgsComponent } from './background-imgs.component';

describe('BackgroundImgsComponent', () => {
  let component: BackgroundImgsComponent;
  let fixture: ComponentFixture<BackgroundImgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundImgsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundImgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
