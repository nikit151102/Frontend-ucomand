import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageListParticipantsComponent } from './manage-list-participants.component';

describe('ManageListParticipantsComponent', () => {
  let component: ManageListParticipantsComponent;
  let fixture: ComponentFixture<ManageListParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageListParticipantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageListParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
