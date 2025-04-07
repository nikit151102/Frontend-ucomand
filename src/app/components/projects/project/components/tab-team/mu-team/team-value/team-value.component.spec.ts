import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamValueComponent } from './team-value.component';

describe('TeamValueComponent', () => {
  let component: TeamValueComponent;
  let fixture: ComponentFixture<TeamValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamValueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
