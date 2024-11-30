import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveVacanciesComponent } from './archive-vacancies.component';

describe('ArchiveVacanciesComponent', () => {
  let component: ArchiveVacanciesComponent;
  let fixture: ComponentFixture<ArchiveVacanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveVacanciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
