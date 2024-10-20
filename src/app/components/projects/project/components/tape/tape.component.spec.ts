import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapeComponent } from './tape.component';

describe('TapeComponent', () => {
  let component: TapeComponent;
  let fixture: ComponentFixture<TapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TapeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
