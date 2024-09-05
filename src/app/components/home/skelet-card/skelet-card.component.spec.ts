import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletCardComponent } from './skelet-card.component';

describe('SkeletCardComponent', () => {
  let component: SkeletCardComponent;
  let fixture: ComponentFixture<SkeletCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
