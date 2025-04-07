import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGridComponent } from './photo-grid.component';

describe('PhotoGridComponent', () => {
  let component: PhotoGridComponent;
  let fixture: ComponentFixture<PhotoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
