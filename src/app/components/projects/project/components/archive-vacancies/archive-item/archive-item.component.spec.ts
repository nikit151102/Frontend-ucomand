import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveItemComponent } from './archive-item.component';

describe('ArchiveItemComponent', () => {
  let component: ArchiveItemComponent;
  let fixture: ComponentFixture<ArchiveItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
