import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTariffsComponent } from './page-tariffs.component';

describe('PageTariffsComponent', () => {
  let component: PageTariffsComponent;
  let fixture: ComponentFixture<PageTariffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageTariffsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTariffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
