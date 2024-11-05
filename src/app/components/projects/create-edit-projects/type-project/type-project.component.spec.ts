import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProjectComponent } from './type-project.component';

describe('TypeProjectComponent', () => {
  let component: TypeProjectComponent;
  let fixture: ComponentFixture<TypeProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
