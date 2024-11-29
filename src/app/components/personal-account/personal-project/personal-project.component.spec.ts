import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalProjectComponent } from './personal-project.component';

describe('PersonalProjectComponent', () => {
  let component: PersonalProjectComponent;
  let fixture: ComponentFixture<PersonalProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
