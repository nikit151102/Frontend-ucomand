import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeventhSectionComponent } from './seventh-section.component';

describe('SeventhSectionComponent', () => {
  let component: SeventhSectionComponent;
  let fixture: ComponentFixture<SeventhSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeventhSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeventhSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
