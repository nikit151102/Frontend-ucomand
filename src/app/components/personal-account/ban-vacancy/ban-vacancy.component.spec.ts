import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanVacancyComponent } from './ban-vacancy.component';

describe('BanVacancyComponent', () => {
  let component: BanVacancyComponent;
  let fixture: ComponentFixture<BanVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanVacancyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
