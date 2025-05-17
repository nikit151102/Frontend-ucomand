import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackathonCadComponent } from './hackathon-cad.component';

describe('HackathonCadComponent', () => {
  let component: HackathonCadComponent;
  let fixture: ComponentFixture<HackathonCadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HackathonCadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackathonCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
