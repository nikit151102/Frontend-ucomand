import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackathonDataComponent } from './hackathon-data.component';

describe('HackathonDataComponent', () => {
  let component: HackathonDataComponent;
  let fixture: ComponentFixture<HackathonDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HackathonDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackathonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
