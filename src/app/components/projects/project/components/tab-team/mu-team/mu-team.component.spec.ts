import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuTeamComponent } from './mu-team.component';

describe('MuTeamComponent', () => {
  let component: MuTeamComponent;
  let fixture: ComponentFixture<MuTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
