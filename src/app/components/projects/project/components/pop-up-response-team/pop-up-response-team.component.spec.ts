import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpResponseTeamComponent } from './pop-up-response-team.component';

describe('PopUpResponseTeamComponent', () => {
  let component: PopUpResponseTeamComponent;
  let fixture: ComponentFixture<PopUpResponseTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpResponseTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpResponseTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
