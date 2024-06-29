import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortetdFilterComponent } from './sortetd-filter.component';

describe('SortetdFilterComponent', () => {
  let component: SortetdFilterComponent;
  let fixture: ComponentFixture<SortetdFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortetdFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortetdFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
