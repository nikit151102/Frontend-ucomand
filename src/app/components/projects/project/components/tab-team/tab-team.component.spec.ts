import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabTeamComponent } from './tab-team.component';

describe('TabTeamComponent', () => {
  let component: TabTeamComponent;
  let fixture: ComponentFixture<TabTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabTeamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
