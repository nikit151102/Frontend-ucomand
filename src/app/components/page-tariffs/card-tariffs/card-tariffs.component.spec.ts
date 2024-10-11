import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTariffsComponent } from './card-tariffs.component';

describe('CardTariffsComponent', () => {
  let component: CardTariffsComponent;
  let fixture: ComponentFixture<CardTariffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTariffsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
