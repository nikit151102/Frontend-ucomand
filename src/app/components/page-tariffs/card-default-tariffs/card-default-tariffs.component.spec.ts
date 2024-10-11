import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDefaultTariffsComponent } from './card-default-tariffs.component';

describe('CardDefaultTariffsComponent', () => {
  let component: CardDefaultTariffsComponent;
  let fixture: ComponentFixture<CardDefaultTariffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDefaultTariffsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDefaultTariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
