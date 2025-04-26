import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectingApplicationsComponent } from './collecting-applications.component';

describe('CollectingApplicationsComponent', () => {
  let component: CollectingApplicationsComponent;
  let fixture: ComponentFixture<CollectingApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectingApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectingApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
